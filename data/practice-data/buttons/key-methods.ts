import type { KeyMethod } from "@/data/practice-data/types";

/** Coloured "Key Methods" list shown in the sticky code panel. */
export const buttonsKeyMethods: KeyMethod[] = [
  { color: "green",  label: "click()" },
  { color: "blue",   label: "dblclick()" },
  { color: "orange", label: "click({ button: 'right' })" },
  { color: "yellow", label: "toBeDisabled()" },
  { color: "purple", label: "textContent()" },
];
