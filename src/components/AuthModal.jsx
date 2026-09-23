import React, { useState } from 'react';
import { Smartphone, ChevronLeft, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState('auth');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 8) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    
    // Auto-focus next input
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
          name: 'Usuario Nuevo',
          phone: `+56 ${phoneNumber}`,
          isVerified: true
        });
      }, 1500);
    }
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'u2',
        name: 'Usuario Google',
        email: 'usuario@gmail.com',
        isVerified: true
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Top Section */}
      <div className="h-[40%] bg-slate-900 flex flex-col items-center justify-center relative px-6 text-center">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-white/70 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
          <ShieldCheck size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">PololoSafe</h1>
        <p className="text-slate-400">Red de trabajo libre en Chile</p>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 px-6 pt-8 pb-6 flex flex-col">
        {step === 'auth' ? (
          <div className="flex flex-col h-full max-w-sm mx-auto w-full">
            <button 
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold mb-6 active:bg-slate-50 disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar con Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm text-slate-400 font-medium">o</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <form onSubmit={handlePhoneSubmit} className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Número de teléfono
              </label>
              <div className="flex gap-2 mb-6">
                <div className="flex items-center justify-center bg-slate-100 border border-slate-200 rounded-xl px-3 py-3.5">
                  <span className="text-xl mr-2">🇨🇱</span>
                  <span className="text-slate-600 font-medium">+56</span>
                </div>
                <input
                  type="tel"
                  placeholder="9 1234 5678"
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-medium text-slate-900"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  maxLength={9}
                />
              </div>

              <button
                type="submit"
                disabled={phoneNumber.length < 8 || isLoading}
                className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:bg-slate-300 active:bg-emerald-600 transition-colors"
              >
                {isLoading ? 'Enviando...' : 'Enviar código'}
              </button>
            </form>

            <p className="text-[10px] text-slate-400 text-center mt-6">
              Al continuar aceptas los Términos de Servicio y Política de Privacidad de PololoSafe.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full max-w-sm mx-auto w-full">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Ingresa el código</h2>
            <p className="text-slate-500 text-sm mb-8">
              Enviamos un SMS de 4 dígitos al <span className="font-semibold text-slate-700">+56 {phoneNumber}</span>
            </p>

            <div className="flex justify-between gap-3 mb-8">
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="tel"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={otpCode.join('').length < 4 || isLoading}
              className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:bg-slate-300 active:bg-emerald-600 transition-colors mb-6"
            >
              {isLoading ? 'Verificando...' : 'Verificar'}
            </button>

            <button 
              onClick={() => setStep('auth')}
              className="text-sm font-medium text-emerald-600 active:text-emerald-700 mx-auto"
            >
              Reenviar código
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
