"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  X,
  Box,
  CalendarDays,
  Pencil,
  Eye,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────
type FilterTab = "semua" | "aktif" | "nonaktif" | "oversupply";

interface Product {
  id: number;
  name: string;
  price: string;
  stock: string;
  harvestDate: string;
  status: "aktif" | "nonaktif" | "oversupply";
  img: string;
  stockPercent: number;
  description: string;
}

// ── Mock Data ──────────────────────────────────────────────
const PRODUCTS: Product[] = [
  { id: 1, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "aktif", img: "/product-chili.png", stockPercent: 65, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 2, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "aktif", img: "/product-carrot.png", stockPercent: 65, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 3, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "aktif", img: "/product-tomato.png", stockPercent: 65, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 4, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "aktif", img: "/product-chili.png", stockPercent: 50, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 5, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "aktif", img: "/product-carrot.png", stockPercent: 50, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 6, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "aktif", img: "/product-tomato.png", stockPercent: 50, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 7, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "nonaktif", img: "/product-chili.png", stockPercent: 20, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 8, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "nonaktif", img: "/product-carrot.png", stockPercent: 20, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
  { id: 9, name: "Cabai Merah", price: "Rp\u00a012.000/kg", stock: "3kg", harvestDate: "28 Mei 2026", status: "nonaktif", img: "/product-tomato.png", stockPercent: 20, description: "Produk segar berkualitas tinggi, dipanen langsung dari lahan kami" },
];

const STATUS_BADGE: Record<string, string> = {
  aktif: "bg-[#2D3A1E] text-white",
  nonaktif: "bg-gray-300 text-gray-700",
  oversupply: "bg-orange-400 text-white",
};

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "aktif", label: "Aktif" },
  { key: "nonaktif", label: "Nonaktif" },
  { key: "oversupply", label: "Oversupply" },
];

// ── Component ──────────────────────────────────────────────
export default function ListingProdukPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("semua");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "semua" || p.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <>
      {/* Page */}
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-gray-900">Listing Produk Saya</h1>
          <Link
            href="/dashboard/petani/listing-produk/tambah"
            id="listing-tambah-btn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D3A1E] text-white text-sm font-bold hover:bg-[#1C2B0E] transition-colors shadow-sm no-underline"
          >
            <Plus size={15} />
            Tambah Produk
          </Link>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 px-4 py-2.5 flex-1 shadow-sm">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              id="listing-search"
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.key}
                id={`filter-${tab.key}-btn`}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeFilter === tab.key
                    ? "bg-[#2D3A1E] text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image + Status Badge */}
              <div className="relative h-36">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
                <span
                  className={`absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_BADGE[product.status]}`}
                >
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-3">
                <p className="text-sm font-bold text-gray-900">{product.name}</p>
                <p className="text-sm font-semibold text-[#3A7D1E]">{product.price}</p>
                <div className="flex items-center gap-1 mt-1 mb-2">
                  <Box size={11} className="text-gray-400" />
                  <span className="text-xs text-gray-500">{product.stock}</span>
                </div>

                {/* Stock Bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#3A7D1E] rounded-full"
                    style={{ width: `${product.stockPercent}%` }}
                  />
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <CalendarDays size={11} className="text-gray-400" />
                  <span className="text-xs text-gray-500">Panen: {product.harvestDate}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/petani/listing-produk/edit/${product.id}`}
                    id={`edit-btn-${product.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors no-underline"
                  >
                    <Pencil size={12} />
                    Edit
                  </Link>
                  <button
                    id={`detail-btn-${product.id}`}
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={12} />
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Detail Produk</h2>
                <p className="text-sm text-gray-500">Informasi lengkap tentang produk Anda</p>
              </div>
              <button
                id="modal-close-btn"
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Tutup modal"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col sm:flex-row gap-6">
              {/* Left: Image + Stock info */}
              <div className="sm:w-52 shrink-0 space-y-3">
                <div className="relative h-44 sm:h-48 rounded-xl overflow-hidden">
                  <Image
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <span className="absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full bg-[#2D3A1E] text-white">
                    Aktif
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F0F7EA] rounded-xl p-3 text-center">
                    <Box size={16} className="mx-auto text-[#3A7D1E] mb-1" />
                    <p className="text-xs text-gray-500">Stok Tersedia</p>
                    <p className="text-sm font-bold text-gray-900">{selectedProduct.stock}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <CalendarDays size={16} className="mx-auto text-gray-500 mb-1" />
                    <p className="text-xs text-gray-500">Tanggal Panen</p>
                    <p className="text-sm font-bold text-gray-900">{selectedProduct.harvestDate}</p>
                  </div>
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>

                {/* Price + AI Saran */}
                <div className="bg-[#FEF9EC] border border-[#E6C96A] rounded-xl p-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-gray-900">{selectedProduct.price}</span>
                    <span className="text-sm text-[#C9A020] font-semibold">Saran AI: Rp\u00a08.000</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5">
                    Menurunkan harga dapat meningkatkan penjualan hingga 40%
                  </p>
                </div>

                {/* Stock Bar */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1.5">Level Stok</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3A7D1E] rounded-full"
                      style={{ width: `${selectedProduct.stockPercent}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Deskripsi Produk</p>
                  <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                </div>

                {/* Informasi Pribadi */}
                <div className="bg-[#FEF9EC] border border-[#E6C96A] rounded-xl p-3 space-y-2">
                  <p className="text-sm font-bold text-gray-800">Informasi Pribadi</p>
                  <div className="space-y-1.5">
                    {[
                      { icon: User, text: "Olivia Washingthon" },
                      { icon: MapPin, text: "Sleman, Yogyakarta" },
                      { icon: Phone, text: "+62 812 - 3456 - 7890" },
                      { icon: Mail, text: "olivia@example.com" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <Icon size={13} className="text-[#C9A020] shrink-0" />
                        <span className="text-xs text-[#8B6914]">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                id="modal-nonaktifkan-btn"
                className="flex-1 py-3 rounded-full border-2 border-[#C9A020] text-[#C9A020] font-bold text-sm hover:bg-[#FEF9EC] transition-colors"
              >
                Nonaktifkan
              </button>
              <button
                id="modal-hapus-btn"
                className="flex-1 py-3 rounded-full border-2 border-red-400 text-red-500 font-bold text-sm hover:bg-red-50 transition-colors"
              >
                Hapus Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
