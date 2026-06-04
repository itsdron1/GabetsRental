"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeReveal, unobserveReveal } from "@/lib/reveal-observer";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  once?: boolean;
};

export default function Reveal({ children, className = "", delay, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observeReveal(el, { once });
    return () => unobserveReveal(el);
  }, [once]);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
