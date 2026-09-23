import React, { useState } from 'react';
import { X, Camera, Hammer, Truck, Trees, Dog, BookOpen, Monitor, Sparkles, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'Maestro', icon: Hammer },
  { id: 'Transporte', icon: Truck },
  { id: 'Jardinería', icon: Trees },
  { id: 'Mascotas', icon: Dog },
  { id: 'Clases', icon: BookOpen },
  { id: 'Tecnología', icon: Monitor },
  { id: 'Limpieza', icon: Sparkles },
  { id: 'Otro', icon: AlertCircle },
];

const COMUNAS = [
  'Providencia', 'Ñuñoa', 'Las Condes', 'Santiago Centro', 
  'La Reina', 'Macul', 'Vitacura', 'Maipú', 'La Florida', 'Puente Alto'
];

const URGENCIES = ['Urgente', 'Hoy', 'Esta semana', 'Flexible'];

export default function CreatePololoModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [comuna, setComuna] = useState('');
  const [urgency, setUrgency] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      title,
      category,
      description,
      price: parseInt(price, 10),
      comuna,
      urgency
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 bg-white relative z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full">
          <X size={24} />
        </button>
        <h2 className="text-base font-bold text-slate-900 absolute left-1/2 -translate-x-1/2">
          Nuevo Pololo
        </h2>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <form id="create-pololo-form" onSubmit={handleSubmit} className="p-5 space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">¿Qué necesitas?</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Pintar dormitorio de 3x3m"
              className="w-full text-lg font-medium text-slate-900 placeholder:text-slate-300 border-0 border-b-2 border-slate-100 focus:ring-0 focus:border-emerald-500 px-0 py-2 transition-colors bg-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Categoría</label>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center p-3 rounded-xl border text-sm font-medium transition-all ${
                      isSelected 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Icon size={18} className={`mr-2 ${isSelected ? 'text-emerald-500' : 'text-slate-400'}`} />
                    {cat.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Detalles</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el trabajo, herramientas necesarias, etc."
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Price & Comuna */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Pago Ofrecido</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-12 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">CLP</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Comuna</label>
              <select
                required
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 appearance-none"
              >
                <option value="" disabled>Seleccionar...</option>
                {COMUNAS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">¿Para cuándo?</label>
            <div className="flex flex-wrap gap-2">
              {URGENCIES.map(u => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUrgency(u)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                    urgency === u
                      ? u === 'Urgente' 
                        ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20'
                        : 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Fotos (Opcional)</label>
            <button
              type="button"
              className="w-full border-2 border-dashed border-slate-300 rounded-xl py-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 hover:border-slate-400 transition-colors"
            >
              <Camera size={28} className="mb-2 text-slate-400" />
              <span className="text-sm font-medium">Agregar foto del trabajo</span>
            </button>
          </div>

        </form>
      </div>

      {/* Footer with Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-20 pb-8">
        <button
          form="create-pololo-form"
          type="submit"
          className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform"
        >
          Publicar Pololo
        </button>
      </div>
    </div>
  );
}
