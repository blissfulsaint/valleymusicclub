import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function GET() {
    const token = (await cookies()).get('auth_token')?.value;

    if (!token) {
        return NextResponse.json({ isAuthenticated: false, user: null, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ isAuthenticated: true, user });
    } catch (error) {
        return NextResponse.json({ isAuthenticated: false, user: null, error: error }, { status: 401 });
    }
}