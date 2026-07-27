import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "GrownetAI Terms & Conditions — the rules governing use of our services.",
  alternates: { canonical: "https://grownetai.com/terms" },
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="pt-[var(--navbar-height)]">
      <section className="bg-gradient-hero py-16 text-center">
        <div className="container-site">
          <h1 className="font-display text-ink text-4xl md:text-5xl">Terms &amp; Conditions</h1>
          <p className="text-ink-muted mt-3 text-lg">Last updated: January 2025</p>
        </div>
      </section>
      <section className="section-padding bg-paper">
        <div className="container-site">
          <div className="max-w-3xl mx-auto space-y-8 text-brand-slate-gray">
          {[
            { title: "1. Acceptance of Terms", body: `By accessing and using the ${SITE_CONFIG.name} website or engaging our services, you agree to these terms. If you do not agree, please discontinue use immediately.` },
            { title: "2. Services", body: `${SITE_CONFIG.name} provides digital marketing and web development services as described on our website. All services are subject to a separate service agreement signed by both parties.` },
            { title: "3. Payment Terms", body: "Invoices are issued monthly in advance. Payment is due within 7 days of invoice date. Late payments may incur a 2% monthly interest charge." },
            { title: "4. Intellectual Property", body: `All content created by ${SITE_CONFIG.name} for clients becomes the client's property upon full payment. Our proprietary methodologies, tools, and processes remain our intellectual property.` },
            { title: "5. Limitation of Liability", body: `${SITE_CONFIG.name} is not liable for indirect, consequential, or incidental damages. Our total liability shall not exceed the amount paid for services in the preceding 3 months.` },
            { title: "6. Governing Law", body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi." },
            { title: "7. Contact", body: `Questions about these terms? Email us at ${SITE_CONFIG.email}.` },
          ].map((sec) => (
            <div key={sec.title}>
              <h2 className="font-heading font-bold text-2xl text-brand-charcoal mb-3">{sec.title}</h2>
              <p className="leading-relaxed">{sec.body}</p>
            </div>
          ))}
          </div>
        </div>
      </section>
    </main>
  );
}
