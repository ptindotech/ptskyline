"use client";

/** Ensures keyboard users land on the main landmark after using the skip control. */
export function SkipLink() {
  function focusMainContent() {
    window.requestAnimationFrame(() => document.getElementById("main-content")?.focus());
  }

  return <a className="skip-link" href="#main-content" onClick={focusMainContent}>Skip to content</a>;
}
