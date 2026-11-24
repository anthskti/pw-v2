import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EditsSection from "@/components/sections/EditsSection";
import WritingSection from "@/components/sections/WritingSection";
import ContactSection from "@/components/sections/ContactSection";
import type { SceneSectionId } from "@/data/dial-content";

const sections = {
  about: AboutSection,
  projects: ProjectsSection,
  edits: EditsSection,
  writing: WritingSection,
  contact: ContactSection,
};

export default function SceneContent({ sectionId }: { sectionId: SceneSectionId }) {
  const Section = sections[sectionId];
  return <Section />;
}
