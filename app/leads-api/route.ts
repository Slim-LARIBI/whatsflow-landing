import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

const COOKIE_NAME = "wf_session";
const LEADS_PATH = "data/leads.json"; // symlink -> /var/lib/whatsflow/leads.json

function isAuthed(req: NextRequest) {
  return Boolean(req.cookies.get(COOKIE_NAME)?.value);
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const raw = await fs.readFile(LEADS_PATH, "utf-8");
    const leads = JSON.parse(raw || "[]");
    return NextResponse.json(Array.isArray(leads) ? leads : []);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newLead = {
      name: String(body.name),
      company: body.company ? String(body.company) : "",
      email: String(body.email),
      phone: body.phone ? String(body.phone) : "",
      website: body.website ? String(body.website) : "",
      useCase: body.useCase ? String(body.useCase) : "",
      createdAt: new Date().toISOString(),
    };

    let leads: any[] = [];
    try {
      const raw = await fs.readFile(LEADS_PATH, "utf-8");
      const parsed = JSON.parse(raw || "[]");
      leads = Array.isArray(parsed) ? parsed : [];
    } catch {
      leads = [];
    }

    leads.push(newLead);
    await fs.writeFile(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
