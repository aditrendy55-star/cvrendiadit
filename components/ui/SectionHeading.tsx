import ScrollReveal, { ScrollRevealItem } from "@/components/motion/ScrollReveal";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <ScrollReveal delay={0.1} stagger={0.1} className={`mb-8 flex flex-col lg:mb-12 ${alignment}`}>
      <ScrollRevealItem as="p" className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
        {index && <span className="text-foreground/40">{index} / </span>}
        {eyebrow}
      </ScrollRevealItem>
      <ScrollRevealItem as="h2" className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {title}
      </ScrollRevealItem>
      <ScrollRevealItem as="div" className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />
      {description && (
        <ScrollRevealItem as="p" className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
          {description}
        </ScrollRevealItem>
      )}
    </ScrollReveal>
  );
}
