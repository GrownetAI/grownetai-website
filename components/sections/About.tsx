import { TEAM, INDUSTRIES, STATS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import { Linkedin, Twitter } from "lucide-react";
import CountUp from "@/components/animations/CountUp";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

const statEmoji: Record<string, string> = {
  Users: "👥", Star: "⭐", TrendingUp: "📈", DollarSign: "💰",
};

export default function AboutSection() {
  return (
    <>
      {/* Stats */}
      <section className="section-padding bg-brand-cloud-white">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.07}>
                <div className="card p-6 text-center">
                  <div className="text-3xl mb-3">{statEmoji[stat.icon]}</div>
                  <div className="font-heading font-bold text-4xl text-brand-teal">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-brand-slate-gray text-sm mt-2">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">The People Behind It</span>
            <h2 className="heading-section mt-2">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <div className="card card-hover p-6 text-center flex flex-col items-center gap-3 h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-xl font-heading">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal">{member.name}</h3>
                    <p className="text-brand-teal text-sm font-semibold">{member.role}</p>
                  </div>
                  <p className="text-brand-slate-gray text-sm leading-relaxed flex-1">{member.bio}</p>
                  <div className="flex gap-3 mt-1">
                    <a href={member.linkedin} className="text-brand-slate-gray hover:text-brand-teal transition-colors" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.twitter} className="text-brand-slate-gray hover:text-brand-teal transition-colors" aria-label="Twitter">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-brand-mint-cream">
        <div className="container-site text-center">
          <span className="section-label">Industries We Serve</span>
          <h2 className="heading-section mt-2 mb-10">
            Across Every <span className="text-gradient">Industry</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {INDUSTRIES.map((ind) => (
              <span key={ind} className="badge-teal px-4 py-2 text-sm">{ind}</span>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/contact" className="btn btn-primary btn-lg">Work With Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
