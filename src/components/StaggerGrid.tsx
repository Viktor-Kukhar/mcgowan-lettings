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
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
