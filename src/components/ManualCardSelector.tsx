import React from 'react';
import { PosicionLectura, CartaEnPosicion } from '../types';
import { LISTA_ARCANOS_MAYORES, LISTA_ARCANOS_MENORES, ARCANOS_MAYORES } from '../data/tarotData';
import { Shuffle, Sparkles, RotateCw, CheckCircle2 } from 'lucide-react';

interface ManualCardSelectorProps {
  posiciones: PosicionLectura[];
  onUpdatePosicion: (posIndex: number, nuevasCartas: CartaEnPosicion[]) => void;
  onRandomizarPosicion: (posIndex: number) => void;
}

export const ManualCardSelector: React.FC<ManualCardSelectorProps> = ({
  posiciones,
  onUpdatePosicion,
  onRandomizarPosicion,
}) => {
  return (
    <div className="bg-[#170f26]/80 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-amber-200 tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Selección y Configuración de Cartas</span>
          </h2>
          <p className="text-xs text-purple-300/80">
            Ajusta los Arcanos Mayores y Menores para cada posición de la tirada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
        {posiciones.map((pos, index) => {
          const mayorActual = pos.cartas.find((c) => c.tipo === 'Mayor');
          const menorActual = pos.cartas.find((c) => c.tipo === 'Menor');

          const nombreMayor = mayorActual?.nombre || 'Ninguno';
          const invMayor = mayorActual?.invertida || false;

          const nombreMenor = menorActual?.nombre || 'Ninguno';
          const invMenor = menorActual?.invertida || false;

          const handleMayorChange = (nuevoNombre: string) => {
            const restantes = pos.cartas.filter((c) => c.tipo !== 'Mayor');
            if (nuevoNombre !== 'Ninguno') {
              restantes.push({
                nombre: nuevoNombre,
                tipo: 'Mayor',
                invertida: invMayor,
              });
            }
            onUpdatePosicion(index, restantes);
          };

          const handleMayorInvertChange = (inv: boolean) => {
            if (nombreMayor === 'Ninguno') return;
            const actualizadas = pos.cartas.map((c) =>
              c.tipo === 'Mayor' ? { ...c, invertida: inv } : c
            );
            onUpdatePosicion(index, actualizadas);
          };

          const handleMenorChange = (nuevoNombre: string) => {
            const restantes = pos.cartas.filter((c) => c.tipo !== 'Menor');
            if (nuevoNombre !== 'Ninguno') {
              restantes.push({
                nombre: nuevoNombre,
                tipo: 'Menor',
                invertida: invMenor,
              });
            }
            onUpdatePosicion(index, restantes);
          };

          const handleMenorInvertChange = (inv: boolean) => {
            if (nombreMenor === 'Ninguno') return;
            const actualizadas = pos.cartas.map((c) =>
              c.tipo === 'Menor' ? { ...c, invertida: inv } : c
            );
            onUpdatePosicion(index, actualizadas);
          };

          return (
            <div
              key={index}
              className="bg-[#1e1332]/70 p-4 rounded-xl border-l-4 border-amber-400 border border-purple-800/40 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-amber-200 text-sm tracking-wide">
                  ✨ {pos.nombrePosicion}
                </h4>
                <button
                  type="button"
                  onClick={() => onRandomizarPosicion(index)}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-purple-900/60 hover:bg-purple-800 border border-purple-600/40 text-purple-200 hover:text-amber-200 transition-colors"
                  title="Elegir carta al azar para esta posición"
                >
                  <Shuffle className="w-3 h-3 text-amber-300" />
                  <span>Al Azar</span>
                </button>
              </div>

              {/* Arcano Mayor selector */}
              <div>
                <label
                  htmlFor={`mayor_${index}`}
                  className="block text-xs font-medium text-purple-300 mb-1"
                >
                  Arcano Mayor:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    id={`mayor_${index}`}
                    value={nombreMayor}
                    onChange={(e) => handleMayorChange(e.target.value)}
                    className="flex-1 bg-[#0f091a] text-purple-100 border border-purple-700/60 rounded-lg px-3 py-2 text-xs focus:border-amber-400 outline-none"
                  >
                    <option value="Ninguno">-- Ninguno --</option>
                    {LISTA_ARCANOS_MAYORES.map((c) => (
                      <option key={c} value={c}>
                        {c} ({ARCANOS_MAYORES[c]?.numeroRomano || '0'})
                      </option>
                    ))}
                  </select>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-purple-300">
                    <input
                      type="checkbox"
                      checked={invMayor}
                      disabled={nombreMayor === 'Ninguno'}
                      onChange={(e) => handleMayorInvertChange(e.target.checked)}
                      className="accent-purple-600 rounded"
                    />
                    <RotateCw className="w-3 h-3 text-purple-400" />
                    <span className="text-[11px]">Invertida</span>
                  </label>
                </div>
              </div>

              {/* Arcano Menor selector */}
              <div>
                <label
                  htmlFor={`menor_${index}`}
                  className="block text-xs font-medium text-purple-300 mb-1"
                >
                  Arcano Menor:
                </label>
                <div className="flex items-center gap-2">
                  <select
                    id={`menor_${index}`}
                    value={nombreMenor}
                    onChange={(e) => handleMenorChange(e.target.value)}
                    className="flex-1 bg-[#0f091a] text-purple-100 border border-purple-700/60 rounded-lg px-3 py-2 text-xs focus:border-amber-400 outline-none"
                  >
                    <option value="Ninguno">-- Ninguno --</option>
                    {LISTA_ARCANOS_MENORES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-purple-300">
                    <input
                      type="checkbox"
                      checked={invMenor}
                      disabled={nombreMenor === 'Ninguno'}
                      onChange={(e) => handleMenorInvertChange(e.target.checked)}
                      className="accent-purple-600 rounded"
                    />
                    <RotateCw className="w-3 h-3 text-purple-400" />
                    <span className="text-[11px]">Invertida</span>
                  </label>
                </div>
              </div>

              {/* Status pill */}
              <div className="text-[10px] text-purple-400/80 flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>
                  {pos.cartas.length > 0
                    ? `Seleccionada: ${pos.cartas.map((c) => c.nombre).join(' + ')}`
                    : 'Sin carta asignada todavía'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
