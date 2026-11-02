"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal, { ScrollRevealItem } from "@/components/motion/ScrollReveal";

const PILARS = [
  { word: "Teknis", note: "Drafting", count: 1000, suffix: "+" },
  { word: "Operasional", note: "Manajemen", count: 5, suffix: "+" },
  { word: "Digital", note: "Web & Konten", count: 10, suffix: "+" },
  { word: "Fleksibel", note: "Freelance · Project", count: 100, suffix: "%" },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1200;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <div ref={ref} className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function ExecutiveProfile() {
  return (
    <Section id="profil">
      <SectionHeading
        index="01"
        eyebrow="Profil Eksekutif"
        title="Lintas bidang, satu cara kerja: terstruktur dan dapat digunakan."
      />

      <ScrollReveal delay={0.15} stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PILARS.map((pilar) => (
          <ScrollRevealItem
            key={pilar.word}
            className="group border border-line bg-surface/40 p-6 transition-colors hover:border-accent"
          >
            <div>
              <Counter target={pilar.count} suffix={pilar.suffix} />
              <p className="mt-2 text-sm text-zinc-400">({pilar.note})</p>
              <p className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {pilar.word}
              </p>
            </div>
          </ScrollRevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}