"use client";
import { useEffect, useState } from "react";
import {
  fetchTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/services/supabase/testimonials";
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
    loadData();
  }, [router]);

  const loadData = () => {
    fetchTestimonials().then((data) => {
      setTestimonials(data || []);
      setLoading(false);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing && form.id) {
        await updateTestimonial(form.id, form);
      } else {
        const { id, ...newTestimonialData } = form;
        await addTestimonial(newTestimonialData);
      }
      setEditing(false);
      setForm({ id: null, name: "", position: "", content: "", image: "" });
      loadData();
    } catch (error) {
      console.error("Error submitting form:", error);
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
      await deleteTestimonial(id);
      loadData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">جاري التحميل...</div>;

  return (
    <div className="container mx-auto py-10 mt-24 max-w-5xl" dir="rtl">
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center mt-15">إدارة آراء العملاء</h2>
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 mb-10 border p-6 rounded-lg text-card-foreground shadow-sm bg-transparent"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  text-white">
          <Input
            placeholder="الاسم"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            placeholder="المنصب"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <Input
            placeholder="رابط الصورة الشخصية"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>
        <Textarea
          placeholder="نص الشهادة أو الرأي..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="min-h-[100px]"
          required
        />
        <Button
          type="submit"
          className="w-full md:w-max bg-gray-400 px-10 font-bold transition-transform active:scale-95 hover:cursor-pointer hover:bg-gray-600"
        >
          {editing ? "تحديث الشهادة" : "إضافة شهادة جديدة"}
        </Button>
      </form>

      {/* Table Section */}
      <div className="rounded-md border bg-transparent overflow-x-auto text-white">
        <Table>
          <TableCaption>قائمة بآراء العملاء والشهادات المضافة.</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted text-muted-foreground">
              <TableHead className="text-right w-[80px]">الصورة</TableHead>
              <TableHead className="text-right w-[150px]">الاسم</TableHead>
              <TableHead className="text-right">المنصب</TableHead>
              <TableHead className="text-right">المحتوى</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="text-right">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-10 h-10 rounded-full object-cover border" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-[10px] border">
                      لا صورة
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium text-right">{item.name}</TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">{item.position || "-"}</TableCell>
                <TableCell className="text-right max-w-[300px] truncate text-muted-foreground text-sm">
                  {item.content}
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex justify-start gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-sm font-medium text-amber-300 hover:cursor-pointer hover:text-slate-900 transition-colors"
                    >
                      تعديل
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-sm font-medium text-red-500 hover:text-red-800 transition-colors hover:cursor-pointer">
                          حذف
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir="rtl" className="max-w-[400px]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-right">تأكيد الحذف</AlertDialogTitle>
                          <AlertDialogDescription className="text-right text-xs">
                            سيتم حذف بيانات "{item.name}" نهائياً.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-4 flex-row-reverse gap-2">
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700 h-9 text-xs"
                          >
                            تأكيد الحذف
                          </AlertDialogAction>
                          <AlertDialogCancel className="h-9 text-xs border-none   bg-gray-900 text-white hover:!bg-gray-600 hover:text-white hover:cursor-pointer ">
                            إلغاء
                          </AlertDialogCancel>
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
