import React, { useState } from 'react';
import { X, Search, Sparkles, BookOpen } from 'lucide-react';
import { ARCANOS_MAYORES, PALOS_DATA } from '../data/tarotData';

interface ArcanaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArcanaGuideModal: React.FC<ArcanaGuideModalProps> = ({ isOpen, onClose }) => {
  const [busqueda, setBusqueda] = useState('');
  const [tabActiva, setTabActiva] = useState<'mayores' | 'palos'>('mayores');

  if (!isOpen) return null;

  const arcanosFiltrados = Object.values(ARCANOS_MAYORES).filter((a) =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.palabrasClave.some((k) => k.toLowerCase().includes(busqueda.toLowerCase())) ||
    a.elemento.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#150c26] border border-purple-500/40 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-purple-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <h3 className="font-serif font-bold text-amber-200 text-lg uppercase tracking-wider">
              Libro Sagrado de los Arcanos
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

        {/* Tabs & Search */}
        <div className="p-4 bg-[#10081f] border-b border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex rounded-lg bg-[#0a0414] p-1 border border-purple-800/40 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setTabActiva('mayores')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-serif transition-colors ${
                tabActiva === 'mayores'
                  ? 'bg-purple-800 text-amber-200 font-bold'
                  : 'text-purple-300 hover:text-purple-100'
              }`}
            >
              22 Arcanos Mayores
            </button>
            <button
              type="button"
              onClick={() => setTabActiva('palos')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-serif transition-colors ${
                tabActiva === 'palos'
                  ? 'bg-purple-800 text-amber-200 font-bold'
                  : 'text-purple-300 hover:text-purple-100'
              }`}
            >
              Los 4 Palos Sagrados
            </button>
          </div>

          {tabActiva === 'mayores' && (
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre o palabra..."
                className="w-full bg-[#1b1030] text-purple-100 text-xs pl-9 pr-3 py-2 rounded-lg border border-purple-700/50 outline-none focus:border-amber-400"
              />
            </div>
          )}
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {tabActiva === 'mayores' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {arcanosFiltrados.map((arcano) => (
                <div
                  key={arcano.id}
                  className="bg-[#1b1030]/70 p-4 rounded-xl border border-purple-700/40 space-y-2 hover:border-amber-400/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{arcano.icono}</span>
                      <div>
                        <h4 className="font-serif font-bold text-amber-200 text-sm">
                          {arcano.nombre} ({arcano.numeroRomano})
                        </h4>
                        <span className="text-[10px] text-purple-300/80 uppercase tracking-wider font-serif">
                          Elemento {arcano.elemento}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {arcano.palabrasClave.map((k, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-800/60"
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs space-y-1 pt-1 border-t border-purple-900/40">
                    <p className="text-emerald-300">
                      <strong className="text-emerald-400 font-serif">Al Derecho:</strong> {arcano.derecha}
                    </p>
                    <p className="text-rose-300">
                      <strong className="text-rose-400 font-serif">Invertida:</strong> {arcano.invertida}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(PALOS_DATA).map(([palo, datos]) => (
                <div
                  key={palo}
                  className="bg-[#1b1030]/70 p-5 rounded-xl border border-purple-700/40 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{datos.icono}</span>
                    <div>
                      <h4 className="font-serif font-bold text-amber-200 text-base">
                        Palo de {palo}
                      </h4>
                      <span className="text-xs text-purple-300 font-serif">
                        Elemento {datos.elemento}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed pt-2 border-t border-purple-900/40">
                    {datos.descripcion}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
