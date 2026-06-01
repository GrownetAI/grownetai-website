"use client";
import { useInView } from "react-intersection-observer";

interface UseIntersectionOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useIntersection({
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = "0px",
}: UseIntersectionOptions = {}) {
  const { ref, inView } = useInView({ threshold, triggerOnce, rootMargin });
  return { ref, inView };
}
