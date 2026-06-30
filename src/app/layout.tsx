import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LayoutDashboard } from "lucide-react";
import ChatWidget from "../components/ChatWidget";
import Header from "../components/Header";

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
        <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 font-medium">
              <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-slate-300">
                <LayoutDashboard className="w-3 h-3" />
              </div>
              © {new Date().getFullYear()} Ticket-it. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-primary-400 transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-primary-400 transition-colors cursor-pointer">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
