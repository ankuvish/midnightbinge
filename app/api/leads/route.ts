import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "leads.json");
const MAX_BODY = 4 * 1024; // 4 KB max

function sanitize(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  return s.trim().replace(/<[^>]*>/g, "").slice(0, maxLen);
}

async function readLeads(): Promise<{ name: string; phone: string; joinedAt: string }[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  // Body size guard
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name: rawName, phone: rawPhone, consent } = body as Record<string, unknown>;

  const name  = sanitize(rawName, 80);
  const phone = sanitize(rawPhone, 16);

  if (!name) {
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  }
  if (!/^\+\d{1,4}\d{6,12}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Please accept to continue." }, { status: 400 });
  }

  const leads = await readLeads();

  if (leads.some((l) => l.phone === phone)) {
    return NextResponse.json({ ok: true, already: true });
  }

  leads.push({ name, phone, joinedAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2));

  return NextResponse.json({ ok: true });
}
