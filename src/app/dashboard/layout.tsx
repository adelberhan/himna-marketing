// import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <main className="min-w-0 flex-1 bg-bg-200 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
