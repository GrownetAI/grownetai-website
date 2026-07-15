"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  ArrowRight,
  Linkedin,
  Instagram,
  Zap,
  Users,
  ShieldCheck,
  Globe,
  Sparkles,
  Layers,
  Plus,
  Minus,
} from "lucide-react";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { whatsappUrl, cn } from "@/lib/utils";

const WHY_CONTACT = [
  { icon: Zap, title: "Fast response", desc: "We reply within a few hours on business days — no black holes." },
  { icon: Users, title: "Dedicated team", desc: "A named point of contact from day one, not a rotating queue." },
  { icon: ShieldCheck, title: "Transparent pricing", desc: "Clear, fixed-scope quotes — no surprises on the invoice." },
  { icon: Globe, title: "Global support", desc: "Serving clients across eight markets, in your timezone." },
  { icon: Sparkles, title: "AI expertise", desc: "AI woven through strategy, build, and growth — not bolted on." },
  { icon: Layers, title: "End-to-end", desc: "Brand, site, apps, marketing, and automation under one roof." },
];

const CONTACT_FAQS = [
  { q: "How quickly will I hear back?", a: "We reply to every enquiry within a few hours on business days, and always within 24 hours." },
  { q: "What happens after I submit the form?", a: "A dedicated strategist reviews your details, then reaches out to book a free 30-minute discovery call — no obligation." },
  { q: "Do you work with businesses outside India?", a: "Yes. We serve clients across eight markets with local pricing and context, and work in your timezone." },
  { q: "How is pricing decided?", a: "Every project is quoted to scope with a clear, fixed price. You'll see the full breakdown before anything begins." },
  { q: "What information should I share?", a: "Your goals, rough budget, timeline, and the service you're interested in help us come prepared — but a short note is enough to start." },
];

// ─── Country Data ───────────────────────────────────────────────────────
const COUNTRIES = [
  {
    code: "IN",
    name: "India",
    dialCode: "+91",
    flag: "🇮🇳",
    pattern: /^[6-9]\d{9}$/,
    example: "98765 43210",
    digits: 10,
  },
  {
    code: "US",
    name: "United States",
    dialCode: "+1",
    flag: "🇺🇸",
    pattern: /^\d{10}$/,
    example: "555 000 1234",
    digits: 10,
  },
  {
    code: "GB",
    name: "United Kingdom",
    dialCode: "+44",
    flag: "🇬🇧",
    pattern: /^\d{10}$/,
    example: "7911 123456",
    digits: 10,
  },
  {
    code: "AE",
    name: "UAE",
    dialCode: "+971",
    flag: "🇦🇪",
    pattern: /^5\d{8}$/,
    example: "50 123 4567",
    digits: 9,
  },
  {
    code: "AU",
    name: "Australia",
    dialCode: "+61",
    flag: "🇦🇺",
    pattern: /^4\d{8}$/,
    example: "412 345 678",
    digits: 9,
  },
  {
    code: "CA",
    name: "Canada",
    dialCode: "+1",
    flag: "🇨🇦",
    pattern: /^\d{10}$/,
    example: "604 555 1234",
    digits: 10,
  },
  {
    code: "SG",
    name: "Singapore",
    dialCode: "+65",
    flag: "🇸🇬",
    pattern: /^[89]\d{7}$/,
    example: "8123 4567",
    digits: 8,
  },
  {
    code: "DE",
    name: "Germany",
    dialCode: "+49",
    flag: "🇩🇪",
    pattern: /^\d{10,11}$/,
    example: "1512 3456789",
    digits: 11,
  },
  {
    code: "FR",
    name: "France",
    dialCode: "+33",
    flag: "🇫🇷",
    pattern: /^\d{9}$/,
    example: "612 345 678",
    digits: 9,
  },
  {
    code: "NZ",
    name: "New Zealand",
    dialCode: "+64",
    flag: "🇳🇿",
    pattern: /^\d{8,9}$/,
    example: "21 123 4567",
    digits: 9,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    dialCode: "+966",
    flag: "🇸🇦",
    pattern: /^5\d{8}$/,
    example: "51 234 5678",
    digits: 9,
  },
  {
    code: "MY",
    name: "Malaysia",
    dialCode: "+60",
    flag: "🇲🇾",
    pattern: /^\d{9,10}$/,
    example: "12 345 6789",
    digits: 10,
  },
  {
    code: "PK",
    name: "Pakistan",
    dialCode: "+92",
    flag: "🇵🇰",
    pattern: /^3\d{9}$/,
    example: "300 1234567",
    digits: 10,
  },
  {
    code: "BD",
    name: "Bangladesh",
    dialCode: "+880",
    flag: "🇧🇩",
    pattern: /^\d{10}$/,
    example: "1711 234567",
    digits: 10,
  },
  {
    code: "LK",
    name: "Sri Lanka",
    dialCode: "+94",
    flag: "🇱🇰",
    pattern: /^\d{9}$/,
    example: "71 234 5678",
    digits: 9,
  },
  {
    code: "NP",
    name: "Nepal",
    dialCode: "+977",
    flag: "🇳🇵",
    pattern: /^\d{10}$/,
    example: "98 1234 5678",
    digits: 10,
  },
];

// ─── Schema ─────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, or apostrophes",
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .regex(
      /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address",
    )
    .refine(
      (val) => !val.includes(".."),
      "Email cannot contain consecutive dots",
    )
    .refine((val) => !val.startsWith("."), "Email cannot start with a dot"),

  countryCode: z.string().default("IN"),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val.replace(/[\s\-().]/g, "")), {
      message: "Phone number must contain only digits",
    }),

  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Contact Cards ───────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    icon: Mail,
    title: "Email Us",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    cta: "Send Email",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
    cta: "Call Now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with us directly",
    href: whatsappUrl(
      SITE_CONFIG.whatsapp,
      "Hi GrownetAI! I'd like to discuss a project.",
    ),
    cta: "Open Chat",
    external: true,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    value: "Follow our journey",
    href: SITE_CONFIG.social.linkedin,
    cta: "Connect",
    external: true,
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "See the work in motion",
    href: SITE_CONFIG.social.instagram,
    cta: "Follow",
    external: true,
  },
  {
    icon: MapPin,
    title: "Office",
    value: SITE_CONFIG.address,
    href: "https://maps.google.com/?q=New+Delhi",
    cta: "Get directions",
    external: true,
  },
];

const BUDGET_OPTIONS = [
  "Under ₹10,000/month",
  "₹10,000 – ₹25,000/month",
  "₹25,000 – ₹50,000/month",
  "₹50,000 – ₹1L/month",
  "Above ₹1L/month",
  "One-time project",
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // India default

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { countryCode: "IN" },
  });

  const phoneValue = watch("phone") ?? "";

  // Validate phone against selected country pattern
  function getPhoneError(): string | null {
    if (!phoneValue) return null;
    const digits = phoneValue.replace(/[\s\-().]/g, "");
    if (!/^\d+$/.test(digits)) return "Phone number must contain only digits";
    if (!selectedCountry.pattern.test(digits))
      return `Enter a valid ${selectedCountry.name} number (${selectedCountry.digits} digits, e.g. ${selectedCountry.example})`;
    return null;
  }

  const phoneError = getPhoneError();

  async function onSubmit(data: ContactFormData) {
    // Block submit if phone has error
    if (phoneError) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          phone: data.phone
            ? `${selectedCountry.dialCode} ${data.phone}`
            : undefined,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      toast.success("Message sent! We'll respond within 24 hours.");
      reset();
      setSelectedCountry(COUNTRIES[0]);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="pt-[var(--navbar-height)]">
      {/* Hero */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #14120F 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-paper-raised text-moss-600 border border-hairline mb-6">
            Let&apos;s Connect
          </span>
          <h1 className="font-display text-ink text-5xl md:text-6xl mb-4">
            Let&apos;s start building your <span className="text-gradient">dream business</span>
          </h1>
          <p className="text-ink-body text-xl max-w-xl mx-auto">
            Tell us about your business and we&apos;ll put together a custom
            growth strategy — completely free.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CONTACT_CARDS.map((card, i) => (
              <div
                key={card.title}
                className={`group flex flex-col items-center rounded-3xl border p-7 text-center shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-brand ${
                  i === 0
                    ? "border-moss-200 bg-moss-50 hover:border-moss-300"
                    : "border-hairline bg-paper-raised hover:border-moss-300"
                }`}
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-moss-100 text-moss-700">
                  <card.icon className="h-6 w-6" />
                </span>
                <h3 className="font-heading text-base font-semibold text-ink">
                  {card.title}
                </h3>
                <p className="mb-4 mt-1 text-sm text-ink-muted">{card.value}</p>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="btn btn-secondary btn-sm mt-auto"
                >
                  {card.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-paper">
        <div className="container-site max-w-2xl">
          <div className="text-center mb-12">
            <span className="section-label">Free Consultation</span>
            <h2 className="heading-section mt-2">Tell Us About Your Project</h2>
            <p className="text-body mt-3">
              Fill in the form and we&apos;ll reach out within 24 hours with a
              tailored strategy.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card p-5 sm:p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">
                  Full Name *
                </label>
                <input
                  {...register("name")}
                  placeholder="Rahul Sharma"
                  maxLength={50}
                  onKeyDown={(e) => {
                    // Block numbers and most special chars at keyboard level
                    const allowed = /^[a-zA-Z\s'\-]$/;
                    if (
                      !allowed.test(e.key) &&
                      ![
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className={`input ${errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="rahul@company.com"
                  autoComplete="email"
                  className={`input ${errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone with Country Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">
                  Phone Number
                </label>
                <div
                  className={`flex rounded-lg border bg-paper-raised overflow-hidden focus-within:ring-2 focus-within:ring-moss-400/40 focus-within:border-moss-500 transition-all ${phoneError ? "border-red-400 focus-within:ring-red-200 focus-within:border-red-500" : "border-hairline-strong"}`}
                >
                  {/* Country Selector */}
                  <div className="relative">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const country = COUNTRIES.find(
                          (c) => c.code === e.target.value,
                        );
                        if (country) {
                          setSelectedCountry(country);
                          setValue("countryCode", country.code);
                          setValue("phone", ""); // reset phone on country change
                        }
                      }}
                      className="h-full pl-2 pr-6 text-sm bg-brand-cloud-white border-r border-hairline-strong text-brand-charcoal appearance-none cursor-pointer focus:outline-none"
                      style={{ minWidth: "80px" }}
                      title="Select country"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.dialCode}
                        </option>
                      ))}
                    </select>
                    {/* Dropdown arrow */}
                    <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-brand-slate-gray text-xs">
                      ▾
                    </span>
                  </div>

                  {/* Phone Input */}
                  <input
                    {...register("phone")}
                    type="tel"
                    inputMode="numeric"
                    placeholder={selectedCountry.example}
                    maxLength={selectedCountry.digits + 2}
                    onKeyDown={(e) => {
                      const allowed = /^[\d\s\-().]$/;
                      if (
                        !allowed.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="flex-1 px-3 py-2.5 text-sm text-brand-charcoal placeholder:text-ink-muted focus:outline-none bg-transparent"
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500">{phoneError}</p>
                )}
                {!phoneError && phoneValue && (
                  <p className="text-xs text-green-600">
                    ✓ Valid {selectedCountry.name} number
                  </p>
                )}
              </div>

              {/* Service */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">
                  Service Interested In
                </label>
                <select {...register("service")} className="input bg-paper-raised">
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-charcoal font-heading">
                Monthly Budget
              </label>
              <select {...register("budget")} className="input bg-paper-raised">
                <option value="">Select budget range</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Company + Timeline */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">
                  Company Name
                </label>
                <input
                  {...register("company")}
                  placeholder="Optional"
                  className="input bg-paper-raised"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">
                  Project Timeline
                </label>
                <select {...register("timeline")} className="input bg-paper-raised">
                  <option value="">Select timeline</option>
                  <option>ASAP</option>
                  <option>1–3 months</option>
                  <option>3–6 months</option>
                  <option>Just exploring</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-charcoal font-heading">
                Message *
              </label>
              <textarea
                {...register("message")}
                placeholder="Tell us about your business, goals, and what you're looking to achieve..."
                maxLength={1000}
                className={`textarea ${errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}`}
              />
              <div className="flex justify-between items-center">
                {errors.message ? (
                  <p className="text-xs text-red-500">
                    {errors.message.message}
                  </p>
                ) : (
                  <span />
                )}
                <p className="text-xs text-ink-muted ml-auto">
                  {watch("message")?.length ?? 0}/1000
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !!phoneError}
              className="btn-primary btn-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-ink-muted text-xs">
              By submitting, you agree to our{" "}
              <Link href="/privacy" className="text-brand-teal hover:underline">
                Privacy Policy
              </Link>
              . We&apos;ll never spam you.
            </p>
          </form>
        </div>
      </section>

      {/* Why contact us (bento) */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow">Why contact us</span>
            <h2 className="heading-section mt-3">Reasons to reach out.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CONTACT.map((w, i) => (
              <div
                key={w.title}
                className={cn(
                  "group rounded-3xl border p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-brand",
                  i === 0 ? "border-moss-200 bg-moss-50 hover:border-moss-300" : "border-hairline bg-paper-raised hover:border-moss-300",
                )}
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-moss-100 text-moss-700">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-ink">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-sm bg-paper">
        <div className="container-site mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="heading-section mt-3">Answers before you ask.</h2>
          </div>
          <div className="space-y-3">
            {CONTACT_FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-hairline bg-paper-raised p-5 shadow-card open:border-moss-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-heading font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="h-4 w-4 flex-shrink-0 text-moss-600 group-open:hidden" />
                  <Minus className="hidden h-4 w-4 flex-shrink-0 text-moss-600 group-open:block" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Address + Social */}
      <section className="section-padding-sm bg-sand">
        <div className="container-site text-center">
          <div className="mb-6 flex items-center justify-center gap-2 text-ink-body">
            <MapPin className="h-5 w-5 text-moss-600" />
            <span className="font-semibold">{SITE_CONFIG.address}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {Object.entries(SITE_CONFIG.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold capitalize text-ink-muted transition-colors hover:text-moss-600"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
