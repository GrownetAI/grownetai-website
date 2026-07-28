"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CommandBar from "./CommandBar";
import ServiceRail from "./ServiceRail";
import ResultsGrid from "./ResultsGrid";
import { BUSINESS_TYPES, type TabId } from "./data";

/* ════════════════════════════════════════════════════════════════
   WHAT WE DO

   Replaces the old link strip. Three rows, following the reference:
   a command bar, a category rail, and a grid that answers them.

   The point is that this is not a menu — it is the first move of a
   consultation. You say what you need, you narrow by service, and the
   page shows you the work, the proof, and the price for exactly that.

   State lives here because all three rows read it: the rail filters the
   grid, and the bar's tabs decide what the grid is made of.
════════════════════════════════════════════════════════════════ */

export default function WhatWeDo() {
  const [tab, setTab] = useState<TabId>("projects");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [requirement, setRequirement] = useState("");

  return (
    <section className="section-padding-sm bg-paper">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">What we do</span>
          <h2 className="heading-section mt-3">
            Tell us what you need, We&rsquo;ll recommend the rest
          </h2>
        </motion.div>

        <div className="mt-8">
          <CommandBar
            tab={tab}
            onTabChange={setTab}
            businessType={businessType}
            onBusinessTypeChange={setBusinessType}
            requirement={requirement}
            onRequirementChange={setRequirement}
          />
        </div>

        <div className="mt-4">
          <ServiceRail serviceId={serviceId} onSelect={setServiceId} />
        </div>

        <div className="mt-8">
          <ResultsGrid tab={tab} serviceId={serviceId} />
        </div>
      </div>
    </section>
  );
}
