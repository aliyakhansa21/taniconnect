"use client";

import { useState } from "react";
import { Search, Plus, Clock, ShoppingBag, Receipt } from "lucide-react";

const STAT_CARDS = [
  { id: "pesanan-aktif", label: "Pesanan Aktif", value: "3", icon: Clock },
  { id: "total-pesanan", label: "Total Pesanan", value: "3", icon: ShoppingBag },
  { id: "total-pengeluaran", label: "Total Pengeluaran", value: "3", icon: Receipt },
];

const ORDERS = [
  {
    id: "tnc-1",
    code: "#TNC-443",
    petani: "Pak Olivia Washingthin",
    date: "26 Mei 2026",
    item: "Tomat Segar 20kg",
    status: "Selesai",
  },
  {
    id: "tnc-2",
    code: "#TNC-443",
    petani: "Pak Olivia Washingthin",
    date: "26 Mei 2026",
    item: "Tomat Segar 20kg",
    status: "Selesai",
  },
  {
    id: "tnc-3",
    code: "#TNC-443",
    petani: "Pak Olivia Washingthin",
    date: "26 Mei 2026",
    item: "Tomat Segar 20kg",
    status: "Selesai",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Selesai: "text-[#3A7D1E] border-[#3A7D1E]",
  Proses: "text-blue-600 border-blue-400",
  Batal: "text-red-500 border-red-400",
};

export default function PesananPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ORDERS.filter(
    (o) =>
      o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.petani.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-gray-900">Pesanan Saya</h1>
          <button
            id="buat-pesanan-btn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D3A1E] text-white text-sm font-bold hover:bg-[#1C2B0E] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Buat Pesanan Baru
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="rounded-2xl border border-gray-200 p-4 flex flex-col justify-between min-h-[88px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-gray-500">{card.label}</span>
                  <Icon size={18} className="text-gray-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search + Orders */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              id="pesanan-search"
              type="text"
              placeholder="Cari pesanan, petani, atau produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Order Cards */}
        <div className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              Tidak ada pesanan ditemukan.
            </p>
          ) : (
            filtered.map((order) => (
              <div
                key={order.id}
                className="px-5 py-4 bg-[#FDFAF0] hover:bg-[#F8F4E4] transition-colors"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-sm font-bold text-gray-900">
                      {order.code}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                      {order.petani} | {order.date}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${
                      STATUS_STYLES[order.status] ??
                      "text-gray-600 border-gray-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                {/* Item */}
                <p className="text-sm text-gray-700">{order.item}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
