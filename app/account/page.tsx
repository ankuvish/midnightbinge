export default function Account() {
  const stats = [
    { label: "Orders placed", value: "—" },
    { label: "Loyalty points", value: "—" },
    { label: "Member since", value: "—" },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 pt-16 pb-24">
      <div className="fade-up mb-12">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Welcome back</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient">My Account</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 fade-up">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-2xl p-5 text-center">
            <p className="font-display text-3xl font-extrabold text-moon">{s.value}</p>
            <p className="text-xs text-mist/50 mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="fade-up glass rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg text-moon mb-5">Profile details</h2>
          <div className="space-y-4">
            {["Full name", "Email address", "Mobile number"].map(l => (
              <label key={l} className="block">
                <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">{l}</span>
                <input className="input-luxury mt-1.5" placeholder={`Your ${l.toLowerCase()}`} />
              </label>
            ))}
            <button className="btn-luxury w-full rounded-full bg-ember py-3 font-bold text-white mt-2">Save changes</button>
          </div>
        </div>

        {/* Orders */}
        <div className="fade-up fade-up-1 glass rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg text-moon mb-5">Recent orders</h2>
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-mist/50 text-sm">No orders yet.</p>
            <p className="text-mist/30 text-xs mt-1">Your order history will appear here.</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="fade-up fade-up-2 glass rounded-2xl p-6 md:col-span-2">
          <h2 className="font-display font-bold text-lg text-moon mb-5">Saved addresses</h2>
          <div className="flex flex-col items-center justify-center h-24 text-center">
            <p className="text-mist/50 text-sm">No saved addresses yet.</p>
          </div>
          <button className="btn-luxury mt-4 rounded-full border border-moon/30 px-6 py-2.5 text-sm font-bold text-moon hover:bg-moon/10 transition-colors">
            + Add address
          </button>
        </div>
      </div>
    </main>
  );
}
