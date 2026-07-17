import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LayoutDashboard } from "lucide-react";
import ChatWidget from "../components/ChatWidget";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Support Center",
  description: "Get help and find answers to your questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased bg-white`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-white">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Persistent Support Chat */}
        <ChatWidget />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
