import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely, handling conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to compact notation (e.g., 15000 → ₹15K)
 */
export function formatCompact(num: number, prefix = ""): string {
  if (num >= 1_000_000) return `${prefix}${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${prefix}${(num / 1_000).toFixed(0)}K`;
  return `${prefix}${num}`;
}

/**
 * Format currency in Indian Rupees
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncate string to given character limit
 */
export function truncate(str: string, limit: number): string {
  if (str.length <= limit) return str;
  return str.slice(0, limit).trim() + "…";
}

/**
 * Convert string to URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format date to readable string
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function whatsappUrl(phone: string, message?: string): string {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

/**
 * Get initials from a full name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Check if we're in the browser
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Smooth scroll to an element by ID
 */
export function scrollToId(id: string, offset = 80): void {
  if (!isBrowser) return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Debounce a function call
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Generate star rating array for testimonials
 */
export function generateStars(rating: number, total = 5): boolean[] {
  return Array.from({ length: total }, (_, i) => i < rating);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
