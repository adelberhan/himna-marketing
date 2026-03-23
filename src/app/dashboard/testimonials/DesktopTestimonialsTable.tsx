"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

interface Props {
  testimonials: any[];
  handleEdit: (item: any) => void;
  handleDelete: (id: any) => void;
}

export default function DesktopTestimonialsTable({ testimonials, handleEdit, handleDelete }: Props) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10 bg-white/5 hover:bg-white/5">
            <TableHead className="w-[80px] text-right text-gray-300">العميل</TableHead>
            <TableHead className="w-[150px] text-right text-gray-300">الاسم</TableHead>
            <TableHead className="text-right text-gray-300">المنصب</TableHead>
            <TableHead className="text-right text-gray-300">المحتوى</TableHead>
            <TableHead className="px-6 text-left text-gray-300">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TooltipProvider delayDuration={200}>
            {testimonials.map((item) => (
              <TableRow key={item.id ?? item.name} className="border-b border-white/5 transition-colors hover:bg-white/5">
                <TableCell className="text-right">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-10 w-10 rounded-full border border-white/10 object-cover" />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] text-gray-500">لا صورة</div>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium text-white">{item.name}</TableCell>
                <TableCell className="text-right text-sm text-gray-400">{item.position || "-"}</TableCell>
                <TableCell className="text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="max-w-[250px] cursor-help truncate text-sm text-gray-400">{item.content}</div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[300px] bg-white text-black">
                      <p>{item.content}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-6 text-left">
                  <div className="flex gap-2 lg:gap-4">
                    <Button onClick={() => handleEdit(item)} className="bg-amber-400/10 text-sm text-amber-400 transition-all hover:cursor-pointer hover:text-amber-300 hover:underline">تعديل</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-500/10 text-sm text-red-500 transition-all hover:cursor-pointer hover:text-red-400 hover:underline">حذف</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent dir="rtl" className="border border-white/10 bg-zinc-900 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-right">تأكيد الحذف النهائي</AlertDialogTitle>
                          <AlertDialogDescription className="text-right text-gray-400">هل أنت متأكد من حذف رأي &quot;{item.name}&quot;؟</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-4 flex-col-reverse gap-2 sm:flex-row-reverse">
                          <AlertDialogAction onClick={() => handleDelete(item.id)} className="h-9 border-none bg-red-600 text-xs hover:bg-red-700">حذف الآن</AlertDialogAction>
                          <AlertDialogCancel className="h-9 border-white/10 bg-zinc-800 text-xs text-white hover:bg-zinc-700">إلغاء</AlertDialogCancel>
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
  );
}