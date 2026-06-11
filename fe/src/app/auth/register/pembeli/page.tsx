"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";

export default function RegisterPembeliPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    whatsapp: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // buat integrasi backend nanti
  }

  return (
    <div className="min-h-screen bg-[#FBF6E6] flex flex-col">
      {/* Top Bar */}
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <Link
          href="/auth/register"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          id="back-to-register-pembeli-btn"
        >
          <ChevronLeft size={16} />
          <span>Kembali ke halaman utama</span>
        </Link>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb pendaftaran pembeli"
          className="hidden sm:flex items-center gap-1.5 text-sm"
        >
          <span className="text-gray-400">Daftar</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-gray-400">Pilih Role</span>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-[#2D3A1E] font-semibold">
            Daftar sebagai Restoran
          </span>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Left: Hero Image Panel */}
        <div className="relative w-full lg:w-[45%] min-h-[280px] lg:min-h-0 rounded-none lg:rounded-tr-3xl lg:rounded-br-3xl overflow-hidden">
          <Image
            src="/auth-hero.png"
            alt="Petani sedang panen di ladang"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Text Overlay */}
          <div className="absolute bottom-8 left-7 right-7">
            <h2 className="text-white text-2xl font-bold leading-tight mb-2">
              Dapatkan Bahan Segar Langsung dari Petani Lokal
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Bergabung gratis. Tidak ada biaya pendaftaran. Platform biaya
              hanya saat transaksi berhasil.
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-12 py-10 lg:py-12">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-[#1C2B0E] mb-7 text-center">
              Buat Akun Pembeli
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nama Lengkap */}
              <div>
                <label
                  htmlFor="pembeli-full-name"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Nama Lengkap
                </label>
                <input
                  id="pembeli-full-name"
                  type="text"
                  placeholder="Olivia Washington"
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C28]/30 focus:border-[#4A7C28] transition-all"
                  required
                />
              </div>

              {/* Nomor Whatsapp */}
              <div>
                <label
                  htmlFor="pembeli-whatsapp"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Nomor Whatsapp
                </label>
                <input
                  id="pembeli-whatsapp"
                  type="tel"
                  placeholder="081234567890"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C28]/30 focus:border-[#4A7C28] transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="pembeli-email"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="pembeli-email"
                  type="email"
                  placeholder="budiwashington@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C28]/30 focus:border-[#4A7C28] transition-all"
                  required
                />
              </div>

              {/* Kata Sandi */}
              <div>
                <label
                  htmlFor="pembeli-password"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="pembeli-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C28]/30 focus:border-[#4A7C28] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    id="pembeli-toggle-password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Kata Sandi */}
              <div>
                <label
                  htmlFor="pembeli-confirm-password"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="pembeli-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Masukkan kata sandi"
                    value={form.confirm_password}
                    onChange={(e) => update("confirm_password", e.target.value)}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C28]/30 focus:border-[#4A7C28] transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Tampilkan konfirmasi kata sandi"}
                    id="pembeli-toggle-confirm-password"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="pembeli-daftar-btn"
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#2D3A1E] text-white font-bold text-base hover:bg-[#1C2B0E] transition-colors mt-1"
              >
                Daftar
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login?role=pembeli"
                className="text-[#1C2B0E] font-bold hover:underline"
                id="pembeli-goto-login-link"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
