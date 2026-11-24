import Image from "next/image";
import Link from "@/components/Link";
import NextLink from "next/link";
import ListItem from "@/components/about/ListItem";
import ArrowItem from "@/components/about/ArrowItem";
import { Sword } from "lucide-react";

export default function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="relative z-10 w-full max-w-[68ch]">
      <h1 id="about-heading" className="m-0 text-[clamp(1.875rem,3vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
        Hey, I&apos;m Anthony (or Anth)
      </h1>
      <p className="mt-5 mb-0 text-base leading-relaxed text-secondary">
        I&apos;m a Software Engineer based in Toronto, Canada, focused on website development, AI, and data analysis.<br />
        Outside of engineering, I&apos;ve enjoyed doing calisthenics, playing piano(ish), cooking, video editing (kind of retired), playing video games, clash royale (11500 trophies), and chess (peaked 906 elo).
      </p>

      <ul className="mt-4 mb-0 grid list-none gap-1 p-0">
        <ListItem>Software Engineering @ <span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/UofTHacksLogoBlack.png" alt="" width={15} height={15} className="relative top-0.5 block object-contain dark:hidden" /><Image src="/assets/icons/UofTHacksLogoWhite.png" alt="" width={15} height={15} className="relative top-0.5 hidden object-contain dark:block" /><Link href="https://uofthacks.com/" newTab>UofTHacks</Link></span></ListItem>
        <ListItem>Content Creation @ <span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/blossom.webp" alt="" width={15} height={15} className="relative top-0.5 object-contain" /><Link href="https://www.instagram.com/anthassets" newTab>Blossom Social</Link></span></ListItem>
        <ListItem>Computer Science @ <span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/YorkULogo.png" alt="" width={15} height={15} className="relative top-0.5 object-contain" /><Link href="https://www.yorku.ca/" newTab>LSE at York University</Link></span></ListItem>
      </ul>

      <ul className="mt-4 mb-0 grid list-none gap-1 p-0"><ListItem><span className="font-bold italic tracking-wider">What I&apos;ve been building:</span>
        <ul className="min-w-0 w-full list-none pl-5">
          <ArrowItem><span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/ClearupLogo.png" alt="" width={15} height={15} className="relative top-0.5 object-contain" /><Link href="https://www.clearup.skin/" newTab>Clearup</Link></span>{": "}A skincare organizer where users compare real sellers prices and build + share personalized routines.</ArrowItem>
          <ArrowItem><span className="font-bold">Code Review Agent</span>{": "}In a new world that ships fast, an agentic ai pipeline that reviews Github PR requests, generating a pull request report.</ArrowItem>
        </ul>
      </ListItem></ul>

      <ul className="mt-4 mb-0 grid list-none gap-1 p-0"><ListItem><span className="font-bold italic tracking-wider">Previously:</span>
        <ul className="min-w-0 w-full list-none pl-5">
          <ArrowItem>Software Engineer Intern @ <Link href="https://www.perimenopauselab.com/" newTab>The Perimenopause Lab</Link></ArrowItem>
          <ArrowItem>Technical Lead @ <span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/NorthcrestLogo.jpeg" alt="" width={15} height={15} className="relative top-0.5 object-contain" /><Link href="https://www.northcrestdev.ca/" newTab>Northcrest YZD</Link> via C4 Capstone</span></ArrowItem>
          <ArrowItem>Associate @ <span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/CostcoLogo.jpg" alt="" width={15} height={15} className="relative top-0.5 object-contain" /><Link href="https://www.costco.ca/" newTab>Costco Wholesale</Link></span></ArrowItem>
          <ArrowItem>Deputy External @ <span className="inline-flex items-baseline gap-1"><Image src="/assets/icons/ITFLogo.jpg" alt="" width={15} height={15} className="relative top-0.5 object-contain" /><Link href="https://www.instagram.com/yorktaekwondo/" newTab>YorkU ITF Taekwondo</Link></span></ArrowItem>
        </ul>
      </ListItem></ul>

      <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap md:justify-start md:gap-x-5">
        <Image
          src="/headshot.jpg"
          alt="Anthony Pham"
          width={560}
          height={560}
          sizes="(max-width: 56rem) 100vw, 112px"
          className="aspect-square w-3/4 rounded-lg object-cover object-top md:size-38 md:w-38"
        />
        <NextLink
          href="/anthony_pham_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/30 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary hover:text-background focus-ring"
        >
          Check out my resume! <Sword aria-hidden="true" className="size-4" />
        </NextLink>
      </div>
    </section>
  );
}
