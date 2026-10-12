import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "leads.json");

async function readLeads() {
  try { return JSON.parse(await fs.readFile(FILE, "utf8")); } catch { return []; }
}

export async function POST(req: Request) {
  const { name, phone, consent } = await req.json();

  if (!name?.trim())
    return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  if (!/^\+\d{1,4}\d{6,12}$/.test(phone || ""))
    return NextResponse.json({ error: "Enter a valid WhatsApp number." }, { status: 400 });
  if (!consent)
    return NextResponse.json({ error: "Please accept to continue." }, { status: 400 });

  const leads = await readLeads();
  if (leads.find((l: { phone: string }) => l.phone === phone))
    return NextResponse.json({ ok: true, already: true });

  leads.push({ name: name.trim(), phone, joinedAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2));

  return NextResponse.json({ ok: true });
}
