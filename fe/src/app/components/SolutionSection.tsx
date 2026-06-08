import {
  Handshake,
  BrainCircuit,
  MapPin,
  CheckCircle2,
  Leaf,
} from "lucide-react";

const FEATURES = [
  {
    id:       "direct-connect",
    icon:     Handshake,
    title:    "Direct Connect P2B",
    subtitle: "Petani ke Bisnis Langsung",
    desc:     "Hubungkan petani langsung ke restoran, katering, dan hotel secara real-time. Tanpa tengkulak.",
    points:   [
      "Transaksi langsung petani ke bisnis",
      "Harga transparan dan adil",
      "Konfirmasi pesanan real-time",
    ],
    featured: false,
  },
  {
    id:       "ai-search",
    icon:     BrainCircuit,
    title:    "Semantic AI Search",
    subtitle: "Cari dengan Bahasa Natural",
    desc:     "Ketik 'bahan salad segar' AI langsung matching tomat, selada, timun dari petani terdekat. Bukan keyword biasa.",
    points:   [
      "Gemini API text-embedding-004",
      "Cosine similarity matching",
      "Badge AI-match score",
    ],
    featured: true,
  },
  {
    id:       "geospatial",
    icon:     MapPin,
    title:    "Geospatial Heatmap",
    subtitle: "Visualisasi Data Wilayah",
    desc:     "Peta interaktif real-time ketersediaan pangan per kecamatan. Temukan petani terdekat dalam radius optimal.",
    points:   [
      "Heatmap stok per area kecamatan",
      "Filter radius 5–50km",
      "Pin petani terverifikasi",
    ],
    featured: false,
  },
];

export default function SolutionSection() {
  return (
    <section
      className="py-24 bg-gradient-to-b from-white via-green-300/60 to-white"
      id="fitur"
      aria-labelledby="solution-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Section header ── */}
        <header className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-white border border-green-200 text-green-700 text-xs font-semibold tracking-wide shadow-sm"
            role="note"
          >
            <Leaf size={12} aria-hidden="true" />
            Solusi TaniConnect
          </div>

          <h2
            id="solution-heading"
            className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4"
          >
            Satu Platform, Tiga Kekuatan Utama
          </h2>

          <p className="max-w-lg mx-auto text-sm text-gray-500 leading-relaxed">
            Teknologi modern untuk memotong rantai distribusi yang panjang dan tidak efisien.
          </p>
        </header>

        {/* ── Cards grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center"
          role="list"
          aria-label="Fitur unggulan TaniConnect"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;

            /* ── FEATURED (center) dark card ── */
            if (f.featured) {
              return (
                <article
                  key={f.id}
                  id={`feature-card-${f.id}`}
                  role="listitem"
                  aria-label={`${f.title} — Fitur unggulan`}
                  className="relative z-10 flex flex-col gap-5 rounded-3xl p-8 md:-my-4 md:scale-[1.03]
                    bg-gradient-to-br from-green-800 via-green-700 to-green-600
                    border border-green-600
                    shadow-[0_16px_48px_rgba(21,83,47,0.35)]
                    cursor-default"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-white" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug mb-1">
                      {f.title}
                    </h3>
                    <p className="text-xs font-medium text-white/60">{f.subtitle}</p>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed flex-1">{f.desc}</p>

                  <ul
                    className="flex flex-col gap-2.5 list-none m-0 p-0"
                    aria-label={`Keunggulan ${f.title}`}
                  >
                    {f.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm font-medium text-white/90">
                        <CheckCircle2
                          size={14}
                          className="text-green-300 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            }

            /* ── REGULAR white card ── */
            return (
              <article
                key={f.id}
                id={`feature-card-${f.id}`}
                role="listitem"
                className="flex flex-col gap-5 rounded-3xl p-8 bg-white border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md cursor-default transition-all duration-200"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                  <Icon size={24} className="text-green-600" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-gray-900 leading-snug mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs font-medium text-gray-400">{f.subtitle}</p>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed flex-1">{f.desc}</p>

                <ul
                  className="flex flex-col gap-2.5 list-none m-0 p-0"
                  aria-label={`Keunggulan ${f.title}`}
                >
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
                      <CheckCircle2
                        size={14}
                        className="text-green-500 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}