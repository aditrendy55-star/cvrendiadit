"use client";

import { useRef, type MouseEvent, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type ParallaxGlowProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  radius?: number;
  color?: string;
};

export default function ParallaxGlow({
  children,
  className = "",
  intensity = 0.15,
  radius = 300,
  color = "rgba(251, 191, 36, 0.15)",
}: ParallaxGlowProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
      const bounds = ref.current?.getBoundingClientRect();
      if (!bounds) return;
      setPosition({
        x: (e.clientX - bounds.left) / bounds.width,
        y: (e.clientY - bounds.top) / bounds.height,
      });
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (reduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`} onMouseMove={undefined}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
          background: `radial-gradient(${radius * 2}px circle at ${position.x * 100}% ${position.y * 100}%, ${color}, transparent 70%)`,
        }}
      >
        {visible && <div style={{ opacity: 1 }} />}
      </div>
      {children}
    </div>
  );
}