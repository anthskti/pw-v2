"use client";

import type {
  HTMLAttributes,
  KeyboardEventHandler,
  RefObject,
} from "react";
import { sectionMetadata } from "@/data/dial-content";
import { normalize, SECTION_ANGLE_STEP, stops } from "@/components/scene/scene-sections";

type SectionDialProps = {
  activeIndex: number;
  rotation: number;
  onSelect: (index: number) => void;
  dialRef: RefObject<HTMLDivElement | null>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  pointerHandlers: Pick<
    HTMLAttributes<HTMLDivElement>,
    | "onPointerDown"
    | "onPointerMove"
    | "onPointerUp"
    | "onPointerCancel"
    | "onLostPointerCapture"
  >;
};

export default function SectionDial({
  activeIndex,
  rotation,
  onSelect,
  dialRef,
  onKeyDown,
  pointerHandlers,
}: SectionDialProps) {
  return (
    <div
      ref={dialRef}
      role="group"
      aria-label="Section dial. Drag, use arrow keys, or choose a section."
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...pointerHandlers}
      className="scene-dial"
    >
      <div
        className="scene-dial-rotor"
        style={{ "--desktop-turn": `${-rotation}deg` } as React.CSSProperties}
      >
        {stops.map((stop, index) => {
          const mobileRelative = normalize(stop.angle - rotation + 180) - 180;
          // Flip orbit so previous sits left / next sits right on the lazy-Susan arc.
          const mobileOrbit = -mobileRelative;
          const theta = ((stop.angle + 180) * Math.PI) / 180;
          const left = 50 + Math.cos(theta) * 35;
          const top = 50 + Math.sin(theta) * 35;
          const isActive = index === activeIndex;
          const buttonStyle = {
            "--desktop-left": `${left}%`,
            "--desktop-top": `${top}%`,
            "--desktop-label-rotation": `${stop.angle}deg`,
            "--mobile-left": `${50 + Math.cos(((mobileOrbit + 180) * Math.PI) / 180) * 22}%`,
            "--mobile-top": `${50 + Math.sin(((mobileOrbit + 180) * Math.PI) / 180) * 22}%`,
            "--mobile-tilt": `${mobileOrbit * (45 / SECTION_ANGLE_STEP)}deg`,
          } as React.CSSProperties;
          return (
            <button
              type="button"
              tabIndex={-1}
              key={stop.id}
              aria-label={`Go to ${stop.label}`}
              aria-current={isActive ? "page" : undefined}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(index);
              }}
              className={`scene-dial-label ${isActive ? "font-semibold text-foreground" : "font-medium text-secondary"}`}
              style={buttonStyle}
            >
              {stop.id === "about" ? (
                <picture className="block aspect-square w-[11vw] max-w-[112px] min-w-[64px]">
                  <source
                    srcSet="/identity/initial1.png"
                    media="(prefers-color-scheme: dark)"
                  />
                  <img
                    src="/identity/initial2.png"
                    alt=""
                    width="900"
                    height="900"
                    className="h-full w-full object-contain"
                  />
                </picture>
              ) : (
                <span className="block">{stop.label}</span>
              )}
              <span className="scene-dial-meta mt-1 block text-[0.8125rem] font-normal leading-snug text-secondary">
                {sectionMetadata[stop.id]}
              </span>
            </button>
          );
        })}
        <span className="sr-only">
          Dial orientation {Math.round((activeIndex * SECTION_ANGLE_STEP + 360) % 360)} degrees.
        </span>
      </div>
    </div>
  );
}
