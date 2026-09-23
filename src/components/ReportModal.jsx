import React, { useState } from 'react';
import { ShieldAlert, X, CheckCircle2 } from 'lucide-react';

export default function ReportModal({ isOpen, onClose, reportedUser }) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const REASONS = [
    'No se presentó al trabajo',
    'Comportamiento inapropiado',
    'Perfil falso / Estafa',
    'Cobro diferente al acordado',
    'Otro'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setReason('');
        setDescription('');
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="relative bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-xl flex flex-col max-h-[90vh]">
        {isSubmitted ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Reporte enviado</h3>
            <p className="text-slate-500 text-sm">El equipo de moderación revisará el caso a la brevedad. Gracias por mantener PololoSafe seguro.</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <ShieldAlert size={20} />
                Reportar usuario
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 rounded-full active:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <p className="text-sm text-slate-600 mb-4">
                Estás reportando a <span className="font-bold text-slate-900">{reportedUser?.name}</span>. Esta acción es anónima.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  {REASONS.map((r, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl active:bg-slate-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="reportReason" 
                        value={r}
                        checked={reason === r}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-slate-800 font-medium">{r}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Detalles adicionales (opcional)</label>
                  <textarea 
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 min-h-[100px] resize-none"
                    placeholder="Describe lo sucedido..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={!reason}
                  className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold mt-4 disabled:opacity-50 disabled:bg-slate-300 active:bg-red-600"
                >
                  Enviar reporte
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
