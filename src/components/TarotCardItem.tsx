import React from 'react';
import { ARCANOS_MAYORES, PALOS_DATA } from '../data/tarotData';
import { CartaEnPosicion } from '../types';
import { Sparkles, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';

interface TarotCardItemProps {
  carta?: CartaEnPosicion;
  posicionNombre: string;
  posicionIndex?: number;
  esInvertida?: boolean;
  onCardClick?: () => void;
  onToggleInvertida?: () => void;
  size?: 'sm' | 'md' | 'lg';
  isRevealed?: boolean;
}

export const TarotCardItem: React.FC<TarotCardItemProps> = ({
  carta,
  posicionNombre,
  onCardClick,
  onToggleInvertida,
  size = 'md',
  isRevealed = true,
}) => {
  const mayorData = carta?.tipo === 'Mayor' ? ARCANOS_MAYORES[carta.nombre] : null;
  const menorPalo = carta?.tipo === 'Menor'
    ? carta.nombre.includes('Bastos') ? 'Bastos'
      : carta.nombre.includes('Copas') ? 'Copas'
      : carta.nombre.includes('Espadas') ? 'Espadas'
      : 'Oros'
    : null;
  const menorData = menorPalo ? PALOS_DATA[menorPalo] : null;

  const isInvertida = carta?.invertida ?? false;

  const dimensions = {
    sm: 'w-24 h-40 text-xs',
    md: 'w-36 h-60 text-sm',
    lg: 'w-48 h-80 text-base',
  }[size];

  if (!carta || carta.nombre === 'Ninguno') {
    return (
      <div
        onClick={onCardClick}
        className={`${dimensions} rounded-xl border-2 border-dashed border-purple-500/40 bg-purple-950/20 hover:bg-purple-900/30 transition-all flex flex-col items-center justify-center p-3 text-center cursor-pointer group shadow-inner relative overflow-hidden`}
      >
        <div className="w-10 h-10 rounded-full border border-purple-400/30 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:border-amber-400/60 transition-transform">
          <Sparkles className="w-5 h-5 text-purple-300 group-hover:text-amber-300 transition-colors" />
        </div>
        <span className="text-[11px] font-serif text-purple-200/80 leading-tight">
          {posicionNombre}
        </span>
        <span className="text-[10px] text-amber-300/70 mt-1 uppercase tracking-wider">
          Toca para elegir
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center select-none">
      <motion.div
        layout
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCardClick}
        className={`relative ${dimensions} rounded-xl cursor-pointer perspective-1000 transition-shadow hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]`}
      >
        {/* Card Body */}
        <div
          className={`w-full h-full rounded-xl p-2.5 flex flex-col justify-between relative overflow-hidden border border-amber-400/50 shadow-2xl transition-transform duration-500 ${
            isInvertida ? 'rotate-180 ring-2 ring-rose-500/50' : ''
          }`}
          style={{
            background: mayorData
              ? `radial-gradient(circle at 50% 20%, #2a164d 0%, #150a29 70%, #0d051c 100%)`
              : `radial-gradient(circle at 50% 20%, #1f1238 0%, #120923 70%, #090412 100%)`,
          }}
        >
          {/* Subtle ornate decorative border inside */}
          <div className="absolute inset-1.5 border border-amber-300/25 rounded-lg pointer-events-none" />
          <div className="absolute inset-2 border border-dashed border-amber-300/20 rounded-md pointer-events-none" />

          {/* Top Info Bar */}
          <div className="flex items-center justify-between z-10 px-1">
            <span className="font-serif font-bold text-amber-300 tracking-wider text-[11px]">
              {mayorData ? mayorData.numeroRomano : menorPalo?.slice(0, 3).toUpperCase()}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-200 border border-amber-400/20 font-serif">
              {carta.tipo}
            </span>
          </div>

          {/* Central Artwork / Symbol */}
          <div className="flex-1 flex flex-col items-center justify-center my-1 z-10 text-center">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.2)] mb-1"
              style={{
                background: 'radial-gradient(circle, rgba(107,33,168,0.5) 0%, rgba(20,10,35,0.8) 100%)',
              }}
            >
              <span className="text-3xl sm:text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {mayorData ? mayorData.icono : menorData?.icono || '🎴'}
              </span>
            </div>

            {/* Element pill */}
            <span className="text-[9px] uppercase tracking-widest text-purple-300/80 mt-1 font-serif">
              {mayorData?.elemento || menorData?.elemento || 'Éter'}
            </span>
          </div>

          {/* Bottom Title Bar */}
          <div className="text-center z-10 bg-black/40 backdrop-blur-xs py-1 px-1 rounded border border-amber-400/20">
            <div className="font-serif font-semibold text-amber-100 text-[11px] sm:text-xs leading-tight line-clamp-2 uppercase tracking-wide">
              {carta.nombre}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Caption & invert controls */}
      <div className="mt-2 text-center flex flex-col items-center gap-1">
        <span className="text-[11px] font-serif text-purple-200 font-medium max-w-[130px] truncate">
          {posicionNombre}
        </span>
        {onToggleInvertida && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleInvertida();
            }}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans transition-colors border ${
              isInvertida
                ? 'bg-rose-950/70 border-rose-500/60 text-rose-300 hover:bg-rose-900/80'
                : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80'
            }`}
            title="Cambiar orientación de la carta"
          >
            <RotateCw className="w-2.5 h-2.5" />
            {isInvertida ? 'Invertida' : 'Al Derecho'}
          </button>
        )}
      </div>
    </div>
  );
};
