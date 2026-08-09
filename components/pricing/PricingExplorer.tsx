"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";
import {
  BUNDLES,
  DELIVERY,
  PRICE_CEILING,
  bundlePrice,
  type Bundle,
  type BundleCategory,
  type Term,
} from "@/lib/bundles";
import {
  COUNTRIES,
  formatMoney,
  type Country,
  type CountryCode,
} from "@/lib/pricing-data";
import { cn } from "@/lib/utils";

const TERMS: { value: Term; label: string; hint: string }[] = [
  { value: 6, label: "6 months", hint: "" },
  { value: 12, label: "12 months", hint: "save more" },
];

const GROUPS: { key: BundleCategory; label: string; blurb: string }[] = [
  {
    key: "no-code",
    label: "No-code builds",
    blurb: "Proven platforms, live fastest, easiest for you to edit yourself.",
  },
  {
    key: "code",
    label: "Custom builds",
    blurb: "Hand-built on a modern stack when a platform would hold you back.",
  },
  {
    key: "marketing",
    label: "Digital Marketing",
    blurb:
      "Already have a site? Retainer-only plans — no build cost, just the work that brings traffic and leads.",
  },
  {
    key: "automation",
    label: "Automation",
    blurb:
      "One-time builds that take repetitive work off your team, from simple workflows to a custom AI agent.",
  },
];

export default function PricingExplorer() {
  // India first: the primary market, and the currency every range was
  // originally authored in.
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [term, setTerm] = useState<Term>(12);

  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  return (
    <>
      {/* ── Controls ── */}
      <div className="container-site">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
          <div className="w-full">
            <p className="mb-3 text-center text-caption">Show prices in</p>
            {/* Scrollable rather than wrapping, so eight options stay on one
                line down to narrow phones. */}
            <div
              role="group"
              aria-label="Select currency"
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
            >
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCountryCode(c.code)}
                  aria-pressed={c.code === countryCode}
                  className={cn(
                    "flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    c.code === countryCode
                      ? "border-ink bg-ink text-paper"
                      : "border-hairline bg-paper-raised text-ink-body hover:border-ink hover:text-ink",
                  )}
                >
                  <span aria-hidden>{c.flag}</span>
                  {c.currency}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-center text-caption">Commitment</p>
            <div
              role="group"
              aria-label="Select commitment length"
              className="flex justify-center gap-2"
            >
              {TERMS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTerm(t.value)}
                  aria-pressed={t.value === term}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                    t.value === term
                      ? "border-ink bg-ink text-paper"
                      : "border-hairline bg-paper-raised text-ink-body hover:border-ink hover:text-ink",
                  )}
                >
                  {t.label}
                  {t.hint && (
                    <span
                      className={cn(
                        "text-xs font-medium",
                        t.value === term ? "text-paper/70" : "text-moss-600",
                      )}
                    >
                      {t.hint}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Packages ── */}
      {GROUPS.map((group, gi) => {
        const bundles = BUNDLES.filter((b) => b.category === group.key);
        return (
          <section
            key={group.key}
            id={group.key}
            className={cn(
              "section-padding-sm scroll-mt-24",
              gi % 2 === 1 ? "bg-sand" : "bg-paper",
            )}
          >
            <div className="container-site">
              <div className="mx-auto mb-10 max-w-2xl text-start md:text-center">
                <span className="section-label">
                  {DELIVERY[group.key].icon} {DELIVERY[group.key].label}
                </span>
                <h2 className="display-lg mt-4">{group.label}</h2>
                <p className="mt-3 text-body">{group.blurb}</p>
              </div>

              {/* Groups with fewer cards than columns would otherwise sit
                  left-aligned against dead space, so cap the track count at
                  the number of cards and centre the whole grid. */}
              <div
                className={cn(
                  "mx-auto grid gap-5 sm:grid-cols-2",
                  bundles.length >= 3 ? "lg:grid-cols-3" : "lg:max-w-4xl",
                )}
              >
                {bundles.map((bundle) => (
                  <BundleCard
                    key={bundle.id}
                    bundle={bundle}
                    country={country}
                    term={term}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

/**
 * One figure, or a quote CTA when it exceeds PRICE_CEILING.
 * `list` is the à la carte equivalent, struck through to show the saving.
 */
function Figure({
  country,
  amount,
  list,
  caption,
  prefix,
}: {
  country: Country;
  amount: number;
  list: number;
  caption: string;
  prefix?: string;
}) {
  if (amount > PRICE_CEILING) {
    return (
      <div>
        <p className="font-display text-xl font-bold leading-tight text-ink">
          Get a quote
        </p>
        <p className="mt-1 text-caption">{caption} — priced to scope</p>
      </div>
    );
  }

  const saves = list > amount;
  return (
    <div>
      <p className="font-display text-xl font-bold leading-tight text-ink">
        {prefix}
        {formatMoney(country, amount)}
      </p>
      <p className="mt-1 text-caption">
        {caption}
        {saves && (
          <>
            {" · "}
            <span className="text-ink-faint line-through">
              {formatMoney(country, list)}
            </span>{" "}
            <span className="font-semibold text-moss-600">
              −{Math.round((1 - amount / list) * 100)}%
            </span>
          </>
        )}
      </p>
    </div>
  );
}

function BundleCard({
  bundle,
  country,
  term,
}: {
  bundle: Bundle;
  country: Country;
  term: Term;
}) {
  const price = bundlePrice(bundle.id, country.code, term);

  return (
    <article
      className={cn("card flex flex-col p-6", bundle.popular && "pricing-popular")}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="eyebrow">{bundle.name}</span>
        {bundle.popular && <span className="badge badge-green">Popular</span>}
      </div>

      <p className="mt-2 text-sm leading-relaxed text-ink-body">
        {bundle.tagline}
      </p>

      {/* Marketing packages carry no build and automation carries no retainer,
          so each figure only renders when that side actually has ingredients —
          otherwise the card would advertise a confident "0". */}
      <div className="mt-5 space-y-3 border-y border-hairline py-5">
        {bundle.build.length > 0 && (
          <Figure
            country={country}
            amount={price.build}
            list={price.listBuild}
            caption="one-time build"
          />
        )}
        {bundle.monthly.length > 0 && (
          <Figure
            country={country}
            amount={price.perMonth}
            list={price.listPerMonth}
            caption={`per month · ${term}-month term`}
            prefix={bundle.build.length > 0 ? "+ " : undefined}
          />
        )}
        {bundle.monthly.length === 0 && (
          <p className="text-caption">One-time project · no monthly retainer</p>
        )}
        {bundle.build.length === 0 && (
          <p className="text-caption">No build cost · cancel after the term</p>
        )}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        What&rsquo;s included
      </p>
      <ul className="mt-2 space-y-2">
        {bundle.includes.map((f) => (
          <li key={f} className="flex gap-2 text-sm text-ink-body">
            <Check
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-moss-600"
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Strengths
      </p>
      <ul className="mt-2 space-y-1.5">
        {bundle.pros.map((p) => (
          <li key={p} className="flex gap-2 text-sm text-ink-body">
            <Check
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-moss-600"
              aria-hidden
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Trade-offs
      </p>
      <ul className="mt-2 flex-1 space-y-1.5">
        {bundle.cons.map((c) => (
          <li key={c} className="flex gap-2 text-sm text-ink-muted">
            <Minus
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-ink-faint"
              aria-hidden
            />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={cn(
          "btn mt-6 w-full",
          bundle.popular ? "btn-primary" : "btn-outline",
        )}
      >
        Get a quote <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
