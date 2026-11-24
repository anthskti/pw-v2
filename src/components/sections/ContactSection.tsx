import SectionIntro from "@/components/sections/SectionIntro";
import { siteLinks } from "@/data/site";

export default function ContactSection() {
  return (
    <SectionIntro sectionId="contact">
      <ul aria-label="Contact links" className="mt-3 mb-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
        {siteLinks.filter((link) => link.label !== "Resume").map((link) => (
          <li key={link.label}>
            <a href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noreferrer" : undefined} className="inline-flex min-h-11 items-center text-sm font-semibold underline decoration-[var(--line)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]">{link.label}</a>
          </li>
        ))}
      </ul>
    </SectionIntro>
  );
}
