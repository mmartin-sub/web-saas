"use client";

import React from "react";

import { WobbleCard } from "@saasfly/ui/wobble-card";

export function WobbleCardShow() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-s">
          <h2 className="text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-2xl">
            Streamline your AI experience.
          </h2>
          <p className="mt-3 text-left text-base/6 text-neutral-200">
            {`
          With an AI by your side, you're not just solving problems; you're unlocking a universe of possibilities!
          `}
          </p>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-2xl">
          Philosophy
        </h2>
        <p className="mt-3 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          {`
        Artificial Intelligence: Humanity's Partner in Crafting the Future.
        `}
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[300px] lg:min-h-[400px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm text-balance  text-left text-base font-semibold tracking-[-0.015em] text-white md:max-w-lg md:text-xl lg:text-2xl">
            Stay up to date
          </h2>
          <p className="mt-3 max-w-[26rem] text-left text-base/6 text-neutral-200">
            Our dedication to excellence is unwavering, and we are constantly
            enhancing our solutions to ensure we offer the premier AI platform
            that caters precisely to your requirements. Your satisfaction is our
            priority, and we are committed to evolving our services to align
            with your evolving needs.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
