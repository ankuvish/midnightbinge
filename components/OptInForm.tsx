"use client";
import { useState } from "react";

const COUNTRIES = [
  { code: "+91",  flag: "🇮🇳", name: "IN", digits: 10 },
  { code: "+1",   flag: "🇺🇸", name: "US", digits: 10 },
  { code: "+44",  flag: "🇬🇧", name: "GB", digits: 10 },
  { code: "+61",  flag: "🇦🇺", name: "AU", digits: 9  },
  { code: "+971", flag: "🇦🇪", name: "AE", digits: 9  },
  { code: "+65",  flag: "🇸🇬", name: "SG", digits: 8  },
  { code: "+60",  flag: "🇲🇾", name: "MY", digits: 10 },
  { code: "+880", flag: "🇧🇩", name: "BD", digits: 10 },
  { code: "+92",  flag: "🇵🇰", name: "PK", digits: 10 },
  { code: "+977", flag: "🇳🇵", name: "NP", digits: 10 },
];

export default function OptInForm() {
  const [name, setName]       = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone]     = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus]   = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg]         = useState("");

  const selected = COUNTRIES.find(c => c.code === dialCode) ?? COUNTRIES[0];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: dialCode + phone, consent }),
    });
    const data = await res.json();
    if (!res.ok) { setStatus("error"); setMsg(data.error); return; }
    setStatus("done");
    setMsg(data.already ? "You're already on the list! 🎉" : "You're in! Expect midnight deals soon. 🌙");
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="glass rounded-3xl px-6 py-12 md:px-16 md:py-14 flex flex-col md:flex-row gap-10 items-center">

        {/* left copy */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs font-bold tracking-widest text-ember uppercase mb-3">Exclusive deals</p>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gold-gradient leading-tight mb-3">
            Get midnight drops<br />on WhatsApp
          </h2>
          <p className="text-mist/55 text-sm leading-relaxed max-w-xs">
            Be first to know about new flavours, flash sales and late-night offers. No spam — just the good stuff.
          </p>
        </div>

        {/* right form */}
        <div className="flex-1 w-full max-w-sm">
          {status === "done" ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">🌙</p>
              <p className="font-display text-xl font-bold text-gold-gradient">{msg}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <input
                className="input-luxury"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />

              {/* phone row — country code + number clearly separated */}
              <div className="flex gap-2">
                {/* country code selector */}
                <div className="relative shrink-0">
                  <select
                    value={dialCode}
                    onChange={e => { setDialCode(e.target.value); setPhone(""); }}
                    className="input-luxury appearance-none pr-7 pl-3 cursor-pointer font-body font-medium"
                    style={{ width: "108px", fontSize: "0.875rem", letterSpacing: "0.02em" }}
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  {/* dropdown chevron */}
                  <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* divider */}
                <div className="flex items-center">
                  <div style={{ width: "1px", height: "36px", background: "var(--border)" }} />
                </div>

                {/* number input */}
                <input
                  className="input-luxury flex-1 min-w-0"
                  placeholder={`${selected.name} number`}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, selected.digits))}
                  inputMode="numeric"
                  required
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-1 accent-amber-400"
                  required
                />
                <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  I agree to receive WhatsApp messages from MidnightBinge. I can opt out anytime. View our{" "}
                  <a href="/privacy" className="underline transition-colors" style={{ color: "var(--gold)" }}>Privacy Policy</a>.
                </span>
              </label>

              {status === "error" && (
                <p className="alert-error">{msg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-luxury rounded-full bg-ember py-3 font-bold text-white glow-ember disabled:opacity-50"
              >
                {status === "loading" ? "Joining…" : "Join the list ✦"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
