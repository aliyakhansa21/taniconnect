import {
  UserPlus,
  Camera,
  Bell,
  Truck,
  UserCog,
  Search,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";

/* ── Types ── */
interface Step {
  step: string;
  icon: React.ElementType;
  title: string;
  desc: string;
}

/* ── Data — content matches design reference ── */
const FARMER_STEPS: Step[] = [
  {
    step:  "01",
    icon:  UserPlus,
    title: "Daftar & Verifikasi",
    desc:  "Buat akun gratis, verifikasi HP via WhatsApp OTP.",
  },
  {
    step:  "02",
    icon:  Camera,
    title: "Upload Listing Produk",
    desc:  "Foto panen, isi stok, harga, tanggal. 60 detik selesai.",
  },
  {
    step:  "03",
    icon:  Bell,
    title: "Terima Notifikasi Pesanan",
    desc:  "AI cocokkan produkmu ke restoran yang butuh.",
  },
  {
    step:  "04",
    icon:  Truck,
    title: "Kirim & Terima Pembayaran",
    desc:  "Kirim pesanan, dana masuk setelah restoran konfirmasi.",
  },
];

const RESTAURANT_STEPS: Step[] = [
  {
    step:  "01",
    icon:  UserCog,
    title: "Daftar & Setup Profil",
    desc:  "Buat akun, set lokasi GPS otomatis, pilih komoditas.",
  },
  {
    step:  "02",
    icon:  Search,
    title: "Cari dengan AI Search",
    desc:  "Ketik kebutuhan natural AI matching ke petani terdekat.",
  },
  {
    step:  "03",
    icon:  ShoppingCart,
    title: "Checkout 3 Klik",
    desc:  "Pilih produk, jadwal kirim, bayar QRIS atau transfer.",
  },
  {
    step:  "04",
    icon:  LayoutDashboard,
    title: "Track via Kanban Board",
    desc:  "Pantau status pesanan real-time dari Dipesan ke Selesai.",
  },
];

/* ── Step Card ──
   Step number floats centered at the top edge of the white card.
   outer div has pt-4 to leave room above; number uses -translate-y-1/2
   so it's half above, half below the card's top edge.
── */
function StepCard({ step, icon: Icon, title, desc }: Step) {
  return (
    <div className="relative pt-4 h-full">
      {/* Floating step number */}
      <div
        aria-label={`Langkah ${step}`}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                   w-9 h-9 rounded-full bg-[#7c5c00] text-white
                   flex items-center justify-center text-xs font-extrabold
                   shadow-md select-none"
      >
        {step}
      </div>

      {/* White card */}
      <article className="bg-white rounded-2xl p-5 h-full flex flex-col gap-3">
        <Icon
          size={22}
          className="text-[#7c5c00] shrink-0"
          aria-hidden="true"
        />
        <h4 className="text-[0.9375rem] font-bold text-text-heading leading-snug">
          {title}
        </h4>
        <p className="text-sm text-[#7c5c00]/65 leading-relaxed">{desc}</p>
      </article>
    </div>
  );
}

/* ── Role Block ──
   Each role (Petani / Restoran) is a large warm-yellow rounded container
   with its own tag and 4 step cards.
── */
interface RoleBlockProps {
  label:      string;
  steps:      Step[];
  sectionId:  string;
  tagVariant: "light" | "dark";
}

function RoleBlock({ label, steps, sectionId, tagVariant }: RoleBlockProps) {
  const tagClass =
    tagVariant === "dark"
      ? "bg-[#7c5c00] text-white"
      : "bg-[#e8d080] text-[#5a4200]";

  return (
    <div
      id={sectionId}
      className="bg-[#f5e8a8] rounded-3xl px-7 pt-6 pb-7"
    >
      {/* Role label */}
      <span
        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${tagClass}`}
      >
        {label}
      </span>

      {/* Step cards */}
      <div
        className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4"
        role="list"
        aria-label={`Langkah-langkah ${label}`}
      >
        {steps.map((s) => (
          <div key={s.step} role="listitem">
            <StepCard {...s} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section ── */
export default function HowItWorksSection() {
  return (
    <section
      className="py-24 bg-white"
      id="cara-kerja"
      aria-labelledby="how-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Header ── */}
        <header className="text-center mb-12">
          {/* Outlined pill badge */}
          <div
            className="inline-flex items-center px-5 py-1.5 mb-6 rounded-full
                       border border-[#7c5c00]/35 text-[#7c5c00] text-sm font-semibold
                       bg-transparent tracking-wide"
            role="note"
          >
            Cara Kerja
          </div>

          <h2
            id="how-heading"
            className="text-3xl md:text-4xl font-extrabold text-text-heading leading-tight tracking-tight mb-4"
          >
            Mulai Transaksi dalam 3 Menit
          </h2>

          <p className="max-w-lg mx-auto text-base text-[#7c5c00]/60 leading-relaxed">
            Dua alur sederhana – untuk petani yang menjual dan restoran yang membeli.
          </p>
        </header>

        {/* ── Alur Petani ── */}
        <div className="mb-5">
          <RoleBlock
            label="Alur Petani"
            steps={FARMER_STEPS}
            sectionId="cara-kerja-petani"
            tagVariant="light"
          />
        </div>

        {/* ── Alur Restoran ── */}
        <RoleBlock
          label="Alur Restoran"
          steps={RESTAURANT_STEPS}
          sectionId="cara-kerja-restoran"
          tagVariant="dark"
        />
      </div>
    </section>
  );
}