import type { ReactNode } from "react";

export default function ArrowItem({ children }: { children: ReactNode }) {
  return (
    <li className="group/item relative flex min-w-0 items-start gap-4">
      <span aria-hidden="true" className="absolute -left-5 top-0 shrink-0 text-secondary">↳</span>
      <span className="min-w-0 flex-1 break-words">{children}</span>
    </li>
  );
}
