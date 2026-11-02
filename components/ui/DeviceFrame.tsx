import type { ReactNode } from "react";

type DeviceFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function DeviceFrame({ children, className = "" }: DeviceFrameProps) {
  return (
    <div
      className={`relative aspect-[16/12] overflow-hidden rounded-[28px] border border-white/15 bg-black/40 p-2 backdrop-blur-lg sm:p-3 md:p-4 ${className}`}
    >
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}
