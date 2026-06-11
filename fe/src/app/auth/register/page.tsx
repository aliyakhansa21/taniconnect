"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaSeedling, FaUtensils } from "react-icons/fa";

export default function RegisterRolePage() {
  return (
    <div className="min-h-screen bg-[#FBF6E6] flex flex-col">
      {/* Top Bar */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          id="back-to-home-btn"
        >
          <ChevronLeft size={16} />
          <span>Kembali ke halaman utama</span>
        </Link>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb pendaftaran"
          className="hidden sm:flex items-center gap-1.5 text-sm"
        >
          <span className="text-gray-400">Daftar</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-[#2D3A1E] font-semibold">Pilih Role</span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-[#1C2B0E] text-center mb-2">
            Saya bergabung sebagai...
          </h1>
          <p className="text-gray-500 text-center mb-10">
            Pilih peran Anda untuk memulai.
          </p>

          <div className="flex flex-col gap-4">
            {/* Petani / Supplier */}
            <Link
              href="/auth/register/petani"
              id="role-petani-btn"
              className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-[#4A7C28] hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-16 h-16 rounded-xl bg-[#E8F5D6] flex items-center justify-center shrink-0">
                <FaSeedling size={28} className="text-[#4A7C28]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-[#1C2B0E] mb-0.5">
                  Petani / Supplier
                </p>
                <p className="text-sm text-gray-500">
                  Jual hasil panen langsung ke restoran
                </p>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-300 group-hover:text-[#4A7C28] transition-colors shrink-0"
              />
            </Link>

            {/* Pembeli */}
            <Link
              href="/auth/register/pembeli"
              id="role-pembeli-btn"
              className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-[#4A7C28] hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-16 h-16 rounded-xl bg-[#F5F0E8] flex items-center justify-center shrink-0">
                <FaUtensils size={24} className="text-[#8B6914]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-[#1C2B0E] mb-0.5">
                  Pembeli
                </p>
                <p className="text-sm text-gray-500">
                  Beli bahan segar dari petani lokal
                </p>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-300 group-hover:text-[#4A7C28] transition-colors shrink-0"
              />
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Sudah punya akun?{" "}
            <Link
              href="/auth/login"
              className="text-[#1C2B0E] font-bold hover:underline"
              id="goto-login-link"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}