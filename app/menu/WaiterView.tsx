"use client";

import { CartItem } from "./types";

type Props = {
  cart: CartItem[];
  table: number;
  total: number;
  name: string;
  onClose: () => void;
};

export default function WaiterView({
  cart,
  table,
  total,
  name,
  onClose,
}: Props) {
  const time = new Date().toLocaleString();

  function changeTable() {
    localStorage.removeItem("windmill_table");
    localStorage.removeItem("windmill_name");
    location.reload(); // clean reset
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">Order for Staff</h1>
            <p className="text-xs text-gray-500">{time}</p>
          </div>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 underline"
          >
            Close
          </button>
        </div>

        {/* META INFO */}
        <div className="p-4 space-y-1 text-sm">
          <p>
            <span className="text-gray-500">Name:</span>{" "}
            <span className="font-medium">{name || "—"}</span>
          </p>
          <p>
            <span className="text-gray-500">Table:</span>{" "}
            <span className="font-medium">{table}</span>
          </p>
        </div>

        <hr />

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start text-sm"
            >
              <div>
                <p className="font-medium">
                  {item.name} × {item.qty}
                </p>
                {item.note && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    Note: {item.note}
                  </p>
                )}
              </div>

              <span className="font-medium">
                ₹{item.price * item.qty}
              </span>
            </div>
          ))}
        </div>

        <hr />

        {/* FOOTER */}
        <div className="p-4 space-y-3 border-t">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={changeTable}
            className="w-full border border-black py-2 rounded-lg text-sm"
          >
            Change Table
          </button>
        </div>
      </div>
    </div>
  );
}
