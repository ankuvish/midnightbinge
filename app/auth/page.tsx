"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "signin" | "signup";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Auth() {
  const [tab, setTab] = useState<Tab>("signin");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const [signin, setSignin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  function handleSignin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!signin.email || !signin.password) return setErr("Please fill in all fields.");
    setDone(true);
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!signup.name || !signup.email || !signup.phone || !signup.password)
      return setErr("Please fill in all fields.");
    if (signup.password.length < 8)
      return setErr("Password must be at least 8 characters.");
    if (signup.password !== signup.confirm)
      return setErr("Passwords do not match.");
    setDone(true);
  }

  if (done) return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="fade-up glass rounded-2xl p-10 text-center max-w-sm w-full">
        <p className="text-5xl mb-4">🌙</p>
        <h2 className="font-display text-2xl font-bold text-gold-gradient mb-2">
          {tab === "signin" ? "Welcome back!" : "You're in!"}
        </h2>
        <p className="text-mist/60 text-sm mb-6">
          {tab === "signin"
            ? "Great to see you again. Ready to snack?"
            : "Your account is ready. Time to explore the range."}
        </p>
        <Link href="/shop" className="btn-luxury block rounded-full bg-ember py-3.5 font-bold text-white glow-ember">
          Shop now →
        </Link>
      </div>
    </main>
  );

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Brand mark */}
        <div className="fade-up text-center mb-8">
          <Link href="/" className="font-display text-3xl font-extrabold text-gold-gradient">
            MidnightBinge
          </Link>
          <p className="font-script text-moon/60 text-xl mt-1"
            style={{ filter: "drop-shadow(0 0 10px rgba(232,201,122,.2))" }}>
            {tab === "signin" ? "Welcome back, night owl." : "Join the midnight crew."}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="fade-up fade-up-1 glass rounded-2xl p-1 flex mb-6">
          {(["signin", "signup"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setErr(""); setDone(false); }}
              className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-300 ${
                tab === t
                  ? "bg-ember text-white shadow-lg"
                  : "text-mist/50 hover:text-mist"
              }`}
            >
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Sign In form */}
        {tab === "signin" && (
          <form onSubmit={handleSignin} className="fade-up fade-up-2 glass rounded-2xl p-7 space-y-5">
            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Email address</span>
              <input
                type="email" required
                value={signin.email}
                onChange={e => setSignin({ ...signin, email: e.target.value })}
                className="input-luxury mt-1.5"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Password</span>
              <div className="relative mt-1.5">
                <input
                  type={showPass ? "text" : "password"} required
                  value={signin.password}
                  onChange={e => setSignin({ ...signin, password: e.target.value })}
                  className="input-luxury pr-10"
                  placeholder="Your password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mist/40 hover:text-mist transition-colors">
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </label>

            <div className="flex justify-end">
              <Link href="/contact" className="text-xs text-ember hover:underline">Forgot password?</Link>
            </div>

            {err && <p className="text-ember text-sm bg-ember/10 border border-ember/20 rounded-xl px-4 py-2.5">{err}</p>}

            <button className="btn-luxury w-full rounded-full bg-ember py-3.5 font-bold text-white glow-ember">
              Sign in →
            </button>

            <p className="text-center text-xs text-mist/40">
              Don't have an account?{" "}
              <button type="button" onClick={() => setTab("signup")} className="text-moon hover:underline font-semibold">
                Sign up
              </button>
            </p>
          </form>
        )}

        {/* Sign Up form */}
        {tab === "signup" && (
          <form onSubmit={handleSignup} className="fade-up fade-up-2 glass rounded-2xl p-7 space-y-5">
            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Full name</span>
              <input
                required
                value={signup.name}
                onChange={e => setSignup({ ...signup, name: e.target.value })}
                className="input-luxury mt-1.5"
                placeholder="Your full name"
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Email</span>
                <input
                  type="email" required
                  value={signup.email}
                  onChange={e => setSignup({ ...signup, email: e.target.value })}
                  className="input-luxury mt-1.5"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Mobile</span>
                <input
                  inputMode="numeric" required
                  value={signup.phone}
                  onChange={e => setSignup({ ...signup, phone: e.target.value })}
                  className="input-luxury mt-1.5"
                  placeholder="10-digit number"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Password</span>
              <div className="relative mt-1.5">
                <input
                  type={showPass ? "text" : "password"} required
                  value={signup.password}
                  onChange={e => setSignup({ ...signup, password: e.target.value })}
                  className="input-luxury pr-10"
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mist/40 hover:text-mist transition-colors">
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Confirm password</span>
              <div className="relative mt-1.5">
                <input
                  type={showConfirm ? "text" : "password"} required
                  value={signup.confirm}
                  onChange={e => setSignup({ ...signup, confirm: e.target.value })}
                  className="input-luxury pr-10"
                  placeholder="Repeat password"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mist/40 hover:text-mist transition-colors">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </label>

            {/* Password strength indicator */}
            {signup.password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => {
                    const strength = [
                      signup.password.length >= 8,
                      /[A-Z]/.test(signup.password),
                      /[0-9]/.test(signup.password),
                      /[^A-Za-z0-9]/.test(signup.password),
                    ].filter(Boolean).length;
                    return (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? (strength <= 1 ? "#E8622A" : strength <= 2 ? "#E8C97A" : "#4ade80") : "rgba(255,255,255,0.1)" }} />
                    );
                  })}
                </div>
                <p className="text-xs text-mist/40">
                  {(() => {
                    const s = [signup.password.length >= 8, /[A-Z]/.test(signup.password), /[0-9]/.test(signup.password), /[^A-Za-z0-9]/.test(signup.password)].filter(Boolean).length;
                    return s <= 1 ? "Weak" : s === 2 ? "Fair" : s === 3 ? "Good" : "Strong";
                  })()}
                </p>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 accent-ember" />
              <span className="text-xs text-mist/50 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-moon hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-moon hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {err && <p className="text-ember text-sm bg-ember/10 border border-ember/20 rounded-xl px-4 py-2.5">{err}</p>}

            <button className="btn-luxury w-full rounded-full bg-ember py-3.5 font-bold text-white glow-ember">
              Create account →
            </button>

            <p className="text-center text-xs text-mist/40">
              Already have an account?{" "}
              <button type="button" onClick={() => setTab("signin")} className="text-moon hover:underline font-semibold">
                Sign in
              </button>
            </p>
          </form>
        )}

        {/* Social proof */}
        <p className="fade-up fade-up-3 text-center text-xs text-mist/30 mt-6">
          🔒 Your data is safe with us. We never share it with anyone.
        </p>
      </div>
    </main>
  );
}
