import { promises as fs } from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "orders.json");

// Simple write-lock to prevent race conditions on concurrent requests.
// For production, replace this file store with a real database.
let writeLock: Promise<void> = Promise.resolve();

async function readOrders(): Promise<any[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveOrder(o: any): Promise<void> {
  writeLock = writeLock.then(async () => {
    const all = await readOrders();
    all.push(o);
    await fs.writeFile(file, JSON.stringify(all, null, 2));
  });
  await writeLock;
}

export async function updateOrder(id: string, patch: object): Promise<any | null> {
  let result: any | null = null;
  writeLock = writeLock.then(async () => {
    const all = await readOrders();
    const i = all.findIndex((o) => o.id === id);
    if (i < 0) return;
    all[i] = { ...all[i], ...patch };
    result = all[i];
    await fs.writeFile(file, JSON.stringify(all, null, 2));
  });
  await writeLock;
  return result;
}

export { readOrders };
