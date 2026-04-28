"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

type AnimState = "show" | "hide" | "animate";

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  fadeOnly = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  fadeOnly?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<AnimState>("show");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    let cancelled = false;
    const hide = () => {
      if (!cancelled) setState("hide");
    };
    const animate = () => {
      if (!cancelled) setState("animate");
    };
    hide();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    const fallback = window.setTimeout(animate, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const opacity = state === "hide" ? 0 : 1;
  const transform =
    state === "hide" && !fadeOnly ? "translateY(24px)" : undefined;
  const transition =
    state === "animate"
      ? fadeOnly
        ? `opacity 0.6s ease-out ${delay}s`
        : `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`
      : undefined;

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity, transform, transition }}
    >
      {children}
    </div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    const el = ref.current;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setCount(0);
      setStarted(true);
    };
    if (!el || typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      start();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    const fallback = window.setTimeout(start, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      const current = Math.round(value * progress);
      setCount(current);
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}
