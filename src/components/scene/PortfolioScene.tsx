"use client";

import useSceneNavigation from "@/hooks/useSceneNavigation";
import SectionDial from "@/components/scene/SectionDial";
import SectionNavigation from "@/components/scene/SectionNavigation";
import SceneContent from "@/components/scene/SceneContent";
import { normalize, stops } from "@/components/scene/scene-sections";

// The parent positions the content and dial together. Section components own only their interiors.
const previewLayout = {
  stage: "max-[56rem]:h-[max(40rem,calc(100svh_-_10rem))] max-[56rem]:min-h-0",
  content: "max-w-[min(43rem,56%)] pt-12",
  dialRegion: "max-[56rem]:h-[max(10rem,calc(100svh/4.5))]",
  dialSurface: "max-[56rem]:top-[calc(-150px_+_max(0px,2rem_-_32px))]",
};

const projectsLayout = {
  stage: "max-[56rem]:min-h-[max(40rem,calc(100svh_-_10rem))] max-[56rem]:pb-[calc(max(8rem,17svh)_+_1rem)]",
  // Retain the large preview with a compact selector rail, without moving the shared dial.
  content: "max-w-[min(46rem,calc(47.4%_+_96px))] pt-8 min-[56rem]:z-30",
  dialRegion: "max-[56rem]:h-[max(8rem,17svh)]",
  dialSurface: "max-[56rem]:top-[calc(-164px_+_max(0px,2rem_-_32px))]",
};

const temporaryBackgrounds = [
  "radial-gradient(ellipse at 79% 48%, color-mix(in srgb, var(--content-primary) 9%, var(--surface)) 0%, var(--surface) 22%, transparent 68%)",
  "radial-gradient(ellipse at 78% 48%, color-mix(in srgb, var(--content-primary) 6%, var(--surface)) 0%, var(--surface) 30%, transparent 70%)",
  "radial-gradient(ellipse at 72% 53%, color-mix(in srgb, var(--content-primary) 8%, var(--surface)) 0%, var(--surface) 26%, transparent 68%)",
  "radial-gradient(ellipse at 83% 42%, color-mix(in srgb, var(--content-primary) 5%, var(--surface)) 0%, var(--surface) 27%, transparent 65%)",
  "radial-gradient(ellipse at 74% 47%, color-mix(in srgb, var(--content-primary) 7%, var(--surface)) 0%, var(--surface) 22%, transparent 65%)",
];

export default function PortfolioScene() {
  const navigation = useSceneNavigation();
  const selected = stops[navigation.activeIndex];
  const layout = selected.id === "projects" ? projectsLayout : previewLayout;

  return (
    <main className="relative mx-auto min-h-[calc(100svh_-_140px)] w-full max-w-[1800px] max-[56rem]:min-h-0">
      <div className={`relative min-h-[calc(100svh_-_140px)] max-[56rem]:overflow-hidden ${layout.stage}`}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {stops.map((stop, index) => {
            const distance = Math.abs(normalize(stop.angle - navigation.rotation + 180) - 180);
            return <div key={stop.id} className="absolute inset-0" style={{ opacity: Math.max(0, 1 - distance / 72), background: temporaryBackgrounds[index] }} />;
          })}
        </div>

        <SectionNavigation activeIndex={navigation.activeIndex} onSelect={navigation.selectSection} onKeyDown={navigation.keyMove} />

        <div className={`relative z-10 [overflow-wrap:anywhere] max-[56rem]:max-w-none max-[56rem]:pt-8 ${layout.content}`}>
          <SceneContent key={selected.id} sectionId={selected.id} />
        </div>

        {/* This clipping region contains the rotated square without clipping the reading content. */}
        <div className="pointer-events-none absolute -inset-y-10 -inset-x-[clamp(24px,4.45vw,64px)] z-20 overflow-clip max-[56rem]:contents">
          <div className={`pointer-events-auto absolute top-1/2 left-[calc(82%_-_var(--dial-size)_/_2)] aspect-square w-[var(--dial-size)] [--dial-size:min(840px,58.333vw,92svh,max(280px,calc(150svh_-_440px)))] -translate-y-1/2 overflow-visible max-[75rem]:left-[calc(88%_-_var(--dial-size)_/_2)] max-[56rem]:absolute max-[56rem]:top-auto max-[56rem]:bottom-0 max-[56rem]:left-0 max-[56rem]:z-20 max-[56rem]:w-full max-[56rem]:aspect-auto max-[56rem]:-translate-y-0 max-[56rem]:overflow-hidden ${layout.dialRegion}`}>
            <SectionDial
              activeIndex={navigation.activeIndex}
              rotation={navigation.rotation}
              onSelect={navigation.selectSection}
              dialRef={navigation.dialRef}
              onKeyDown={navigation.keyMove}
              pointerHandlers={navigation.pointerHandlers}
              surfaceClassName={layout.dialSurface}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
