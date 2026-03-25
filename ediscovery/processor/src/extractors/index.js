/**
 * Extractor Registry
 *
 * Maps file types/MIME types to their appropriate text extractors.
 * Type detection uses Apache Tika (magic bytes) — never trust file extensions alone.
 *
 * Supported file types: 500+ via Apache Tika.
 * Specialized extractors for email, Office, PDF, images, archives.
 *
 * Tika endpoint: http://tika:9998
 *   PUT /tika          → extract text
 *   PUT /meta          → extract metadata as JSON
 *   PUT /detect/stream → detect MIME type
 */

import fetch from 'node-fetch';
import { FILE_CATEGORY } from '../../../shared/src/constants.js';

const TIKA_URL = process.env.TIKA_URL ?? 'http://localhost:9998';

// ─── MIME → Category Mapping ──────────────────────────────────────────────────
const MIME_TO_CATEGORY = {
  // Email
  'message/rfc822':                         FILE_CATEGORY.EMAIL,
  'application/vnd.ms-outlook':             FILE_CATEGORY.EMAIL,       // MSG
  'application/mbox':                       FILE_CATEGORY.EMAIL,
  'application/vnd.ms-pst':                 FILE_CATEGORY.EMAIL_CONTAINER,
  'application/vnd.ms-outlook-pst':         FILE_CATEGORY.EMAIL_CONTAINER,
  'application/x-lotus-notes-database':     FILE_CATEGORY.EMAIL_CONTAINER, // NSF

  // Office — Word
  'application/msword':                                           FILE_CATEGORY.OFFICE_WORD,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FILE_CATEGORY.OFFICE_WORD,
  'application/rtf':                                              FILE_CATEGORY.OFFICE_WORD,
  'text/rtf':                                                     FILE_CATEGORY.OFFICE_WORD,
  'application/vnd.oasis.opendocument.text':                      FILE_CATEGORY.OFFICE_WORD,

  // Office — Excel
  'application/vnd.ms-excel':                                     FILE_CATEGORY.OFFICE_EXCEL,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FILE_CATEGORY.OFFICE_EXCEL,
  'application/vnd.oasis.opendocument.spreadsheet':               FILE_CATEGORY.OFFICE_EXCEL,
  'text/csv':                                                     FILE_CATEGORY.OFFICE_EXCEL,

  // Office — PowerPoint
  'application/vnd.ms-powerpoint':                                FILE_CATEGORY.OFFICE_PPT,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': FILE_CATEGORY.OFFICE_PPT,
  'application/vnd.oasis.opendocument.presentation':              FILE_CATEGORY.OFFICE_PPT,

  // PDF
  'application/pdf':                        FILE_CATEGORY.PDF,

  // Images
  'image/jpeg':                             FILE_CATEGORY.IMAGE,
  'image/png':                              FILE_CATEGORY.IMAGE,
  'image/tiff':                             FILE_CATEGORY.IMAGE,
  'image/bmp':                              FILE_CATEGORY.IMAGE,
  'image/gif':                              FILE_CATEGORY.IMAGE,
  'image/webp':                             FILE_CATEGORY.IMAGE,
  'image/heic':                             FILE_CATEGORY.IMAGE,
  'image/heif':                             FILE_CATEGORY.IMAGE,

  // Video
  'video/mp4':                              FILE_CATEGORY.VIDEO,
  'video/quicktime':                        FILE_CATEGORY.VIDEO,
  'video/x-msvideo':                        FILE_CATEGORY.VIDEO,
  'video/x-matroska':                       FILE_CATEGORY.VIDEO,
  'video/webm':                             FILE_CATEGORY.VIDEO,

  // Audio
  'audio/mpeg':                             FILE_CATEGORY.AUDIO,
  'audio/mp4':                              FILE_CATEGORY.AUDIO,
  'audio/wav':                              FILE_CATEGORY.AUDIO,
  'audio/x-wav':                            FILE_CATEGORY.AUDIO,
  'audio/flac':                             FILE_CATEGORY.AUDIO,
  'audio/ogg':                              FILE_CATEGORY.AUDIO,

  // Archives (containers)
  'application/zip':                        FILE_CATEGORY.ARCHIVE,
  'application/x-zip-compressed':          FILE_CATEGORY.ARCHIVE,
  'application/x-rar-compressed':          FILE_CATEGORY.ARCHIVE,
  'application/x-7z-compressed':           FILE_CATEGORY.ARCHIVE,
  'application/x-tar':                     FILE_CATEGORY.ARCHIVE,
  'application/gzip':                      FILE_CATEGORY.ARCHIVE,
  'application/x-bzip2':                   FILE_CATEGORY.ARCHIVE,
  'application/vnd.ms-cab-compressed':     FILE_CATEGORY.ARCHIVE,

  // Databases
  'application/x-msaccess':                FILE_CATEGORY.DATABASE,
  'application/x-sqlite3':                 FILE_CATEGORY.DATABASE,
  'application/x-dbase':                   FILE_CATEGORY.DATABASE,

  // Text / Code
  'text/plain':                            FILE_CATEGORY.TEXT,
  'text/html':                             FILE_CATEGORY.TEXT,
  'application/xhtml+xml':                FILE_CATEGORY.TEXT,
  'application/xml':                       FILE_CATEGORY.TEXT,
  'application/json':                      FILE_CATEGORY.TEXT,
  'application/javascript':               FILE_CATEGORY.CODE,
  'text/x-python':                        FILE_CATEGORY.CODE,
  'text/x-java-source':                   FILE_CATEGORY.CODE,
  'text/x-csrc':                          FILE_CATEGORY.CODE,

  // Calendar / Contact
  'text/calendar':                         FILE_CATEGORY.CALENDAR,
  'text/vcard':                            FILE_CATEGORY.CONTACT,

  // eBook
  'application/epub+zip':                  FILE_CATEGORY.EBOOK,

  // Executables (usually excluded / de-NISTed)
  'application/x-msdownload':             FILE_CATEGORY.EXECUTABLE,
  'application/x-executable':             FILE_CATEGORY.EXECUTABLE,
};

// Container types (need expansion)
const CONTAINER_CATEGORIES = new Set([
  FILE_CATEGORY.ARCHIVE,
  FILE_CATEGORY.EMAIL_CONTAINER,
]);

// ─── File Type Detection via Tika ─────────────────────────────────────────────

/**
 * Detect the true file type using Apache Tika magic bytes detection.
 * Returns MIME type, category, and container/encryption flags.
 *
 * @param {ReadableStream} fileStream
 * @param {string} originalName - used to determine declared MIME
 * @returns {Promise<{mimeType, declaredMime, category, isContainer, isEncrypted, canExtractText}>}
 */
export async function detectFileType(fileStream, originalName) {
  let detectedMime = 'application/octet-stream';
  let isEncrypted  = false;
  let encryptionType = null;

  try {
    // Collect first 8 KB for magic byte detection (more is fine)
    const chunks = [];
    let size = 0;
    for await (const chunk of fileStream) {
      chunks.push(chunk);
      size += chunk.length;
      if (size > 65536) break; // 64 KB max for detection
    }
    const head = Buffer.concat(chunks);

    const response = await fetch(`${TIKA_URL}/detect/stream`, {
      method:  'PUT',
      headers: {
        'Content-Type':              'application/octet-stream',
        'Content-Disposition':       `attachment; filename="${encodeURIComponent(originalName)}"`,
        'X-Tika-OCRLanguage':       'eng',
      },
      body: head,
    });

    if (response.ok) {
      detectedMime = (await response.text()).trim();
    }

    // Check for encryption signatures in magic bytes
    isEncrypted  = detectEncryption(head, detectedMime);
    encryptionType = isEncrypted ? inferEncryptionType(head, detectedMime) : null;
  } catch (err) {
    console.warn(`[typeDetection] Tika detection failed for "${originalName}": ${err.message}`);
  }

  const ext          = getExtension(originalName);
  const declaredMime = extensionToMime(ext);
  const category     = MIME_TO_CATEGORY[detectedMime] ?? FILE_CATEGORY.UNKNOWN;
  const isContainer  = CONTAINER_CATEGORIES.has(category);

  // Encrypted Office files use OOXML CFBF wrapper
  const canExtractText = !isEncrypted || detectedMime.includes('text/');

  return {
    mimeType: detectedMime,
    declaredMime,
    category,
    isContainer,
    isEncrypted,
    encryptionType,
    canExtractText,
  };
}

// ─── Text Extractors by Category ─────────────────────────────────────────────

/**
 * Get the appropriate text extractor for a file category / MIME type.
 * Falls back to Tika universal extractor for unsupported types.
 */
function getTextExtractor(category, mimeType) {
  // Tika handles most formats
  return {
    async extractText(fileStream, { mimeType: mime, fileName }) {
      try {
        const chunks = [];
        for await (const chunk of fileStream) chunks.push(chunk);
        const body = Buffer.concat(chunks);

        const response = await fetch(`${TIKA_URL}/tika`, {
          method:  'PUT',
          headers: {
            'Content-Type':        mime ?? 'application/octet-stream',
            'Accept':              'text/plain',
            'X-Tika-OCRskipOcr': 'true',  // OCR runs in separate stage
            'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
          },
          body,
        });

        if (response.status === 422) {
          // Tika signals encrypted/password-protected
          throw new Error('File is encrypted or password-protected');
        }

        if (!response.ok) {
          throw new Error(`Tika returned ${response.status}`);
        }

        const text = await response.text();
        return { text: text.trim(), confidence: 1.0 };
      } catch (err) {
        if (err.message.includes('password') || err.message.includes('encrypted')) {
          throw err; // re-throw so pipeline marks as NEEDS_REMEDIATION
        }
        return { text: '', confidence: 0 };
      }
    },
  };
}

/**
 * Get the container expander for archive/PST/NSF files.
 */
function getContainerExtractor(category) {
  if (category === FILE_CATEGORY.ARCHIVE) {
    return {
      async expand(fileStream, options) {
        // Dynamic import to avoid loading heavy deps at startup
        const { expandArchive } = await import('./archive.js');
        return expandArchive(fileStream, options);
      },
    };
  }

  if (category === FILE_CATEGORY.EMAIL_CONTAINER) {
    return {
      async expand(fileStream, options) {
        const { expandEmailContainer } = await import('./email.js');
        return expandEmailContainer(fileStream, options);
      },
    };
  }

  return null;
}

/**
 * OCR extractor — uses Tesseract via Tika (or Azure Cognitive Services if configured).
 */
const ocrExtractor = {
  async run(fileStream, { mimeType, fileName }) {
    const chunks = [];
    for await (const chunk of fileStream) chunks.push(chunk);
    const body = Buffer.concat(chunks);

    const response = await fetch(`${TIKA_URL}/tika`, {
      method:  'PUT',
      headers: {
        'Content-Type':       mimeType ?? 'application/octet-stream',
        'Accept':             'text/plain',
        'X-Tika-OCRLanguage': 'eng',       // TODO: multi-language support
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Tika OCR returned ${response.status}`);
    }

    const text = await response.text();

    // Tika doesn't expose per-character confidence; use heuristic
    const confidence = estimateOcrConfidence(text);

    return {
      text:      text.trim(),
      confidence,
      engine:    'tika-tesseract',
      pageCount: estimatePageCount(text),
    };
  },
};

export const extractors = {
  getTextExtractor,
  getContainerExtractor,
  ocrExtractor,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getExtension(filename) {
  const match = filename.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : '';
}

function extensionToMime(ext) {
  const map = {
    'pdf': 'application/pdf', 'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'eml': 'message/rfc822', 'msg': 'application/vnd.ms-outlook',
    'txt': 'text/plain', 'csv': 'text/csv',
    'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png',
    'tif': 'image/tiff', 'tiff': 'image/tiff',
    'zip': 'application/zip', 'pst': 'application/vnd.ms-pst',
  };
  return map[ext] ?? 'application/octet-stream';
}

function detectEncryption(buffer, mimeType) {
  // OLE2 compound file (CFBF) header — may be encrypted Office doc
  if (buffer.length >= 8 &&
      buffer[0] === 0xD0 && buffer[1] === 0xCF &&
      buffer[2] === 0x11 && buffer[3] === 0xE0) {
    // Check for encryption stream within compound file — simplified check
    return buffer.indexOf(Buffer.from('EncryptedPackage', 'utf16le')) !== -1;
  }
  // ZIP with password (local file header with general purpose bit 0x0001)
  if (buffer.length >= 4 &&
      buffer[0] === 0x50 && buffer[1] === 0x4B &&
      buffer[2] === 0x03 && buffer[3] === 0x04) {
    const flags = buffer.readUInt16LE(6);
    return (flags & 0x0001) !== 0;
  }
  return false;
}

function inferEncryptionType(buffer, mimeType) {
  if (mimeType.includes('ms-office') || mimeType.includes('openxmlformats')) {
    return 'OFFICE_ENCRYPTION';
  }
  if (mimeType === 'application/zip') return 'ZIP_PASSWORD';
  return 'UNKNOWN_ENCRYPTION';
}

function estimateOcrConfidence(text) {
  if (!text || text.length === 0) return 0;
  // Heuristic: ratio of recognizable words to total tokens
  const tokens = text.split(/\s+/).filter(Boolean);
  const wordLike = tokens.filter(t => /^[a-zA-Z]{2,}$/.test(t)).length;
  return Math.min(1, wordLike / Math.max(tokens.length, 1));
}

function estimatePageCount(text) {
  // Rough estimate: ~2500 characters per page
  return Math.max(1, Math.ceil(text.length / 2500));
}
