import React from 'react';
import { TipoTirada } from '../types';
import { ESQUEMAS_TIRADAS } from '../data/tarotData';
import { HelpCircle, Shuffle, Edit3, Sparkles } from 'lucide-react';

interface ConsultationFormProps {
  pregunta: string;
  setPregunta: (val: string) => void;
  tipoTirada: TipoTirada;
  setTipoTirada: (val: TipoTirada) => void;
  modoSeleccion: 'azar' | 'manual';
  setModoSeleccion: (val: 'azar' | 'manual') => void;
  onBarajarTodas: () => void;
  cargando: boolean;
}

const PREGUNTAS_RAPIDAS = [
  '¿Hacia dónde se dirigen mis energías este mes?',
  '¿Qué obstáculo oculto debo atender?',
  '¿Es propicio avanzar con este proyecto?',
  '¿Cómo puedo sanar y potenciar mi relación?',
  '¿Qué aprendizaje me exige esta encrucijada?',
];

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  pregunta,
  setPregunta,
  tipoTirada,
  setTipoTirada,
  modoSeleccion,
  setModoSeleccion,
  onBarajarTodas,
  cargando,
}) => {
  const esquemaActual = ESQUEMAS_TIRADAS[tipoTirada];

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* 1. Pregunta o Tema */}
      <div className="bg-[#170f26]/80 backdrop-blur-md p-5 rounded-2xl border border-purple-500/30 shadow-xl">
        <label
          htmlFor="preguntaInput"
          className="flex items-center gap-2 text-sm font-semibold text-purple-200 uppercase tracking-wider font-serif mb-2"
        >
          <HelpCircle className="w-4 h-4 text-amber-300" />
          <span>Pregunta o intención de la consulta (Opcional)</span>
        </label>
        <div className="relative">
          <input
            id="preguntaInput"
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Ej: ¿Conseguiré el empleo al que postulé? o ¿Cómo evolucionará este vínculo?"
            className="w-full bg-[#0e071a]/90 text-purple-100 placeholder-purple-400/50 px-4 py-3.5 rounded-xl border border-purple-800/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 outline-none text-sm transition-all shadow-inner"
          />
        </div>

        {/* Suggested Quick Questions */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-purple-300/70 mr-1">Sugerencias:</span>
          {PREGUNTAS_RAPIDAS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPregunta(p)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/20 text-purple-300 hover:text-amber-200 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Selector de Tirada & Modo de Barajado */}
      <div className="bg-[#170f26]/80 backdrop-blur-md p-5 rounded-2xl border border-purple-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label
            htmlFor="tipoTirada"
            className="flex items-center gap-2 text-sm font-semibold text-purple-200 uppercase tracking-wider font-serif"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Selecciona el Arquetipo de la Tirada</span>
          </label>

          {/* Modo toggle: Azar vs Manual */}
          <div className="inline-flex rounded-xl bg-[#0e071a] p-1 border border-purple-700/50 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setModoSeleccion('azar')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${
                modoSeleccion === 'azar'
                  ? 'bg-gradient-to-r from-purple-800 to-indigo-800 text-amber-200 font-semibold shadow-sm'
                  : 'text-purple-300 hover:text-purple-100'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Tirar al Azar</span>
            </button>
            <button
              type="button"
              onClick={() => setModoSeleccion('manual')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif transition-all ${
                modoSeleccion === 'manual'
                  ? 'bg-gradient-to-r from-purple-800 to-indigo-800 text-amber-200 font-semibold shadow-sm'
                  : 'text-purple-300 hover:text-purple-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Selección Manual</span>
            </button>
          </div>
        </div>

        {/* Tiradas grid pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {(Object.keys(ESQUEMAS_TIRADAS) as TipoTirada[]).map((key) => {
            const esquema = ESQUEMAS_TIRADAS[key];
            const isSelected = tipoTirada === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setTipoTirada(key)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex items-start gap-3 ${
                  isSelected
                    ? 'border-amber-400 bg-gradient-to-br from-purple-900/90 to-indigo-950/90 shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/50'
                    : 'border-purple-800/40 bg-purple-950/20 hover:bg-purple-900/30 text-purple-300'
                }`}
              >
                <div className="text-2xl mt-0.5">{esquema.icono}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`font-serif text-sm font-bold truncate ${
                        isSelected ? 'text-amber-200' : 'text-purple-100'
                      }`}
                    >
                      {esquema.nombre}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/60 text-amber-300/90 border border-purple-700/50">
                      {esquema.cantidadCartas} {esquema.cantidadCartas === 1 ? 'carta' : 'cartas'}
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/80 mt-1 line-clamp-2 leading-tight">
                    {esquema.subtitulo}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Description & Barajar button */}
        <div className="pt-2 border-t border-purple-800/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-purple-300/90 italic">
            ✨ {esquemaActual.descripcion}
          </p>

          <button
            type="button"
            disabled={cargando}
            onClick={onBarajarTodas}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-500/50 text-amber-200 text-xs font-serif font-bold uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer disabled:opacity-50"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-300" />
            <span>Barajar y Llenar Tirada ({esquemaActual.cantidadCartas})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
