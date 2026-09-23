import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState('auth');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 8) {
      setIsLoading(true);
      setErrorMsg('');
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 800);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = () => {
    const code = otpCode.join('');
    if (code.length === 4) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess({
          id: 'u1',
          name: 'Usuario Verificado',
          phone: `+56 ${phoneNumber}`,
          isVerified: true,
          rating: 5.0,
          reviewsCount: 1,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        });
      }, 1000);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      // Disparar la ventana emergente real de inicio de sesión con Google de Firebase
      const user = await signInWithGoogle();
      onLoginSuccess({
        id: user.uid,
        name: user.displayName || 'Usuario Google',
        email: user.email,
        avatar: user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
        rating: 5.0,
        reviewsCount: 0
      });
    } catch (err) {
      console.error("Error en Firebase Auth Google:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('El inicio de sesión fue cancelado. Por favor, selecciona tu cuenta de Google.');
      } else if (err.message && err.message.includes('Firebase auth not initialized')) {
        setErrorMsg('Faltan las credenciales de Firebase en el archivo .env o firebase.js.');
      } else {
        setErrorMsg(`Error al conectar con Google: ${err.message || 'Inténtalo nuevamente'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex flex-col items-center justify-center text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
          >
            ✕
          </button>
          
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center font-black text-slate-950 text-2xl mb-2 shadow-lg shadow-emerald-500/20">
            P
          </div>
          <h2 className="text-xl font-bold">PololoSafe Chile</h2>
          <p className="text-xs text-slate-400">Ingreso seguro a la red comunitaria</p>
        </div>

        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 leading-relaxed">
              ⚠️ {errorMsg}
            </div>
          )}

          {step === 'auth' ? (
            <div className="space-y-4">
              {/* Botón Google Real */}
              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-4 rounded-xl border border-slate-300 shadow-sm transition-all active:scale-98"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoading ? 'Abriendo Google...' : 'Continuar con Google'}</span>
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">o con tu celular</span>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-3">
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-slate-900">
                  <span className="bg-slate-100 px-3 py-3 text-xs font-bold text-slate-700 border-r border-slate-200">
                    🇨🇱 +56
                  </span>
                  <input
                    type="tel"
                    placeholder="9 1234 5678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-3 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  {isLoading ? 'Enviando SMS...' : 'Enviar Código por SMS / WhatsApp'}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setStep('auth')}
                className="flex items-center text-xs font-bold text-slate-500 hover:text-slate-900 mb-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Volver
              </button>

              <div className="text-center space-y-1">
                <h3 className="font-bold text-sm text-slate-900">Ingresa el código de 4 dígitos</h3>
                <p className="text-xs text-slate-500">Enviado al +56 {phoneNumber}</p>
              </div>

              <div className="flex justify-center space-x-2 my-4">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-black bg-slate-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                disabled={isLoading || otpCode.join('').length < 4}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? 'Verificando...' : 'Verificar e Ingresar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
