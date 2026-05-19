"use client";

import { useState } from 'react';
import Map, { Marker, ViewStateChangeEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css'; 

export default function TestMapPage() {
  // Mengatur koordinat awal ke wilayah Kabupaten Sleman
  const [viewState, setViewState] = useState({
    longitude: 110.3398, 
    latitude: -7.7156,
    zoom: 11
  });

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Test Mapbox API</h1>
        <p className="text-sm text-gray-500 mt-1">Geospatial Heatmap Foundation - Sleman</p>
      </div>
      
      {/* Container peta */}
      <div className="w-full max-w-4xl h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative">
        <Map
          {...viewState}
          onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12" // Bisa diganti ke 'satellite-v9' atau 'light-v11'
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        >
          {/* Contoh menaruh satu titik pin (Marker) di tengah Sleman */}
          <Marker longitude={110.3398} latitude={-7.7156} color="#3B6611" />
        </Map>
      </div>
    </div>
  );
}