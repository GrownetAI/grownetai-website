import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "GrownetAI Privacy Policy — how we collect, use and protect your data.",
  alternates: { canonical: "https://grownetai.com/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="pt-[var(--navbar-height)]">
      <section className="bg-gradient-hero py-16 text-center">
        <div className="container-site">
          <h1 className="font-heading font-bold text-white text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="text-white/70 mt-3 text-lg">Last updated: January 2025</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-site max-w-3xl mx-auto space-y-8 text-brand-slate-gray">
          {[
            { title: "1. Information We Collect", body: `When you use ${SITE_CONFIG.name} or submit forms on our website, we may collect personal information including your name, email address, phone number, and business details. We also automatically collect usage data such as IP address, browser type, and pages visited.` },
            { title: "2. How We Use Your Information", body: "We use collected information to respond to inquiries, provide our services, send marketing communications (with your consent), improve our website, and comply with legal obligations. We never sell your personal data to third parties." },
            { title: "3. Cookies", body: "Our website uses cookies to enhance user experience, analyse traffic via Google Analytics, and improve our services. You may disable cookies in your browser settings, though some features may not function correctly." },
            { title: "4. Data Security", body: "We implement industry-standard security measures to protect your personal information. However, no internet transmission is 100% secure and we cannot guarantee absolute security." },
            { title: "5. Your Rights", body: `You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at ${SITE_CONFIG.email}.` },
            { title: "6. Contact", body: `For privacy-related questions, email us at ${SITE_CONFIG.email}.` },
          ].map((sec) => (
            <div key={sec.title}>
              <h2 className="font-heading font-bold text-2xl text-brand-charcoal mb-3">{sec.title}</h2>
              <p className="leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
