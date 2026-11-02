"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const MAX_TILT = 10;
const SPRING = { stiffness: 220, damping: 18, mass: 0.6 };
const HOVER_SPRING = { type: "spring" as const, stiffness: 260, damping: 20 };

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateXRaw = useTransform(y, [0, 1], [MAX_TILT, -MAX_TILT]);
  const rotateYRaw = useTransform(x, [0, 1], [-MAX_TILT, MAX_TILT]);

  const rotateX = useSpring(rotateXRaw, SPRING);
  const rotateY = useSpring(rotateYRaw, SPRING);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left) / bounds.width);
    y.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        transition={HOVER_SPRING}
      >
        {children}
      </motion.div>
    </div>
  );
}
