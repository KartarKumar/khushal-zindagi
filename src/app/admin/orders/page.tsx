"use client";

import { useState } from "react";
import { useAdminStore, Order } from "@/store/admin";
import { Search, Filter, Eye, X, Truck, Phone, MapPin, Package, MessageCircle } from "lucide-react";

const statusColors: Record<string, string> = {
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  returned: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-700",
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-purple-100 text-purple-700",
};

export default function OrdersPage() {
  const { orders, updateOrderStatus, addOrderNote } = useAdminStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [noteText, setNoteText] = useState("");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.shippingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, name, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Product</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Shipping</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-950">{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                    <span className="text-[10px] text-gray-400 uppercase">{order.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-950">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.phone}</p>
                    <p className="text-xs text-gray-400">{order.city}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-navy-950">{order.bundleName}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy-950">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.paymentStatus]}`}>
                      {order.paymentStatus}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{order.paymentMethod}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.shippingStatus}
                      onChange={(e) => updateOrderStatus(order.id, "shippingStatus", e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[order.shippingStatus]}`}
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="returned">Returned</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {order.trackingNumber && (
                      <p className="text-[10px] text-gray-400 mt-1">{order.trackingNumber}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(order)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-950 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-sm">No orders found</p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        Showing {filtered.length} of {orders.length} orders
      </p>

      {/* Order Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-navy-950">{selected.orderNumber}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(selected.createdAt).toLocaleString("en-PK")}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Customer */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Customer</h4>
                <p className="font-semibold text-navy-950">{selected.customerName}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <Phone className="w-3.5 h-3.5" /> {selected.phone}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <MapPin className="w-3.5 h-3.5" /> {selected.address}, {selected.city}
                </div>
                {selected.email && (
                  <p className="text-sm text-gray-500 mt-1">{selected.email}</p>
                )}
              </div>

              {/* Product */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Order Details</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium text-navy-950">{selected.bundleName}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>Rs. {selected.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600">Shipping:</span>
                  <span>{selected.shipping === 0 ? "FREE" : `Rs. ${selected.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm mt-1 pt-1 border-t border-gray-200 font-bold text-navy-950">
                  <span>Total:</span>
                  <span>Rs. {selected.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Status Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Payment Status</label>
                  <select
                    value={selected.paymentStatus}
                    onChange={(e) => {
                      updateOrderStatus(selected.id, "paymentStatus", e.target.value);
                      setSelected({ ...selected, paymentStatus: e.target.value as Order["paymentStatus"] });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Shipping Status</label>
                  <select
                    value={selected.shippingStatus}
                    onChange={(e) => {
                      updateOrderStatus(selected.id, "shippingStatus", e.target.value);
                      setSelected({ ...selected, shippingStatus: e.target.value as Order["shippingStatus"] });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800">
                  <strong>Notes:</strong> {selected.notes}
                </div>
              )}

              {/* Add Note */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() => {
                    if (noteText.trim()) {
                      addOrderNote(selected.id, noteText);
                      setSelected({ ...selected, notes: selected.notes ? `${selected.notes}\n${noteText}` : noteText });
                      setNoteText("");
                    }
                  }}
                  className="px-4 py-2 bg-navy-950 text-white rounded-lg text-sm font-medium hover:bg-navy-800"
                >
                  Add
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <a
                  href={`https://wa.me/${selected.phone.replace(/-/g, "").replace("0", "92")}?text=Hi ${selected.customerName}, your order ${selected.orderNumber} update...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
