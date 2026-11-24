import Image from "next/image";
import { clearupProject, type Project } from "@/data/projects";
import ProjectLinks from "@/components/projects/ProjectLinks";

export default function ProjectPresentation({ project = clearupProject }: { project?: Project }) {
  return (
    <article aria-labelledby={`${project.id}-title`} className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(17rem,1fr)] lg:gap-[clamp(40px,6vw,96px)]">
      <div className="relative overflow-hidden bg-black/5 dark:bg-white/5">
        <Image
          src={project.image}
          alt={project.imageAlt}
          sizes="(max-width: 64rem) calc(100vw - 44px), (max-width: 110rem) 55vw, 900px"
          className="h-auto w-full"
          loading={project.id === "clearup" ? "eager" : "lazy"}
        />
      </div>

      <div className="min-w-0 pt-1">
        <p className="m-0 text-sm font-medium text-secondary">{project.category}</p>
        <h2 id={`${project.id}-title`} className="mt-3 mb-0 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] sm:text-5xl">
          {project.title}
        </h2>
        <p className="mt-6 mb-0 max-w-[38rem] text-base leading-[1.7] text-secondary sm:text-lg">
          {project.description}
        </p>

        <div className="mt-8">
          <h3 className="m-0 text-sm font-semibold">Built with</h3>
          <ul className="mt-3 mb-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-sm leading-6 text-secondary">
            {project.technologies.map((technology, index) => (
              <li key={technology}>
                {technology}
                {index < project.technologies.length - 1 ? <span aria-hidden="true"> · </span> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
