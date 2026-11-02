import type { ReactNode } from "react";

type DeviceFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function DeviceFrame({ children, className = "" }: DeviceFrameProps) {
  return (
    <div
      className={`relative aspect-[16/12] overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 backdrop-blur-lg sm:p-8 lg:p-10 lg:min-h-[780px] ${className}`}
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
