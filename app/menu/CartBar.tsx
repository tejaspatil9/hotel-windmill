"use client";

export default function CartBar({
  count,
  total,
  onOpen,
}: {
  count: number;
  total: number;
  onOpen: () => void;
}) {
  if (count === 0) return null;

  return (
    <button
      onClick={onOpen}
      className="fixed bottom-4 left-4 right-4 bg-black text-white py-4 rounded-xl"
    >
      {count} items · ₹{total}
    </button>
  );
}
