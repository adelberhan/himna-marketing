"use client";
import { useEffect, useState } from "react";
import { fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "@/services/supabase/testimonials";
import { getCurrentUser } from "@/services/supabase/auth";
import { useRouter } from "next/navigation";

export default function TestimonialsManagement() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    name: "",
    position: "",
    content: "",
    image: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.push("/login");
    });
    fetchTestimonials().then((data) => {
      setTestimonials(data || []);
      setLoading(false);
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editing && form.id) {
      await updateTestimonial(form.id, form);
    } else {
      await addTestimonial(form);
    }
    setEditing(false);
    setForm({ id: null, name: "", position: "", content: "", image: "" });
    fetchTestimonials().then((data) => {
      setTestimonials(data || []);
      setLoading(false);
    });
  };

  const handleEdit = (item: any) => {
    setForm(item);
    setEditing(true);
  };

  const handleDelete = async (id: any) => {
    setLoading(true);
    await deleteTestimonial(id);
    fetchTestimonials().then((data) => {
      setTestimonials(data || []);
      setLoading(false);
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">إدارة الشهادات</h2>
      <form onSubmit={handleSubmit} className="bg-bg-100 p-6 rounded-xl shadow-soft mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="الاسم"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
          required
        />
        <input
          type="text"
          placeholder="المنصب"
          value={form.position}
          onChange={e => setForm({ ...form, position: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
        />
        <input
          type="text"
          placeholder="رابط الصورة"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          className="p-3 rounded border border-primary-100 focus:outline-none"
        />
        <textarea
          placeholder="المحتوى"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
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
            <th className="p-3">الاسم</th>
            <th className="p-3">المنصب</th>
            <th className="p-3">الصورة</th>
            <th className="p-3">المحتوى</th>
            <th className="p-3">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(item => (
            <tr key={item.id} className="border-b border-bg-200">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.position}</td>
              <td className="p-3">{item.image ? <img src={item.image} alt="صورة" className="w-16 h-16 object-cover rounded" /> : "-"}</td>
              <td className="p-3">{item.content}</td>
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
