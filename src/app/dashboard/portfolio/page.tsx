"use client";
import { useEffect, useState } from "react";
import { fetchPortfolio, addPortfolio, updatePortfolio, deletePortfolio } from "@/services/supabase/portfolio";
import { getCurrentUser } from "@/services/supabase/auth";
import { useRouter } from "next/navigation";

const types = ["image", "video", "branding", "website", "other"];

export default function PortfolioManagement() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    type: types[0],
    image_url: "",
    video_url: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.push("/login");
    });
    fetchPortfolio().then((data) => {
      setPortfolio(data || []);
      setLoading(false);
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editing && form.id) {
      await updatePortfolio(form.id, form);
    } else {
      await addPortfolio(form);
    }
    setEditing(false);
    setForm({ id: null, title: "", description: "", type: types[0], image_url: "", video_url: "" });
    fetchPortfolio().then((data) => {
      setPortfolio(data || []);
      setLoading(false);
    });
  };

  const handleEdit = (item: any) => {
    setForm(item);
    setEditing(true);
  };

  const handleDelete = async (id: any) => {
    setLoading(true);
    await deletePortfolio(id);
    fetchPortfolio().then((data) => {
      setPortfolio(data || []);
      setLoading(false);
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">إدارة المعرض</h2>
      <form onSubmit={handleSubmit} className="bg-bg-100 p-6 rounded-xl shadow-soft mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="العنوان"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
          required
        />
        <select
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
        >
          {types.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <input
          type="text"
          placeholder="رابط الصورة"
          value={form.image_url}
          onChange={e => setForm({ ...form, image_url: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
        />
        <input
          type="text"
          placeholder="رابط الفيديو"
          value={form.video_url}
          onChange={e => setForm({ ...form, video_url: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
        />
        <textarea
          placeholder="الوصف"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none col-span-2"
          required
        />
        <button type="submit" className="bg-primary-100 text-white py-3 rounded font-bold hover:bg-primary-200 transition-all col-span-2">
          {editing ? "تحديث" : "إضافة"}
        </button>
      </form>
      <table className="w-full bg-bg-100 rounded-xl shadow-soft">
        <thead>
          <tr className="bg-primary-100 text-white">
            <th className="p-3">العنوان</th>
            <th className="p-3">النوع</th>
            <th className="p-3">الصورة</th>
            <th className="p-3">الفيديو</th>
            <th className="p-3">الوصف</th>
            <th className="p-3">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map(item => (
            <tr key={item.id} className="border-b border-bg-200">
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.type}</td>
              <td className="p-3">{item.image_url ? <img src={item.image_url} alt="صورة" className="w-16 h-16 object-cover rounded" /> : "-"}</td>
              <td className="p-3">{item.video_url ? <a href={item.video_url} target="_blank" rel="noopener noreferrer" className="text-primary-100 underline">مشاهدة</a> : "-"}</td>
              <td className="p-3">{item.description}</td>
              <td className="p-3">
                <button className="bg-primary-100 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(item)}>تعديل</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(item.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
