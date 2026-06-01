import Link from "next/link";
import {
  Search,
  Target,
  Share2,
  Video,
  Code2,
  Palette,
  Mail,
  Instagram,
  ChevronRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Share2: <Share2 className="w-6 h-6" />,
  Video: <Video className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Instagram: <Instagram className="w-6 h-6" />,
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-brand-cloud-white">
      <div className="container-site">
        <div className="text-center mb-14">
          <span className="section-label">What We Offer</span>
          <h2 className="heading-section mt-2">
            Everything You Need to{" "}
            <span className="text-gradient">Grow Online</span>
          </h2>
          <p className="text-body-lg mt-4 max-w-2xl mx-auto">
            From search engine dominance to viral social content — measurable
            results across every digital channel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.06} direction="up">
              <Link
                href={`/services#${service.id}`}
                className="card card-hover h-full flex flex-col p-6 group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-300"
                  style={{ background: `${service.color}18` }}
                >
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-heading font-bold text-brand-charcoal text-sm mb-2 flex-1">
                  {service.title}
                </h3>
                <p className="text-brand-slate-gray text-sm leading-relaxed mb-4">
                  {service.shortDesc}
                </p>
                <span className="text-brand-teal text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  Learn More <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
