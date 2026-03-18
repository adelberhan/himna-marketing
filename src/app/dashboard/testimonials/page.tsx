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

export default function TestimonialsManagement() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const initialFormState = {
    id: null,
    name: "",
    position: "",
    content: "",
    image: "",
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
      setForm(initialFormState);
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

  if (loading)
    return <div className="flex h-screen items-center justify-center text-white bg-black">جاري التحميل...</div>;

  return (
    <div className="container mx-auto py-10 mt-24 max-w-5xl" dir="rtl">
      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center text-white">إدارة آراء العملاء</h2>

      {/* Form Section - تصميم داكن احترافي */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 mb-10 border border-white/10 p-6 rounded-lg shadow-sm bg-black/20 backdrop-blur-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500 focus:border-white transition-all"
          />
          <Input
            placeholder="المنصب أو الشركة"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500 focus:border-white transition-all"
          />
          <Input
            placeholder="رابط الصورة (اختياري)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="bg-transparent border-white/20 text-white placeholder:text-gray-500 focus:border-white transition-all"
          />
        </div>
        <Textarea
          placeholder="نص الشهادة أو الرأي..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="bg-transparent border-white/20 text-white placeholder:text-gray-500 min-h-[100px] focus:border-white transition-all"
          required
        />
        <div className="flex gap-2">
         <Button
            type="submit"
            className="flex-1 md:flex-none px-12 bg-zinc-800 text-white border border-white/10 hover:bg-zinc-700 hover:border-white/20 font-bold transition-all active:scale-95 shadow-lg"
          >
            {editing ? "تحديث الشهادة" : "إضافة شهادة جديدة"}
          </Button>
          
          {editing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setForm(initialFormState);
              }}
              className=" border-white/10 bg-transparent hover:bg-red-500/10 hover:text-red-400 text-red-400 hover:border-red-500/20 transition-all"
            >
              إلغاء التعديل
            </Button>
          )}
        </div>
      </form>

      {/* Table Section - تصميم شفاف وأنيق */}
      <div className="rounded-md border border-white/10 overflow-hidden bg-black/10 backdrop-blur-sm text-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 border-b border-white/10 hover:bg-white/5">
                <TableHead className="text-right text-gray-300 w-[80px]">العميل</TableHead>
                <TableHead className="text-right text-gray-300 w-[150px]">الاسم</TableHead>
                <TableHead className="text-right text-gray-300">المنصب</TableHead>
                <TableHead className="text-right text-gray-300">المحتوى</TableHead>
                <TableHead className="text-left text-gray-300 px-6">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider delayDuration={200}>
                {testimonials.map((item) => (
                  <TableRow key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="text-right">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 text-[10px] border border-white/10">
                          لا صورة
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-right text-white">{item.name}</TableCell>
                    <TableCell className="text-right text-gray-400 text-sm">{item.position || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="max-w-[250px] truncate text-gray-400 text-sm cursor-help">{item.content}</div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-white text-black max-w-[300px]">
                          <p>{item.content}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-left px-6">
                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleEdit(item)}
                          className="text-amber-400 text-sm bg-amber-400/10 hover:cursor-pointer hover:text-amber-300 hover:underline transition-all"
                        >
                          تعديل
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="text-red-500 text-sm hover:text-red-400 bg-red-500/10 hover:cursor-pointer hover:underline transition-all ">
                              حذف
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent dir="rtl" className="bg-zinc-900 border border-white/10 text-white">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-right">تأكيد الحذف النهائي</AlertDialogTitle>
                              <AlertDialogDescription className="text-right text-gray-400">
                                هل أنت متأكد من حذف رأي "{item.name}"؟ لن تتمكن من استعادته.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-4 flex-row-reverse gap-2">
                              <AlertDialogAction
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-600 hover:bg-red-700 h-9 text-xs border-none"
                              >
                                حذف الآن
                              </AlertDialogAction>
                              <AlertDialogCancel className="h-9 text-xs bg-zinc-800 text-white border-white/10 hover:bg-zinc-700">
                                إلغاء
                              </AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TooltipProvider>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
