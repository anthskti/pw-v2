"use client";

import useSceneNavigation from "@/hooks/useSceneNavigation";
import SectionDial from "@/components/scene/SectionDial";
import SceneContent from "@/components/scene/SceneContent";
import { normalize, SECTION_ANGLE_STEP, stops } from "@/components/scene/scene-sections";

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

  return (
    <main className="scene-main">
      <div className="scene-stage">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {stops.map((stop, index) => {
            const distance = Math.abs(normalize(stop.angle - navigation.rotation + 180) - 180);
            return (
              <div
                key={stop.id}
                className="absolute inset-0"
                style={{
                  opacity: Math.max(0, 1 - distance / SECTION_ANGLE_STEP),
                  background: temporaryBackgrounds[index],
                }}
              />
            );
          })}
        </div>

        {/* Dial before content so mobile document flow places it at the top. Desktop stays absolute. */}
        <div className="scene-dial-clip">
          <div className="scene-dial-region">
            <SectionDial
              activeIndex={navigation.activeIndex}
              rotation={navigation.rotation}
              onSelect={navigation.selectSection}
              dialRef={navigation.dialRef}
              onKeyDown={navigation.keyMove}
              pointerHandlers={navigation.pointerHandlers}
            />
          </div>
        </div>

        <div className="scene-content">
          <SceneContent key={selected.id} sectionId={selected.id} />
        </div>
      </div>
    </main>
  );
}
