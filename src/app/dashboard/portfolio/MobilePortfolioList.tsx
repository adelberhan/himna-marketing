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

// تحديد أنواع البيانات (Props) التي سيستقبلها هذا المكون
interface MobilePortfolioListProps {
  portfolio: any[]; // يفضل استبدال any بـ PortfolioItem 
  getPortfolioTypeLabel: (value: string) => string;
  handleEdit: (item: any) => void;
  handleDelete: (id: any) => void;
}

export default function MobilePortfolioList({
  portfolio,
  getPortfolioTypeLabel,
  handleEdit,
  handleDelete,
}: MobilePortfolioListProps) {
  return (
    <div className="space-y-4 p-4 md:hidden">
      {portfolio.map((item) => (
        <div key={item.id ?? item.title} className="rounded-lg border border-white/10 bg-black/20 p-4">
          <div className="min-w-0">
            <h3 className="break-words text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 inline-flex max-w-full rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">
              {getPortfolioTypeLabel(item.type)}
            </p>
          </div>

          {item.description && (
            <p className="mt-3 break-words text-sm leading-6 text-gray-400">{item.description}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {item.image_url && (
              <span className="rounded border border-blue-500/30 bg-blue-500/20 px-1.5 py-1 text-[10px] text-blue-300">
                صورة
              </span>
            )}
            {item.video_url && (
              <span className="rounded border border-red-500/30 bg-red-500/20 px-1.5 py-1 text-[10px] text-red-300">
                فيديو
              </span>
            )}
          </div>

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
                  <AlertDialogTitle>تأكيد الحذف النهائي</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    هل أنت متأكد من حذف &quot;{item.title}&quot;؟ لا يمكن التراجع عن هذا الإجراء.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row-reverse">
                  <AlertDialogAction
                    onClick={() => handleDelete(item.id)}
                    className="border-none bg-red-600 text-white hover:bg-red-700"
                  >
                    حذف الآن
                  </AlertDialogAction>
                  <AlertDialogCancel className="border-white/10 bg-zinc-800 text-white hover:bg-zinc-700">
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