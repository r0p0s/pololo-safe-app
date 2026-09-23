import React from 'react';
import { MapPin, ListFilter, MessageSquare, User, PlusCircle } from 'lucide-react';

export default function MobileBottomBar({ activeTab, setActiveTab, onOpenCreateModal }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-2 z-40 sm:hidden flex items-center justify-between text-white backdrop-blur-md bg-slate-900/95">
      <button
        onClick={() => setActiveTab('map')}
        className={`flex flex-col items-center space-y-1 transition-all ${
          activeTab === 'map' ? 'text-emerald-400 font-bold' : 'text-slate-400'
        }`}
      >
        <MapPin className="w-5 h-5" />
        <span className="text-[10px]">Mapa</span>
      </button>

      <button
        onClick={() => setActiveTab('feed')}
        className={`flex flex-col items-center space-y-1 transition-all ${
          activeTab === 'feed' ? 'text-emerald-400 font-bold' : 'text-slate-400'
        }`}
      >
        <ListFilter className="w-5 h-5" />
        <span className="text-[10px]">Pololos</span>
      </button>

      {/* Floating Plus button */}
      <button
        onClick={onOpenCreateModal}
        className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center -mt-5 shadow-lg shadow-emerald-500/30 border-2 border-slate-900 active:scale-95 transition-transform"
      >
        <PlusCircle className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center space-y-1 transition-all ${
          activeTab === 'chat' ? 'text-emerald-400 font-bold' : 'text-slate-400'
        }`}
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-[10px]">Chat</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center space-y-1 transition-all ${
          activeTab === 'profile' ? 'text-emerald-400 font-bold' : 'text-slate-400'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">Perfil</span>
      </button>
    </div>
  );
}
