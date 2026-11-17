import type { KeyboardEventHandler, ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withBorder?: boolean;
  padding?: "default" | "compact" | "tight";
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  tabIndex?: number;
};

export default function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  withBorder = true,
  padding = "default",
  onKeyDown,
  tabIndex,
}: SectionProps) {
  const paddingClass =
    padding === "tight"
      ? "py-4 lg:py-6"
      : padding === "compact"
        ? "py-8 lg:py-12"
        : "py-16 lg:py-20";
  return (
    <section
      id={id}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      className={`scroll-mt-24 ${withBorder ? "border-t border-line/60" : ""} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-6 ${paddingClass} sm:px-8 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
