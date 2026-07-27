import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { buildFaqSchema } from "@/lib/seo";
import SchemaOrg from "@/components/seo/SchemaOrg";
import * as Accordion from "@radix-ui/react-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about GrownetAI's digital marketing services, pricing, and process.",
  alternates: { canonical: "https://grownetai.com/faq" },
};

export default function FaqPage() {
  const schema = buildFaqSchema(FAQS);
  return (
    <main className="pt-[var(--navbar-height)]">
      <SchemaOrg schema={schema} />

      {/* Hero */}
      <section className="bg-gradient-hero py-20 text-center">
        <div className="container-site">
          <span className="section-label mb-4">FAQ</span>
          <h1 className="font-display text-ink text-5xl md:text-6xl mt-4 mb-4">
            Frequently Asked <em className="italic text-moss-600">Questions</em>
          </h1>
          <p className="text-ink-body text-xl max-w-xl mx-auto">
            Everything you need to know before getting started with GrownetAI.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding bg-paper">
        <div className="container-site">
          <Accordion.Root type="single" collapsible className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <Accordion.Item key={i} value={String(i)} className="card overflow-hidden">
                <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left font-heading font-semibold text-brand-charcoal hover:text-brand-teal transition-colors group">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-brand-slate-gray transition-transform group-data-[state=open]:rotate-180 flex-shrink-0 ml-4" />
                </Accordion.Trigger>
                <Accordion.Content className="px-6 pb-6 text-brand-slate-gray leading-relaxed text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-cloud-white text-center">
        <div className="container-site">
          <div className="max-w-xl mx-auto">
            <h2 className="font-heading font-bold text-3xl text-brand-charcoal mb-4">Still have questions?</h2>
            <p className="text-brand-slate-gray mb-8">Our team is happy to answer anything else on your mind.</p>
            <Link href="/contact" className="btn btn-primary btn-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
