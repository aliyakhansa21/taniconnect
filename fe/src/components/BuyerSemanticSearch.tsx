"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Tag, Percent, SlidersHorizontal, PackageX, AlertCircle, Cpu } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price_per_kg: number;
  distance_km: number;
  has_oversupply_tag: boolean;
  similarity: number;
}

interface SearchResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}

export default function BuyerSemanticSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fungsi utama untuk mengambil data dari backend API
  const executeSearch = async (queryToFetch: string) => {
    if (!queryToFetch.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setLastSearchedQuery(queryToFetch);

    try {
      const response = await fetch(
        `http://localhost:5000/api/search?query=${encodeURIComponent(queryToFetch)}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `Server merespons dengan status ${response.status}`
        );
      }

      const data: SearchResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Terjadi kesalahan pada server");
      }

      setResults(data.data ?? []);
    } catch (err: unknown) {
      console.error("Error fetching search results:", err);
      setResults([]);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal terhubung ke server. Pastikan backend berjalan di port 5000."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handler saat tombol cari atau Enter ditekan
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  // Handler saat chip rekomendasi diklik (langsung memicu pencarian)
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    executeSearch(suggestion);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filters = [
    { id: "category", label: "Kategori" },
    { id: "radius", label: "Radius" },
    { id: "price", label: "Harga" },
    { id: "oversupply", label: "Tag Oversupply" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Search Header Section dengan tag Form */}
      <div className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="relative group max-w-3xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-emerald-600/60 group-focus-within:text-emerald-600 transition-colors" />
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-32 py-4 bg-white border-2 border-emerald-100 rounded-2xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-gray-800 placeholder-gray-400 shadow-sm text-lg"
            placeholder="Cari bahan baku, misal: bumbu sambal matah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute inset-y-2 right-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-xl transition-colors flex items-center justify-center shadow-sm font-semibold text-sm"
          >
            <Search className="h-4 w-4 mr-2" />
            Cari
          </button>
        </form>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500 mr-2">Filter Cepat:</span>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                ${
                  activeFilter === filter.id
                    ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="pt-2">
        {isLoading ? (
          /* Skeleton Loading */
          <div className="space-y-6">
            <div className="h-10 bg-emerald-50 rounded-xl animate-pulse w-80"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse space-y-4">
                  <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
                    <div className="h-6 bg-gray-200 rounded-md w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="text-center py-16 px-4 bg-red-50/50 rounded-3xl border border-red-100">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">{error}</p>
            <button
              onClick={() => executeSearch(searchQuery)}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              Coba Lagi
            </button>
          </div>
        ) : !lastSearchedQuery ? (
          /* Initial State */
          <div className="text-center py-20 px-4 bg-gradient-to-b from-emerald-50/50 to-white rounded-3xl border border-emerald-100/50">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Pencarian Semantik AI</h3>
            <p className="text-gray-500 max-w-md mx-auto text-base">
              Ketikkan kebutuhan Anda, seperti &quot;bahan baku untuk salad segar&quot; atau &quot;bumbu sambal matah&quot;, lalu tekan tombol Cari. AI kami akan mencarikan kecocokan terbaik dari petani.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["bahan salad segar", "bumbu sambal matah", "sayuran untuk soto"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 px-4 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
               <PackageX className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Produk tidak ditemukan</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Kami tidak dapat menemukan produk yang sesuai dengan pencarian &quot;{lastSearchedQuery}&quot;.</p>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <span className="text-sm text-gray-400 w-full mb-2">Coba cari dengan kata kunci lain:</span>
              {["Sayuran Segar", "Bumbu Dapur", "Buah Organik"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results Grid */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-800">
                Menemukan <span className="text-emerald-600 font-bold">{results.length}</span> kecocokan produk untuk &quot;{lastSearchedQuery}&quot;
              </h2>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200/60">
                <Cpu className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm text-emerald-700 font-medium">
                  Semantic Search Powered by Gemini Embeddings
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col"
                >
                  {/* Image Placeholder */}
                  <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500 bg-gray-50">
                      <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Relevance Score Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 border border-white/20">
                      <Percent className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-700">
                        {Math.round(product.similarity * 100)}% Match
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase bg-emerald-50 px-2.5 py-1 rounded-md">
                          {product.category}
                        </span>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mt-auto pt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-1">Harga per kg</p>
                        <p className="text-2xl font-black text-gray-900">
                          {formatCurrency(product.price_per_kg)}
                        </p>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-center text-sm font-medium text-gray-600">
                        <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                        {product.distance_km} km
                      </div>

                      {product.has_oversupply_tag && (
                        <div className="flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200/50">
                          <Tag className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                          Harga Turun
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}