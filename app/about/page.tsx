import type { Metadata } from "next";
import Link from "next/link";
import {
  Linkedin,
  Twitter,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Shield,
  Award,
} from "lucide-react";
import { TEAM, INDUSTRIES, STATS, SITE_CONFIG } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import CountUp from "@/components/animations/CountUp";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GrownetAI — our mission, team, and the AI-powered approach that helps businesses grow online.",
  alternates: { canonical: "https://grownetai.com/about" },
};

const VALUES = [
  {
    title: "AI-first strategy",
    desc: "Automation and intelligence woven into every service layer — not bolted on as an afterthought.",
  },
  {
    title: "Radical transparency",
    desc: "Live dashboards, no-surprises invoicing, and plain-English reporting on every campaign.",
  },
  {
    title: "Results over vanity metrics",
    desc: "We track pipeline and revenue growth, not reach and impressions.",
  },
  {
    title: "Continuous optimisation",
    desc: "Weekly iteration cycles and A/B testing — never set-and-forget campaigns.",
  },
  {
    title: "Long-term partnerships",
    desc: "Average client tenure of 26 months. We grow when you grow — our incentives are aligned.",
  },
  {
    title: "Dedicated account managers",
    desc: "Every client gets a named point of contact, not a rotating helpdesk queue.",
  },
];

const CREDENTIALS = [
  {
    icon: MapPin,
    label: "Registered in India",
    value: "CIN: U74999MH2019PTC123456",
  },
  { icon: Shield, label: "GST Registered", value: "27AAACG1234F1Z5" },
  { icon: Award, label: "ISO 9001:2015", value: "Certified Agency" },
];

export default function AboutPage() {
  return (
    <main className="pt-[var(--navbar-height)]">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative bg-gradient-hero overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

        {/* Aurora orbs */}
        <div
          className="aurora-orb aurora-orb-green"
          style={{
            width: 480,
            height: 480,
            top: "-120px",
            right: "-80px",
            opacity: 0.35,
          }}
        />
        <div
          className="aurora-orb aurora-orb-teal"
          style={{
            width: 320,
            height: 320,
            bottom: "-80px",
            left: "10%",
            opacity: 0.25,
          }}
        />

        <div className="container-site relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="glass text-white/90 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6 border border-white/20">
              About GrownetAI
            </span>

            <h1 className="font-heading font-bold text-white leading-[1.1] text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
              We help businesses{" "}
              <span className="italic text-brand-green">grow faster</span>{" "}
              online
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              An AI-powered digital marketing agency built for measurable
              outcomes — not vanity metrics. Based in Mumbai, serving clients
              across India and globally since {SITE_CONFIG.founded}.
            </p>

            {/* Credibility strip */}
            {/* <div className="flex flex-wrap gap-4">
              {CREDENTIALS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
                >
                  <Icon className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <div>
                    <p className="text-white/50 text-[10px] uppercase tracking-wider font-semibold leading-none mb-0.5">
                      {label}
                    </p>
                    <p className="text-white text-xs font-semibold leading-none">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section className="section-padding-sm bg-brand-cloud-white border-b border-black/[0.06]">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.07}>
                <div className="aurora-card p-6 text-center">
                  <p className="stat-card-value">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-brand-slate-gray text-sm mt-2 font-medium">
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — narrative */}
            <FadeIn direction="left">
              <span className="section-label mb-5">Our mission</span>
              <h2 className="heading-section mt-4 mb-6">
                Why we <span className="text-gradient">exist</span>
              </h2>
              <div className="prose-brand space-y-4">
                <p>
                  Most digital agencies sell effort — long hours, big decks,
                  weekly calls. We sell outcomes. Every campaign, strategy, and
                  optimisation decision is anchored to one question: does this
                  move the revenue needle?
                </p>
                <p>
                  We founded GrownetAI after watching too many SMEs burn
                  marketing budgets on agencies that couldn't explain their own
                  results. We built a process that combines AI-driven audience
                  intelligence, transparent performance tracking, and dedicated
                  human expertise.
                </p>
                <blockquote>
                  "The benchmark isn't last month. It's what's possible when
                  every decision is data-informed."
                </blockquote>
              </div>
            </FadeIn>

            {/* Right — values */}
            <FadeIn direction="right">
              <div className="card-dark rounded-3xl p-8 lg:p-10">
                <h3 className="font-heading font-bold text-white text-xl mb-7">
                  What we stand for
                </h3>
                <ul className="space-y-5">
                  {VALUES.map((v) => (
                    <li key={v.title} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-semibold text-sm leading-none mb-1">
                          {v.title}
                        </p>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {v.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section className="section-padding aurora-bg">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="aurora-section-label mb-4">
              The people behind it
            </span>
            <h2 className="heading-section mt-4">
              Meet our <span className="text-gradient">leadership team</span>
            </h2>
            <p className="text-brand-slate-gray mt-3 max-w-xl mx-auto">
              Eight full-time specialists, one dedicated account manager per
              client, and a network of vetted freelance creatives across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="aurora-card p-7 flex flex-col items-center text-center gap-4 h-full">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center
                                text-white font-heading font-bold text-xl shadow-brand"
                  >
                    {getInitials(member.name)}
                  </div>

                  {/* Identity */}
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal text-base leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-brand-teal text-xs font-semibold mt-0.5 uppercase tracking-wide">
                      {member.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-brand-slate-gray text-sm leading-relaxed flex-1">
                    {member.bio}
                  </p>

                  {/* Social */}
                  <div className="flex gap-3 pt-1">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-lg bg-brand-teal-mist flex items-center justify-center
                                 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-200"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.twitter}
                      className="w-8 h-8 rounded-lg bg-brand-teal-mist flex items-center justify-center
                                 text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-200"
                      aria-label={`${member.name} on Twitter`}
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────── */}
      <section className="section-padding bg-brand-mint-cream">
        <div className="container-site text-center">
          <span className="section-label mb-5">Industries we serve</span>
          <h2 className="heading-section mt-4 mb-4">
            Expertise across every <span className="text-gradient">sector</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {INDUSTRIES.map((ind) => (
              <span
                key={ind}
                className="badge-teal px-5 py-2 text-sm cursor-default
                           hover:bg-brand-teal hover:text-white hover:border-brand-teal
                           transition-all duration-200"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founded callout ──────────────────────────── */}
      {/* <section className="section-padding-sm bg-white border-t border-black/[0.06]">
        <div className="container-site">
          <div
            className="card-brand rounded-3xl p-10 lg:p-14 flex flex-col lg:flex-row
                          items-center justify-between gap-10 noise-overlay relative overflow-hidden"
          >
            <div className="text-center lg:text-left">
              <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-3">
                Est. {SITE_CONFIG.founded}
              </p>
              <h2
                className="font-heading font-bold text-brand-charcoal text-3xl lg:text-4xl
                             leading-tight tracking-tight"
              >
                Helping businesses unlock their{" "}
                <span className="text-gradient">true digital potential</span>
              </h2>
              <p className="text-brand-slate-gray mt-4 max-w-md leading-relaxed">
                From Mumbai to the world — 150+ clients, ₹8Cr+ in managed ad
                spend, and a team that treats your growth targets as our own.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <p className="stat-card-value text-6xl">6+</p>
              <p className="text-brand-slate-gray text-sm font-semibold tracking-wide uppercase">
                Years in operation
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="section-padding bg-gradient-dark text-white relative overflow-hidden noise-overlay">
        {/* Aurora orbs */}
        <div
          className="aurora-orb aurora-orb-green"
          style={{
            width: 500,
            height: 500,
            top: "-150px",
            right: "-100px",
            opacity: 0.2,
          }}
        />

        <div className="container-site max-w-2xl mx-auto text-center relative z-10">
          <span
            className="glass border border-white/20 text-white/80 text-xs font-bold
                           uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6"
          >
            Ready to grow?
          </span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-white tracking-tight leading-tight">
            Let's build something{" "}
            <span className="text-gradient">exceptional</span> together
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Free 30-minute strategy call — no commitment, no pitch deck. Just a
            honest conversation about your growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn btn-lg btn-primary shadow-brand-lg"
            >
              Book a free call <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="btn btn-lg btn-secondary !border-white/30 !text-white
                         hover:!bg-white/10 hover:!border-white/60"
            >
              View case studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
// import type { Metadata } from "next";
// import Link from "next/link";
// import { Linkedin, Twitter, CheckCircle2, ArrowRight } from "lucide-react";
// import { TEAM, INDUSTRIES, STATS, SITE_CONFIG } from "@/lib/constants";
// import { getInitials } from "@/lib/utils";
// import FadeIn from "@/components/animations/FadeIn";
// import CountUp from "@/components/animations/CountUp";

// export const metadata: Metadata = {
//   title: "About Us",
//   description:
//     "Learn about GrownetAI — our mission, team, and the AI-powered approach that helps businesses grow online.",
//   alternates: { canonical: "https://grownetai.com/about" },
// };

// const statEmoji: Record<string, string> = {
//   Users: "👥",
//   Star: "⭐",
//   TrendingUp: "📈",
//   DollarSign: "💰",
// };

// const VALUES = [
//   "AI-first strategy at every step",
//   "Radical transparency in reporting",
//   "Results over vanity metrics",
//   "Continuous optimisation, not set-and-forget",
//   "Long-term partnerships, not one-time projects",
//   "Dedicated account managers for every client",
// ];

// export default function AboutPage() {
//   return (
//     <main className="pt-[var(--navbar-height)]">
//       {/* Hero */}
//       <section className="relative bg-gradient-hero py-24 overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
//             backgroundSize: "40px 40px",
//           }}
//         />
//         <div className="container-site relative z-10 text-center">
//           <span className="section-label bg-white/20 text-white border-white/30 mb-4">
//             About GrownetAI
//           </span>
//           <h1 className="font-heading font-bold text-white text-5xl md:text-6xl leading-tight mt-4 mb-6">
//             We Help Businesses{" "}
//             <span className="text-brand-green">Grow Online</span>
//           </h1>
//           <p className="text-white/80 text-xl max-w-2xl mx-auto">
//             Founded in {SITE_CONFIG.founded}, GrownetAI is an AI-powered digital
//             marketing agency based in {SITE_CONFIG.address}, serving clients
//             globally.
//           </p>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="section-padding bg-brand-cloud-white">
//         <div className="container-site">
//           <div className="text-center mb-12">
//             <span className="section-label">By the Numbers</span>
//             <h2 className="heading-section mt-2">
//               Our <span className="text-gradient">Impact</span>
//             </h2>
//           </div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {STATS.map((stat, i) => (
//               <FadeIn key={stat.label} delay={i * 0.08}>
//                 <div className="card p-6 text-center">
//                   <div className="text-3xl mb-3">{statEmoji[stat.icon]}</div>
//                   <div className="font-heading font-bold text-4xl text-brand-teal">
//                     <CountUp value={stat.value} suffix={stat.suffix} />
//                   </div>
//                   <p className="text-brand-slate-gray text-sm mt-2">
//                     {stat.label}
//                   </p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="section-padding bg-white">
//         <div className="container-site">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <FadeIn direction="left">
//               <div>
//                 <span className="section-label">How We Operate</span>
//                 <h2 className="heading-section mt-2 mb-6">
//                   Our <span className="text-gradient">Core Values</span>
//                 </h2>
//                 <ul className="space-y-3">
//                   {VALUES.map((v) => (
//                     <li
//                       key={v}
//                       className="flex items-start gap-3 text-brand-slate-gray"
//                     >
//                       <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
//                       {v}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </FadeIn>
//             <FadeIn direction="right">
//               <div className="bg-gradient-brand rounded-3xl p-10 text-white text-center">
//                 <p className="font-heading font-bold text-5xl mb-3">
//                   Since {SITE_CONFIG.founded}
//                 </p>
//                 <p className="text-white/80 text-lg leading-relaxed">
//                   Helping businesses across India and the world unlock their
//                   true digital growth potential.
//                 </p>
//               </div>
//             </FadeIn>
//           </div>
//         </div>
//       </section>

//       {/* Team */}
//       <section className="section-padding bg-brand-cloud-white">
//         <div className="container-site">
//           <div className="text-center mb-12">
//             <span className="section-label">The People Behind It</span>
//             <h2 className="heading-section mt-2">
//               Meet Our <span className="text-gradient">Team</span>
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {TEAM.map((member, i) => (
//               <FadeIn key={member.name} delay={i * 0.08}>
//                 <div className="card card-hover p-6 text-center flex flex-col items-center gap-3 h-full">
//                   <div className="w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl font-heading">
//                     {getInitials(member.name)}
//                   </div>
//                   <div>
//                     <h3 className="font-heading font-bold text-brand-charcoal text-lg">
//                       {member.name}
//                     </h3>
//                     <p className="text-brand-teal text-sm font-semibold">
//                       {member.role}
//                     </p>
//                   </div>
//                   <p className="text-brand-slate-gray text-sm leading-relaxed flex-1">
//                     {member.bio}
//                   </p>
//                   <div className="flex gap-3">
//                     <a
//                       href={member.linkedin}
//                       className="text-brand-slate-gray hover:text-brand-teal transition-colors"
//                       aria-label="LinkedIn"
//                     >
//                       <Linkedin className="w-5 h-5" />
//                     </a>
//                     <a
//                       href={member.twitter}
//                       className="text-brand-slate-gray hover:text-brand-teal transition-colors"
//                       aria-label="Twitter"
//                     >
//                       <Twitter className="w-5 h-5" />
//                     </a>
//                   </div>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Industries */}
//       <section className="section-padding bg-brand-mint-cream text-center">
//         <div className="container-site">
//           <span className="section-label">Industries We Serve</span>
//           <h2 className="heading-section mt-2 mb-10">
//             Across Every <span className="text-gradient">Sector</span>
//           </h2>
//           <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
//             {INDUSTRIES.map((ind) => (
//               <span key={ind} className="badge-teal px-4 py-2 text-sm">
//                 {ind}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="section-padding bg-gradient-brand text-white text-center">
//         <div className="container-site max-w-2xl mx-auto">
//           <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-white">
//             Ready to Work With Us?
//           </h2>
//           <p className="text-white/80 text-lg mb-8">
//             Join 150+ businesses growing with GrownetAI.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               href="/contact"
//               className="btn btn-lg bg-white text-brand-teal font-bold hover:bg-white/90 inline-flex items-center gap-2"
//             >
//               Get Free Consultation <ArrowRight className="w-5 h-5" />
//             </Link>
//             <Link
//               href="/portfolio"
//               className="btn btn-lg border-2 border-white/60 text-white hover:bg-white hover:text-brand-teal transition-all"
//             >
//               View Our Work
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
