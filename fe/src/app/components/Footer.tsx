import Image from "next/image";
import { Camera, AtSign, Rss, PlayCircle } from "lucide-react";

const FOOTER_COLS = [
  {
    key:   "platform",
    label: "Platform",
    links: [
      { href: "#fitur", label: "Fitur Utama"    },
      { href: "#",      label: "AI Search"      },
      { href: "#",      label: "Peta Interaktif"},
      { href: "#",      label: "Kanban Board"   },
      { href: "#",      label: "Harga & Biaya"  },
    ],
  },
  {
    key:   "pengguna",
    label: "Pengguna",
    links: [
      { href: "#", label: "Untuk Petani"    },
      { href: "#", label: "Untuk Restoran"  },
      { href: "#", label: "Untuk Katering"  },
      { href: "#", label: "Untuk Hotel"     },
      { href: "#", label: "Cara Kerja"      },
    ],
  },
  {
    key:   "perusahaan",
    label: "Perusahaan",
    links: [
      { href: "#tentang", label: "Tentang Kami" },
      { href: "#",        label: "Hubungi Kami" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", icon: Camera,     href: "#" },
  { label: "Twitter",   icon: AtSign,     href: "#" },
  { label: "LinkedIn",  icon: Rss,        href: "#" },
  { label: "YouTube",   icon: PlayCircle, href: "#" },
];

const BOTTOM_LINKS = ["Kebijakan Privasi", "Syarat & Ketentuan"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#322909] pt-14 pb-6"
      id="tentang"
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10 mb-7">

          {/* Brand column */}
          <div className="flex flex-col">
            <a
              href="/"
              aria-label="TaniConnect — Beranda"
              className="inline-flex items-center gap-2 no-underline mb-4"
            >
              <Image
                src="/logo.png"
                alt="TaniConnect"
                width={130}
                height={34}
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
            </a>

            <p className="text-xs text-white/50 leading-relaxed max-w-[230px] mb-6">
              Intelligence layer untuk rantai pasok pangan lokal Indonesia.
            </p>

            {/* Social links */}
            <nav aria-label="Media sosial TaniConnect">
              <div className="flex gap-2 flex-wrap">
                {SOCIAL.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={`TaniConnect di ${label}`}
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 border border-white/10 bg-white/[0.05] hover:bg-green-600 hover:border-green-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200 no-underline"
                  >
                    <Icon size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <nav key={col.key} aria-label={`Tautan ${col.label}`}>
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.08em] mb-4">
                {col.label}
              </h3>
              <ul className="list-none flex flex-col gap-2.5 m-0 p-0">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/50 text-xs no-underline hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-[11px] text-white/35">
            © {year} TaniConnect. Hak Cipta Dilindungi.
          </p>
          <nav aria-label="Tautan kebijakan" className="flex gap-5 flex-wrap">
            {BOTTOM_LINKS.map((t) => (
              <a key={t} href="#" className="text-[11px] text-white/35 no-underline hover:text-white/70 transition-colors duration-200">
                {t}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}