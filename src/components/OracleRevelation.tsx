import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Volume2, VolumeX, Bookmark, Share2, Award } from 'lucide-react';

interface OracleRevelationProps {
  interpretacion: string;
  fuente: 'gemini' | 'local';
  veredictoSiNo?: 'SÍ' | 'NO' | 'NEUTRO';
  cargando: boolean;
  onSaveReading: () => void;
  isSaved: boolean;
}

export const OracleRevelation: React.FC<OracleRevelationProps> = ({
  interpretacion,
  fuente,
  veredictoSiNo,
  cargando,
  onSaveReading,
  isSaved,
}) => {
  const [copiado, setCopiado] = useState(false);
  const [hablando, setHablando] = useState(false);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopiar = async () => {
    if (!interpretacion) return;
    try {
      await navigator.clipboard.writeText(interpretacion);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleVozOraculo = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Tu navegador no soporta síntesis de voz.');
      return;
    }

    if (hablando) {
      window.speechSynthesis.cancel();
      setHablando(false);
      return;
    }

    // Clean text for speech
    const textoLimpio = interpretacion
      .replace(/[#*`_~]/g, '')
      .replace(/[\n\r]+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(textoLimpio);
    utterance.lang = 'es-ES';
    utterance.rate = 0.92;
    utterance.pitch = 0.95;

    // Try finding a Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((v) => v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onend = () => setHablando(false);
    utterance.onerror = () => setHablando(false);

    window.speechSynthesis.speak(utterance);
    setHablando(true);
  };

  const handleCompartir = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Lectura de Tarot Místico',
          text: interpretacion.slice(0, 500) + '...',
        });
      } catch {
        // cancelled
      }
    } else {
      handleCopiar();
    }
  };

  return (
    <div className="bg-[#170f26]/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-purple-500/40 shadow-2xl space-y-5 relative overflow-hidden">
      {/* Mystic top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/50 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-amber-200 text-lg tracking-wider">
              Revelación del Oráculo Sagrado
            </h3>
            <span className="text-[11px] text-purple-300/80 flex items-center gap-1.5 font-serif">
              <Award className="w-3 h-3 text-amber-400" />
              {fuente === 'gemini'
                ? 'Canalización Cósmica con Inteligencia Artificial Gemini'
                : 'Sabiduría Hermética y Base Esotérica Ancestral'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Read Aloud */}
          <button
            type="button"
            onClick={handleVozOraculo}
            disabled={!interpretacion || cargando}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-serif transition-colors ${
              hablando
                ? 'bg-amber-400 text-purple-950 border-amber-300 font-bold'
                : 'bg-purple-900/60 hover:bg-purple-800 border-purple-700/50 text-purple-200'
            }`}
            title="Escuchar interpretación en voz alta"
          >
            {hablando ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
            <span>{hablando ? 'Detener Voz' : 'Voz del Oráculo'}</span>
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopiar}
            disabled={!interpretacion || cargando}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 text-purple-200 text-xs font-serif transition-colors"
            title="Copiar lectura al portapapeles"
          >
            {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
            <span>{copiado ? 'Copiado' : 'Copiar'}</span>
          </button>

          {/* Save to History */}
          <button
            type="button"
            onClick={onSaveReading}
            disabled={!interpretacion || cargando || isSaved}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-serif transition-colors ${
              isSaved
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                : 'bg-purple-900/60 hover:bg-purple-800 border-purple-700/50 text-purple-200'
            }`}
            title="Guardar tirada en tu historial"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-300" />
            <span>{isSaved ? 'Guardada' : 'Guardar'}</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleCompartir}
            disabled={!interpretacion || cargando}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 text-purple-200 text-xs transition-colors"
            title="Compartir lectura"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Veredicto badge if present */}
      {veredictoSiNo && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 ${
            veredictoSiNo === 'SÍ'
              ? 'bg-emerald-950/60 border-emerald-400/60 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
              : veredictoSiNo === 'NO'
              ? 'bg-rose-950/60 border-rose-400/60 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              : 'bg-amber-950/60 border-amber-400/60 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
          }`}
        >
          <span className="text-2xl">
            {veredictoSiNo === 'SÍ' ? '✨' : veredictoSiNo === 'NO' ? '🌑' : '⏳'}
          </span>
          <div>
            <div className="font-serif font-bold text-sm sm:text-base uppercase tracking-wider">
              Veredicto del Oráculo: {veredictoSiNo}
            </div>
            <p className="text-xs opacity-90 font-sans">
              {veredictoSiNo === 'SÍ'
                ? 'Las corrientes astrales se alinean favorablemente para tu consulta.'
                : veredictoSiNo === 'NO'
                ? 'Se detectan interferencias kármicas o advertencias que sugieren cautela.'
                : 'El destino permanece abierto; tu voluntad y discernimiento definirán la balanza.'}
            </p>
          </div>
        </div>
      )}

      {/* Interpretation Text Area */}
      <div className="relative">
        <textarea
          id="cuadroInterpretacion"
          rows={16}
          readOnly
          value={interpretacion}
          placeholder="Formula tu pregunta y pulsa 'Revelar Oráculo' para desvelar el designio de las cartas..."
          className="w-full bg-[#0c0617]/90 text-purple-100 font-sans leading-relaxed p-5 rounded-xl border border-purple-800/80 focus:border-amber-400/80 outline-none resize-y text-sm sm:text-base shadow-inner selection:bg-purple-600 selection:text-amber-200"
        />
        {cargando && (
          <div className="absolute inset-0 bg-[#0b0517]/80 backdrop-blur-xs rounded-xl flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
            <span className="font-serif text-amber-200 text-sm tracking-wider animate-pulse">
              Consultando con los arcanos y las estrellas... 🔮
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
