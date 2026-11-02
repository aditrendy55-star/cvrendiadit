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
  icon: LucideIcon;
};

const COMPETENCIES: Competency[] = [
  {
    title: "Manajemen Operasional",
    description:
      "Mengelola alur kerja, sumber daya, dan proses harian agar target tercapai secara konsisten.",
    icon: Settings2,
  },
  {
    title: "E-Commerce Operator",
    description:
      "Operasional Shopee & TikTok Shop: listing, pricing, promosi, hingga evaluasi penjualan.",
    icon: Store,
  },
  {
    title: "Web Development",
    description:
      "Membangun website responsif dengan stack modern — frontend hingga integrasi backend.",
    icon: Code2,
  },
  {
    title: "Manajemen Proyek",
    description:
      "Merencanakan, membagi tugas, dan mengawasi proyek dari brief hingga serah terima.",
    icon: FolderKanban,
  },
  {
    title: "Gambar Teknik & DED",
    description:
      "Menghasilkan gambar kerja 2D, dokumen eksekusi desain, dan revisi sesuai brief klien.",
    icon: PencilRuler,
  },
  {
    title: "Rencana Anggaran Biaya (RAB)",
    description:
      "Menyusun estimasi material dan biaya yang terukur sebagai dasar pengambilan keputusan.",
    icon: Calculator,
  },
  {
    title: "Pemodelan & Visualisasi 3D",
    description:
      "Menerjemahkan bentuk ruang menjadi model 3D dan visualisasi yang mudah dipahami.",
    icon: Box,
  },
  {
    title: "AutoCAD",
    description: "Perintah dan drafting presisi untuk gambar teknik siap produksi.",
    icon: DraftingCompass,
  },
];

export default function CoreCompetencies() {
  return (
    <Section id="kompetensi">
      <SectionHeading
        index="02"
        eyebrow="Kompetensi Utama"
        title="Delapan kemampuan inti yang saling menopang."
        description="Kombinasi kemampuan operasional, digital, dan teknik yang bisa langsung diterapkan pada konteks proyek yang berbeda-beda."
      />

      <Stagger
        as="ul"
        delay={0.05}
        stagger={0.06}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {COMPETENCIES.map(({ title, description, icon: Icon }, index) => (
          <StaggerItem
            key={title}
            as="li"
            className="group border border-line bg-surface/50 p-6 transition-colors hover:border-accent/60"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center border border-accent/40 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-zinc-950">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-[11px] tracking-widest text-zinc-400">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
