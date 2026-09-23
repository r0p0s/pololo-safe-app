import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, ShieldAlert, Star, MessageSquare } from 'lucide-react';

const MOCK_MESSAGES = [
  { id: '1', senderId: 'other', text: 'Hola, ¿aún necesitas ayuda con la gasfitería?', time: '10:30', isRead: true },
  { id: '2', senderId: 'me', text: '¡Hola! Sí, el lavaplatos sigue goteando. ¿Podrías venir hoy?', time: '10:35', isRead: true },
  { id: '3', senderId: 'other', text: 'Claro, puedo ir a las 15:00 hrs. El presupuesto inicial me parece bien.', time: '10:40', isRead: true },
  { id: '4', senderId: 'me', text: 'Perfecto, te espero entonces. Avísame cuando estés cerca.', time: '10:45', isRead: true },
  { id: '5', senderId: 'other', text: 'Dale, nos vemos.', time: '10:46', isRead: false },
];

export default function ChatView({ currentUser, onOpenRating, onOpenReport }) {
  const [activeConversation, setActiveConversation] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        senderId: 'me',
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      }
    ]);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // MOCK DEALS for Inbox
  const MOCK_DEALS = [
    { id: 'c1', otherUser: { id: 'u2', name: 'Carlos Mendoza', isVerified: true }, title: 'Arreglo de lavaplatos', status: 'accepted', lastMessage: 'Dale, nos vemos.', timeAgo: '10:46', unread: true },
    { id: 'c2', otherUser: { id: 'u3', name: 'Ana Silva', isVerified: false }, title: 'Pintura exterior', status: 'pending', lastMessage: '¿Cuál es el metraje aproximado?', timeAgo: 'Ayer', unread: false },
    { id: 'c3', otherUser: { id: 'u4', name: 'Miguel Torres', isVerified: true }, title: 'Instalación eléctrica', status: 'completed', lastMessage: 'Muchas gracias, quedó impecable.', timeAgo: '15 Sep', unread: false }
  ];

  if (!activeConversation) {
    // INBOX MODE
    return (
      <div className="flex flex-col h-full bg-white pb-20">
        <div className="bg-slate-900 pt-12 pb-6 px-6 sticky top-0 z-10 rounded-b-3xl">
          <h1 className="text-2xl font-bold text-white">Mensajes</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_DEALS.map(deal => (
            <div 
              key={deal.id} 
              onClick={() => setActiveConversation(deal)}
              className="flex items-center gap-4 p-4 border-b border-slate-100 active:bg-slate-50 cursor-pointer"
            >
              <div className="relative">
                <img src={`https://i.pravatar.cc/150?u=${deal.otherUser.id}`} alt="Avatar" className="w-14 h-14 rounded-full object-cover bg-slate-200" />
                {deal.unread && (
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-1 truncate">
                    <span className="font-semibold text-slate-900 truncate">{deal.otherUser.name}</span>
                    {deal.otherUser.isVerified && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px] shrink-0">✓</div>
                    )}
                  </div>
                  <span className={`text-xs whitespace-nowrap ml-2 ${deal.unread ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                    {deal.timeAgo}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 font-medium mb-1 truncate">{deal.title}</p>
                <p className={`text-sm truncate ${deal.unread ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                  {deal.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // CHAT MODE
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-3 px-4 flex items-center gap-3 sticky top-0 z-10">
        <button 
          onClick={() => setActiveConversation(null)}
          className="p-2 -ml-2 text-slate-600 active:bg-slate-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <img src={`https://i.pravatar.cc/150?u=${activeConversation.otherUser.id}`} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h2 className="font-bold text-slate-900 truncate">{activeConversation.otherUser.name}</h2>
            {activeConversation.otherUser.isVerified && (
               <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</div>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{activeConversation.title}</p>
        </div>
        <button onClick={() => onOpenReport(activeConversation.otherUser)} className="p-2 text-slate-400 active:text-red-500">
          <ShieldAlert size={20} />
        </button>
      </div>

      {/* Context Action Banner */}
      {activeConversation.status === 'accepted' && (
        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-sm text-blue-800 font-medium">Acuerdo aceptado</span>
          <button className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg active:bg-blue-700">
            Confirmar inicio
          </button>
        </div>
      )}
      {activeConversation.status === 'in_progress' && (
        <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100 flex items-center justify-between">
          <span className="text-sm text-emerald-800 font-medium">Trabajo en curso</span>
          <button className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg active:bg-emerald-700">
            Marcar completado
          </button>
        </div>
      )}
      {activeConversation.status === 'completed' && (
        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <span className="text-sm text-slate-700 font-medium">Trabajo finalizado</span>
          <button 
            onClick={() => onOpenRating(activeConversation.otherUser.name, `https://i.pravatar.cc/150?u=${activeConversation.otherUser.id}`)}
            className="flex items-center gap-1 bg-white border border-slate-300 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg active:bg-slate-50"
          >
            <Star size={14} className="text-amber-500 fill-amber-500" />
            Calificar
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <div className="text-center text-xs text-slate-400 font-medium my-4">Hoy</div>
        {messages.map(msg => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  isMe 
                    ? 'bg-emerald-500 text-white rounded-tr-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 px-1">
                <span className="text-[10px] text-slate-400">{msg.time}</span>
                {isMe && (
                  <CheckCircle2 size={12} className={msg.isRead ? 'text-emerald-500' : 'text-slate-300'} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-3 pb-safe flex items-end gap-2">
        <div className="flex-1 bg-slate-100 rounded-2xl min-h-[44px] flex items-center px-4">
          <input 
            type="text"
            placeholder="Escribe un mensaje..."
            className="w-full bg-transparent border-none focus:outline-none text-sm py-3 text-slate-900 placeholder:text-slate-400"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className="w-11 h-11 bg-emerald-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:bg-slate-300 active:bg-emerald-600 transition-colors shrink-0"
        >
          <Send size={20} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
