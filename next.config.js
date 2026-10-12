/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent clickjacking — only allow framing from same origin
  { key: "X-Frame-Options", value: "SAMEORIGIN" },

  // Block MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Reflect XSS filter for legacy browsers
  { key: "X-XSS-Protection", value: "1; mode=block" },

  // Limit referrer info to origin only on cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Disable browser APIs the app does not use
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },

  // HSTS — force HTTPS for 2 years, include subdomains, allow preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },

  // Content Security Policy
  // 'unsafe-inline' on script-src is required by:
  //   • Next.js inline theme-detection script in <head>
  //   • Razorpay checkout modal
  //   • Microsoft Clarity snippet
  // Once you move to a nonce-based approach these can be removed.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://www.clarity.ms https://c.bing.com",
      "frame-src https://api.razorpay.com https://checkout.razorpay.com",
      "connect-src 'self' https://api.razorpay.com https://www.clarity.ms https://c.bing.com",
      "img-src 'self' data: blob: https:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "worker-src blob:",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

module.exports = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Do not expose source maps in production builds
  productionBrowserSourceMaps: false,
};
