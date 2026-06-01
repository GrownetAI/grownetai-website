# Typography System

A single, strict, accessible type system for the whole app. **Inter** is the
only UI typeface; monospace is reserved for code.

## 1. Tokens (Tailwind config)

Defined in `tailwind.config.ts`:

- **Font families** — `font-sans` / `font-heading` / `font-display` all → Inter,
  `font-mono` → system monospace (code only).
- **Strict type scale** (`fontSize`, line-height + tracking baked in):

  | Token | Size | Line height |
  | ----- | ---- | ----------- |
  | `text-xs`   | 12px | 16px |
  | `text-sm`   | 14px | 20px |
  | `text-base` | 16px | 26px |
  | `text-lg`   | 18px | 28px |
  | `text-xl`   | 20px | 28px |
  | `text-2xl`  | 24px | 30px |
  | `text-3xl`  | 30px | 36px |
  | `text-4xl`  | 36px | 40px |

  > Do not use arbitrary sizes (`text-[15px]`). If a size is missing, it is
  > intentional — pick the nearest token.

- **Weights** — `400` (normal), `500` (medium), `600` (semibold), `700` (bold),
  plus `800` for marketing display only.
- **Line heights** — `leading-tight 1.15`, `leading-snug 1.3`,
  `leading-normal 1.5`, `leading-relaxed 1.65`.
- **Semantic text colors** (WCAG AA on white):
  `text-content` (#0B1F1F · 16.5:1), `text-content-secondary` (#41514E · 7.4:1),
  `text-muted` (#5C6B6B · 4.9:1), `text-disabled` (disabled states only).

## 2. Roles

| Role        | Variant     | Styling |
| ----------- | ----------- | ------- |
| Heading 1   | `h1`        | `text-3xl sm:text-4xl font-bold` |
| Heading 2   | `h2`        | `text-2xl sm:text-3xl font-semibold` |
| Heading 3   | `h3`        | `text-xl sm:text-2xl font-semibold` |
| Heading 4   | `h4`        | `text-lg sm:text-xl font-medium` |
| Body Large  | `body-lg`   | `text-lg` |
| Body        | `body`      | `text-base` |
| Body Small  | `body-sm`   | `text-sm` |
| Caption     | `caption`   | `text-xs text-muted` |
| Label       | `label`     | `text-sm font-medium` |
| Button      | `button`    | `text-sm font-semibold` |
| Overline    | `overline`  | `text-xs uppercase tracking-widest text-muted` |
| Code        | `code`      | `font-mono text-sm` |

Headings scale up at the `sm` breakpoint (mobile-first responsiveness).

## 3. Usage

Prefer the component (`components/ui/Typography.tsx`):

```tsx
import { Typography } from "@/components/ui/Typography";

<Typography variant="h1">Dashboard</Typography>
<Typography variant="body-sm" className="text-muted">Overview</Typography>
<Typography variant="label" as="label" htmlFor="email">Email</Typography>
<Typography variant="overline" as="th">Status</Typography>
```

For non-React / className-only contexts, use the mirrored utilities from
`styles/globals.css`: `.ty-h1`, `.ty-h2`, `.ty-body`, `.ty-caption`,
`.ty-label`, `.ty-overline`, etc.

A live reference of every role across Dashboard, Forms and Tables lives in
`components/examples/TypographyExamples.tsx`.

## 4. Rules (enforced by review)

- ❌ No arbitrary font sizes (`text-[15px]`).
- ❌ No inline `style={{ fontSize / fontWeight / lineHeight }}`.
- ❌ No more than the four UI weights (400/500/600/700).
- ✅ One role per piece of text; consistent heading hierarchy.
- ✅ Body copy uses `text-content`; secondary uses `text-muted`.
