"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const STRENGTH = 0.3;
const SPRING = { stiffness: 300, damping: 30 };

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  "aria-label"?: string;
};

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    x.set((event.clientX - centerX) * STRENGTH);
    y.set((event.clientY - centerY) * STRENGTH);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const Component = href ? "a" : "button";

  return (
    <Component
      ref={ref as React.RefObject<HTMLButtonElement | HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center gap-2 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.span
        style={{
          x: xSpring,
          y: ySpring,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}