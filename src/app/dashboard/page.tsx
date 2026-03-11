"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/supabase/auth";

export default function DashboardOverview() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.push("/login");
      else setUser(u);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">مرحباً في لوحة الإدارة</h1>
      <div className="mb-8">تم تسجيل الدخول كـ: <span className="font-semibold text-primary-100">{user?.email}</span></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-bg-100 p-6 rounded-xl shadow-soft text-center">
          <div className="text-xl font-bold mb-2">المعرض</div>
          <div className="text-2xl text-primary-100">إدارة المعرض</div>
        </div>
        <div className="bg-bg-100 p-6 rounded-xl shadow-soft text-center">
          <div className="text-xl font-bold mb-2">الشهادات</div>
          <div className="text-2xl text-primary-100">إدارة الشهادات</div>
        </div>
        <div className="bg-bg-100 p-6 rounded-xl shadow-soft text-center">
          <div className="text-xl font-bold mb-2">المستخدمون</div>
          <div className="text-2xl text-primary-100">إدارة المستخدمين</div>
        </div>
      </div>
    </div>
  );
}
