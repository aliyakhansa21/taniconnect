"use client";

import { Utensils, Users, Package, MapPin } from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────
const AREA_STATS = [
  { id: "restoran", label: "8 Restoran", sub: "Aktif radius 25km", icon: Utensils },
  { id: "petani", label: "5 Petani Lain", sub: "Di area Anda", icon: Users },
  { id: "komoditas", label: "3 Komoditas", sub: "Permintaan tinggi", icon: Package },
  { id: "jarak", label: "2,3km", sub: "Pembeli terdekat", icon: MapPin },
];

const NEARBY_RESTAURANTS = [
  {
    id: 1,
    name: "Warung Jepun",
    type: "Restoran",
    distance: "2.5km",
    tags: ["Tomat", "Bayam", "Wortel"],
  },
  {
    id: 2,
    name: "Warung Jepun",
    type: "Restoran",
    distance: "2.5km",
    tags: ["Tomat", "Bayam", "Wortel"],
  },
  {
    id: 3,
    name: "Warung Jepun",
    type: "Restoran",
    distance: "2.5km",
    tags: ["Tomat", "Bayam", "Wortel"],
  },
];

// ── Component ──────────────────────────────────────────────
export default function PetaPetaniPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <h1 className="text-xl font-bold text-gray-900">Peta & Area Saya</h1>
        <p className="text-sm text-gray-500 mt-0.5">Ngaglik, Sleman</p>
      </div>

      {/* Main Content: Map (left) + Info (right) */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Map */}
        <div className="w-full lg:flex-1 bg-[#E8EAE4] rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-[400px] lg:min-h-[500px]">
          <iframe
            title="Peta Area Petani"
            className="w-full h-full min-h-[400px] lg:min-h-[500px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63271.39938547454!2d110.33526!3d-7.78583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5786e9f9bc9b%3A0x48a41a48a0bb96c!2sYogyakarta!5e0!3m2!1sen!2sid!4v1700000000000"
          />
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[340px] shrink-0 space-y-4">
          {/* Stat Cards 2x2 */}
          <div className="grid grid-cols-2 gap-3">
            {AREA_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-[#FEF9EC] border border-[#E6C96A] rounded-2xl p-4 space-y-2"
                >
                  <Icon size={20} className="text-gray-600" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Restoran Terdekat */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-sm font-bold text-gray-800">Restoran Terdekat</h2>
              <p className="text-xs text-gray-500">Dalam radius 25km dari kebun Anda</p>
            </div>

            <div className="divide-y divide-gray-100">
              {NEARBY_RESTAURANTS.map((resto) => (
                <div
                  key={resto.id}
                  className="px-5 py-4 flex items-center gap-3"
                >
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#2D3A1E] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white">
                      {resto.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{resto.name}</p>
                    <p className="text-xs text-gray-500">
                      {resto.type} | {resto.distance}
                    </p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {resto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lihat Button */}
                  <button
                    id={`lihat-resto-${resto.id}`}
                    className="shrink-0 px-4 py-1.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Lihat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
