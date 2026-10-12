export default function Terms() {
  const sections = [
    { title: "1. Acceptance of Terms", body: "By placing an order on MidnightBinge you agree to these terms. If you do not agree, please do not use our service." },
    { title: "2. Orders & Payment", body: "All prices are in INR and inclusive of GST. Orders are confirmed only after successful payment or COD acceptance. We reserve the right to cancel any order due to stock unavailability." },
    { title: "3. Delivery", body: "We deliver within selected pincodes. Delivery slots are indicative and may vary by ±30 minutes. MidnightBinge is not liable for delays caused by circumstances beyond our control." },
    { title: "4. Returns & Refunds", body: "We accept returns for damaged or incorrect items reported within 24 hours of delivery. Refunds are processed within 5–7 business days to the original payment method." },
    { title: "5. Product Information", body: "We make every effort to display accurate product information. Actual packaging may vary slightly from images shown. Always check the label for allergen information." },
    { title: "6. Intellectual Property", body: "All content on this site — including brand name, logo, copy and design — is the property of MidnightBinge and may not be reproduced without written permission." },
    { title: "7. Governing Law", body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra." },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <div className="fade-up mb-12">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Legal</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient mb-4">Terms of Service</h1>
        <p className="text-mist/50 text-sm">Last updated: January 2025</p>
      </div>
      <div className="space-y-8">
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
