import React from 'react';
import { MapPin, ShieldCheck, Star, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function FeedView({ pololos, onSelectPololo, selectedCategory, setSelectedCategory, categories }) {
  const filteredPololos = selectedCategory === 'Todos' 
    ? pololos 
    : pololos.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Banner de Presentación Pro */}
      <div className="mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-xl z-10 relative">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            Chile • Red de Confianza Local
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            Pololos directos entre personas, sin intermediarios.
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
            Encuentra apoyo inmediato o publica un trabajo puntual. Verificación de identidad con RUT para máxima seguridad en la comunidad.
          </p>
        </div>
      </div>

      {/* Categorías (Pills sobrios) */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-slate-200/80">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
              selectedCategory === cat.name
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Lista de Pololos Card Modernas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {filteredPololos.map((pololo) => (
          <div
            key={pololo.id}
            onClick={() => onSelectPololo(pololo)}
            className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header Card */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md uppercase">
                  {pololo.category}
                </span>
                <span className="text-sm font-extrabold text-slate-900 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
                  ${pololo.payment.toLocaleString('es-CL')} CLP
                </span>
              </div>

              {/* Título y Descripción */}
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                <span>{pololo.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>

              <p className="text-slate-500 text-xs line-clamp-2 mb-5 leading-relaxed font-normal">
                {pololo.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              {/* Footer info & User */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={pololo.author.avatar}
                    alt={pololo.author.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <div className="flex items-center text-xs font-bold text-slate-800">
                      {pololo.author.name}
                      {pololo.author.verifiedRUT && (
                        <ShieldCheck className="w-3.5 h-3.5 ml-1 text-emerald-600" title="RUT Verificado" />
                      )}
                    </div>
                    <div className="flex items-center text-[11px] text-slate-400 font-medium">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                      <span className="text-slate-700 font-semibold">{pololo.author.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{pololo.comuna}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                  {pololo.urgency}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
