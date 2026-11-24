import Link from "@/components/Link";
import { clearupProject, type Project } from "@/data/projects";

export default function ProjectLinks({ project = clearupProject }: { project?: Project }) {
  return (
    <nav aria-label={`${project.title} links`} className="flex flex-wrap gap-x-8 gap-y-3">
      {project.liveSite && <Link href={project.liveSite} newTab className="inline-flex min-h-11 items-center font-semibold">
        Live site <span className="sr-only"> (opens in a new tab)</span>
      </Link>}
      {project.sourceCode && <Link href={project.sourceCode} newTab className="inline-flex min-h-11 items-center font-semibold">
        Source code <span className="sr-only"> (opens in a new tab)</span>
      </Link>}
      {project.demo && project.demo !== project.liveSite && <Link href={project.demo} newTab className="inline-flex min-h-11 items-center font-semibold">
        Watch demo <span className="sr-only"> (opens in a new tab)</span>
      </Link>}
    </nav>
  );
}
