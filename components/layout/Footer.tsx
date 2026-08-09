"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  // { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_ICONS = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/grownetai?igsh=MWYwNGkzZGlhY3pzZw%3D%3D&utm_source=qr",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1B7tNMMVHR/?mibextid=wwXIfr",
    label: "Facebook",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/grownetai",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCTlpSaNHxNXRN-C1aGRJfgA",
    label: "YouTube",
  },
];

export default function Footer() {
  // Client-side so the year comes from the visitor's clock; as a server
  // component it would bake in at build time and go stale each January.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="aurora-footer text-paper xl:px-8">
      <div className="container-site py-16 lg:py-20 max-w-full mx-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 px-4 py-3 bg-sand rounded-full">
              <Image
                src="/images/g_logo2.png"
                alt="GrownetAI"
                width={150}
                height={42}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-paper/70 text-sm leading-relaxed mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-paper/10 flex items-center justify-center text-paper/80 hover:bg-paper hover:text-forest transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-heading font-semibold text-paper text-xs uppercase tracking-widest mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-paper/70 text-sm hover:text-paper transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-moss-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="font-heading font-semibold text-paper text-xs uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/70 text-sm hover:text-paper transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-moss-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="font-heading font-semibold text-paper text-xs uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-3 text-paper/70 text-sm hover:text-paper transition-colors duration-200 break-all"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-moss-300" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-start gap-3 text-paper/70 text-sm hover:text-paper transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-moss-300" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-paper/70 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-moss-300" />
                  {SITE_CONFIG.address}
                </div>
              </li>
              <li className="pt-1">
                <a
                  href={whatsappUrl(
                    "8796432343",
                    "Hi GrownetAI! I'd like to know more about your services.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-forest-ink text-sm font-semibold hover:bg-[#20ba5a] transition-colors duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-paper/10">
        {/* pb-24 keeps the legal links clear of the floating Hire Us pill;
            at ≥1728px the FAB sits outside the content column, so normal padding. */}
        <div className="container-site pt-5 pb-24 min-[1728px]:pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-paper/65 text-xs text-center sm:text-left">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved. Helping
            businesses grow online.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-paper/65 text-xs hover:text-paper transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-paper/65 text-xs hover:text-paper transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
