"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const FARMERS = [
  {
    id: 1,
    name: "Pak Olivia Washingthon",
    location: "Yogyakarta",
    price: "Rp\u00a012.000/kg",
    stock: "Tomat segar tersedia 45kg",
  },
  {
    id: 2,
    name: "Pak Olivia Washingthon",
    location: "Yogyakarta",
    price: "Rp\u00a012.000/kg",
    stock: "Tomat segar tersedia 45kg",
  },
  {
    id: 3,
    name: "Pak Olivia Washingthon",
    location: "Yogyakarta",
    price: "Rp\u00a012.000/kg",
    stock: "Tomat segar tersedia 45kg",
  },
];

export default function PetaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Peta & Cari Petani
        </h1>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-200 px-4 py-3">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            id="peta-search-input"
            type="text"
            placeholder="Cari petani atau komoditas"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Main content: List + Map */}
      <div className="flex flex-col lg:flex-row gap-5 min-h-[480px]">
        {/* Farmer List */}
        <div className="bg-white rounded-2xl border border-l-4 border-l-[#C9B97A] border-gray-200 shadow-sm overflow-hidden lg:w-[360px] shrink-0">
          <p className="text-xs font-bold text-gray-500 tracking-widest uppercase px-5 py-4">
            {FARMERS.length} Petani Ditemukan
          </p>
          <div className="divide-y divide-gray-100">
            {FARMERS.map((farmer) => (
              <button
                key={farmer.id}
                id={`farmer-item-${farmer.id}`}
                onClick={() => setSelected(farmer.id)}
                className={`w-full text-left px-5 py-4 flex items-start justify-between gap-3 transition-colors ${
                  selected === farmer.id ? "bg-[#F5F3E8]" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {farmer.name}
                  </p>
                  <p className="text-xs text-gray-500">{farmer.location}</p>
                  <p className="text-xs font-semibold text-[#3A7D1E] mt-1">
                    {farmer.stock}
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-800 shrink-0 mt-0.5">
                  {farmer.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 bg-[#E8EAE4] rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-[340px]">
          <iframe
            title="Peta Petani Terdekat"
            className="w-full h-full border-0 min-h-[340px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63271.39938547454!2d110.33526!3d-7.78583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5786e9f9bc9b%3A0x48a41a48a0bb96c!2sYogyakarta!5e0!3m2!1sen!2sid!4v1700000000000"
          />
        </div>
      </div>
    </div>
  );
}
