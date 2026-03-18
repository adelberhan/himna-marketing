import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { cn } from "@/lib/utils";
// import { Link } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import ScrollTopButton from "@/components/ui/ScrollTopButton";
import Footer from "./components/layout/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://himna-marketing.vercel.app"),

  verification: {
    google: "B5qPdiT6GrM8TMGp2sM7_U2rx0FNwUv_s9Sa9y0Y_Mg",
  },

  title: "هيمنة للتسويق الرقمي | وكالة تسويق إبداعية في الرياض",

  description:
    "هيمنة وكالة تسويق رقمي متخصصة في إدارة السوشيال ميديا، صناعة المحتوى، والحملات الإعلانية. نساعد علامتك التجارية على الهيمنة على السوق السعودي.",

  keywords: [
    "وكالة تسويق",
    "تسويق رقمي",
    "إدارة السوشيال ميديا",
    "وكالة تسويق في الرياض",
    "Digital Marketing Agency Saudi Arabia",
  ],

  icons: {
    icon: "/ham.svg",
  },

  openGraph: {
    title: "هيمنة للتسويق الرقمي",
    description:
      "وكالة تسويق رقمي متخصصة في إدارة السوشيال ميديا وصناعة المحتوى والحملات الإعلانية.",
    url: "https://himna-marketing.vercel.app",
    siteName: "Himna Marketing",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Himna Marketing",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "هيمنة للتسويق الرقمي",
    description:
      "وكالة تسويق رقمي متخصصة في إدارة السوشيال ميديا وصناعة المحتوى.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${cairo.variable} font-cairo antialiased bg-bg-100 text-text-100`}>
        <ThemeProvider>
          <Navbar /> {/* <-- وضعه هنا ليكون ثابتاً في كل الموقع */}
          <main className="min-h-screen ">
            {/* إعطاء مساحة علوية لتجنب تغطية الـ Navbar للمحتوى */}
            {children}
          </main>
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "هيمنة للتسويق",
                url: "https://himna-marketing.vercel.app",
                logo: "https://himna-marketing.vercel.app/ham.svg",
                sameAs: ["https://instagram.com", "https://linkedin.com"],
                description: "وكالة تسويق رقمي متخصصة في إدارة السوشيال ميديا وصناعة المحتوى.",
              }),
            }}
          />
          <Link
            href="https://wa.me/966570591088"
            target="_blank"
            rel="noopener noreferrer"
            className="group fixed bottom-6 left-6 z-50 px-5 py-3 text-black hover:text-white hover:bg-bg-200 bg-[#25D366] rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(0,119,194,0.3)]"
          >
            <FaWhatsapp className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />

            {/* تأثير اللمعان */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
          <ScrollTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
