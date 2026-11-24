"use client";

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";

type DetailDialogProps = {
  title: string;
  triggerLabel: string;
  children: ReactNode;
};

export default function DetailDialog({ title, triggerLabel, children }: DetailDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef<string | null>(null);
  const titleId = useId();

  const restoreDocument = useCallback(() => {
    if (previousOverflowRef.current !== null) {
      document.body.style.overflow = previousOverflowRef.current;
      previousOverflowRef.current = null;
    }
  }, []);

  const closeDialog = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    restoreDocument();
  }, [restoreDocument]);

  useEffect(() => () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    restoreDocument();
  }, [restoreDocument]);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
  };

  return (
    <>
      <button ref={triggerRef} type="button" onClick={openDialog} className="text-link mt-4 rounded-sm text-sm font-semibold">{triggerLabel}</button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => {
          restoreDocument();
          if (triggerRef.current?.isConnected) triggerRef.current.focus();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea, [tabindex]"))
            .filter((element) => element.tabIndex >= 0 && !element.hasAttribute("disabled") && element.getClientRects().length > 0);
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
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog();
        }}
        className="fixed inset-0 m-auto max-h-[85svh] w-[min(92vw,48rem)] max-w-none overflow-y-auto rounded-xl border border-[var(--line)] bg-background p-0 text-foreground shadow-2xl backdrop:bg-black/55"
      >
        <div className="p-6 sm:p-9">
          <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-7 flex items-start justify-between gap-5 border-b border-[var(--line)] bg-background px-6 pt-6 pb-4 sm:-mx-9 sm:-mt-9 sm:px-9 sm:pt-9">
            <h2 id={titleId} className="m-0 text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl">{title}</h2>
            <button type="button" onClick={closeDialog} autoFocus aria-label="Close details" className="focus-ring inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-xl leading-none">×</button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}
