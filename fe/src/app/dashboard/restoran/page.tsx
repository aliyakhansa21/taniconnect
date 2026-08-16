"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  TrendingDown,
  Users,
  ShoppingBag,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Map, { Source, Layer, Marker, type LayerProps } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { createBrowserClient } from "@supabase/ssr";

// Inisialisasi Supabase
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Mock Data (Sesuai kode asli) ───────────────────────────
const STAT_CARDS = [
  { id: "pesanan-aktif", label: "Pesanan Aktif", value: "3", sub: "Sedang diproses", icon: Clock },
  { id: "hemat-vs-pasar", label: "Hemat vs Pasar", value: "Rp 180.000", sub: "vs harga konvensional", icon: TrendingDown },
  { id: "petani-favorit", label: "Petani Favorit", value: "5", sub: "Petani langganan aktif", icon: Users },
  { id: "total-pesanan", label: "Total Pesanan", value: "24", sub: "Transaksi selesai", icon: ShoppingBag },
];

const AI_RECS = [
  { id: 1, name: "Tomat Segar Grade A", petani: "Pak Olivia Washingthon", price: "Rp 12.000/kg" },
  { id: 2, name: "Tomat Segar Grade A", petani: "Pak Olivia Washingthon", price: "Rp 12.000/kg" },
  { id: 3, name: "Tomat Segar Grade A", petani: "Pak Olivia Washingthon", price: "Rp 12.000/kg" },
];

const PESANAN_BERJALAN = [
  { id: "w1", restoran: "Warung Jepun", item: "Tomat Segar 20kg . Rp 240.000", time: "Hari ini 09.30 WIB", status: "Dikirim", statusColor: "text-[#E6A817] border-[#E6A817]" },
  { id: "d1", restoran: "D'Kantin", item: "Wortel Organik 20kg . Rp 240.000", time: "Hari ini 09.30 WIB", status: "Dikonfirmasi", statusColor: "text-blue-600 border-blue-400" },
  { id: "h1", restoran: "Hotter", item: "Cabai Merah 20kg . Rp 240.000", time: "Hari ini 09.30 WIB", status: "Konfirmasi", statusColor: "text-gray-700 border-gray-400" },
];

const AKTIVITAS = [
  { id: 1, text: "Pesanan Warung Jepun selesai", time: "2 jam lalu" },
  { id: 2, text: "Pesanan Hotter dalam proses", time: "1 jam lalu" },
  { id: 3, text: "Pesanan D'Kantin sedang dipersiapkan", time: "5 menit lalu" },
];

// ── Component ──────────────────────────────────────────────
export default function RestoranBerandaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [geoData, setGeoData] = useState<any>(null);

  const userLocation = { lat: -7.78583, lng: 110.33526 };

  // Fetch data spasial (sama seperti halaman Peta)
  useEffect(() => {
    const fetchFarms = async () => {
      const { data } = await supabase.rpc("get_farms_geojson", {
        user_lat: userLocation.lat,
        user_lng: userLocation.lng,
        radius_km: 25, 
      });
      if (data) setGeoData(data);
    };
    fetchFarms();
  }, []);

  // Layer Heatmap
  const heatmapLayer: LayerProps = {
    id: "heatmap-layer-mini",
    type: "circle",
    paint: {
      "circle-radius": ["case", ["==", ["get", "stock_status"], "oversupply"], 45, 25],
      "circle-color": [
        "match", ["get", "stock_status"],
        "oversupply", "#E53E3E",
        "normal", "#F5A623",
        "limited", "#38A169",
        "#CBD5E1"
      ],
      "circle-opacity": 0.4,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff"
    },
  };

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <Search size={18} className="text-gray-400 shrink-0" />
        <input
          id="beranda-search"
          type="text"
          placeholder="Ketik kebutuhan bahan Anda..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col justify-between min-h-[96px] shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-xs text-gray-500">{card.label}</span>
                <Icon size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-tight">{card.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* AI Rekomendasi */}
          <div className="bg-white rounded-2xl border border-l-4 border-l-[#C9B97A] border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2 className="text-sm font-bold text-gray-800">Rekomendasi AI untuk Anda</h2>
              <Link href="/dashboard/restoran/ai-search" className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline">
                Lihat Semua <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {AI_RECS.map((item) => (
                <div key={item.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.petani}</p>
                    <p className="text-xs font-semibold text-[#3A7D1E] mt-0.5">{item.price}</p>
                  </div>
                  <button className="shrink-0 px-5 py-1.5 rounded-full bg-[#2D3A1E] text-white text-xs font-bold hover:bg-[#1C2B0E] transition-colors">
                    Pesan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pesanan Berjalan */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-1">
              <div>
                <h2 className="text-sm font-bold text-gray-800">Pesanan Berjalan</h2>
                <p className="text-xs text-gray-400">3 pesanan aktif</p>
              </div>
              <Link href="/dashboard/restoran/pesanan" className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline">
                Lihat Semua di Kanban <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100 mt-2">
              {PESANAN_BERJALAN.map((order) => (
                <div key={order.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{order.restoran}</p>
                    <p className="text-xs text-gray-500">{order.item}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.time}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full border ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Peta Petani Terdekat - LIVE THUMBNAIL */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <h2 className="text-sm font-bold text-gray-800 px-5 pt-5 pb-3">
              Petani Terdekat
            </h2>
            <div className="relative h-48 bg-[#E8EAE4] overflow-hidden">
              <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                initialViewState={{
                  longitude: userLocation.lng,
                  latitude: userLocation.lat,
                  zoom: 11.5, // Sedikit di-zoom out biar terlihat lebih luas
                }}
                mapStyle="mapbox://styles/mapbox/light-v11"
                style={{ width: "100%", height: "100%" }}
                interactive={false} // MATIKAN INTERAKSI (scroll, drag, zoom)
              >
                {geoData && geoData.features && geoData.features.length > 0 && (
                  <Source id="farms-data-mini" type="geojson" data={geoData}>
                    <Layer {...heatmapLayer} />
                  </Source>
                )}

                {/* Render Pin (Dibatasi maksimal 5 saja untuk preview) */}
                {geoData?.features?.slice(0, 5).map((farm: any) => {
                  const coordinates = farm.geometry?.coordinates;
                  if (!coordinates) return null;
                  return (
                    <Marker
                      key={`mini-${farm.properties.id}`}
                      longitude={coordinates[0]}
                      latitude={coordinates[1]}
                      anchor="bottom"
                    >
                      <div className="text-lg drop-shadow-md">📍</div>
                    </Marker>
                  );
                })}
              </Map>

              {/* Overlay gradient bottom (biar menyatu dengan desain) */}
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
            <div className="px-5 py-3">
              <Link href="/dashboard/restoran/peta" className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline">
                <MapPin size={13} />
                Buka Peta Penuh
              </Link>
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h2 className="text-sm font-bold text-gray-800">Aktivitas Terbaru</h2>
              <Link href="/dashboard/restoran/riwayat" className="text-sm text-[#3A7D1E] font-semibold flex items-center gap-1 no-underline hover:underline">
                Lihat Semua <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {AKTIVITAS.map((item) => (
                <div key={item.id} className="px-5 py-3 flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}