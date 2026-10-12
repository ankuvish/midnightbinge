"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <div className="fade-up">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Get in touch</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient mb-4">Contact Us</h1>
        <p className="text-mist/60 leading-relaxed mb-12">
          We&apos;re a small team that genuinely cares. Whether it&apos;s a missing order, a flavour suggestion or just a midnight thought — we read every message.
        </p>
      </div>

      {sent ? (
        <div className="fade-up glass rounded-2xl p-10 text-center">
          <p className="text-5xl mb-4">🌙</p>
          <h2 className="font-display text-2xl font-bold text-gold-gradient mb-2">Message received!</h2>
          <p className="text-mist/60">We&apos;ll get back to you within 24 hours. Go grab a snack while you wait.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="fade-up glass rounded-2xl p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Your name</span>
              <input required value={f.name} onChange={e => setF({...f, name: e.target.value})}
                className="input-luxury mt-1.5" placeholder="Full name" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Email</span>
              <input required type="email" value={f.email} onChange={e => setF({...f, email: e.target.value})}
                className="input-luxury mt-1.5" placeholder="you@example.com" />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Subject</span>
            <input required value={f.subject} onChange={e => setF({...f, subject: e.target.value})}
              className="input-luxury mt-1.5" placeholder="What&apos;s on your mind?" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">Message</span>
            <textarea required rows={5} value={f.message} onChange={e => setF({...f, message: e.target.value})}
              className="input-luxury mt-1.5 resize-none" placeholder="Tell us everything..." />
          </label>
          <button className="btn-luxury w-full rounded-full bg-ember py-3.5 font-bold text-white glow-ember">
            Send message →
          </button>
        </form>
      )}

      <div className="mt-16 grid sm:grid-cols-3 gap-6 fade-up">
        {[
          { icon: "📧", label: "Email", value: "hello@midnightbinge.in" },
          { icon: "📱", label: "WhatsApp", value: "+91 98765 43210" },
          { icon: "🕐", label: "Support hours", value: "9 am – 11 pm daily" },
        ].map(c => (
          <div key={c.label} className="glass rounded-2xl p-5 text-center">
            <p className="text-3xl mb-2">{c.icon}</p>
            <p className="text-xs font-bold tracking-widest text-ember uppercase mb-1">{c.label}</p>
            <p className="text-sm text-mist/70">{c.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
