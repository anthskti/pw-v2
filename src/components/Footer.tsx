import Link from "@/components/Link";
import { siteLinks } from "@/data/site";

export default function Footer() {
  const [resume, ...profiles] = siteLinks;

  return (
    <footer className="flex items-center justify-between gap-6 pt-5 text-sm max-[38rem]:items-start max-[38rem]:gap-x-5 max-[38rem]:gap-y-2">
      <Link href={resume.href} newTab className="inline-flex min-h-11 items-center font-semibold">
        Resume
      </Link>
      <nav aria-label="Profiles and contact">
        <ul className="m-0 flex list-none flex-wrap justify-end gap-x-[clamp(18px,2.4vw,36px)] gap-y-2 p-0 max-[38rem]:gap-x-[18px]">
          {profiles.map((link) => (
            <li key={link.label}>
              <Link href={link.href} newTab={link.newTab} className="inline-flex min-h-11 items-center">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
