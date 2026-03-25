/**
 * Email threading — links emails into conversation threads.
 *
 * Uses: Internet Message-ID, In-Reply-To, References headers, and subject.
 * Standard: RFC 5322 / EDRM email threading.
 */
import { db } from '../db.js';

/**
 * Find or create a thread for an email document.
 * Returns the thread UUID.
 */
export async function threadEmail({ documentId, matterId, messageId, inReplyTo, references, conversationId, conversationTopic, subject, emailDate }) {

  // Strategy 1: Use ConversationID (Outlook/Exchange generated)
  if (conversationId) {
    const thread = await findOrCreateThread(matterId, { conversationId, subject, emailDate });
    return thread.id;
  }

  // Strategy 2: Follow In-Reply-To chain
  if (inReplyTo) {
    const parent = await db.query(
      `SELECT email_thread_id FROM documents
       WHERE matter_id = $1 AND email_message_id = $2 AND email_thread_id IS NOT NULL
       LIMIT 1`,
      [matterId, inReplyTo]
    );
    if (parent.rows.length && parent.rows[0].email_thread_id) {
      return parent.rows[0].email_thread_id;
    }
  }

  // Strategy 3: References header (any message in the chain)
  if (references?.length) {
    for (const ref of references) {
      const found = await db.query(
        `SELECT email_thread_id FROM documents
         WHERE matter_id = $1 AND email_message_id = $2 AND email_thread_id IS NOT NULL
         LIMIT 1`,
        [matterId, ref]
      );
      if (found.rows.length && found.rows[0].email_thread_id) {
        return found.rows[0].email_thread_id;
      }
    }
  }

  // Strategy 4: Match by normalized subject (Re:/Fwd: stripped)
  if (subject) {
    const normalized = normalizeSubject(subject);
    const bySubject = await db.query(
      `SELECT id FROM email_threads
       WHERE matter_id = $1 AND subject = $2
       LIMIT 1`,
      [matterId, normalized]
    );
    if (bySubject.rows.length) return bySubject.rows[0].id;
  }

  // Create new thread
  const thread = await findOrCreateThread(matterId, { conversationId, subject: subject ? normalizeSubject(subject) : null, emailDate });
  return thread.id;
}

async function findOrCreateThread(matterId, { conversationId, subject, emailDate }) {
  const result = await db.query(
    `INSERT INTO email_threads (matter_id, conversation_id, subject, date_first, date_last, message_count)
     VALUES ($1, $2, $3, $4, $4, 1)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [matterId, conversationId, subject, emailDate]
  );
  if (result.rows.length) return result.rows[0];

  // Already exists — update stats
  const existing = await db.query(
    `UPDATE email_threads
     SET message_count = message_count + 1,
         date_last = GREATEST(date_last, $3)
     WHERE matter_id = $1 AND (conversation_id = $2 OR subject = $4)
     RETURNING *`,
    [matterId, conversationId, emailDate, subject]
  );
  return existing.rows[0];
}

function normalizeSubject(subject) {
  return subject
    .replace(/^(Re|Fwd|FW|RE|FWD):\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500);
}
