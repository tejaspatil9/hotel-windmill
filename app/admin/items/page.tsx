"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

type Category = {
  id: string;
  name: string;
};

type Item = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url: string | null;
  category_id: string;
  is_veg: boolean;
  is_available: boolean;
  is_recommended: boolean; // ⭐ NEW
};

/* ================= PAGE ================= */

export default function ItemsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [filterCat, setFilterCat] = useState("");
  const [editing, setEditing] = useState<Item | null>(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    is_veg: true,
    is_available: true,
    is_recommended: false, // ⭐ NEW
  });

  /* ========== LOAD DATA ========== */

  useEffect(() => {
    loadCategories();
    loadItems();
  }, []);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("name");

    setCategories(data || []);
  }

  async function loadItems(catId?: string) {
    let q = supabase.from("items").select("*").order("created_at", {
      ascending: false,
    });

    if (catId) q = q.eq("category_id", catId);

    const { data } = await q;
    setItems(data || []);
  }

  /* ========== ADD ITEM ========== */

  async function addItem(e: any) {
    e.preventDefault();

    const file = e.target.image.files[0];
    if (!file) {
      alert("Please select an image");
      return;
    }

    const cleanName = file.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");

    const path = `items/${Date.now()}-${cleanName}`;

    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(path, file);

    if (error) {
      alert("Image upload failed");
      return;
    }

    const image_url =
      supabase.storage
        .from("menu-images")
        .getPublicUrl(data.path).data.publicUrl;

    await supabase.from("items").insert({
      name: form.name,
      price: Number(form.price),
      description: form.description,
      category_id: form.category_id,
      is_veg: form.is_veg,
      is_available: form.is_available,
      is_recommended: form.is_recommended, // ⭐
      image_url,
    });

    e.target.reset();
    setForm({
      name: "",
      price: "",
      description: "",
      category_id: "",
      is_veg: true,
      is_available: true,
      is_recommended: false,
    });

    loadItems(filterCat);
  }

  /* ========== TOGGLES ========== */

  async function toggleAvailability(item: Item) {
    await supabase
      .from("items")
      .update({ is_available: !item.is_available })
      .eq("id", item.id);

    loadItems(filterCat);
  }

  async function toggleRecommended(item: Item) {
    await supabase
      .from("items")
      .update({ is_recommended: !item.is_recommended })
      .eq("id", item.id);

    loadItems(filterCat);
  }

  /* ========== DELETE ========== */

  async function deleteItem(id: string) {
    if (!confirm("Delete item?")) return;
    await supabase.from("items").delete().eq("id", id);
    loadItems(filterCat);
  }

  /* ========== UPDATE ========== */

  async function updateItem() {
    if (!editing) return;

    await supabase
      .from("items")
      .update({
        name: editing.name,
        price: editing.price,
        description: editing.description,
        is_veg: editing.is_veg,
        is_available: editing.is_available,
        is_recommended: editing.is_recommended, // ⭐
      })
      .eq("id", editing.id);

    setEditing(null);
    loadItems(filterCat);
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#fdf5ee] py-10 text-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Admin – Menu Items
        </h1>

        {/* ADD ITEM */}
        <form
          onSubmit={addItem}
          className="bg-white rounded-xl shadow p-6 max-w-md mx-auto mb-10 space-y-3"
        >
          <h2 className="text-xl font-semibold">Add Dish</h2>

          <input
            placeholder="Dish name"
            required
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            required
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            required
            className="w-full border p-3 rounded"
            onChange={(e) =>
              setForm({ ...form, category_id: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input type="file" name="image" required />

          <div className="flex flex-wrap gap-6 text-sm mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) =>
                  setForm({ ...form, is_veg: e.target.checked })
                }
              />
              Veg
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) =>
                  setForm({ ...form, is_available: e.target.checked })
                }
              />
              Available
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) =>
                  setForm({ ...form, is_recommended: e.target.checked })
                }
              />
              Recommended ⭐
            </label>
          </div>

          <button className="w-full bg-green-500 text-white py-3 rounded font-medium">
            Add Dish
          </button>
        </form>

        {/* FILTER */}
        <div className="mb-6 text-center">
          <select
            className="border p-2 rounded"
            onChange={(e) => {
              setFilterCat(e.target.value);
              loadItems(e.target.value);
            }}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* ITEMS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  className="h-40 w-full object-cover"
                />
              )}

              <div className="p-4 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>
                    {item.name}{" "}
                    {item.is_recommended && (
                      <span className="text-yellow-500 ml-1">⭐</span>
                    )}
                  </span>
                  <span>₹{item.price}</span>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                )}

                <div className="flex gap-2 text-xs mt-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      item.is_veg
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.is_veg ? "Veg" : "Non-veg"}
                  </span>

                  <span
                    className={`px-2 py-1 rounded ${
                      item.is_available
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.is_available ? "Available" : "Unavailable"}
                  </span>

                  {item.is_recommended && (
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="flex justify-between mt-3 text-sm">
                  <button
                    onClick={() => toggleAvailability(item)}
                    className="underline"
                  >
                    Availability
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleRecommended(item)}
                      className="underline"
                    >
                      ⭐
                    </button>

                    <button
                      onClick={() => setEditing(item)}
                      className="underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {editing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96 space-y-3">
              <h2 className="font-semibold text-lg">Edit Dish</h2>

              <input
                className="w-full border p-2 rounded"
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />

              <input
                type="number"
                className="w-full border p-2 rounded"
                value={editing.price}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    price: Number(e.target.value),
                  })
                }
              />

              <textarea
                className="w-full border p-2 rounded"
                value={editing.description || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    description: e.target.value,
                  })
                }
              />

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={editing.is_veg}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      is_veg: e.target.checked,
                    })
                  }
                />
                Veg
              </label>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={editing.is_available}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      is_available: e.target.checked,
                    })
                  }
                />
                Available
              </label>

              <label className="flex gap-2">
                <input
                  type="checkbox"
                  checked={editing.is_recommended}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      is_recommended: e.target.checked,
                    })
                  }
                />
                Recommended ⭐
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditing(null)}>Cancel</button>
                <button
                  onClick={updateItem}
                  className="bg-black text-white px-4 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
