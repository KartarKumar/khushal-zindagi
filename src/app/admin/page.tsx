"use client";

import { useAdminStore } from "@/store/admin";
import {
  ShoppingCart, DollarSign, TrendingUp, Users, Star, Package,
  ArrowUpRight, ArrowDownRight, Clock,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { orders, reviews } = useAdminStore();

  const totalRevenue = orders.filter((o) => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0);
  const todayOrders = orders.filter((o) => o.createdAt.startsWith("2026-03-25")).length;
  const pendingOrders = orders.filter((o) => o.shippingStatus === "processing").length;
  const deliveredOrders = orders.filter((o) => o.shippingStatus === "delivered").length;
  const pendingReviews = reviews.filter((r) => !r.isApproved).length;
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";
  const codOrders = orders.filter((o) => o.paymentMethod === "cod").length;
  const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length;

  const stats = [
    { label: "Total Revenue", value: `Rs. ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-100 text-green-600", trend: "+18%", up: true },
    { label: "Total Orders", value: orders.length.toString(), icon: ShoppingCart, color: "bg-blue-100 text-blue-600", trend: "+12%", up: true },
    { label: "Today's Orders", value: todayOrders.toString(), icon: TrendingUp, color: "bg-gold-200/50 text-gold-500", trend: "+2", up: true },
    { label: "Avg Rating", value: avgRating, icon: Star, color: "bg-yellow-100 text-yellow-600", trend: "4.8+", up: true },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${stat.up ? "text-green-600" : "text-red-500"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-navy-950">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-navy-950 mb-4">Quick Overview</h3>
          <div className="space-y-3">
            {[
              { label: "Pending Orders", value: pendingOrders, color: "text-amber-600 bg-amber-50", href: "/admin/orders" },
              { label: "Delivered Orders", value: deliveredOrders, color: "text-green-600 bg-green-50", href: "/admin/orders" },
              { label: "Paid Orders", value: paidOrders, color: "text-blue-600 bg-blue-50", href: "/admin/orders" },
              { label: "COD Orders", value: codOrders, color: "text-purple-600 bg-purple-50", href: "/admin/orders" },
              { label: "Pending Reviews", value: pendingReviews, color: "text-orange-600 bg-orange-50", href: "/admin/reviews" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className={`text-sm font-bold px-2.5 py-1 rounded-full ${item.color}`}>
                  {item.value}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-navy-950">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm text-gold-500 hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3">
                      <p className="font-medium text-navy-950">{order.orderNumber}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="py-3">
                      <p className="text-navy-950">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.city}</p>
                    </td>
                    <td className="py-3 font-semibold text-navy-950">
                      Rs. {order.total.toLocaleString()}
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        order.shippingStatus === "delivered" ? "bg-green-100 text-green-700" :
                        order.shippingStatus === "shipped" ? "bg-blue-100 text-blue-700" :
                        order.shippingStatus === "returned" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {order.shippingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* City Distribution + Payment Split */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-navy-950 mb-4">Orders by City</h3>
          <div className="space-y-3">
            {Object.entries(
              orders.reduce((acc, o) => ({ ...acc, [o.city]: (acc[o.city] || 0) + 1 }), {} as Record<string, number>)
            )
              .sort((a, b) => b[1] - a[1])
              .map(([city, count]) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-24">{city}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                      style={{ width: `${(count / orders.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-navy-950 w-8 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-navy-950 mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {[
              { method: "Cash on Delivery", count: orders.filter((o) => o.paymentMethod === "cod").length, color: "bg-amber-500" },
              { method: "JazzCash", count: orders.filter((o) => o.paymentMethod === "jazzcash").length, color: "bg-red-500" },
              { method: "Easypaisa", count: orders.filter((o) => o.paymentMethod === "easypaisa").length, color: "bg-green-500" },
            ].map((pm) => (
              <div key={pm.method} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${pm.color}`} />
                <span className="text-sm text-gray-600 flex-1">{pm.method}</span>
                <span className="text-sm font-bold text-navy-950">{pm.count} orders</span>
                <span className="text-xs text-gray-400">({Math.round((pm.count / orders.length) * 100)}%)</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-navy-950 mb-3">Bundle Distribution</h4>
            {[
              { bundle: "Starter Pack", count: orders.filter((o) => o.bundleId === "starter").length },
              { bundle: "Couple's Choice", count: orders.filter((o) => o.bundleId === "popular").length },
              { bundle: "Premium Supply", count: orders.filter((o) => o.bundleId === "premium").length },
            ].map((b) => (
              <div key={b.bundle} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-gray-600">{b.bundle}</span>
                <span className="text-sm font-semibold text-navy-950">{b.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
