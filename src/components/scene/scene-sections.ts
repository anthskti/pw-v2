import { dialSections } from "@/data/site";

export const SECTION_ANGLE_STEP = 72;

export const stops = dialSections.map((section, index) => ({
  ...section,
  angle: index * SECTION_ANGLE_STEP,
}));

export const normalize = (angle: number) => ((angle % 360) + 360) % 360;
