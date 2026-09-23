import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ShieldCheck, MapPin, Clock } from 'lucide-react';

// Custom Marker minimalista y elegante para 2026
const customPinIcon = new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color:#0f172a; color:#34d399; width:36px; height:36px; border-radius:12px; display:flex; align-items:center; justify-content:center; border:2px solid #ffffff; box-shadow:0 10px 15px -3px rgba(0,0,0,0.25); font-size:16px;">📍</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -18]
});

export default function MapView({ pololos, onSelectPololo }) {
  const santiagoCenter = [-33.4372, -70.6506];

  return (
    <div className="relative w-full h-[calc(100vh-65px)] bg-slate-900">
      <MapContainer
        center={santiagoCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pololos.map((pololo) => (
          <Marker
            key={pololo.id}
            position={[pololo.lat, pololo.lng]}
            icon={customPinIcon}
          >
            <Popup>
              <div className="p-3 max-w-xs font-sans">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    {pololo.category}
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    ${pololo.payment.toLocaleString('es-CL')}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-xs leading-snug mb-2">
                  {pololo.title}
                </h3>

                <div className="flex items-center text-[11px] text-slate-500 mb-3 space-x-2">
                  <span className="font-medium text-slate-700">{pololo.comuna}</span>
                  <span>•</span>
                  <span className="text-slate-500">{pololo.urgency}</span>
                </div>

                <button
                  onClick={() => onSelectPololo(pololo)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition-all text-center block"
                >
                  Ver Pololo & Contactar
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
