"use client";

import { useAdminStore } from "@/store/admin";
import { Search, Phone, MapPin, ShoppingCart, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const { orders } = useAdminStore();
  const [search, setSearch] = useState("");

  // Group orders by phone (unique customers)
  const customerMap = new Map<string, {
    name: string; phone: string; email: string; city: string;
    totalOrders: number; totalSpent: number; lastOrder: string;
  }>();

  orders.forEach((o) => {
    const existing = customerMap.get(o.phone);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += o.total;
      if (o.createdAt > existing.lastOrder) {
        existing.lastOrder = o.createdAt;
      }
    } else {
      customerMap.set(o.phone, {
        name: o.customerName,
        phone: o.phone,
        email: o.email,
        city: o.city,
        totalOrders: 1,
        totalSpent: o.total,
        lastOrder: o.createdAt,
      });
    }
  });

  const customers = Array.from(customerMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-2xl font-extrabold text-navy-950">{customers.length}</p>
          <p className="text-xs text-gray-500">Total Customers</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-2xl font-extrabold text-green-600">
            {customers.filter((c) => c.totalOrders > 1).length}
          </p>
          <p className="text-xs text-gray-500">Repeat Customers</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-2xl font-extrabold text-navy-950">
            Rs. {customers.length > 0 ? Math.round(customers.reduce((s, c) => s + c.totalSpent, 0) / customers.length).toLocaleString() : 0}
          </p>
          <p className="text-xs text-gray-500">Avg Customer Value</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, or city..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
        />
      </div>

      {/* Customers List */}
      <div className="space-y-3">
        {customers.map((customer) => (
          <div key={customer.phone} className="bg-white rounded-xl p-5 border border-gray-200 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-navy-950 flex items-center justify-center shrink-0">
              <span className="text-gold-400 font-bold">{customer.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-navy-950 truncate">{customer.name}</p>
                {customer.totalOrders > 1 && (
                  <span className="bg-gold-200/50 text-gold-500 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    REPEAT
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{customer.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{customer.city}</span>
                <span className="flex items-center gap-1"><ShoppingCart className="w-3 h-3" />{customer.totalOrders} orders</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-navy-950">Rs. {customer.totalSpent.toLocaleString()}</p>
              <p className="text-[10px] text-gray-400">
                Last: {new Date(customer.lastOrder).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
              </p>
            </div>
            <a
              href={`https://wa.me/${customer.phone.replace(/-/g, "").replace("0", "92")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
