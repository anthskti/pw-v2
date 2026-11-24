"use client";

import Image from "next/image";
import { useState } from "react";
import { featuredProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const [selectedId, setSelectedId] = useState("clearup");
  const selectedProject = featuredProjects.find((project) => project.id === selectedId) ?? featuredProjects[0];

  const links = [
    selectedProject.liveSite && {
      href: selectedProject.liveSite,
      label: "Live site",
    },
    selectedProject.sourceCode && {
      href: selectedProject.sourceCode,
      label: "Source code",
    },
    selectedProject.demo && selectedProject.demo !== selectedProject.liveSite && {
      href: selectedProject.demo,
      label: "Watch demo",
    },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <div className="w-full">
      <div className="hidden grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-2 min-[56rem]:grid">
        <div role="group" aria-label="Choose a featured project" className="grid gap-2">
          {featuredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              aria-pressed={project.id === selectedId}
              onClick={() => setSelectedId(project.id)}
              className={`min-h-16 min-w-0 rounded-lg px-2 py-3 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] motion-reduce:transition-none ${project.id === selectedId ? "bg-[color-mix(in_srgb,var(--content-primary)_8%,transparent)] text-foreground" : "text-secondary hover:bg-[color-mix(in_srgb,var(--content-primary)_4%,transparent)] hover:text-foreground"}`}
            >
              <span className={`block text-base leading-snug ${project.id === selectedId ? "font-semibold underline underline-offset-4" : "font-medium"}`}>{project.title}</span>
              <span className="mt-1 block text-sm text-secondary">{project.category}</span>
            </button>
          ))}
        </div>

        <section aria-live="polite" aria-atomic="true" className="min-w-0">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
            <Image
              key={selectedProject.id}
              src={selectedProject.image}
              alt={selectedProject.imageAlt}
              fill
              sizes="(max-width: 75rem) 44vw, (max-width: 110rem) 48vw, 680px"
              loading="eager"
              className="object-contain"
            />
          </div>
          <h2 className="mt-3 mb-0 text-xl font-semibold leading-tight">{selectedProject.title}</h2>
          <p className="mt-1 mb-0 text-base leading-snug text-secondary">{selectedProject.summary}</p>
          <ul aria-label={`${selectedProject.title} technologies`} className="mt-2 mb-0 flex list-none flex-wrap gap-x-2 gap-y-0.5 p-0 text-sm leading-relaxed text-secondary">
            {selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <ul aria-label={`${selectedProject.title} project links`} className="mt-2 mb-0 flex min-h-11 list-none flex-wrap items-center gap-x-4 p-0 text-sm font-semibold">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-[var(--line)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]">
                  {link.label}<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="min-[56rem]:hidden">
        <div className="flex h-[clamp(9rem,47vw,12.5rem)] w-full items-center justify-center overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
          <Image
            key={selectedProject.id}
            src={selectedProject.image}
            alt={selectedProject.imageAlt}
            sizes="(max-width: 24.375rem) calc(100vw - 44px), 520px"
            quality={75}
            loading="eager"
            className="block h-full w-full object-contain"
          />
        </div>
        <div role="group" aria-label="Choose a featured project" className="mt-2 grid grid-cols-3 gap-2">
          {featuredProjects.map((project) => {
            const selected = project.id === selectedId;
            return (
              <button
                key={project.id}
                type="button"
                aria-label={`Show ${project.title}`}
                aria-pressed={selected}
                onClick={() => setSelectedId(project.id)}
                className={`min-h-11 min-w-0 border p-1 text-left transition-[border-color,opacity] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] motion-reduce:transition-none ${selected ? "border-[var(--content-primary)]" : "border-[var(--line)] opacity-85 hover:opacity-100"}`}
              >
                <span className="flex h-12 items-center justify-center overflow-hidden bg-[var(--surface)]">
                  <Image
                    src={project.image}
                    alt=""
                    sizes="(max-width: 24.375rem) 29vw, 150px"
                    quality={75}
                    loading={selected ? "eager" : "lazy"}
                    className="block h-full w-full object-contain"
                  />
                </span>
                <span className="mt-1 block text-center text-sm font-semibold leading-tight text-foreground">{project.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section aria-live="polite" aria-atomic="true" className="mt-3 min-w-0 min-[56rem]:hidden">
        <h2 className="m-0 text-xl font-semibold leading-tight">{selectedProject.title}</h2>
        <p className="mt-1 mb-0 text-base leading-snug text-secondary">{selectedProject.summary}</p>
        <ul aria-label={`${selectedProject.title} technologies`} className="mt-2 mb-0 hidden list-none flex-wrap gap-x-2 gap-y-0.5 p-0 text-sm leading-relaxed text-secondary min-[56rem]:flex">
          {selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <details className="mt-2 text-sm text-secondary min-[56rem]:hidden">
          <summary className="min-h-11 cursor-pointer py-2 font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]">Built with</summary>
          <ul aria-label={`${selectedProject.title} technologies`} className="mt-1 mb-0 flex list-none flex-wrap gap-x-2 gap-y-0.5 p-0 leading-relaxed">
            {selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </details>
        <ul aria-label={`${selectedProject.title} project links`} className="mt-2 mb-0 flex min-h-11 list-none flex-wrap items-center gap-x-4 gap-y-0 p-0 text-sm font-semibold">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-[var(--line)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]">
                {link.label}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
