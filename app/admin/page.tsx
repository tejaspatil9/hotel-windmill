"use client";

import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-[#fdf5ee] text-gray-900 flex items-center justify-center px-4">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center mb-10">
          Admin Panel
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Categories Card */}
          <Link
            href="/admin/categories"
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Manage Categories
            </h2>
            <p className="text-sm text-gray-600">
              Add, activate or delete menu categories
            </p>
          </Link>

          {/* Items Card */}
          <Link
            href="/admin/items"
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Manage Items
            </h2>
            <p className="text-sm text-gray-600">
              Add dishes, prices, images and availability
            </p>
          </Link>
        </div>

        {/* Optional footer */}
        <p className="text-center text-xs text-gray-400 mt-12">
          Windmill Restaurant · Admin Dashboard
        </p>
      </div>
    </div>
  );
}
