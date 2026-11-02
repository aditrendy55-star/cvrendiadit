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
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  as = "div",
  amount = 0.25,
  mount = false,
}: FadeInProps) {
  const Element = MOTION_ELEMENTS[as] as (typeof MOTION_ELEMENTS)["div"];

  return (
    <Element
      className={className}
      initial={{ opacity: 0, y: 16 }}
      {...(mount
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount } })}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </Element>
  );
}
