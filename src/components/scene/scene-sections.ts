import { dialSections } from "@/data/site";

export const stops = dialSections.map((section, index) => ({
  ...section,
  angle: index * 72,
}));

export const normalize = (angle: number) => ((angle % 360) + 360) % 360;
