export default function Privacy() {
  const sections = [
    { title: "What we collect", body: "We collect your name, email, phone number, delivery address and payment information when you place an order. We also collect browsing data (pages visited, time spent) to improve your experience." },
    { title: "How we use it", body: "Your data is used solely to process orders, send delivery updates, and improve our service. We do not sell your personal information to any third party, ever." },
    { title: "Payment security", body: "All payments are processed by Razorpay, a PCI-DSS compliant payment gateway. MidnightBinge never stores your card details on our servers." },
    { title: "Cookies", body: "We use essential cookies to keep your cart alive and analytics cookies (anonymised) to understand how people use our site. You can disable non-essential cookies in your browser settings." },
    { title: "Data retention", body: "We retain your order data for 3 years for accounting and legal compliance. You may request deletion of your personal data at any time by emailing privacy@midnightbinge.in." },
    { title: "Your rights", body: "Under applicable Indian data protection law, you have the right to access, correct, or delete your personal data. Contact us at privacy@midnightbinge.in to exercise these rights." },
    { title: "Changes to this policy", body: "We may update this policy from time to time. We will notify you of significant changes via email or a notice on our website." },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <div className="fade-up mb-12">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Legal</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient mb-4">Privacy Policy</h1>
        <p className="text-mist/50 text-sm">Last updated: January 2025</p>
        <p className="text-mist/60 mt-4 leading-relaxed">Your privacy matters to us. Here's exactly what we collect, why, and how we protect it.</p>
      </div>
      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="fade-up glass rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg text-moon mb-3">{s.title}</h2>
            <p className="text-mist/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
