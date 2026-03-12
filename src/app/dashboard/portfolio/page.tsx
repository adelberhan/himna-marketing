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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     if (editing && form.id) {
  //       await updatePortfolio(form.id, form);
  //     } else {
  //       await addPortfolio(form);
  //     }
  //     setEditing(false);
  //     setForm({ id: null, title: "", description: "", type: types[0], image_url: "", video_url: "" });
  //     loadData();
  //   } catch (error) {
  //     console.error("Error submitting portfolio:", error);
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing && form.id) {
        await updatePortfolio(form.id, form);
      } else {
        // حذف الـ id من البيانات المرسلة عند الإضافة الجديدة
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
    <div className="container mx-auto py-10" dir="rtl">
      <h2 className="text-3xl font-bold tracking-tight mb-8 mt-15 text-center">إدارة المعرض</h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 mb-10 border p-6 bg-transparent rounded-lg text-card-foreground shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="العنوان"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none"
          >
            {types.map((type) => (
              <option key={type} value={type} className="bg-background text-foreground">
                {type}
              </option>
            ))}
          </select>
          <Input
            placeholder="رابط الصورة"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <Input
            placeholder="رابط الفيديو"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
          />
        </div>
        <Textarea
          placeholder="الوصف"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <Button type="submit" className="w-full md:w-max px-10 font-bold transition-transform active:scale-95">
          {editing ? "تحديث العمل" : "إضافة عمل جديد"}
        </Button>
      </form>

      {/* Table Section */}
      <div className="rounded-md border bg-transparent overflow-hidden" dir="rtl">
        <Table>
          <TableCaption>قائمة بجميع الأعمال المضافة.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">العنوان</TableHead>
              <TableHead className="text-right">النوع</TableHead>
              <TableHead className="text-right">المعاينة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolio.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium text-right">{item.title}</TableCell>
                <TableCell className="text-right capitalize">{item.type}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-start items-center">
                    {item.image_url && <span className="text-[10px] bg-muted px-2 py-0.5 rounded border">صورة</span>}
                    {item.video_url && <span className="text-[10px] bg-muted px-2 py-0.5 rounded border">فيديو</span>}
                    {!item.image_url && !item.video_url && <span className="text-muted-foreground">-</span>}
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-start gap-4">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      تعديل
                    </button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-sm font-medium text-red-500 hover:text-red-800 transition-colors">
                          حذف
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir="rtl" className="max-w-[400px]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-right">تأكيد الحذف</AlertDialogTitle>
                          <AlertDialogDescription className="text-right text-xs">
                            سيتم حذف عمل "{item.title}" نهائياً من المعرض.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-4 flex-row-reverse gap-2">
                          <AlertDialogAction 
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700 h-9 text-xs"
                          >
                            تأكيد الحذف
                          </AlertDialogAction>
                          <AlertDialogCancel className="h-9 text-xs border-none">إلغاء</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}