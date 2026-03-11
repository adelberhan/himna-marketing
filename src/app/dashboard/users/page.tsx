"use client";
import { useEffect, useState } from "react";
import { fetchAdmins } from "@/services/supabase/admins";
import { getCurrentUser } from "@/services/supabase/auth";
import { useRouter } from "next/navigation";

export default function UsersManagement() {
  const router = useRouter();
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.push("/login");
    });
    fetchAdmins().then((data) => {
      setAdmins(data || []);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">إدارة المستخدمين</h2>
      <table className="w-full bg-bg-100 rounded-xl shadow-soft">
        <thead>
          <tr className="bg-primary-100 text-white">
            <th className="p-3">البريد الإلكتروني</th>
            <th className="p-3">الدور</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b border-bg-200">
              <td className="p-3">{admin.email}</td>
              <td className="p-3">{admin.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
