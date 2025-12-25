"use client";

import type { CartItem } from "./types";


type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  name: string;
  table: number;
  total: number;
  updateQty: (id: string, d: number) => void;
  updateNote: (id: string, note: string) => void;
  openWaiterView: () => void;
};

export default function CartDrawer({
  open,
  onClose,
  cart,
  name,
  table,
  total,
  updateQty,
  updateNote,
  openWaiterView,
}: Props) {
  if (!open) return null;

  const time = new Date().toLocaleString();

  const message = encodeURIComponent(
    `🍽️ New Order\n\nName: ${name}\nTable: ${table}\nTime: ${time}\n\n` +
      cart
        .map(
          (i) =>
            `• ${i.name} x${i.qty} ₹${i.price * i.qty}${
              i.note ? `\n  Note: ${i.note}` : ""
            }`
        )
        .join("\n") +
      `\n\nTotal: ₹${total}`
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50">
      <div className="bg-white w-full p-4 rounded-t-xl">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold">Your Order</h2>
          <button onClick={onClose}>Cancel</button>
        </div>

        {cart.map((i) => (
          <div key={i.id} className="border-b py-3">
            <div className="flex justify-between">
              <span>{i.name}</span>
              <span>₹{i.price * i.qty}</span>
            </div>

            <div className="flex gap-3 items-center mt-1">
              <button onClick={() => updateQty(i.id, -1)}>−</button>
              <span>{i.qty}</span>
              <button onClick={() => updateQty(i.id, 1)}>+</button>
            </div>

            <textarea
              value={i.note || ""}
              onChange={(e) => updateNote(i.id, e.target.value)}
              placeholder="Add note"
              className="border w-full mt-2 p-2 text-sm"
            />
          </div>
        ))}

        <a
          href={`https://wa.me/?text=${message}`}
          target="_blank"
          className="block bg-green-600 text-white py-3 rounded text-center mt-4"
        >
          Send Order on WhatsApp
        </a>

        <button
          onClick={openWaiterView}
          className="border py-3 w-full rounded mt-2"
        >
          Show Order to Waiter
        </button>
      </div>
    </div>
  );
}
