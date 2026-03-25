"use client";

import { useAdminStore } from "@/store/admin";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Star, Tag, Users, Settings,
  LogOut, ChevronRight, Menu, X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/discounts", label: "Discounts", icon: Tag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, login, logout } = useAdminStore();
  const pathname = usePathname();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-navy-950 flex items-center justify-center mb-4">
              <span className="text-gold-400 font-extrabold text-xl">KZ</span>
            </div>
            <h1 className="text-xl font-bold text-navy-950">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">Khushal Zindagi Management</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!login(password)) {
                setError(true);
                setTimeout(() => setError(false), 3000);
              }
            }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
                error ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">Incorrect password. Try again.</p>
            )}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Sign In
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-4">
            Demo password: khushalzindagi2026
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-navy-950 text-white flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-navy-800 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">KZ Admin</h1>
            <p className="text-xs text-gray-400">Khushal Zindagi</p>
          </div>
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold-500/20 text-gold-400"
                    : "text-gray-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-navy-950" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-navy-950 text-lg">
              {navItems.find((n) => (n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href)))?.label || "Admin"}
            </h2>
          </div>
          <Link href="/" className="text-sm text-gold-500 hover:underline">
            View Store
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
