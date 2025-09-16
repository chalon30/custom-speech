import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import { GreetingProvider } from "@/context/GreetingContext"; // 👈 Importamos el provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Speech",
  description: "Aplicación Next.js con header personalizado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {/* Todo envuelto en GreetingProvider */}
        <GreetingProvider>
          {/* Header global */}
          <Header />
          {/* Contenido de cada página */}
          <main className="max-w-7xl mx-auto p-6">{children}</main>
        </GreetingProvider>
      </body>
    </html>
  );
}
