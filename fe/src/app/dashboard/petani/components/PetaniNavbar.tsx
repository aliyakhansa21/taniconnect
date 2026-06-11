"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/dashboard/petani", label: "Beranda", exact: true },
  { href: "/dashboard/petani/listing-produk", label: "Listing Produk", exact: false },
  { href: "/dashboard/petani/pesanan-masuk", label: "Pesanan Masuk", exact: false },
  { href: "/dashboard/petani/peta", label: "Peta & Area", exact: false },
  { href: "/dashboard/petani/laporan", label: "Laporan & Pendapatan", exact: false },
];

export default function PetaniNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(link: { href: string; exact: boolean }) {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  }

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navigasi dashboard petani"
        className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/dashboard/petani"
            aria-label="TaniConnect — Dashboard Petani"
            className="shrink-0"
          >
            <Image
              src="/logo.png"
              alt="TaniConnect"
              width={130}
              height={34}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul
            role="menubar"
            className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0 flex-1 justify-center"
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold no-underline transition-all duration-200 whitespace-nowrap ${
                    isActive(link)
                      ? "text-[#2D3A1E] font-bold"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Avatar */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#E8E0CC] border-2 border-[#C9B97A] flex items-center justify-center">
              <span className="text-sm font-bold text-[#6B5A1E]">OW</span>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-gray-700">
              Olivia Washington
            </span>

            {/* Hamburger - mobile */}
            <button
              aria-label="Buka menu navigasi petani"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex lg:hidden p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Menu size={18} className="text-gray-700" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi petani"
          className="fixed inset-0 z-[999] bg-white flex flex-col"
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
            <Image
              src="/logo.png"
              alt="TaniConnect"
              width={120}
              height={32}
              className="h-7 w-auto"
            />
            <button
              aria-label="Tutup menu"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={22} className="text-gray-700" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col p-6 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold no-underline transition-colors ${
                  isActive(link)
                    ? "bg-[#EBF4E4] text-[#2D3A1E]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto px-6 py-6 border-t border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8E0CC] border-2 border-[#C9B97A] flex items-center justify-center">
              <span className="text-sm font-bold text-[#6B5A1E]">OW</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Olivia Washington</p>
              <p className="text-xs text-gray-500">Petani / Supplier</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
