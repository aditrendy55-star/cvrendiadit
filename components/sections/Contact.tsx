import type { ComponentType } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/motion/FadeIn";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import MagneticButton from "@/components/motion/MagneticButton";

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// TODO: ganti dengan data kontak asli
const CONTACTS: ContactItem[] = [
  {
    label: "Email",
    value: "rendi.atmaja@example.com",
    href: "mailto:rendi.atmaja@example.com",
    icon: Mail,
  },
  {
    label: "Telepon",
    value: "+62 812-0000-0000",
    href: "tel:+6281200000000",
    icon: Phone,
  },
  {
    label: "Instagram",
    value: "@rendi.atmaja",
    href: "https://www.instagram.com/rendi.atmaja",
    icon: InstagramGlyph,
  },
];

export default function Contact() {
  return (
    <>
      <Section id="kontak" withBorder={false}>
        <FadeIn
          as="div"
          amount={0.15}
          className="relative overflow-hidden border border-accent/30 bg-surface/60 p-7 sm:p-10 lg:p-14"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
            aria-hidden="true"
          />

          <SectionHeading
            index="07"
            eyebrow="Contact"
            title="Punya proyek? Mari wujudkan bersama."
            description="Terbuka untuk kolaborasi proyek operasional, e-commerce, pengembangan website, maupun gambar teknik. Kirim brief-nya, kita diskusikan."
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <Stagger as="ul" delay={0.1} stagger={0.09} className="flex flex-col gap-4">
              {CONTACTS.map(({ label, value, href, icon: Icon }) => (
                <StaggerItem as="li" key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 border border-line bg-background/50 px-5 py-4 transition-colors hover:border-accent/60"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground group-hover:text-accent">
                        {value}
                      </span>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <FadeIn delay={0.25} className="flex flex-col justify-center gap-5">
              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                Butuh tangan tambahan yang bisa masuk cepat ke konteks proyek dan mengubahnya
                menjadi hasil kerja yang rapi? Mari bicara.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MagneticButton
                  href="mailto:rendi.atmaja@example.com"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-accent-strong"
                  aria-label="Kirim Email"
                >
                  Kirim Email
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
                <a
                  href="https://wa.me/6281200000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-line px-6 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Chat WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </Section>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 M. Rendi Adhitya Atmaja Putra</span>
          <span>Operations · Digital · Technical Drafting</span>
        </div>
      </footer>
    </>
  );
}
