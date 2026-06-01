"use client";
import { useInView } from "react-intersection-observer";
import ReactCountUp from "react-countup";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2.2,
  className,
}: CountUpProps) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <span ref={ref} className={className}>
      {inView ? (
        <ReactCountUp
          start={0}
          end={value}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          separator=","
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}
