// This is NOT a NODE runtime !! Not all packages work here
import { NextResponse } from "next/server";
import { validateJWT } from "./lib/jwt";
const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req, res) {
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        pathname.startsWith("/signin") ||
        pathname.startsWith("/register") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    try {
        const jwt = req.cookies.get(process.env.COOKIE_NAME);

        if (!jwt) {
            throw new Error("JWT not found")
        }

        await validateJWT(jwt.value);

        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }
}

// export const config = {
//     matcher: ['/about/:path*', '/dashboard/:path*'],
// };
