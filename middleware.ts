import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function sign(data: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

function isAuthed(req: NextRequest) {
  const secret = process.env.SESSION_SECRET || "";
  if (!secret) return false;

  const token = req.cookies.get("wf_session")?.value;
  if (!token) return false;

  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;

  const expected = sign(b64, secret);
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  // 1) Dashboard protégé
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthed(req)) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // 2) /leads : on laisse POST public (formulaire) mais GET admin-only
  if (pathname === "/leads" && method === "GET") {
    if (!isAuthed(req)) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/leads"],
};