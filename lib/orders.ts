import { promises as fs } from "fs"; import path from "path";
const file = path.join(process.cwd(), "data", "orders.json");
// File storage keeps the starter simple. Swap for Postgres/Supabase before production.
export async function readOrders(): Promise<any[]> { try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return []; } }
export async function saveOrder(o: any) { const all = await readOrders(); all.push(o); await fs.writeFile(file, JSON.stringify(all, null, 2)); }
export async function updateOrder(id: string, patch: object) { const all = await readOrders(); const i = all.findIndex((o) => o.id === id); if (i < 0) return null; all[i] = { ...all[i], ...patch }; await fs.writeFile(file, JSON.stringify(all, null, 2)); return all[i]; }
