import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [isVerifyingClaveUnica, setIsVerifyingClaveUnica] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleClaveUnicaSim = (e) => {
    e.preventDefault();
    setIsVerifyingClaveUnica(true);

    setTimeout(() => {
      setIsVerifyingClaveUnica(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess({
          name: "Gonzalo Valenzuela",
          rut: rut || "18.452.910-K",
          verifiedRUT: true,
          rating: 5.0,
          reviewsCount: 4,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        });
        onClose();
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
            P
          </div>
          <h2 className="text-xl font-bold tracking-tight">Acceso & Validación de Identidad</h2>
          <p className="text-xs text-slate-400 mt-1">Conecta con la red de confianza de Chile</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {!success ? (
            <form onSubmit={handleClaveUnicaSim} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <span className="font-bold block">Sello de Seguridad Chile</span>
                  Validamos la identidad vía RUT / ClaveÚnica para prevenir estafas y mantener una comunidad segura.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">RUT Chileno</label>
                <input
                  type="text"
                  placeholder="12.345.678-K"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña o ClaveÚnica</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifyingClaveUnica}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                {isVerifyingClaveUnica ? (
                  <span className="animate-pulse">Verificando en Registro Civil...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Ingresar con ClaveÚnica / RUT</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-slate-900">¡Identidad Verificada!</h3>
              <p className="text-xs text-slate-500">Bienvenido a la red de PololoSafe. Tu RUT ha sido autenticado exitosamente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
