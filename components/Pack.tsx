export default function Pack({ name, color, weight, fill }: { name: string; color: string; weight: string; fill?: boolean }) {
  if (fill) {
    return (
      <div className="w-full h-full grid place-items-center" style={{ background: `radial-gradient(circle at 40% 30%, ${color}88, #1a0505 75%)` }}>
        <div className="w-[62%] aspect-[3/4] rounded-2xl p-5 flex flex-col justify-between shadow-2xl" style={{ background: color }}>
          <span className="font-display text-ink text-sm font-bold">MidnightBinge</span>
          <span className="font-display text-ink text-2xl leading-tight font-extrabold">{name}</span>
          <span className="text-ink/70 text-xs">{weight}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="aspect-[4/5] rounded-2xl grid place-items-center" style={{ background: `radial-gradient(circle at 30% 20%, ${color}55, #12102F 70%)` }}>
      <div className="w-[72%] aspect-[3/4] rounded-xl p-4 flex flex-col justify-between shadow-2xl" style={{ background: color }}>
        <span className="font-display text-ink text-sm font-bold">MidnightBinge</span>
        <span className="font-display text-ink text-lg leading-tight font-extrabold">{name}</span>
        <span className="text-ink/70 text-xs">{weight}</span>
      </div>
    </div>
  );
}
