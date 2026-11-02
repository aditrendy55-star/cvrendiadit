import FadeIn from "@/components/motion/FadeIn";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large";
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleSize =
    size === "large"
      ? "text-3xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl"
      : "text-2xl font-bold tracking-tight sm:text-3xl";
  const marginBottom = size === "large" ? "mb-2 lg:mb-4" : "mb-8 lg:mb-12";

  return (
    <FadeIn
      as="header"
      className={`${marginBottom} flex flex-col ${alignment}`}
      amount={0.35}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
        {index && <span className="text-foreground/40">{index} / </span>}
        {eyebrow}
      </p>
      <h2 className={`mt-3 max-w-4xl ${titleSize} text-foreground`}>
        {title}
      </h2>
      <div className="mt-4 h-px w-16 bg-accent" aria-hidden="true" />
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">{description}</p>
      )}
    </FadeIn>
  );
}