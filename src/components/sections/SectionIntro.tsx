"use client";

import { useId, type ReactNode } from "react";
import { scenePreviews } from "@/data/dial-content";

type SectionIntroProps = {
  sectionId: "about" | "edits" | "writing" | "contact";
  children?: ReactNode;
};

export default function SectionIntro({ sectionId, children }: SectionIntroProps) {
  const titleId = useId();
  const preview = scenePreviews[sectionId];
  return (
    <section aria-labelledby={titleId} className="relative z-10 w-full max-w-[43rem]">
      <p className="mb-3 text-sm tracking-[0.035em] text-secondary">{sectionId[0].toUpperCase() + sectionId.slice(1)}</p>
      <h1 id={titleId} className="m-0 max-w-[16ch] text-[clamp(1.875rem,3vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] max-[38rem]:text-[1.875rem]">{preview.title}</h1>
      <p className="mt-3 mb-0 max-w-[38rem] text-base leading-[1.55] text-secondary">{preview.description}</p>
      {children}
    </section>
  );
}
