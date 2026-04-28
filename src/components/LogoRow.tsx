"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const LOGOS = [
  { src: "/logos/tds.svg", alt: "Tenancy Deposit Scheme", cls: "h-16 md:h-16" },
  { src: "/logos/safeagent.svg", alt: "SafeAgent", cls: "h-14 md:h-14" },
  { src: "/logos/tpo.svg", alt: "The Property Ombudsman", cls: "h-16 md:h-16" },
  { src: "/logos/tsi.png", alt: "CTSI Approved Code", cls: "h-20 md:h-20" },
  { src: "/logos/zoopla.svg", alt: "Zoopla", cls: "h-12 md:h-12" },
  { src: "/logos/primelocation2.png", alt: "PrimeLocation", cls: "h-14 md:h-14" },
];

type LogoState = "show" | "hide" | "animate";

export default function LogoRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LogoState>("show");

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    const fallback = window.setTimeout(animate, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
      {LOGOS.map((logo, i) => {
        const opacity = state === "hide" ? 0 : 1;
        const transition =
          state === "animate"
            ? `opacity 0.5s ease-out ${i * 0.15}s`
            : undefined;
        return (
          <div
            key={logo.alt}
            className="flex items-center justify-center p-5 md:p-6"
            style={{ opacity, transition }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={80}
              className={`${logo.cls} w-auto max-w-full object-contain`}
            />
          </div>
        );
      })}
    </div>
  );
}
