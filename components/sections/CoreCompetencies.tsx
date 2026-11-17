import {
  Box,
  Calculator,
  Code2,
  DraftingCompass,
  FolderKanban,
  PencilRuler,
  Settings2,
  Store,
  type LucideIcon,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

type Competency = {
  title: string;
  description: string;
  category: "Operasional" | "Digital" | "Teknik";
  icon: LucideIcon;
};

const COMPETENCIES: Competency[] = [
  {
    title: "Manajemen Operasional",
    description:
      "Mengelola alur kerja, sumber daya, dan proses harian agar target tercapai secara konsisten.",
    category: "Operasional",
    icon: Settings2,
  },
  {
    title: "E-Commerce Operator",
    description:
      "Operasional Shopee & TikTok Shop: listing, pricing, promosi, hingga evaluasi penjualan.",
    category: "Operasional",
    icon: Store,
  },
  {
    title: "Web Development",
    description:
      "Membangun website responsif dengan stack modern — frontend hingga integrasi backend.",
    category: "Digital",
    icon: Code2,
  },
  {
    title: "Manajemen Proyek",
    description:
      "Merencanakan, membagi tugas, dan mengawasi proyek dari brief hingga serah terima.",
    category: "Operasional",
    icon: FolderKanban,
  },
  {
    title: "Gambar Teknik & DED",
    description:
      "Menghasilkan gambar kerja 2D, dokumen eksekusi desain, dan revisi sesuai brief klien.",
    category: "Teknik",
    icon: PencilRuler,
  },
  {
    title: "Rencana Anggaran Biaya (RAB)",
    description:
      "Menyusun estimasi material dan biaya yang terukur sebagai dasar pengambilan keputusan.",
    category: "Teknik",
    icon: Calculator,
  },
  {
    title: "Pemodelan & Visualisasi 3D",
    description:
      "Menerjemahkan bentuk ruang menjadi model 3D dan visualisasi yang mudah dipahami.",
    category: "Teknik",
    icon: Box,
  },
  {
    title: "AutoCAD",
    description: "Perintah dan drafting presisi untuk gambar teknik siap produksi.",
    category: "Teknik",
    icon: DraftingCompass,
  },
];

export default function CoreCompetencies() {
  return (
    <Section id="kompetensi" withBorder={false}>
      <SectionHeading
        index="03"
        eyebrow="Kompetensi Utama"
        title="Delapan kemampuan inti yang saling menopang."
      />

      <Stagger
        as="ul"
        delay={0.05}
        stagger={0.1}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {COMPETENCIES.map(({ title, description, category, icon: Icon }, index) => (
          <StaggerItem
            key={title}
            as="li"
            className="group relative flex h-full min-h-56 flex-col border border-line bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
          >
            <span
              className="pointer-events-none absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center border border-accent/40 bg-accent/10 text-accent transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:bg-accent group-hover:text-zinc-950">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] tracking-widest text-zinc-400 transition-colors group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80">
              {category}
            </p>
            <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300">
              {description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
