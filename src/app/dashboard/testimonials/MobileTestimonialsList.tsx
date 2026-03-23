"use client";

import { Button } from "@/components/ui/button";
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

interface Props {
  testimonials: any[];
  handleEdit: (item: any) => void;
  handleDelete: (id: any) => void;
}

export default function MobileTestimonialsList({ testimonials, handleEdit, handleDelete }: Props) {
  return (
    <div className="space-y-4 p-4 md:hidden">
      {testimonials.map((item) => (
        <div key={item.id ?? item.name} className="rounded-lg border border-white/10 bg-black/20 p-4">
          <div className="flex items-start gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-gray-500">
                لا صورة
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-base font-semibold text-white">{item.name}</h3>
              <p className="mt-1 break-words text-sm text-gray-400">{item.position || "-"}</p>
            </div>
          </div>

          <p className="mt-4 break-words text-sm leading-6 text-gray-400">{item.content}</p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => handleEdit(item)}
              className="w-full bg-amber-400/10 text-sm text-amber-400 transition-all hover:cursor-pointer hover:text-amber-300 hover:underline sm:w-auto"
            >
              تعديل
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-red-500/10 text-sm text-red-500 transition-all hover:cursor-pointer hover:text-red-400 hover:underline sm:w-auto">
                  حذف
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent dir="rtl" className="border border-white/10 bg-zinc-900 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-right">تأكيد الحذف النهائي</AlertDialogTitle>
                  <AlertDialogDescription className="text-right text-gray-400">
                    هل أنت متأكد من حذف رأي &quot;{item.name}&quot;؟ لن تتمكن من استعادته.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 flex-col-reverse gap-2 sm:flex-row-reverse">
                  <AlertDialogAction
                    onClick={() => handleDelete(item.id)}
                    className="h-9 border-none bg-red-600 text-xs hover:bg-red-700"
                  >
                    حذف الآن
                  </AlertDialogAction>
                  <AlertDialogCancel className="h-9 border-white/10 bg-zinc-800 text-xs text-white hover:bg-zinc-700">
                    إلغاء
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}