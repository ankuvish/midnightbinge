import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Dancing_Script } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import ThemeToggle from "@/components/ThemeToggle";
import BackgroundDecorations from "@/components/BackgroundDecorations";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const script = Dancing_Script({ subsets: ["latin"], weight: ["700"], variable: "--font-script" });

export const metadata: Metadata = {
  title: "MidnightBinge | Snacks for after dark",
  description: "Wholesome, bold snacks for late-night cravings. Order online with midnight delivery slots.",
};

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})()` }} />
        {/* Microsoft Clarity — set NEXT_PUBLIC_CLARITY_ID in your .env.local to enable */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");` }} />
        )}
      </head>
      <body className="font-body min-h-screen">

        {/* Ambient blobs — only 2, smaller blur, GPU-composited */}
        <div className="blob w-[600px] h-[600px] top-[-200px] left-[-150px] opacity-50" style={{ background: "var(--blob-1)", filter: "blur(90px)" }} />
        <div className="blob w-[500px] h-[500px] top-[30%] right-[-120px] opacity-35" style={{ background: "var(--blob-2)", filter: "blur(90px)" }} />

        {/* Full-page background decorations — stars (dark) / suns (light) */}
        <BackgroundDecorations />

        <CartProvider>
          <Header />
          {children}
          <footer className="relative z-10 mt-24 border-t border-white/5">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                  <p className="font-display text-2xl font-extrabold text-gold-gradient mb-3">MidnightBinge</p>
                  <p className="text-sm text-mist/50 leading-relaxed mb-5">Wholesome, bold snacks for late-night cravings. Delivered to your door while the city sleeps.</p>
                  {/* Social links */}
                  <div className="flex gap-3">
                    {[
                      { label: "Instagram", href: "https://instagram.com", svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                      { label: "Twitter / X", href: "https://twitter.com", svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
                      { label: "YouTube", href: "https://youtube.com", svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> },
                    ].map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                        className="size-9 rounded-full glass flex items-center justify-center hover:border-moon/40 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-mist/60 hover:fill-moon transition-colors">{s.svg}</svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Shop */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-ember uppercase mb-4">Shop</p>
                  <ul className="space-y-2.5">
                    {[["All Products", "/shop"],["Makhana", "/shop"],["Chips", "/shop"],["Nuts", "/shop"],["New Arrivals", "/shop"]].map(([l, h]) => (
                      <li key={l}><a href={h} className="text-sm text-mist/55 hover:text-moon transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-ember uppercase mb-4">Company</p>
                  <ul className="space-y-2.5">
                    {[["Why We Exist", "/about"],["Careers", "/careers"],["Contact Us", "/contact"],["Our Policies", "/policies"]].map(([l, h]) => (
                      <li key={l}><a href={h} className="text-sm text-mist/55 hover:text-moon transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>

                {/* Account */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-ember uppercase mb-4">Account</p>
                  <ul className="space-y-2.5">
                    {[["My Account", "/account"],["Sign In", "/auth"],["Privacy Policy", "/privacy"],["Terms of Service", "/terms"]].map(([l, h]) => (
                      <li key={l}><a href={h} className="text-sm text-mist/55 hover:text-moon transition-colors">{l}</a></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="divider-gold mb-6" />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-mist/30">© {new Date().getFullYear()} MidnightBinge. Snack responsibly.</p>

              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
