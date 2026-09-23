import React from 'react';
import { Map, Search, PlusCircle, MessageSquare, User } from 'lucide-react';

export default function MobileBottomBar({ activeTab, setActiveTab, onOpenCreateModal, unreadDeals = 0 }) {
  const tabs = [
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'explore', label: 'Explorar', icon: Search },
    { id: 'deals', label: 'Acuerdos', icon: MessageSquare, badge: unreadDeals },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-900 pb-[env(safe-area-inset-bottom,8px)]">
      <div className="flex h-16 items-center justify-around px-2">
        {/* First two tabs */}
        <TabItem
          tab={tabs[0]}
          isActive={activeTab === tabs[0].id}
          onClick={() => setActiveTab(tabs[0].id)}
        />
        <TabItem
          tab={tabs[1]}
          isActive={activeTab === tabs[1].id}
          onClick={() => setActiveTab(tabs[1].id)}
        />

        {/* Center FAB */}
        <div className="relative -mt-5 flex flex-col items-center justify-center">
          <button
            onClick={onOpenCreateModal}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform active:scale-95"
            aria-label="Crear Pololo"
          >
            <PlusCircle className="h-8 w-8" />
          </button>
        </div>

        {/* Last two tabs */}
        <TabItem
          tab={tabs[2]}
          isActive={activeTab === tabs[2].id}
          onClick={() => setActiveTab(tabs[2].id)}
        />
        <TabItem
          tab={tabs[3]}
          isActive={activeTab === tabs[3].id}
          onClick={() => setActiveTab(tabs[3].id)}
        />
      </div>
    </div>
  );
}

function TabItem({ tab, isActive, onClick }) {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 ${
        isActive ? 'text-emerald-400' : 'text-slate-500'
      } min-w-[64px]`}
    >
      <div className="relative">
        <Icon className="h-5 w-5" />
        {tab.badge > 0 && (
          <span className="absolute -right-2 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
            {tab.badge > 99 ? '99+' : tab.badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium">{tab.label}</span>
    </button>
  );
}
