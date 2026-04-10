import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/sw-register";
import "./globals.css";

const _geist = Geist({ subsets: ["cyrillic"] });
const _geistMono = Geist_Mono({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Каппинг кофе",
  description: "Приложение для заметок на каппинг-сессиях",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-512x512.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Каппинг кофе",
  },
};

export const viewport = {
  themeColor: "#78716c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
