"use client";

import { ArrowRight, TrendingDown, CheckCircle2, Receipt } from "lucide-react";
import Link from "next/link";

const STAT_CARDS = [
  {
    id: "total-pengeluaran",
    label: "Total Pengeluaran",
    value: "Rp\u00a0600.000",
    sub: "Bulan Mei 2026",
    icon: Receipt,
  },
  {
    id: "hemat-vs-pasar",
    label: "Hemat vs Pasar",
    value: "Rp\u00a0180.000",
    sub: "Penghematan bulan ini",
    icon: TrendingDown,
  },
  {
    id: "total-transaksi",
    label: "Total Transaksi",
    value: "30",
    sub: "Pesanan selesai",
    icon: CheckCircle2,
  },
];

const INVOICES = [
  {
    id: "inv-1",
    invoice: "INV-2026-043",
    code: "#TNC-440",
    petani: "Pak Olivia Washingthon",
    item: "Tomat",
    date: "23 Mei 2026",
    amount: "Rp\u00a0180.000",
    status: "Lunas",
  },
  {
    id: "inv-2",
    invoice: "INV-2026-043",
    code: "#TNC-440",
    petani: "Pak Olivia Washingthon",
    item: "Tomat",
    date: "23 Mei 2026",
    amount: "Rp\u00a0180.000",
    status: "Lunas",
  },
  {
    id: "inv-3",
    invoice: "INV-2026-043",
    code: "#TNC-440",
    petani: "Pak Olivia Washingthon",
    item: "Tomat",
    date: "23 Mei 2026",
    amount: "Rp\u00a0180.000",
    status: "Lunas",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Lunas: "text-[#3A7D1E] border-[#3A7D1E]",
  Pending: "text-yellow-600 border-yellow-500",
  Gagal: "text-red-500 border-red-400",
};

export default function RiwayatPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <h1 className="text-xl font-bold text-gray-900 mb-5">
          Riwayat & Tagihan
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="rounded-2xl border border-gray-200 p-4 flex flex-col justify-between min-h-[100px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-gray-500">{card.label}</span>
                  <Icon size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 leading-tight">
                    {card.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rekomendasi AI / Invoice List */}
      <div className="bg-white rounded-2xl border border-l-4 border-l-[#C9B97A] border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-sm font-bold text-gray-800">
            Rekomendasi AI untuk Anda
          </h2>
          <Link
            href="/dashboard/restoran/ai-search"
            id="riwayat-lihat-semua"
            className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              className="px-5 py-4 flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-gray-900">
                    {inv.invoice}
                  </span>
                  <span className="text-xs text-gray-400">{inv.code}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {inv.petani} | {inv.item} | {inv.date}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-[#3A7D1E] mb-1">
                  {inv.amount}
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    STATUS_STYLES[inv.status] ?? "text-gray-600 border-gray-300"
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
