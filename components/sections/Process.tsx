"use client";
import { motion } from "framer-motion";
import { Compass, Layers, Code2, Rocket, TrendingUp } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
};

export default function Process() {
  return (
    <section
      id="process"
      className="section-pad relative overflow-hidden"
      style={{ background: "#003B3B" }}
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00E5E5]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container-site relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label mx-auto">How We Work</div>
            <h2 className="section-heading mb-4">
              Our Proven <span className="accent">5-Step Process</span>
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Every project follows a disciplined process designed to minimize
              risk and maximize outcomes.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[27px] top-6 bottom-6 w-px"
              style={{
                background:
                  "rgba(0,128,128,0.25)",
              }}
            />

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 relative"
                >
                  {/* Step icon */}
                  <div className="shrink-0 relative">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white relative z-10"
                      style={{
                        background: "var(--gradient-brand)",
                        boxShadow: "0 4px 20px rgba(0, 128, 128,.30)",
                      }}
                    >
                      {iconMap[step.icon]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1 pb-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-black font-mono tracking-widest"
                        style={{ color: "#008080" }}
                      >
                        {step.step}
                      </span>
                      <h3 className="font-heading font-bold text-white text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
