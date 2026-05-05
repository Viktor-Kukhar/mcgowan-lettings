"use client";

import { useState } from "react";
import { renderInline } from "@/lib/rich-text";

type Props =
  | { html: string; plainText?: never }
  | { html?: never; plainText: string };

export default function ExpandableDescription(props: Props) {
  const [expanded, setExpanded] = useState(false);

  const isHtml = "html" in props && props.html !== undefined;

  const plainLength = isHtml
    ? props.html.replace(/<[^>]+>/g, " ").trim().length
    : props.plainText.length;
  const paragraphCount = isHtml
    ? (props.html.match(/<p\b/gi) ?? []).length
    : props.plainText.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const isLong = paragraphCount > 2 || plainLength > 500;

  const legacyParagraphs = isHtml
    ? []
    : props.plainText
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

  return (
    <div>
      <div
        className={`relative ${!expanded && isLong ? "max-h-[150px] overflow-hidden" : ""}`}
      >
        {isHtml ? (
          <div
            className="rich-content text-[15px]"
            dangerouslySetInnerHTML={{ __html: props.html }}
          />
        ) : (
          <div className="space-y-3">
            {legacyParagraphs.map((p, i) => (
              <p key={i} className="text-text-muted text-[15px] leading-relaxed">
                {renderInline(p)}
              </p>
            ))}
          </div>
        )}
        {isLong && !expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-semibold text-brand-dark hover:underline cursor-pointer"
        >
          {expanded ? "Show less" : "Read full description"}
        </button>
      )}
    </div>
  );
}
