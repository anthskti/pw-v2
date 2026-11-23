import AboutIntro from "@/components/about/AboutIntro";
import SectionDial from "@/components/scene/SectionDial";

export default function OpeningScene() {
  return (
    <main className="mx-auto grid w-full max-w-[1800px] grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] items-center gap-[clamp(24px,4vw,64px)] max-[56rem]:grid-cols-1 max-[56rem]:content-center max-[56rem]:gap-3 max-[56rem]:py-9 max-[56rem]:pb-6 max-[38rem]:gap-5 max-[38rem]:py-[42px] max-[38rem]:pb-6">
      <AboutIntro />
      <SectionDial />
    </main>
  );
}
