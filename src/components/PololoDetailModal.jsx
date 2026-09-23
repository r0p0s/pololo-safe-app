import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Flag, Send } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { SecurityBadges } from './SecurityBadges';

export default function PololoDetailModal({ pololo, onClose, onReport }) {
  const [offerPrice, setOfferPrice] = useState('');
  const [applicantSent, setApplicantSent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (pololo && !applicantSent) {
      setOfferPrice(pololo.price?.toString() || '');
    }
  }, [pololo, applicantSent]);

  if (!pololo) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setApplicantSent(false);
      onClose();
    }, 300); // Wait for transition
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApplicantSent(true);
  };

  const defaultIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />
      
      {/* Content Panel */}
      <div className={`relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[90vh] transition-transform duration-300 ${isClosing ? 'translate-y-full' : 'translate-y-0'}`}>
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-2 cursor-pointer" onClick={handleClose}>
          <div className="w-12 h-1 bg-slate-300 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8 pt-2 no-scrollbar">
          <div className="flex justify-between items-start mb-4">
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider">
              {pololo.category}
            </span>
            <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${pololo.status === 'abierto' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
              {pololo.status === 'abierto' ? 'Buscando' : 'Cerrado'}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
            {pololo.title}
          </h2>
          
          <div className="mb-5">
            <span className="text-3xl font-black text-emerald-700">
              ${Number(pololo.price).toLocaleString('es-CL')}
            </span>
            <span className="text-slate-500 text-sm ml-1">CLP</span>
          </div>

          <div className="flex flex-col space-y-2 mb-6">
            <div className="flex items-center text-sm text-slate-600">
              <MapPin size={16} className="mr-2 text-slate-400" />
              {pololo.comuna}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Clock size={16} className="mr-2 text-slate-400" />
              Para: <span className="font-medium ml-1 text-slate-800">{pololo.urgency}</span>
            </div>
          </div>

          {pololo.lat && pololo.lng && (
            <div className="w-full h-[150px] rounded-xl overflow-hidden mb-6 border border-slate-200 pointer-events-none">
              <MapContainer center={[pololo.lat, pololo.lng]} zoom={14} className="w-full h-full" zoomControl={false} dragging={false} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[pololo.lat, pololo.lng]} icon={defaultIcon} />
              </MapContainer>
            </div>
          )}

          {/* Author Card */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                {pololo.author?.avatar ? (
                  <img src={pololo.author.avatar} alt={pololo.author.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold text-sm">
                    {pololo.author?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{pololo.author?.name}</p>
                <SecurityBadges badges={pololo.author?.badges} size="sm" />
              </div>
            </div>
            <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
              Ver perfil
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Detalles</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {pololo.description}
            </p>
          </div>

          {!pololo.isOwn && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6">
              {applicantSent ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send size={24} className="text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">¡Propuesta enviada!</h4>
                  <p className="text-xs text-slate-500">El usuario ha sido notificado y te contactará si está interesado.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h4 className="font-bold text-slate-900 mb-3 text-sm">Proponer acuerdo</h4>
                  <div className="flex items-center mb-3">
                    <span className="text-slate-500 bg-white border border-slate-200 border-r-0 rounded-l-xl px-4 py-3 font-medium h-12 flex items-center">$</span>
                    <input
                      type="number"
                      required
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      className="flex-1 border border-slate-200 rounded-r-xl px-3 py-3 h-12 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white font-medium text-slate-900"
                      placeholder="Tu tarifa"
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-transform">
                    Enviar propuesta
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="flex justify-center pt-4 border-t border-slate-100">
            <button 
              onClick={() => onReport?.(pololo.id)}
              className="flex items-center text-xs text-slate-400 hover:text-red-500 transition-colors"
            >
              <Flag size={14} className="mr-1.5" />
              Reportar publicación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
