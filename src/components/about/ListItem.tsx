import type { ReactNode } from "react";

export default function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="group relative flex min-w-0 items-start gap-4 pl-4 transition-transform duration-200 hover:translate-x-1">
      <span aria-hidden="true" className="absolute left-0 top-[13px] h-[2px] w-2 bg-primary transition-transform duration-300 group-hover:rotate-90" />
      <span aria-hidden="true" className="absolute left-0 top-[13px] h-[2px] w-2 bg-primary transition-transform duration-300 group-hover:rotate-180" />
      <div className="min-w-0 flex-1 break-words leading-relaxed text-secondary">{children}</div>
    </li>
  );
}
