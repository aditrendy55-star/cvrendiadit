import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import TiltCard from "@/components/motion/TiltCard";
import MagneticButton from "@/components/motion/MagneticButton";
import Spotlight from "@/components/motion/Spotlight";
import TypewriterText from "@/components/motion/TypewriterText";

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <Spotlight size={300} color="rgba(251, 191, 36, 0.15)">
        <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-14 sm:px-8 lg:pt-32 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <FadeIn mount delay={0.08} className="text-sm uppercase tracking-widest text-accent">
              <TypewriterText text="Hello, I am" startDelay={120} speed={85} />
            </FadeIn>

            <FadeIn
              mount
              delay={1.2}
              fromX={-28}
              fromY={0}
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-400"
            >
              Operations · Digital · Technical Drafting
            </FadeIn>

            <FadeIn
              mount
              delay={1.8}
              className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tighter text-foreground sm:text-6xl lg:text-[3rem]"
            >
              <TypewriterText
                text="M. Rendi Adhitya Atmaja Putra"
                startDelay={1_900}
                speed={58}
              />
            </FadeIn>

            <FadeIn
              mount
              delay={3.9}
              className="mt-6 border-l-2 border-accent pl-4 text-base font-medium text-zinc-300 sm:text-lg"
            >
              <span className="text-accent">Operations &amp; Digital Specialist</span>
              <span className="text-zinc-400"> | </span>
              Technical Drafter
            </FadeIn>

            <FadeIn
              mount
              delay={4.05}
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              Menerjemahkan kebutuhan teknis dan operasional menjadi hasil kerja yang
              terstruktur — dari gambar teknik, pengelolaan e-commerce, hingga pengembangan
              website.
            </FadeIn>

            <FadeIn mount delay={4.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href="#portofolio"
                className="inline-flex h-12 items-center justify-center gap-2 bg-accent px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-accent-strong"
                aria-label="Lihat Portofolio"
              >
                Lihat Portofolio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <a
                href="#kontak"
                className="inline-flex h-12 items-center justify-center gap-2 border border-accent px-6 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-zinc-950"
              >
                Hubungi Saya
              </a>
            </FadeIn>
          </div>

          <FadeIn
            mount
            delay={3.9}
            fromY={-48}
            className="relative mx-auto w-full max-w-sm lg:max-w-[26rem]"
          >
            <TiltCard>
              <div className="relative border border-line bg-surface p-3">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/foto-diri.jpeg"
                    alt="Foto diri M. Rendi Adhitya Atmaja Putra"
                    width={960}
                    height={1280}
                    preload
                    sizes="(min-width: 1024px) 416px, (min-width: 640px) 384px, 100vw"
                    className="h-full w-full object-cover object-top grayscale-[0.15]"
                  />
                </div>
                <span
                  className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-accent"
                  aria-hidden="true"
                />
                <span
                  className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-accent"
                  aria-hidden="true"
                />
              </div>
            </TiltCard>
          </FadeIn>
        </div>

        <FadeIn mount delay={0.75} className="mt-12 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-400 lg:flex">
          <a
            href="#profil"
            className="group inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-accent"
            aria-label="Gulir ke Profil"
          >
            <ArrowDown className="h-4 w-4 text-accent group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
            Gulir ke Profil
          </a>
        </FadeIn>
      </div>
      </Spotlight>
    </section>
  );
}
