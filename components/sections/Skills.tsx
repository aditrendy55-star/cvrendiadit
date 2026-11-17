"use client";

import { BriefcaseBusiness, DraftingCompass, Monitor } from "lucide-react";
import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

type SkillGroup = {
  title: string;
  icon: typeof DraftingCompass;
  tone: "amber" | "blue" | "emerald";
  items: {
    title: string;
    description: string;
    meter: number;
    logo: {
      label: string;
      className: string;
      src?: string;
      alt?: string;
    };
  }[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Teknik",
    icon: DraftingCompass,
    tone: "amber",
    items: [
      {
        title: "AutoCAD & SketchUp",
        description: "Gambar teknik 2D/3D dan visualisasi ruang.",
        meter: 92,
        logo: {
          label: "S",
          className: "bg-red-500/15 text-red-300",
          src: "/logos/sketchup.svg",
          alt: "SketchUp",
        },
      },
      {
        title: "Membaca Gambar Teknik",
        description: "Memahami detail, dimensi, dan kebutuhan instalasi.",
        meter: 86,
        logo: {
          label: "A",
          className: "bg-red-500/15 text-red-300",
          src: "/logos/autocad.svg",
          alt: "AutoCAD",
        },
      },
      {
        title: "RAB",
        description: "Estimasi material dan biaya yang terukur.",
        meter: 78,
        logo: {
          label: "X",
          className: "bg-green-500/15 text-green-300",
          src: "/logos/excel.svg",
          alt: "Microsoft Excel",
        },
      },
    ],
  },
  {
    title: "Digital",
    icon: Monitor,
    tone: "blue",
    items: [
      {
        title: "Web Development",
        description: "Website responsif dari frontend hingga integrasi.",
        meter: 84,
        logo: {
          label: "</>",
          className: "bg-sky-500/15 text-sky-300",
          src: "/logos/vscode.svg",
          alt: "Visual Studio Code",
        },
      },
      {
        title: "E-Commerce Management",
        description: "Listing, pricing, promosi, dan evaluasi penjualan.",
        meter: 88,
        logo: {
          label: "S",
          className: "bg-orange-500/15 text-orange-300",
          src: "/logos/shopee.svg",
          alt: "Shopee",
        },
      },
      {
        title: "Editing Foto & Video",
        description: "Konten visual untuk kebutuhan promosi dan dokumentasi.",
        meter: 68,
        logo: {
          label: "Pr",
          className: "bg-violet-500/15 text-violet-300",
          src: "/logos/premiere.svg",
          alt: "Adobe Premiere Pro",
        },
      },
      {
        title: "Desain Grafis",
        description: "Materi visual seperti banner, poster, dan katalog.",
        meter: 74,
        logo: {
          label: "C",
          className: "bg-cyan-500/15 text-cyan-300",
          src: "/logos/canva.svg",
          alt: "Canva",
        },
      },
    ],
  },
  {
    title: "Business / Operations",
    icon: BriefcaseBusiness,
    tone: "emerald",
    items: [
      {
        title: "Microsoft Office",
        description: "Administrasi, pengolahan data, dan dokumentasi.",
        meter: 90,
        logo: {
          label: "▦",
          className: "bg-green-500/15 text-green-300",
          src: "/logos/microsoft-office.svg",
          alt: "Microsoft Office",
        },
      },
      {
        title: "Administrasi & Operasional",
        description: "Mengatur alur kerja dan kebutuhan operasional.",
        meter: 92,
        logo: {
          label: "S",
          className: "bg-emerald-500/15 text-emerald-300",
          src: "/logos/seabank-s.svg",
          alt: "SeaBank",
        },
      },
      {
        title: "Kerja Tim",
        description: "Kolaborasi dalam proyek dan aktivitas lintas fungsi.",
        meter: 88,
        logo: {
          label: "N",
          className: "bg-zinc-500/15 text-zinc-200",
          src: "/logos/notion.svg",
          alt: "Notion",
        },
      },
      {
        title: "Problem Solving",
        description: "Mengidentifikasi masalah dan mencari solusi praktis.",
        meter: 84,
        logo: {
          label: "G",
          className: "bg-blue-500/15 text-blue-300",
          src: "/logos/google.svg",
          alt: "Google",
        },
      },
      {
        title: "Manajemen Operasional",
        description: "Menjaga proses harian berjalan konsisten.",
        meter: 90,
        logo: {
          label: "N",
          className: "bg-slate-500/15 text-slate-200",
          src: "/logos/notepad.svg",
          alt: "Notepad",
        },
      },
    ],
  },
];

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState(1);

  const moveCarousel = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + SKILL_GROUPS.length) % SKILL_GROUPS.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40 && Math.abs(info.velocity.x) < 300) return;
    moveCarousel(info.offset.x < 0 ? 1 : -1);
  };

  return (
    <Section id="keahlian" padding="compact" withBorder={false}>
      <SectionHeading
        index="04"
        eyebrow="Keahlian"
        title="Tiga ranah yang saya kuasai."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.18 }}
        className="relative mx-auto min-h-[670px] max-w-7xl overflow-x-clip overflow-y-visible sm:min-h-[690px]"
      >
        <div className="origin-top" style={{ transform: "scale(0.92)" }}>
          <motion.div
            className="relative h-full touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            aria-label="Carousel keahlian"
          >
          {SKILL_GROUPS.map(({ title, icon: Icon, tone, items }, index) => {
            const relative = (index - activeIndex + SKILL_GROUPS.length) % SKILL_GROUPS.length;
            const position = relative === 0 ? 0 : relative === 1 ? 1 : -1;
            const isActive = position === 0;

            return (
              <motion.article
                key={title}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: position === 0 ? "0%" : position === -1 ? "-108%" : "108%",
                  y: isActive ? 0 : 14,
                  rotate: 0,
                  scale: isActive ? 1.04 : 0.94,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className={`group absolute left-1/2 top-2 flex h-[680px] w-[86%] flex-col border bg-surface shadow-2xl transition-colors duration-300 [--card-half:43%] sm:w-[33%] sm:[--card-half:16.5%] ${
                  isActive
                    ? tone === "amber"
                      ? "z-20 border-amber-400/80 shadow-[0_24px_70px_-35px_rgba(251,191,36,0.8)]"
                      : tone === "blue"
                        ? "z-20 border-sky-300/80 shadow-[0_24px_70px_-35px_rgba(56,189,248,0.8)]"
                        : "z-20 border-emerald-400/80 shadow-[0_24px_70px_-35px_rgba(52,211,153,0.8)]"
                    : "z-10 border-line"
                }`}
                style={{ marginLeft: "calc(-1 * var(--card-half))" }}
              >
                <div className="flex items-center gap-3 border-b border-line px-6 py-5">
                  <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-background">
                    <Icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-mono text-base font-bold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 sm:text-lg">
                    <span className="mr-1.5 opacity-60">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {title}
                  </h3>
                </div>

                <ul className="flex-1 divide-y divide-line/70 px-6">
                  {items.map(({ title: itemTitle, description, meter, logo }) => (
                    <li key={itemTitle} className="group/skill py-5 first:pt-6 last:pb-6">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="inline-flex h-7 min-w-7 shrink-0 items-center justify-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-1 font-mono text-[9px] font-bold text-zinc-300 transition-all duration-300 group-hover/skill:scale-110 group-hover/skill:border-amber-300/30 group-hover/skill:text-amber-200"
                          aria-label={logo.alt}
                        >
                          {logo.src ? (
                            <Image
                              src={logo.src}
                              alt=""
                              width={20}
                              height={20}
                              className={`h-4 w-4 object-contain grayscale brightness-125 sepia-[0.2] saturate-[0.6] hue-rotate-[355deg] opacity-80 transition-all duration-300 ${
                                isActive
                                  ? "group-hover/skill:grayscale-0 group-hover/skill:sepia-0 group-hover/skill:saturate-100 group-hover/skill:brightness-100 group-hover/skill:hue-rotate-0 group-hover/skill:opacity-100"
                                  : ""
                              }`}
                            />
                          ) : (
                            logo.label
                          )}
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">{itemTitle}</h4>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300">
                        {description}
                      </p>
                      <div
                        className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
                        role="progressbar"
                        aria-label={`${itemTitle} proficiency`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={meter}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            tone === "amber"
                              ? "bg-amber-400 group-hover/skill:bg-amber-300 group-hover/skill:shadow-[0_0_12px_rgba(251,191,36,0.7)]"
                              : tone === "blue"
                                ? "bg-sky-400 group-hover/skill:bg-sky-300 group-hover/skill:shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                                : "bg-emerald-400 group-hover/skill:bg-emerald-300 group-hover/skill:shadow-[0_0_12px_rgba(52,211,153,0.7)]"
                          }`}
                          style={{ width: `${meter}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
            })}
          </motion.div>
        </div>

        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          className="absolute left-2 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/90 text-zinc-300 hover:border-accent hover:text-accent"
          aria-label="Keahlian sebelumnya"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          className="absolute right-2 top-1/2 z-30 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/90 text-zinc-300 hover:border-accent hover:text-accent"
          aria-label="Keahlian berikutnya"
        >
          →
        </button>
      </motion.div>
    </Section>
  );
}
