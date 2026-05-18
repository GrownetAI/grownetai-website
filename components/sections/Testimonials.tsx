import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-brand-cloud-white">
      <div className="container-site">
        <div className="text-center mb-14">
          <span className="section-label">Client Results</span>
          <h2 className="heading-section mt-2">
            Real Results, <span className="text-gradient">Real Businesses</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.07}>
              <div className="card card-hover h-full p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-slate-gray text-sm leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="badge-teal text-xs">{t.service}</span>
                  <span className="badge-green text-xs">{t.result}</span>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm font-heading flex-shrink-0">
                    {getInitials(t.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-brand-charcoal text-sm font-heading">
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-slate-gray">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
