import DetailDialog from "@/components/DetailDialog";
import SectionIntro from "@/components/sections/SectionIntro";
import { scenePreviews, selectedEdits } from "@/data/dial-content";

export default function EditsSection() {
  return (
    <SectionIntro sectionId="edits">
      <DetailDialog title={scenePreviews.edits.title} triggerLabel={scenePreviews.edits.action!}>
        <ul className="m-0 grid list-none gap-6 p-0">
          {selectedEdits.map((edit) => (
            <li key={edit.title}>
              <a href={edit.href} target="_blank" rel="noreferrer" className="font-semibold underline decoration-[var(--line)] underline-offset-4">{edit.title} ↗</a>
              <p className="mt-2 mb-0 leading-relaxed text-secondary">{edit.description}</p>
            </li>
          ))}
        </ul>
      </DetailDialog>
    </SectionIntro>
  );
}
