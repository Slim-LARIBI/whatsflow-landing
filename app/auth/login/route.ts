import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function sign(data: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

export async function POST(req: NextRequest) {
  const secret = process.env.SESSION_SECRET || "";
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPass = process.env.ADMIN_PASSWORD || "";

  if (!secret || !adminEmail || !adminPass) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "");
  const password = String(body.password || "");

  if (email !== adminEmail || password !== adminPass) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const payload = JSON.stringify({ email, iat: Date.now() });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = sign(b64, secret);
  const token = `${b64}.${sig}`;

  const res = NextResponse.json({ ok: true });

  res.cookies.set("wf_session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });

  return res;
}