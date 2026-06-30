"use client";

import React, { useState } from 'react';
import { LayoutDashboard, LogIn, Menu, X } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight cursor-pointer uppercase hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm shadow-primary-200">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          Support
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary-600 transition-colors cursor-pointer">Home</Link>
          <Link href="/#solutions" className="hover:text-primary-600 transition-colors cursor-pointer">Solutions</Link>
          <Link href="/article/request-a-payment" className="hover:text-primary-600 transition-colors cursor-pointer">Resources</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors px-3 cursor-pointer">
            <LogIn className="w-4 h-4" />
            Sign In
          </button>
          <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-all shadow-sm shadow-primary-200 cursor-pointer">
            Contact
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-fade-in">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-slate-600">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="hover:text-primary-600 py-1.5 transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link 
              href="/#solutions" 
              onClick={() => setIsOpen(false)}
              className="hover:text-primary-600 py-1.5 transition-colors cursor-pointer"
            >
              Solutions
            </Link>
            <Link 
              href="/article/request-a-payment" 
              onClick={() => setIsOpen(false)}
              className="hover:text-primary-600 py-1.5 transition-colors cursor-pointer"
            >
              Resources
            </Link>
            <hr className="border-slate-100 my-1" />
            <button 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-600 py-1.5 cursor-pointer text-left w-full"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
export default Header;
