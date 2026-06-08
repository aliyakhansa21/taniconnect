import { Wheat, Utensils, Sprout, CheckCircle2 } from "lucide-react";

const TRUST = [
  "Gratis selamanya untuk petani",
  "Tanpa kontrak mengikat",
  "Dukungan 24/7",
];

export default function CTASection() {
  return (
    <section
      className="relative py-24 overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-green-700"
      id="mulai"
      aria-labelledby="cta-heading"
    >
      {/* Radial glow decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/2 -right-[10%] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[30%] -left-[5%] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto">

          {/* Float icon */}
          <div className="mb-5 flex justify-center" aria-hidden="true">
            <Wheat size={44} className="text-yellow-400" />
          </div>

          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5"
          >
            Bergabung dengan{" "}
            <span className="text-yellow-400">3.250+ Pengguna</span>
            <br />
            yang Sudah Bertransaksi
          </h2>

          <p className="text-sm md:text-base text-white/75 leading-relaxed mb-10">
            Mulai secara gratis hari ini. Tidak perlu kartu kredit, tidak ada
            biaya tersembunyi. Cukup daftar dan nikmati manfaatnya langsung.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <a
              href="#"
              id="cta-restoran-btn"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-yellow-400 text-gray-900 font-bold text-sm shadow-[0_4px_20px_rgba(250,204,21,0.35)] hover:bg-yellow-500 hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              <Utensils size={16} aria-hidden="true" />
              Mulai sebagai Restoran
            </a>
            <a
              href="#"
              id="cta-petani-btn"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-white/50 text-white font-bold text-sm hover:bg-white/10 hover:border-white/80 hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              <Sprout size={16} aria-hidden="true" />
              Mulai sebagai Petani
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="flex flex-wrap gap-6 justify-center"
            role="list"
            aria-label="Jaminan layanan"
          >
            {TRUST.map((t) => (
              <div key={t} role="listitem" className="flex items-center gap-2 text-sm text-white/55">
                <CheckCircle2 size={14} className="text-green-300" aria-hidden="true" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}