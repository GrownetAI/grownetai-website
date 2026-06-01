import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary border border-primary",
  secondary: "btn-secondary border border-secondary",
  dark: "btn-dark border border-gray-800",
  ghost: "btn-ghost border border-current",
};

const sizeClasses: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  external,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "btn",
    "shadow-none",
    "[background-image:none]",
    "border",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
