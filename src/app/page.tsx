import Footer from "@/components/Footer";
import OpeningScene from "@/components/scene/OpeningScene";

export default function Home() {
  return (
    <div className="grid min-h-screen min-h-[100svh] grid-rows-[auto_1fr_auto] px-[clamp(24px,4.45vw,64px)] pt-7 pb-6 max-[38rem]:px-[22px]">
      <header className="flex items-baseline gap-4 text-sm leading-[1.4] text-secondary max-[38rem]:gap-2.5" aria-label="Site identity">
        <p className="m-0 font-semibold text-foreground">Anthony Pham</p>
        <p className="m-0">Toronto, Canada</p>
      </header>
      <OpeningScene />
      <Footer />
    </div>
  );
}
