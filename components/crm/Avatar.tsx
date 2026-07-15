import Image from "next/image";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

const SIZES = { sm: "w-7 h-7 text-[11px]", md: "w-9 h-9 text-xs", lg: "w-11 h-11 text-sm" };

export default function Avatar({
  name,
  src,
  size = "md",
  className,
}: {
  name: string;
  src?: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const px = size === "sm" ? 28 : size === "lg" ? 44 : 36;
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={px}
        height={px}
        className={cn("rounded-full object-cover flex-shrink-0", SIZES[size], className)}
      />
    );
  }
  return (
    <span
      className={cn(
        "rounded-full grid place-items-center font-semibold flex-shrink-0 bg-primary/12 text-primary",
        SIZES[size],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
