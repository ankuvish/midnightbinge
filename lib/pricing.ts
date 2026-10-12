export const FREE_SHIP_ABOVE = 499, SHIP_FEE = 49;
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export function totals(subtotal: number) {
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP_ABOVE ? 0 : SHIP_FEE;
  return { subtotal, shipping, total: subtotal + shipping }; // prices include GST
}
export const SLOTS = ["12 am – 2 am (midnight drop)", "9 pm – 11 pm", "Tomorrow, 10 am – 1 pm"];
