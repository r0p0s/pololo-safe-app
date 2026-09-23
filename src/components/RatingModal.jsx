import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export default function RatingModal({ isOpen, onClose, userName, userAvatar }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  if (!isOpen) return null;

  const TAGS = ['Puntual', 'Buen trabajo', 'Confiable', 'Precio justo', 'Amable', 'Rápido'];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment.trim().length > 0) {
      // Success handling in parent
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal content */}
      <div className="relative bg-white w-full sm:w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Handle bar for mobile */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 sm:hidden"></div>

        <div className="px-6 pt-6 pb-2 text-center relative">
          <button onClick={onClose} className="absolute right-4 top-4 p-2 text-slate-400 bg-slate-100 rounded-full active:bg-slate-200">
            <X size={18} />
          </button>
          
          <img 
            src={userAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'User')}`} 
            alt="Avatar" 
            className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow-sm border border-slate-100"
          />
          <h2 className="text-xl font-bold text-slate-900">Califica a {userName}</h2>
          <p className="text-sm text-slate-500 mt-1">¿Cómo fue tu experiencia trabajando juntos?</p>
        </div>
        
        <div className="px-6 py-4 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Star Rating */}
            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 focus:outline-none transition-transform active:scale-90"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star 
                    size={36} 
                    className={`${(hoverRating || rating) >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} 
                  />
                </button>
              ))}
            </div>

            {/* Quick Tags */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destaca algo positivo</label>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      selectedTags.includes(tag) 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Comentario público</label>
              <textarea 
                className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50 min-h-[120px] resize-none"
                placeholder="Escribe tu opinión sobre el trabajo realizado. Esto ayudará a otros usuarios de la comunidad."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit"
              disabled={rating === 0 || comment.trim().length === 0}
              className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold disabled:opacity-50 disabled:bg-slate-300 active:bg-emerald-600 shadow-lg shadow-emerald-500/20"
            >
              Enviar calificación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
