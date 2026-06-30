"use client";

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, LogIn, Menu, X, LogOut } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('nexus_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();

    window.addEventListener('storage', checkUser);
    window.addEventListener('auth-change', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('auth-change', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nexus_user');
    setUser(null);
    window.dispatchEvent(new CustomEvent('auth-change'));
    window.location.href = '/';
  };

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
          {user && (
            <Link href={user.role === 'Admin' ? "/admin" : "/dashboard"} className="text-primary-600 hover:text-primary-700 transition-colors cursor-pointer font-bold">My Dashboard</Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href={user.role === 'Admin' ? "/admin" : "/dashboard"} className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-primary-50 border border-primary-200 text-primary-600 flex items-center justify-center font-bold uppercase">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <span>{user.name}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors px-3 cursor-pointer">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}
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
            {user && (
              <Link 
                href={user.role === 'Admin' ? "/admin" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="text-primary-600 hover:text-primary-700 py-1.5 transition-colors cursor-pointer font-bold"
              >
                My Dashboard
              </Link>
            )}
            <hr className="border-slate-100 my-1" />
            {user ? (
              <div className="flex flex-col gap-3 py-1">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                  <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold uppercase">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <span>{user.name} ({user.role})</span>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 py-1.5 cursor-pointer text-left w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary-600 py-1.5 cursor-pointer text-left w-full"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
export default Header;
