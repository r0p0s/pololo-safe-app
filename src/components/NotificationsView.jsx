import React from 'react';
import { Bell, UserCheck, MapPin, Star, CreditCard } from 'lucide-react';

const ICON_MAP = {
  'accepted': { icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  'applicant': { icon: Bell, color: 'text-blue-500', bg: 'bg-blue-100' },
  'nearby': { icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-100' },
  'rating': { icon: Star, color: 'text-purple-500', bg: 'bg-purple-100' },
  'payment': { icon: CreditCard, color: 'text-slate-500', bg: 'bg-slate-100' }
};

export default function NotificationsView({ notifications = [], onTapNotification }) {
  // Mock grouping for demo
  const today = notifications.slice(0, 2);
  const earlier = notifications.slice(2);

  const renderNotification = (item) => {
    const config = ICON_MAP[item.type] || ICON_MAP['applicant'];
    const Icon = config.icon;

    return (
      <div 
        key={item.id} 
        onClick={() => onTapNotification && onTapNotification(item)}
        className={`flex items-start gap-4 p-4 border-b border-slate-100 active:bg-slate-50 ${item.unread ? 'bg-emerald-50/30' : 'bg-white'}`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${config.bg}`}>
          <Icon size={24} className={config.color} />
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-sm text-slate-900 pr-2">{item.title}</h4>
            {item.unread && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0 mt-1"></div>}
          </div>
          <p className="text-xs text-slate-500 leading-snug mb-1.5">{item.body}</p>
          <span className="text-[10px] text-slate-400 font-medium">{item.timeAgo}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white pb-20">
      <div className="bg-slate-900 pt-12 pb-6 px-6 sticky top-0 z-10 rounded-b-3xl shadow-sm">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notificaciones
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">No tienes notificaciones</h3>
            <p className="text-sm text-slate-500">Aquí aparecerán las actualizaciones de tus pololos, mensajes y alertas cercanas.</p>
          </div>
        ) : (
          <div>
            {today.length > 0 && (
              <div>
                <h3 className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Hoy</h3>
                {today.map(renderNotification)}
              </div>
            )}
            {earlier.length > 0 && (
              <div>
                <h3 className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Anteriores</h3>
                {earlier.map(renderNotification)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
