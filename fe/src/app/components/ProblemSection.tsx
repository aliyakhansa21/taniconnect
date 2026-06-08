import { Link2, BarChart2, Trash2, AlertTriangle } from "lucide-react";

const PROBLEMS = [
  {
    id:        "rantai-distribusi",
    icon:      Link2,
    title:     "Rantai Distribusi Terlalu Panjang",
    desc:      "2–3 lapis tengkulak memotong margin petani hingga 30%. Harga pasar tidak mencerminkan nilai asli panen.",
    stat:      "-30% margin petani",
  },
  {
    id:        "ketidakpastian-pasar",
    icon:      BarChart2,
    title:     "Petani Tidak Tahu Permintaan Pasar",
    desc:      "Tanpa data real-time, petani tidak punya visibilitas ke kebutuhan restoran dan katering.",
    stat:      "35% hasil panen terbuang",
  },
  {
    id:        "food-loss",
    icon:      Trash2,
    title:     "Food Loss & Waste Tidak Terkontrol",
    desc:      "Ketidaksesuaian stok dan permintaan menyebabkan hasil panen segar terbuang sebelum sampai konsumen.",
    stat:      "35% hasil panen terbuang",
  },
];

export default function ProblemSection() {
  return (
    <section
      className="py-24 bg-white"
      id="masalah"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Section header ── */}
        <header className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wide"
            role="note"
          >
            <AlertTriangle size={12} aria-hidden="true" />
            Masalah yang ada saat ini
          </div>

          <h2
            id="problem-heading"
            className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4"
          >
            Rantai Pasok Pangan Indonesia <br className="hidden sm:block" />
            Masih Tidak Efisien
          </h2>

          <p className="max-w-lg mx-auto text-sm text-gray-500 leading-relaxed">
            Petani rugi, konsumen bayar lebih mahal, dan hasil panen terbuang sia-sia.
          </p>
        </header>

        {/* ── Cards ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          role="list"
          aria-label="Permasalahan rantai pasok pangan"
        >
          {PROBLEMS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.id}
                id={`problem-card-${p.id}`}
                role="listitem"
                className="flex flex-col bg-amber-50 border border-amber-200/60 rounded-3xl pt-7 px-7 pb-6 overflow-hidden cursor-default hover:border-amber-300 hover:shadow-sm transition-all duration-200"
              >
                {/* Icon box */}
                <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 shrink-0">
                  <Icon size={20} className="text-green-600" aria-hidden="true" />
                </div>

                {/* Text */}
                <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2.5">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6 flex-1">
                  {p.desc}
                </p>

                {/* Stat pill */}
                <div className="inline-flex">
                  <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-xs font-semibold text-amber-800">
                    {p.stat}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}