"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  normalize,
  SECTION_ANGLE_STEP,
  stops,
} from "@/components/scene/scene-sections";

const ROTATION_DURATION_MS = 900;
const WHEEL_COOLDOWN_MS = 420;
const ACCELERATION_SHARE = 1 / 3;
const DECELERATION_SHARE = 2 / 3;
const DRAG_MOVE_THRESHOLD_PX = 6;

const nearestIndex = (angle: number) =>
  Math.round(normalize(angle) / SECTION_ANGLE_STEP) % stops.length;

const shortestTarget = (angle: number, index: number) => {
  const base = index * SECTION_ANGLE_STEP;
  return angle + (((((base - angle) % 360) + 540) % 360) - 180);
};

export default function useSceneNavigation() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rotationRef = useRef(0);
  const targetIndexRef = useRef(0);
  const frameRef = useRef(0);
  const wheelTimerRef = useRef<number | undefined>(undefined);
  const wheelLockedRef = useRef(false);
  const dragRef = useRef<{
    pointer: number;
    x: number;
    y: number;
    angle: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const dialRef = useRef<HTMLDivElement | null>(null);

  const commit = useCallback((angle: number, push = true) => {
    const index = nearestIndex(angle);
    setActiveIndex(index);
    if (typeof window !== "undefined") {
      const hash = `#${stops[index].id}`;
      if (push && window.location.hash !== hash)
        window.history.pushState(null, "", hash);
    }
  }, []);

  const setAngle = useCallback((angle: number) => {
    cancelAnimationFrame(frameRef.current);
    rotationRef.current = angle;
    setRotation(angle);
  }, []);

  const snapTo = useCallback(
    (index: number, push = true, keepWheelLock = false) => {
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
        const t = Math.min(1, (now - started) / ROTATION_DURATION_MS);
        // Reach peak speed after one third, then ease out over the remaining two thirds.
        // Weight each segment so both position and speed match at the handoff.
        const eased =
          t < ACCELERATION_SHARE
            ? ACCELERATION_SHARE * Math.pow(t / ACCELERATION_SHARE, 3)
            : 1 -
              DECELERATION_SHARE *
                Math.pow((1 - t) / DECELERATION_SHARE, 3);
        const value = from + (to - from) * eased;
        rotationRef.current = value;
        setRotation(value);
        if (t < 1) frameRef.current = requestAnimationFrame(tick);
        else {
          rotationRef.current = to;
          setRotation(to);
          commit(to, push);
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    },
    [commit, reduced, setAngle],
  );

  const selectSection = useCallback(
    (index: number) => {
      if (suppressClickRef.current) return;
      snapTo(index);
    },
    [snapTo],
  );

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
    // Restore the addressed scene immediately when mounting from a reading route.
    // Later history/section changes still use the visitor's chosen rotation timing.
    const initialId = window.location.hash.slice(1) || "about";
    const initialIndex = stops.findIndex((stop) => stop.id === initialId);
    if (initialIndex >= 0) {
      frameRef.current = requestAnimationFrame(() => {
        targetIndexRef.current = initialIndex;
        setAngle(stops[initialIndex].angle);
        commit(stops[initialIndex].angle, false);
      });
    }
    window.addEventListener("popstate", selectHash);
    window.addEventListener("hashchange", selectHash);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("popstate", selectHash);
      window.removeEventListener("hashchange", selectHash);
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [commit, setAngle, snapTo]);

  useEffect(() => {
    const dial = dialRef.current;
    if (!dial) return;
    const handleWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.deltaY === 0 ||
        Math.abs(event.deltaY) < Math.abs(event.deltaX)
      )
        return;
      event.preventDefault();
      if (wheelLockedRef.current) return;
      wheelLockedRef.current = true;
      const direction = event.deltaY > 0 ? 1 : -1;
      snapTo(
        (nearestIndex(rotationRef.current) + stops.length + direction) %
          stops.length,
        true,
        true,
      );
      wheelTimerRef.current = window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, WHEEL_COOLDOWN_MS);
    };
    dial.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      dial.removeEventListener("wheel", handleWheel);
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [snapTo]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    window.clearTimeout(wheelTimerRef.current);
    wheelLockedRef.current = false;
    cancelAnimationFrame(frameRef.current);
    dragRef.current = {
      pointer: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: rotationRef.current,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const initial = Math.atan2(drag.y - cy, drag.x - cx);
    const current = Math.atan2(event.clientY - cy, event.clientX - cx);
    const delta =
      (Math.atan2(Math.sin(current - initial), Math.cos(current - initial)) *
        180) /
      Math.PI;
    if (
      Math.hypot(event.clientX - drag.x, event.clientY - drag.y) >
      DRAG_MOVE_THRESHOLD_PX
    )
      drag.moved = true;
    if (drag.moved) setAngle(drag.angle - delta);
  };
  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
    snapTo(nearestIndex(rotationRef.current));
  };
  const cancelDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    snapTo(activeIndex, false);
  };
  const keyMove = (event: React.KeyboardEvent) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      snapTo((targetIndexRef.current + 1) % stops.length);
    }
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      snapTo((targetIndexRef.current + stops.length - 1) % stops.length);
    }
    if (event.key === "Home") {
      event.preventDefault();
      snapTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      snapTo(stops.length - 1);
    }
  };

  return {
    activeIndex,
    rotation,
    selectSection,
    keyMove,
    dialRef,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: cancelDrag,
      onLostPointerCapture: cancelDrag,
    },
  };
}
