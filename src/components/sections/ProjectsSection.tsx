"use client";

import { useId } from "react";
import Link from "next/link";
import FeaturedProjects from "@/components/projects/FeaturedProjects";

export default function ProjectsSection() {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId} className="relative z-10 w-full">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
        <h1 id={titleId} className="m-0 text-[clamp(1.875rem,3vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">Projects</h1>
        <Link href="/projects" className="text-link rounded-sm text-sm font-semibold">View all projects</Link>
      </div>
      <div className="mt-4"><FeaturedProjects /></div>
    </section>
  );
}
