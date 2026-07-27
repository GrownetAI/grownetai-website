"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Loader2, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUSINESS_TYPES } from "./data";

/* ════════════════════════════════════════════════════════════════
   BRIEF MODAL

   The command bar's real submit surface. The bar itself is a single
   read-only line — anything the visitor started typing there arrives
   pre-filled in the textarea, and the bar's business-type selection
   becomes the select's default. Posts to /api/brief.
════════════════════════════════════════════════════════════════ */

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(254, "Email too long"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[+\d\s\-().]{7,20}$/.test(v),
      "Enter a valid phone number",
    ),
  company: z.string().max(150, "Company name too long").optional(),
  businessType: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, "Tell us a little more — at least 10 characters")
    .max(3000, "Message too long"),
});
type FormData = z.infer<typeof schema>;

const inputError =
  "border-red-400 focus:border-red-500 focus:shadow-none";

export default function BriefModal({
  open,
  onOpenChange,
  initialMessage,
  businessType,
  onSubmitted,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialMessage: string;
  businessType: string;
  onSubmitted: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { businessType, message: initialMessage },
  });

  /* Each open re-syncs the two values the bar owns. The message is only
     overwritten when the bar actually holds text, so a draft typed in the
     modal survives an accidental Escape. */
  useEffect(() => {
    if (!open) return;
    setValue("businessType", businessType);
    if (initialMessage) setValue("message", initialMessage);
  }, [open, businessType, initialMessage, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        // Server-side validation failures land on their fields, not a toast
        if (res.status === 400 && body?.details?.fieldErrors) {
          const fieldErrors = body.details.fieldErrors as Partial<
            Record<keyof FormData, string[]>
          >;
          let shown = false;
          for (const field of Object.keys(schema.shape) as (keyof FormData)[]) {
            const message = fieldErrors[field]?.[0];
            if (typeof message === "string") {
              setError(field, { type: "server", message });
              shown = true;
            }
          }
          if (shown) return;
        }
        throw new Error(typeof body?.error === "string" ? body.error : "");
      }
      toast.success("Brief received! We'll reply within 24 hours.");
      onSubmitted();
      reset({
        name: "",
        email: "",
        phone: "",
        company: "",
        businessType,
        message: "",
      });
      onOpenChange(false);
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again or WhatsApp us.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby="brief-modal-desc">
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100vw-2rem)] max-w-2xl
                           overflow-hidden rounded-3xl border border-hairline bg-paper-raised
                           shadow-float focus:outline-none"
                initial={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.96,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.96,
                  x: "-50%",
                  y: "-50%",
                }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              >
                {/* Stays anchored while the inner container scrolls */}
                <Dialog.Close
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-full bg-paper-raised/80 p-2
                             text-ink-muted backdrop-blur-sm transition-colors hover:bg-sand
                             hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>

                <div className="max-h-[90dvh] overflow-y-auto p-6 sm:p-8">
                <span className="eyebrow">Start a project</span>
                <Dialog.Title className="heading-section mt-3">
                  Tell us about your project
                </Dialog.Title>
                <Dialog.Description
                  id="brief-modal-desc"
                  className="text-body mt-3 text-sm"
                >
                  Share a few details and we&rsquo;ll come back with a tailored
                  recommendation.
                </Dialog.Description>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-6 space-y-6"
                  noValidate
                >
                  {/* ── About you ── */}
                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold text-ink">
                      About you
                    </legend>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="brief-name"
                          className="mb-1.5 block text-sm font-medium text-ink-body"
                        >
                          Name *
                        </label>
                        <input
                          id="brief-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Rahul Sharma"
                          className={cn("input", errors.name && inputError)}
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="brief-email"
                          className="mb-1.5 block text-sm font-medium text-ink-body"
                        >
                          Email *
                        </label>
                        <input
                          id="brief-email"
                          type="email"
                          autoComplete="email"
                          placeholder="rahul@company.com"
                          className={cn("input", errors.email && inputError)}
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="brief-phone"
                          className="mb-1.5 block text-sm font-medium text-ink-body"
                        >
                          Phone
                        </label>
                        <input
                          id="brief-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          className={cn("input", errors.phone && inputError)}
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="brief-company"
                          className="mb-1.5 block text-sm font-medium text-ink-body"
                        >
                          Company name
                        </label>
                        <input
                          id="brief-company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Acme Pvt. Ltd."
                          className={cn("input", errors.company && inputError)}
                          {...register("company")}
                        />
                        {errors.company && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Your project ── */}
                  <fieldset>
                    <legend className="mb-3 text-sm font-semibold text-ink">
                      Your project
                    </legend>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="brief-business-type"
                          className="mb-1.5 block text-sm font-medium text-ink-body"
                        >
                          Business type
                        </label>
                        <select
                          id="brief-business-type"
                          className="input"
                          {...register("businessType")}
                        >
                          {BUSINESS_TYPES.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="brief-message"
                          className="mb-1.5 block text-sm font-medium text-ink-body"
                        >
                          Project details *
                        </label>
                        <textarea
                          id="brief-message"
                          rows={4}
                          placeholder="Tell us about your business or project…"
                          className={cn(
                            "textarea min-h-[110px]",
                            errors.message && inputError,
                          )}
                          {...register("message")}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs text-red-500">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg w-full gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send brief
                      </>
                    )}
                  </button>
                </form>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
