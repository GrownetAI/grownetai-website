"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Building2,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { register, apiErrorMessage } from "@/lib/api";

const FOREST = "#0E2A24";
const TEAL = "#0C6B58";
const AQUA = "#1CA88C";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password, shop: shop || undefined });
      router.push("/dashboard");
    } catch (err) {
      setError(apiErrorMessage(err, "Could not create your account."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
{/* Left brand panel */}
<div
  className="relative hidden lg:flex overflow-hidden"
  style={{ background: FOREST }}
>
  {/* Ambient layers */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.08),transparent_30%)]" />

  <div
    className="absolute -right-32 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[120px]"
    style={{
      background: "rgba(28,168,140,0.18)",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/15" />

  {/* Content */}
  <div className="relative z-20 flex h-full w-full flex-col justify-between px-14 py-14">
    
    {/* Logo */}
    <div className="flex items-center gap-2 border border-white/90 bg-white shadow-inner px-3 py-1.5 rounded-lg w-max backdrop-blur-md">
      <img
        src="/images/logo.png"
        alt="GrownetAI"
        className="h-10 w-auto"
      />
    </div>

    {/* Hero */}
    <div className="max-w-[520px]">
      
      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/5
          px-3
          py-1.5
          backdrop-blur-md
          mb-8
        "
      >
        <div className="h-2 w-2 rounded-full bg-moss-400" />
        <span className="text-[11px] tracking-[0.18em] uppercase text-paper/70">
          Growth Intelligence Platform
        </span>
      </div>

      <h1
        className="
          font-display
          text-paper
          tracking-[-0.06em]
          leading-[0.92]
        "
        style={{
          fontSize: "clamp(3.75rem,5vw,5.5rem)",
        }}
      >
        Congratulations, for becoming a <span className="text-moss-300">Brand!</span>
        <br />
        Let's Start
      </h1>

      <p className="mt-7 max-w-[420px] text-base leading-relaxed text-paper/70">
        Track visibility, measure growth, and turn attention
        into measurable business outcomes.
      </p>
    </div>

    {/* Footer */}
    <div className="text-xs text-paper/70">
      © {new Date().getFullYear()} GrownetAI
    </div>
  </div>
</div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-paper">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-teal transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="lg:hidden mb-8 flex items-center justify-center gap-2 border border-white/90 bg-white px-3 py-1.5 rounded-lg w-full backdrop-blur-md">
            <img
              src="/images/logo.png"
              alt="GrownetAI"
              className="h-10 w-auto"
            />
          </div>

          <h1 className="heading-section mb-2">Create account</h1>
          <p className="text-body mb-8">It takes less than a minute.</p>

          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1.5">
                Company / shop{" "}
                <span className="text-ink-muted font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  value={shop}
                  onChange={(e) => setShop(e.target.value)}
                  placeholder="Acme Inc."
                  className="input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1.5">
                Password{" "}
                <span className="text-ink-muted font-normal">
                  (min 8 characters)
                </span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-11"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-full font-bold disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-brand-slate-gray">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold" style={{ color: TEAL }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
