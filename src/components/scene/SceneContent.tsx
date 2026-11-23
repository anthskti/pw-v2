"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { siteLinks } from "@/data/site";
import {
  scenePreviews,
  selectedEdits,
  selectedProjects,
  type SceneSectionId,
} from "@/data/dial-content";

type SceneContentProps = {
  sectionId: SceneSectionId;
};

export default function SceneContent({ sectionId }: SceneContentProps) {
  const preview = scenePreviews[sectionId];
  const hasDetails = sectionId === "projects" || sectionId === "edits" || sectionId === "writing";
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousSectionRef = useRef(sectionId);
  const previousOverflowRef = useRef<string | null>(null);
  const titleId = useId();

  const restoreDocument = useCallback(() => {
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
  }, []);

  const closeDialog = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    restoreDocument();
  }, [restoreDocument]);

  useEffect(() => {
    if (previousSectionRef.current !== sectionId) {
      previousSectionRef.current = sectionId;
      closeDialog();
    }
  }, [closeDialog, sectionId]);

  useEffect(() => () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    restoreDocument();
  }, [restoreDocument]);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    triggerRef.current = document.activeElement instanceof HTMLButtonElement
      ? document.activeElement
      : null;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
  };

  const handleClose = () => {
    restoreDocument();
    triggerRef.current?.focus();
  };

  return (
    <>
      <section aria-labelledby={`${titleId}-preview`} className="relative z-10 w-full max-w-[43rem]">
        <p className="mb-3 text-sm tracking-[0.035em] text-secondary">{sectionId[0].toUpperCase() + sectionId.slice(1)}</p>
        <h1 id={`${titleId}-preview`} className="m-0 max-w-[16ch] text-[clamp(1.875rem,3vw,2.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] max-[38rem]:text-[1.875rem]">
          {preview.title}
        </h1>
        <p className="mt-3 mb-0 max-w-[38rem] text-base leading-[1.55] text-secondary">
          {preview.description}
        </p>
        {preview.action && (
          <button
            ref={triggerRef}
            type="button"
            onClick={openDialog}
            className="mt-4 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold underline decoration-[var(--line)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
          >
            {preview.action}
          </button>
        )}
        {sectionId === "contact" && (
          <ul aria-label="Contact links" className="mt-3 mb-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
            {siteLinks.filter((link) => link.label !== "Resume").map((link) => (
              <li key={link.label}>
                <a href={link.href} target={link.newTab ? "_blank" : undefined} rel={link.newTab ? "noreferrer" : undefined} className="inline-flex min-h-11 items-center text-sm font-semibold underline decoration-[var(--line)] underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {hasDetails && <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]"),
          ).filter((element) => element.tabIndex >= 0 && !element.hasAttribute("disabled") && element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) closeDialog();
        }}
        className="fixed inset-0 m-auto max-h-[85svh] w-[min(92vw,48rem)] max-w-none overflow-y-auto rounded-xl border border-[var(--line)] bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/55"
      >
        <div className="p-6 sm:p-9">
          <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-7 flex items-start justify-between gap-5 border-b border-[var(--line)] bg-background px-6 pt-6 pb-4 sm:-mx-9 sm:-mt-9 sm:px-9 sm:pt-9">
            <h2 id={titleId} className="m-0 text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl">
              {preview.title}
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              autoFocus
              aria-label="Close details"
              className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-xl leading-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            >
              ×
            </button>
          </div>
          {sectionId === "projects" && (
            <ul className="m-0 grid list-none gap-6 p-0">
              {selectedProjects.map((project) => (
                <li key={project.title}>
                  <a href={project.href} target="_blank" rel="noreferrer" className="font-semibold underline decoration-[var(--line)] underline-offset-4">
                    {project.title} ↗
                  </a>
                  <p className="mt-2 mb-0 leading-relaxed text-secondary">{project.description}</p>
                </li>
              ))}
            </ul>
          )}
          {sectionId === "edits" && (
            <ul className="m-0 grid list-none gap-6 p-0">
              {selectedEdits.map((edit) => (
                <li key={edit.title}>
                  <a href={edit.href} target="_blank" rel="noreferrer" className="font-semibold underline decoration-[var(--line)] underline-offset-4">
                    {edit.title} ↗
                  </a>
                  <p className="mt-2 mb-0 leading-relaxed text-secondary">{edit.description}</p>
                </li>
              ))}
            </ul>
          )}
          {sectionId === "writing" && (
            <p className="m-0 max-w-[38rem] leading-relaxed text-secondary">
              The writing archive is being migrated from the previous portfolio. Articles will be linked here when that move is complete.
            </p>
          )}
        </div>
      </dialog>}
    </>
  );
}
