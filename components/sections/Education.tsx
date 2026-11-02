import { GraduationCap, Users } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";

const ORGANIZATIONS = [
  "Staff Divisi Kreatif — UKM Sriwijaya ITERA",
  "Staff Lapangan — ITERA Berpijar",
  "Staff Divisi Operasional — UKM Seni Musik ITERA",
];

export default function Education() {
  return (
    <Section id="pendidikan">
      <SectionHeading
        index="06"
        eyebrow="Pendidikan & Organisasi"
        title="Fondasi akademik dan pengalaman organisasi."
      />

      <Stagger delay={0.05} stagger={0.12} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StaggerItem as="article" className="border border-line bg-surface/50 p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              Pendidikan
            </span>
          </div>
          <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
            SMK Negeri 2 Palembang
          </h3>
          <p className="mt-1 text-sm text-zinc-400">Teknik Gambar Bangunan</p>
          <p className="mt-4 font-mono text-xs tracking-widest text-accent">2016 – 2019</p>
        </StaggerItem>

        <StaggerItem as="article" className="border border-line bg-surface/50 p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
              <Users className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400">
              Organisasi
            </span>
          </div>
          <ul className="mt-4 space-y-3">
            {ORGANIZATIONS.map((org) => (
              <li
                key={org}
                className="flex items-start gap-3 border-b border-line/60 pb-3 text-sm text-zinc-300 last:border-b-0 last:pb-0"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                {org}
              </li>
            ))}
          </ul>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
