import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.email) {
      return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
    }

    const lead = {
      ...body,
      createdAt: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), "data", "leads.json");
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const existing = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];

    existing.push(lead);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}