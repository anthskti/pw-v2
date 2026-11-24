import DetailDialog from "@/components/DetailDialog";
import SectionIntro from "@/components/sections/SectionIntro";
import { scenePreviews } from "@/data/dial-content";

export default function WritingSection() {
  return (
    <SectionIntro sectionId="writing">
      <DetailDialog title={scenePreviews.writing.title} triggerLabel={scenePreviews.writing.action!}>
        <p className="m-0 max-w-[38rem] leading-relaxed text-secondary">The writing archive is being migrated from the previous portfolio. Articles will be linked here when that move is complete.</p>
      </DetailDialog>
    </SectionIntro>
  );
}
