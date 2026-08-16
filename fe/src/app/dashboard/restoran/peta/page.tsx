"use client";

import { useState, useEffect } from "react";
// Tambahkan ikon TrendingDown untuk label harga turun
import { Search, TrendingDown, ShoppingBag } from "lucide-react"; 
// Tambahkan import Popup
import Map, { Source, Layer, Marker, Popup, type LayerProps } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PetaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<any>(null);

  const userLocation = { lat: -7.78583, lng: 110.33526 };

  useEffect(() => {
    const fetchFarms = async () => {
      const { data, error } = await supabase.rpc("get_farms_geojson", {
        user_lat: userLocation.lat,
        user_lng: userLocation.lng,
        radius_km: 25, 
      });

      if (data) {
        setGeoData(data);
      } else if (error) {
        console.error("Gagal menarik data:", error);
      }
    };
    fetchFarms();
  }, []);

  const heatmapLayer: LayerProps = {
    id: "heatmap-layer",
    type: "circle",
    paint: {
      "circle-radius": [
        "case",
        ["==", ["get", "stock_status"], "oversupply"], 45,
        25
      ],
      "circle-color": [
        "match",
        ["get", "stock_status"],
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

  // Mencari data petani yang sedang di-klik untuk ditampilkan di Popup
  const selectedFarm = selected 
    ? geoData?.features?.find((f: any) => f.properties.id === selected) 
    : null;

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Peta & Cari Petani
        </h1>
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
        <div className="bg-white rounded-2xl border border-l-4 border-l-[#C9B97A] border-gray-200 shadow-sm overflow-hidden lg:w-[360px] shrink-0 h-[480px] overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-gray-500 tracking-widest uppercase px-5 py-4">
            {geoData?.features?.length || 0} Petani Ditemukan
          </p>
          <div className="divide-y divide-gray-100">
            {geoData?.features?.map((farm: any) => {
              const props = farm.properties;
              return (
                <button
                  key={props.id}
                  onClick={() => setSelected(props.id)}
                  className={`w-full text-left px-5 py-4 flex flex-col gap-2 transition-colors ${
                    selected === props.id ? "bg-[#F5F3E8]" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {props.name}
                      </p>
                      <p className="text-xs text-gray-500">{props.commodity}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-800 shrink-0 mt-0.5">
                      Rp {props.price?.toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* LABEL HARGA TURUN DI SIDEBAR */}
                  <div className="flex items-center justify-between w-full mt-1">
                    <p className="text-xs font-semibold text-[#3A7D1E]">
                      Stok: {props.stock}kg
                    </p>
                    {props.stock_status === "oversupply" && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600 animate-pulse border border-red-200">
                        <TrendingDown size={10} />
                        Harga Turun
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mapbox Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-[480px] relative">
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            initialViewState={{
              longitude: userLocation.lng,
              latitude: userLocation.lat,
              zoom: 13,
            }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            style={{ width: "100%", height: "100%" }}
          >
            {geoData && geoData.features && geoData.features.length > 0 && (
              <Source id="farms-data" type="geojson" data={geoData}>
                <Layer {...heatmapLayer} />
              </Source>
            )}

            {geoData?.features?.map((farm: any) => {
              const coordinates = farm.geometry?.coordinates;
              if (!coordinates) return null;
              
              const [lng, lat] = coordinates;
              const props = farm.properties;
              const isSelected = selected === props.id;

              return (
                <Marker
                  key={`marker-${props.id}`}
                  longitude={lng}
                  latitude={lat}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setSelected(props.id);
                  }}
                >
                  <div
                    className={`cursor-pointer transition-transform text-2xl drop-shadow-md ${
                      isSelected ? "scale-125 -translate-y-2" : "scale-100"
                    }`}
                  >
                    📍
                  </div>
                </Marker>
              );
            })}

            {/* POPUP INFO CARD SAAT PIN DIKLIK */}
            {selectedFarm && (
              <Popup
                longitude={selectedFarm.geometry.coordinates[0]}
                latitude={selectedFarm.geometry.coordinates[1]}
                anchor="bottom"
                offset={35} // Jarak popup dari pin
                onClose={() => setSelected(null)}
                closeOnClick={false}
                className="z-50 rounded-2xl"
              >
                <div className="p-1 w-[220px]">
                  <h3 className="font-bold text-sm text-gray-900">{selectedFarm.properties.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{selectedFarm.properties.commodity}</p>
                  
                  {/* LABEL OVERSUPPLY DI DALAM POPUP */}
                  {selectedFarm.properties.stock_status === "oversupply" && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-2 mb-3">
                      <p className="text-[10px] leading-tight font-bold text-red-600 flex items-start gap-1.5">
                        <TrendingDown size={14} className="shrink-0" />
                        Harga turun karena potensi oversupply. Beli sekarang untuk cegah food waste!
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="font-bold text-sm text-gray-900">
                      Rp {selectedFarm.properties.price?.toLocaleString("id-ID")}
                    </span>
                    <button className="flex items-center gap-1 bg-[#2D3A1E] text-white text-xs px-3 py-1.5 rounded-full font-bold hover:bg-[#1C2B0E] transition-colors">
                      <ShoppingBag size={12} /> Beli
                    </button>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}