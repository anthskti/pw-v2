"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { dialSections } from "@/data/site";
import { sectionMetadata } from "@/data/dial-content";
import SceneContent from "@/components/scene/SceneContent";
const stops = dialSections.map((section, index) => ({ ...section, angle: index * 72 }));
const normalize = (angle: number) => ((angle % 360) + 360) % 360;
const nearestIndex = (angle: number) => Math.round(normalize(angle) / 72) % stops.length;
const shortestTarget = (angle: number, index: number) => {
  const base = index * 72;
  return angle + ((((base - angle) % 360) + 540) % 360 - 180);
};

export default function SectionDial() {
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rotationRef = useRef(0);
  const targetIndexRef = useRef(0);
  const frameRef = useRef(0);
  const wheelTimerRef = useRef<number | undefined>(undefined);
  const wheelLockedRef = useRef(false);
  const dragRef = useRef<{ pointer: number; x: number; y: number; angle: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const dialRef = useRef<HTMLDivElement>(null);

  const commit = useCallback((angle: number, push = true) => {
    const index = nearestIndex(angle);
    setActive(index);
    if (typeof window !== "undefined") {
      const hash = `#${stops[index].id}`;
      if (push && window.location.hash !== hash) window.history.pushState(null, "", hash);
    }
  }, []);

  const setAngle = useCallback((angle: number) => {
    cancelAnimationFrame(frameRef.current);
    rotationRef.current = angle;
    setRotation(angle);
  }, []);

  const snapTo = useCallback((index: number, push = true, keepWheelLock = false) => {
    targetIndexRef.current = index;
    if (!keepWheelLock) {
      window.clearTimeout(wheelTimerRef.current);
      wheelLockedRef.current = false;
    }
    cancelAnimationFrame(frameRef.current);
    const from = rotationRef.current;
    const to = shortestTarget(from, index);
    if (reduced || Math.abs(to - from) < 0.1) {
      setAngle(to);
      commit(to, push);
      return;
    }
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 420);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (to - from) * eased;
      rotationRef.current = value;
      setRotation(value);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
      else { rotationRef.current = to; setRotation(to); commit(to, push); }
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [commit, reduced, setAngle]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const selectHash = () => {
      const id = window.location.hash.slice(1) || "about";
      const index = stops.findIndex((stop) => stop.id === id);
      if (index >= 0) snapTo(index, false);
    };
    selectHash();
    window.addEventListener("popstate", selectHash);
    window.addEventListener("hashchange", selectHash);
    return () => { media.removeEventListener("change", update); window.removeEventListener("popstate", selectHash); window.removeEventListener("hashchange", selectHash); cancelAnimationFrame(frameRef.current); window.clearTimeout(wheelTimerRef.current); };
  }, [snapTo]);

  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0 || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (wheelLockedRef.current) return;
      wheelLockedRef.current = true;
      const direction = event.deltaY > 0 ? 1 : -1;
      snapTo((nearestIndex(rotationRef.current) + stops.length + direction) % stops.length, true, true);
      wheelTimerRef.current = window.setTimeout(() => { wheelLockedRef.current = false; }, 420);
    };
    dial.addEventListener("wheel", handleWheel, { passive: false });
    return () => { dial.removeEventListener("wheel", handleWheel); window.clearTimeout(wheelTimerRef.current); };
  }, [snapTo]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    window.clearTimeout(wheelTimerRef.current);
    wheelLockedRef.current = false;
    cancelAnimationFrame(frameRef.current);
    dragRef.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, angle: rotationRef.current, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const initial = Math.atan2(drag.y - cy, drag.x - cx);
    const current = Math.atan2(event.clientY - cy, event.clientX - cx);
    const delta = Math.atan2(Math.sin(current - initial), Math.cos(current - initial)) * 180 / Math.PI;
    if (Math.hypot(event.clientX - drag.x, event.clientY - drag.y) > 6) drag.moved = true;
    if (drag.moved) setAngle(drag.angle - delta);
  };
  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
    snapTo(nearestIndex(rotationRef.current));
  };
  const cancelDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    snapTo(active, false);
  };
  const keyMove = (event: React.KeyboardEvent) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) { event.preventDefault(); snapTo((targetIndexRef.current + 1) % stops.length); }
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) { event.preventDefault(); snapTo((targetIndexRef.current + stops.length - 1) % stops.length); }
    if (event.key === "Home") { event.preventDefault(); snapTo(0); }
    if (event.key === "End") { event.preventDefault(); snapTo(stops.length - 1); }
  };
  const selected = stops[active];
  return (
    <div className="relative min-h-[min(720px,72vh)] overflow-hidden max-[56rem]:h-[max(40rem,calc(100svh_-_10rem))] max-[56rem]:min-h-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {stops.map((stop, i) => { const distance = Math.abs(normalize(stop.angle - rotation + 180) - 180); return <div key={stop.id} className="absolute inset-0" style={{ opacity: Math.max(0, 1 - distance / 72), background: ["radial-gradient(ellipse at 79% 48%, color-mix(in srgb, var(--content-primary) 9%, var(--surface)) 0%, var(--surface) 22%, transparent 68%)", "radial-gradient(ellipse at 78% 48%, color-mix(in srgb, var(--content-primary) 6%, var(--surface)) 0%, var(--surface) 30%, transparent 70%)", "radial-gradient(ellipse at 72% 53%, color-mix(in srgb, var(--content-primary) 8%, var(--surface)) 0%, var(--surface) 26%, transparent 68%)", "radial-gradient(ellipse at 83% 42%, color-mix(in srgb, var(--content-primary) 5%, var(--surface)) 0%, var(--surface) 27%, transparent 65%)", "radial-gradient(ellipse at 74% 47%, color-mix(in srgb, var(--content-primary) 7%, var(--surface)) 0%, var(--surface) 22%, transparent 65%)"][i] }} />; })}
      </div>
      <nav aria-label="Portfolio sections" className="relative z-30 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {stops.map((stop, index) => <a key={stop.id} href={`#${stop.id}`} aria-current={active === index ? "page" : undefined} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); if (suppressClickRef.current) return; snapTo(index); }} onKeyDown={keyMove} className={`min-h-11 rounded-sm py-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--focus)] ${active === index ? "font-semibold text-foreground underline" : "text-secondary hover:text-foreground"}`}>{stop.label}</a>)}
      </nav>
      <div className="relative z-10 max-w-[min(43rem,56%)] pt-12 [overflow-wrap:anywhere] max-[56rem]:max-w-none max-[56rem]:pt-8">
        <SceneContent key={selected.id} sectionId={selected.id} />
      </div>
      <div className="absolute top-1/2 left-[calc(85%_-_var(--dial-size)_/_2)] z-20 order-3 aspect-square w-[var(--dial-size)] [--dial-size:min(680px,74svh)] -translate-y-1/2 overflow-visible max-[75rem]:left-[calc(100%_-_var(--dial-size)_/_2)] max-[56rem]:absolute max-[56rem]:top-auto max-[56rem]:bottom-0 max-[56rem]:left-0 max-[56rem]:h-[max(10rem,calc(100svh/4.5))] max-[56rem]:w-full max-[56rem]:aspect-auto max-[56rem]:-translate-y-0 max-[56rem]:overflow-hidden">
      <div ref={dialRef} role="group" aria-label="Section dial. Drag, use arrow keys, or choose a section above." tabIndex={0} onKeyDown={keyMove} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={finishDrag} onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag} className="absolute inset-0 aspect-square w-full touch-pan-y cursor-grab select-none rounded-full [--dial-turn:0deg] rotate-[var(--dial-turn)] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--focus)] max-[56rem]:inset-auto max-[56rem]:top-[calc(-150px_+_max(0px,2rem_-_32px))] max-[56rem]:left-[max(-298px,calc(25%_-_380px))] max-[56rem]:w-[780px] max-[56rem]:-translate-y-0 max-[56rem]:[--dial-turn:90deg]">
        <div className="absolute inset-[1.2%] rounded-full border border-[var(--line)] max-[56rem]:hidden" aria-hidden="true" />
        {stops.map((stop, index) => {
          const relative = normalize(stop.angle - rotation + 180) - 180;
          const theta = ((relative + 180) * Math.PI) / 180;
          const left = 50 + Math.cos(theta) * 35;
          const top = 50 + Math.sin(theta) * 35;
          const isActive = index === active;
          const tilt = relative * (45 / 72);
          const buttonStyle = {
            "--desktop-left": `${left}%`,
            "--desktop-top": `${top}%`,
            rotate: `calc(${tilt}deg - var(--dial-turn))`,
            "--mobile-left": `${50 + Math.cos(theta) * 24}%`,
            "--mobile-top": `${50 + Math.sin(theta) * 24}%`,
          } as React.CSSProperties;
          return <button type="button" tabIndex={-1} key={stop.id} aria-label={`Go to ${stop.label}`} aria-current={isActive ? "page" : undefined} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); if (!suppressClickRef.current) snapTo(index); }} className={`absolute left-[var(--desktop-left)] top-[var(--desktop-top)] z-10 min-h-11 min-w-11 w-[180px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded px-2 py-1 text-left text-base hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] md:text-xl max-[56rem]:left-[var(--mobile-left)] max-[56rem]:top-[var(--mobile-top)] max-[56rem]:w-[180px] max-[56rem]:whitespace-normal max-[56rem]:text-left max-[56rem]:text-2xl max-[56rem]:leading-tight ${isActive ? "font-semibold text-foreground" : "font-medium text-secondary"}`} style={buttonStyle}>{stop.id === "about" ? <picture className="block aspect-square w-[11vw] max-w-[112px] min-w-[64px]"><source srcSet="/identity/initial1.png" media="(prefers-color-scheme: dark)"/><img src="/identity/initial2.png" alt="" width="900" height="900" className="h-full w-full object-contain"/></picture> : <span className="block">{stop.label}</span>}<span className="mt-1 block text-[0.8125rem] font-normal leading-snug text-secondary">{sectionMetadata[stop.id]}</span></button>;
        })}
        <span className="sr-only">Dial orientation {Math.round((active * 72 + 360) % 360)} degrees.</span>
      </div>
      </div>
    </div>
  );
}
