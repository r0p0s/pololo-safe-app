import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locate } from 'lucide-react';

const CATEGORIES = ['Todos', 'Maestro', 'Transporte', 'Jardinería', 'Mascotas', 'Clases', 'Tecnología', 'Limpieza'];

const getCategoryStyles = (category) => {
  switch (category) {
    case 'Maestro': return { emoji: '🔨', color: '#2563eb' }; // blue-600
    case 'Transporte': return { emoji: '🚚', color: '#f97316' }; // orange-500
    case 'Jardinería': return { emoji: '🌿', color: '#16a34a' }; // green-600
    case 'Mascotas': return { emoji: '🐕', color: '#a855f7' }; // purple-500
    case 'Clases': return { emoji: '📚', color: '#0891b2' }; // cyan-600
    case 'Tecnología': return { emoji: '💻', color: '#4f46e5' }; // indigo-600
    case 'Limpieza': return { emoji: '🧹', color: '#14b8a6' }; // teal-500
    default: return { emoji: '📍', color: '#334155' }; // slate-700
  }
};

const createIcon = (category) => {
  const { emoji, color } = getCategoryStyles(category);
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
};

const LocationButton = () => {
  const map = useMap();
  const locateUser = () => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  };
  return (
    <button
      onClick={locateUser}
      className="absolute bottom-6 right-6 z-[400] bg-white p-3 rounded-full shadow-lg text-slate-700 hover:text-emerald-500 transition-colors"
    >
      <Locate size={24} />
    </button>
  );
};

export default function MapView({ pololos = [], onSelectPololo }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPololos = selectedCategory === 'Todos'
    ? pololos
    : pololos.filter(p => p.category === selectedCategory);

  return (
    <div className="relative w-full h-[calc(100vh-56px-64px)]">
      {/* Categories Overlay */}
      <div className="absolute top-4 left-0 right-0 z-[400] overflow-x-auto px-4 pb-2 no-scrollbar flex space-x-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <MapContainer
        center={[-33.4372, -70.6506]}
        zoom={12}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPololos.map(pololo => {
          if (!pololo.lat || !pololo.lng) return null;
          return (
            <Marker
              key={pololo.id}
              position={[pololo.lat, pololo.lng]}
              icon={createIcon(pololo.category)}
            >
              <Popup className="pololo-popup" closeButton={false}>
                <div className="p-1 min-w-[200px]">
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded mb-2">
                    {pololo.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mb-1 leading-tight">{pololo.title}</h3>
                  <p className="text-emerald-600 font-black text-sm mb-2">
                    ${pololo.price?.toLocaleString('es-CL')} CLP
                  </p>
                  <p className="text-xs text-slate-500 mb-3">{pololo.comuna}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPololo(pololo);
                    }}
                    className="w-full bg-emerald-500 text-white font-medium py-2 rounded-lg text-sm"
                  >
                    Ver detalles
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <LocationButton />
      </MapContainer>
    </div>
  );
}
