"use client";

import { CartItem } from "./types";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  name: string; 
  table: number;
  total: number;
  updateQty: (id: string, delta: number) => void;
  updateNote: (id: string, note: string) => void;
  openWaiterView: (name: string) => void;
};

export default function CartDrawer({
  open,
  onClose,
  cart,
  table,
  total,
  updateQty,
  updateNote,
  openWaiterView,
}: Props) {
  const [name, setName] = useState("");

  if (!open) return null;

  function sendWhatsApp() {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const lines = cart.map(
      (i) =>
        `${i.name} × ${i.qty}${i.note ? `\nNote: ${i.note}` : ""}`
    );

    const msg = `
🧾 *New Order*
👤 Name: ${name}
🪑 Table: ${table}

${lines.join("\n\n")}

💰 Total: ₹${total}
    `.trim();

    window.open(
      `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[85vh] overflow-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Your Order</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* NAME INPUT */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full border p-3 rounded mb-4"
        />

        {/* ITEMS */}
        {cart.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>₹{item.price * item.qty}</span>
            </div>

            <div className="flex gap-3 items-center mt-1">
              <button onClick={() => updateQty(item.id, -1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)}>+</button>
            </div>

            <textarea
              placeholder="Add note"
              className="w-full border p-2 rounded mt-2 text-sm"
              onChange={(e) =>
                updateNote(item.id, e.target.value)
              }
            />
          </div>
        ))}

        <div className="font-medium mb-3">Total: ₹{total}</div>

        <button
          onClick={() => openWaiterView(name)}
          className="w-full bg-black text-white py-3 rounded mb-2"
        >
          Show Order to Waiter
        </button>

        <button
          onClick={sendWhatsApp}
          className="w-full border py-3 rounded"
        >
          Send Order on WhatsApp
        </button>
      </div>
    </div>
  );
}
