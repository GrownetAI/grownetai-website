"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Loader2, Lock, Mail } from "lucide-react";
import { login, apiErrorMessage } from "@/lib/api";

const TEAL = "#008080";
const AQUA = "#00E5E5";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(email, password);
      const next = new URLSearchParams(window.location.search).get("next");
      if (next) {
        router.push(next);
      } else if (res.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(apiErrorMessage(err, "Could not sign in. Check your details."));
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail("demo@grownetai.com");
    setPassword("Demo@1234");
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
{/* Left brand panel */}
<div
  className="relative hidden lg:flex overflow-hidden"
  style={{ background: TEAL }}
>
  {/* Ambient layers */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.08),transparent_30%)]" />

  <div
    className="absolute -right-32 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-[120px]"
    style={{
      background: "rgba(0,229,229,0.18)",
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/15" />

  {/* Content */}
  <div className="relative z-20 flex h-full w-full flex-col justify-between px-14 py-14">
    
    {/* Logo */}
    <div className="flex items-center gap-2 border border-white/90 bg-white px-3 py-1.5 rounded-lg w-max backdrop-blur-md">
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
        <div className="h-2 w-2 rounded-full bg-cyan-300" />
        <span className="text-[11px] tracking-[0.18em] uppercase text-white/60">
          Growth Intelligence Platform
        </span>
      </div>

      <h1
        className="
          font-display
          font-bold
          text-white
          tracking-[-0.06em]
          leading-[0.92]
        "
        style={{
          fontSize: "clamp(3.75rem,5vw,5.5rem)",
        }}
      >
        Hey, Brand
        <br />
        Access the growth insights you deserve.
      </h1>

      <p className="mt-7 max-w-[420px] text-base leading-relaxed text-white/65">
        Track visibility, measure growth, and turn attention
        into measurable business outcomes.
      </p>
    </div>

    {/* Footer */}
    <div className="text-xs text-white/35">
      © {new Date().getFullYear()} GrownetAI
    </div>
  </div>
</div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-teal transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <div className="lg:hidden mb-8 text-center">
            <span className="font-display font-black text-2xl" style={{ color: TEAL }}>
              Grownet<span style={{ color: AQUA }}>AI</span>
            </span>
          </div>

          <h1 className="heading-section mb-2">Sign in</h1>
          <p className="text-body mb-8">
            Enter your credentials to access your dashboard.
          </p>

          {error && (
            <div className="mb-5 rounded-xl px-4 py-3 text-sm font-medium bg-red-50 text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-charcoal mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray" />
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
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-light-gray" />
                <input
                  type="password"
                  required
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
                  Sign in <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={fillDemo}
            className="mt-3 w-full text-sm font-semibold py-2 rounded-xl transition-colors"
            style={{ color: TEAL, background: "rgba(0,128,128,0.08)" }}
          >
            Use demo credentials
          </button>

          <p className="mt-8 text-center text-sm text-brand-slate-gray">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold" style={{ color: TEAL }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
