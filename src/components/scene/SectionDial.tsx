"use client";

import type {
  HTMLAttributes,
  KeyboardEventHandler,
  RefObject,
} from "react";
import { sectionMetadata } from "@/data/dial-content";
import { normalize, stops } from "@/components/scene/scene-sections";

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
  surfaceClassName?: string;
};

export default function SectionDial({
  activeIndex,
  rotation,
  onSelect,
  dialRef,
  onKeyDown,
  pointerHandlers,
  surfaceClassName,
}: SectionDialProps) {
  return (
    <div
      ref={dialRef}
      role="group"
      aria-label="Section dial. Drag, use arrow keys, or choose a section above."
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...pointerHandlers}
      className={`absolute inset-0 aspect-square w-full touch-pan-y cursor-grab select-none rounded-full active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--focus)] max-[56rem]:inset-auto max-[56rem]:left-[max(-298px,calc(25%_-_380px))] max-[56rem]:w-[780px] max-[56rem]:-translate-y-0 ${surfaceClassName ?? ""}`}
    >
      <div
        className="absolute inset-0 aspect-square w-full rounded-full rotate-[var(--desktop-turn)] max-[56rem]:rotate-90"
        style={{ "--desktop-turn": `${-rotation}deg` } as React.CSSProperties}
      >
        {stops.map((stop, index) => {
          const mobileRelative = normalize(stop.angle - rotation + 180) - 180;
          const theta = ((stop.angle + 180) * Math.PI) / 180;
          const left = 50 + Math.cos(theta) * 35;
          const top = 50 + Math.sin(theta) * 35;
          const isActive = index === activeIndex;
          const buttonStyle = {
            "--desktop-left": `${left}%`,
            "--desktop-top": `${top}%`,
            "--desktop-label-rotation": `${stop.angle}deg`,
            "--mobile-left": `${50 + Math.cos(((mobileRelative + 180) * Math.PI) / 180) * 24}%`,
            "--mobile-top": `${50 + Math.sin(((mobileRelative + 180) * Math.PI) / 180) * 24}%`,
            "--mobile-tilt": `${mobileRelative * (45 / 72)}deg`,
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
              className={`absolute left-[var(--desktop-left)] top-[var(--desktop-top)] z-10 min-h-11 min-w-11 w-[180px] -translate-x-1/2 -translate-y-1/2 rotate-[var(--desktop-label-rotation)] cursor-pointer rounded px-2 py-1 text-left text-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] md:text-xl max-[56rem]:left-[var(--mobile-left)] max-[56rem]:top-[var(--mobile-top)] max-[56rem]:w-[180px] max-[56rem]:whitespace-normal max-[56rem]:text-left max-[56rem]:text-2xl max-[56rem]:leading-tight max-[56rem]:rotate-[calc(var(--mobile-tilt)_-_90deg)] ${isActive ? "font-semibold text-foreground" : "font-medium text-secondary"}`}
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
              <span className="mt-1 block text-[0.8125rem] font-normal leading-snug text-secondary">
                {sectionMetadata[stop.id]}
              </span>
            </button>
          );
        })}
        <span className="sr-only">
          Dial orientation {Math.round((activeIndex * 72 + 360) % 360)} degrees.
        </span>
      </div>
    </div>
  );
}
