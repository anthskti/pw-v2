import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProjectPresentation from "@/components/projects/ProjectPresentation";
import { featuredProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Anthony Pham",
  description: "Selected software projects by Anthony Pham, a software engineer in Toronto.",
};

export default function ProjectsPage() {
  return (
    <div className="relative isolate min-h-screen min-h-[100svh] px-[clamp(24px,4.45vw,64px)] pt-7 pb-6 max-sm:px-[22px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_48%,rgba(145,145,145,0.06),transparent_48%)]"
      />
      <div className="mx-auto flex min-h-[calc(100svh-3.25rem)] w-full max-w-[1600px] flex-col">
        <header className="flex flex-wrap items-baseline justify-between gap-5 max-sm:items-start" aria-label="Site identity and navigation">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm leading-[1.4] text-secondary max-sm:gap-x-2.5">
            <p className="m-0 font-semibold text-foreground">Anthony Pham</p>
            <p className="m-0">Toronto, Canada</p>
          </div>
          <Link
            href="/#projects"
            scroll={false}
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-medium text-foreground underline decoration-secondary decoration-1 underline-offset-[0.2em] hover:decoration-2 focus-visible:rounded-sm focus-ring"
          >
            Back to scene
          </Link>
        </header>

        <main className="mt-[clamp(56px,9vh,104px)] mb-[clamp(56px,9vh,104px)]">
          <div className="mb-9 sm:mb-12">
            <p className="m-0 text-sm font-medium text-secondary">Selected work</p>
            <h1 className="mt-2 mb-0 text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.045em]">Projects</h1>
          </div>
          <div className="grid gap-20 sm:gap-28">
            {featuredProjects.map((project) => <ProjectPresentation key={project.id} project={project} />)}
          </div>
        </main>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
