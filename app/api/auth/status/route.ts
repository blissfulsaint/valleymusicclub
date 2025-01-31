import { NextResponse } from 'next/server';
import { getAuthStatus } from '@/app/lib/actions/auth';

export async function GET() {
    return NextResponse.json(await getAuthStatus());
}