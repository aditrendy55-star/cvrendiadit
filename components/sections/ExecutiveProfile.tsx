"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const PILARS = [
  { word: "Teknis", note: "Drafting", count: 100, suffix: "+" },
  { word: "Operasional", note: "Manajemen", count: 5, suffix: "+" },
  { word: "Digital", note: "Web & Konten", count: 10, suffix: "+" },
  { word: "Fleksibel", note: "Freelance · Project", count: 100, suffix: "%" },
];

const TAGS = ["AutoCAD & SketchUp", "Operasional", "E-Commerce", "Web Dev"];

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
    <div ref={ref} className="font-sans text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:text-4xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

function IdCard() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <div className="relative min-h-[340px] sm:min-h-[380px] select-none">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <defs>
          <linearGradient id="lanyard-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#27272a" />
          </linearGradient>
        </defs>
        <polygon fill="url(#lanyard-grad)" stroke="#18181b" strokeWidth="1" points="-5,20 5,20 5,100 -5,100" />
      </svg>
      <div aria-hidden="true" className="absolute left-1/2 top-2 z-20 -translate-x-1/2 h-3 w-3 rounded-full bg-zinc-300 shadow-[0_0_0_2px_#3f3f46,0_2px_4px_rgba(0,0,0,0.55)]" />
      <motion.div
        drag={reduceMotion ? false : true}
        dragConstraints={{ left: -20, right: 20, top: -10, bottom: 10 }}
        dragElastic={0.1}
        style={{ x: springX, y: springY, left: "50%", marginLeft: "-100px", top: "120px", willChange: "transform" }}
        className="absolute z-10 cursor-grab touch-none active:cursor-grabbing"
      >
        <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2">
          <div className="relative h-5 w-10 rounded-md bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 ring-1 ring-zinc-800 shadow-md">
            <div className="absolute left-1/2 top-1.5 h-2 w-3.5 -translate-x-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700/60" />
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]" style={{ width: "200px" }}>
          <div className="relative" style={{ width: "200px", aspectRatio: "3 / 4" }}>
            <Image
              src="/foto-diri.jpeg"
              alt="M. Rendi Adhitya Atmaja Putra"
              draggable={false}
              loading="lazy"
              decoding="async"
              fill
              sizes="200px"
              className="pointer-events-none object-cover grayscale"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/[0.04]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ExecutiveProfile() {
  return (
    <Section id="profil" padding="compact">
      <SectionHeading
        index="01"
        eyebrow="Profil Eksekutif"
        title="Lintas bidang, satu cara kerja: terstruktur dan dapat digunakan."
      />

      <div className="glass-strong relative overflow-hidden rounded-2xl p-6 sm:rounded-3xl sm:p-10 md:p-12">
        <div aria-hidden className="blueprint-grid absolute inset-0 opacity-25" />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-1/4 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-[120px]" />
        <div aria-hidden className="absolute -top-px left-12 right-12 h-px hairline" />

      <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">Bio</p>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg md:text-[1.15rem] md:leading-[1.55]">
            Mechanical Engineering student &amp; AI enthusiast. Four years drafting — 1,000+ technical drawings for industrial fabrication and machinery. Fluent in Autodesk Inventor, SolidWorks, AutoCAD, Fusion 360, and ZW3D. 13+ national and international competition awards.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            {TAGS.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <span className="h-px w-4 bg-accent/40" />
                {tag}
              </span>
            ))}
          </div>
          <a
            href="#portofolio"
            className="group mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-accent/70 transition-all hover:bg-accent-strong hover:shadow-[0_8px_32px_rgba(251,191,36,0.18)]"
          >
            See my work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>

        <IdCard />
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-4">
          {PILARS.map((pilar) => (
            <div key={pilar.word} className="bg-background px-4 py-4 sm:px-5 sm:py-5">
              <Counter target={pilar.count} suffix={pilar.suffix} />
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                {pilar.note}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </Section>
  );
}