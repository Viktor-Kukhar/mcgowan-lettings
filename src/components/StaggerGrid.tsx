"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

type StaggerState = "show" | "hide" | "animate";

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
  const [state, setState] = useState<StaggerState>("show");

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
      { threshold: 0.05 }
    );
    observer.observe(el);
    const fallback = window.setTimeout(animate, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const itemStyle = (i: number): React.CSSProperties | undefined => {
    if (state === "hide") return { opacity: 0 };
    if (state === "animate") return { animationDelay: `${i * staggerMs}ms` };
    return undefined;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ["--stagger-ms" as string]: `${staggerMs}ms`,
      }}
    >
      {state === "animate" ? (
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
              className={state === "animate" ? "stagger-item" : ""}
              style={itemStyle(i)}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
