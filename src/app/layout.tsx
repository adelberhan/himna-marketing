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

  title: "هيمنة | أفضل وكالة تسويق رقمي في الرياض | SEO وإعلانات تزيد مبيعاتك",

  description:
    "أفضل وكالة تسويق رقمي في الرياض تساعدك على زيادة مبيعاتك من خلال SEO، الإعلانات المدفوعة، وإدارة السوشيال ميديا باستراتيجيات مجربة تحقق نتائج فعلية.",

  keywords: [
    "وكالة تسويق",
    "تسويق رقمي",
    "إدارة السوشيال ميديا",
    "وكالة تسويق في الرياض",
    "Digital Marketing Agency Saudi Arabia",
    "إدارة الحملات الإعلانية الرياض",
    "تحسين محركات البحث الرياض",
    "إدارة وسائل التواصل الاجتماعي الرياض",
    "PPC Agency Riyadh",
    "Social Media Marketing Riyadh",
    "أفضل شركة تسويق رقمي في الرياض",
    "شركة SEO في الرياض للشركات الصغيرة",
    "وكالة تسويق تساعد على زيادة المبيعات في الرياض",
    "affordable digital marketing agency in Riyadh",
    "best SEO services for startups in Riyadh",
    "شركة تسويق رقمي في الرياض",
    "خدمات SEO الرياض",
    "إعلانات Google في الرياض",
    "تسويق الكتروني السعودية",
    "marketing agency riyadh saudi arabia",
  ],
  other: {
    "geo.region": "SA-RIYADH",
    "geo.placename": "Riyadh",
    "geo.position": "24.7136;46.6753",
    ICBM: "24.7136, 46.6753",
  },
  icons: {
    icon: "/ham.svg",
  },

  openGraph: {
    title: "أفضل وكالة تسويق رقمي في الرياض | Himna Marketing",
    description: "وكالة تسويق في الرياض متخصصة في SEO والإعلانات لزيادة المبيعات.",
    url: "https://himna-marketing.vercel.app",
    siteName: "هيمنة للتسويق الرقمي في الرياض",
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
    description: "وكالة تسويق رقمي متخصصة في إدارة السوشيال ميديا وصناعة المحتوى.",
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
                "@type": "LocalBusiness",
                name: "هيمنة للتسويق الرقمي",
                image: "https://himna-marketing.vercel.app/logo.png",
                url: "https://himna-marketing.vercel.app",
                telephone: "+966570591088",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Riyadh",
                  addressCountry: "SA",
                },
                sameAs: ["https://instagram.com", "https://linkedin.com"],
                description: "وكالة تسويق رقمي في الرياض متخصصة في SEO والإعلانات والسوشيال ميديا.",
              }),
            }}
          />
          <Link
            href="https://wa.me/966570591088"
            target="_blank"
            rel="noopener noreferrer"
            className="group fixed bottom-6 left-6 z-50 px-5 py-3 text-black hover:text-white hover:bg-bg-200 bg-[#25D366] rounded-full font-bold text-sm overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(0,119,194,0.3)]"
          >
            <FaWhatsapp className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />

            {/* تأثير اللمعان */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>
          <ScrollTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
