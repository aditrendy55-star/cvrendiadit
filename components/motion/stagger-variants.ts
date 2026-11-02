"use client";

import type { Variants } from "framer-motion";
import { EASE } from "./motion-utils";

export const staggerContainer = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};
