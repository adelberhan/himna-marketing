"use client"

import { usePathname } from "next/navigation"
import Link from "next/link";

const navItems = [
  { label: "لوحة التحكم", href: "/dashboard" },
  { label: "المستخدمون", href: "/dashboard/users" },
  { label: "المعرض", href: "/dashboard/portfolio" },
  { label: "الشهادات", href: "/dashboard/testimonials" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="bg-bg-100 border-r border-primary-100/10 min-h-screen w-64 flex flex-col p-6">
      <div className="mb-8 text-2xl font-bold text-primary-100">هيمنة - الإدارة</div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`py-2 px-4 rounded font-medium transition-all ${
              pathname === item.href
                ? "bg-primary-100 text-white"
                : "text-text-200 hover:bg-primary-100/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
