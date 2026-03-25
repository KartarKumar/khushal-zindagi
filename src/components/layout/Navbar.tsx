"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const item = useCartStore((s) => s.item);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-950 to-navy-700 flex items-center justify-center">
              <span className="text-gold-400 font-bold text-lg">KZ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-navy-950 font-bold text-lg leading-tight block">
                {BRAND.name}
              </span>
              <span className="text-xs text-gray-500 leading-none">
                {BRAND.taglineEn}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gold-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="hidden sm:flex items-center gap-1.5 text-sm text-navy-700 hover:text-gold-500 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Call Now</span>
            </a>

            <Link
              href="/checkout"
              className="relative p-2 text-navy-950 hover:text-gold-500 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {item && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {item.quantity}
                </span>
              )}
            </Link>

            <Link
              href="/product"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all"
            >
              Order Now
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-navy-950"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden animate-slide-down bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gold-500/5 hover:text-gold-500 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/product"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-400 text-white px-5 py-3 rounded-full text-sm font-semibold"
            >
              Order Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
