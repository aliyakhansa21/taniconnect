import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaniConnect — Hasil Panen Segar, Langsung ke Meja Restoran Anda",
  description:
    "Platform agri-tech yang menghubungkan petani langsung dengan restoran. Dapatkan hasil panen segar berkualitas premium tanpa perantara dengan teknologi AI terdepan.",
  keywords: "taniconnect, petani, restoran, pertanian, agritech, pangan segar",
  openGraph: {
    title: "TaniConnect — Farm to Table Platform",
    description: "Hubungkan petani lokal dengan restoran premium. Segar, Cepat, Efisien.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
