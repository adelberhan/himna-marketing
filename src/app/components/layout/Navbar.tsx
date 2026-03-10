"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // تعريف الروابط في مصفوفة لتسهيل الإدارة
  const menuItems = [
    { label: "الرئيسية", path: "/" },
    { label: "من نحن", path: "/about" },
    { label: "خدماتنا", path: "/services" },
    { label: "أعمالنا", path: "/portfolio" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md py-1 border-b border-primary-100/5" : "bg-transparent py-7"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group">
          <img
            src="/logo.png"
            alt="Himna Marketing Logo"
            className="h-18 w-auto group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-text-200 hover:text-primary-100 transition-colors font-medium"
            >
              {item.label}
              <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary-100 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary-100 hover:bg-primary-200 text-white px-7 py-2.5 rounded-full transition-all shadow-md font-bold"
          >
            ابدأ مشروعك
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary-100 hover:text-primary-200 transition-colors p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-100/95 backdrop-blur-xl border-b border-primary-100/10 animate-in fade-in slide-in-from-top-5 shadow-xl">
          
          <div className="flex flex-col p-6 space-y-4 text-center">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold py-2 border-b border-white/5 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-primary text-white py-4 rounded-xl font-bold"
            >
              تواصل معنا الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
