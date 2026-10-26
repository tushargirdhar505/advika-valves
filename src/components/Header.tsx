"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Menu, 
  X, 
  Download, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { BUSINESS_INFO } from "@/types/product";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Download Catalog", href: "/download-catalog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full z-50 sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-navy-900 text-white text-xs py-2 px-4 border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white tracking-wide uppercase">
              Official Dealer
            </span>
            <span className="text-slate-200 font-medium">
              Authorised Dealer of Flowsid Valves
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="hidden md:flex items-center gap-3">
              <span>Managers:</span>
              <a 
                href={BUSINESS_INFO.contacts[0].telUrl} 
                className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                <Phone className="w-3 h-3 text-blue-400" />
                Dinesh: {BUSINESS_INFO.contacts[0].phoneDisplay}
              </a>
              <span className="text-slate-600">|</span>
              <a 
                href={BUSINESS_INFO.contacts[1].telUrl} 
                className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                <Phone className="w-3 h-3 text-blue-400" />
                Sidharth: {BUSINESS_INFO.contacts[1].phoneDisplay}
              </a>
            </div>

            <a 
              href={`mailto:${BUSINESS_INFO.email}`} 
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
            >
              <Mail className="w-3 h-3 text-blue-400" />
              <span className="hidden sm:inline">{BUSINESS_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-44 sm:h-14 sm:w-52 flex items-center">
              <Image
                src="/images/logo-light.png"
                alt="Advika Valves Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-blue-700 bg-blue-50/80 font-semibold"
                    : "text-slate-700 hover:text-navy-900 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/download-catalog"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-navy-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Catalog PDF</span>
            </Link>

            <a
              href={BUSINESS_INFO.contacts[0].whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={BUSINESS_INFO.contacts[0].whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-green-600 hover:bg-green-50 rounded-md sm:hidden"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-navy-900 hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? "text-blue-700 bg-blue-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
              Direct Contact
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={BUSINESS_INFO.contacts[0].whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-white bg-green-600 rounded-lg shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <Link
                href="/download-catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Download PDF</span>
              </Link>
            </div>
            <div className="text-[11px] text-slate-500 px-2 pt-1">
              Ph: +91 9811049614 / +91 8447952332
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
