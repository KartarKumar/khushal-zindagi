"use client";

import { useState } from "react";
import { useAdminStore, DiscountCode } from "@/store/admin";
import { Tag, Plus, ToggleLeft, ToggleRight } from "lucide-react";

export default function DiscountsPage() {
  const { discountCodes, addDiscountCode, toggleDiscount } = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "", type: "percentage" as "percentage" | "fixed",
    value: "", minOrder: "", maxUses: "", expiresAt: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode: DiscountCode = {
      id: Date.now().toString(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder) || 0,
      maxUses: Number(form.maxUses) || 999,
      currentUses: 0,
      isActive: true,
      expiresAt: form.expiresAt,
    };
    addDiscountCode(newCode);
    setForm({ code: "", type: "percentage", value: "", minOrder: "", maxUses: "", expiresAt: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{discountCodes.length} discount codes</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" /> New Code
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-navy-950 mb-4">Create Discount Code</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
              <input
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="e.g. SAVE20"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as "percentage" | "fixed" })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (Rs.)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value ({form.type === "percentage" ? "%" : "Rs."})
              </label>
              <input
                type="number"
                required
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder={form.type === "percentage" ? "e.g. 15" : "e.g. 500"}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Order (Rs.)</label>
              <input
                type="number"
                value={form.minOrder}
                onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                placeholder="e.g. 4000"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
              <input
                type="number"
                value={form.maxUses}
                onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
                placeholder="e.g. 100"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expires</label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-navy-950 text-white rounded-lg text-sm font-semibold hover:bg-navy-800"
            >
              Create Code
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Codes List */}
      <div className="space-y-3">
        {discountCodes.map((code) => (
          <div
            key={code.id}
            className={`bg-white rounded-xl p-5 border-2 transition-colors ${
              code.isActive ? "border-gray-200" : "border-gray-100 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gold-500/10 p-3 rounded-lg">
                  <Tag className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-bold text-navy-950 bg-gray-100 px-3 py-1 rounded-lg">
                      {code.code}
                    </code>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      code.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {code.isActive ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {code.type === "percentage" ? `${code.value}% off` : `Rs. ${code.value} off`}
                    {code.minOrder > 0 && ` | Min order Rs. ${code.minOrder.toLocaleString()}`}
                    {code.expiresAt && ` | Expires ${code.expiresAt}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-navy-950">
                    {code.currentUses}<span className="text-gray-400 text-sm">/{code.maxUses}</span>
                  </p>
                  <p className="text-xs text-gray-400">uses</p>
                </div>
                <button
                  onClick={() => toggleDiscount(code.id)}
                  className="p-1"
                  title={code.isActive ? "Disable" : "Enable"}
                >
                  {code.isActive ? (
                    <ToggleRight className="w-8 h-8 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
