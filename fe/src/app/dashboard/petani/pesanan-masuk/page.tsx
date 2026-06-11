"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  Star,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────
type KanbanStatus = "dipesan" | "dikonfirmasi" | "dipanen" | "pengiriman" | "selesai";
type FilterTab = KanbanStatus;

interface Order {
  id: string;
  status: KanbanStatus;
  buyer: string;
  type: string;
  product: string;
  price: string;
  sendDate: string;
  estimasiTiba?: string;
  rating?: number;
  ulasan?: string;
  note?: string;
}

// ── Mock Data ──────────────────────────────────────────────
const ORDERS: Order[] = [
  // Dipesan
  { id: "d1", status: "dipesan", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei" },
  { id: "d2", status: "dipesan", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei" },
  { id: "d3", status: "dipesan", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei" },
  // Dikonfirmasi
  { id: "k1", status: "dikonfirmasi", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei" },
  { id: "k2", status: "dikonfirmasi", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei" },
  { id: "k3", status: "dikonfirmasi", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei" },
  // Dipanen
  { id: "p1", status: "dipanen", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei", note: "Siap dikirim hari ini" },
  { id: "p2", status: "dipanen", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei", note: "Siap dikirim hari ini" },
  { id: "p3", status: "dipanen", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei", note: "Siap dikirim hari ini" },
  // Dalam Pengiriman
  { id: "g1", status: "pengiriman", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei", estimasiTiba: "Hari ini 13.00 WIB" },
  // Selesai
  { id: "s1", status: "selesai", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei", rating: 5, ulasan: "Produk sangat segar" },
  { id: "s2", status: "selesai", buyer: "Warung Jepun", type: "Restoran", product: "Tomat Segar 3kg", price: "Rp\u00a036.000", sendDate: "28 Mei", rating: 5, ulasan: "Produk sangat segar" },
];

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "dipesan", label: "Menunggu Konfirmasi" },
  { key: "dikonfirmasi", label: "Dikonfirmasi" },
  { key: "dipanen", label: "Dipanen" },
  { key: "pengiriman", label: "Dalam Pengiriman" },
  { key: "selesai", label: "Pesanan Selesai" },
];

const COLUMNS: { key: KanbanStatus; label: string; dotColor: string }[] = [
  { key: "dipesan", label: "Dipesan", dotColor: "bg-yellow-400" },
  { key: "dikonfirmasi", label: "Dikonfirmasi", dotColor: "bg-blue-400" },
  { key: "dipanen", label: "Dipanen", dotColor: "bg-[#3A7D1E]" },
  { key: "pengiriman", label: "Dalam Pengiriman", dotColor: "bg-gray-700" },
  { key: "selesai", label: "Selesai", dotColor: "bg-[#2D3A1E]" },
];

const STATUS_BADGE: Record<KanbanStatus, string> = {
  dipesan: "bg-[#FEF9EC] text-[#B47A00] border border-[#E6C96A]",
  dikonfirmasi: "bg-blue-50 text-blue-600 border border-blue-300",
  dipanen: "bg-[#EBF4E4] text-[#3A7D1E] border border-[#3A7D1E]",
  pengiriman: "bg-gray-100 text-gray-600 border border-gray-300",
  selesai: "bg-[#EBF4E4] text-[#3A7D1E] border border-[#3A7D1E]",
};

const STATUS_LABEL: Record<KanbanStatus, string> = {
  dipesan: "Baru",
  dikonfirmasi: "Dikonfirmasi",
  dipanen: "Dipanen",
  pengiriman: "Dalam Pengiriman",
  selesai: "Selesai",
};

// ── Order Card ─────────────────────────────────────────────
function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
      {/* Badge */}
      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${STATUS_BADGE[order.status]}`}>
        {STATUS_LABEL[order.status]}
      </span>

      {/* Buyer */}
      <div>
        <p className="text-sm font-bold text-gray-900">{order.buyer}</p>
        <p className="text-xs text-gray-500">{order.type}</p>
      </div>

      {/* Product + Price */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-700">{order.product}</span>
        <span className="text-xs font-semibold text-gray-900">{order.price}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-1.5">
        <CalendarDays size={12} className="text-gray-400" />
        {order.status === "selesai" ? (
          <span className="text-xs text-gray-500">Selesai: {order.sendDate}</span>
        ) : (
          <span className="text-xs text-gray-500">Kirim: {order.sendDate}</span>
        )}
      </div>

      {/* Progress bar — Dalam Pengiriman */}
      {order.status === "pengiriman" && (
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gray-700 rounded-full w-3/5" />
          </div>
          <p className="text-xs text-gray-500">Estimasi tiba: {order.estimasiTiba}</p>
        </div>
      )}

      {/* Note — Dipanen */}
      {order.status === "dipanen" && order.note && (
        <p className="text-xs text-[#3A7D1E] font-medium">{order.note}</p>
      )}

      {/* Rating — Selesai */}
      {order.status === "selesai" && order.rating !== undefined && (
        <div className="space-y-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < order.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          {order.ulasan && (
            <p className="text-xs text-[#3A7D1E] font-medium">Ulasan: {order.ulasan}</p>
          )}
        </div>
      )}

      {/* Action Button */}
      {order.status === "dipesan" && (
        <button
          id={`konfirmasi-${order.id}`}
          className="w-full py-2 rounded-full bg-[#2D3A1E] text-white text-xs font-bold hover:bg-[#1C2B0E] transition-colors"
        >
          Konfirmasi
        </button>
      )}
      {order.status === "dikonfirmasi" && (
        <button
          id={`panen-${order.id}`}
          className="w-full py-2 rounded-full border-2 border-blue-500 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors"
        >
          Tandai Dipanen
        </button>
      )}
      {order.status === "dipanen" && (
        <button
          id={`kirim-${order.id}`}
          className="w-full py-2 rounded-full bg-[#2D3A1E] text-white text-xs font-bold hover:bg-[#1C2B0E] transition-colors"
        >
          Tandai Dikirim
        </button>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function PesananMasukPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab | null>(null);

  const filteredOrders = ORDERS.filter((o) => {
    const matchSearch =
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === null || o.status === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-5">
      {/* Header + Search */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <h1 className="text-xl font-bold text-gray-900 mb-4">Pesanan Masuk</h1>
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            id="pesanan-masuk-search"
            type="text"
            placeholder="Cari Pesanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            id={`tab-${tab.key}`}
            onClick={() => setActiveTab(activeTab === tab.key ? null : tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all shrink-0 ${
              activeTab === tab.key
                ? "border-[#3A7D1E] text-[#3A7D1E] bg-[#EBF4E4]"
                : "border-gray-300 text-gray-600 bg-white hover:border-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
        {COLUMNS.map((col) => {
          const colOrders = filteredOrders.filter((o) => o.status === col.key);
          return (
            <div key={col.key} className="bg-[#F7F8F5] rounded-2xl p-3 border border-gray-200">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                  <span className="text-sm font-bold text-gray-800">{col.label}</span>
                  <span className="text-xs font-bold text-gray-500">{colOrders.length}</span>
                </div>
                <button
                  aria-label={`Tambah pesanan ${col.label}`}
                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {colOrders.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">Tidak ada pesanan</p>
                ) : (
                  colOrders.map((order) => <OrderCard key={order.id} order={order} />)
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
