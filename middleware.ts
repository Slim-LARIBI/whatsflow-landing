import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // pages publiques
  const publicPaths = ["/", "/login", "/api", "/favicon.ico"];
  const isPublic =
    publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public");

  if (isPublic) return NextResponse.next();

  // protéger /dashboard (et tout ce qu'on voudra après)
  const isProtected = pathname.startsWith("/dashboard");
  if (!isProtected) return NextResponse.next();

  const session = req.cookies.get("wf_session")?.value;
  if (session === "1") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};