import React, { useState } from 'react';
import { X, MapPin, ShieldCheck, Star, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export default function PololoDetailModal({ pololo, onClose }) {
  const [applicantSent, setApplicantSent] = useState(false);
  const [offerPrice, setOfferPrice] = useState(pololo ? pololo.payment : 0);

  if (!pololo) return null;

  const handleApply = (e) => {
    e.preventDefault();
    setApplicantSent(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        
        {/* Header Modal */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider border border-slate-700">
              {pololo.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Titulo y Precio */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug tracking-tight">
                {pololo.title}
              </h2>
              <div className="flex items-center text-xs text-slate-500 mt-1.5 space-x-2">
                <span className="font-semibold text-slate-700">{pololo.comuna}, Santiago</span>
                <span>•</span>
                <span>Publicado {pololo.createdAt}</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Presupuesto</span>
              <span className="text-xl font-black text-emerald-700">${pololo.payment.toLocaleString('es-CL')}</span>
            </div>
          </div>

          {/* Tarjeta de Usuario / Solicitante */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={pololo.author.avatar}
                alt={pololo.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <div className="flex items-center font-bold text-slate-900 text-sm">
                  {pololo.author.name}
                  {pololo.author.verifiedRUT && (
                    <span className="ml-1.5 inline-flex items-center bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-600" />
                      RUT Verificado
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-slate-500 font-medium mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-bold text-slate-800">{pololo.author.rating}</span>
                  <span className="mx-1">•</span>
                  <span>{pololo.author.reviewsCount} pololos acordados</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Descripción del Requerimiento</h4>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
              {pololo.description}
            </p>
          </div>

          {/* Formulario de Postulación de Acuerdo Directo */}
          {!applicantSent ? (
            <form onSubmit={handleApply} className="space-y-4 pt-2">
              <div className="bg-slate-900 text-white p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Tu propuesta de valor (CLP):
                  </label>
                  <span className="text-[10px] text-slate-400 flex items-center">
                    <Lock className="w-3 h-3 mr-1" /> Acuerdo P2P Seguro
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-sm">$</span>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-white text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/10 active:scale-98"
              >
                <span>Enviar propuesta de acuerdo a {pololo.author.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 text-slate-900 p-5 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm">Propuesta de Acuerdo Enviada</h4>
              <p className="text-xs leading-relaxed text-slate-600">
                Se notificó a <strong>{pololo.author.name}</strong> por <strong>${offerPrice.toLocaleString('es-CL')} CLP</strong>. Recibirás un aviso directo en tu cuenta para agendar el trabajo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
