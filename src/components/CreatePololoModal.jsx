import React, { useState } from 'react';
import { X, MapPin, DollarSign, Lock } from 'lucide-react';

export default function CreatePololoModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Maestro / Reparaciones');
  const [comuna, setComuna] = useState('Providencia');
  const [payment, setPayment] = useState('');
  const [urgency, setUrgency] = useState('Hoy urgente');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !payment) return;

    const comunaCoords = {
      'Providencia': { lat: -33.4262 + (Math.random() - 0.5) * 0.02, lng: -70.6128 + (Math.random() - 0.5) * 0.02 },
      'Ñuñoa': { lat: -33.4569 + (Math.random() - 0.5) * 0.02, lng: -70.5979 + (Math.random() - 0.5) * 0.02 },
      'Las Condes': { lat: -33.4114 + (Math.random() - 0.5) * 0.02, lng: -70.5658 + (Math.random() - 0.5) * 0.02 },
      'Santiago Centro': { lat: -33.4442 + (Math.random() - 0.5) * 0.02, lng: -70.6558 + (Math.random() - 0.5) * 0.02 },
      'La Reina': { lat: -33.4411 + (Math.random() - 0.5) * 0.02, lng: -70.5478 + (Math.random() - 0.5) * 0.02 }
    };

    const coords = comunaCoords[comuna] || comunaCoords['Providencia'];

    const newPololo = {
      id: Date.now().toString(),
      title,
      category,
      comuna,
      lat: coords.lat,
      lng: coords.lng,
      payment: Number(payment),
      urgency,
      description,
      author: {
        name: "Usuario Activo",
        rating: 5.0,
        reviewsCount: 1,
        verifiedRUT: true,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
      },
      createdAt: "Ahora mismo",
      status: "open"
    };

    onCreate(newPololo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Publicar requerimiento de Pololo</h2>
            <p className="text-[11px] text-slate-400">Acuerdo libre entre dos partes en Chile</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Título del trabajo</label>
            <input
              type="text"
              placeholder="Ej: Pintar pared de dormitorio o gasfitería puntual"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-slate-900 font-medium"
              >
                <option>Maestro / Reparaciones</option>
                <option>Transporte & Fletes</option>
                <option>Jardinería & Aseo</option>
                <option>Mascotas</option>
                <option>Clases & Apoyo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Comuna</label>
              <select
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-slate-900 font-medium"
              >
                <option>Providencia</option>
                <option>Ñuñoa</option>
                <option>Las Condes</option>
                <option>Santiago Centro</option>
                <option>La Reina</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Monto Ofrecido (CLP $)</label>
              <input
                type="number"
                placeholder="30000"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Plazo / Urgencia</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs bg-white focus:ring-2 focus:ring-slate-900 font-medium"
              >
                <option>Hoy urgente</option>
                <option>Mañana en la mañana</option>
                <option>Este fin de semana</option>
                <option>Recurrente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Detalles del Pololo</label>
            <textarea
              rows={3}
              placeholder="Describe lo que necesitas realizar de forma clara..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm shadow-lg transition-all"
          >
            Publicar en la Plataforma
          </button>
        </form>
      </div>
    </div>
  );
}
