"use client";
import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie_consent")) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookie_consent", "true");
    } catch {
      /* ignore */
    }
    setVisible(false);
    toast.success("Preferences saved!");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-brand-charcoal text-white rounded-2xl shadow-2xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
        <Cookie className="w-6 h-6 text-brand-teal flex-shrink-0" />
        <p className="text-sm text-white/80 flex-1 text-center sm:text-left">
          We use cookies to enhance your experience. By continuing, you agree to
          our{" "}
          <Link
            href="/privacy"
            className="text-brand-teal underline hover:no-underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => setVisible(false)}
            className="text-sm text-white/60 hover:text-white transition-colors px-3 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="btn btn-primary btn-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
