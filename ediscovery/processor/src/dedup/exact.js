/**
 * Exact Deduplication and NIST De-NISTing
 *
 * Exact dedup: compare SHA-256 hashes.
 * NIST: check SHA-1 against National Software Reference Library (NSRL)
 *   loaded into the nist_reference table.
 */

import { db } from '../db.js';

/**
 * Check if a file hash is in the NIST NSRL database.
 * If it is, the file is a known system/application file and should be excluded.
 *
 * @param {string} sha1 - SHA-1 hash of the file
 * @returns {Promise<{product_name: string}|null>}
 */
export async function checkNist(sha1) {
  if (!sha1) return null;
  const result = await db.query(
    'SELECT product_name FROM nist_reference WHERE sha1 = $1 LIMIT 1',
    [sha1]
  );
  return result.rows[0] ?? null;
}

/**
 * Verify a file hash matches the stored value.
 * Called after hash was computed at ingestion.
 */
export async function verifyStoredHash(documentId) {
  const result = await db.query(
    'SELECT sha256, hash_verified FROM documents WHERE id = $1',
    [documentId]
  );
  return result.rows[0] ?? null;
}
