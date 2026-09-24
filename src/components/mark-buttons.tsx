"use client";

import { cn } from "cn";
import type { Mark } from "@/lib/tracker";

const marks: { id: Mark; label: string; hint: string; className: string }[] = [
  { id: "green", label: "Green", hint: "Solved alone", className: "bg-emerald-800 text-white" },
  { id: "yellow", label: "Yellow", hint: "Needed a hint", className: "bg-amber-700 text-white" },
  { id: "red", label: "Red", hint: "Read the solution", className: "bg-red-800 text-white" },
  { id: "blue", label: "Blue", hint: "Pattern yes, code no", className: "bg-sky-800 text-white" },
];

export function MarkButtons({
  value,
  onChange,
}: {
  value?: Mark;
  onChange: (mark: Mark) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {marks.map((mark) => (
        <button
          key={mark.id}
          type="button"
          title={mark.hint}
          onClick={() => onChange(mark.id)}
          aria-pressed={value === mark.id}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs",
            value === mark.id ? mark.className : "bg-secondary text-foreground",
          )}
        >
          {mark.label}
        </button>
      ))}
    </div>
  );
}

export const markHint: Record<Mark, string> = {
  green: "Solved alone",
  yellow: "Hint",
  red: "Solution",
  blue: "Pattern only",
};
