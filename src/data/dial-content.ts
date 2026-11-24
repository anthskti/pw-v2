export const selectedEdits = [
  {
    title: "Over The Moon · Bae Suzy",
    description: "Cutout imagery, light, and angled type.",
    href: "https://www.youtube.com/watch?v=NWY_uNG1mx0",
  },
  {
    title: "Late Night Talking · Tada Never Falls in Love",
    description: "A sunrise cue built around the lyric and rising light.",
    href: "https://www.youtube.com/watch?v=3YcFgJ-2uEo",
  },
  {
    title: "Vampire · Tokyo Ghoul",
    description: "Impact frames, glares, and layered silhouettes.",
    href: "https://www.youtube.com/watch?v=B2UphnNtMhg",
  },
] as const;

/** Short dial captions — keep these tight for the mobile arc. */
export const sectionMetadata = {
  about: "",
  projects: "My Works",
  writing: "Notes",
  edits: "VFX · sakuti",
  contact: "Social",
} as const;

export type SceneSectionId =
  | "about"
  | "projects"
  | "writing"
  | "edits"
  | "contact";

export const scenePreviews: Record<
  SceneSectionId,
  { title: string; description: string; action?: string }
> = {
  about: {
    title: "Hey, I’m Anthony",
    description:
      "I’m a Software Engineer based in Toronto, Canada, focused on website development, AI, and data analysis.",
  },
  projects: {
    title: "Projects",
    description:
      "A selection of recent software projects across web development, AI, and interactive experiences.",
    action: "View all projects",
  },
  writing: {
    title: "Writing",
    description:
      "Notes and articles are being moved over from the previous portfolio.",
    action: "About writing",
  },
  edits: {
    title: "Edits",
    description: "Video edits shaped by light, rhythm, and visual effects.",
    action: "Watch edits",
  },
  contact: {
    title: "Contact",
    description:
      "For engineering, editing, or anything else, reach me through email or my profiles.",
  },
};
