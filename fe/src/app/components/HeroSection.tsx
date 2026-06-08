import Image from "next/image";
import { Sprout, Utensils, Users, Coffee, ThumbsUp } from "lucide-react";

const STATS = [
  { icon: Users,    value: "2.400+", label: "Petani Terdaftar"   },
  { icon: Coffee,   value: "850+",   label: "Restoran Mitra"     },
  { icon: ThumbsUp, value: "98%",    label: "Kepuasan Pelanggan" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      id="beranda"
      aria-labelledby="hero-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-farm.png"
          alt="Para petani bekerja memanen hasil panen segar di ladang yang subur"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Gradient overlay — dark on left, transparent on right */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.20) 70%, rgba(0,0,0,0.05) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-[2] max-w-[1200px] mx-auto px-6 w-full pt-40 pb-24">

        {/* Heading */}
        <h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.15] tracking-tight mb-5 max-w-xl"
        >
          Hasil Panen Segar,{" "}
          Langsung ke Meja{" "}
          Restoran Anda
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-sm mb-8">
          TaniConnect memotong rantai pasok yang panjang. Hubungkan
          restoran, katering, dan hotel Anda langsung dengan petani lokal
          terbaik untuk bahan baku segar, harga transparan, dan dampak
          nyata.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-14">
          <a
            href="#mulai"
            id="hero-cta-restoran"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-600 text-white font-semibold text-sm shadow-[0_4px_16px_rgba(22,101,52,0.40)] hover:bg-green-700 hover:-translate-y-0.5 transition-all duration-200 no-underline border-2 border-green-600"
          >
            <Utensils size={15} aria-hidden="true" />
            Daftar sebagai restoran
          </a>
          <a
            href="#mulai"
            id="hero-cta-petani"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-white/70 text-white font-semibold text-sm hover:bg-white/10 hover:border-white hover:-translate-y-0.5 transition-all duration-200 no-underline"
          >
            <Sprout size={15} aria-hidden="true" />
            Daftar sebagai petani
          </a>
        </div>
      </div>
    </section>
  );
}