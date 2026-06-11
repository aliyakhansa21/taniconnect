"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Camera, Minus, Plus, CalendarDays } from "lucide-react";

// Mock pre-filled data (nanti diambil dari backend berdasarkan id)
const MOCK_PRODUCT = {
  nama: "Cabai Merah",
  stok: 3,
  satuan: "kg",
  harga: "12.000",
  tanggalPanen: "2026-05-28",
  deskripsi: "",
  img: "/product-chili.png",
};

export default function EditProdukPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(MOCK_PRODUCT.img);
  const [form, setForm] = useState(MOCK_PRODUCT);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Integrasi backend akan dilakukan nanti
  }

  return (
    <div>
      {/* Back Link + Title */}
      <div className="mb-5">
        <Link
          href="/dashboard/petani/listing-produk"
          id="edit-back-btn"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors no-underline mb-1"
        >
          <ChevronLeft size={15} />
          Kembali ke Listing Produk
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Edit Produk</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto Produk */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-2">Foto Produk</p>

            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative w-full rounded-2xl border-2 border-dashed border-[#C9B97A] bg-[#FEFBF0] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            >
              {previewUrl ? (
                <div className="relative h-56">
                  <Image
                    src={previewUrl}
                    alt="Preview foto produk"
                    fill
                    className="object-cover"
                    sizes="600px"
                    unoptimized={previewUrl.startsWith("blob:")}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-14 px-4">
                  <Camera size={44} className="text-[#8B6914] mb-3" strokeWidth={1.5} />
                  <p className="text-sm font-semibold text-gray-700">Upload Foto Produk</p>
                  <p className="text-xs text-gray-400 mt-1">Klik atau seret foto ke sini</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              id="edit-foto-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Nama Produk */}
          <div>
            <label
              htmlFor="edit-nama-produk"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Nama Produk
            </label>
            <input
              id="edit-nama-produk"
              type="text"
              placeholder="Contoh: Tomat Segar"
              value={form.nama}
              onChange={(e) => update("nama", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAF7] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A7D1E]/30 focus:border-[#3A7D1E] transition-all"
              required
            />
          </div>

          {/* Stok Tersedia */}
          <div>
            <label
              htmlFor="edit-stok-input"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Stok Tersedia
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center rounded-xl border border-gray-200 bg-[#FAFAF7] overflow-hidden">
                <input
                  id="edit-stok-input"
                  type="number"
                  min={0}
                  value={form.stok}
                  onChange={(e) => update("stok", parseInt(e.target.value) || 0)}
                  className="flex-1 px-4 py-3 text-sm text-gray-800 bg-transparent outline-none"
                />
                <div className="flex gap-1 pr-3">
                  <button
                    type="button"
                    id="edit-stok-minus-btn"
                    onClick={() => update("stok", Math.max(0, form.stok - 1))}
                    className="w-7 h-7 rounded-full border-2 border-[#C9B97A] flex items-center justify-center text-[#8B6914] hover:bg-[#FEF9EC] transition-colors"
                    aria-label="Kurangi stok"
                  >
                    <Minus size={12} />
                  </button>
                  <button
                    type="button"
                    id="edit-stok-plus-btn"
                    onClick={() => update("stok", form.stok + 1)}
                    className="w-7 h-7 rounded-full border-2 border-[#3A7D1E] flex items-center justify-center text-[#3A7D1E] hover:bg-[#F0F7EA] transition-colors"
                    aria-label="Tambah stok"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <div className="px-5 py-3 rounded-xl border border-gray-200 bg-[#FAFAF7] text-sm text-gray-700 min-w-[72px] text-center">
                {form.satuan}
              </div>
            </div>
          </div>

          {/* Harga per Satuan */}
          <div>
            <label
              htmlFor="edit-harga-input"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Harga per Satuan (Rp)
            </label>
            <div className="flex rounded-xl border border-gray-200 bg-[#FAFAF7] overflow-hidden">
              <span className="px-4 py-3 bg-[#F5EFD6] border-r border-gray-200 text-sm font-semibold text-[#8B6914]">
                Rp
              </span>
              <input
                id="edit-harga-input"
                type="text"
                placeholder="12.000"
                value={form.harga}
                onChange={(e) => update("harga", e.target.value)}
                className="flex-1 px-4 py-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Tanggal Panen */}
          <div>
            <label
              htmlFor="edit-tanggal-panen"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Tanggal Panen
            </label>
            <div className="relative">
              <input
                id="edit-tanggal-panen"
                type="date"
                value={form.tanggalPanen}
                onChange={(e) => update("tanggalPanen", e.target.value)}
                className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-[#FAFAF7] text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3A7D1E]/30 focus:border-[#3A7D1E] transition-all"
              />
              <CalendarDays
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Deskripsi Produk */}
          <div>
            <label
              htmlFor="edit-deskripsi"
              className="block text-sm font-bold text-gray-800 mb-1.5"
            >
              Deskripsi Produk{" "}
              <span className="text-gray-400 font-normal">(Opsional)</span>
            </label>
            <textarea
              id="edit-deskripsi"
              placeholder="Contoh: Tomat segar dipetik hari ini..."
              value={form.deskripsi}
              onChange={(e) => update("deskripsi", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAF7] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3A7D1E]/30 focus:border-[#3A7D1E] transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            id="edit-produk-submit-btn"
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#2D3A1E] text-white font-bold text-sm hover:bg-[#1C2B0E] transition-colors"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
