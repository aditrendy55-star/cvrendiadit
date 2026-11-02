import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import Stagger from "@/components/motion/Stagger";
import StaggerItem from "@/components/motion/StaggerItem";
import TiltCard from "@/components/motion/TiltCard";
import MagneticButton from "@/components/motion/MagneticButton";
import ParallaxGlow from "@/components/motion/ParallaxGlow";

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <ParallaxGlow intensity={0.12} radius={350} color="rgba(251, 191, 36, 0.12)">
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Stagger mount delay={0.05} stagger={0.08} amount={0}>
            <StaggerItem
              as="p"
              className="text-sm uppercase tracking-widest text-accent"
            >
              Hello, I am
            </StaggerItem>

            <StaggerItem
              as="p"
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-400"
            >
              Operations · Digital · Technical Drafting
            </StaggerItem>

            <StaggerItem
              as="h1"
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl"
            >
              M. Rendi Adhitya Atmaja Putra
            </StaggerItem>

            <StaggerItem
              as="p"
              className="mt-6 border-l-2 border-accent pl-4 text-base font-medium text-zinc-300 sm:text-lg"
            >
              <span className="text-accent">Operations &amp; Digital Specialist</span>
              <span className="text-zinc-400"> | </span>
              Technical Drafter
            </StaggerItem>

            <StaggerItem
              as="p"
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              Menerjemahkan kebutuhan teknis dan operasional menjadi hasil kerja yang
              terstruktur — dari gambar teknik, pengelolaan e-commerce, hingga pengembangan
              website.
            </StaggerItem>

            <StaggerItem as="div" className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            </StaggerItem>
          </Stagger>

          <FadeIn mount delay={0.45} className="relative mx-auto w-full max-w-sm lg:max-w-[26rem]">
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
      </ParallaxGlow>
    </section>
  );
}
