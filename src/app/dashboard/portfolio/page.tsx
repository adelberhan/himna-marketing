"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// الخدمات
import { addPortfolio, deletePortfolio, fetchPortfolio, updatePortfolio } from "@/services/supabase/portfolio";
import { getCurrentUser } from "@/services/supabase/auth";

// المكونات الجاهزة (UI)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// المكونات الجديدة التي قمنا بفصلها
import MobilePortfolioList from "./MobilePortfolioList";
import DesktopPortfolioTable from "./DesktopPortfolioTable";

// --- 1. الثوابت والأنواع (Constants & Types) ---

export const PORTFOLIO_TYPES = [
  { label: "إدارة السوشيال ميديا", value: "social" },
  { label: "صناعة محتوى (فيديو)", value: "video" },
  { label: "إدارة الإعلانات المدفوعة", value: "ads" },
  { label: "الاستشارات التسويقية", value: "consulting" },
  { label: "تحسين SEO", value: "seo" },
  { label: "حلول التجارة الإلكترونية", value: "ecommerce" },
  { label: "تطوير المواقع والتطبيقات", value: "web" },
  { label: "تحسين Google Maps", value: "maps" },
  { label: "التصوير الاحترافي", value: "photography" },
];

export type PortfolioItem = {
  id: string | number | null;
  title: string;
  description: string;
  type: string;
  image_url: string;
  video_url: string;
};

const initialFormState: PortfolioItem = {
  id: null,
  title: "",
  description: "",
  type: "video",
  image_url: "",
  video_url: "",
};

// --- 2. المكون الرئيسي (Main Component) ---

export default function PortfolioManagement() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<PortfolioItem>(initialFormState);
  const [editing, setEditing] = useState(false);

  // جلب البيانات
  const loadData = async () => {
    try {
      const data = await fetchPortfolio();
      setPortfolio((data || []) as PortfolioItem[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) router.push("/login");
    });
    loadData();
  }, [router]);

  // دالة الإرسال (إضافة أو تحديث)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editing && form.id) {
        await updatePortfolio(form.id, form);
      } else {
        const newProjectData = {
          title: form.title,
          description: form.description,
          type: form.type,
          image_url: form.image_url,
          video_url: form.video_url,
        };
        await addPortfolio(newProjectData);
      }

      setEditing(false);
      setForm(initialFormState);
      loadData();
    } catch (error) {
      console.error("Error submitting portfolio:", error);
      setLoading(false);
    }
  };

  // دالة التعديل
  const handleEdit = (item: PortfolioItem) => {
    setForm(item);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // دالة الحذف
  const handleDelete = async (id: string | number | null) => {
    if (!id) return;
    setLoading(true);
    try {
      await deletePortfolio(id);
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setLoading(false);
    }
  };

  // دالة الحصول على اسم النوع بالعربي
  const getPortfolioTypeLabel = (value: string) => 
    PORTFOLIO_TYPES.find((type) => type.value === value)?.label || value;

  // شاشة التحميل
  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-black text-white">جاري التحميل...</div>;
  }

  return (
    <div className="container mx-auto mt-24 max-w-7xl px-4 py-10 sm:px-6" dir="rtl">
      <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-white">إدارة المعرض</h2>

      {/* نموذج الإدخال (Form) */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 grid gap-4 rounded-lg border border-white/10 bg-black/20 p-4 shadow-sm backdrop-blur-sm sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            placeholder="عنوان العمل"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-transparent text-white placeholder:text-gray-500 focus:border-white"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-white"
          >
            {PORTFOLIO_TYPES.map((type) => (
              <option key={type.value} value={type.value} className="text-black">
                {type.label}
              </option>
            ))}
          </select>

          <Input
            type="text"
            placeholder="رابط الصورة (URL)"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="bg-transparent text-white placeholder:text-gray-500"
          />

          <Input
            type="text"
            placeholder="رابط فيديو اليوتيوب"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            className="bg-transparent text-white placeholder:text-gray-500"
          />
        </div>

        <Textarea
          placeholder="وصف العمل باختصار"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="min-h-[100px] bg-transparent text-white placeholder:text-gray-500"
        />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="submit"
            className="w-full px-6 font-bold text-black transition-all hover:bg-gray-200 sm:w-auto sm:px-12"
          >
            {editing ? "تحديث التعديلات" : "إضافة للعمل"}
          </Button>
          {editing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setForm(initialFormState);
              }}
              className="w-full border-white/20 text-white hover:bg-white/10 sm:w-auto"
            >
              إلغاء التعديل
            </Button>
          )}
        </div>
      </form>

      {/* عرض البيانات (مقسمة لشاشات الموبايل والديسكتوب) */}
      <div className="overflow-hidden rounded-md border border-white/10 bg-black/10 backdrop-blur-sm">
        
        <MobilePortfolioList 
          portfolio={portfolio} 
          getPortfolioTypeLabel={getPortfolioTypeLabel}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

        <DesktopPortfolioTable 
          portfolio={portfolio} 
          getPortfolioTypeLabel={getPortfolioTypeLabel}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />

      </div>
    </div>
  );
}