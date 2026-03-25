import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { MapPin, Phone, Mail, Shield, Truck, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-300">
      {/* Trust Strip */}
      <div className="border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6 text-gold-400" />
              <div>
                <p className="text-white font-semibold text-sm">All Pakistan Delivery</p>
                <p className="text-xs text-gray-400">3-5 business days</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-gold-400" />
              <div>
                <p className="text-white font-semibold text-sm">Discreet Packaging</p>
                <p className="text-xs text-gray-400">Your privacy guaranteed</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-gold-400" />
              <div>
                <p className="text-white font-semibold text-sm">30-Day Guarantee</p>
                <p className="text-xs text-gray-400">Full refund if not satisfied</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center">
                <span className="text-navy-950 font-bold text-lg">KZ</span>
              </div>
              <span className="text-white font-bold text-xl">{BRAND.name}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              Pakistan&apos;s trusted brand for natural men&apos;s wellness solutions.
              Made with 100% herbal ingredients for a healthier, happier life.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4 text-gold-400" /> {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4 text-gold-400" /> {BRAND.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" /> {BRAND.address}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/product", label: "Our Product" },
                { href: "/about", label: "About Us" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
                { href: "/track", label: "Track Order" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-white font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {["Cash on Delivery", "JazzCash", "Easypaisa", "Bank Transfer"].map((method) => (
                <div key={method} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-navy-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>&copy; 2026 {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
