import React, { useState, useEffect } from 'react';
import { TipoTirada, PosicionLectura, CartaEnPosicion, LecturaGuardada } from './types';
import {
  ESQUEMAS_TIRADAS,
  LISTA_ARCANOS_MAYORES,
  LISTA_ARCANOS_MENORES,
  generarLecturaLocal,
} from './data/tarotData';
import { Header } from './components/Header';
import { ConsultationForm } from './components/ConsultationForm';
import { SpreadBoard } from './components/SpreadBoard';
import { ManualCardSelector } from './components/ManualCardSelector';
import { OracleRevelation } from './components/OracleRevelation';
import { ArcanaGuideModal } from './components/ArcanaGuideModal';
import { HistoryModal } from './components/HistoryModal';
import { soundManager } from './utils/soundEffects';
import { Sparkles, Eye } from 'lucide-react';

export default function App() {
  const [pregunta, setPregunta] = useState('');
  const [tipoTirada, setTipoTirada] = useState<TipoTirada>('sino');
  const [modoSeleccion, setModoSeleccion] = useState<'azar' | 'manual'>('azar');
  const [posiciones, setPosiciones] = useState<PosicionLectura[]>([]);
  const [interpretacion, setInterpretacion] = useState('');
  const [fuente, setFuente] = useState<'gemini' | 'local'>('local');
  const [veredictoSiNo, setVeredictoSiNo] = useState<'SÍ' | 'NO' | 'NEUTRO' | undefined>(undefined);
  const [cargando, setCargando] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [historial, setHistorial] = useState<LecturaGuardada[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [showArcanaGuide, setShowArcanaGuide] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load history & sound preference on mount
  useEffect(() => {
    try {
      const guardado = localStorage.getItem('tarot_mistico_historial');
      if (guardado) {
        setHistorial(JSON.parse(guardado));
      }
      const soundPref = localStorage.getItem('tarot_sound_enabled');
      if (soundPref !== null) {
        const enabled = soundPref === 'true';
        setSoundEnabled(enabled);
        soundManager.enabled = enabled;
      }
    } catch {
      // ignore
    }
  }, []);

  // Initialize or update positions when spread type changes
  useEffect(() => {
    const esquema = ESQUEMAS_TIRADAS[tipoTirada];
    if (!esquema) return;

    const iniciales: PosicionLectura[] = esquema.posiciones.map((pos) => ({
      posicionId: pos.id,
      nombrePosicion: pos.nombre,
      descripcionPosicion: pos.descripcion,
      cartas: [],
    }));

    setPosiciones(iniciales);
    setInterpretacion('');
    setVeredictoSiNo(undefined);
    setIsSaved(false);

    // Auto-draw for instant interactive experience if in 'azar' mode
    barajarCartasPara(iniciales, tipoTirada);
  }, [tipoTirada]);

  const toggleSound = () => {
    const nuevo = !soundEnabled;
    setSoundEnabled(nuevo);
    soundManager.enabled = nuevo;
    try {
      localStorage.setItem('tarot_sound_enabled', String(nuevo));
    } catch {
      // ignore
    }
    if (nuevo) {
      soundManager.playChime();
    }
  };

  /**
   * Baraja y asigna cartas a las posiciones indicadas
   */
  const barajarCartasPara = (posicionesActuales: PosicionLectura[], tipo: TipoTirada) => {
    soundManager.playCardFlip();
    const cartasUsadas = new Set<string>();

    const nuevas = posicionesActuales.map((pos) => {
      // 70% chance of Major Arcana, 30% Minor Arcana for rich variety
      const esMayor = Math.random() < 0.75;
      let cartaElegida: CartaEnPosicion;

      if (esMayor) {
        const disponibles = LISTA_ARCANOS_MAYORES.filter((c) => !cartasUsadas.has(c));
        const nombre = disponibles[Math.floor(Math.random() * disponibles.length)] || LISTA_ARCANOS_MAYORES[0];
        cartasUsadas.add(nombre);
        cartaElegida = {
          nombre,
          tipo: 'Mayor',
          invertida: Math.random() < 0.35, // 35% chance of being reversed
        };
      } else {
        const disponibles = LISTA_ARCANOS_MENORES.filter((c) => !cartasUsadas.has(c));
        const nombre = disponibles[Math.floor(Math.random() * disponibles.length)] || LISTA_ARCANOS_MENORES[0];
        cartasUsadas.add(nombre);
        cartaElegida = {
          nombre,
          tipo: 'Menor',
          invertida: Math.random() < 0.3,
        };
      }

      return {
        ...pos,
        cartas: [cartaElegida],
      };
    });

    setPosiciones(nuevas);
  };

  const handleBarajarTodas = () => {
    barajarCartasPara(posiciones, tipoTirada);
  };

  const handleRandomizarPosicion = (index: number) => {
    soundManager.playCardFlip();
    const esMayor = Math.random() < 0.75;
    let cartaElegida: CartaEnPosicion;

    if (esMayor) {
      const nombre = LISTA_ARCANOS_MAYORES[Math.floor(Math.random() * LISTA_ARCANOS_MAYORES.length)];
      cartaElegida = {
        nombre,
        tipo: 'Mayor',
        invertida: Math.random() < 0.35,
      };
    } else {
      const nombre = LISTA_ARCANOS_MENORES[Math.floor(Math.random() * LISTA_ARCANOS_MENORES.length)];
      cartaElegida = {
        nombre,
        tipo: 'Menor',
        invertida: Math.random() < 0.3,
      };
    }

    setPosiciones((prev) =>
      prev.map((p, i) => (i === index ? { ...p, cartas: [cartaElegida] } : p))
    );
  };

  const handleUpdatePosicion = (posIndex: number, nuevasCartas: CartaEnPosicion[]) => {
    setPosiciones((prev) =>
      prev.map((p, i) => (i === posIndex ? { ...p, cartas: nuevasCartas } : p))
    );
  };

  const handleToggleInvertida = (posIndex: number, cartaIndex: number) => {
    soundManager.playCardFlip();
    setPosiciones((prev) =>
      prev.map((pos, pIdx) => {
        if (pIdx !== posIndex) return pos;
        const actualizadas = pos.cartas.map((c, cIdx) =>
          cIdx === cartaIndex ? { ...c, invertida: !c.invertida } : c
        );
        return { ...pos, cartas: actualizadas };
      })
    );
  };

  /**
   * Ejecutar la interpretación de la tirada
   */
  const handleInterpretar = async () => {
    // Si no hay cartas seleccionadas, barajar automáticamente primero
    let posicionesParaInterpretar = posiciones;
    const tieneAlgunaCarta = posiciones.some((p) => p.cartas.length > 0 && p.cartas[0].nombre !== 'Ninguno');

    if (!tieneAlgunaCarta) {
      barajarCartasPara(posiciones, tipoTirada);
      posicionesParaInterpretar = posiciones;
    }

    setCargando(true);
    setIsSaved(false);
    soundManager.playChime();

    // Payload de cartas
    const lecturasFiltradas = posicionesParaInterpretar
      .filter((p) => p.cartas.length > 0 && p.cartas[0].nombre !== 'Ninguno')
      .map((p) => ({
        posicion: p.nombrePosicion,
        cartas: p.cartas,
      }));

    if (lecturasFiltradas.length === 0) {
      alert('Por favor selecciona al menos una carta para realizar la lectura astral.');
      setCargando(false);
      return;
    }

    // Scroll to interpretation area smoothly
    setTimeout(() => {
      const el = document.getElementById('areaRevelacion');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    try {
      // Try server-side Gemini endpoint first
      const res = await fetch('/api/interpretar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pregunta: pregunta.trim(),
          tipoTirada,
          lecturasPosiciones: lecturasFiltradas,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.interpretation) {
          setInterpretacion(data.interpretation);
          setFuente('gemini');

          // Extract Sí/No veredicto if present
          if (tipoTirada === 'sino') {
            const txt = data.interpretation.toUpperCase();
            if (txt.includes('VEREDICTO') && (txt.includes('SÍ') || txt.includes('SI'))) {
              setVeredictoSiNo('SÍ');
            } else if (txt.includes('NO') && txt.includes('BLOQUEO')) {
              setVeredictoSiNo('NO');
            } else {
              setVeredictoSiNo('NEUTRO');
            }
          } else {
            setVeredictoSiNo(undefined);
          }

          soundManager.playOracleRevelation();
          setCargando(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Fallback a oráculo local debido a:', err);
    }

    // Fallback: Motor esotérico local de alta precisión
    const local = generarLecturaLocal(posicionesParaInterpretar, pregunta.trim(), tipoTirada);
    setInterpretacion(local.texto);
    setFuente('local');
    setVeredictoSiNo(local.veredicto);
    soundManager.playOracleRevelation();
    setCargando(false);
  };

  const handleGuardarLectura = () => {
    if (!interpretacion) return;

    const nuevaLectura: LecturaGuardada = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      pregunta: pregunta.trim(),
      tipoTirada,
      posiciones,
      interpretacion,
      fuente,
      veredictoSiNo,
    };

    const actualizado = [nuevaLectura, ...historial.slice(0, 49)];
    setHistorial(actualizado);
    setIsSaved(true);

    try {
      localStorage.setItem('tarot_mistico_historial', JSON.stringify(actualizado));
    } catch {
      // ignore
    }
  };

  const handleCargarLectura = (lectura: LecturaGuardada) => {
    setPregunta(lectura.pregunta);
    setTipoTirada(lectura.tipoTirada);
    setPosiciones(lectura.posiciones);
    setInterpretacion(lectura.interpretacion);
    setFuente(lectura.fuente);
    setVeredictoSiNo(lectura.veredictoSiNo);
    setIsSaved(true);
    setShowHistory(false);
    soundManager.playChime();
  };

  const handleEliminarLectura = (id: string) => {
    const filtrado = historial.filter((item) => item.id !== id);
    setHistorial(filtrado);
    try {
      localStorage.setItem('tarot_mistico_historial', JSON.stringify(filtrado));
    } catch {
      // ignore
    }
  };

  const handleLimpiarHistorial = () => {
    if (window.confirm('¿Deseas vaciar todo el historial de lecturas guardadas?')) {
      setHistorial([]);
      try {
        localStorage.removeItem('tarot_mistico_historial');
      } catch {
        // ignore
      }
    }
  };

  const handleResetSpread = () => {
    setPregunta('');
    setInterpretacion('');
    setVeredictoSiNo(undefined);
    setIsSaved(false);
    const esquema = ESQUEMAS_TIRADAS[tipoTirada];
    if (esquema) {
      const iniciales: PosicionLectura[] = esquema.posiciones.map((pos) => ({
        posicionId: pos.id,
        nombrePosicion: pos.nombre,
        descripcionPosicion: pos.descripcion,
        cartas: [],
      }));
      setPosiciones(iniciales);
      barajarCartasPara(iniciales, tipoTirada);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0517] text-[#f3e8ff] font-sans pb-24 relative overflow-x-hidden">
      {/* Background Starfield & Nebula Canvas */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(107,33,168,0.3) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(76,29,149,0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(139,92,246,0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-2 space-y-6">
        {/* Header */}
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onOpenHistory={() => setShowHistory(true)}
          onOpenArcanaGuide={() => setShowArcanaGuide(true)}
          onResetSpread={handleResetSpread}
          savedCount={historial.length}
        />

        {/* 1. Formulario de Consulta & Arquetipo */}
        <ConsultationForm
          pregunta={pregunta}
          setPregunta={setPregunta}
          tipoTirada={tipoTirada}
          setTipoTirada={setTipoTirada}
          modoSeleccion={modoSeleccion}
          setModoSeleccion={setModoSeleccion}
          onBarajarTodas={handleBarajarTodas}
          cargando={cargando}
        />

        {/* 2. Modo Tablero Sagrado vs Selector Manual */}
        {modoSeleccion === 'azar' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-serif uppercase tracking-widest text-amber-300/90 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Tablero de las Cartas ({posiciones.length} Posiciones)</span>
              </span>
              <span className="text-[11px] text-purple-300/70 italic">
                Toca cualquier carta o el botón de orientación para invertirla
              </span>
            </div>
            <SpreadBoard
              posiciones={posiciones}
              tipoTirada={tipoTirada}
              onSelectPosicion={(idx) => handleRandomizarPosicion(idx)}
              onToggleInvertida={handleToggleInvertida}
            />
          </div>
        ) : (
          <ManualCardSelector
            posiciones={posiciones}
            onUpdatePosicion={handleUpdatePosicion}
            onRandomizarPosicion={handleRandomizarPosicion}
          />
        )}

        {/* Action Button: REVELAR ORÁCULO */}
        <div className="pt-2">
          <button
            type="button"
            id="btnInterpretar"
            disabled={cargando}
            onClick={handleInterpretar}
            className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 hover:from-purple-800 hover:via-indigo-800 hover:to-purple-900 border-2 border-amber-400/80 text-amber-200 font-serif font-black text-base sm:text-lg tracking-widest uppercase shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <span>{cargando ? 'Consultando los Astros...' : '✨ Revelar Oráculo Astral ✨'}</span>
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
          </button>
        </div>

        {/* 3. Área de Revelación del Oráculo */}
        <div id="areaRevelacion" className="pt-4">
          <OracleRevelation
            interpretacion={interpretacion}
            fuente={fuente}
            veredictoSiNo={veredictoSiNo}
            cargando={cargando}
            onSaveReading={handleGuardarLectura}
            isSaved={isSaved}
          />
        </div>
      </div>

      {/* Modals */}
      <ArcanaGuideModal
        isOpen={showArcanaGuide}
        onClose={() => setShowArcanaGuide(false)}
      />

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        historial={historial}
        onCargarLectura={handleCargarLectura}
        onEliminarLectura={handleEliminarLectura}
        onLimpiarHistorial={handleLimpiarHistorial}
      />
    </div>
  );
}
