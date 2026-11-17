"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  embedded?: boolean;
};

const DRAG_SNAP_PROJECTION = 0.15;
const DESKTOP_QUERY = "(min-width: 1024px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(DESKTOP_QUERY);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

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
          <h3 className="text-base font-semibold text-foreground sm:text-lg">
            {item.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {item.meta}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DesktopScroll({ items, embedded = false }: Props) {
  const [index, setIndex] = useState(0);
  const transition = useSnapTransition();

  return (
    <div className="h-full min-h-0 [perspective:1000px]">
      <DeviceFrame
        className={`pf-device-frame ${
          embedded ? "pf-embedded-drawing-frame h-full" : "[transform-origin:bottom]"
        }`}
      >
        <div className="flex h-full w-full gap-2">
          {items.map((item, i) => {
            const isActive = i === index;

            return (
              <motion.button
                key={item.title}
                layout
                type="button"
                transition={transition}
                onClick={() => setIndex(i)}
                aria-label={`Tampilkan ${item.title}`}
                aria-current={isActive ? "true" : "false"}
                className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 transition-colors duration-300 ${
                  isActive
                    ? "flex-1 cursor-default"
                    : "w-16 shrink-0 cursor-pointer lg:w-[15.5%]"
                }`}
              >
                <div className="absolute inset-0">
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
                </div>
            </motion.button>
            );
          })}
        </div>
        </DeviceFrame>
      </div>
    );
  }

  function MobileSwipe({ items, embedded = false }: Props) {
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
      <div className={embedded ? "flex h-full min-h-0 flex-col" : ""}>
        <DeviceFrame
          className={`pf-device-frame ${
            embedded ? "pf-embedded-drawing-frame min-h-0 flex-1" : ""
          }`}
        >
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

    export default function DrawingsCoverflow({ items, embedded = false }: Props) {
      const isDesktop = useIsDesktop();

      return isDesktop ? (
        <DesktopScroll items={items} embedded={embedded} />
      ) : (
        <MobileSwipe items={items} embedded={embedded} />
      );
        }