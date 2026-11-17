"use client";

import type { ReactNode } from "react";
import { EASE, MOTION_ELEMENTS, type MotionTag } from "./motion-utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: MotionTag;
  amount?: number;
  mount?: boolean;
  fromY?: number;
  fromX?: number;
  duration?: number;
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.25,
  mount = false,
  fromY = 16,
  fromX = 0,
  duration = 0.7,
}: FadeInProps) {
  const Element = MOTION_ELEMENTS[as] as (typeof MOTION_ELEMENTS)["div"];

  return (
    <Element
      className={className}
      initial={{ opacity: 0, x: fromX, y: fromY }}
      {...(mount
        ? { animate: { opacity: 1, x: 0, y: 0 } }
        : { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: false, amount } })}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </Element>
  );
}
