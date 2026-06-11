"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ClipboardList,
  Banknote,
  Star,
  X,
  ArrowRight,
  Plus,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  MapPin,
  Box,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────
const STAT_CARDS = [
  { id: "stok-aktif", label: "Stok Aktif", value: "12 Kategori", icon: Package },
  { id: "pesanan-masuk", label: "Pesanan Masuk", value: "12 Kategori", icon: ClipboardList },
  { id: "pendapatan", label: "Pendapatan Bulan Ini", value: "12 Kategori", icon: Banknote },
  { id: "rating", label: "Rating Petani", value: "12 Kategori", icon: Star },
];

const PESANAN_MASUK = [
  { id: "w1", name: "Warung Jepun", item: "Tomat Segar 20kg . Rp\u00a0240.000", time: "Hari ini 09.30 WIB" },
  { id: "d1", name: "D'Kantin", item: "Wortel Organik 20kg . Rp\u00a0240.000", time: "Hari ini 09.30 WIB" },
  { id: "h1", name: "Hotter", item: "Cabai Merah 20kg . Rp\u00a0240.000", time: "Hari ini 09.30 WIB" },
];

const PRODUCTS = [
  { id: 1, name: "Tomat Segar", price: "Rp\u00a012.000/kg", stock: "3kg", img: "/product-tomato.png" },
  { id: 2, name: "Wortel Organik", price: "Rp\u00a012.000/kg", stock: "3kg", img: "/product-carrot.png" },
  { id: 3, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", img: "/product-chili.png" },
];

const AI_HARGA = [
  {
    id: 1,
    name: "Tomat Segar",
    badge: "High Demand",
    badgeColor: "text-red-500",
    badgeIcon: TrendingDown,
    saran: "Rp\u00a010.000/kg",
    saranNew: "Rp\u00a07.500/kg",
    newColor: "text-red-500",
  },
  {
    id: 2,
    name: "Tomat Segar",
    badge: "Permintaan Tinggi",
    badgeColor: "text-[#3A7D1E]",
    badgeIcon: TrendingUp,
    saran: "Rp\u00a010.000/kg",
    saranNew: "Rp\u00a012.000/kg",
    newColor: "text-[#3A7D1E]",
  },
];

const AKTIVITAS = [
  { id: 1, text: "Pesanan Warung Jepun selesai", time: "2 jam lalu" },
  { id: 2, text: "Pesanan Hotter dalam proses", time: "1 jam lalu" },
  { id: 3, text: "Pesanan D'Kantin sedang dipersiapkan", time: "5 menit lalu" },
];

// ── Component ──────────────────────────────────────────────
export default function PetaniBerandaPage() {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="space-y-5">
      {/* Alert Banner */}
      {alertVisible && (
        <div className="flex items-start gap-3 bg-[#FEF9EC] border border-[#E6C96A] rounded-2xl px-5 py-3.5">
          <TriangleAlert size={18} className="text-[#C9A020] shrink-0 mt-0.5" />
          <p className="text-sm text-[#7A5A00] flex-1">
            Stok tomat Anda mendekati oversupply. AI menyarankan turunkan harga ke Rp 7.500/kg sebelum terjadi food waste
          </p>
          <button
            onClick={() => setAlertVisible(false)}
            aria-label="Tutup notifikasi"
            id="alert-close-btn"
            className="shrink-0 text-[#C9A020] hover:text-[#7A5A00] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col gap-3 shadow-sm"
            >
              <Icon size={22} className="text-gray-500" />
              <div>
                <p className="text-sm font-bold text-gray-900">{card.label}</p>
                <p className="text-xs text-gray-500">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Pesanan Masuk */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div>
                <h2 className="text-sm font-bold text-gray-800">Pesanan Masuk</h2>
                <p className="text-xs text-gray-400">3 pesanan menunggu</p>
              </div>
              <Link
                href="/dashboard/petani/pesanan-masuk"
                id="beranda-petani-kanban"
                className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline"
              >
                Lihat Semua di Kanban <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {PESANAN_MASUK.map((order) => (
                <div
                  key={order.id}
                  className="px-5 py-3.5 flex items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-800">{order.name}</p>
                    <p className="text-xs text-gray-500">{order.item}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.time}</p>
                  </div>
                  <button
                    id={`konfirmasi-btn-${order.id}`}
                    className="shrink-0 px-5 py-1.5 rounded-full bg-[#2D3A1E] text-white text-xs font-bold hover:bg-[#1C2B0E] transition-colors"
                  >
                    Konfirmasi
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Produk Saya */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div>
                <h2 className="text-sm font-bold text-gray-800">Produk Saya</h2>
                <p className="text-xs text-gray-400">12 stok aktif</p>
              </div>
              <Link
                href="/dashboard/petani/listing-produk/tambah"
                id="beranda-petani-tambah-produk"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3A7D1E] text-white text-xs font-bold hover:bg-[#2D6018] transition-colors no-underline"
              >
                <Plus size={13} />
                Tambah Produk
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 px-5 pb-5">
              {PRODUCTS.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-gray-200 overflow-hidden"
                >
                  <div className="relative h-24 bg-gray-100">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 33vw, 200px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-800">{p.name}</p>
                    <p className="text-xs text-[#3A7D1E] font-semibold">{p.price}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Box size={10} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{p.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Area Saya (Map) */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <h2 className="text-sm font-bold text-gray-800 px-5 pt-5 pb-3">
              Area Saya
            </h2>
            <div className="h-44 bg-[#E8EAE4] overflow-hidden">
              <iframe
                title="Area Petani"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63271.39938547454!2d110.33526!3d-7.78583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5786e9f9bc9b%3A0x48a41a48a0bb96c!2sYogyakarta!5e0!3m2!1sen!2sid!4v1700000000000"
              />
            </div>
            <div className="px-5 py-3">
              <Link
                href="/dashboard/petani/peta"
                id="beranda-petani-peta"
                className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline"
              >
                <MapPin size={13} />
                Buka Peta Penuh
              </Link>
            </div>
          </div>

          {/* AI Rekomendasi Harga */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <h2 className="text-sm font-bold text-gray-800 px-5 pt-5 pb-3 flex items-center gap-2">
              <Star size={15} className="text-[#C9A020]" />
              AI Rekomendasi Harga
            </h2>
            <div className="px-5 pb-5 space-y-3">
              {AI_HARGA.map((item) => {
                const BadgeIcon = item.badgeIcon;
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 p-3"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-gray-800">{item.name}</p>
                      <span className={`flex items-center gap-1 text-xs font-semibold ${item.badgeColor}`}>
                        <BadgeIcon size={12} />
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Saran:{" "}
                      <span className="line-through text-gray-400">{item.saran}</span>
                      {" "}&rarr;{" "}
                      <span className={`font-bold ${item.newColor}`}>{item.saranNew}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2 className="text-sm font-bold text-gray-800">Aktivitas Terbaru</h2>
              <Link
                href="/dashboard/petani/laporan"
                id="beranda-petani-aktivitas"
                className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline"
              >
                Lihat Semua <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {AKTIVITAS.map((item) => (
                <div
                  key={item.id}
                  className="px-5 py-3 flex items-center justify-between gap-4"
                >
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
