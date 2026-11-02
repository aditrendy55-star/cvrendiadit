"use client";

import type { ReactNode } from "react";
import { MOTION_ELEMENTS, type MotionTag } from "./motion-utils";
import { staggerContainer } from "./stagger-variants";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: MotionTag;
  amount?: number;
  mount?: boolean;
};

export default function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.07,
  as = "div",
  amount = 0.2,
  mount = false,
}: StaggerProps) {
  const Element = MOTION_ELEMENTS[as] as (typeof MOTION_ELEMENTS)["div"];

  return (
    <Element
      className={className}
      variants={staggerContainer(delay, stagger)}
      initial="hidden"
      {...(mount
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount } })}
    >
      {children}
    </Element>
  );
}
