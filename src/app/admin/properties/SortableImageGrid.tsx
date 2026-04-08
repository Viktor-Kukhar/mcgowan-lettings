"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  onReorder: (images: string[]) => void;
  onRemove: (index: number) => void;
};

export default function SortableImageGrid({ images, onReorder, onRemove }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    setDragIndex(index);
    dragNode.current = e.currentTarget;
    e.dataTransfer.effectAllowed = "move";
    // Make the drag image slightly transparent
    setTimeout(() => {
      if (dragNode.current) dragNode.current.style.opacity = "0.4";
    }, 0);
  };

  const handleDragEnd = () => {
    if (dragNode.current) dragNode.current.style.opacity = "1";
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const reordered = [...images];
      const [moved] = reordered.splice(dragIndex, 1);
      reordered.splice(overIndex, 0, moved);
      onReorder(reordered);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {images.map((url, index) => (
        <div
          key={`${url}-${index}`}
          draggable
          onDragStart={(e) => handleDragStart(index, e)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(index, e)}
          className={`group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 cursor-grab active:cursor-grabbing transition-transform ${
            overIndex === index && dragIndex !== index
              ? "ring-2 ring-brand scale-[1.02]"
              : ""
          }`}
        >
          <Image
            src={url}
            alt={`Property image ${index + 1}`}
            fill
            className="object-cover pointer-events-none"
            sizes="200px"
          />
          {/* Remove button */}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Main badge */}
          {index === 0 && (
            <span className="absolute left-1.5 top-1.5 rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-dark">
              Main
            </span>
          )}
          {/* Drag handle hint */}
          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            Drag to reorder
          </div>
        </div>
      ))}
    </div>
  );
}
