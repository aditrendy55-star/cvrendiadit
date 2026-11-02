import { Briefcase, DraftingCompass, Monitor } from "lucide-react";
import type { ComponentType } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

type SkillGroup = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Teknik",
    icon: DraftingCompass,
    items: ["AutoCAD & SketchUp (2D/3D)", "Membaca Gambar Teknik", "RAB (Rencana Anggaran Biaya)"],
  },
  {
    title: "Digital",
    icon: Monitor,
    items: [
      "Web Development",
      "E-Commerce Management",
      "Editing Foto & Video",
      "Desain Grafis (Canva)",
    ],
  },
  {
    title: "Business / Operations",
    icon: Briefcase,
    items: [
      "Microsoft Office",
      "Administrasi & Operasional",
      "Kerja Tim",
      "Problem Solving",
      "Manajemen Operasional",
    ],
  },
];

export default function Skills() {
  return (
    <Section id="keahlian" padding="compact">
      <SectionHeading
        index="05"
        eyebrow="Keahlian"
        title="Tiga ranah yang saya kuasai."
      />

      <Stagger
        delay={0.05}
        stagger={0.1}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {SKILL_GROUPS.map(({ title, icon: Icon, items }) => (
          <StaggerItem
            key={title}
            as="article"
            className="flex flex-col border border-line bg-surface/50"
          >
            <div className="flex items-center gap-3 border-b border-line px-6 py-5">
              <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-foreground">
                {title}
              </h3>
            </div>

            <ul className="flex-1 space-y-3 px-6 py-6">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
