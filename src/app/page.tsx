import Footer from "@/components/Footer";
import PortfolioScene from "@/components/scene/PortfolioScene";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] px-[clamp(24px,4.45vw,64px)] pt-7 pb-6 max-sm:px-5.5">
      <header
        className="flex items-baseline text-sm leading-[1.4] text-secondary max-sm:gap-2.5"
        aria-label="Anthony Pham Portfolio"
      >
        <p className="font-semibold text-foreground">Anthony Pham</p>
        <span
          aria-hidden="true"
          className="mx-1 mb-[0.12em] inline-block size-0.5 shrink-0 rounded-full bg-zinc-500"
        />
        <p>Toronto, Canada</p>
      </header>
      <PortfolioScene />
      <Footer />
    </div>
  );
}
