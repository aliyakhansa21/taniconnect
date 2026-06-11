"use client";

import { Star, Banknote, CheckCircle2, TrendingUp, User, Search } from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────
const MINI_STATS = [
  {
    id: "bersih",
    label: "Pendapatan Bersih",
    value: "Rp\u00a011.500.000",
    sub: "Setelah potongan 20%",
    icon: Banknote,
  },
  {
    id: "selesai",
    label: "Pesanan Selesai",
    value: "8",
    sub: "Transaksi selesai",
    icon: CheckCircle2,
  },
  {
    id: "terlaris",
    label: "Produk Terlaris",
    value: "Tomat Segar",
    sub: "Rp\u00a0800.000 | 5 transaksi",
    icon: TrendingUp,
  },
  {
    id: "pembeli",
    label: "Pembeli Terbanyak",
    value: "Warung Jepun",
    sub: "5 Transaksi",
    icon: User,
  },
];

const TRANSACTIONS = [
  {
    id: "t1",
    buyer: "Warung Jepun",
    item: "Tomat Segar 20kg . Rp\u00a0240.000",
    time: "Hari ini 09.30 WIB",
    status: "Selesai",
  },
  {
    id: "t2",
    buyer: "D'Kantin",
    item: "Wortel Organik 20kg . Rp\u00a0240.000",
    time: "Hari ini 09.30 WIB",
    status: "Selesai",
  },
  {
    id: "t3",
    buyer: "Hotter",
    item: "Cabai Merah 20kg . Rp\u00a0240.000",
    time: "Hari ini 09.30 WIB",
    status: "Selesai",
  },
];

// ── Component ──────────────────────────────────────────────
export default function LaporanPendapatanPage() {
  return (
    <div className="space-y-5">
      {/* Hero Card — Pendapatan */}
      <div className="bg-[#2D5A1E] rounded-2xl p-6 shadow-sm">
        <p className="text-xs font-bold text-green-200 tracking-widest uppercase mb-3">
          Pendapatan Bulan Ini &nbsp;|&nbsp; Mei 2026
        </p>
        <p className="text-4xl font-black text-white mb-5">
          Rp&nbsp;12.000.000
        </p>

        {/* Sub-stats row */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <div className="flex items-start gap-2 border-r border-green-600 pr-5">
            <div>
              <p className="text-xl font-bold text-white">8</p>
              <p className="text-xs text-green-300">Transaksi Selesai</p>
            </div>
          </div>
          <div className="flex items-start gap-2 border-r border-green-600 pr-5">
            <div>
              <p className="text-xl font-bold text-white">Rp&nbsp;150.000</p>
              <p className="text-xs text-green-300">Rata-rata/Transaksi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xl font-bold text-white">4.8</p>
                <Star size={16} className="text-yellow-300" />
              </div>
              <p className="text-xs text-green-300">Rating bulan ini</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MINI_STATS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col justify-between min-h-[100px] shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs text-gray-500">{card.label}</span>
                <Icon size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-base font-bold text-gray-900 leading-tight">
                  {card.value}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Riwayat Transaksi */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Riwayat Transaksi</h2>
            <p className="text-xs text-gray-500">
              2 transaksi &nbsp;|&nbsp; 28 Mei 2026
            </p>
          </div>
          <button
            id="riwayat-search-btn"
            aria-label="Cari riwayat transaksi"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Search size={15} className="text-gray-600" />
          </button>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-gray-100">
          {TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="px-5 py-4 flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">{tx.buyer}</p>
                <p className="text-xs text-gray-500">{tx.item}</p>
                <p className="text-xs text-gray-400 mt-0.5">{tx.time}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#3A7D1E] text-[#3A7D1E]">
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
