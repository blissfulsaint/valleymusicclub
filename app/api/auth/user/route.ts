import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function GET() {
    const token = (await cookies()).get('auth_token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }
}