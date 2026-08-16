"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tentukan role: dari URL param, localStorage (jika datang dari register), default ke 'pembeli'
  const urlRole = searchParams.get("role");
  const storedRole =
    typeof window !== "undefined" ? localStorage.getItem("mockup_role") : null;
  const role: "petani" | "pembeli" =
    urlRole === "petani" || urlRole === "pembeli"
      ? urlRole
      : storedRole === "petani"
      ? "petani"
      : "pembeli";

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mockup: simulasikan login berhasil, redirect ke dashboard sesuai role
    localStorage.setItem("mockup_role", role);
    if (role === "petani") {
      router.push("/dashboard/petani");
    } else {
      router.push("/dashboard/restoran");
    }
  }

  const isPetani = role === "petani";

  return (
    <div className="min-h-screen bg-[#FBF6E6] flex flex-col">
      {/* Main Content — navbar lives inside the image panel */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Left: Hero Image Panel */}
        <div className="relative w-full lg:w-[45%] min-h-[320px] lg:min-h-screen rounded-none lg:rounded-tr-3xl lg:rounded-br-3xl overflow-hidden">
          <Image
            src="/hero-farm.png"
            alt="Petani sedang panen di ladang"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Pill Navbar — mengambang di dalam panel gambar */}
          <div className="absolute top-5 left-4 right-4 z-10 flex items-center px-4 py-2.5 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-[#5A490F] font-bold hover:text-[#322909] transition-colors font-medium"
              id="login-back-btn"
            >
              <ChevronLeft size={15} />
              <span>Kembali ke halaman utama</span>
            </Link>
          </div>

          {/* Text Overlay */}
          <div className="absolute bottom-8 left-7 right-7">
            <h2 className="text-white text-2xl font-bold leading-tight mb-2">
              {isPetani
                ? "Jual Hasil Panen Langsung ke Restoran"
                : "Dapatkan Bahan Segar Langsung dari Petani Lokal"}
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
              {isPetani ? "Masuk Akun Petani" : "Masuk Akun Pembeli"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nama Lengkap */}
              <div>
                <label
                  htmlFor="login-full-name"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Nama Lengkap
                </label>
                <input
                  id="login-full-name"
                  type="text"
                  placeholder="Contoh: Budi Washington"
                  value={form.full_name}
                  onChange={(e) => update("full_name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A7C28]/30 focus:border-[#4A7C28] transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Email
                </label>
                <input
                  id="login-email"
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
                  htmlFor="login-password"
                  className="block text-sm font-semibold text-[#1C2B0E] mb-1.5"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="login-password"
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
                    id="login-toggle-password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id={isPetani ? "petani-masuk-btn" : "pembeli-masuk-btn"}
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#2D3A1E] text-white font-bold text-base hover:bg-[#1C2B0E] transition-colors mt-1"
              >
                {isPetani ? "Masuk" : "Lanjut"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Belum punya akun?{" "}
              <Link
                href={
                  isPetani
                    ? "/auth/register/petani"
                    : "/auth/register/pembeli"
                }
                className="text-[#1C2B0E] font-bold hover:underline"
                id="login-goto-register-link"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBF6E6] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#4A7C28] border-t-transparent animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}