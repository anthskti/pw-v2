import type { StaticImageData } from "next/image";
import clearupImage from "@/assets/projects/clearuphomee.png";
import voicelyImage from "@/assets/projects/voicely.png";
import spacetimeDojoImage from "@/assets/projects/spacetimedb.webp";

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  image: StaticImageData;
  imageAlt: string;
  technologies: readonly string[];
  liveSite?: string;
  sourceCode?: string;
  demo?: string;
};

export const clearupProject = {
  id: "clearup",
  title: "Clearup",
  category: "Personal",
  description:
    "Want clear skin but you don't know where to start? I developed this website to help you build and organize the perfect skincare routine for you.",
  summary: "A website for building and organizing a personal skincare routine.",
  image: clearupImage,
  imageAlt: "Clearup skincare routine website interface",
  technologies: [
    "Typescript",
    "Next.js",
    "Express.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Cloudflare",
    "Docker",
    "Python",
    "Apify",
  ],
  liveSite: "https://www.clearup.skin/",
  sourceCode: "https://github.com/anthskti/clearup",
} as const satisfies Project;

export const voicelyProject = {
  id: "voicely",
  title: "Voicely",
  category: "Hackathon",
  description:
    "For Ingnition Hacks v7, I solo-hacked a voice over practice application where users can read and voice act scenes, get graded, and hear their voice on the video.",
  summary: "A voice-over practice app for reading and acting scenes with video feedback.",
  image: voicelyImage,
  imageAlt: "Voicely voice-over practice application interface",
  technologies: [
    "Go",
    "Gin",
    "Python",
    "FastAPI",
    "Pytorch",
    "PostgreSQL",
    "Docker",
    "Next.js",
    "Typescript",
  ],
  liveSite: "https://voicely-lake.vercel.app/",
  sourceCode: "https://github.com/anthskti/voicely",
  demo: "https://voicely-lake.vercel.app/",
} as const satisfies Project;

export const spacetimeDojoProject = {
  id: "spacetime-dojo",
  title: "Spacetime Dojo",
  category: "Hackathon",
  description:
    "At Cal Hacks v13, our team built a real-time community based multiplayer boxing game. Using a webcam or Airpod motion controllers and a server-side combat engine.",
  summary: "A real-time multiplayer boxing game controlled by webcam or AirPods motion.",
  image: spacetimeDojoImage,
  imageAlt: "Spacetime Dojo multiplayer boxing game",
  technologies: [
    "TypeScript",
    "Next.js",
    "Three.js",
    "Bun",
    "SpacetimeDB",
    "MediaPipe",
    "Blender",
  ],
  demo: "https://youtu.be/TXRZh1yjFeg",
} as const satisfies Project;

export const featuredProjects: readonly Project[] = [
  clearupProject,
  voicelyProject,
  spacetimeDojoProject,
];
