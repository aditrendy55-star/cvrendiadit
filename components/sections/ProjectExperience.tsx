import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

type Experience = {
  org: string;
  role: string;
  period: string;
  category: string;
  bullets: string[];
};

// Urut: konteks operasional & digital lebih dulu, teknik/freelance di akhir.
const EXPERIENCES: Experience[] = [
  {
    org: "IAGARAGE Carwash & Cafe",
    role: "E-Commerce & Digital Operations",
    period: "Jul – Sep 2026",
    category: "E-Commerce & Operations",
    bullets: [
      "Mengelola Shopee Shop & TikTok Shop dari listing hingga fulfillment.",
      "Menyusun pricing strategy dan program promosi marketplace.",
      "Evaluasi penjualan berkala untuk menentukan langkah berikutnya.",
      "Desain visual & konten marketplace (foto produk, banner, caption).",
    ],
  },
  {
    org: "CepotTech",
    role: "Project Tim",
    period: "Des 2025 – sekarang",
    category: "Web & Tim",
    bullets: [
      "Pengembangan website klien sesuai brief dan kebutuhan bisnis.",
      "Manajemen operasional tim: pembagian tugas dan progres proyek.",
      "Produksi konten digital untuk kebutuhan promosi.",
    ],
  },
  {
    org: "LampungNEW",
    role: "Project Tim",
    period: "Jan 2026 – sekarang",
    category: "Konten & Web",
    bullets: [
      "Riset konten wisata sebagai dasar penyusunan artikel dan video.",
      "Frontend & backend dasar website.",
      "Produksi konten video dan foto di lapangan.",
    ],
  },
  {
    org: "Usaha Roti Bakar WayHalim",
    role: "Business & Operations",
    period: "Jan – Agu 2026",
    category: "Bisnis & Operations",
    bullets: [
      "Pengelolaan operasional harian usaha.",
      "Pencatatan dan pengelolaan keuangan.",
      "Pengelolaan merchant ShopeeFood & GoFood.",
    ],
  },
  {
    org: "Website IAGARAGE Carwash",
    role: "Project Tim",
    period: "Feb – Mar 2026",
    category: "Web Project",
    bullets: [
      "Pengembangan frontend website.",
      "Implementasi fitur produk, distributor, dan blog.",
      "Kolaborasi tim dari desain hingga deployment.",
    ],
  },
  {
    org: "Freelance Technical Drawing & AutoCAD",
    role: "Technical Drafter",
    period: "2022 – 2025",
    category: "Teknik",
    bullets: [
      "Pembuatan gambar teknik 2D berdasarkan brief klien.",
      "Penyusunan DED (Dokumen Eksekusi Desain).",
      "Revisi gambar sesuai masukan dan perubahan kebutuhan.",
    ],
  },
];

export default function ProjectExperience() {
  return (
    <Section id="pengalaman">
      <SectionHeading
        index="03"
        eyebrow="Pengalaman Proyek"
        title="Konteks kerja yang beragam, hasil yang terukur."
        description="Pengalaman proyek diurutkan mulai dari konteks operasional & digital, lalu pengembangan web, dan terakhir praktik teknik."
      />

      <Stagger
        as="ol"
        delay={0.05}
        stagger={0.1}
        className="relative ml-1.5 border-l border-line pl-8 sm:pl-10"
      >
        {EXPERIENCES.map((item) => (
          <StaggerItem
            as="li"
            key={item.org + item.period}
            className="relative pb-8 last:pb-0"
          >
            <span
              className="absolute -left-[41px] top-6 h-3 w-3 rotate-45 border border-accent bg-background sm:-left-[49px]"
              aria-hidden="true"
            />

            <article className="border border-line bg-surface/50 p-6 transition-colors hover:border-accent/50 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {item.category}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400">
                  {item.period}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {item.org}
              </h3>
              <p className="mt-1 text-sm font-medium text-zinc-400">{item.role}</p>

              <ul className="mt-4 space-y-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
