import React, { useState } from 'react';
import { MessageSquare, Clock, MapPin, Search } from 'lucide-react';
import { SecurityBadges } from './SecurityBadges';

const STATUS_CONFIG = {
  'pending': { label: 'Pendiente', color: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  'accepted': { label: 'Aceptado', color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
  'in_progress': { label: 'En proceso', color: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  'completed': { label: 'Completado', color: 'bg-slate-500', text: 'text-slate-700', bg: 'bg-slate-100' },
  'cancelled': { label: 'Cancelado', color: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' }
};

export default function MyDealsView({ deals = [], onOpenChat, onExplore }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredDeals = deals.filter(deal => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['pending', 'accepted', 'in_progress'].includes(deal.status);
    if (activeTab === 'completed') return deal.status === 'completed';
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-slate-900 pt-12 pb-4 px-4 sticky top-0 z-10 rounded-b-3xl">
        <h1 className="text-2xl font-bold text-white mb-4 px-2">Mis Acuerdos</h1>
        <div className="flex gap-2 px-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'all' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'active' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            Activos
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}
          >
            Completados
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {filteredDeals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4">
            <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Aún no tienes acuerdos</h3>
            <p className="text-slate-500 mb-6 text-sm">
              Cuando postules a un pololo o acepten tus servicios, aparecerán aquí.
            </p>
            <button 
              onClick={onExplore}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/20 active:bg-emerald-600"
            >
              Explora pololos disponibles
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDeals.map(deal => {
              const status = STATUS_CONFIG[deal.status] || STATUS_CONFIG['pending'];
              
              return (
                <div key={deal.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 w-fit ${status.bg}`}>
                      <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                      <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      {deal.timeAgo}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-slate-900 line-clamp-1">{deal.title}</h3>
                  
                  <div className="flex items-center gap-3">
                    <img src={deal.otherUser.avatar || 'https://i.pravatar.cc/150?u=' + deal.otherUser.id} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-200 object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-slate-900 truncate">{deal.otherUser.name}</span>
                        {deal.otherUser.isVerified && (
                          <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</div>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} />
                        {deal.otherUser.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-emerald-600">${deal.price.toLocaleString('es-CL')}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-medium">Acordado</span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-1"></div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-500 truncate flex-1 italic">
                      "{deal.lastMessage}"
                    </p>
                    <button 
                      onClick={() => onOpenChat(deal)}
                      className="flex items-center justify-center w-10 h-10 bg-slate-50 rounded-full text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors shrink-0"
                    >
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
