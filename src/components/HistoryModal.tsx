import React from 'react';
import { X, Trash2, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { LecturaGuardada } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historial: LecturaGuardada[];
  onCargarLectura: (lectura: LecturaGuardada) => void;
  onEliminarLectura: (id: string) => void;
  onLimpiarHistorial: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  historial,
  onCargarLectura,
  onEliminarLectura,
  onLimpiarHistorial,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#150c26] border border-purple-500/40 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-purple-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif font-bold text-amber-200 text-lg uppercase tracking-wider">
              Historial de Tiradas Guardadas ({historial.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-purple-300 hover:text-amber-200 hover:bg-purple-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {historial.length === 0 ? (
            <div className="py-12 text-center text-purple-300/70 font-serif">
              <p className="text-sm">Aún no has guardado ninguna lectura.</p>
              <p className="text-xs mt-1 text-purple-400/60">
                Cuando reveles el oráculo, pulsa el botón &quot;Guardar&quot; para conservarla en tu santuario astral.
              </p>
            </div>
          ) : (
            historial.map((item) => (
              <div
                key={item.id}
                className="bg-[#1c1133] p-4 rounded-xl border border-purple-700/40 hover:border-amber-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-purple-400">
                    <Calendar className="w-3 h-3" />
                    <span>{item.fecha}</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-900 text-amber-300 uppercase text-[9px] font-serif">
                      {item.tipoTirada}
                    </span>
                    {item.veredictoSiNo && (
                      <span className="font-bold text-amber-300">
                        • {item.veredictoSiNo}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif font-semibold text-amber-100 text-sm mt-1 truncate">
                    {item.pregunta || 'Consulta general al Oráculo'}
                  </h4>

                  <p className="text-xs text-purple-300/70 line-clamp-1 mt-0.5">
                    {item.interpretacion.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => onCargarLectura(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-700 text-amber-200 text-xs font-serif transition-colors"
                  >
                    <span>Cargar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEliminarLectura(item.id)}
                    className="p-1.5 rounded-lg text-rose-400/70 hover:text-rose-300 hover:bg-rose-950/50 transition-colors"
                    title="Eliminar lectura"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {historial.length > 0 && (
          <div className="p-4 border-t border-purple-900/50 bg-[#10081f] flex justify-between items-center">
            <span className="text-xs text-purple-400/70">
              Tus consultas se guardan de forma privada en tu navegador.
            </span>
            <button
              type="button"
              onClick={onLimpiarHistorial}
              className="text-xs text-rose-400 hover:text-rose-300 font-serif underline transition-colors"
            >
              Borrar todo el historial
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
