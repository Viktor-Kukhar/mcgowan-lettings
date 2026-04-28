"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

export function StaggerGrid({
  children,
  className = "",
  staggerMs = 80,
}: {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
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
      { threshold: 0.05 }
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
        ["--stagger-ms" as string]: `${staggerMs}ms`,
      }}
    >
      {visible ? (
        <style>{`
          .stagger-item {
            opacity: 0;
            transform: translateY(24px);
            animation: staggerIn 0.5s ease-out forwards;
          }
          @keyframes staggerIn {
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      ) : null}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              className="stagger-item"
              style={
                visible
                  ? { animationDelay: `${i * staggerMs}ms` }
                  : { opacity: 0 }
              }
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
