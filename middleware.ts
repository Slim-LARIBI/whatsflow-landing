import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wf_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // autoriser les routes publiques
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // protéger dashboard + leads + leads-api
  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/leads") ||
    pathname.startsWith("/leads-api");

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (token) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/leads/:path*", "/leads-api/:path*"],
};