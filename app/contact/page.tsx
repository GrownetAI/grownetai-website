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
} from "lucide-react";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

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

  service: z.string().optional(),
  budget: z.string().optional(),

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
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container-site relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30 mb-6">
            📬 Let&apos;s Connect
          </span>
          <h1 className="font-heading font-bold text-white text-5xl md:text-6xl mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-white/80 text-xl max-w-xl mx-auto">
            Tell us about your business and we&apos;ll put together a custom
            growth strategy — completely free.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-padding-sm bg-brand-cloud-white">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_CARDS.map((card) => (
              <div key={card.title} className="card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-teal-mist flex items-center justify-center text-brand-teal mx-auto mb-4">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-brand-charcoal mb-1">
                  {card.title}
                </h3>
                <p className="text-brand-slate-gray text-sm mb-4">
                  {card.value}
                </p>
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="btn-secondary btn-sm inline-flex"
                >
                  {card.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
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
                  className={`flex rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-brand-teal/30 focus-within:border-brand-teal transition-all ${phoneError ? "border-red-400 focus-within:ring-red-200 focus-within:border-red-500" : "border-brand-light-gray"}`}
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
                      className="h-full pl-2 pr-6 text-sm bg-brand-cloud-white border-r border-brand-light-gray text-brand-charcoal appearance-none cursor-pointer focus:outline-none"
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
                    className="flex-1 px-3 py-2.5 text-sm text-brand-charcoal placeholder:text-brand-light-gray focus:outline-none bg-transparent"
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
                <select {...register("service")} className="input bg-white">
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
              <select {...register("budget")} className="input bg-white">
                <option value="">Select budget range</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
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
                <p className="text-xs text-brand-light-gray ml-auto">
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

            <p className="text-center text-brand-light-gray text-xs">
              By submitting, you agree to our{" "}
              <Link href="/privacy" className="text-brand-teal hover:underline">
                Privacy Policy
              </Link>
              . We&apos;ll never spam you.
            </p>
          </form>
        </div>
      </section>

      {/* Address + Social */}
      <section className="section-padding-sm bg-brand-cloud-white">
        <div className="container-site text-center">
          <div className="flex items-center justify-center gap-2 text-brand-slate-gray mb-6">
            <MapPin className="w-5 h-5 text-brand-teal" />
            <span className="font-semibold">{SITE_CONFIG.address}</span>
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {Object.entries(SITE_CONFIG.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-slate-gray hover:text-brand-teal text-sm font-semibold capitalize transition-colors"
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
