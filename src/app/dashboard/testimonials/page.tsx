"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// الخدمات
import {
  addTestimonial,
  deleteTestimonial,
  fetchTestimonials,
  updateTestimonial,
} from "@/services/supabase/testimonials";
import { getCurrentUser } from "@/services/supabase/auth";

// المكونات
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// المكونات الفرعية الجديدة
import MobileTestimonialsList from "./MobileTestimonialsList";
import DesktopTestimonialsTable from "./DesktopTestimonialsTable";

// الأنواع
export type TestimonialItem = {
  id: string | number | null;
  name: string;
  position: string;
  content: string;
  image: string;
};

const initialFormState: TestimonialItem = {
  id: null,
  name: "",
  position: "",
  content: "",
  image: "",
};

export default function TestimonialsManagement() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<TestimonialItem>(initialFormState);
  const [editing, setEditing] = useState(false);

  const loadData = () => {
    fetchTestimonials().then((data) => {
      setTestimonials((data || []) as TestimonialItem[]);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) router.push("/login");
    });
    loadData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing && form.id) {
        await updateTestimonial(form.id, form);
      } else {
        await addTestimonial({ ...form });
      }
      setEditing(false);
      setForm(initialFormState);
      loadData();
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const handleEdit = (item: TestimonialItem) => {
    setForm(item);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: TestimonialItem["id"]) => {
    if (!id) return;
    setLoading(true);
    try {
      await deleteTestimonial(id);
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-black text-white">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto mt-24 max-w-5xl px-4 py-10 sm:px-6" dir="rtl">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-white">إدارة آراء العملاء</h2>

      {/* نموذج الإدخال */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4 shadow-sm backdrop-blur-sm sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Input
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="bg-transparent text-white focus:border-white"
          />
          <Input
            placeholder="المنصب أو الشركة"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="bg-transparent text-white focus:border-white"
          />
          <Input
            placeholder="رابط الصورة (اختياري)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="bg-transparent text-white focus:border-white"
          />
        </div>
        <Textarea
          value={form.content}
          placeholder="نص التعليق أو الرأي..."
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="min-h-[100px] bg-transparent text-white focus:border-white"
          required
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="submit"
            className="w-full border border-white/10 px-6 font-bold bg-green-500/10 text-green-400 hover:bg-green-500/30 sm:w-auto sm:px-12"
          >
            {editing ? "تحديث " : "إضافة "}
          </Button>
          {editing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setForm(initialFormState);
              }}
              className="w-full border-white/10 bg-transparent text-red-400 hover:bg-red-500/10 sm:w-auto"
            >
              إلغاء 
            </Button>
          )}
        </div>
      </form>

      {/* العرض */}
      <div className="overflow-hidden rounded-md border border-white/10 bg-black/10 text-white backdrop-blur-sm">
        <MobileTestimonialsList testimonials={testimonials} handleEdit={handleEdit} handleDelete={handleDelete} />
        <DesktopTestimonialsTable testimonials={testimonials} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
