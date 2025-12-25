"use client";

import Image from "next/image";
import { useState, MutableRefObject } from "react";
import { Category, Item, CartItem } from "./types";

type Props = {
  categories: Category[];
  items: Item[];
  cart: CartItem[];
  sectionRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  addItem: (item: Item) => void;
  updateQty: (id: string, delta: number) => void;
  search: string;
};

export default function MenuItems({
  categories,
  items,
  cart,
  sectionRefs,
  addItem,
  updateQty,
  search,
}: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const q = search.trim().toLowerCase();

  const visibleItems = q
    ? items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      )
    : [];

  /* ================= SEARCH MODE ================= */
  if (q) {
    return (
      <>
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>

        {visibleItems.length === 0 && (
          <p className="text-gray-500">No items found</p>
        )}

        {visibleItems.map((item, index) => {
          const cartItem = cart.find((x) => x.id === item.id);

          return (
            <div key={item.id} className="py-4">
              <ItemRow
                item={item}
                cartItem={cartItem}
                addItem={addItem}
                updateQty={updateQty}
                setPreviewImage={setPreviewImage}
              />
              {index !== visibleItems.length - 1 && (
                <div className="border-b mt-4" />
              )}
            </div>
          );
        })}

        <ImagePreview
          previewImage={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      </>
    );
  }

  /* ================= NORMAL CATEGORY MODE ================= */
  return (
    <>
      {categories.map((category) => (
        <div
          key={category.id}
          ref={(el) => {
            sectionRefs.current[category.id] = el;
          }}
          className="mb-10"
        >
          <h2 className="text-lg font-semibold mb-4">
            {category.name}
          </h2>

          {items
            .filter((i) => i.category_id === category.id)
            .map((item, index, arr) => {
              const cartItem = cart.find((x) => x.id === item.id);

              return (
                <div key={item.id} className="py-4">
                  <ItemRow
                    item={item}
                    cartItem={cartItem}
                    addItem={addItem}
                    updateQty={updateQty}
                    setPreviewImage={setPreviewImage}
                  />
                  {index !== arr.length - 1 && (
                    <div className="border-b mt-4" />
                  )}
                </div>
              );
            })}
        </div>
      ))}

      <ImagePreview
        previewImage={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </>
  );
}

/* ================= ITEM ROW ================= */

function ItemRow({
  item,
  cartItem,
  addItem,
  updateQty,
  setPreviewImage,
}: any) {
  return (
    <div className="flex gap-4 items-start">
      {item.image_url && (
        <button onClick={() => setPreviewImage(item.image_url)}>
          <Image
            src={item.image_url}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </button>
      )}

      <div className="flex-1">
        <div className="flex justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  item.is_veg ? "bg-green-600" : "bg-red-600"
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </div>

            {item.description && (
              <p className="text-sm text-gray-600 mt-1">
                {item.description}
              </p>
            )}
          </div>

          <span className="font-medium">₹{item.price}</span>
        </div>

        {!cartItem ? (
          <button
            onClick={() => addItem(item)}
            className="mt-2 border px-4 py-1 rounded"
          >
            Add
          </button>
        ) : (
          <div className="mt-2 flex items-center gap-4">
            <button onClick={() => updateQty(item.id, -1)}>−</button>
            <span>{cartItem.qty}</span>
            <button onClick={() => updateQty(item.id, 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= IMAGE PREVIEW ================= */

function ImagePreview({
  previewImage,
  onClose,
}: {
  previewImage: string | null;
  onClose: () => void;
}) {
  if (!previewImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <Image
        src={previewImage}
        alt="Preview"
        width={400}
        height={400}
        className="rounded-xl object-contain max-h-[90vh] max-w-[90vw]"
      />
    </div>
  );
}
