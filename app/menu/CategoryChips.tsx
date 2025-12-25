"use client";

import { Category } from "./types";

export default function CategoryChips({
  categories,
  onSelect,
}: {
  categories: Category[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto mb-4">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className="border px-4 py-1 rounded-full text-black"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
