"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

type SpotlightProps = {
  children: React.ReactNode;
  className?: string;
  size?: number;
  color?: string;
};

export default function Spotlight({
  children,
  className = "",
  size = 180,
  color = "rgba(251, 191, 36, 0.15)",
}: SpotlightProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const handleMove = (event: MouseEvent) => {
      const bounds = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      el.style.setProperty("--spot-opacity", "1");
    };

    const handleLeave = () => {
      el.style.setProperty("--spot-opacity", "0");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        "--spot-x": "50%",
        "--spot-y": "50%",
        "--spot-opacity": "0",
      } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: "var(--spot-opacity, 0)",
          transition: "opacity 0.3s ease",
          background: `radial-gradient(${size}px circle at var(--spot-x) var(--spot-y), ${color}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}