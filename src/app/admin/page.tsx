// "use client";
// import { supabase } from "@/lib/supabaseClient";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       if (!data?.user) {
//         router.push("/login");
//       } else {
//         setUser(data.user);
//       }
//       setLoading(false);
//     };
//     getUser();
//   }, [router]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-bg-200">
//       <div className="bg-bg-100 p-8 rounded-xl shadow-soft w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold mb-6">لوحة الإدارة</h2>
//         <p className="mb-4">مرحباً، {user?.email}</p>
//         <button
//           className="bg-primary-100 text-white py-2 px-6 rounded font-bold hover:bg-primary-200 transition-all"
//           onClick={async () => {
//             await supabase.auth.signOut();
//             router.push("/login");
//           }}
//         >
//           تسجيل الخروج
//         </button>
//       </div>
//     </div>
//   );
// }
