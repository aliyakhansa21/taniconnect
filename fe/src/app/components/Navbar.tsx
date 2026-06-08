"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#fitur",      label: "Fitur"      },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#tentang",    label: "Tentang"    },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── FLOATING PILL NAV ── */}
      <nav
        role="navigation"
        aria-label="Navigasi utama"
        className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6"
      >
        <div
          className={`max-w-[1100px] mx-auto flex items-center justify-between gap-6 px-5 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/97 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.10)] border border-gray-100/80"
              : "bg-white/10 backdrop-blur-sm border border-white/20"
          }`}
        >
          {/* ── Logo ── */}
          <a
            href="/"
            aria-label="TaniConnect — Beranda"
            className="flex items-center shrink-0 no-underline"
          >
            {/* Logo image — replace src with your actual logo asset */}
            <Image
              src="/logo.png"
              alt="TaniConnect"
              width={140}
              height={36}
              className={`h-8 w-auto transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </a>

          {/* ── Desktop links ── */}
          <ul role="menubar" className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
            {NAV_LINKS.map((l) => (
              <li key={l.href} role="none">
                <a
                  href={l.href}
                  role="menuitem"
                  className={`px-4 py-2 rounded-full text-sm font-semibold no-underline transition-all duration-200 ${
                    scrolled
                      ? "text-gray-700 hover:text-green-600 hover:bg-green-50"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-2.5">
            <a
              href="#mulai"
              id="navbar-cta-btn"
              className={`hidden sm:inline-flex items-center px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-200 hover:-translate-y-0.5 ${
                scrolled
                  ? "bg-green-600 text-white shadow-[0_4px_12px_rgba(22,101,52,0.25)] hover:bg-green-700"
                  : "bg-white text-green-900 hover:bg-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
              }`}
            >
              Mulai Pakai
            </a>

            <button
              aria-label="Buka menu navigasi"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex md:hidden p-2 rounded-full bg-transparent border-none cursor-pointer hover:bg-white/15 transition-colors duration-200"
            >
              <Menu
                size={20}
                className={scrolled ? "text-gray-800" : "text-white"}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN OVERLAY ── */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="fixed inset-0 z-[999] bg-green-900/97 backdrop-blur-xl flex flex-col items-center justify-center gap-7"
        >
          <Image
            src="/logo.png"
            alt="TaniConnect"
            width={160}
            height={46}
            className="h-10 w-auto brightness-0 invert mb-4"
          />

          <button
            aria-label="Tutup menu"
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-transparent border-none cursor-pointer hover:bg-white/10 transition-colors duration-200"
          >
            <X size={24} className="text-white" aria-hidden="true" />
          </button>

          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-white no-underline text-2xl font-bold hover:text-yellow-400 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}

          <a
            href="#mulai"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center px-8 py-3.5 rounded-full bg-yellow-400 text-gray-900 font-bold text-base shadow-lg hover:bg-yellow-500 transition-all duration-200 no-underline"
          >
            Mulai Pakai
          </a>
        </div>
      )}
    </>
  );
}