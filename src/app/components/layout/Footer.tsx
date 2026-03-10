"use client";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/himnamarketing" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#" },
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
  ];

  const quickLinks = [
    { name: "الرئيسية", href: "#" },
    { name: "من نحن", href: "#about" },
    { name: "خدماتنا", href: "#services" },
    { name: "أعمالنا", href: "#portfolio" },
  ];

  return (
    <footer className="bg-bg-100 border-t border-primary-300/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* العمود الأول: الهوية */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-bold text-primary-100">
              هيمنة<span className="text-accent-100">.</span>
            </Link>
            <p className="text-text-200 leading-relaxed max-w-sm">
              وكالة تسويق إبداعية تسعى لصناعة التأثير وتخفيف الأعباء التسويقية عن كاهل رواد الأعمال.
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-text-100 font-bold mb-6">روابط سريعة</h4>
            <ul className="grid grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-text-200 hover:text-primary-100 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: التواصل الاجتماعي */}
          <div>
            <h4 className="text-text-100 font-bold mb-6">تابعنا</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-bg-200 flex items-center justify-center text-text-200 hover:bg-primary-100 hover:text-white transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* سطر حقوق النشر السفلي */}
        <div className="border-t border-primary-300/10 pt-8 text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-200 text-sm">
            © {currentYear} هيمنة للخدمات التسويقية. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm text-text-200">
            <Link href="#" className="hover:text-primary-100">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-primary-100">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}