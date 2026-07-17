"use client";

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, LogIn, Menu, X, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const pathname = usePathname();

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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-[15px] h-[76px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold text-xl tracking-tight cursor-pointer uppercase hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white shadow-sm shadow-primary-600/30">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          Support
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">
          <Link 
            href="/" 
            className={`relative py-1 hover:text-primary-600 transition-colors cursor-pointer 
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 
            ${pathname === '/' ? 'text-primary-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
          >
            Home
          </Link>
          <Link 
            href="/#solutions" 
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '/#solutions');
              }
            }}
            className={`relative py-1 hover:text-primary-600 transition-colors cursor-pointer 
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 
            ${pathname === '/#solutions' ? 'text-primary-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
          >
            Solutions
          </Link>
          <Link 
            href="/article/request-a-payment" 
            className={`relative py-1 hover:text-primary-600 transition-colors cursor-pointer 
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 
            ${pathname === '/article/request-a-payment' ? 'text-primary-600 after:w-full' : 'after:w-0 hover:after:w-full'}`}
          >
            Resources
          </Link>
          {user && (
            <Link 
              href={user.role === 'Admin' ? "/admin" : user.role === 'Agent' ? "/agent" : "/dashboard"} 
              className={`relative py-1 hover:text-primary-600 transition-colors cursor-pointer 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary-500 after:transition-all after:duration-300 
              ${['/admin', '/agent', '/dashboard'].includes(pathname || '') ? 'text-primary-600 after:w-full' : 'text-slate-600 after:w-0 hover:after:w-full'}`}
            >
              My Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href={user.role === 'Admin' ? "/admin" : user.role === 'Agent' ? "/agent" : "/dashboard"} className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 hover:text-primary-600 border border-slate-200 hover:border-primary-200 transition-colors px-4 h-[46px] rounded-[8px] cursor-pointer" title={user.name}>
                <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold uppercase text-xs">
                  {user.name ? user.name[0] : 'U'}
                </div>
                {user.name}
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 text-sm font-bold text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-colors px-4 h-[46px] rounded-[8px] cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 px-6 h-[46px] rounded-[8px] cursor-pointer">
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          )}
          <Link href="/contact" className="bg-primary-600 hover:bg-primary-500 text-white border border-transparent text-sm font-medium px-5 sm:px-8 h-[46px] flex items-center justify-center rounded-[8px] transition-all duration-300 cursor-pointer shadow-sm">
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
        <div className="md:hidden bg-white/95 border-t border-slate-100 backdrop-blur-md animate-fade-in shadow-2xl">
          <nav className="flex flex-col text-center p-[15px] gap-2 text-sm font-medium text-slate-600">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="hover:text-primary-600 py-1.5 transition-colors cursor-pointer block w-full"
            >
              Home
            </Link>
            <Link 
              href="/#solutions" 
              onClick={(e) => {
                setIsOpen(false);
                if (pathname === '/') {
                  e.preventDefault();
                  document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '/#solutions');
                }
              }}
              className="hover:text-primary-600 py-1.5 transition-colors cursor-pointer block w-full"
            >
              Solutions
            </Link>
            <Link 
              href="/article/request-a-payment" 
              onClick={() => setIsOpen(false)}
              className="hover:text-primary-600 py-1.5 transition-colors cursor-pointer block w-full"
            >
              Resources
            </Link>
            {user && (
              <Link 
                href={user.role === 'Admin' ? "/admin" : user.role === 'Agent' ? "/agent" : "/dashboard"}
                onClick={() => setIsOpen(false)}
                className="text-primary-600 hover:text-primary-700 py-1.5 transition-colors cursor-pointer font-bold block w-full"
              >
                My Dashboard
              </Link>
            )}
            
            {user ? (
              <div className="flex flex-col gap-4 py-4 mt-2 border-t border-slate-100">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <div className="w-10 h-10 rounded-full bg-primary-100 border border-primary-200 text-primary-700 flex items-center justify-center font-bold uppercase">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <span>{user.name} ({user.role})</span>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 h-[46px] rounded-[8px] cursor-pointer text-center w-full transition-colors mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 mt-2 border-t border-slate-100">
                <Link 
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-primary-600 transition-all duration-300 h-[46px] rounded-[8px] cursor-pointer text-center w-full"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
export default Header;
