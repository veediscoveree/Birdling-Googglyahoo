import pg from 'pg';

const { Pool } = pg;

export const db = new Pool({ connectionString: process.env.DATABASE_URL });

export async function initDb() {
  const client = await db.connect();
  try {
    await client.query('SELECT 1');
    console.log('[db] PostgreSQL connected');
  } finally {
    client.release();
  }
}
