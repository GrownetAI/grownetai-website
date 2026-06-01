import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center relative overflow-hidden noise-overlay"
      style={{ background: "#008080" }}
    >
      <div className="absolute inset-0 dot-grid opacity-[0.18]" />
      <div
        className="hero-glow w-[460px] h-[460px] top-[-140px] left-[-120px]"
        style={{ background: "rgba(0,229,229,0.16)" }}
      />
      <div
        className="hero-glow w-[360px] h-[360px] bottom-[-120px] right-[-100px]"
        style={{ background: "rgba(0,229,229,0.12)" }}
      />

      <div className="container-site relative z-10 text-center">
        <h1
          className="font-display font-black text-white leading-none mb-4"
          style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}
        >
          4<span style={{ color: "#00E5E5" }}>0</span>4
        </h1>

        <p className="text-white text-xl md:text-2xl font-heading font-semibold mb-2">
          This page took a wrong turn.
        </p>
        <p className="text-white/80 max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="btn btn-accent btn-xl inline-flex items-center gap-2 font-bold"
        >
          <Home className="w-5 h-5" /> Back to Home <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
