import React, { useState } from 'react';
import { Send, CheckCheck, Phone, Shield, ArrowLeft } from 'lucide-react';

export default function ChatView({ activeChat, onBack, currentUser }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'them',
      text: '¡Hola! Vi tu publicación para la reparación del lavaplatos en Providencia.',
      time: '10:14 AM'
    },
    {
      id: 2,
      sender: 'them',
      text: 'Tengo herramientas propias y disponibilidad para ir hoy a las 15:00 hrs. ¿Te sirve?',
      time: '10:15 AM'
    },
    {
      id: 3,
      sender: 'me',
      text: '¡Hola Camila! Sí, me sirve perfecto esa hora. ¿El precio de $35.000 incluye el sello de silicona?',
      time: '10:18 AM'
    },
    {
      id: 4,
      sender: 'them',
      text: 'Así es, incluye materiales básicos de sellado. Si aceptamos el acuerdo por acá cerramos el cupo.',
      time: '10:20 AM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [dealAccepted, setDealAccepted] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 h-[calc(100vh-130px)] flex flex-col">
      {/* Header del Chat */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-md mb-3 border border-slate-800">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="text-slate-400 hover:text-white p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
            alt="Camila Silva"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500"
          />
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-white">Camila Silva</h3>
            <span className="text-[10px] text-emerald-400 flex items-center font-semibold">
              ● RUT Verificado • Gasfitería
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!dealAccepted ? (
            <button
              onClick={() => setDealAccepted(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-all shadow-md"
            >
              Confirmar Acuerdo ($35.000)
            </button>
          ) : (
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-xl">
              ✓ Acuerdo Confirmado
            </span>
          )}
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 bg-white rounded-2xl p-4 overflow-y-auto space-y-3 border border-slate-200/80 shadow-inner">
        <div className="text-center my-2">
          <span className="bg-slate-100 text-slate-500 text-[10px] font-medium px-3 py-1 rounded-full border border-slate-200">
            🔒 Chat seguro de negociación directa PololoSafe
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                msg.sender === 'me'
                  ? 'bg-slate-900 text-white rounded-br-xs'
                  : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-xs'
              }`}
            >
              <p>{msg.text}</p>
              <span className={`text-[9px] block text-right mt-1 ${msg.sender === 'me' ? 'text-slate-400' : 'text-slate-400'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {dealAccepted && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-1">
            <h4 className="font-bold text-xs text-emerald-900">¡Acuerdo Bilateral Cerrado!</h4>
            <p className="text-[11px] text-emerald-700">
              Ambas partes han aceptado las condiciones. Al finalizar el trabajo podrás calificar a Camila.
            </p>
          </div>
        )}
      </div>

      {/* Input de envío */}
      <form onSubmit={handleSendMessage} className="mt-3 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none shadow-sm"
        />
        <button
          type="submit"
          className="bg-slate-900 hover:bg-slate-800 text-white p-2.5 rounded-xl transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
