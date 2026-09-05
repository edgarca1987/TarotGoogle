import React from 'react';
import { Volume2, VolumeX, History, Sparkles, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHistory: () => void;
  onOpenArcanaGuide: () => void;
  onResetSpread: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenHistory,
  onOpenArcanaGuide,
  onResetSpread,
  savedCount,
}) => {
  return (
    <header className="relative z-10 pt-4 pb-6 px-4 text-center max-w-4xl mx-auto">
      {/* Lunar cycle animation */}
      <div className="flex items-center justify-center gap-2 text-amber-300/80 text-lg sm:text-xl tracking-widest animate-pulse select-none mb-1">
        <span>🌒</span>
        <span>🌓</span>
        <span>🌔</span>
        <span className="text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">🌕</span>
        <span>🌖</span>
        <span>🌗</span>
        <span>🌘</span>
      </div>

      {/* Main Title with mystic glow */}
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-widest uppercase text-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
        Oráculo & Tarot Místico
      </h1>
      <p className="text-purple-300 italic font-serif text-xs sm:text-sm mt-1 tracking-wide">
        Lectura Astral, Sabiduría Hermética e Interpretación de Arcanos
      </p>

      {/* Utility Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        {/* Sound toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 transition-colors shadow-sm"
          title={soundEnabled ? 'Silenciar sonidos del oráculo' : 'Activar campanas místicas'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Campanas: Activas</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-purple-400" />
              <span>Campanas: Mute</span>
            </>
          )}
        </button>

        {/* Arcana Dictionary / Guide */}
        <button
          type="button"
          onClick={onOpenArcanaGuide}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 transition-colors shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Libro de Arcanos</span>
        </button>

        {/* History button */}
        <button
          type="button"
          onClick={onOpenHistory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 transition-colors shadow-sm"
        >
          <History className="w-3.5 h-3.5 text-amber-300" />
          <span>Historial ({savedCount})</span>
        </button>

        {/* Reset button */}
        <button
          type="button"
          onClick={onResetSpread}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/70 border border-purple-500/30 text-purple-200 transition-colors shadow-sm"
          title="Limpiar consulta y reiniciar tirada"
        >
          <RotateCcw className="w-3.5 h-3.5 text-purple-300" />
          <span>Nueva Consulta</span>
        </button>
      </div>
    </header>
  );
};
