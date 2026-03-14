"use client";
import { useEffect, useState } from "react";
import { fetchPortfolio, addPortfolio, updatePortfolio, deletePortfolio } from "@/services/supabase/portfolio";
import { getCurrentUser } from "@/services/supabase/auth";
import { useRouter } from "next/navigation";

// استيراد مكونات shadcn/ui
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      setForm({ id: null, title: "", description: "", type: types[0], image_url: "", video_url: "" });
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

  if (loading) return <div className="flex h-screen items-center justify-center">جاري التحميل...</div>;

  return (
    <div className="container mx-auto py-10 mt-24" dir="rtl">
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">إدارة المعرض</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-10 border p-6 rounded-lg shadow-sm">
         {/* ... بقية حقول الإدخال كما هي في كودك ... */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="العنوان" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm">
            {types.map((type) => (
              <option key={type} value={type} className="text-black">{type}</option>
            ))}
          </select>
        </div>
        <Textarea placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <Button type="submit" className="w-full md:w-max">{editing ? "تحديث العمل" : "إضافة عمل جديد"}</Button>
      </form>

      {/* Table Section */}
      <div className="rounded-md border overflow-hidden"> 
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-right w-[150px]">العنوان</TableHead>
                <TableHead className="text-right w-[100px]">النوع</TableHead>
                <TableHead className="text-right w-[120px]">المعاينة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider delayDuration={200}>
                {portfolio.map((item) => {
                  // الحساب يتم هنا لكل عنصر على حدة
                  const isLongTitle = item.title.length > 10;
                  const mobileTitle = isLongTitle ? item.title.substring(0, 10) + "..." : item.title;

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-right p-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-help">
                              {/* شاشة الجوال: 10 حروف */}
                              <span className="md:hidden block text-sm">{mobileTitle}</span>
                              {/* شاشات أكبر: نص كامل مع truncate */}
                              <span className="hidden md:block max-w-[180px] truncate">{item.title}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="max-w-[250px]">{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>

                      <TableCell className="text-right">{item.type}</TableCell>
                      
                      <TableCell className="text-right">
                        <div className="flex flex-wrap gap-1">
                          {item.image_url && <span className="text-[10px] border px-1 rounded">صورة</span>}
                          {item.video_url && <span className="text-[10px] border px-1 rounded">فيديو</span>}
                        </div>
                      </TableCell>

                      <TableCell className="text-left">
                         {/* أزرار الحذف والتعديل */}
                         <div className="flex gap-3">
                           <button onClick={() => handleEdit(item)} className="text-amber-400 text-sm">تعديل</button>
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="text-red-500 text-sm">حذف</button>
                              </AlertDialogTrigger>
                              <AlertDialogContent dir="rtl">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                  <AlertDialogDescription>حذف "{item.title}"؟</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row-reverse gap-2">
                                  <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600">حذف</AlertDialogAction>
                                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
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