import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wf_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Public assets & pages
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/auth/")
  ) {
    return NextResponse.next();
  }

  // ✅ IMPORTANT: allow public lead submission (no login)
  // Only POST to /leads-api is public
  if (pathname === "/leads-api" && req.method === "POST") {
    return NextResponse.next();
  }

  // 🔒 Protect admin pages + reading leads
  const protectedPaths = ["/dashboard", "/leads", "/leads-api"];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/leads/:path*", "/leads-api/:path*"],
};