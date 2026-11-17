"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterTextProps = {
  text: string;
  startDelay?: number;
  speed?: number;
  className?: string;
  "aria-label"?: string;
};

export default function TypewriterText({
  text,
  startDelay = 0,
  speed = 70,
  className = "",
  "aria-label": ariaLabel,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const [visibleText, setVisibleText] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (reduceMotion) return;

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let characterIndex = 0;
      interval = window.setInterval(() => {
        characterIndex += 1;
        setVisibleText(text.slice(0, characterIndex));

        if (characterIndex >= text.length && interval) {
          window.clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [reduceMotion, speed, startDelay, text]);

  const displayedText = reduceMotion ? text : visibleText;

  return (
    <span aria-label={ariaLabel ?? text} className={className}>
      <span aria-hidden="true">{displayedText}</span>
      {!reduceMotion && displayedText.length < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.12em] animate-pulse bg-current" aria-hidden="true" />
      )}
    </span>
  );
}
