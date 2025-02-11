import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/components/LanguageContext";
import { LanguageInitializer } from "@/components/LanguageInitializer";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Antura Christina",
  description: "Antura christina is christian ministry that works on teenage to teach them Bible and help them the truth way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <LanguageInitializer />
          <div className="flex flex-col">
            <Navbar />
            {children}
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}