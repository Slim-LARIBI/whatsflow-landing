import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Lead = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  useCase?: string;
  createdAt?: string;
};

function leadsFilePath() {
  // ✅ Always resolve from project root (PM2 cwd safe)
  return path.join(process.cwd(), "data", "leads.json");
}

async function readLeads(): Promise<Lead[]> {
  const file = leadsFilePath();
  try {
    const raw = await fs.readFile(file, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (e: any) {
    // If file doesn't exist yet, return empty
    if (e?.code === "ENOENT") return [];
    throw e;
  }
}

async function writeLeads(leads: Lead[]) {
  const file = leadsFilePath();
  const dir = path.dirname(file);
  await fs.mkdir(dir, { recursive: true });

  // ✅ atomic write (avoid corruption)
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf-8");
  await fs.rename(tmp, file);
}

function noStoreJson(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export async function GET() {
  const leads = await readLeads();
  return noStoreJson(leads);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<Lead> | null;

  if (!body?.name || !body?.email) {
    return noStoreJson({ ok: false, error: "name and email are required" }, 400);
  }

  const lead: Lead = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    company: body.company ? String(body.company).trim() : "",
    phone: body.phone ? String(body.phone).trim() : "",
    website: body.website ? String(body.website).trim() : "",
    useCase: body.useCase ? String(body.useCase).trim() : "",
    createdAt: new Date().toISOString(),
  };

  const leads = await readLeads();
  leads.unshift(lead);
  await writeLeads(leads);

  return noStoreJson({ ok: true });
}