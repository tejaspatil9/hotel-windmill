"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 🔐 Allow login page without auth
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }

    const auth = sessionStorage.getItem("admin-auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      {children}
    </div>
  );
}
