import React, { useState } from 'react';
import { Shield, Handshake, Phone } from 'lucide-react';

export default function OnboardingView({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Shield,
      title: 'Encuentra pololos cerca de ti',
      subtitle: 'Descubre oportunidades de trabajo de confianza en tu vecindario gracias a nuestro mapa interactivo.',
    },
    {
      icon: Handshake,
      title: 'Acuerdos directos y seguros',
      subtitle: 'Comunícate y acuerda las condiciones directamente con tus vecinos, sin intermediarios ocultos.',
    },
    {
      icon: Phone,
      title: 'Comunidad verificada',
      subtitle: 'Todos los usuarios están verificados por teléfono para mantener una comunidad segura y confiable.',
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 px-6 py-12">
      <div className="flex justify-end">
        <button onClick={onComplete} className="text-sm font-medium text-slate-400 active:text-slate-300">
          Saltar
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-emerald-500/10">
          <CurrentIcon className="h-16 w-16 text-emerald-500" />
        </div>
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-white">
          {slides[currentSlide].title}
        </h1>
        <p className="text-base leading-relaxed text-slate-400">
          {slides[currentSlide].subtitle}
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-emerald-400' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full rounded-xl bg-emerald-500 py-4 text-center text-base font-bold text-white shadow-lg shadow-emerald-500/25 active:bg-emerald-600"
        >
          {currentSlide === slides.length - 1 ? 'Comenzar' : 'Siguiente'}
        </button>
      </div>
    </div>
  );
}
