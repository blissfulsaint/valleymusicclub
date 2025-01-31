import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes
const protectedRoutes = ['/account'];

export function middleware(req: NextRequest) {
    const authToken = req.cookies.get('auth_token')?.value;

    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*']
};