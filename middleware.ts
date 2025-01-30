import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/lib/utils/jwt";

// Define protected routes
const protectedRoutes = ['/account'];

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    //Check if the route is protected
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        const token = req.cookies.get('auth_token')?.value;

        if (!token || !verifyToken(token)) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*']
};