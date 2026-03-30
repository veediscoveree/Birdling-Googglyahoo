/**
 * Metadata Extraction via Apache Tika
 *
 * Returns structured metadata mapped to the EDRM field names.
 * Tika returns hundreds of metadata fields per document type.
 * We extract the most legally relevant ones.
 */
import fetch from 'node-fetch';

const TIKA_URL = process.env.TIKA_URL ?? 'http://localhost:9998';

/**
 * Extract metadata from a file stream.
 *
 * @param {ReadableStream} fileStream
 * @param {string} mimeType
 * @param {string} fileCategory
 * @returns {Promise<object>} - normalized metadata fields matching documents table columns
 */
export async function extractMetadata(fileStream, mimeType, fileCategory) {
  const chunks = [];
  for await (const chunk of fileStream) chunks.push(chunk);
  const body = Buffer.concat(chunks);

  let raw = {};

  try {
    const response = await fetch(`${TIKA_URL}/meta`, {
      method:  'PUT',
      headers: { 'Content-Type': mimeType ?? 'application/octet-stream', 'Accept': 'application/json' },
      body,
    });
    if (response.ok) {
      raw = await response.json();
    }
  } catch (err) {
    // Non-fatal: metadata extraction failure means we proceed with empty metadata
    console.warn('[metadata] Tika metadata extraction failed:', err.message);
    return {};
  }

  return normalizeMetadata(raw, fileCategory);
}

/**
 * Normalize Tika's raw metadata into our schema fields.
 */
function normalizeMetadata(raw, fileCategory) {
  const m = {};

  // ── Dates ─────────────────────────────────────────────────────────────────
  m.date_created  = parseDate(raw['dcterms:created'] ?? raw['Creation-Date'] ?? raw['created']);
  m.date_modified = parseDate(raw['dcterms:modified'] ?? raw['Last-Modified'] ?? raw['modified'] ?? raw['Last-Save-Date']);
  m.date_accessed = parseDate(raw['Last-Accessed']);

  // ── Document metadata ──────────────────────────────────────────────────────
  m.author       = firstStr(raw['dc:creator'] ?? raw['Author'] ?? raw['creator']);
  m.last_author  = firstStr(raw['Last-Author'] ?? raw['modifier']);
  m.title        = firstStr(raw['dc:title'] ?? raw['title']);
  m.subject      = firstStr(raw['dc:subject'] ?? raw['subject']);
  m.company      = firstStr(raw['extended-properties:Company'] ?? raw['Organization']);
  m.keywords     = toArray(raw['dc:subject'] ?? raw['Keywords'] ?? raw['meta:keyword']);
  m.comments     = firstStr(raw['dc:description'] ?? raw['Comments'] ?? raw['comment']);
  m.revision     = parseInt(raw['cp:revision'] ?? raw['Revision-Number']) || null;
  m.page_count   = parseInt(raw['xmpTPg:NPages'] ?? raw['meta:page-count'] ?? raw['Page-Count']) || null;
  m.word_count   = parseInt(raw['meta:word-count'] ?? raw['Word-Count']) || null;
  m.char_count   = parseInt(raw['meta:character-count'] ?? raw['Character-Count']) || null;
  m.creating_app = firstStr(raw['extended-properties:Application'] ?? raw['producer'] ?? raw['pdf:PDFVersion'] ? null : raw['generator']);
  m.creating_app_ver = firstStr(raw['extended-properties:AppVersion'] ?? raw['Application-Version']);

  // Document-specific counts
  m.slide_count  = parseInt(raw['meta:slide-count'] ?? raw['Slide-Count']) || null;
  m.sheet_count  = parseInt(raw['meta:sheet-count'] ?? raw['Sheet-Count']) || null;

  // Security flags
  m.has_macros         = raw['meta:contains-macros'] === 'true' || raw['embeddedResourceType']?.includes('Macro');
  m.has_track_changes  = raw['meta:has-revision-information'] === 'true';
  m.has_hidden_content = raw['meta:has-hidden-sheets'] === 'true' || raw['Hidden-Slide-Count'] > 0;
  m.is_encrypted       = raw['protected'] === 'true' || raw['encryption'] != null;

  // ── Email fields ────────────────────────────────────────────────────────────
  if (raw['Message-From'] || raw['From']) {
    m.email_from        = firstStr(raw['Message-From'] ?? raw['From']);
    m.email_to          = toArray(raw['Message-To'] ?? raw['To']);
    m.email_cc          = toArray(raw['Message-Cc'] ?? raw['Cc']);
    m.email_bcc         = toArray(raw['Message-Bcc'] ?? raw['Bcc']);
    m.email_subject     = firstStr(raw['dc:title'] ?? raw['subject'] ?? raw['Subject']);
    m.email_date        = parseDate(raw['dcterms:created'] ?? raw['Date'] ?? raw['Message-Date']);
    m.email_message_id  = firstStr(raw['Message-ID'] ?? raw['message-id']);
    m.in_reply_to       = firstStr(raw['In-Reply-To']);
    m.email_references  = toArray(raw['References']);
    m.conversation_id   = firstStr(raw['Conversation-ID'] ?? raw['Thread-Index']);
    m.conversation_topic = firstStr(raw['Conversation-Topic']);
    m.attachment_count  = parseInt(raw['Attachment-Count']) || 0;
  }

  // Remove null/undefined/NaN values
  return Object.fromEntries(
    Object.entries(m).filter(([_, v]) => v !== null && v !== undefined && !Number.isNaN(v))
  );
}

function firstStr(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val[0] ?? null;
  return String(val).substring(0, 2000) || null;
}

function toArray(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val.map(String).filter(Boolean);
  const s = String(val).trim();
  if (!s) return null;
  // Split by comma or semicolon for multi-value fields
  return s.split(/[,;]\s+/).filter(Boolean);
}

function parseDate(val) {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}
