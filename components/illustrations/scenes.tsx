/* ════════════════════════════════════════════════════════════════
   HERO ILLUSTRATION SET — flat vector, in-repo, zero dependencies

   Eleven scenes drawn from the paper/ink/moss tokens only. Five say
   what we do; six say what the client gets.

   Rules these follow, so they read as one set:
     · Flat fills only — the brand forbids gradients, so none here.
     · One accent (moss) carries meaning; lagoon/forest are structural.
     · Every scene is a 120×120 square that bleeds to its own edges,
       so the tile that holds it supplies the radius and the border.
     · Geometry over character art: these render at ~110px in the hero
       gutters, where a detailed figure turns to mush and a shape does
       not.
════════════════════════════════════════════════════════════════ */

const PAPER = "#FFFFFF";
const SAND = "#F3F1EA";
const MOSS_50 = "#F0F8F5";
const MOSS_100 = "#DDF0E8";
const MOSS_200 = "#B6E0D1";
const MOSS_300 = "#5FC7A7";
const MOSS_400 = "#1CA88C";
const MOSS_600 = "#0C6B58";
const FOREST = "#0E2A24";
const HAIRLINE = "#E7E2D8";
const HAIRLINE_STRONG = "#D8D2C4";
const LAGOON = "#009AA8";

type SceneProps = { className?: string };

/* A 5-point star, sized and centred in the 120-box. */
function Star({
  x,
  y,
  size,
  fill,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
}) {
  return (
    <path
      d="M12 2 L14.7 9.1 L22 9.5 L16.3 14.1 L18.2 21.3 L12 17.2 L5.8 21.3 L7.7 14.1 L2 9.5 L9.3 9.1 Z"
      fill={fill}
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
    />
  );
}

function Frame({
  className,
  children,
}: SceneProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="presentation"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* ── SERVICES ─────────────────────────────────────────────────── */

/* AI Automation — one brain node firing work out to its satellites. */
export function ArtAiAutomation({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <path
        d="M60 60 L30 34 M60 60 L92 40 M60 60 L34 90 M60 60 L90 88"
        stroke={MOSS_200}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="30" cy="34" r="7" fill={MOSS_300} />
      <circle cx="92" cy="40" r="6" fill={LAGOON} />
      <circle cx="34" cy="90" r="6" fill={MOSS_600} />
      <circle cx="90" cy="88" r="7" fill={MOSS_300} />
      <rect x="42" y="42" width="36" height="36" rx="11" fill={MOSS_400} />
      <path
        d="M60 49 L63.2 56.8 L71 60 L63.2 63.2 L60 71 L56.8 63.2 L49 60 L56.8 56.8 Z"
        fill={PAPER}
      />
    </Frame>
  );
}

/* SaaS Development — the product itself: a window with a shipped button. */
export function ArtSaas({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <rect
        x="18"
        y="26"
        width="84"
        height="68"
        rx="10"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <path d="M19 42 H101" stroke={HAIRLINE} strokeWidth="2" />
      <circle cx="28" cy="34" r="2.5" fill={HAIRLINE_STRONG} />
      <circle cx="37" cy="34" r="2.5" fill={HAIRLINE_STRONG} />
      <circle cx="46" cy="34" r="2.5" fill={MOSS_400} />
      <rect x="26" y="50" width="18" height="36" rx="4" fill={MOSS_100} />
      <rect x="52" y="52" width="42" height="5" rx="2.5" fill={HAIRLINE_STRONG} />
      <rect x="52" y="63" width="30" height="5" rx="2.5" fill={HAIRLINE} />
      <rect x="52" y="76" width="28" height="10" rx="5" fill={MOSS_400} />
    </Frame>
  );
}

/* E-commerce — a bag that has already converted. */
export function ArtEcommerce({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect
        x="22"
        y="26"
        width="42"
        height="32"
        rx="7"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <rect x="30" y="36" width="22" height="4" rx="2" fill={HAIRLINE_STRONG} />
      <rect x="30" y="45" width="13" height="4" rx="2" fill={MOSS_200} />
      <path
        d="M56 56 V50 a10 10 0 0 1 20 0 V56"
        fill="none"
        stroke={FOREST}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="42" y="56" width="48" height="42" rx="9" fill={MOSS_400} />
      <path
        d="M55 76 l7 7 13 -14"
        fill="none"
        stroke={PAPER}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/* Digital Marketing — reach, leaving the building. */
export function ArtMarketing({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <path
        d="M84 46 a16 16 0 0 1 0 28"
        fill="none"
        stroke={MOSS_200}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M93 34 a30 30 0 0 1 0 52"
        fill="none"
        stroke={MOSS_200}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path d="M32 50 L76 33 V87 L32 70 Z" fill={MOSS_400} />
      <rect x="17" y="49" width="16" height="22" rx="5" fill={FOREST} />
      <path
        d="M42 74 L48 96"
        stroke={FOREST}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/* Social Media — the post, and the love it earns. */
export function ArtSocial({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect
        x="26"
        y="26"
        width="54"
        height="52"
        rx="10"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
        transform="rotate(-8 53 52)"
      />
      <rect
        x="34"
        y="42"
        width="56"
        height="52"
        rx="10"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <rect x="42" y="50" width="40" height="20" rx="5" fill={MOSS_100} />
      <rect x="42" y="76" width="30" height="4.5" rx="2.25" fill={HAIRLINE_STRONG} />
      <rect x="42" y="85" width="18" height="4.5" rx="2.25" fill={HAIRLINE} />
      <g transform="translate(88 32)">
        <circle r="15" fill={MOSS_50} />
        <path
          d="M0 7 C-9 0 -10 -8 -4.5 -10 C-1.5 -11 0 -8.5 0 -8.5 C0 -8.5 1.5 -11 4.5 -10 C10 -8 9 0 0 7 Z"
          fill={MOSS_400}
        />
      </g>
    </Frame>
  );
}

/* ── OUTCOMES ─────────────────────────────────────────────────── */

/* Happy clients. */
export function ArtHappyClients({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <circle cx="58" cy="56" r="30" fill={MOSS_100} />
      <circle cx="48" cy="50" r="3.5" fill={FOREST} />
      <circle cx="68" cy="50" r="3.5" fill={FOREST} />
      <path
        d="M45 62 Q58 76 71 62"
        fill="none"
        stroke={FOREST}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="90" cy="86" r="15" fill={MOSS_400} stroke={SAND} strokeWidth="3" />
      <path
        d="M84 86 l4.5 4.5 8.5 -9.5"
        fill="none"
        stroke={PAPER}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/* Business growth — the only chart in the set, so it stays the growth one. */
export function ArtGrowth({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect
        x="18"
        y="24"
        width="84"
        height="72"
        rx="11"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <path d="M30 86 H90" stroke={HAIRLINE} strokeWidth="2" strokeLinecap="round" />
      <rect x="32" y="70" width="11" height="16" rx="3" fill={MOSS_200} />
      <rect x="48" y="60" width="11" height="26" rx="3" fill={MOSS_300} />
      <rect x="64" y="50" width="11" height="36" rx="3" fill={MOSS_400} />
      <rect x="80" y="38" width="11" height="48" rx="3" fill={MOSS_600} />
      <circle cx="98" cy="88" r="14" fill={MOSS_400} stroke={MOSS_50} strokeWidth="3" />
      <path
        d="M98 94 V82 M92.5 87.5 L98 82 L103.5 87.5"
        fill="none"
        stroke={PAPER}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/* Collaboration — two people, one conversation. */
export function ArtCollaboration({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <path
        d="M40 42 Q60 24 80 42"
        fill="none"
        stroke={MOSS_200}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="40" cy="58" r="11" fill={MOSS_400} />
      <path d="M22 92 a18 18 0 0 1 36 0 z" fill={MOSS_400} />
      <circle cx="80" cy="58" r="11" fill={LAGOON} />
      <path d="M62 92 a18 18 0 0 1 36 0 z" fill={LAGOON} />
    </Frame>
  );
}

/* Successful partnerships — genuinely interlocked, not merely overlapping. */
export function ArtPartnership({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <defs>
        <clipPath id="gna-link-over">
          <rect x="52" y="26" width="20" height="34" />
        </clipPath>
      </defs>
      <rect width="120" height="120" fill={MOSS_50} />
      <circle cx="50" cy="60" r="23" fill="none" stroke={MOSS_400} strokeWidth="9" />
      <circle cx="74" cy="60" r="23" fill="none" stroke={FOREST} strokeWidth="9" />
      {/* redraw the first ring where it should pass *over* the second */}
      <circle
        cx="50"
        cy="60"
        r="23"
        fill="none"
        stroke={MOSS_400}
        strokeWidth="9"
        clipPath="url(#gna-link-over)"
      />
    </Frame>
  );
}

/* Positive results. */
export function ArtResults({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <path
        d="M40 32 H30 a11 11 0 0 0 11 16"
        fill="none"
        stroke={MOSS_600}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M80 32 H90 a11 11 0 0 1 -11 16"
        fill="none"
        stroke={MOSS_600}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M40 26 H80 V52 a20 20 0 0 1 -40 0 Z" fill={MOSS_400} />
      <Star x={60} y={42} size={18} fill={PAPER} />
      <rect x="55" y="72" width="10" height="12" fill={FOREST} />
      <rect x="41" y="84" width="38" height="9" rx="4.5" fill={FOREST} />
    </Frame>
  );
}

/* Customer satisfaction. */
export function ArtSatisfaction({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect
        x="14"
        y="38"
        width="92"
        height="44"
        rx="12"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      {[26, 43, 60, 77, 94].map((x) => (
        <Star key={x} x={x} y={56} size={14} fill={MOSS_400} />
      ))}
      <rect x="32" y="68" width="56" height="5" rx="2.5" fill={MOSS_100} />
      <rect x="32" y="68" width="43" height="5" rx="2.5" fill={MOSS_400} />
    </Frame>
  );
}

/* ── SERVICE-ONLY SCENES ──────────────────────────────────────────
   Four more in the same language, so every service chip has a scene
   and nothing has to fall back to a photograph. The other four chips
   reuse the hero scenes above. ─────────────────────────────────── */

/* Apps — a phone, distinct from the SaaS browser window. */
export function ArtApps({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <rect
        x="36"
        y="16"
        width="48"
        height="88"
        rx="12"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <rect x="52" y="22" width="16" height="3" rx="1.5" fill={HAIRLINE_STRONG} />
      <rect x="43" y="32" width="34" height="20" rx="5" fill={MOSS_100} />
      {/* app grid */}
      <rect x="43" y="58" width="14" height="14" rx="4" fill={MOSS_400} />
      <rect x="63" y="58" width="14" height="14" rx="4" fill={MOSS_200} />
      <rect x="43" y="76" width="14" height="14" rx="4" fill={LAGOON} />
      <rect x="63" y="76" width="14" height="14" rx="4" fill={MOSS_300} />
      <circle cx="60" cy="98" r="3" fill={HAIRLINE_STRONG} />
    </Frame>
  );
}

/* SEO — a magnifier over a rising rank. */
export function ArtSeo({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect
        x="16"
        y="22"
        width="88"
        height="62"
        rx="10"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <rect x="26" y="64" width="12" height="12" rx="3" fill={MOSS_200} />
      <rect x="42" y="54" width="12" height="22" rx="3" fill={MOSS_300} />
      <rect x="58" y="42" width="12" height="34" rx="3" fill={MOSS_400} />
      <rect x="26" y="32" width="30" height="5" rx="2.5" fill={HAIRLINE_STRONG} />
      {/* magnifier */}
      <circle
        cx="80"
        cy="62"
        r="17"
        fill={PAPER}
        stroke={FOREST}
        strokeWidth="5"
      />
      <path
        d="M92 74 L104 88"
        stroke={FOREST}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M72 64 l5 5 11 -12"
        fill="none"
        stroke={MOSS_400}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/* AI Automation — a workflow that runs itself. */
export function ArtAutomation({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      {/* the loop the work travels around */}
      <path
        d="M34 42 H74 a14 14 0 0 1 0 28 H46 a14 14 0 0 0 0 28 h40"
        fill="none"
        stroke={MOSS_200}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
      <rect x="18" y="30" width="30" height="24" rx="7" fill={MOSS_400} />
      <rect x="24" y="39" width="18" height="3" rx="1.5" fill={PAPER} />
      <rect x="24" y="45" width="11" height="3" rx="1.5" fill={PAPER} />
      <rect x="70" y="56" width="30" height="24" rx="7" fill={LAGOON} />
      <rect x="76" y="65" width="18" height="3" rx="1.5" fill={PAPER} />
      <circle cx="90" cy="98" r="13" fill={FOREST} />
      <path
        d="M84 98 l4.5 4.5 8.5 -9.5"
        fill="none"
        stroke={PAPER}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/* Custom model training — a chip being taught. */
export function ArtModels({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      {/* pins */}
      {[34, 50, 66, 82].map((x) => (
        <rect key={`t${x}`} x={x - 2} y="22" width="4" height="12" rx="2" fill={HAIRLINE_STRONG} />
      ))}
      {[34, 50, 66, 82].map((x) => (
        <rect key={`b${x}`} x={x - 2} y="86" width="4" height="12" rx="2" fill={HAIRLINE_STRONG} />
      ))}
      {[34, 50, 66, 82].map((y) => (
        <rect key={`l${y}`} x="22" y={y - 2} width="12" height="4" rx="2" fill={HAIRLINE_STRONG} />
      ))}
      {[34, 50, 66, 82].map((y) => (
        <rect key={`r${y}`} x="86" y={y - 2} width="12" height="4" rx="2" fill={HAIRLINE_STRONG} />
      ))}
      <rect x="30" y="30" width="60" height="60" rx="12" fill={FOREST} />
      {/* the little neural net inside */}
      <circle cx="46" cy="46" r="4" fill={MOSS_300} />
      <circle cx="46" cy="74" r="4" fill={MOSS_300} />
      <circle cx="60" cy="60" r="5" fill={MOSS_400} />
      <circle cx="74" cy="46" r="4" fill={LAGOON} />
      <circle cx="74" cy="74" r="4" fill={LAGOON} />
      <path
        d="M46 46 L60 60 L74 46 M46 74 L60 60 L74 74"
        fill="none"
        stroke={MOSS_200}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Frame>
  );
}

/* Social optimization — the profile itself, tuned. */
export function ArtSmo({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect
        x="18"
        y="24"
        width="84"
        height="72"
        rx="11"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <circle cx="40" cy="46" r="11" fill={MOSS_400} />
      <path d="M29 66 a11 11 0 0 1 22 0 z" fill={MOSS_400} />
      <rect x="58" y="38" width="34" height="5" rx="2.5" fill={HAIRLINE_STRONG} />
      <rect x="58" y="48" width="22" height="5" rx="2.5" fill={HAIRLINE} />
      <rect x="58" y="60" width="26" height="10" rx="5" fill={MOSS_100} />
      {/* engagement climbing */}
      <path
        d="M30 86 L46 78 L60 82 L78 70 L92 74"
        fill="none"
        stroke={LAGOON}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="92" cy="74" r="4" fill={LAGOON} />
    </Frame>
  );
}

/* LLM integration — the model, talking back. */
export function ArtLlm({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      {/* incoming */}
      <path
        d="M20 32 h44 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-32 l-12 10 v-10 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 z"
        fill={PAPER}
        stroke={HAIRLINE}
        strokeWidth="2"
      />
      <rect x="28" y="42" width="30" height="4" rx="2" fill={HAIRLINE_STRONG} />
      <rect x="28" y="50" width="18" height="4" rx="2" fill={HAIRLINE} />
      {/* the model's reply */}
      <path
        d="M56 70 h44 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-44 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 z"
        fill={MOSS_400}
      />
      <rect x="64" y="80" width="30" height="4" rx="2" fill={PAPER} opacity="0.9" />
      <rect x="64" y="88" width="20" height="4" rx="2" fill={PAPER} opacity="0.6" />
      <path
        d="M60 24 L62.6 30.4 L69 33 L62.6 35.6 L60 42 L57.4 35.6 L51 33 L57.4 30.4 Z"
        fill={LAGOON}
      />
    </Frame>
  );
}

/* ── The two sets, in the order they hang in the hero ──────────── */

export const SERVICE_ART = [
  { key: "ai-automation", Art: ArtAiAutomation },
  { key: "saas", Art: ArtSaas },
  { key: "ecommerce", Art: ArtEcommerce },
  { key: "marketing", Art: ArtMarketing },
  { key: "social", Art: ArtSocial },
] as const;

export const OUTCOME_ART = [
  { key: "happy-clients", Art: ArtHappyClients },
  { key: "growth", Art: ArtGrowth },
  { key: "collaboration", Art: ArtCollaboration },
  { key: "partnership", Art: ArtPartnership },
  { key: "results", Art: ArtResults },
  { key: "satisfaction", Art: ArtSatisfaction },
] as const;

/* ── BUILD-PROCESS SCENES ──────────────────────────────────────────
   Nine stages for the "How We Build Your Brand" section. Same 120-box,
   flat-fill, moss-accent language as everything above. */

/* 1 — Brand Discovery: a magnifier over the business. */
export function ArtDiscovery({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <circle cx="52" cy="52" r="26" fill={PAPER} stroke={HAIRLINE} strokeWidth="2" />
      {/* the three things we study, as stacked signals */}
      <rect x="40" y="44" width="24" height="4" rx="2" fill={MOSS_400} />
      <rect x="40" y="53" width="18" height="4" rx="2" fill={MOSS_200} />
      <rect x="40" y="62" width="12" height="4" rx="2" fill={HAIRLINE_STRONG} />
      <circle cx="52" cy="52" r="26" fill="none" stroke={MOSS_600} strokeWidth="4" />
      <path d="M72 72 L92 92" stroke={FOREST} strokeWidth="6" strokeLinecap="round" />
      <circle cx="98" cy="30" r="6" fill={LAGOON} />
    </Frame>
  );
}

/* 2 — Brand Identity: swatch + type + mark. */
export function ArtIdentity({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      {/* colour swatches */}
      <rect x="18" y="24" width="34" height="34" rx="8" fill={MOSS_400} />
      <rect x="18" y="64" width="16" height="16" rx="5" fill={FOREST} />
      <rect x="36" y="64" width="16" height="16" rx="5" fill={LAGOON} />
      {/* the "A" mark */}
      <rect x="62" y="24" width="40" height="56" rx="10" fill={PAPER} stroke={HAIRLINE} strokeWidth="2" />
      <path d="M74 68 L82 38 L90 68 M77 58 H87" stroke={MOSS_600} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* type baseline */}
      <rect x="18" y="90" width="84" height="5" rx="2.5" fill={HAIRLINE_STRONG} />
      <rect x="18" y="99" width="52" height="5" rx="2.5" fill={MOSS_200} />
    </Frame>
  );
}

/* 3 — Brand Protection: a shield locking the assets in. */
export function ArtProtection({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <path
        d="M60 20 L92 32 V60 C92 82 78 96 60 102 C42 96 28 82 28 60 V32 Z"
        fill={MOSS_400}
      />
      <path
        d="M60 30 L82 38 V60 C82 76 72 87 60 92 C48 87 38 76 38 60 V38 Z"
        fill={MOSS_50}
      />
      {/* padlock = ownership */}
      <path d="M52 58 V52 a8 8 0 0 1 16 0 V58" fill="none" stroke={FOREST} strokeWidth="4" strokeLinecap="round" />
      <rect x="48" y="58" width="24" height="20" rx="5" fill={FOREST} />
      <circle cx="60" cy="66" r="2.5" fill={MOSS_300} />
      <path d="M60 68 v5" stroke={MOSS_300} strokeWidth="3" strokeLinecap="round" />
    </Frame>
  );
}

/* 4 — Strategy Planning: a roadmap with milestones. */
export function ArtStrategy({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <path
        d="M24 92 C40 92 40 60 56 60 C72 60 72 36 92 30"
        fill="none"
        stroke={MOSS_200}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 7"
      />
      <circle cx="24" cy="92" r="7" fill={HAIRLINE_STRONG} />
      <circle cx="56" cy="60" r="8" fill={MOSS_400} />
      <path d="M53 60 l2.5 2.5 4.5 -5" stroke={PAPER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* the destination flag */}
      <path d="M90 30 v-14" stroke={FOREST} strokeWidth="4" strokeLinecap="round" />
      <path d="M90 16 L106 21 L90 26 Z" fill={FOREST} />
      <circle cx="90" cy="30" r="6" fill={LAGOON} />
    </Frame>
  );
}

/* 5 — UI/UX Design: a frame with a hand-off to a component. */
export function ArtDesign({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      {/* wireframe canvas */}
      <rect x="16" y="22" width="60" height="76" rx="10" fill={PAPER} stroke={HAIRLINE} strokeWidth="2" />
      <rect x="26" y="32" width="40" height="14" rx="4" fill={MOSS_100} />
      <rect x="26" y="52" width="28" height="5" rx="2.5" fill={HAIRLINE_STRONG} />
      <rect x="26" y="62" width="40" height="5" rx="2.5" fill={HAIRLINE} />
      <rect x="26" y="78" width="26" height="10" rx="5" fill={MOSS_400} />
      {/* the polished component lifting off */}
      <rect x="66" y="58" width="40" height="40" rx="11" fill={MOSS_400} />
      <rect x="74" y="68" width="24" height="5" rx="2.5" fill={PAPER} />
      <rect x="74" y="78" width="16" height="5" rx="2.5" fill={MOSS_100} />
      <rect x="74" y="88" width="12" height="4" rx="2" fill={MOSS_200} />
      {/* cursor */}
      <path d="M60 44 l0 16 l4.5 -4 l3 6 l3 -1.5 l-3 -6 l6 0 Z" fill={FOREST} />
    </Frame>
  );
}

/* 6 — Development: a code window being built. */
export function ArtDevelopment({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      <rect x="16" y="24" width="88" height="72" rx="11" fill={FOREST} />
      <path d="M17 40 H103" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <circle cx="26" cy="32" r="2.5" fill={MOSS_300} />
      <circle cx="35" cy="32" r="2.5" fill="rgba(255,255,255,0.2)" />
      {/* the two tags = "we build with the right stack" */}
      <path d="M44 56 l-9 8 l9 8" fill="none" stroke={MOSS_300} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M76 56 l9 8 l-9 8" fill="none" stroke={LAGOON} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M64 50 l-8 28" stroke={MOSS_200} strokeWidth="4" strokeLinecap="round" />
    </Frame>
  );
}

/* 7 — Social Presence: the profile radiating across channels. */
export function ArtPresence({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      <circle cx="60" cy="60" r="18" fill={MOSS_400} />
      <path d="M60 54 a6 6 0 1 1 0 0.01 M50 74 a10 10 0 0 1 20 0" fill={PAPER} />
      {/* four channels on orbit */}
      {[[60, 18], [102, 60], [60, 102], [18, 60]].map(([cx, cy], i) => (
        <g key={i}>
          <path d={`M60 60 L${cx} ${cy}`} stroke={MOSS_200} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="9" fill={i % 2 ? LAGOON : MOSS_600} />
        </g>
      ))}
    </Frame>
  );
}

/* 8 — Marketing & Growth: a rising campaign with a target. */
export function ArtGrowthLaunch({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      {/* rising bars */}
      <rect x="20" y="72" width="12" height="24" rx="3" fill={MOSS_200} />
      <rect x="38" y="58" width="12" height="38" rx="3" fill={MOSS_300} />
      <rect x="56" y="42" width="12" height="54" rx="3" fill={MOSS_400} />
      {/* the arrow of growth */}
      <path d="M24 66 L44 50 L62 34 L84 22" fill="none" stroke={FOREST} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 22 H86 V36" fill="none" stroke={FOREST} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* the target it lands on */}
      <circle cx="90" cy="78" r="16" fill="none" stroke={LAGOON} strokeWidth="4" />
      <circle cx="90" cy="78" r="6" fill={LAGOON} />
    </Frame>
  );
}

/* 9 — AI Automation: the future-ready close. A chip with orbiting sparks. */
export function ArtFutureReady({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={SAND} />
      {/* pins */}
      {[38, 54, 70, 82].map((x) => (
        <rect key={`t${x}`} x={x - 2} y="26" width="4" height="10" rx="2" fill={HAIRLINE_STRONG} />
      ))}
      {[38, 54, 70, 82].map((x) => (
        <rect key={`b${x}`} x={x - 2} y="84" width="4" height="10" rx="2" fill={HAIRLINE_STRONG} />
      ))}
      <rect x="34" y="34" width="52" height="52" rx="13" fill={MOSS_400} />
      <path
        d="M60 44 L64 56 L76 60 L64 64 L60 76 L56 64 L44 60 L56 56 Z"
        fill={PAPER}
      />
      {/* forward-looking sparks */}
      <circle cx="96" cy="30" r="4" fill={LAGOON} />
      <circle cx="104" cy="46" r="3" fill={MOSS_300} />
      <circle cx="22" cy="90" r="4" fill={MOSS_600} />
    </Frame>
  );
}

/* Logo & Graphic Design — a brand mark on a swatch, distinct from ArtIdentity
   (which is the process step): here the mark is the hero. */
export function ArtBranding({ className }: SceneProps) {
  return (
    <Frame className={className}>
      <rect width="120" height="120" fill={MOSS_50} />
      {/* the mark */}
      <circle cx="60" cy="48" r="26" fill={MOSS_400} />
      <path
        d="M60 34 a14 14 0 1 0 0.01 0 M48 62 a12 12 0 0 1 24 0"
        fill={PAPER}
      />
      {/* wordmark baseline */}
      <rect x="34" y="84" width="52" height="7" rx="3.5" fill={FOREST} />
      {/* colour swatches */}
      <circle cx="30" cy="100" r="7" fill={MOSS_600} />
      <circle cx="48" cy="100" r="7" fill={MOSS_300} />
      <circle cx="66" cy="100" r="7" fill={LAGOON} />
      <circle cx="84" cy="100" r="7" fill={HAIRLINE_STRONG} />
    </Frame>
  );
}

/* Ordered set for the BuildProcess section. */
export const BUILD_PROCESS_ART = [
  ArtDiscovery,
  ArtIdentity,
  ArtProtection,
  ArtStrategy,
  ArtDesign,
  ArtDevelopment,
  ArtPresence,
  ArtGrowthLaunch,
  ArtFutureReady,
] as const;

/* ── Service id → scene ────────────────────────────────────────────
   Keyed by the ids in lib/constants.ts SERVICES *and* lib/pricing-data.ts
   SERVICES — the two arrays share ids, which is what lets a chip filter
   packages. All ten are covered, so no service is unreachable and nothing
   falls back to a missing image. */
export const SERVICE_SCENES: Record<
  string,
  (p: { className?: string }) => React.ReactElement
> = {
  "web-dev": ArtSaas,
  "app-dev": ArtApps,
  seo: ArtSeo,
  ads: ArtMarketing,
  smm: ArtSocial,
  smo: ArtSmo,
  "ai-agents": ArtAiAutomation,
  llm: ArtLlm,
  "ai-automation": ArtAutomation,
  "model-training": ArtModels,
  // Umbrella AI + design — the two new WhatWeDo chips.
  ai: ArtFutureReady,
  design: ArtBranding,
};
