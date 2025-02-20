import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
    const { token, password } = await req.json();

    if (!token || !password) {
        return Response.json({ error: 'Token and password are required' }, { status: 400 });
    }

    const results = await sql`SELECT user_id, used FROM dev.test_password_recovery_token WHERE token = ${token}`;
    const tokenData = results.rows[0];

    if (!tokenData || tokenData.used) {
        return Response.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`UPDATE dev.test_user SET password = ${hashedPassword} WHERE id = ${tokenData.user_id}`;

    await sql`UPDATE dev.test_password_recovery_token SET used = TRUE WHERE token = ${token}`;

    return Response.json({ message: 'Password reset successful' });
}