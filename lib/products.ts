// Sample catalogue — replace with your real products, prices and images.
export type Product = { id: string; slug: string; name: string; category: "Makhana" | "Chips" | "Nuts"; price: number; mrp: number; weight: string; blurb: string; color: string; rating: number; reviewCount: number };
export const products: Product[] = [
  { id: "p1", slug: "peri-peri-makhana", name: "Peri Peri Makhana", category: "Makhana", price: 99, mrp: 120, weight: "30 g", blurb: "Light, crunchy lotus seeds with a slow peri peri burn.", color: "#FF6B4A", rating: 4.5, reviewCount: 128 },
  { id: "p2", slug: "himalayan-salt-makhana", name: "Himalayan Salt Makhana", category: "Makhana", price: 89, mrp: 110, weight: "30 g", blurb: "Roasted in olive oil, finished with pink salt.", color: "#8E8AD6", rating: 4.2, reviewCount: 94 },
  { id: "p3", slug: "cheese-jalapeno-makhana", name: "Cheese Jalapeño Makhana", category: "Makhana", price: 109, mrp: 130, weight: "30 g", blurb: "Creamy, tangy and hard to stop at one handful.", color: "#F6B93B", rating: 4.7, reviewCount: 211 },
  { id: "p4", slug: "truffle-corn-chips", name: "Truffle Corn Chips", category: "Chips", price: 149, mrp: 180, weight: "60 g", blurb: "Popped, not fried. Earthy truffle seasoning.", color: "#3C3A7A", rating: 4.3, reviewCount: 76 },
  { id: "p5", slug: "salted-peanuts", name: "Salted Peanuts", category: "Nuts", price: 79, mrp: 95, weight: "50 g", blurb: "Dry roasted with a clean salty finish.", color: "#C9884A", rating: 3.9, reviewCount: 52 },
  { id: "p6", slug: "midnight-trail-mix", name: "Midnight Trail Mix", category: "Nuts", price: 199, mrp: 240, weight: "80 g", blurb: "Makhana, nuts and seeds for the long night shift.", color: "#2E9C8F", rating: 4.8, reviewCount: 183 },
];
export const bySlug = (s: string) => products.find((p) => p.slug === s);
export const byId = (id: string) => products.find((p) => p.id === id);
