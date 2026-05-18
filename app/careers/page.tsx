"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Zap,
  Heart,
  TrendingUp,
  Coffee,
  Laptop,
  Star,
  Send,
  Loader2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

// ─── Job Openings ───────────────────────────────────────────────────────────
const JOB_OPENINGS = [
  {
    id: "seo-specialist",
    title: "SEO & Content Specialist",
    type: "Full-time",
    location: "New Delhi / Remote",
    department: "Marketing",
    experience: "1–3 years",
    description:
      "Drive organic growth for our clients through data-driven SEO strategies, keyword research, and compelling content creation.",
    responsibilities: [
      "Conduct technical SEO audits and implement fixes",
      "Research and map keywords to content opportunities",
      "Write and optimize blog articles, landing pages, and meta data",
      "Monitor rankings, traffic, and conversions using GA4 & GSC",
      "Build backlink strategies and manage outreach",
    ],
    requirements: [
      "Strong understanding of on-page and off-page SEO",
      "Experience with Ahrefs, SEMrush, or similar tools",
      "Good English writing skills",
      "Familiarity with WordPress or similar CMS",
      "Analytical mindset with attention to detail",
    ],
    color: "#1AABAB",
  },
  {
    id: "performance-marketer",
    title: "Performance Marketing Manager",
    type: "Full-time",
    location: "New Delhi / Remote",
    department: "Paid Ads",
    experience: "2–4 years",
    description:
      "Manage and scale paid campaigns across Google Ads and Meta platforms for a portfolio of clients across industries.",
    responsibilities: [
      "Plan, launch, and optimize Google Search, Display, and Shopping campaigns",
      "Run Meta (Facebook/Instagram) ad campaigns from creative to conversion",
      "A/B test ad creatives, landing pages, and audience segments",
      "Manage monthly budgets of ₹5L–₹50L across clients",
      "Deliver bi-weekly performance reports with insights",
    ],
    requirements: [
      "Google Ads & Meta Business Suite hands-on experience",
      "Proven track record of scaling ROAS",
      "Strong analytical skills — comfortable with data and spreadsheets",
      "Google Ads certification (preferred)",
      "Client communication experience",
    ],
    color: "#3BC456",
  },
  {
    id: "social-media-manager",
    title: "Social Media Manager",
    type: "Full-time",
    location: "New Delhi / Hybrid",
    department: "Social",
    experience: "1–2 years",
    description:
      "Create and manage engaging social media content for multiple client accounts across Instagram, Facebook, LinkedIn, and YouTube.",
    responsibilities: [
      "Develop monthly content calendars for clients",
      "Write captions, scripts, and creative briefs",
      "Coordinate with designers and video editors",
      "Manage community engagement and respond to comments/DMs",
      "Analyze performance and adjust strategy monthly",
    ],
    requirements: [
      "Experience managing Instagram and LinkedIn business pages",
      "Creative writing and copywriting skills",
      "Knowledge of social media trends and algorithms",
      "Basic Canva or Adobe design skills a plus",
      "Organized, self-starter with ability to manage multiple accounts",
    ],
    color: "#8B5CF6",
  },
  {
    id: "video-editor",
    title: "Video Editor & Reels Creator",
    type: "Full-time / Freelance",
    location: "Remote",
    department: "Creative",
    experience: "1–3 years",
    description:
      "Edit high-quality short-form videos and Reels for our clients' brands. Fast turnaround, strong sense of trends.",
    responsibilities: [
      "Edit 15–90 second Reels and YouTube Shorts",
      "Add captions, transitions, sound effects, and motion graphics",
      "Work with raw footage and scripts provided by the content team",
      "Stay updated on trending audio and editing styles",
      "Deliver 10–20 videos per month per client",
    ],
    requirements: [
      "Proficiency in Premiere Pro, CapCut, or DaVinci Resolve",
      "Strong portfolio of short-form videos",
      "Fast turnaround — 24–48 hours per edit",
      "Understanding of platform-specific video formats",
      "Motion graphics experience (After Effects) is a plus",
    ],
    color: "#F59E0B",
  },
  {
    id: "web-developer",
    title: "Frontend Web Developer",
    type: "Full-time",
    location: "New Delhi / Remote",
    department: "Tech",
    experience: "2–4 years",
    description:
      "Build fast, beautiful, and conversion-optimized websites and landing pages for our clients using Next.js and Tailwind CSS.",
    responsibilities: [
      "Develop client websites from Figma designs to production",
      "Build landing pages optimized for speed and conversions",
      "Integrate CMS platforms (WordPress, Webflow, Sanity)",
      "Ensure mobile responsiveness and Core Web Vitals scores",
      "Maintain and update existing client websites",
    ],
    requirements: [
      "Strong React / Next.js skills",
      "Tailwind CSS experience",
      "Figma-to-code workflow",
      "Basic understanding of SEO and performance optimization",
      "Experience with Vercel or similar deployment platforms",
    ],
    color: "#EF4444",
  },
  {
    id: "business-development",
    title: "Business Development Executive",
    type: "Full-time",
    location: "New Delhi",
    department: "Sales",
    experience: "1–3 years",
    description:
      "Identify, pitch, and close new business for GrownetAI. Help brands understand the power of AI-driven digital marketing.",
    responsibilities: [
      "Generate leads through LinkedIn, cold outreach, and referrals",
      "Conduct discovery calls and present service proposals",
      "Follow up with prospects and close deals",
      "Maintain a CRM and track pipeline",
      "Collaborate with the delivery team on onboarding",
    ],
    requirements: [
      "Strong communication and presentation skills",
      "Understanding of digital marketing services",
      "Target-driven mindset",
      "Experience with CRM tools",
      "Hindi and English fluency required",
    ],
    color: "#1AABAB",
  },
];

// ─── Perks ──────────────────────────────────────────────────────────────────
const PERKS = [
  { icon: TrendingUp, title: "Fast Growth", desc: "Work on real campaigns with real budgets. Learn faster than anywhere else." },
  { icon: Laptop, title: "Remote Friendly", desc: "Most roles are remote or hybrid. We care about output, not clock-ins." },
  { icon: Zap, title: "AI-First Culture", desc: "We use cutting-edge AI tools daily. You'll be ahead of the industry." },
  { icon: Heart, title: "Great Team", desc: "Small, tight-knit team of marketers, creators, and builders who love what they do." },
  { icon: Coffee, title: "Flexible Hours", desc: "We trust adults to manage their time. Results matter more than rigid schedules." },
  { icon: Star, title: "Performance Bonuses", desc: "Hit targets and you'll be rewarded. We share the wins with the team." },
];

// ─── Application Schema ──────────────────────────────────────────────────────
const applySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  role: z.string().min(1, "Please select a role"),
  portfolio: z.string().url("Enter a valid URL (e.g. LinkedIn or portfolio link)").optional().or(z.literal("")),
  message: z.string().min(20, "Please write at least 20 characters about yourself"),
});
type ApplyFormData = z.infer<typeof applySchema>;

// ─── Job Card ────────────────────────────────────────────────────────────────
function JobCard({ job, onApply }: { job: typeof JOB_OPENINGS[0]; onApply: (role: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between p-6 text-left gap-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: job.color }}
            >
              {job.department}
            </span>
            <span className="text-xs font-semibold text-brand-slate-gray bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> {job.type}
            </span>
            <span className="text-xs font-semibold text-brand-slate-gray bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {job.location}
            </span>
            <span className="text-xs font-semibold text-brand-slate-gray bg-gray-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> {job.experience}
            </span>
          </div>
          <h3 className="font-heading font-bold text-brand-charcoal text-lg">{job.title}</h3>
          <p className="text-brand-slate-gray text-sm mt-1">{job.description}</p>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-brand-slate-gray flex-shrink-0 mt-1 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-5">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-heading font-semibold text-brand-charcoal mb-3">Responsibilities</h4>
              <ul className="space-y-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-brand-slate-gray">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: job.color }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-brand-charcoal mb-3">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-brand-slate-gray">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: job.color }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={() => onApply(job.title)}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            Apply for this Role <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const waHref = whatsappUrl(SITE_CONFIG.whatsapp, "Hi GrownetAI! I'm interested in joining your team.");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ApplyFormData>({ resolver: zodResolver(applySchema) });

  function openApply(role: string) {
    setSelectedRole(role);
    setValue("role", role);
    // Scroll to form
    setTimeout(() => {
      document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  async function onSubmit(data: ApplyFormData) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Application sent! We'll review it and get back to you soon. 🎉");
      reset();
      setSelectedRole("");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="pt-[var(--navbar-height)]">

      {/* Hero */}
      <section className="relative bg-gradient-hero py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }}
        />
        <div className="container-site relative z-10 text-center">
          <span className="section-label bg-white/20 text-white border-white/30 mb-4">
            We&apos;re Hiring
          </span>
          <h1 className="font-heading font-bold text-white text-5xl md:text-6xl mt-4 mb-6">
            Grow Your Career at{" "}
            <span className="text-brand-green">GrownetAI</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-8">
            Join a fast-moving team of marketers, creators, and tech builders helping Indian businesses grow with AI-powered strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#openings"
              className="btn btn-lg bg-white text-brand-teal hover:bg-gray-100 inline-flex items-center gap-2"
            >
              View Open Roles <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg bg-[#25D366] text-white hover:bg-[#20ba5a] inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Chat with Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50+", label: "Happy Clients" },
              { value: "6+", label: "Open Roles" },
              { value: "100%", label: "Remote Options" },
              { value: "2024", label: "Founded" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading font-bold text-3xl text-brand-teal">{stat.value}</p>
                <p className="text-brand-slate-gray text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">Why GrownetAI</span>
            <h2 className="heading-section mt-2">
              Why You&apos;ll <span className="text-gradient">Love It Here</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map((perk, i) => (
              <FadeIn key={perk.title} delay={i * 0.08}>
                <div className="card p-6 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-teal-mist flex items-center justify-center text-brand-teal flex-shrink-0">
                    <perk.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-brand-charcoal mb-1">{perk.title}</h3>
                    <p className="text-brand-slate-gray text-sm leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="section-padding bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">Open Positions</span>
            <h2 className="heading-section mt-2">
              Current <span className="text-gradient">Openings</span>
            </h2>
            <p className="text-body mt-3 max-w-xl mx-auto">
              Click on any role to see the full details and apply directly.
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {JOB_OPENINGS.map((job, i) => (
              <FadeIn key={job.id} delay={i * 0.06}>
                <JobCard job={job} onApply={openApply} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="section-padding bg-brand-cloud-white">
        <div className="container-site max-w-2xl">
          <div className="text-center mb-10">
            <span className="section-label">Apply Now</span>
            <h2 className="heading-section mt-2">
              Send Your <span className="text-gradient">Application</span>
            </h2>
            <p className="text-body mt-3">
              Fill in the form below. We review every application and respond within 3–5 working days.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card p-5 sm:p-8 flex flex-col gap-5"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">Full Name *</label>
                <input
                  {...register("name")}
                  placeholder="Priya Sharma"
                  className={`input ${errors.name ? "border-red-400 focus:border-red-500" : ""}`}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">Email Address *</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="priya@email.com"
                  className={`input ${errors.email ? "border-red-400" : ""}`}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            {/* Phone + Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">Phone Number *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={`input ${errors.phone ? "border-red-400" : ""}`}
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-brand-charcoal font-heading">Role Applying For *</label>
                <select
                  {...register("role")}
                  value={selectedRole}
                  onChange={(e) => { setSelectedRole(e.target.value); setValue("role", e.target.value); }}
                  className={`input bg-white ${errors.role ? "border-red-400" : ""}`}
                >
                  <option value="">Select a role...</option>
                  {JOB_OPENINGS.map((job) => (
                    <option key={job.id} value={job.title}>{job.title}</option>
                  ))}
                  <option value="Other / Open Application">Other / Open Application</option>
                </select>
                {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
              </div>
            </div>

            {/* Portfolio / LinkedIn */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-charcoal font-heading">
                Portfolio / LinkedIn / Work Samples
                <span className="text-brand-slate-gray font-normal ml-1">(optional)</span>
              </label>
              <input
                {...register("portfolio")}
                type="url"
                placeholder="https://linkedin.com/in/yourname or your portfolio link"
                className={`input ${errors.portfolio ? "border-red-400" : ""}`}
              />
              {errors.portfolio && <p className="text-xs text-red-500">{errors.portfolio.message}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-brand-charcoal font-heading">
                Tell Us About Yourself *
              </label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Share your experience, what you've worked on, why you want to join GrownetAI, and what makes you a great fit..."
                className={`textarea resize-none ${errors.message ? "border-red-400" : ""}`}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-5 h-5" /> Submit Application</>
              )}
            </button>

            <p className="text-center text-brand-light-gray text-xs">
              We respond to every application within 3–5 working days.{" "}
              <Link href="/privacy" className="text-brand-teal hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-site text-center max-w-2xl mx-auto">
          <div className="text-4xl mb-4">💼</div>
          <h2 className="font-heading font-bold text-2xl text-brand-charcoal mb-3">
            Don&apos;t See the Right Role?
          </h2>
          <p className="text-brand-slate-gray mb-6">
            We&apos;re always open to talented people. Drop us your profile on WhatsApp and we&apos;ll keep you in mind for future openings.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg bg-[#25D366] text-white hover:bg-[#20ba5a] inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Your Profile
            </a>
            <Link href="/contact" className="btn btn-lg btn-secondary inline-flex items-center gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
