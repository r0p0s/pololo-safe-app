import React from 'react';
import { User, ShieldCheck, Star, CheckCircle, Clock, MapPin, Award, Settings, LogOut } from 'lucide-react';

export default function ProfileView({ currentUser, onOpenAuth }) {
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Perfil de Usuario</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Inicia sesión para gestionar tus pololos publicados, postulaciones activas y sello de verificación de RUT.
        </p>
        <button
          onClick={onOpenAuth}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md"
        >
          Ingresar con ClaveÚnica / RUT
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* User Header Card */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-emerald-500/30"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">{currentUser.name}</h2>
              {currentUser.verifiedRUT && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> RUT Verificado
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">RUT: {currentUser.rut}</p>
            <div className="flex items-center space-x-3 mt-2 text-xs">
              <span className="flex items-center font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                {currentUser.rating} Reputación
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{currentUser.reviewsCount} pololos completados</span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700">
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Historial Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Tus Pololos Activos & Historial
        </h3>

        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between">
            <div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                En Proceso
              </span>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">
                Gasfiter para reparar fuga en lavaplatos
              </h4>
              <span className="text-[11px] text-slate-500">Providencia • Acordado por $35.000 CLP</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
              Ver Chat
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-between">
            <div>
              <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Finalizado
              </span>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">
                Pintado de fachada casa en Ñuñoa
              </h4>
              <span className="text-[11px] text-slate-500">Evaluación: 5.0 ⭐</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Hace 2 semanas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
