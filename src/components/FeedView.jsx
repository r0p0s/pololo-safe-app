import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SecurityBadges } from './SecurityBadges';

export default function FeedView({ pololos = [], onSelectPololo, categories = ['Todos', 'Maestro', 'Transporte', 'Jardinería', 'Mascotas', 'Clases', 'Tecnología', 'Limpieza'] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredPololos = pololos.filter(p => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = p.title?.toLowerCase().includes(searchLower) || p.description?.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-56px-64px)] bg-slate-50">
      {/* Header Sticky Area */}
      <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur px-4 pt-4 pb-2 border-b border-slate-200 shadow-sm">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar pololos en tu zona..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 text-slate-900 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex space-x-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredPololos.length === 0 ? (
          <div className="text-center text-slate-500 mt-10">
            <p>No se encontraron pololos con esos filtros.</p>
          </div>
        ) : (
          filteredPololos.map(pololo => (
            <div
              key={pololo.id}
              onClick={() => onSelectPololo(pololo)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider">
                  {pololo.category}
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
                  ${pololo.price?.toLocaleString('es-CL')}
                </span>
              </div>
              
              <h3 className="font-bold text-sm text-slate-900 mb-1">{pololo.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                {pololo.description}
              </p>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                    {pololo.author?.avatar ? (
                      <img src={pololo.author.avatar} alt={pololo.author.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold text-xs">
                        {pololo.author?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-900 leading-none">{pololo.author?.name}</span>
                    <div className="mt-1">
                      <SecurityBadges badges={pololo.author?.badges} size="sm" />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    pololo.urgency === 'Urgente' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {pololo.urgency}
                  </span>
                  <span className="text-[10px] text-slate-400">{pololo.timeAgo}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
