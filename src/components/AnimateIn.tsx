"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    let cancelled = false;
    const show = () => {
      if (!cancelled) setVisible(true);
    };
    if (!el || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      show();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    const fallback = window.setTimeout(show, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: fadeOnly ? undefined : (visible ? "translateY(0)" : "translateY(24px)"),
        transition: fadeOnly
          ? `opacity 0.6s ease-out ${delay}s`
          : `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) return;
    const el = ref.current;
    let cancelled = false;
    const start = () => {
      if (!cancelled) setStarted(true);
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
