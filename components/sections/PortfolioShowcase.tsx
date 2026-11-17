"use client";

import Image from "next/image";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import DrawingsCoverflow from "@/components/sections/DrawingsCoverflow";
import { PROJECT_CARD_SLOTS } from "@/components/sections/portfolioData";

type TabKey = "drawings" | "digital" | "achievement";

type DrawingItem = {
  title: string;
  meta: string;
  image: string;
  alt: string;
};

type ShowcaseItem = {
  title: string;
  meta: string;
  tag?: string;
  date?: string;
  image: string;
  alt: string;
  description: string;
  bullets: string[];
  href?: string;
};

type LayoutMode = "list" | "cards";

const TABS: { key: TabKey; label: string }[] = [
  { key: "drawings", label: "Drawings" },
  { key: "digital", label: "Proyek Digital" },
  { key: "achievement", label: "Achievement" },
];

const DRAWINGS: DrawingItem[] = [
  {
    title: "Gambar Kerja 2D",
    meta: "AutoCAD · Skala 1:100",
    image: "/placeholders/drawing-01.svg",
    alt: "Contoh gambar kerja 2D AutoCAD (placeholder)",
  },
  {
    title: "Denah & Tampang",
    meta: "DED · Gambar Bangunan",
    image: "/placeholders/drawing-02.svg",
    alt: "Contoh gambar denah dan tampang (placeholder)",
  },
  {
    title: "Pemodelan 3D",
    meta: "SketchUp · Visualisasi",
    image: "/placeholders/drawing-03.svg",
    alt: "Contoh visualisasi 3D SketchUp (placeholder)",
  },
];

const DIGITAL_PROJECTS: ShowcaseItem[] = [
  {
    title: "Website IAGARAGE Carwash",
    meta: "Website · Frontend",
    tag: "E-Commerce & Operations",
    date: "Jan 2026",
    image: "/placeholders/digital-01.svg",
    alt: "Screenshot website IAGARAGE Carwash (placeholder)",
    description: "Proyek website untuk memperkenalkan layanan dan produk IAGARAGE.",
    bullets: ["Halaman produk dan distributor", "Konten artikel dan informasi layanan"],
  },
  {
    title: "Konten Visual Canva",
    meta: "Desain · Konten digital",
    tag: "Desain & Konten Digital",
    date: "Mar 2026",
    image: "/placeholders/tools-01.svg",
    alt: "Contoh desain konten Canva (placeholder)",
    description: "Kumpulan materi visual untuk kebutuhan promosi dan media sosial.",
    bullets: ["Konten promosi", "Template visual untuk kanal digital"],
  },
  {
    title: "Spreadsheet & RAB",
    meta: "Spreadsheet · Administrasi",
    tag: "Administrasi Digital",
    date: "Mei 2026",
    image: "/placeholders/drawing-01.svg",
    alt: "Contoh spreadsheet dan RAB (placeholder)",
    description: "Contoh dokumen digital untuk pencatatan, perhitungan, dan perencanaan.",
    bullets: ["Rekap data dan perhitungan", "Rencana anggaran biaya"],
  },
  {
    title: "Landing Page Promosi UMKM (Dummy)",
    meta: "Website · Landing Page",
    tag: "Website & Promosi",
    date: "Jul 2026",
    image: "/placeholders/digital-01.svg",
    alt: "Placeholder dummy landing page promosi UMKM",
    description: "Contoh dummy halaman promosi digital untuk menampilkan produk dan informasi usaha.",
    bullets: ["Ringkasan produk dan keunggulan", "Tombol ajakan dan informasi kontak"],
  },
  {
    title: "Dashboard Penjualan Marketplace (Dummy)",
    meta: "Dashboard · Analisis Data",
    tag: "Dashboard & Analisis Data",
    date: "Sep 2026",
    image: "/placeholders/tools-01.svg",
    alt: "Placeholder dummy dashboard penjualan marketplace",
    description: "Contoh dummy dashboard untuk merangkum performa penjualan marketplace.",
    bullets: ["Ringkasan pesanan dan omzet", "Visualisasi tren penjualan"],
  },
  {
    title: "Konten Media Sosial (Dummy)",
    meta: "Desain · Media Sosial",
    tag: "Desain & Media Sosial",
    date: "Nov 2026",
    image: "/placeholders/drawing-03.svg",
    alt: "Placeholder dummy konten media sosial",
    description: "Contoh dummy materi visual untuk publikasi dan promosi di media sosial.",
    bullets: ["Materi promosi produk", "Format visual untuk beberapa kanal"],
  },
];

const ACHIEVEMENTS: ShowcaseItem[] = PROJECT_CARD_SLOTS.map((card) => ({
  title: card.org,
  meta: `${card.category} · ${card.period}`,
  image: card.image,
  alt: `Dokumentasi ${card.org} (placeholder)`,
  description: card.role,
  bullets: card.bullets,
}));

const SHOWCASE_ITEMS: Record<Exclude<TabKey, "drawings">, ShowcaseItem[]> = {
  digital: DIGITAL_PROJECTS,
  achievement: ACHIEVEMENTS,
};

function DigitalProjectGallery({ items }: { items: ShowcaseItem[] }) {
  const reduceMotion = useReducedMotion();
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 640px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateColumnCount = () => {
      setColumnCount(desktopQuery.matches ? 3 : tabletQuery.matches ? 2 : 1);
    };

    updateColumnCount();
    tabletQuery.addEventListener("change", updateColumnCount);
    desktopQuery.addEventListener("change", updateColumnCount);

    return () => {
      tabletQuery.removeEventListener("change", updateColumnCount);
      desktopQuery.removeEventListener("change", updateColumnCount);
    };
  }, []);

  const columns = Array.from({ length: columnCount }, (_, columnIndex) =>
    items
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => index % columnCount === columnIndex),
  );

  return (
    <div
      role="list"
      aria-label="Daftar proyek digital"
      className="pf-project-gallery h-full min-h-0 min-w-0 overflow-y-auto p-1"
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      {columns.map((column, columnIndex) => (
        <div
          className="pf-project-gallery-column"
          key={`column-${columnIndex}`}
          role="presentation"
        >
          {column.map(({ item, index }) => (
            <motion.article
              key={`${item.title}-${index}`}
              role="listitem"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.2),
                ease: "easeOut",
              }}
              className={`pf-project-card pf-project-card--${index % 4 === 0 ? "tall" : index % 4 === 2 ? "short" : "medium"} group`}
            >
              <div className="pf-project-card-image relative overflow-hidden bg-zinc-900">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 88vw"
                  className="object-cover saturate-[0.82] transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="pf-project-card-content px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em] sm:text-[10px]">
                  <span className="text-accent">{item.tag ?? item.meta}</span>
                  <span className="text-zinc-500">
                    {item.date ?? "Jan 2026"}
                  </span>
                </div>
                <ul className="mt-2.5 space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-[11px] leading-relaxed text-zinc-300 sm:text-xs"
                    >
                      <span
                        className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-[1px] bg-accent"
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      ))}
    </div>
  );
}

function SelectableShowcase({
  items,
  id,
  mode,
}: {
  items: ShowcaseItem[];
  id: string;
  mode: LayoutMode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeItem = items[activeIndex];
  const layoutTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 240, damping: 30 },
    [reduceMotion],
  );
  const inactiveDesktopCardWidth =
    items.length > 6 ? "lg:w-[8%]" : items.length > 4 ? "lg:w-[11%]" : "lg:w-[15%]";

  return (
    <div className="pf-selection-frame">
      {mode === "list" && id === "showcase-digital" ? (
        <DigitalProjectGallery items={items} />
      ) : mode === "cards" ? (
        <div
          role="list"
          aria-label="Proyek pilihan"
          className="pf-accordion flex h-full min-w-0 snap-x snap-mandatory gap-2 overflow-x-auto lg:overflow-hidden"
        >
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.article
                key={`${item.title}-${index}`}
                layout
                transition={layoutTransition}
                role="listitem"
                className={`group relative h-full min-w-0 shrink-0 snap-center overflow-hidden rounded-2xl border bg-zinc-900/80 transition-colors duration-300 ${
                  isActive
                    ? "w-[84%] border-white/25 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.9)] lg:w-auto lg:flex-1"
                    : `w-[4.5rem] border-white/15 ${inactiveDesktopCardWidth} lg:flex-none`
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes={
                    isActive
                      ? "(min-width: 1024px) 65vw, 84vw"
                      : "(min-width: 1024px) 90px, 72px"
                  }
                  className={`object-cover transition-[filter,transform] duration-700 ${
                    isActive
                      ? "scale-100 opacity-80"
                      : "scale-110 opacity-55 grayscale group-hover:scale-100 group-hover:opacity-70 group-hover:grayscale-0"
                  }`}
                />
                <div
                  aria-hidden
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/95 via-black/15 to-black/5"
                      : "bg-black/25"
                  }`}
                />

                <button
                  type="button"
                  aria-controls={`${id}-detail`}
                  aria-expanded={isActive}
                  aria-pressed={isActive}
                  aria-label={`Tampilkan detail ${item.title}`}
                  onClick={() => setActiveIndex(index)}
                  className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
                />

                {isActive ? (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${activeIndex}-${item.title}`}
                      id={`${id}-detail`}
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 max-h-[85%] overflow-y-auto p-4 sm:p-6"
                    >
                      <h3 className="mt-1 text-base font-semibold leading-tight text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-zinc-200 sm:text-sm">
                        {item.description}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2 text-[10px] leading-relaxed text-zinc-300 sm:text-xs"
                          >
                            <span
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="pointer-events-auto relative mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-white"
                        >
                          Lihat proyek <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                  >
                    <span className="max-h-[78%] overflow-hidden font-mono text-[10px] uppercase leading-tight tracking-[0.16em] text-white [writing-mode:vertical-rl]">
                      {item.title}
                    </span>
                  </span>
                )}
                {isActive ? (
                  <span className="pointer-events-none absolute left-4 top-4 z-20 max-w-[calc(100%-2rem)] truncate rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-100 backdrop-blur-sm sm:text-[10px]">
                    {item.meta}
                  </span>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      ) : (
        <div className="grid h-full min-h-0 min-w-0 grid-cols-1 md:grid-cols-[minmax(230px,0.82fr)_minmax(0,1.8fr)]">
          <nav
            aria-label="Daftar proyek"
            className="flex min-h-0 min-w-0 gap-2 overflow-x-auto border-b border-white/10 pb-3 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:pb-0 md:pr-3"
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-controls={`${id}-detail`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`min-w-52 rounded-xl border p-3 text-left transition-colors md:min-w-0 ${
                    isActive
                      ? "border-accent/50 bg-accent/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-sm font-medium leading-snug text-foreground">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[10px] leading-relaxed text-zinc-400">
                    {item.meta}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="relative min-h-0 pt-3 md:pl-4 md:pt-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={`${activeIndex}-${activeItem.title}`}
                id={`${id}-detail`}
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                className="flex h-full min-h-0 flex-col overflow-y-auto"
              >
                <div className="relative h-36 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 sm:h-44 md:h-[46%]">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />
                </div>
                <div className="min-h-0 flex-1 py-3 md:overflow-y-auto md:py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {activeItem.meta}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-tight text-foreground sm:text-xl">
                    {activeItem.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {activeItem.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {activeItem.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-xs leading-relaxed text-zinc-400"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  {activeItem.href ? (
                    <a
                      href={activeItem.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-foreground"
                    >
                      Lihat proyek{" "}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>("drawings");
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("cards");
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = showcaseRef.current;
    if (!shell) return;

    const motionQuery = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let cancelled = false;
    let loaded = false;
    let media:
      | {
          add: (conditions: string, callback: () => void) => void;
          revert: () => void;
        }
      | undefined;

    const setup = async () => {
      if (!motionQuery.matches || loaded || cancelled) return;
      loaded = true;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();
      media.add(motionQuery.media, () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "pf-showcase-shell",
            trigger: shell,
            start: "top 65%",
            end: "top 5%",
            scrub: 0.65,
          },
        });

        timeline.fromTo(
          shell,
          {
            rotationX: 18,
            scale: 1.04,
            transformOrigin: "50% 50%",
          },
          {
            rotationX: 0,
            scale: 1,
            transformOrigin: "50% 50%",
            ease: "none",
            duration: 1,
          },
        );

        return () => timeline.kill();
      });
    };

    motionQuery.addEventListener("change", setup);
    void setup();

    return () => {
      cancelled = true;
      motionQuery.removeEventListener("change", setup);
      media?.revert();
    };
  }, []);

  return (
    <Section
      id="portofolio"
      className="mt-8 px-4 pt-8 sm:px-6 lg:mt-12 lg:pt-10"
      containerClassName="max-w-[76rem]"
      padding="tight"
      withBorder={false}
    >
      <SectionHeading
        index="02"
        eyebrow="Portofolio Showcase"
        title="Portofolio Showcase"
        description="Jelajahi gambar, proyek digital, dan pengalaman pilihan. Beberapa visual masih berupa placeholder."
        align="center"
        size="large"
      />

      <div className="pf-showcase-perspective -mt-3">
        <div
          ref={showcaseRef}
          className="pf-showcase-shell mx-auto max-w-[82rem]"
        >
          <div className="pf-controls-row mx-auto mt-3 grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
            <div
              role="tablist"
              aria-label="Kategori portofolio"
              className="pf-category-tabs group mx-auto flex w-fit rounded-full border border-white/10 p-1.5 sm:col-start-2"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    role="tab"
                    type="button"
                    id={`tab-${tab.key}`}
                    aria-controls={`panel-${tab.key}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.key)}
                    onKeyDown={(event) => {
                      const currentIndex = TABS.findIndex(({ key }) => key === tab.key);
                      const nextIndex =
                        event.key === "ArrowRight"
                          ? (currentIndex + 1) % TABS.length
                          : event.key === "ArrowLeft"
                            ? (currentIndex - 1 + TABS.length) % TABS.length
                            : event.key === "Home"
                              ? 0
                              : event.key === "End"
                                ? TABS.length - 1
                                : -1;

                      if (nextIndex < 0) return;
                      event.preventDefault();
                      const nextTab = TABS[nextIndex];
                      setActiveTab(nextTab.key);
                      event.currentTarget.parentElement
                        ?.querySelector<HTMLButtonElement>(`#tab-${nextTab.key}`)
                        ?.focus();
                    }}
                    className={`relative inline-flex h-10 cursor-pointer items-center justify-center rounded-full px-3 transition-colors sm:px-4 ${
                      isActive ? "bg-accent" : ""
                    }`}
                  >
                    <span
                      className={`relative whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] transition-colors sm:text-xs ${
                        isActive ? "text-background" : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeTab !== "drawings" ? (
              <div
                role="group"
                aria-label="Mode tampilan proyek"
                className="pf-mode-switch flex w-fit items-center gap-1 justify-self-end rounded-full border border-white/10 bg-black/20 p-1 sm:col-start-3"
              >
                <button
                  type="button"
                  aria-label="Tampilan daftar"
                  title="Daftar"
                  aria-pressed={layoutMode === "list"}
                  onClick={() => setLayoutMode("list")}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    layoutMode === "list"
                      ? "bg-white/[0.13] text-white"
                      : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <List aria-hidden="true" size={16} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  aria-label="Tampilan kartu"
                  title="Kartu"
                  aria-pressed={layoutMode === "cards"}
                  onClick={() => setLayoutMode("cards")}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    layoutMode === "cards"
                      ? "bg-white/[0.13] text-white"
                      : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  <LayoutGrid aria-hidden="true" size={15} strokeWidth={1.8} />
                </button>
              </div>
            ) : null}
          </div>

          <div className="pf-panels mx-auto mt-8 max-w-[82rem]">
            <div
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="pf-panel pf-panel-active"
            >
              <MotionConfig reducedMotion="user">
                {activeTab === "drawings" ? (
                  <DrawingsCoverflow items={DRAWINGS} embedded />
                ) : (
                  <SelectableShowcase
                    key={activeTab}
                    id={`showcase-${activeTab}`}
                    items={SHOWCASE_ITEMS[activeTab]}
                    mode={layoutMode}
                  />
                )}
              </MotionConfig>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
