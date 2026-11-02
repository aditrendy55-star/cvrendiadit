"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import DeviceFrame from "@/components/ui/DeviceFrame";

type DrawingsItem = {
  title: string;
  meta: string;
  image: string;
  alt: string;
};

type Props = {
  items: DrawingsItem[];
};

const DRAG_SNAP_PROJECTION = 0.15;

function useSnapTransition(): Transition {
  const reduceMotion = useReducedMotion();
  return reduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 30 };
}

function Caption({ item }: { item: DrawingsItem }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-5 text-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        >
          <h3 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {item.meta}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DesktopStrip({ items }: Props) {
  const [index, setIndex] = useState(0);
  const transition = useSnapTransition();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    let cancelled = false;
    let loaded = false;
    let mm: { revert: () => void } | undefined;

    const setup = async () => {
      if (!mq.matches || loaded || cancelled) return;
      loaded = true;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const media = gsap.matchMedia();
      mm = media;
      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.registerPlugin(ScrollTrigger);
          const frame = wrap.firstElementChild as HTMLElement | null;
          const trigger = wrap.closest("#portofolio");
          if (!frame || !trigger) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              id: "pf-frame-entrance",
              trigger,
              start: "top 60%",
              end: "+=900",
              scrub: 0.5,
            },
          });

          tl.fromTo(
            frame,
            { rotationX: 22, scale: 0.96, transformOrigin: "50% 100%" },
            {
              rotationX: 0,
              scale: 1,
              transformOrigin: "50% 100%",
              ease: "sine.inOut",
              duration: 1,
              onStart: () => frame.classList.add("gsap-animating"),
              onComplete: () => frame.classList.remove("gsap-animating"),
            },
            0,
          );

          return () => {
            ScrollTrigger.getById("pf-frame-entrance")?.kill();
          };
        },
      );
    };

    setup();
    mq.addEventListener("change", setup);

    return () => {
      cancelled = true;
      mq.removeEventListener("change", setup);
      mm?.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} className="[perspective:1000px]">
      <DeviceFrame className="[transform-origin:bottom]">
        <div className="flex h-full w-full gap-2">
          {items.map((item, i) => {
            const isActive = i === index;

            return (
              <motion.button
                key={item.title}
                type="button"
                transition={transition}
                onClick={() => setIndex(i)}
                aria-label={`Tampilkan ${item.title}`}
                aria-current={isActive ? "true" : "false"}
                className={`relative h-full overflow-hidden border border-white/10 transition-all duration-500 ease-out ${
                  isActive ? "flex-1 cursor-default" : "w-16 shrink-0 cursor-pointer"
                }`}
              >
                <motion.div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                    className="h-full w-full object-cover"
                  />
                  {isActive ? (
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 via-background/40 to-transparent p-4 pt-12">
                      <h3 className="text-sm font-semibold text-foreground sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300">
                        {item.meta}
                      </p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-background/55 px-1 py-4 text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur-[2px] [writing-mode:vertical-rl]">
                        {item.title}
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </DeviceFrame>
    </div>
  );
}

function MobileSwipe({ items }: Props) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const transition = useSnapTransition();
  const maxIndex = items.length - 1;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => setWidth(el.clientWidth);
    measure();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (width > 0) x.set(-indexRef.current * width);
  }, [width, x]);

  const snapTo = (next: number) => {
    indexRef.current = next;
    setIndex(next);
    animate(x, -next * width, transition);
  };

  return (
    <div>
      <DeviceFrame>
        <div ref={containerRef} className="pf-swipe h-full w-full overflow-hidden">
          <motion.div
            className="flex h-full cursor-grab active:cursor-grabbing"
            style={{ x, width: `${items.length * 100}%` }}
            drag="x"
            dragConstraints={{ left: -maxIndex * width, right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (width === 0) return;
              const projected = info.offset.x + info.velocity.x * DRAG_SNAP_PROJECTION;
              const next = Math.min(
                maxIndex,
                Math.max(0, Math.round(index - projected / width)),
              );
              snapTo(next);
            }}
          >
            {items.map((item) => (
              <div
                key={item.title}
                className="h-full shrink-0"
                style={{ width: `${100 / items.length}%` }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </DeviceFrame>

      <Caption item={items[index]} />
    </div>
  );
}

export default function DrawingsCoverflow({ items }: Props) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopStrip items={items} />
      </div>
      <div className="lg:hidden">
        <MobileSwipe items={items} />
      </div>
    </>
  );
}
