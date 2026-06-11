"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const HISTORY_ITEMS = [
  { id: 1, time: "1 jam lalu" },
  { id: 2, time: "1 jam lalu" },
  { id: 3, time: "30 menit lalu" },
  { id: 4, time: "15 menit lalu" },
  { id: 5, time: "1 jam lalu" },
];

const HISTORY_LABELS = [
  "Tomat Segar Grade A",
  "Tomat Segar Grade A",
  "Timun Segar Grade B",
  "Bawang Merah Grade C",
  "Tomat Segar Grade A",
];

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <h1 className="text-xl font-bold text-gray-900 mb-4">AI Search</h1>

        {/* Search Input */}
        <div className="flex items-center gap-3 bg-white rounded-2xl border-2 border-[#3A7D1E] px-4 py-3">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            id="ai-search-input"
            type="text"
            placeholder="Katik kebutuhan bahan Anda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Rekomendasi AI */}
      <div className="bg-white rounded-2xl border border-l-4 border-l-[#C9B97A] border-gray-200 shadow-sm overflow-hidden">
        <h2 className="text-sm font-bold text-gray-800 px-5 pt-5 pb-3">
          Rekomendasi AI untuk Anda
        </h2>

        <div className="divide-y divide-gray-100">
          {HISTORY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <p className="text-sm text-gray-800">{HISTORY_LABELS[idx]}</p>
              <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
