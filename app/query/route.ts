import { db } from '@vercel/postgres';

const client = await db.connect();

async function listInitialData() {
  const data = await client.sql`
    SELECT * FROM playing_with_neon;
  `;

  return data.rows;
}

export async function GET() {
  try {
  	return Response.json(await listInitialData());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}