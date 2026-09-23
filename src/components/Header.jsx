import React from 'react';
import { Bell } from 'lucide-react';

export default function Header({ onOpenNotifications, onOpenProfile, currentUser, unreadCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-slate-900 px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-500 font-bold text-white">
          P
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold leading-none tracking-tight text-white">
            pololo<span className="text-emerald-400">safe</span>
          </span>
          <span className="text-[10px] font-medium leading-none text-slate-400 mt-0.5">
            Chile
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenNotifications}
          className="relative text-slate-300 hover:text-white"
          aria-label="Notificaciones"
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
        <button onClick={onOpenProfile} className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-slate-800">
          {currentUser?.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-700 text-sm font-semibold text-white">
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
