/**
 * Document Renderer Service
 *
 * Converts documents to a browser-viewable format WITHOUT proprietary licenses.
 *
 * Strategy by file type:
 *
 *   PDF → serve as-is (Content-Type: application/pdf)
 *         Browser's native PDF viewer handles it (Chrome, Firefox, Safari all built-in)
 *
 *   Images (JPEG/PNG/TIFF/BMP/GIF/WebP)
 *         → serve as-is (Content-Type: image/*)
 *
 *   Office (DOCX/XLSX/PPTX/DOC/XLS/PPT/RTF/ODP/ODS/ODT)
 *         → LibreOffice headless: `libreoffice --headless --convert-to pdf`
 *         → Pipe resulting PDF back to browser
 *         LibreOffice is MPL 2.0 — completely free, no license needed.
 *         Installed in Docker via: apt-get install libreoffice
 *
 *   Email (EML/MSG)
 *         → Parse headers + body via Tika
 *         → Render as sanitized HTML (no external resources, no scripts)
 *         → Inline attachments listed as links
 *
 *   Text/Code/JSON/XML/CSV
 *         → serve as text/plain; browser renders it
 *
 *   Everything else
 *         → return extracted text if available
 *         → otherwise: 404 with instructions to download
 *
 * NOTE: LibreOffice conversion is cached in MinIO as {storageKey}.pdf
 * so repeat views of the same doc don't reconvert.
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import { mkdtemp, rm, readFile, writeFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { Readable } from 'stream';
import fetch from 'node-fetch';
import { storageClient, BUCKET } from './storage.js';

const execFileAsync = promisify(execFile);
const TIKA_URL = process.env.TIKA_URL ?? 'http://localhost:9998';

const OFFICE_CATEGORIES = new Set([
  'OFFICE_WORD', 'OFFICE_EXCEL', 'OFFICE_PPT',
]);

const IMAGE_MIMES = new Set([
  'image/jpeg','image/png','image/gif','image/webp',
  'image/bmp','image/svg+xml',
]);

// TIFF needs special handling — convert to PNG via LibreOffice or serve directly
// Most browsers support TIFF natively on macOS but not on Windows/Linux
const TIFF_MIMES = new Set(['image/tiff','image/tif']);

/**
 * Render a document for in-browser viewing.
 *
 * @param {object} doc - document record from DB
 * @param {ReadableStream} fileStream - file bytes from MinIO
 * @returns {Promise<{contentType: string, stream: ReadableStream}>}
 */
export async function renderDocument(doc, fileStream) {
  const cat  = doc.file_category;
  const mime = doc.detected_mime ?? '';

  // ── PDF: serve directly ──────────────────────────────────────────────────
  if (cat === 'PDF' || mime === 'application/pdf') {
    return { contentType: 'application/pdf', stream: fileStream };
  }

  // ── Images: serve directly ────────────────────────────────────────────────
  if (IMAGE_MIMES.has(mime)) {
    return { contentType: mime, stream: fileStream };
  }

  // ── TIFF: convert via LibreOffice if available, else serve directly ───────
  if (TIFF_MIMES.has(mime)) {
    // Try LibreOffice TIFF → PDF; fall back to direct serve
    try {
      const pdfStream = await convertWithLibreOffice(fileStream, 'tif');
      return { contentType: 'application/pdf', stream: pdfStream };
    } catch {
      return { contentType: 'image/tiff', stream: fileStream };
    }
  }

  // ── Office documents: LibreOffice → PDF ───────────────────────────────────
  if (OFFICE_CATEGORIES.has(cat)) {
    // Check if we already have a cached PDF rendering
    const cachedKey = `${doc.storage_key}.rendered.pdf`;
    try {
      const cachedStream = await storageClient.getObject(BUCKET, cachedKey);
      return { contentType: 'application/pdf', stream: cachedStream };
    } catch {
      // Not cached yet — convert now
    }

    const ext = getExtension(doc.original_name) || guessExtension(mime);
    const pdfBuffer = await convertWithLibreOffice(fileStream, ext);

    // Cache the rendered PDF for future requests
    try {
      await storageClient.putObject(BUCKET, cachedKey, Readable.from(pdfBuffer));
    } catch { /* non-fatal — just don't cache */ }

    return { contentType: 'application/pdf', stream: Readable.from(pdfBuffer) };
  }

  // ── Email: render to HTML ─────────────────────────────────────────────────
  if (cat === 'EMAIL') {
    const html = await renderEmailToHtml(doc, fileStream);
    return { contentType: 'text/html; charset=utf-8', stream: Readable.from(html) };
  }

  // ── Text / Code / CSV / JSON / XML ────────────────────────────────────────
  if (cat === 'TEXT' || cat === 'CODE' || mime.startsWith('text/')) {
    return { contentType: 'text/plain; charset=utf-8', stream: fileStream };
  }

  // ── Fallback: try Tika → plain text ──────────────────────────────────────
  const text = await extractTextViaTika(fileStream, mime);
  if (text) {
    return { contentType: 'text/plain; charset=utf-8', stream: Readable.from(text) };
  }

  // Nothing worked
  throw Object.assign(new Error('No renderable format available'), { status: 415 });
}

// ─── LibreOffice conversion ───────────────────────────────────────────────────

/**
 * Convert a file to PDF using LibreOffice headless.
 * LibreOffice is installed in the Docker image — completely free, no license.
 *
 * @param {ReadableStream} inputStream
 * @param {string} ext - file extension hint (without dot)
 * @returns {Promise<Buffer>} - PDF bytes
 */
async function convertWithLibreOffice(inputStream, ext) {
  const tmpDir  = await mkdtemp(join(tmpdir(), 'vdisco-'));
  const inFile  = join(tmpDir, `input.${ext || 'docx'}`);
  const outFile = join(tmpDir, `input.pdf`);

  try {
    // Write input file
    const chunks = [];
    for await (const chunk of inputStream) chunks.push(chunk);
    await writeFile(inFile, Buffer.concat(chunks));

    // Run LibreOffice headless conversion
    // Timeout: 120 seconds (large Excel files can take time)
    await execFileAsync('libreoffice', [
      '--headless',
      '--norestore',
      '--nofirststartwizard',
      '--convert-to', 'pdf',
      '--outdir', tmpDir,
      inFile,
    ], { timeout: 120000 });

    const pdfBuffer = await readFile(outFile);
    return pdfBuffer;
  } finally {
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ─── Email HTML renderer ──────────────────────────────────────────────────────

async function renderEmailToHtml(doc, fileStream) {
  // Use Tika to extract email metadata + body as HTML
  const chunks = [];
  for await (const chunk of fileStream) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  let htmlBody = '';
  let meta = {};

  try {
    // Get metadata
    const metaRes = await fetch(`${TIKA_URL}/meta`, {
      method: 'PUT',
      headers: { 'Content-Type': doc.detected_mime ?? 'message/rfc822', 'Accept': 'application/json' },
      body,
    });
    if (metaRes.ok) meta = await metaRes.json();

    // Get HTML body
    const htmlRes = await fetch(`${TIKA_URL}/tika`, {
      method: 'PUT',
      headers: { 'Content-Type': doc.detected_mime ?? 'message/rfc822', 'Accept': 'text/html' },
      body,
    });
    if (htmlRes.ok) htmlBody = await htmlRes.text();
  } catch { /* non-fatal */ }

  const from    = doc.email_from ?? meta['Message-From'] ?? '';
  const to      = meta['Message-To'] ?? '';
  const subject = doc.email_subject ?? meta['dc:title'] ?? meta['subject'] ?? '';
  const date    = meta['dcterms:created'] ?? meta['Date'] ?? '';

  // Build sanitized HTML — no external resources, no scripts
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'">
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, system-ui, sans-serif; font-size: 14px; color: #1a1a1a; margin: 0; background: #fff; }
    .header { background: #f8f9fa; border-bottom: 1px solid #dee2e6; padding: 16px 20px; }
    .header-row { display: flex; gap: 8px; margin-bottom: 6px; font-size: 13px; }
    .header-label { color: #6c757d; min-width: 60px; font-weight: 600; }
    .subject { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
    .body { padding: 20px; }
    a { color: #0066cc; }
    table { border-collapse: collapse; max-width: 100%; }
    td, th { border: 1px solid #dee2e6; padding: 6px 10px; }
    img { max-width: 100%; height: auto; }
    blockquote { border-left: 3px solid #dee2e6; margin: 0 0 0 16px; padding-left: 12px; color: #6c757d; }
  </style>
</head>
<body>
  <div class="header">
    <div class="subject">${escHtml(subject)}</div>
    <div class="header-row"><span class="header-label">From:</span> ${escHtml(from)}</div>
    ${to    ? `<div class="header-row"><span class="header-label">To:</span> ${escHtml(to)}</div>` : ''}
    ${date  ? `<div class="header-row"><span class="header-label">Date:</span> ${escHtml(date)}</div>` : ''}
  </div>
  <div class="body">
    ${sanitizeEmailHtml(htmlBody)}
  </div>
</body>
</html>`;
}

// ─── Text extraction via Tika (fallback) ──────────────────────────────────────

async function extractTextViaTika(fileStream, mimeType) {
  try {
    const chunks = [];
    for await (const chunk of fileStream) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    const res = await fetch(`${TIKA_URL}/tika`, {
      method: 'PUT',
      headers: { 'Content-Type': mimeType ?? 'application/octet-stream', 'Accept': 'text/plain' },
      body,
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getExtension(filename) {
  const match = filename?.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
}

function guessExtension(mime) {
  const map = {
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'application/rtf': 'rtf',
    'text/rtf': 'rtf',
    'application/vnd.oasis.opendocument.text': 'odt',
    'application/vnd.oasis.opendocument.spreadsheet': 'ods',
    'application/vnd.oasis.opendocument.presentation': 'odp',
  };
  return map[mime] ?? 'bin';
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Sanitize HTML from email bodies:
 * - Remove script tags
 * - Remove external image sources (privacy + security)
 * - Remove form elements
 * - Remove javascript: links
 * - Keep safe formatting (bold, italic, tables, blockquote)
 */
function sanitizeEmailHtml(html) {
  if (!html) return '<p style="color:#999">(No message body)</p>';

  return html
    // Remove dangerous elements entirely
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[^>]*>/gi, '')
    // Remove tracking pixels and external images
    .replace(/<img([^>]*)\bsrc=["']https?:\/\/[^"']+["']([^>]*)>/gi,
      '<span style="display:none">[external image removed]</span>')
    // Remove event handlers
    .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: links
    .replace(/href=["']javascript:[^"']*["']/gi, 'href="#"');
}
