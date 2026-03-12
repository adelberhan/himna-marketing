"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // تأكد من مسار الاستيراد الصحيح

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // حالة تتبع المستخدم
  const router = useRouter();

  // تأثير لمراقبة التمرير (Scroll)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // تأثير للتحقق من حالة تسجيل الدخول (Auth State)
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    // الاستماع لأي تغيير في حالة الدخول/الخروج لتحديث النافبار فوراً
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/"); // إعادة التوجيه للرئيسية بعد تسجيل الخروج
    setIsMobileMenuOpen(false); // إغلاق القائمة في الجوال
  };

  // الروابط الأساسية (تظهر للجميع)
  const menuItems = [
    { label: "الرئيسية", path: "/" },
    { label: "من نحن", path: "/#about" },
    { label: "خدماتنا", path: "/#services" },
    { label: "أعمالنا", path: "/#portfolio" },
    { label: "اتصل بنا", path: "/#contact" },
  ];

  // الروابط الخاصة بالداشبورد (تظهر فقط للمسجلين)
  // قمت بوضع مسارات افتراضية (/dashboard/...) يمكنك تعديلها لتطابق مساراتك
  const authMenuItems = [
    { label: "إدارة الأعمال", path: "/dashboard/portfolio" },
    { label: "إدارة التقييمات", path: "/dashboard/testimonials" },
  ];

  // دمج الروابط بناءً على حالة المستخدم
  const activeMenuItems = user ? [...menuItems, ...authMenuItems] : menuItems;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md py-1 border-b border-primary-100/5 bg-bg-100/80" : "bg-transparent py-7"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group">
          <img
            src="/MainLogo.png"
            alt="Himna Marketing Logo"
            className="h-20 w-auto group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {activeMenuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-text-200 hover:text-primary-100 hover:scale-105 transition-colors font-medium relative group ${
                user && authMenuItems.includes(item) ? "text-accent-200 font-bold" : "" // تمييز لون روابط الداشبورد
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary-100 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* زر تسجيل الخروج يظهر فقط إذا كان المستخدم مسجلاً */}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors font-medium hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              خروج
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary-100 hover:text-primary-200 transition-colors p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-100/95 backdrop-blur-xl border-b border-primary-100/10 animate-in fade-in slide-in-from-top-5 shadow-xl ">
          <div className="flex flex-col p-6 space-y-4 text-center">
            {activeMenuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg hover:text-white hover:bg-primary-200 transition-colors py-2 border-b border-gray-200 last:border-0 hover:scale-105 ${
                  user && authMenuItems.includes(item) ? "font-bold text-accent-200" : "font-semibold"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* زر تسجيل الخروج في الموبايل */}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 text-red-500 font-bold text-lg py-2 hover:bg-red-50 transition-colors rounded-md"
              >
                <LogOut className="w-5 h-5" />
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}