"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Category, Item, CartItem } from "./types";
import TableSelect from "./TableSelect";
import MenuHeader from "./MenuHeader";
import CategoryChips from "./CategoryChips";
import MenuItems from "./MenuItems";
import CartBar from "./CartBar";
import CartDrawer from "./CartDrawer";
import WaiterView from "./WaiterView";

export default function MenuClient() {
  const [table, setTable] = useState<number | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("windmill_table");
    if (t) setTable(Number(t));
  }, []);

  if (!table) return <TableSelect onSelect={setTable} />;
  return <Menu table={table} />;
}

function Menu({ table }: { table: number }) {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [showWaiter, setShowWaiter] = useState(false);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    (async () => {
      const { data: c } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true);

      const { data: i } = await supabase
        .from("items")
        .select("*")
        .eq("is_available", true);

      setCategories(c || []);
      setItems(i || []);
    })();
  }, []);

  function addItem(item: Item) {
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((x) =>
          x.id === id ? { ...x, qty: x.qty + delta } : x
        )
        .filter((x) => x.qty > 0)
    );
  }

  function updateNote(id: string, note: string) {
    setCart((prev) =>
      prev.map((x) => (x.id === id ? { ...x, note } : x))
    );
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <main className="min-h-screen bg-white pb-32 px-4 text-black">
      <MenuHeader table={table} />

      {/* CUSTOMER NAME */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="w-full border p-3 my-3 rounded-lg"
      />

      {/* 🔍 UNIVERSAL SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search dishes..."
        className="w-full border p-3 mb-3 rounded-lg"
      />

      {/* CATEGORY CHIPS ONLY WHEN NOT SEARCHING */}
      {!search && (
        <CategoryChips
          categories={categories}
          onSelect={(id) =>
            sectionRefs.current[id]?.scrollIntoView({
              behavior: "smooth",
            })
          }
        />
      )}

      {/* MENU ITEMS */}
      <MenuItems
        categories={categories}
        items={items}
        cart={cart}
        sectionRefs={sectionRefs}
        addItem={addItem}
        updateQty={updateQty}
        search={search}
      />

      <CartBar
        count={cart.length}
        total={total}
        onOpen={() => setOpenCart(true)}
      />

      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        table={table}
        total={total}
        updateQty={updateQty}
        updateNote={updateNote}
        openWaiterView={() => {
          setOpenCart(false);
          setShowWaiter(true);
        }}
      />

      {showWaiter && (
        <WaiterView
          cart={cart}
          table={table}
          total={total}
          name={name}
          onClose={() => setShowWaiter(false)}
        />
      )}
    </main>
  );
}
