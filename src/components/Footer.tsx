"use client";

import { usePathname } from 'next/navigation';
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  // Hide footer for logged-in workspaces
  const hiddenRoutes = ['/dashboard', '/admin', '/agent', '/notifications'];
  if (
    pathname &&
    hiddenRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))
  ) {
    return null;
  }

  return (
    <footer className="relative bg-slate-950 border-t border-primary-900/50 py-12 mt-auto overflow-hidden">
      {/* Deep Theme-Colored Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-slate-950 to-blue-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-900/40 via-transparent to-transparent pointer-events-none" />

      {/* Elegant Grid Texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_top,black_70%,transparent_100%)] pointer-events-none" />

      {/* Dynamic Theme Glows */}
      <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[150%] rounded-full bg-primary-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-10%] w-[40%] h-[150%] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[15px] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 text-slate-200 font-medium text-center">
          <div className="w-8 h-8 sm:w-6 sm:h-6 rounded-md bg-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/10">
            <LayoutDashboard className="w-4 h-4 sm:w-3 sm:h-3" />
          </div>
          <span>© {new Date().getFullYear()} Ticket-it. All rights reserved.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-200">
          <a
            href="https://ticket-it.com/wp-content/uploads/2025/07/Ticket-IT-Privacy-Policy-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-300 transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
          <a
            href="https://ticket-it.com/wp-content/uploads/2025/05/ESL-Sales-Agreement-inclusive-of-End-User-Licence.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-300 transition-colors cursor-pointer"
          >
            Terms of Service
          </a>
          <Link href="/agent-login" className="hover:text-primary-300 transition-colors cursor-pointer">
            Agent Login
          </Link>
          <Link href="/admin-login" className="hover:text-primary-300 transition-colors cursor-pointer">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
