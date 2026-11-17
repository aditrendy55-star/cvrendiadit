"use client";

import type { ReactNode } from "react";
import { usePerformanceMode } from "@/components/motion/MotionProvider";

type DeviceFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function DeviceFrame({ children, className = "" }: DeviceFrameProps) {
  const performanceMode = usePerformanceMode();
  const performanceClasses =
    performanceMode === "lite"
      ? "bg-zinc-950/95 backdrop-blur-none"
      : "bg-black/40 backdrop-blur-lg";

  return (
    <div
      className={`relative aspect-[16/12] overflow-hidden rounded-[28px] border border-white/15 p-2 sm:p-3 md:p-4 ${performanceClasses} ${className}`}
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
