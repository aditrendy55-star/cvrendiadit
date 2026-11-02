import { Fragment } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import DeviceFrame from "@/components/ui/DeviceFrame";
import DrawingsCoverflow from "@/components/sections/DrawingsCoverflow";
import ParallaxGlow from "@/components/motion/ParallaxGlow";

type TabKey = "drawings" | "digital" | "tools";
type Frame = "sheet" | "browser" | "panel";

type PortfolioItem = {
  title: string;
  meta: string;
  image: string;
  alt: string;
  frame: Frame;
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "drawings", label: "Drawings" },
  { key: "digital", label: "Proyek Digital" },
  { key: "tools", label: "Tools" },
];

const ITEMS: Record<TabKey, PortfolioItem[]> = {
  drawings: [
    {
      title: "Gambar Kerja 2D",
      meta: "AutoCAD · Skala 1:100",
      // TODO: ganti gambar asli (hasil export AutoCAD)
      image: "/placeholders/drawing-01.svg",
      alt: "Contoh gambar kerja 2D AutoCAD (placeholder)",
      frame: "sheet",
    },
    {
      title: "Denah & Tampang",
      meta: "DED · Gambar Bangunan",
      // TODO: ganti gambar asli (DENAH & TAMPANG)
      image: "/placeholders/drawing-02.svg",
      alt: "Contoh gambar denah dan tampang (placeholder)",
      frame: "sheet",
    },
    {
      title: "Pemodelan 3D",
      meta: "SketchUp · Visualisasi",
      // TODO: ganti gambar hasil render SketchUp
      image: "/placeholders/drawing-03.svg",
      alt: "Contoh visualisasi 3D SketchUp (placeholder)",
      frame: "sheet",
    },
  ],
  digital: [
    {
      title: "Website IAGARAGE Carwash",
      meta: "frontend-iac.example.com",
      // TODO: ganti screenshot website asli
      image: "/placeholders/digital-01.svg",
      alt: "Screenshot website IAGARAGE Carwash (placeholder)",
      frame: "browser",
    },
  ],
  tools: [
    {
      title: "Drafting & Desain",
      meta: "AutoCAD · SketchUp · Canva",
      // TODO: ganti screenshot toolkit asli
      image: "/placeholders/tools-01.svg",
      alt: "Ilustrasi toolkit drafting dan desain (placeholder)",
      frame: "panel",
    },
  ],
};

function StaticFrame({ item }: { item: PortfolioItem }) {
  return (
    <div>
      <DeviceFrame>
        <div className="h-full w-full">
          <Image
            src={item.image}
            alt={item.alt}
            width={1200}
            height={900}
            sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
            className="h-full w-full object-cover"
          />
        </div>
      </DeviceFrame>
      <div className="mt-5 text-center">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          {item.meta}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioShowcase() {
  return (
    <Section id="portofolio" className="bg-grid">
      <SectionHeading
        index="04"
        eyebrow="Portofolio Showcase"
        title="Hasil kerja dalam frame-nya masing-masing."
        description="Gambar teknik, proyek digital, dan tools yang dipakai sehari-hari. Gambar saat ini masih placeholder."
        align="center"
      />

      <ParallaxGlow intensity={0.1} radius={400} color="rgba(251, 191, 36, 0.1)">
        <div className="pf-root relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 48%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 72%)",
          }}
        />
        <div
          role="group"
          aria-label="Kategori portofolio"
          className="group mx-auto flex w-fit rounded-full border border-white/10 p-1"
        >
          {TABS.map((tab) => (
            <Fragment key={tab.key}>
              <input
                type="radio"
                name="pf-tab"
                id={`pf-${tab.key}`}
                defaultChecked={tab.key === "drawings"}
                className="sr-only"
              />
              <label
                htmlFor={`pf-${tab.key}`}
                id={`tab-${tab.key}`}
                aria-controls={`panel-${tab.key}`}
                className="relative inline-flex h-9 cursor-pointer items-center justify-center rounded-full px-3 transition-colors sm:px-5"
              >
                <span className="relative font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 transition-colors group-hover:text-zinc-200">
                  {tab.label}
                </span>
              </label>
            </Fragment>
          ))}
        </div>

        <div className="pf-panels mx-auto mt-6 max-w-4xl pt-4 pb-12">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              id={`panel-${tab.key}`}
              aria-labelledby={`tab-${tab.key}`}
              className="pf-panel"
            >
              {tab.key === "drawings" ? (
                <DrawingsCoverflow items={ITEMS.drawings} />
              ) : (
                <StaticFrame item={ITEMS[tab.key][0]} />
              )}
            </div>
          ))}
        </div>
      </div>
      </ParallaxGlow>
    </Section>
  );
}
