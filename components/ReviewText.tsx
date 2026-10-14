"use client";

import { useId, useState } from "react";

const CLAMP_THRESHOLD = 220;

type ReviewTextProps = {
  text: string;
  readMoreLabel: string;
  readLessLabel: string;
};

export default function ReviewText({ text, readMoreLabel, readLessLabel }: ReviewTextProps) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const isLong = text.length > CLAMP_THRESHOLD;

  return (
    <>
      <p
        id={id}
        className={`mt-4 text-sm leading-relaxed whitespace-pre-line text-slate-text ${
          isLong && !expanded ? "line-clamp-5" : ""
        }`}
      >
        {text}
      </p>
      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-2 self-start text-xs font-semibold tracking-wide text-teal transition-colors hover:underline"
        >
          {expanded ? readLessLabel : readMoreLabel}
        </button>
      ) : null}
    </>
  );
}
