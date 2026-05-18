import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-cloud-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 text-center px-4">
        <div
          className="font-heading font-bold text-[120px] md:text-[180px] leading-none bg-gradient-brand bg-clip-text text-transparent select-none"
          aria-hidden
        >
          404
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-charcoal mb-4 -mt-4">
          Page Not Found
        </h1>
        <p className="text-brand-slate-gray text-lg max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary btn-lg inline-flex items-center gap-2">
            <Home className="w-5 h-5" /> Go Home
          </Link>
          <Link href="/contact" className="btn btn-secondary btn-lg inline-flex items-center gap-2">
            <MessageCircle className="w-5 h-5" /> Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
