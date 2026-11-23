import Link from "@/components/Link";
import { about } from "@/data/site";

export default function AboutIntro() {
  return (
    <section className="w-full max-w-[40rem] py-9 max-[56rem]:max-w-[42rem] max-[56rem]:py-0 max-[56rem]:pb-3" aria-labelledby="about-heading">
      <p className="mb-[18px] text-sm tracking-[0.035em] text-secondary max-[38rem]:mb-[14px]">About</p>
      <h1 id="about-heading" className="m-0 max-w-[11ch] text-[clamp(2.25rem,4.1vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] max-[56rem]:max-w-[16ch] max-[56rem]:text-[clamp(2.25rem,7vw,3rem)]">{about.heading}</h1>
      <p className="mt-6 mb-0 text-[clamp(1.0625rem,1.35vw,1.125rem)] leading-[1.65] text-secondary max-[38rem]:mt-[18px]">{about.introduction}</p>

      <ul className="mt-6 mb-0 grid list-none gap-2 p-0 text-base leading-[1.55] max-[38rem]:mt-5" aria-label="Current work and education">
        {about.affiliations.map((item) => (
          <li key={item.organization}>
            <span className="text-secondary">{item.field} @ </span>
            <Link href={item.href} newTab>
              {item.organization}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 mb-0 max-w-[39rem] text-base leading-[1.65] text-secondary max-[38rem]:mt-5">{about.outsideWork}</p>
    </section>
  );
}
