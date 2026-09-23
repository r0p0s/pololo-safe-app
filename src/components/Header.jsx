import React from 'react';
import { MapPin, Plus, SlidersHorizontal, Shield, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenCreateModal }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 backdrop-blur-md bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                pololo<span className="text-emerald-400">safe</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                Chile • Peer-to-Peer
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher (Segmented Control modern) */}
        <div className="hidden sm:flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/50">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'map'
                ? 'bg-slate-950 text-white shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🗺️ Mapa interactivo
          </button>
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              activeTab === 'feed'
                ? 'bg-slate-950 text-white shadow-sm border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Explorar Pololos
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenCreateModal}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/10 active:scale-97"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden xs:inline">Publicar Pololo</span>
          </button>
        </div>
      </div>

      {/* Mobile Switcher */}
      <div className="sm:hidden flex border-t border-slate-800 p-1 bg-slate-900/95">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'map' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'
          }`}
        >
          🗺️ Mapa
        </button>
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${
            activeTab === 'feed' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400'
          }`}
        >
          ⚡ Explorar Pololos
        </button>
      </div>
    </header>
  );
}
