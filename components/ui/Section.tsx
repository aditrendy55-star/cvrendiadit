import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withBorder?: boolean;
};

export default function Section({
  id,
  children,
  className = "",
  containerClassName = "",
  withBorder = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 ${withBorder ? "border-t border-line/60" : ""} ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:py-20 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
