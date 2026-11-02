"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EASE } from "@/components/motion/motion-utils";

const SECTION_IDS = [
  "beranda",
  "profil",
  "kompetensi",
  "pengalaman",
  "portofolio",
  "keahlian",
  "pendidikan",
  "kontak",
];

export default function ScrollTools() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 300);

      const marker = y + window.innerHeight * 0.4;
      let current = 0;
      SECTION_IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= marker) current = i;
      });
      setActiveIndex(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const el = document.getElementById(SECTION_IDS[index]);
    if (!el) return;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const showUp = visible && activeIndex > 0;
  const showDown = visible && activeIndex < SECTION_IDS.length - 1;
  const duration = reduceMotion ? 0 : 0.25;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
        transition={{ duration, ease: EASE }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        <motion.button
          type="button"
          aria-label="Gulir ke section sebelumnya"
          aria-hidden={!showUp}
          tabIndex={showUp ? 0 : -1}
          onClick={() => scrollTo(activeIndex - 1)}
          animate={{ opacity: showUp ? 1 : 0, scale: showUp ? 1 : 0.85 }}
          transition={{ duration, ease: EASE }}
          style={{ pointerEvents: showUp ? "auto" : "none" }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-background/80 text-zinc-400 backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ChevronUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Gulir ke section berikutnya"
          aria-hidden={!showDown}
          tabIndex={showDown ? 0 : -1}
          onClick={() => scrollTo(activeIndex + 1)}
          animate={{ opacity: showDown ? 1 : 0, scale: showDown ? 1 : 0.85 }}
          transition={{ duration, ease: EASE }}
          style={{ pointerEvents: showDown ? "auto" : "none" }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-background/80 text-zinc-400 backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </>
  );
}