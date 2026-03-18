"use client";
import { useEffect, useState } from "react";
import { fetchPortfolio, addPortfolio, updatePortfolio, deletePortfolio } from "@/services/supabase/portfolio";
import { getCurrentUser } from "@/services/supabase/auth";
import { useRouter } from "next/navigation";

// استيراد مكونات shadcn/ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// تحديد الأنواع: الـ value هو ما يذهب لقاعدة البيانات، والـ label هو ما يراه المستخدم
const PORTFOLIO_TYPES = [
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

export default function PortfolioManagement() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // الحالة الابتدائية للنموذج
  const initialFormState = {
    id: null,
    title: "",
    description: "",
    type: "video", 
    image_url: "",
    video_url: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (!u) router.push("/login");
    });
    loadData();
  }, [router]);

  const loadData = () => {
    fetchPortfolio().then((data) => {
      setPortfolio(data || []);
      setLoading(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing && form.id) {
        await updatePortfolio(form.id, form);
      } else {
        const { id, ...newProjectData } = form;
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

  const handleEdit = (item: any) => {
    setForm(item);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: any) => {
    setLoading(true);
    try {
      await deletePortfolio(id);
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-white bg-black">جاري التحميل...</div>;

  return (
    <div className="container mx-auto py-10 mt-24" dir="rtl">
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center text-white">إدارة المعرض</h2>

      {/* Form Section - تصميم داكن احترافي */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-10 border border-white/10 p-6 rounded-lg shadow-sm bg-black/20 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="عنوان العمل"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500 focus:border-white transition-all"
          />
          
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="flex h-10 w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:ring-1 focus:ring-white outline-none"
          >
            {PORTFOLIO_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="text-black">
                {t.label}
              </option>
            ))}
          </select>

          <Input
            type="text"
            placeholder="رابط الصورة (URL)"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500"
          />

          <Input
            type="text"
            placeholder="رابط فيديو اليوتيوب"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
        
        <Textarea
          placeholder="وصف العمل باختصار"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="bg-transparent border-white/20 text-white placeholder:text-gray-500 min-h-[100px]"
        />
        
        <div className="flex gap-2">
            <Button type="submit" className="flex-1 md:flex-none px-12 bg-white text-black hover:bg-gray-200 font-bold transition-all">
                {editing ? "تحديث التعديلات" : "إضافة للعمل"}
            </Button>
            {editing && (
                <Button type="button" variant="outline" onClick={() => {setEditing(false); setForm(initialFormState)}} className="text-white border-white/20 hover:bg-white/10">
                    إلغاء التعديل
                </Button>
            )}
        </div>
      </form>

      {/* Table Section - تصميم شفاف وأنيق */}
      <div className="rounded-md border border-white/10 overflow-hidden bg-black/10 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 border-b border-white/10 hover:bg-white/5">
                <TableHead className="text-right text-gray-300">العنوان</TableHead>
                <TableHead className="text-right text-gray-300">النوع</TableHead>
                <TableHead className="text-right text-gray-300">المحتوى</TableHead>
                <TableHead className="text-right text-gray-300 px-6">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider delayDuration={200}>
                {portfolio.map((item) => {
                  const isLongTitle = item.title.length > 15;
                  const mobileTitle = isLongTitle ? item.title.substring(0, 15) + "..." : item.title;

                  return (
                    <TableRow key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-right text-white">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help max-w-[200px] truncate">
                              {mobileTitle}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-white text-black">
                            <p className="max-w-[250px]">{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>

                      <TableCell className="text-right text-gray-400">
                        <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">
                            {PORTFOLIO_TYPES.find(t => t.value === item.type)?.label || item.type}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-start">
                          {item.image_url && <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 rounded">صورة</span>}
                          {item.video_url && <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 rounded">فيديو</span>}
                        </div>
                      </TableCell>

                      <TableCell className="text-right px-6">
                        <div className="flex gap-4">
                          <Button onClick={() => handleEdit(item)} className="text-amber-400 text-sm bg-amber-400/10 hover:cursor-pointer hover:text-amber-300 hover:underline transition-all">
                            تعديل
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="text-red-500 text-sm hover:text-red-400 bg-red-500/10 hover:cursor-pointer hover:underline transition-all ">حذف</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent dir="rtl" className="bg-zinc-900 border border-white/10 text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف النهائي</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  هل أنت متأكد من حذف "{item.title}"؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex-row-reverse gap-2">
                                <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 hover:bg-red-700 text-white border-none">
                                  حذف الآن
                                </AlertDialogAction>
                                <AlertDialogCancel className="bg-zinc-800 text-white border-white/10 hover:bg-zinc-700">إلغاء</AlertDialogCancel>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TooltipProvider>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}