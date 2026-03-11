import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "هيمنة للخدمات التسويقية | Himna Marketing",
  description: "نخفف عليك ضغوط أعمالك ونتولى مهامك التسويقية بكل احترافية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-cairo antialiased bg-bg-100 text-text-100`}>
        
        <ThemeProvider>
          <Navbar /> {/* <-- وضعه هنا ليكون ثابتاً في كل الموقع */}
          <main className="min-h-screen ">
            {/* إعطاء مساحة علوية لتجنب تغطية الـ Navbar للمحتوى */}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
