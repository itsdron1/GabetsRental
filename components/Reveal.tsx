"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeReveal, unobserveReveal } from "@/lib/reveal-observer";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  once?: boolean;
};

/**
 * Progressive enhancement: content is visible by default (no black flash).
 * Animation only runs after mount when motion is allowed.
 */
export default function Reveal({ children, className = "", delay, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.classList.add("visible");
      return;
    }

    el.dataset.animate = "pending";
    observeReveal(el, { once });
    return () => {
      delete el.dataset.animate;
      unobserveReveal(el);
    };
  }, [once]);

  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
