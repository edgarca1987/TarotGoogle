export type TipoTirada = 'sino' | 'tres' | 'cruz' | 'amor' | 'dia';

export type Palo = 'Bastos' | 'Copas' | 'Espadas' | 'Oros';

export type Elemento = 'Fuego' | 'Agua' | 'Aire' | 'Tierra';

export interface DetalleArcanoMayor {
  id: string;
  nombre: string;
  numeroRomano: string;
  elemento: Elemento;
  palabrasClave: string[];
  derecha: string;
  invertida: string;
  simbologia: string;
  afirmativo: boolean;
  icono: string; // symbol or icon representation
  color: string;
}

export interface DetalleArcanoMenor {
  nombre: string;
  palo: Palo;
  valor: string; // 'As', '2', ..., '10', 'Sota', 'Caballo', 'Reina', 'Rey'
  derecha: string;
  invertida: string;
  elemento: Elemento;
}

export interface CartaEnPosicion {
  nombre: string;
  tipo: 'Mayor' | 'Menor';
  invertida: boolean;
  palo?: Palo;
  numeroRomano?: string;
  revelada?: boolean;
}

export interface PosicionLectura {
  posicionId: number;
  nombrePosicion: string;
  descripcionPosicion: string;
  cartas: CartaEnPosicion[];
}

export interface TiradaEsquema {
  id: TipoTirada;
  nombre: string;
  subtitulo: string;
  cantidadCartas: number;
  icono: string;
  descripcion: string;
  posiciones: {
    id: number;
    nombre: string;
    descripcion: string;
  }[];
}

export interface LecturaGuardada {
  id: string;
  fecha: string;
  timestamp: number;
  pregunta: string;
  tipoTirada: TipoTirada;
  posiciones: PosicionLectura[];
  interpretacion: string;
  fuente: 'gemini' | 'local';
  veredictoSiNo?: 'SÍ' | 'NO' | 'NEUTRO';
}
