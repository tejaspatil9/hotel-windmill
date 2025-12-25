"use client";

export default function TableSelect({
  onSelect,
}: {
  onSelect: (n: number) => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 15 }, (_, i) => i + 1).map((t) => (
          <button
            key={t}
            onClick={() => {
              localStorage.setItem("windmill_table", String(t));
              onSelect(t);
            }}
            className="border rounded-xl px-6 py-4 text-black font-medium"
          >
            Table {t}
          </button>
        ))}
      </div>
    </div>
  );
}
