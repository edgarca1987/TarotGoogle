import React from 'react';
import { PosicionLectura, TipoTirada } from '../types';
import { TarotCardItem } from './TarotCardItem';

interface SpreadBoardProps {
  posiciones: PosicionLectura[];
  tipoTirada: TipoTirada;
  onSelectPosicion: (index: number) => void;
  onToggleInvertida: (posIndex: number, cartaIndex: number) => void;
}

export const SpreadBoard: React.FC<SpreadBoardProps> = ({
  posiciones,
  tipoTirada,
  onSelectPosicion,
  onToggleInvertida,
}) => {
  if (tipoTirada === 'cruz') {
    // Celtic Cross sacred layout
    return (
      <div className="w-full bg-[#120a21]/90 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 shadow-2xl overflow-x-auto">
        <h3 className="text-center font-serif text-amber-200 text-base sm:text-lg tracking-widest uppercase mb-6 flex items-center justify-center gap-2">
          <span>✝️</span>
          <span>Tablero Sagrado: Cruz Celta (11 Arcanos)</span>
        </h3>

        <div className="min-w-[700px] max-w-4xl mx-auto grid grid-cols-12 gap-4 items-center">
          {/* Central Cross Area (Cols 1 to 8) */}
          <div className="col-span-8 grid grid-cols-3 grid-rows-3 gap-3 justify-items-center items-center py-2">
            {/* Top row: Slot 6 (Lo que corona) at col 2 */}
            <div className="col-start-2 row-start-1">
              {posiciones[5] && (
                <TarotCardItem
                  carta={posiciones[5].cartas[0]}
                  posicionNombre={posiciones[5].nombrePosicion}
                  posicionIndex={5}
                  size="sm"
                  onCardClick={() => onSelectPosicion(5)}
                  onToggleInvertida={() => onToggleInvertida(5, 0)}
                />
              )}
            </div>

            {/* Middle row: Slot 5 (Detrás) at col 1 */}
            <div className="col-start-1 row-start-2">
              {posiciones[4] && (
                <TarotCardItem
                  carta={posiciones[4].cartas[0]}
                  posicionNombre={posiciones[4].nombrePosicion}
                  posicionIndex={4}
                  size="sm"
                  onCardClick={() => onSelectPosicion(4)}
                  onToggleInvertida={() => onToggleInvertida(4, 0)}
                />
              )}
            </div>

            {/* Middle row: Slots 1 & 2 (Consultante y Lo que cruza) at col 2 */}
            <div className="col-start-2 row-start-2 flex items-center justify-center relative">
              <div className="z-10">
                {posiciones[0] && (
                  <TarotCardItem
                    carta={posiciones[0].cartas[0]}
                    posicionNombre={posiciones[0].nombrePosicion}
                    posicionIndex={0}
                    size="sm"
                    onCardClick={() => onSelectPosicion(0)}
                    onToggleInvertida={() => onToggleInvertida(0, 0)}
                  />
                )}
              </div>
              {/* Secondary card covering/crossing */}
              {posiciones[1] && (
                <div className="absolute -right-5 -bottom-2 z-20 scale-90 opacity-95">
                  <TarotCardItem
                    carta={posiciones[1].cartas[0]}
                    posicionNombre={posiciones[1].nombrePosicion}
                    posicionIndex={1}
                    size="sm"
                    onCardClick={() => onSelectPosicion(1)}
                    onToggleInvertida={() => onToggleInvertida(1, 0)}
                  />
                </div>
              )}
            </div>

            {/* Middle row: Slot 7 (Delante) at col 3 */}
            <div className="col-start-3 row-start-2">
              {posiciones[6] && (
                <TarotCardItem
                  carta={posiciones[6].cartas[0]}
                  posicionNombre={posiciones[6].nombrePosicion}
                  posicionIndex={6}
                  size="sm"
                  onCardClick={() => onSelectPosicion(6)}
                  onToggleInvertida={() => onToggleInvertida(6, 0)}
                />
              )}
            </div>

            {/* Bottom row: Slot 4 (Debajo / Base) at col 2 */}
            <div className="col-start-2 row-start-3">
              {posiciones[3] && (
                <TarotCardItem
                  carta={posiciones[3].cartas[0]}
                  posicionNombre={posiciones[3].nombrePosicion}
                  posicionIndex={3}
                  size="sm"
                  onCardClick={() => onSelectPosicion(3)}
                  onToggleInvertida={() => onToggleInvertida(3, 0)}
                />
              )}
            </div>
          </div>

          {/* Right Staff Column (Cols 9 to 12): Slots 8, 9, 10, 11 stacked vertically */}
          <div className="col-span-4 border-l border-purple-800/50 pl-4 flex flex-col items-center gap-3">
            <span className="text-[11px] font-serif uppercase tracking-widest text-amber-300/80">
              Báculo del Destino
            </span>
            {[10, 9, 8, 7].map((idx) => {
              const pos = posiciones[idx];
              if (!pos) return null;
              return (
                <div key={idx} className="w-full flex justify-center">
                  <TarotCardItem
                    carta={pos.cartas[0]}
                    posicionNombre={pos.nombrePosicion}
                    posicionIndex={idx}
                    size="sm"
                    onCardClick={() => onSelectPosicion(idx)}
                    onToggleInvertida={() => onToggleInvertida(idx, 0)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Slot 3: Lo que le cruza note */}
        {posiciones[2] && (
          <div className="mt-4 pt-4 border-t border-purple-900/40 text-center">
            <span className="text-xs text-purple-300 font-serif mr-2">
              Fuerza de choque:
            </span>
            <span className="inline-block">
              <TarotCardItem
                carta={posiciones[2].cartas[0]}
                posicionNombre={posiciones[2].nombrePosicion}
                posicionIndex={2}
                size="sm"
                onCardClick={() => onSelectPosicion(2)}
                onToggleInvertida={() => onToggleInvertida(2, 0)}
              />
            </span>
          </div>
        )}
      </div>
    );
  }

  // Linear layout for 1, 3, or 4 cards
  return (
    <div className="w-full bg-[#120a21]/90 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {posiciones.map((pos, idx) => {
          const carta = pos.cartas[0];
          return (
            <div key={idx} className="flex flex-col items-center">
              <TarotCardItem
                carta={carta}
                posicionNombre={pos.nombrePosicion}
                posicionIndex={idx}
                size={tipoTirada === 'sino' || tipoTirada === 'dia' ? 'lg' : 'md'}
                onCardClick={() => onSelectPosicion(idx)}
                onToggleInvertida={() => onToggleInvertida(idx, 0)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
