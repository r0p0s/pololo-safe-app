import React from 'react';
import { User, ChevronRight, Settings, Shield, Bell, HelpCircle, LogOut, Star } from 'lucide-react';
import { SecurityBadges } from './SecurityBadges';

export default function ProfileView({ currentUser, onOpenAuth, onLogout }) {
  if (!currentUser) {
    return (
      <div className="flex flex-col h-full bg-slate-50 pb-20 items-center justify-center px-6">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
          <User className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Ingresar para ver tu perfil</h2>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Únete a la red de pololos seguros y comienza a ofrecer o contratar servicios.
        </p>
        <button 
          onClick={onOpenAuth}
          className="w-full max-w-sm bg-emerald-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 active:bg-emerald-600 transition-colors"
        >
          Iniciar sesión / Registrarse
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto">
      {/* Header Profile Card */}
      <div className="bg-slate-900 pt-16 pb-8 px-6 rounded-b-[2rem] shadow-sm text-center relative">
        <div className="relative inline-block mb-4">
          <img 
            src={currentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=10b981&color=fff`} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 bg-slate-800"
          />
          {currentUser.isVerified && (
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 border-4 border-slate-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">{currentUser.name}</h1>
        <p className="text-sm text-slate-400 mb-6">Miembro desde Sept 2026</p>
        
        <div className="flex justify-center mb-6">
          <SecurityBadges badges={['identity', 'background', 'phone']} size="md" />
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-2 max-w-sm mx-auto">
          <div className="flex-1 bg-slate-800/50 rounded-2xl py-3 px-2 border border-slate-700/50">
            <div className="text-xl font-bold text-white mb-1">12</div>
            <div className="text-[10px] text-slate-400 uppercase font-medium leading-tight">Pololos<br/>Completados</div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-2xl py-3 px-2 border border-slate-700/50">
            <div className="text-xl font-bold text-emerald-400 mb-1">98%</div>
            <div className="text-[10px] text-slate-400 uppercase font-medium leading-tight">Tasa de<br/>Respuesta</div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-2xl py-3 px-2 border border-slate-700/50">
            <div className="text-xl font-bold text-amber-400 flex items-center justify-center gap-1">
              4.9 <Star className="w-3 h-3 fill-amber-400" />
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-medium leading-tight">Calificación<br/>Promedio</div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 space-y-6">
        
        {/* Skills Section */}
        <section>
          <div className="flex justify-between items-end mb-3 px-2">
            <h3 className="font-bold text-slate-900 text-lg">Mis Habilidades</h3>
            <button className="text-sm text-emerald-600 font-medium">Editar</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Gasfitería', 'Electricidad Básica', 'Armado de Muebles'].map(skill => (
              <span key={skill} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-sm font-medium shadow-sm">
                {skill}
              </span>
            ))}
            <button className="bg-slate-100 border border-slate-200 border-dashed text-slate-500 px-3 py-1.5 rounded-xl text-sm font-medium hover:bg-slate-200">
              + Agregar
            </button>
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h3 className="font-bold text-slate-900 text-lg mb-3 px-2">Reseñas recibidas</h3>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-3 items-center">
                    <img src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-10 h-10 rounded-full bg-slate-200" alt="Reviewer" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">María Paz Silva</p>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, j) => <Star key={j} size={12} className="fill-amber-400" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Hace 1 sem</span>
                </div>
                <p className="text-sm text-slate-600 italic">"Excelente disposición, llegó a la hora acordada y dejó todo limpio. Muy recomendado."</p>
              </div>
            ))}
          </div>
        </section>

        {/* Settings Menu */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-1">
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><Settings size={18} /></div>
                <span className="font-medium text-slate-700">Editar perfil</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
            <div className="h-px bg-slate-100 mx-4"></div>
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Shield size={18} /></div>
                <span className="font-medium text-slate-700">Verificar identidad</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
            <div className="h-px bg-slate-100 mx-4"></div>
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><Bell size={18} /></div>
                <span className="font-medium text-slate-700">Notificaciones</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
            <div className="h-px bg-slate-100 mx-4"></div>
            <button className="w-full flex items-center justify-between p-4 active:bg-slate-50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><HelpCircle size={18} /></div>
                <span className="font-medium text-slate-700">Ayuda y soporte</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </button>
            <div className="h-px bg-slate-100 mx-4"></div>
            <button onClick={onLogout} className="w-full flex items-center justify-between p-4 active:bg-red-50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-600"><LogOut size={18} /></div>
                <span className="font-medium text-red-600">Cerrar sesión</span>
              </div>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
