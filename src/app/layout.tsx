import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LayoutDashboard, LogIn, Menu } from "lucide-react";

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
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm shadow-primary-200">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              Nexus
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-primary-600 transition-colors">Products</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Solutions</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Resources</a>
              <a href="#" className="text-primary-600 font-semibold">Support</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
              <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all shadow-sm shadow-primary-200">
                Get Started
              </button>
              <button className="md:hidden text-slate-600 hover:text-primary-600 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 font-medium">
              <div className="w-6 h-6 rounded-md bg-slate-300 flex items-center justify-center text-white">
                <LayoutDashboard className="w-3 h-3" />
              </div>
              © {new Date().getFullYear()} Nexus Inc. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
