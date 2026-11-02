"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EASE } from "@/components/motion/motion-utils";
import Spotlight from "@/components/motion/Spotlight";

const NAV_LINKS = [
  { href: "#profil", label: "Profil" },
  { href: "#kompetensi", label: "Kompetensi" },
  { href: "#pengalaman", label: "Pengalaman" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#pendidikan", label: "Pendidikan" },
  { href: "#kontak", label: "Kontak" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-line bg-background/95 shadow-[0_1px_0_0_rgba(251,191,36,0.12)] backdrop-blur-lg"
          : "border-line/50 bg-background/75 backdrop-blur-md"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-20 right-1/4 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[60px]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-[0.16]" style={{
        backgroundImage: 'linear-gradient(rgba(246,244,240,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(246,244,240,0.06) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 80%)'
      }} />
      <Spotlight size={180} color="rgba(251, 191, 36, 0.15)">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
          <a
            href="#beranda"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center border border-accent/60 font-mono text-xs font-bold text-accent">
              MR
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-foreground sm:block">
              M. Rendi Adhitya A. P.
            </span>
          </a>

          <nav className="hidden md:block" aria-label="Navigasi utama">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative px-3 py-2 text-sm transition-colors hover:text-accent ${
                        isActive ? "text-accent" : "text-zinc-400"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                          transition={{ duration: 0.25, ease: EASE }}
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li className="ml-3">
                <a
                  href="#kontak"
                  className="inline-flex h-9 items-center border border-accent bg-accent px-4 text-sm font-semibold text-zinc-950 transition-colors hover:border-accent-strong hover:bg-accent-strong"
                >
                  Hubungi
                </a>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="nav-toggle-mobile flex h-10 w-10 items-center justify-center border border-line text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Spotlight>

      <motion.nav
        id="menu-mobile"
        aria-label="Navigasi mobile"
        initial={{ height: 0, opacity: 0, visibility: "hidden" }}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
        }}
        transition={{
          height: { duration: reduceMotion ? 0 : 0.25, ease: EASE },
          opacity: { duration: reduceMotion ? 0 : 0.25, ease: EASE },
          visibility: reduceMotion
            ? { duration: 0 }
            : open
              ? { duration: 0 }
              : { duration: 0, delay: 0.25 },
        }}
        className={`overflow-hidden bg-background md:hidden ${open ? "border-t border-line" : ""}`}
      >
        <ul className="mx-auto w-full max-w-6xl px-6 py-3 sm:px-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-line/60 py-3 text-sm last:border-b-0 ${
                    isActive ? "text-accent" : "text-zinc-300 hover:text-accent"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rotate-45 bg-accent" aria-hidden="true" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </motion.nav>
    </header>
  );
}
