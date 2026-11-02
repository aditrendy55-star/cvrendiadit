import { motion } from "framer-motion";

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export const MOTION_ELEMENTS = {
  div: motion.div,
  header: motion.header,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  blockquote: motion.blockquote,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  nav: motion.nav,
} as const;

export type MotionTag = keyof typeof MOTION_ELEMENTS;

export type MotionElement = (typeof MOTION_ELEMENTS)[MotionTag];
