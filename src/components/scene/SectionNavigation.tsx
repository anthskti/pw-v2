import type { KeyboardEventHandler } from "react";
import { stops } from "@/components/scene/scene-sections";

type SectionNavigationProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  onKeyDown: KeyboardEventHandler<HTMLAnchorElement>;
};

export default function SectionNavigation({ activeIndex, onSelect, onKeyDown }: SectionNavigationProps) {
  return (
    <nav aria-label="Portfolio sections" className="relative z-30 flex flex-wrap gap-x-5 gap-y-1 text-sm">
      {stops.map((stop, index) => (
        <a
          key={stop.id}
          href={`#${stop.id}`}
          aria-current={activeIndex === index ? "page" : undefined}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onSelect(index);
          }}
          onKeyDown={onKeyDown}
          className={`min-h-11 rounded-sm py-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--focus)] ${activeIndex === index ? "font-semibold text-foreground underline" : "text-secondary hover:text-foreground"}`}
        >
          {stop.label}
        </a>
      ))}
    </nav>
  );
}
