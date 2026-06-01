import { Typography } from "@/components/ui/Typography";

/**
 * Live reference for the typography system across the three core SaaS surfaces:
 * Dashboard, Forms and Tables. Every role uses the <Typography> component (or a
 * `.ty-*` utility) — no arbitrary sizes, no inline font styles.
 *
 * This file is documentation-by-example; import it into a route to preview.
 */
export default function TypographyExamples() {
  return (
    <div className="container-site py-16 space-y-16">
      {/* ── Scale reference ───────────────────────────────── */}
      <section className="space-y-3">
        <Typography variant="overline">Type scale</Typography>
        <Typography variant="h1">Heading 1 — the page title</Typography>
        <Typography variant="h2">Heading 2 — a major section</Typography>
        <Typography variant="h3">Heading 3 — a card or group</Typography>
        <Typography variant="h4">Heading 4 — a sub-group</Typography>
        <Typography variant="body-lg">
          Body large — intro paragraphs and lead copy.
        </Typography>
        <Typography variant="body">
          Body — the default for readable, multi-line content.
        </Typography>
        <Typography variant="body-sm">
          Body small — dense UI text and helper copy.
        </Typography>
        <Typography variant="caption">Caption — metadata and hints.</Typography>
      </section>

      {/* ── Dashboard ─────────────────────────────────────── */}
      <section className="space-y-4">
        <Typography variant="overline">Dashboard</Typography>
        <div className="flex items-end justify-between">
          <div>
            <Typography variant="h3" as="h2">
              Performance overview
            </Typography>
            <Typography variant="caption">Updated 2 minutes ago</Typography>
          </div>
          <Typography variant="button" as="span" className="text-brand-teal">
            View all
          </Typography>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total reach", value: "390K" },
            { label: "Revenue", value: "$89,450" },
            { label: "ROAS", value: "6.4×" },
            { label: "Retention", value: "99%" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-gray-100 p-4">
              <Typography variant="caption">{kpi.label}</Typography>
              <Typography variant="h3" as="p" className="mt-1">
                {kpi.value}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* ── Forms ─────────────────────────────────────────── */}
      <section className="max-w-md space-y-4">
        <Typography variant="overline">Forms</Typography>
        <Typography variant="h3" as="h2">
          Account details
        </Typography>
        <div className="space-y-1.5">
          <Typography variant="label" as="label">
            Email address
          </Typography>
          <input className="input" placeholder="you@company.com" />
          <Typography variant="caption">
            We will only use this to contact you.
          </Typography>
        </div>
        <button className="btn btn-primary">
          <span className="ty-button">Save changes</span>
        </button>
      </section>

      {/* ── Tables ────────────────────────────────────────── */}
      <section className="space-y-4">
        <Typography variant="overline">Tables</Typography>
        <table className="w-full">
          <thead>
            <tr className="border-y border-gray-100">
              {["Campaign", "Platform", "Status"].map((h) => (
                <Typography
                  key={h}
                  variant="overline"
                  as="th"
                  className="text-left py-3"
                >
                  {h}
                </Typography>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Summer campaign", platform: "Instagram", status: "Upcoming" },
              { name: "Holiday", platform: "Telegram", status: "Ongoing" },
            ].map((row) => (
              <tr key={row.name} className="border-b border-gray-50">
                <Typography variant="body-sm" as="td" className="py-3 font-medium">
                  {row.name}
                </Typography>
                <Typography variant="body-sm" as="td" className="py-3 text-muted">
                  {row.platform}
                </Typography>
                <Typography variant="label" as="td" className="py-3 text-brand-teal">
                  {row.status}
                </Typography>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
