"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + total) % total);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => go(1), 3500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  // Show 3 cards at a time (current, current+1, current+2)
  const visible = [0, 1, 2].map((offset) => ({
    data: TESTIMONIALS[(current + offset) % total],
    offset,
  }));

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 340 : -340, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -340 : 340, opacity: 0 }),
  };

  return (
    <section className="section-padding bg-brand-cloud-white overflow-hidden">
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Client Results</span>
          <h2 className="heading-section mt-2">
            Real Results, <span className="text-gradient">Real Businesses</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visible.map(({ data: t, offset }) => (
                <motion.div
                  key={`${t.id}-${current}-${offset}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 280, damping: 28 },
                    opacity: { duration: 0.2 },
                    delay: offset * 0.06,
                  }}
                  className="card card-hover h-full p-6 flex flex-col gap-4"
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-brand-slate-gray text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge-teal text-xs">{t.service}</span>
                    <span className="badge-green text-xs">{t.result}</span>
                  </div>

                  {/* Author */}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border-2 border-brand-teal/30 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 99,
                    background:
                      i === current ? "#008080" : "rgba(0, 128, 128,0.25)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full border-2 border-brand-teal/30 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
// import { Star } from "lucide-react";
// import { TESTIMONIALS } from "@/lib/constants";
// import { getInitials } from "@/lib/utils";
// import FadeIn from "@/components/animations/FadeIn";

// export default function TestimonialsSection() {
//   return (
//     <section className="section-padding bg-brand-cloud-white">
//       <div className="container-site">
//         <div className="text-center mb-14">
//           <span className="section-label">Client Results</span>
//           <h2 className="heading-section mt-2">
//             Real Results, <span className="text-gradient">Real Businesses</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {TESTIMONIALS.map((t, i) => (
//             <FadeIn key={t.id} delay={i * 0.07}>
//               <div className="card card-hover h-full p-6 flex flex-col gap-4">
//                 <div className="flex gap-1">
//                   {Array.from({ length: t.rating }).map((_, idx) => (
//                     <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-brand-slate-gray text-sm leading-relaxed flex-1 italic">
//                   &ldquo;{t.text}&rdquo;
//                 </p>
//                 <div className="flex gap-2 flex-wrap">
//                   <span className="badge-teal text-xs">{t.service}</span>
//                   <span className="badge-green text-xs">{t.result}</span>
//                 </div>
//                 <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
//                   <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm font-heading flex-shrink-0">
//                     {getInitials(t.name)}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-brand-charcoal text-sm font-heading">
//                       {t.name}
//                     </p>
//                     <p className="text-xs text-brand-slate-gray">{t.role}</p>
//                   </div>
//                 </div>
//               </div>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
