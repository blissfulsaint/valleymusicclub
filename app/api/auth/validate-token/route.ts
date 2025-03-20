import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return Response.json({ error: 'Token is required' }, { status: 400 });
    }

    const results = await sql`SELECT user_id, expires_at, used FROM public.password_recovery_token WHERE token = ${token}`;
    const tokenData = results.rows[0];

    console.log(tokenData);

    if (!tokenData || tokenData.used || new Date() > new Date(tokenData.expires_at)) {
        return Response.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    return Response.json({ message: 'Token is valid' });
}