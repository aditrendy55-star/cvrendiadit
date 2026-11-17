"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Coffee,
  Dumbbell,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const TAGS = ["AutoCAD & SketchUp", "Operasional", "E-Commerce", "Web Dev"];
const AUTOPLAY_DELAY_MS = 3000;
const CONTENT_SLIDE_DELAY_MS = 4000;
const STATS_REVEAL_DURATION_MS = 700;
const BIO_REVEAL_DELAY_SECONDS = 0.38;

const PILARS = [
  { word: "Teknis", note: "Drafting", count: 100, suffix: "+" },
  { word: "Operasional", note: "Manajemen", count: 5, suffix: "+" },
  { word: "Digital", note: "Web & Konten", count: 10, suffix: "+" },
  { word: "Fleksibel", note: "Freelance · Project", count: 100, suffix: "%" },
];

const EDUCATION_DATA = [
  {
    school: "SMK Negeri 2 Palembang",
    major: "Teknik Gambar Bangunan",
    location: "Sumatera Selatan",
    period: "2016 – 2019",
  },
  {
    school: "SMP Xaverius 2 Palembang",
    major: null,
    location: "Sumatera Selatan",
    period: "2013 – 2016",
  },
  {
    school: "SD Xaverius 4 Palembang",
    major: null,
    location: "Sumatera Selatan",
    period: "2007 – 2013",
  },
  {
    school: "TK Xaverius 4 Palembang",
    major: null,
    location: "Sumatera Selatan",
    period: "2003 – 2007",
  },
];

const HOBBY_DATA = [
  {
    title: "Gym",
    description: "Latihan rutin untuk menjaga kebugaran dan disiplin.",
    icon: Dumbbell,
    artwork: "from-amber-500/35 via-orange-950/45 to-zinc-950",
  },
  {
    title: "Ngopi",
    description: "Kopi, suasana santai, dan ide-ide baru.",
    icon: Coffee,
    artwork: "from-orange-300/30 via-amber-950/40 to-zinc-950",
  },
  {
    title: "Coding",
    description: "Mengeksplorasi teknologi dan merangkai ide.",
    icon: Code2,
    artwork: "from-cyan-400/25 via-blue-950/50 to-zinc-950",
  },
  {
    title: "Membaca",
    description: "Menambah wawasan dan sudut pandang baru.",
    icon: BookOpen,
    artwork: "from-emerald-400/20 via-teal-950/45 to-zinc-950",
  },
];

const ORGANIZATIONS = [
  {
    role: "Anggota KPPS 3",
    organization: "Kelompok Penyelenggara Pemungutan Suara (KPPS) 2024",
    description: "Bertugas di pemilu 2024 untuk administrasi dan penghitungan suara.",
  },
  {
    role: "Anggota KPPS 6",
    organization: "Kelompok Penyelenggara Pemungutan Suara (KPPS) 2019",
    description: "Mendukung proses pemungutan suara dan pelayanan pemilih.",
  },
  {
    role: "Staff Divisi Kreatif",
    organization: "UKM Sriwijaya ITERA",
    description: "Membuat materi visual untuk kegiatan organisasi.",
  },
  {
    role: "Staff Lapangan",
    organization: "ITERA Berpijar",
    description: "Terlibat dalam pelaksanaan kegiatan dan koordinasi lapangan.",
  },
  {
    role: "Staff Divisi Operasional",
    organization: "UKM Seni Musik ITERA",
    description: "Menangani kebutuhan logistik dan kelancaran kegiatan.",
  },
];

function IdCard({
  introActive = false,
  visualActive = false,
  dragConstraintsRef,
  onIntroComplete,
}: {
  introActive?: boolean;
  visualActive?: boolean;
  dragConstraintsRef?: RefObject<HTMLDivElement | null>;
  onIntroComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [releaseCount, setReleaseCount] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lanyardRef = useRef<SVGSVGElement>(null);
  const lanyardWidth = useMotionValue(100);
  const lanyardHeight = useMotionValue(380);
  const lanyardAnchorY = useMotionValue(140);
  const springX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.5 });

  useEffect(() => {
    const svg = lanyardRef.current;
    if (!svg) return;

    const updateLanyardSize = () => {
      const { width, height } = svg.getBoundingClientRect();
      if (!width || !height) return;

      const anchorOffset = Number.parseFloat(
        window.getComputedStyle(svg).getPropertyValue("--lanyard-attach-y"),
      );
      lanyardWidth.set(width);
      lanyardHeight.set(height);
      if (Number.isFinite(anchorOffset)) {
        lanyardAnchorY.set((anchorOffset * 380) / height);
      }
    };

    updateLanyardSize();
    const observer = new ResizeObserver(updateLanyardSize);
    observer.observe(svg);
    window.addEventListener("resize", updateLanyardSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLanyardSize);
    };
  }, [lanyardAnchorY, lanyardHeight, lanyardWidth]);

  const lanyardPath = useTransform(
    [springX, springY, lanyardWidth, lanyardHeight, lanyardAnchorY],
    ([offsetX, offsetY, width, height, anchorY]) => {
      const endX = 50 + (Number(offsetX) * 100) / Number(width);
      const endY = Number(anchorY) + (Number(offsetY) * 380) / Number(height);
      return `M 50 8 C 50 40 ${endX.toFixed(2)} 72 ${endX.toFixed(2)} ${endY.toFixed(2)}`;
    },
  );

  return (
    <div className="relative min-h-[380px] select-none md:min-h-[390px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={visualActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
        className="absolute inset-0 md:-translate-y-7"
        aria-hidden={!visualActive}
      >
        <svg
          ref={lanyardRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full [--lanyard-attach-y:140px] md:[--lanyard-attach-y:118px]"
          viewBox="0 0 100 380"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lanyard-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="50%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
          </defs>
          <motion.path
            d={lanyardPath}
            fill="none"
            stroke="#18181b"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <motion.path
            d={lanyardPath}
            fill="none"
            stroke="url(#lanyard-grad)"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={visualActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-300 shadow-[0_0_0_2px_#3f3f46,0_2px_4px_rgba(0,0,0,0.55)] md:top-0"
        />
        <motion.div
          initial={{ y: -180, rotate: -4 }}
          animate={
            visualActive && !reduceMotion
              ? { y: 4, rotate: 0 }
              : visualActive
                ? { y: 4, rotate: 0 }
                : { y: -180, rotate: -4 }
          }
          transition={
            visualActive && !reduceMotion
              ? { delay: 0.12, type: "spring", stiffness: 150, damping: 9, mass: 1 }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (visualActive) onIntroComplete?.();
          }}
          className="absolute left-1/2 top-[140px] z-10 -translate-x-1/2 md:top-[118px]"
        >
        <motion.div
          drag
          dragConstraints={dragConstraintsRef ?? { left: -20, right: 20, top: -10, bottom: 42 }}
          dragElastic={0.14}
          dragMomentum={false}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 360, bounceDamping: 30 }}
          animate={
            reduceMotion
              ? { rotate: 0 }
              : visualActive
                ? {
                    rotate: releaseCount > 0
                      ? releaseCount % 2 === 1
                        ? [0, -0.7, 0.5, -0.25, 0]
                        : [0, 0.7, -0.5, 0.25, 0]
                      : [0, -0.35, 0.35, 0],
                  }
                : { rotate: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : releaseCount > 0
                ? { duration: 0.68, ease: "easeOut" }
              : { delay: introActive ? 0.85 : 0.2, duration: 1.1, ease: "easeInOut" }
          }
          onDragEnd={() => setReleaseCount((count) => count + 1)}
          style={{ x, y, willChange: "transform" }}
          className="cursor-grab touch-none active:cursor-grabbing"
        >
          <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
            <div className="relative h-4 w-9 rounded-md bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 ring-1 ring-zinc-800 shadow-md">
              <div className="absolute left-1/2 top-1 h-1.5 w-3 -translate-x-1/2 rounded-full bg-zinc-900 ring-1 ring-zinc-700/60" />
            </div>
          </div>
          <div className="relative w-[194px] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] md:w-[clamp(170px,20.3vw,226px)]">
            <div className="relative aspect-[69/100] w-full md:aspect-[3/4]">
              <Image
                src="/foto-diri.jpeg"
                alt="M. Rendi Adhitya Atmaja Putra"
                draggable={false}
                loading="lazy"
                decoding="async"
                fill
                sizes="226px"
                className="pointer-events-none object-cover grayscale"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/[0.04]" />
            </div>
          </div>
        </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}



function Counter({
  target,
  suffix = "",
  active,
}: {
  target: number;
  suffix?: string;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !active) return;
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
  }, [active, isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: active ? 0.35 : 0 }}
      aria-hidden={!active}
      className="font-sans text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:text-4xl"
    >
      {count.toLocaleString()}{suffix}
    </motion.div>
  );
}

function PillarsStats({ active }: { active: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      className="col-span-full mt-auto md:mt-5"
      aria-label="Statistik"
    >
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-4">
        {PILARS.map((pilar) => (
          <div key={pilar.word} className="flex flex-col items-start bg-background px-4 py-3 sm:px-5 sm:py-3.5">
            <Counter target={pilar.count} suffix={pilar.suffix} active={active} />
            <motion.div
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: active ? 0.35 : 0 }}
              aria-hidden={!active}
              className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400"
            >
              {pilar.note}
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AboutMeSlide({
  introActive = false,
  visualActive = false,
  dragConstraintsRef,
  onTextComplete,
  onIntroComplete,
}: {
  introActive?: boolean;
  visualActive?: boolean;
  dragConstraintsRef?: RefObject<HTMLDivElement | null>;
  onTextComplete?: () => void;
  onIntroComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [bioStarted, setBioStarted] = useState(false);

  useEffect(() => {
    if (!introActive) return;
    const timer = window.setTimeout(() => setBioStarted(true), BIO_REVEAL_DELAY_SECONDS * 1000);
    return () => window.clearTimeout(timer);
  }, [introActive]);

  return (
    <div className="relative flex min-h-full flex-1 flex-col gap-6 md:grid md:translate-y-10 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-x-8 md:gap-y-6">
      <div className="pt-4 md:flex md:h-full md:flex-col md:pl-3 md:pt-13">
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 12 }}
          transition={{ delay: introActive ? 0.18 : 0, duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-400"
        >
          Bio
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 18 }}
          transition={{ delay: introActive ? BIO_REVEAL_DELAY_SECONDS : 0, duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (introActive) onTextComplete?.();
          }}
          className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg sm:leading-relaxed md:-mr-10 md:text-lg xl:-mr-12 xl:text-xl"
        >
          Mechanical Engineering student at UMS and AI enthusiast. Four years drafting and 1,000+ industrial fabrication drawings. Skilled in Autodesk Inventor, SolidWorks, AutoCAD, Fusion 360, and ZW3D; 13+ national and international competition awards.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={introActive ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 8 }}
          transition={{ delay: introActive ? 0.68 : 0, duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400 sm:text-[10px] sm:tracking-[0.18em] lg:mt-8">
            {TAGS.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <span className="h-px w-4 bg-accent/40" />
                {tag}
              </span>
            ))}
          </div>
          <a
            href="#portofolio"
            className="group mt-6 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-accent/70 transition-all hover:bg-accent-strong hover:shadow-[0_8px_32px_rgba(251,191,36,0.18)] lg:mt-3"
          >
            See my work
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
          <p className="mt-5 max-w-md text-sm font-medium tracking-wide text-accent/80 lg:mt-4 md:hidden">
            Fokus pada detail, konsisten pada hasil.
          </p>
        </motion.div>
      </div>

      <IdCard
        introActive={introActive}
        visualActive={visualActive}
        dragConstraintsRef={dragConstraintsRef}
        onIntroComplete={onIntroComplete}
      />
      <PillarsStats active={bioStarted} />
    </div>
  );
}

function HobbySlide() {
  const reduceMotion = useReducedMotion();
  const layoutClasses = [
    "md:row-span-2",
    "md:col-start-2 md:row-start-1",
    "md:col-start-2 md:row-start-2",
    "md:col-start-3 md:row-span-2",
  ];

  return (
    <div className="relative -top-2 mx-auto flex w-full flex-1 flex-col justify-center space-y-6 px-1 sm:space-y-5 sm:px-2 md:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.06, duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative -top-3 pt-3 text-center"
      >
        <h3 className="text-[1.625rem] font-semibold tracking-tight text-foreground sm:text-[2rem]">
          Hobby <span className="text-accent">Minat</span>
        </h3>
        <p className="relative -top-1 mt-1 text-xs leading-relaxed text-zinc-400 sm:mt-2 sm:text-sm">
          Hal-hal yang saya nikmati di waktu luang.
        </p>
      </motion.div>

      <div className="mx-auto grid w-full gap-3 sm:grid-cols-2 md:aspect-[3/1] md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2">
        {HOBBY_DATA.map(({ title, description, icon: Icon, artwork }, i) => (
          <motion.article
            key={title}
            tabIndex={0}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.12 + 0.07 * i,
              duration: reduceMotion ? 0 : 0.44,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`group relative isolate min-h-44 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/50 shadow-none transition-all duration-500 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 md:min-h-0 ${layoutClasses[i]}`}
          >
            <div aria-hidden className={`absolute inset-0 bg-gradient-to-br ${artwork}`} />
            <div aria-hidden className="blueprint-grid absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-35" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-zinc-950/5 transition-colors duration-500 group-hover:from-zinc-950/90" />
            <Icon
              aria-hidden="true"
              className="absolute right-5 top-5 h-16 w-16 text-white/[0.12] transition-all duration-500 group-hover:scale-110 group-hover:text-accent/50 sm:h-20 sm:w-20"
              strokeWidth={1}
            />
            <span aria-hidden className="absolute right-5 top-5 font-mono text-[9px] tracking-[0.2em] text-white/45">
              0{i + 1} / HOBBY
            </span>
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 md:p-3 lg:p-5">
              <h4
                className={`font-serif font-medium tracking-wide text-white ${
                  i === 1 || i === 2
                    ? "text-base sm:text-lg md:text-sm lg:text-lg"
                    : "text-xl sm:text-2xl md:text-xl lg:text-2xl"
                }`}
              >
                {title}
              </h4>
              <p className="mt-1.5 max-h-0 translate-y-2 overflow-hidden text-[9px] leading-snug text-zinc-300 opacity-0 transition-[max-height,opacity,transform] duration-300 ease-out group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:mt-1">
                {description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function EducationSlide() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full space-y-4 px-1 sm:space-y-5 sm:px-2">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.06, duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col gap-2 border-b border-white/[0.08] pb-3 sm:flex-row sm:items-end sm:justify-between sm:pb-4"
      >
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Pendidikan &amp; Organisasi
          </h3>
        </div>
        <div className="max-w-sm sm:text-right">
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">Profil · 03</p>
          <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">
            Fondasi akademik dan pengalaman di luar ruang kelas.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-[0.88fr_1.52fr]">
        <motion.div
          className="relative rounded-3xl border border-white/10 bg-zinc-950/30 p-4"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.08, duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07] text-accent">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300">Pendidikan</h4>
          </div>

          <div className="relative mt-3">
            <div className="relative space-y-2">
              <span aria-hidden style={{ clipPath: "polygon(0 0, 100% 0, 75% 100%, 25% 100%)" }} className="pointer-events-none absolute bottom-[33px] left-[17.5px] top-[52px] z-0 w-[3px] bg-gradient-to-b from-accent/65 via-accent/30 to-accent/10" />
              {EDUCATION_DATA.map(({ school, major, location, period }, i) => (
              <motion.div
                key={school}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.16 + 0.08 * i,
                  duration: reduceMotion ? 0 : 0.44,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group min-h-[68px] rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-accent/25 hover:bg-white/[0.035]"
              >
                <div className="min-w-0 pl-6">
                  <div>
                    <span className="font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-accent">{period}</span>
                  </div>
                  <div className="relative mt-1.5">
                    <span aria-hidden style={{ scale: 1 - i * 0.15 }} className="absolute -left-6 top-[0.2em] z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/45 bg-zinc-950 transition-colors group-hover:border-accent/80 group-hover:bg-accent/10">
                      <span className="h-1 w-1 rounded-full bg-zinc-500/70 transition-colors group-hover:bg-accent" />
                    </span>
                    <p className="text-[13px] font-semibold leading-snug tracking-tight text-foreground sm:text-sm">{school}</p>
                  </div>
                  {major ? <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">{major}</p> : null}
                  <p className="mt-1 text-[10px] leading-relaxed text-zinc-500">{location}</p>
                </div>
              </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative p-1 sm:p-2"
          initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.14, duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mb-3 flex items-center justify-between gap-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07] text-accent">
                <UsersRound className="h-4 w-4" aria-hidden="true" />
              </span>
              <h4 className="text-sm font-semibold text-foreground">Pengalaman organisasi</h4>
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] tracking-wide text-zinc-400">
              {ORGANIZATIONS.length} kegiatan
            </span>
          </div>
          <div className="relative grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          {ORGANIZATIONS.map(({ role, organization, description }, i) => (
            <motion.div
              key={organization}
              className="group rounded-3xl border border-white/10 bg-zinc-950/30 p-3 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.95)] transition-colors hover:border-accent/40 sm:p-3"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 0.28 + 0.07 * i,
                duration: reduceMotion ? 0 : 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent sm:text-[10px] sm:tracking-[0.22em]">{role}</p>
              <p className="mt-2 text-[13px] font-semibold leading-relaxed text-foreground sm:mt-2 sm:text-sm">{organization}</p>
              <p className="mt-1.5 text-[10px] leading-relaxed text-zinc-400 sm:mt-1.5 sm:text-[10px]">{description}</p>
            </motion.div>
          ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ExecutiveProfile() {
  const [slide, setSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [visualActive, setVisualActive] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const reduceMotion = useReducedMotion();
  const autoplayStopped = useRef(false);
  const autoplayCycleComplete = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isCarouselInView = useInView(carouselRef, { once: false, amount: 0.2 });

  const slides = [
    { key: "about", component: AboutMeSlide },
    { key: "hobbies", component: HobbySlide },
    { key: "education", component: EducationSlide },
  ];
  const activeSlide = slides[slide];
  const isEducationSlide = activeSlide.key === "education";
  const ActiveSlide = activeSlide.component;

  const stopAutoplay = () => {
    autoplayStopped.current = true;
  };
  const handlePrev = () => {
    stopAutoplay();
    setSlideDirection(-1);
    setSlide((s) => (s === 0 ? slides.length - 1 : s - 1));
  };
  const handleNext = () => {
    stopAutoplay();
    setSlideDirection(1);
    setSlide((s) => (s + 1) % slides.length);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  useEffect(() => {
    if (
      autoplayStopped.current ||
      autoplayCycleComplete.current ||
      !isCarouselInView ||
      (slide === 0 && !cardComplete) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const timer = window.setTimeout(() => {
      if (slide === slides.length - 1) {
        autoplayCycleComplete.current = true;
        autoplayStopped.current = true;
        setSlideDirection(-1);
        setSlide(0);
        return;
      }

      setSlideDirection(1);
      setSlide((current) => current + 1);
    }, slide === 0
      ? STATS_REVEAL_DURATION_MS + AUTOPLAY_DELAY_MS
      : CONTENT_SLIDE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [cardComplete, isCarouselInView, slide, slides.length]);

  return (
    <Section id="profil" padding="compact" onKeyDown={handleKeyDown} tabIndex={0}>
      <SectionHeading
        index="01"
        eyebrow="Profil Eksekutif"
        title="Lintas bidang, satu cara kerja: terstruktur dan dapat digunakan."
        mobileCompact
      />

      <motion.div
        ref={carouselRef}
        initial={false}
        animate={
          isCarouselInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 10, scale: 1 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          delay: reduceMotion ? 0 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`executive-profile-carousel glass-strong relative mx-auto flex w-full flex-col overflow-hidden rounded-2xl p-5 sm:p-7 lg:p-8 ${
          activeSlide.key === "hobbies" ? "" : "md:block"
        }`}
      >
        <div aria-hidden className="blueprint-grid pointer-events-none absolute inset-0 opacity-25" />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-1/4 h-[28rem] w-[28rem] rounded-full bg-white/[0.04] blur-[120px]" />
        <div aria-hidden className="absolute -top-px left-12 right-12 h-px hairline" />

        <div
          className={`relative flex flex-1 flex-col ${
            activeSlide.key === "hobbies" ? "" : "md:block"
          }`}
          onClickCapture={stopAutoplay}
        >
          <MotionConfig reducedMotion={reduceMotion ? "user" : "never"}>
            <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
              <motion.div
                key={activeSlide.key}
                custom={slideDirection}
                aria-hidden={false}
                variants={{
                  enter: (direction: number) =>
                    isEducationSlide
                      ? {
                          opacity: 0,
                          x: direction * 30,
                          y: 12,
                          scale: 0.98,
                        }
                      : {
                          opacity: 0,
                          x: direction * 14,
                          scale: 0.99,
                        },
                  center: { opacity: 1, x: 0, y: 0, scale: 1 },
                  exit: (direction: number) => ({
                    opacity: 0,
                    x: direction * (isEducationSlide ? -24 : -10),
                    y: isEducationSlide ? -8 : 0,
                    scale: isEducationSlide ? 0.985 : 0.995,
                    transition: {
                      duration: reduceMotion ? 0 : isEducationSlide ? 0.24 : 0.2,
                      ease: [0.4, 0, 1, 1],
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className={`h-full flex flex-1 flex-col ${
                  activeSlide.key === "hobbies" ? "" : "md:block"
                }`}
                transition={{
                  duration: reduceMotion ? 0 : isEducationSlide ? 0.48 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {slide === 0 ? (
                  <AboutMeSlide
                    introActive={isCarouselInView}
                    visualActive={visualActive}
                    dragConstraintsRef={carouselRef}
                    onTextComplete={() => setVisualActive(true)}
                    onIntroComplete={() => setCardComplete(true)}
                  />
                ) : (
                  <ActiveSlide />
                )}
              </motion.div>
            </AnimatePresence>
          </MotionConfig>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-2 right-2 z-20 flex items-center justify-between sm:left-4 sm:right-4">
          <button
            type="button"
            onClick={handlePrev}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-zinc-300 opacity-35 transition-all hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            aria-label="Slide sebelumnya"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-zinc-300 opacity-35 transition-all hover:border-accent/60 hover:bg-accent/10 hover:text-accent hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            aria-label="Slide berikutnya"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </Section>
  );
}
