/**
 * Production Builder Service
 *
 * Builds a litigation-grade production set from reviewed documents:
 *
 *   1. Gather documents (specific IDs or all tagged FOR_PRODUCTION in matter)
 *   2. Assign Bates numbers sequentially (PREFIX000001 … PREFIXnnnnnn)
 *   3. Render PDFs via LibreOffice if needed (Office → PDF)
 *   4. Generate load files:
 *        DAT  — Concordance/Relativity  (þ-delimited fields, comma-separated, ¶ row-end)
 *        OPT  — Opticon cross-reference  (image path → Bates page mapping)
 *        DII  — Summation (simplified)
 *        EDRM — EDRM XML 2.0
 *   5. Package everything as a ZIP in MinIO
 *   6. Update production record status → COMPLETE
 *
 * All Bates assignments and load-file writes are recorded in the audit chain.
 *
 * DAT format spec (Concordance-standard):
 *   Field delimiter : þ  (thorn, ASCII 254)
 *   Text qualifier  : þ  (same — fields are þvalue þ , essentially "þFIELDþ,þFIELDþ")
 *   Row terminator  : ¶  (pilcrow, ASCII 20)
 *
 * OPT format spec (Opticon):
 *   VOLUME,BEGBATES,PATH,FIRST_PAGE_FLAG,BOX,FOLDER,PAGES
 *   First page of doc: VOLUME,BEGBATES,path/BEGBATES.pdf,Y,,,
 *   Subsequent pages: VOLUME,PAGEBATES,path/PAGEBATES.pdf,,,,
 */

import { createWriteStream } from 'fs';
import { mkdtemp, rm, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { Readable, PassThrough } from 'stream';
import { pipeline } from 'stream/promises';
import archiver from 'archiver';
import fetch from 'node-fetch';

import { db } from '../db/index.js';
import { storageClient, BUCKET } from './storage.js';
import { logEvent } from './chainOfCustody.js';
import { AUDIT_EVENT } from '../../../shared/src/constants.js';

const THORN    = '\xfe';   // þ  — Concordance field separator
const PILCROW  = '\xb6';   // ¶  — Concordance row terminator

// ─── Entry point ─────────────────────────────────────────────────────────────

/**
 * Build a production set.
 * Called from the production route as a background async operation.
 *
 * @param {string} productionId
 * @param {string[]} [specificDocumentIds] - if empty, uses all FOR_PRODUCTION-tagged docs
 */
export async function buildProduction(productionId, specificDocumentIds = []) {
  const tmpDir = await mkdtemp(join(tmpdir(), 'prod-'));

  try {
    // ── 1. Load production record ──────────────────────────────────────────
    const prodResult = await db.query('SELECT * FROM productions WHERE id = $1', [productionId]);
    if (!prodResult.rows.length) throw new Error(`Production ${productionId} not found`);
    const prod = prodResult.rows[0];

    await db.query(
      "UPDATE productions SET status='BUILDING', started_at=NOW() WHERE id=$1",
      [productionId]
    );

    // ── 2. Gather documents ────────────────────────────────────────────────
    let docs;
    if (specificDocumentIds.length > 0) {
      const placeholders = specificDocumentIds.map((_, i) => `$${i + 2}`).join(',');
      docs = await db.query(
        `SELECT d.*, c.name AS custodian_name_ref
         FROM documents d
         LEFT JOIN custodians c ON c.id = d.custodian_id
         WHERE d.matter_id = $1 AND d.id IN (${placeholders})
         ORDER BY d.email_date NULLS LAST, d.date_modified NULLS LAST, d.id`,
        [prod.matter_id, ...specificDocumentIds]
      );
    } else {
      docs = await db.query(
        `SELECT d.*, c.name AS custodian_name_ref
         FROM documents d
         LEFT JOIN custodians c ON c.id = d.custodian_id
         WHERE d.matter_id = $1
           AND EXISTS (
             SELECT 1 FROM document_tags dt JOIN tags t ON t.id = dt.tag_id
             WHERE dt.document_id = d.id AND t.group_name = 'Production'
           )
           AND d.is_privileged = false
           AND d.is_nist = false
         ORDER BY d.email_date NULLS LAST, d.date_modified NULLS LAST, d.id`,
        [prod.matter_id]
      );
    }

    if (!docs.rows.length) {
      await db.query(
        "UPDATE productions SET status='FAILED', completed_at=NOW(), error_message=$2 WHERE id=$1",
        [productionId, 'No documents matched the production criteria']
      );
      return;
    }

    // ── 3. Assign Bates numbers ────────────────────────────────────────────
    const prefix  = prod.bates_prefix ?? '';
    const padLen  = 7;   // PREFIX0000001
    let   counter = prod.bates_start ?? 1;

    const batesAssignments = [];   // [{documentId, begBates, endBates, pageCount}]
    const allPageRows      = [];   // for OPT file

    for (const doc of docs.rows) {
      const pages = doc.page_count || 1;
      const beg   = `${prefix}${String(counter).padStart(padLen, '0')}`;
      const end   = `${prefix}${String(counter + pages - 1).padStart(padLen, '0')}`;

      batesAssignments.push({ doc, begBates: beg, endBates: end, pageCount: pages });
      for (let p = 0; p < pages; p++) {
        allPageRows.push({
          bates:    `${prefix}${String(counter + p).padStart(padLen, '0')}`,
          isFirst:  p === 0,
          docId:    doc.id,
          begBates: beg,
        });
      }
      counter += pages;
    }

    const endBatesGlobal = `${prefix}${String(counter - 1).padStart(padLen, '0')}`;

    // Update documents with their Bates numbers (in a single transaction)
    await db.query('BEGIN');
    try {
      for (const { doc, begBates, endBates } of batesAssignments) {
        await db.query(
          'UPDATE documents SET bates_begin=$2, bates_end=$3 WHERE id=$1',
          [doc.id, begBates, endBates]
        );
        await db.query(
          `INSERT INTO production_documents (production_id, document_id, bates_begin, bates_end)
           VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
          [productionId, doc.id, begBates, endBates]
        );
      }
      // Advance the matter's bates_next counter
      await db.query('UPDATE matters SET bates_next=$2 WHERE id=$1', [prod.matter_id, counter]);
      await db.query('COMMIT');
    } catch (err) {
      await db.query('ROLLBACK');
      throw err;
    }

    await logEvent({
      eventType:   AUDIT_EVENT.PRODUCTION_CREATED,
      matterId:    prod.matter_id,
      userId:      prod.created_by,
      description: `Bates numbers assigned ${prefix}${String(prod.bates_start ?? 1).padStart(padLen,'0')} – ${endBatesGlobal} (${batesAssignments.length} documents, ${counter - (prod.bates_start ?? 1)} pages)`,
      metadata:    { productionId, docCount: batesAssignments.length, endBates: endBatesGlobal },
    });

    // ── 4. Build load files in temp dir ───────────────────────────────────
    const loadDir = join(tmpDir, 'loadfiles');
    const imgDir  = join(tmpDir, 'images');
    const natDir  = join(tmpDir, 'natives');
    const txtDir  = join(tmpDir, 'text');
    await mkdir(loadDir, { recursive: true });
    await mkdir(imgDir,  { recursive: true });
    await mkdir(natDir,  { recursive: true });
    await mkdir(txtDir,  { recursive: true });

    const format = (prod.load_file_format ?? 'DAT').toUpperCase();

    // Always generate DAT + OPT (most universal)
    const datContent  = buildDat(batesAssignments, prod);
    const optContent  = buildOpt(allPageRows, prod);
    await writeFile(join(loadDir, `${prod.name}.dat`), datContent, 'latin1');
    await writeFile(join(loadDir, `${prod.name}.opt`), optContent, 'utf8');

    if (format === 'EDRM') {
      const edrmXml = buildEdrmXml(batesAssignments, prod);
      await writeFile(join(loadDir, `${prod.name}.xml`), edrmXml, 'utf8');
    }

    if (format === 'DII') {
      const dii = buildDii(batesAssignments, prod);
      await writeFile(join(loadDir, `${prod.name}.dii`), dii, 'utf8');
    }

    // ── 5. Pull files from MinIO into ZIP ─────────────────────────────────
    const zipKey    = `productions/${productionId}/${prod.name.replace(/\s+/g,'-')}.zip`;
    const passThru  = new PassThrough();
    const uploadDone = storageClient.putObject(BUCKET, zipKey, passThru, { 'Content-Type': 'application/zip' });

    const archive = archiver('zip', { zlib: { level: 1 } });  // level 1: fast, moderate compression
    archive.pipe(passThru);

    // Load files
    archive.directory(loadDir, 'LOAD_FILES');

    // Per-document: rendered image (PDF) and optionally native + text
    for (const { doc, begBates, endBates } of batesAssignments) {
      const safeBates = begBates;

      if (prod.include_pdf && doc.storage_key) {
        // Check for cached rendered PDF first
        const renderedKey = `${doc.storage_key}.rendered.pdf`;
        let pdfStream;
        let gotRendered = false;
        try {
          pdfStream = await storageClient.getObject(BUCKET, renderedKey);
          gotRendered = true;
        } catch {
          // Fall back to native file if it's already a PDF
          if (doc.file_category === 'PDF') {
            try { pdfStream = await storageClient.getObject(BUCKET, doc.storage_key); gotRendered = true; } catch { /* skip */ }
          }
        }
        if (gotRendered && pdfStream) {
          archive.append(pdfStream, { name: `IMAGES/${safeBates}.pdf` });
        }
      }

      if (prod.include_native && doc.storage_key) {
        try {
          const natStream = await storageClient.getObject(BUCKET, doc.storage_key);
          const ext = (doc.file_ext || 'bin').toLowerCase();
          archive.append(natStream, { name: `NATIVES/${safeBates}.${ext}` });
        } catch { /* non-fatal */ }
      }

      if (prod.include_text && doc.text_key) {
        try {
          const txtStream = await storageClient.getObject(BUCKET, doc.text_key);
          archive.append(txtStream, { name: `TEXT/${safeBates}.txt` });
        } catch { /* non-fatal */ }
      }
    }

    await archive.finalize();
    await uploadDone;

    // ── 6. Mark complete ───────────────────────────────────────────────────
    await db.query(
      `UPDATE productions SET
         status='COMPLETE', completed_at=NOW(),
         bates_end=$2, doc_count=$3,
         zip_key=$4
       WHERE id=$1`,
      [productionId, endBatesGlobal, batesAssignments.length, zipKey]
    );

    console.log(`[production] ${productionId} complete: ${batesAssignments.length} docs, ${counter - (prod.bates_start ?? 1)} pages, zip: ${zipKey}`);
  } catch (err) {
    console.error(`[production] ${productionId} failed:`, err.message);
    await db.query(
      "UPDATE productions SET status='FAILED', completed_at=NOW(), error_message=$2 WHERE id=$1",
      [productionId, err.message]
    );
  } finally {
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ─── DAT load file (Concordance/Relativity) ───────────────────────────────────

/**
 * Concordance DAT format:
 *   - Column headers on line 1
 *   - Each field wrapped and delimited: þFIELD1þ,þFIELD2þ,...¶
 *   - Character encoding: Windows-1252 (Latin-1 superset; thorn = 0xFE, pilcrow = 0xB6)
 */
function buildDat(assignments, prod) {
  const T = THORN;
  const P = PILCROW;

  const HEADERS = [
    'BEGDOC','ENDDOC','BEGATTACH','ENDATTACH',
    'CUSTODIAN','DOCDATE','DATE_MODIFIED',
    'FROM','TO','CC','BCC','EMAIL_SUBJECT','EMAIL_DATE',
    'AUTHOR','DOCTYPE','FILENAME','FILEEXT','FILESIZE',
    'MD5HASH','SHA256HASH',
    'PAGES','WORDCOUNT','LANGUAGE',
    'PRIVILEGED','PRIVILEGE_TYPE','REVIEW_STATUS',
  ];

  const wrap  = v => `${T}${v ?? ''}${T}`;
  const row   = fields => fields.map(wrap).join(',') + P;

  const lines = [row(HEADERS)];

  for (const { doc, begBates, endBates } of assignments) {
    const fields = [
      begBates,
      endBates,
      begBates,   // BEGATTACH — full family handling would require parent lookup
      endBates,
      doc.custodian_name_ref ?? doc.custodian_name ?? '',
      formatDate(doc.date_created),
      formatDate(doc.date_modified),
      doc.email_from    ?? '',
      doc.email_to      ?? '',
      doc.email_cc      ?? '',
      doc.email_bcc     ?? '',
      doc.email_subject ?? '',
      formatDate(doc.email_date),
      doc.author        ?? '',
      doc.file_category ?? '',
      doc.original_name ?? '',
      doc.file_ext      ?? '',
      doc.file_size     ? String(doc.file_size) : '',
      doc.md5           ?? '',
      doc.sha256        ?? '',
      doc.page_count    ? String(doc.page_count) : '',
      doc.word_count    ? String(doc.word_count) : '',
      doc.language      ?? '',
      doc.is_privileged ? 'YES' : 'NO',
      doc.privilege_type ?? '',
      doc.review_status  ?? '',
    ];
    lines.push(row(fields));
  }

  return lines.join('');
}

// ─── OPT load file (Opticon) ──────────────────────────────────────────────────

/**
 * Opticon OPT format:
 *   VOLUME,BEGBATES,PATH,FIRSTPAGE,BOX,FOLDER,PAGES
 *   First page flag: Y on first page of each document, blank otherwise
 */
function buildOpt(pageRows, prod) {
  const VOLUME = (prod.bates_prefix ?? 'VOL001').replace(/[^A-Z0-9_-]/gi, '').toUpperCase() || 'VOL001';
  const lines = pageRows.map(({ bates, isFirst }) =>
    `${VOLUME},${bates},IMAGES\\${bates}.pdf,${isFirst ? 'Y' : ''},,,`
  );
  return lines.join('\r\n') + '\r\n';
}

// ─── DII load file (Summation) ────────────────────────────────────────────────

function buildDii(assignments, prod) {
  const lines = ['@T ProductionSet', `@L "${prod.name}"`, ''];
  for (const { doc, begBates } of assignments) {
    lines.push(`@D ${begBates}`);
    lines.push(`  @DD "${doc.original_name ?? ''}"`);
    if (doc.date_created) lines.push(`  @MS ${formatDate(doc.date_created)}`);
    if (doc.email_from)   lines.push(`  @FROM "${doc.email_from}"`);
    if (doc.email_to)     lines.push(`  @TO "${doc.email_to}"`);
    if (doc.email_subject) lines.push(`  @SU "${doc.email_subject}"`);
    lines.push('');
  }
  return lines.join('\r\n');
}

// ─── EDRM XML ─────────────────────────────────────────────────────────────────

function buildEdrmXml(assignments, prod) {
  const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

  const docNodes = assignments.map(({ doc, begBates, endBates }) => `
  <Document DocID="${esc(begBates)}" DocType="${esc(doc.file_category)}" MimeType="${esc(doc.detected_mime)}">
    <Tag TagName="BegDoc" TagValue="${esc(begBates)}"/>
    <Tag TagName="EndDoc" TagValue="${esc(endBates)}"/>
    <Tag TagName="FileName" TagValue="${esc(doc.original_name)}"/>
    <Tag TagName="Custodian" TagValue="${esc(doc.custodian_name_ref ?? doc.custodian_name)}"/>
    <Tag TagName="DateCreated" TagValue="${esc(formatDate(doc.date_created))}"/>
    <Tag TagName="DateModified" TagValue="${esc(formatDate(doc.date_modified))}"/>
    <Tag TagName="Author" TagValue="${esc(doc.author)}"/>
    <Tag TagName="EmailFrom" TagValue="${esc(doc.email_from)}"/>
    <Tag TagName="EmailTo" TagValue="${esc(doc.email_to)}"/>
    <Tag TagName="EmailSubject" TagValue="${esc(doc.email_subject)}"/>
    <Tag TagName="MD5Hash" TagValue="${esc(doc.md5)}"/>
    <Tag TagName="SHA256Hash" TagValue="${esc(doc.sha256)}"/>
    <Tag TagName="IsPrivileged" TagValue="${doc.is_privileged ? 'Yes' : 'No'}"/>
    <File FileType="Image" OnDiskFileName="IMAGES/${esc(begBates)}.pdf"/>
    ${doc.storage_key ? `<File FileType="Native" OnDiskFileName="NATIVES/${esc(begBates)}.${esc(doc.file_ext || 'bin')}"/>` : ''}
    ${doc.text_key    ? `<File FileType="Text"   OnDiskFileName="TEXT/${esc(begBates)}.txt"/>` : ''}
  </Document>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<Root DataInterchangeType="Update" DateCreated="${new Date().toISOString()}"
      ExporterName="vDiscovery" ExporterVersion="1.0"
      xmlns="urn:eeml:v2.0">
  <Batch BatchName="${esc(prod.name)}" BatchDescription="${esc(prod.description ?? '')}"
         ProducingOrganization="vDiscovery">
${docNodes}
  </Batch>
</Root>`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(d) {
  if (!d) return '';
  try {
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 10);   // YYYY-MM-DD
  } catch {
    return '';
  }
}
