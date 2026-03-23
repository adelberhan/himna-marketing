"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

interface DesktopPortfolioTableProps {
  portfolio: any[]; 
  getPortfolioTypeLabel: (value: string) => string;
  handleEdit: (item: any) => void;
  handleDelete: (id: any) => void;
}

export default function DesktopPortfolioTable({
  portfolio,
  getPortfolioTypeLabel,
  handleEdit,
  handleDelete,
}: DesktopPortfolioTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10 bg-white/5 hover:bg-white/5">
            <TableHead className="text-right text-gray-300">العنوان</TableHead>
            <TableHead className="text-right text-gray-300">النوع</TableHead>
            <TableHead className="text-right text-gray-300">المحتوى</TableHead>
            <TableHead className="px-6 text-right text-gray-300">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portfolio.map((item) => {
            return (
              <TableRow
                key={item.id ?? item.title}
                className="border-b border-white/5 transition-colors hover:bg-white/5"
              >
                <TableCell className="text-right font-medium text-white">
                  <div className="max-w-[200px] cursor-help truncate">{item.title}</div>
                </TableCell>

                <TableCell className="text-right text-gray-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">
                    {getPortfolioTypeLabel(item.type)}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-start gap-1">
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
                </TableCell>

                <TableCell className="px-6 text-right">
                  <div className="flex gap-2 lg:gap-4">
                    <Button
                      onClick={() => handleEdit(item)}
                      className="bg-amber-400/10 text-sm text-amber-400 transition-all hover:cursor-pointer hover:text-amber-300 hover:underline"
                    >
                      تعديل
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-500/10 text-sm text-red-500 transition-all hover:cursor-pointer hover:text-red-400 hover:underline">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}