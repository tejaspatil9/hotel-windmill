"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Category = {
  id: string;
  name: string;
  is_active: boolean;
};

export default function CategoriesPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("created_at");

    setCategories(data || []);
  }

  async function addCategory() {
    if (!name.trim()) return;

    await supabase.from("categories").insert({ name });
    setName("");
    loadCategories();
  }

  async function toggleCategory(cat: Category) {
    await supabase
      .from("categories")
      .update({ is_active: !cat.is_active })
      .eq("id", cat.id);

    loadCategories();
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    loadCategories();
  }

  return (
    <div className="min-h-screen bg-[#fdf5ee] py-10 text-gray-900">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Admin – Categories
        </h1>

        {/* ADD CARD */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Category</h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="w-full border p-3 rounded mb-4"
          />

          <button
            onClick={addCategory}
            className="w-full bg-orange-500 text-white py-3 rounded font-medium"
          >
            Add Category
          </button>
        </div>

        {/* LIST */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">All Categories</h2>

          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex justify-between items-center border-b py-3"
            >
              <span>{cat.name}</span>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded ${
                    cat.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {cat.is_active ? "Active" : "Inactive"}
                </button>

                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <p className="text-sm text-gray-500">No categories added</p>
          )}
        </div>
      </div>
    </div>
  );
}
