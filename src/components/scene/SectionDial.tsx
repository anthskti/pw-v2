import { dialSections } from "@/data/site";

const sectionPositionClasses = {
  about: "top-[10.5%] left-[29%] text-foreground font-semibold",
  projects: "top-[26%] right-[5%] font-medium text-secondary max-[38rem]:right-0",
  edits: "right-[5%] bottom-[26%] font-medium text-secondary max-[38rem]:right-0",
  writing: "bottom-[10.5%] left-[29%] font-medium text-secondary",
  contact: "top-[49%] left-[3.5%] font-medium text-secondary max-[38rem]:left-0",
} as const;

export default function SectionDial() {
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[720px] max-[56rem]:max-w-[540px] max-[38rem]:max-w-[420px]" aria-label="Portfolio sections">
      <div className="absolute inset-[7%] rounded-full border border-[var(--line)] max-[38rem]:inset-[5%]" aria-hidden="true" />
      <ol className="absolute inset-0 m-0 list-none p-0" aria-label="Sections">
        {dialSections.map((section) => (
          <li
            className={`absolute z-[1] whitespace-nowrap text-[clamp(0.875rem,1.25vw,1rem)] leading-[1.4] max-[56rem]:text-[clamp(0.875rem,3.5vw,1rem)] ${sectionPositionClasses[section.id]}`}
            key={section.id}
            aria-current={section.id === "about" ? "true" : undefined}
          >
            {section.label}
          </li>
        ))}
      </ol>
      <picture className="absolute top-1/2 left-1/2 block aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <source
          srcSet="/identity/initial1.png"
          media="(prefers-color-scheme: dark)"
        />
        <img src="/identity/initial2.png" alt="Anthony Pham monogram" width={900} height={900} className="block h-full w-full object-contain" />
      </picture>
      <figcaption className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]">
        Portfolio sections, with About selected.
      </figcaption>
    </figure>
  );
}
