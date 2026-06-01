"use client";

import { Briefcase, Tag, FileText, Users } from "lucide-react";

const TEAL = "#008080";

const MODULES = [
  { label: "Services", desc: "Edit the services shown across the site.", icon: Briefcase },
  { label: "Pricing", desc: "Manage packages and per-country pricing.", icon: Tag },
  { label: "Blog", desc: "Create and publish blog posts.", icon: FileText },
  { label: "Leads", desc: "Review contact and enquiry submissions.", icon: Users },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-bold text-2xl text-brand-charcoal">Overview</h1>
        <p className="text-sm text-brand-slate-gray mt-1">
          Your website management panel. Modules can be wired into this shell as
          they&rsquo;re built — each backed by its own admin-only API.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 mb-8">
        <h2 className="font-heading font-bold text-brand-charcoal mb-1">
          Welcome to the admin panel
        </h2>
        <p className="text-sm text-brand-slate-gray">
          This area is restricted to administrator accounts and is separate from
          the public site. Content modules will appear below as they go live.
        </p>
      </div>

      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-light-gray mb-3">
        Modules
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {MODULES.map(({ label, desc, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-dashed border-gray-200 p-5 flex items-start gap-4"
          >
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${TEAL}10`, color: TEAL }}
            >
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-brand-charcoal">{label}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">
                  Soon
                </span>
              </div>
              <p className="text-sm text-brand-slate-gray mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
