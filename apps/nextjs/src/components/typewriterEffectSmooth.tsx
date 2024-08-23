"use client";

import { TextGenerateEffect } from "@saasfly/ui/typewriter-effect";

// See: https://ui.aceternity.com/components/typewriter-effect
// but code is quite different for the TypewriterEffectSmooths function
export function TypewriterEffectSmooths() {
  const words = [
    {
      text: "Solve",
    },
    {
      text: "business",
    },
    {
      text: "problems",
    },
    {
      text: "faster",
    },
    {
      text: "and",
    },
    {
      text: "better",
    },
    {
      text: "with",
    },
    {
      text: "Substantifik.",
      className: "text-blue-500",
    },
  ];
  return (
    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </p>
  );
}
