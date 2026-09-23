import React from 'react';
import { ShieldCheck, Award, Star } from 'lucide-react';

export function SecurityBadges({ verifiedPhone, rating, reviewsCount, isTopWorker }) {
  const isTop = isTopWorker ?? (rating >= 4.5 && reviewsCount >= 10);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {verifiedPhone && (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
          <ShieldCheck className="h-3.5 w-3.5" />
          Verificado
        </span>
      )}
      
      {isTop && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500">
          <Award className="h-3.5 w-3.5" />
          Top Pololeador
        </span>
      )}

      {(rating !== undefined && rating > 0) && (
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-300">{Number(rating).toFixed(1)}</span>
          <span>({reviewsCount || 0})</span>
        </div>
      )}
    </div>
  );
}

export function UserAvatar({ src, size = 'md', verified, online, fallback = 'U' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };

  const ringClass = verified ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-900' : '';
  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="relative inline-block">
      <div className={`overflow-hidden rounded-full bg-slate-800 ${currentSizeClass} ${ringClass}`}>
        {src ? (
          <img src={src} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
            {fallback}
          </div>
        )}
      </div>
      
      {online && (
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-slate-900 bg-emerald-500" />
      )}
    </div>
  );
}
