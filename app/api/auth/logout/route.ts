import { NextResponse } from "next/server";
import { logoutUser } from "@/app/lib/actions/auth";

export async function POST() {
    await logoutUser();
    return NextResponse.json({ message: 'Logged out successfully' });
}