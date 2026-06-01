"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type FormData = z.infer<typeof schema>;

export default function NewsletterForm({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("You're subscribed! Welcome to the GrownetAI community 🎉");
      reset();
    } catch {
      toast.error("Couldn't subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate-gray pointer-events-none" />
            <input
              type="email"
              placeholder="Enter your email..."
              className={cn(
                "input pl-10 w-full",
                dark &&
                  "bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-white",
                errors.email && "border-red-400",
              )}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary whitespace-nowrap disabled:opacity-60 inline-flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : null}
          Subscribe
        </button>
      </div>
    </form>
  );
}
