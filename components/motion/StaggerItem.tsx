"use client";

import type { ReactNode } from "react";
import { MOTION_ELEMENTS, type MotionTag } from "./motion-utils";
import { staggerItem } from "./stagger-variants";

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
};

export default function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Element = MOTION_ELEMENTS[as] as (typeof MOTION_ELEMENTS)["div"];

  return (
    <Element className={className} variants={staggerItem}>
      {children}
    </Element>
  );
}
