"use client";
import { isBrowser } from "@/lib/utils";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function useAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  function trackPageView(path: string) {
    if (!isBrowser || !window.gtag || !GA_ID) return;
    window.gtag("config", GA_ID, { page_path: path });
  }

  function trackEvent(name: string, params?: Record<string, unknown>) {
    if (!isBrowser || !window.gtag) return;
    window.gtag("event", name, params);
  }

  function trackFormSubmit(formName: string) {
    trackEvent("form_submit", { form_name: formName });
  }

  function trackCTAClick(ctaLabel: string, destination?: string) {
    trackEvent("cta_click", { cta_label: ctaLabel, destination });
  }

  return { trackPageView, trackEvent, trackFormSubmit, trackCTAClick };
}
