import { DetalleArcanoMayor, Palo, TiradaEsquema, PosicionLectura, TipoTirada, Elemento } from '../types';

export const ARCANOS_MAYORES: Record<string, DetalleArcanoMayor> = {
  "EL LOCO": {
    id: "0",
    nombre: "EL LOCO",
    numeroRomano: "0",
    elemento: "Aire",
    palabrasClave: ["Nuevos comienzos", "Inocencia", "Libertad", "Espontaneidad", "Fe"],
    derecha: "Nuevos comienzos, inocencia, libertad, fe en el futuro y dar un salto de fe guiado por el alma.",
    invertida: "Imprudencia, riesgos innecesarios, descuido, estancamiento por miedo o decisiones precipitadas sin rumbo.",
    simbologia: "El viajero al borde del acantilado, la rosa blanca de la pureza y el perro fiel que alerta de los peligros terrenales.",
    afirmativo: true,
    icono: "☀️",
    color: "#f59e0b"
  },
  "EL MAGO": {
    id: "1",
    nombre: "EL MAGO",
    numeroRomano: "I",
    elemento: "Aire",
    palabrasClave: ["Manifestación", "Voluntad", "Habilidad", "Poder creador", "Conexión cielo-tierra"],
    derecha: "Manifestación, recursos disponibles, fuerza de voluntad, habilidad y poder de acción inmediata.",
    invertida: "Manipulación, engaño, talentos no aprovechados, confusión mental o falta de dirección clara.",
    simbologia: "La mesa con los cuatro palos sagrados (copa, espada, basto, oro) y el lemniscato del infinito sobre su cabeza.",
    afirmativo: true,
    icono: "✨",
    color: "#eab308"
  },
  "LA SUMA SACERDOTISA": {
    id: "2",
    nombre: "LA SUMA SACERDOTISA",
    numeroRomano: "II",
    elemento: "Agua",
    palabrasClave: ["Intuición", "Sabiduría oculta", "Misterio", "Inconsciente", "Paciencia"],
    derecha: "Intuición profunda, sabiduría interior, misterio sagrado, paciencia receptiva y conocimiento oculto.",
    invertida: "Secretos revelados de forma abrupta, desconexión de la voz interior, superficialidad o represión emocional.",
    simbologia: "Las columnas del templo Boaz y Jachin, el velo de granadas y la luna creciente a sus pies.",
    afirmativo: true,
    icono: "🌙",
    color: "#38bdf8"
  },
  "LA EMPERATRIZ": {
    id: "3",
    nombre: "LA EMPERATRIZ",
    numeroRomano: "III",
    elemento: "Tierra",
    palabrasClave: ["Abundancia", "Fertilidad", "Maternidad", "Creatividad", "Amor sensual"],
    derecha: "Abundancia, fertilidad, creatividad desbordante, conexión con la naturaleza, cuidado y nutrición afectiva.",
    invertida: "Bloqueo creativo, dependencia asfixiante, descuido personal, esterilidad de proyectos o sensación de escasez.",
    simbologia: "Corona de doce estrellas, campo de trigo fértil y el cetro del dominio de la vida.",
    afirmativo: true,
    icono: "🌸",
    color: "#10b981"
  },
  "EL EMPERADOR": {
    id: "4",
    nombre: "EL EMPERADOR",
    numeroRomano: "IV",
    elemento: "Fuego",
    palabrasClave: ["Estructura", "Autoridad", "Estabilidad", "Liderazgo", "Disciplina"],
    derecha: "Estructura sólida, autoridad benevolente, estabilidad, disciplina, liderazgo firme y orden terrenal.",
    invertida: "Tiranía, inflexibilidad, falta de disciplina, abuso de poder, rigidez mental o pérdida de control.",
    simbologia: "El trono de piedra con cabezas de carnero marcando la fuerza de Aries y el cetro con forma de cruz egipcia.",
    afirmativo: true,
    icono: "👑",
    color: "#ef4444"
  },
  "EL SUMO SACERDOTE": {
    id: "5",
    nombre: "EL SUMO SACERDOTE",
    numeroRomano: "V",
    elemento: "Tierra",
    palabrasClave: ["Tradición", "Guía espiritual", "Sabiduría moral", "Enseñanza", "Ética"],
    derecha: "Tradición, guía espiritual, aprendizaje formal, instituciones sagradas, valores compartidos y bendición.",
    invertida: "Rebelión contra dogmas obsoletos, ideas poco convencionales, fanatismo, rigidez mental o falsos maestros.",
    simbologia: "La triple cruz papal, los dos acólitos y las llaves cruzadas del reino de los cielos.",
    afirmativo: true,
    icono: "📜",
    color: "#8b5cf6"
  },
  "LOS ENAMORADOS": {
    id: "6",
    nombre: "LOS ENAMORADOS",
    numeroRomano: "VI",
    elemento: "Aire",
    palabrasClave: ["Amor sagrado", "Elección moral", "Armonía", "Valores", "Unión"],
    derecha: "Amor verdadero, armonía de polaridades, relaciones profundas, elecciones éticas y alineación de valores de vida.",
    invertida: "Desarmonía en la pareja, decisiones erróneas guiadas por capricho, conflicto interno de valores o desconexión afectiva.",
    simbologia: "El ángel Rafael bendiciendo al hombre y a la mujer ante el árbol de la vida y el árbol del conocimiento.",
    afirmativo: true,
    icono: "❤️",
    color: "#ec4899"
  },
  "EL CARRO": {
    id: "7",
    nombre: "EL CARRO",
    numeroRomano: "VII",
    elemento: "Agua",
    palabrasClave: ["Determinación", "Triunfo", "Autocontrol", "Avance", "Superación"],
    derecha: "Determinación férrea, victoria garantizada, avance firme hacia el objetivo, autocontrol y superación de obstáculos.",
    invertida: "Falta de control, agresividad desmedida, choque con la realidad, falta de dirección o tropiezos inesperados.",
    simbologia: "El guerrero con armadura guiando dos esfinges que tiran en direcciones opuestas pero domadas por su voluntad.",
    afirmativo: true,
    icono: "🛡️",
    color: "#0284c7"
  },
  "LA JUSTICIA": {
    id: "8",
    nombre: "LA JUSTICIA",
    numeroRomano: "VIII",
    elemento: "Aire",
    palabrasClave: ["Verdad", "Equidad", "Karma", "Responsabilidad", "Claridad"],
    derecha: "Verdad cristalina, equidad, ley de causa y efecto, justicia imparcial y asumir con dignidad la propia responsabilidad.",
    invertida: "Injusticia manifiesta, falta de honestidad, evasión de culpa, juicios sesgados o desequilibrio legal/emocional.",
    simbologia: "La espada de dos filos que discierne la verdad y la balanza de dos platos en equilibrio perfecto.",
    afirmativo: true,
    icono: "⚖️",
    color: "#d97706"
  },
  "EL ERMITAÑO": {
    id: "9",
    nombre: "EL ERMITAÑO",
    numeroRomano: "IX",
    elemento: "Tierra",
    palabrasClave: ["Introspección", "Luz interior", "Búsqueda", "Prudencia", "Retiro"],
    derecha: "Introspección fecunda, búsqueda de la verdad interior, aislamiento constructivo, prudencia y sabiduría madura.",
    invertida: "Aislamiento excesivo, soledad amarga, terquedad, desconexión del mundo o rechazo a la ayuda ofrecida.",
    simbologia: "El anciano en la cumbre nevada alzando la lámpara con la estrella de seis puntas y apoyado en su báculo.",
    afirmativo: false,
    icono: "🕯️",
    color: "#64748b"
  },
  "LA RUEDA DE LA FORTUNA": {
    id: "10",
    nombre: "LA RUEDA DE LA FORTUNA",
    numeroRomano: "X",
    elemento: "Fuego",
    palabrasClave: ["Destino", "Ciclos", "Buena fortuna", "Giros de vida", "Evolución"],
    derecha: "Cambio de ciclo favorable, destino en marcha, buena suerte, karma positivo y giros decisivos que abren puertas.",
    invertida: "Racha difícil temporal, resistencia al cambio ineludible o repetición ciega de patrones kármicos negativos.",
    simbologia: "La rueda cósmica con las cuatro criaturas místicas en las esquinas y la esfinge guardiana en la cúspide.",
    afirmativo: true,
    icono: "☸️",
    color: "#f59e0b"
  },
  "LA FUERZA": {
    id: "11",
    nombre: "LA FUERZA",
    numeroRomano: "XI",
    elemento: "Fuego",
    palabrasClave: ["Coraje", "Compasión", "Fuerza suave", "Paciencia", "Dominio"],
    derecha: "Valentía serena, paciencia inagotable, compasión, autocontrol de los instintos y fuerza emocional suave pero invencible.",
    invertida: "Dudas sobre uno mismo, debilidad emocional, impaciencia destructiva, ira desbordada o baja autoestima.",
    simbologia: "La doncella cerrando suavemente las fauces del león dorado con corona de flores y el símbolo del infinito.",
    afirmativo: true,
    icono: "🦁",
    color: "#ea580c"
  },
  "EL COLGADO": {
    id: "12",
    nombre: "EL COLGADO",
    numeroRomano: "XII",
    elemento: "Agua",
    palabrasClave: ["Pausa", "Cambio de perspectiva", "Entrega", "Soltar", "Iluminación"],
    derecha: "Pausa necesaria y sagrada, cambio radical de perspectiva, rendición ante el flujo superior, soltar el control.",
    invertida: "Resistencia estéril, estancamiento prolongado, postergación innecesaria, papel de víctima o sacrificios inútiles.",
    simbologia: "El iniciado suspendido boca abajo de la cruz en forma de T viva, con el halo dorado de la iluminación en su rostro.",
    afirmativo: false,
    icono: "🌿",
    color: "#0d9488"
  },
  "LA MUERTE": {
    id: "13",
    nombre: "LA MUERTE",
    numeroRomano: "XIII",
    elemento: "Agua",
    palabrasClave: ["Transformación", "Fin de ciclo", "Renovación", "Mudar de piel", "Liberación"],
    derecha: "Transformación profunda y radical, fin irreversible de una etapa vieja, renovación total, despejar el terreno para renacer.",
    invertida: "Resistencia desgastante al cambio, aferrarse a lo caduco, miedo a la transición natural o estancamiento tóxico.",
    simbologia: "El jinete esqueleto en su corcel blanco con el estandarte de la rosa mística y el sol saliendo en el horizonte.",
    afirmativo: false,
    icono: "🌾",
    color: "#475569"
  },
  "TEMPLANZA": {
    id: "14",
    nombre: "TEMPLANZA",
    numeroRomano: "XIV",
    elemento: "Fuego",
    palabrasClave: ["Equilibrio", "Alquimia", "Paciencia", "Sanación", "Moderación"],
    derecha: "Equilibrio armonioso, moderación sabia, paciencia curativa, síntesis de opuestos y sanación progresiva del ser.",
    invertida: "Desequilibrio evidente, excesos nocivos, falta de paciencia, desborde emocional o conflictos internos sin resolver.",
    simbologia: "El ángel alado vertiendo agua de un cáliz a otro en un flujo continuo entre el mundo visible y el invisible.",
    afirmativo: true,
    icono: "🕊️",
    color: "#06b6d4"
  },
  "EL DIABLO": {
    id: "15",
    nombre: "EL DIABLO",
    numeroRomano: "XV",
    elemento: "Tierra",
    palabrasClave: ["Apegos", "Sombra", "Materialismo", "Cadenas ilusorias", "Tentación"],
    derecha: "Apegos materiales o emocionales, enfrentamiento con la sombra inconsciente, cadenas ilusorias y patrones repetitivos.",
    invertida: "Liberación de cadenas, despertar de la ilusión, romper adicciones o hábitos autodestructivos y recuperar el libre albedrío.",
    simbologia: "La figura con cuernos en el altar con dos figuras humanas encadenadas por collares flojos que podrían quitarse fácilmente.",
    afirmativo: false,
    icono: "🔥",
    color: "#b91c1c"
  },
  "LA TORRE": {
    id: "16",
    nombre: "LA TORRE",
    numeroRomano: "XVI",
    elemento: "Fuego",
    palabrasClave: ["Ruptura", "Revelación", "Liberación súbita", "Colapso de falsedad", "Despertar"],
    derecha: "Cambio repentino y demoledor, ruptura de estructuras falsas, desmoronamiento de ilusiones y liberación forzada hacia la verdad.",
    invertida: "Evitación momentánea del desastre, retraso de lo inevitable, miedo a la reconstrucción o crisis interna contenida.",
    simbologia: "El rayo celeste que derriba la corona de la torre de roca edificada sobre cimientos de soberbia humana.",
    afirmativo: false,
    icono: "⚡",
    color: "#dc2626"
  },
  "LA ESTRELLA": {
    id: "17",
    nombre: "LA ESTRELLA",
    numeroRomano: "XVII",
    elemento: "Aire",
    palabrasClave: ["Esperanza", "Fe", "Inspiración", "Claridad cósmica", "Paz"],
    derecha: "Esperanza renovada, fe inquebrantable en el porvenir, inspiración divina, serenidad espiritual y claridad de propósito.",
    invertida: "Desesperanza transitoria, pérdida momentánea de fe, pesimismo, dudas sobre el propio valor o desconexión con la gracia.",
    simbologia: "La doncella desnuda vertiendo las aguas de la vida bajo la gran estrella de ocho puntas y siete estrellas secundarias.",
    afirmativo: true,
    icono: "⭐",
    color: "#3b82f6"
  },
  "LA LUNA": {
    id: "18",
    nombre: "LA LUNA",
    numeroRomano: "XVIII",
    elemento: "Agua",
    palabrasClave: ["Incertidumbre", "Sombras", "Intuición salvaje", "Ilusiones", "Miedos"],
    derecha: "Mundo de las sombras y el subconsciente, sueños vívidos, incertidumbre, ilusiones que confunden y miedos ancestrales.",
    invertida: "Liberación de la niebla mental, superación de engaños o autoengaños, disipación de la ansiedad y claridad emergente.",
    simbologia: "El perro y el lobo aullando a la luna, el cangrejo que emerge del mar primordial y el sendero entre las dos torres.",
    afirmativo: false,
    icono: "🌒",
    color: "#7c3aed"
  },
  "EL SOL": {
    id: "19",
    nombre: "EL SOL",
    numeroRomano: "XIX",
    elemento: "Fuego",
    palabrasClave: ["Éxito", "Vitalidad", "Alegría", "Claridad radiante", "Plenitud"],
    derecha: "Éxito resplandeciente, alegría desbordante, vitalidad física, claridad absoluta, calor humano y bendición visible.",
    invertida: "Tristeza temporal, exceso de optimismo irreal, nube pasajera que ensombrece el éxito o retraso leve en la celebración.",
    simbologia: "El niño coronado de girasoles cabalgando desnudo sobre el caballo blanco bajo el sol radiante.",
    afirmativo: true,
    icono: "🌞",
    color: "#f59e0b"
  },
  "EL JUICIO": {
    id: "20",
    nombre: "EL JUICIO",
    numeroRomano: "XX",
    elemento: "Fuego",
    palabrasClave: ["Renacimiento", "Llamada interior", "Perdón", "Despertar", "Veredicto"],
    derecha: "Renacimiento espiritual, llamada del alma, perdón absoluto del pasado, evaluación trascendental y salto hacia un nuevo nivel.",
    invertida: "Dudas paralizantes, autocrítica destructiva, negarse a escuchar el llamado del destino o aferrarse a culpas añejas.",
    simbologia: "El arcángel Gabriel tocando la trompeta en los cielos y los seres humanos emergiendo transfigurados de sus tumbas de piedra.",
    afirmativo: true,
    icono: "🎺",
    color: "#9333ea"
  },
  "EL MUNDO": {
    id: "21",
    nombre: "EL MUNDO",
    numeroRomano: "XXI",
    elemento: "Tierra",
    palabrasClave: ["Culminación", "Éxito total", "Integración", "Viaje cumplido", "Plenitud"],
    derecha: "Cierre triunfal y glorioso, plenitud total, meta alcanzada, integración armoniosa con el universo y expansión sin fronteras.",
    invertida: "Falta de cierre definitivo, tareas inacabadas, retraso en alcanzar la cima o sensación de vacío a pesar del logro.",
    simbologia: "La figura danzante en el centro de la corona de laurel cósmica, custodiada por los cuatro evangelistas/elementos sagrados.",
    afirmativo: true,
    icono: "🌍",
    color: "#10b981"
  }
};

export const LISTA_ARCANOS_MAYORES: string[] = [
  "EL LOCO", "EL MAGO", "LA SUMA SACERDOTISA", "LA EMPERATRIZ", "EL EMPERADOR",
  "EL SUMO SACERDOTE", "LOS ENAMORADOS", "EL CARRO", "LA JUSTICIA", "EL ERMITAÑO",
  "LA RUEDA DE LA FORTUNA", "LA FUERZA", "EL COLGADO", "LA MUERTE", "TEMPLANZA",
  "EL DIABLO", "LA TORRE", "LA ESTRELLA", "LA LUNA", "EL SOL", "EL JUICIO", "EL MUNDO"
];

export const PALOS_DATA: Record<Palo, { elemento: Elemento; descripcion: string; icono: string; color: string }> = {
  "Bastos": {
    elemento: "Fuego",
    descripcion: "Relacionado con la energía, creatividad, pasión, proyectos laborales, ambición y voluntad de acción.",
    icono: "🪄",
    color: "#f97316"
  },
  "Copas": {
    elemento: "Agua",
    descripcion: "Relacionado con los sentimientos, el amor, las emociones, la intuición, los lazos y las relaciones personales.",
    icono: "🏆",
    color: "#06b6d4"
  },
  "Espadas": {
    elemento: "Aire",
    descripcion: "Relacionado con la mente, los pensamientos, la verdad, los dilemas, la estrategia y las decisiones difíciles.",
    icono: "⚔️",
    color: "#a855f7"
  },
  "Oros": {
    elemento: "Tierra",
    descripcion: "Relacionado con el mundo material, el dinero, el trabajo tangible, la salud del cuerpo y la estabilidad financiera.",
    icono: "🪙",
    color: "#eab308"
  }
};

export const LISTA_ARCANOS_MENORES: string[] = [
  // Bastos
  "Rey de Bastos", "Reina de Bastos", "Caballo de Bastos", "Sota de Bastos", "As de Bastos",
  "Dos de Bastos", "Tres de Bastos", "Cuatro de Bastos", "Cinco de Bastos", "Seis de Bastos",
  "Siete de Bastos", "Ocho de Bastos", "Nueve de Bastos", "Diez de Bastos",
  // Copas
  "Rey de Copas", "Reina de Copas", "Caballo de Copas", "Sota de Copas", "As de Copas",
  "Dos de Copas", "Tres de Copas", "Cuatro de Copas", "Cinco de Copas", "Seis de Copas",
  "Siete de Copas", "Ocho de Copas", "Nueve de Copas", "Diez de Copas",
  // Espadas
  "Rey de Espadas", "Reina de Espadas", "Caballo de Espadas", "Sota de Espadas", "As de Espadas",
  "Dos de Espadas", "Tres de Espadas", "Cuatro de Espadas", "Cinco de Espadas", "Seis de Espadas",
  "Siete de Espadas", "Ocho de Espadas", "Nueve de Espadas", "Diez de Espadas",
  // Oros
  "Rey de Oros", "Reina de Oros", "Caballo de Oros", "Sota de Oros", "As de Oros",
  "Dos de Oros", "Tres de Oros", "Cuatro de Oros", "Cinco de Oros", "Seis de Oros",
  "Siete de Oros", "Ocho de Oros", "Nueve de Oros", "Diez de Oros"
];

export const ESQUEMAS_TIRADAS: Record<TipoTirada, TiradaEsquema> = {
  sino: {
    id: "sino",
    nombre: "Respuesta Sí / No",
    subtitulo: "Consulta directa y veredicto del oráculo (1 carta)",
    cantidadCartas: 1,
    icono: "⚖️",
    descripcion: "Ideal para responder una pregunta concreta sobre si una situación avanzará favorablemente o si existen bloqueos inmediatos.",
    posiciones: [
      { id: 0, nombre: "Respuesta y Situación Actual", descripcion: "Energía dominante y resolución cósmica de la pregunta planteada." }
    ]
  },
  tres: {
    id: "tres",
    nombre: "Pasado, Presente y Futuro",
    subtitulo: "Línea temporal del destino (3 cartas)",
    cantidadCartas: 3,
    icono: "⏳",
    descripcion: "La tirada clásica que desvela la causa en el pasado, el aprendizaje en el presente y el desenlace previsible en el porvenir.",
    posiciones: [
      { id: 0, nombre: "1. El Pasado", descripcion: "Las raíces, aprendizajes y acontecimientos que engendraron la situación actual." },
      { id: 1, nombre: "2. El Presente", descripcion: "El estado de consciencia, influencias actuales y desafíos de este momento exacto." },
      { id: 2, nombre: "3. El Futuro", descripcion: "La tendencia natural y desenlace hacia el cual se dirigen tus pasos si mantienes el rumbo." }
    ]
  },
  cruz: {
    id: "cruz",
    nombre: "Cruz Celta Tradicional",
    subtitulo: "La lectura más profunda y reveladora (11 cartas)",
    cantidadCartas: 11,
    icono: "✝️",
    descripcion: "Análisis integral que explora la esencia del consultante, influencias ocultas, pasado reciente, temores subconscientes y resultado final.",
    posiciones: [
      { id: 0, nombre: "1. Carta del Consultante", descripcion: "Tu estado interior esencial, mentalidad y energía que te define en la consulta." },
      { id: 1, nombre: "2. Lo que le cubre", descripcion: "El ambiente circundante, las fuerzas inmediatas y la atmósfera que te envuelve." },
      { id: 2, nombre: "3. Lo que le cruza", descripcion: "Las fuerzas opuestas, el obstáculo primordial o el reto catalizador de tu crecimiento." },
      { id: 3, nombre: "4. Lo que queda debajo", descripcion: "La base del asunto, raíces subconscientes o causas profundas que no siempre se ven." },
      { id: 4, nombre: "5. Lo que queda detrás", descripcion: "Acontecimientos ya superados, lecciones asimiladas e influencias que van de salida." },
      { id: 5, nombre: "6. Lo que corona", descripcion: "El futuro próximo, ideales que inspiran y metas inmediatas al alcance." },
      { id: 6, nombre: "7. Lo que queda delante", descripcion: "Lo que sucederá, la nueva corriente de acontecimientos que se avecina." },
      { id: 7, nombre: "8. Sus peores temores", descripcion: "Aspectos a vigilar con cautela, dudas internas o trampas del ego a evitar." },
      { id: 8, nombre: "9. Ambiente familiar y social", descripcion: "Cómo te perciben los demás, apoyos externos y la influencia de tu entorno." },
      { id: 9, nombre: "10. Sueños y esperanzas", descripcion: "Tus más puros anhelos íntimos y expectativas espirituales sobre este asunto." },
      { id: 10, nombre: "11. Resultado final", descripcion: "La síntesis y culminación final del camino, el gran veredicto del oráculo." }
    ]
  },
  amor: {
    id: "amor",
    nombre: "Vínculos y Corazón",
    subtitulo: "Dinámica afectiva y sentimientos mutuos (4 cartas)",
    cantidadCartas: 4,
    icono: "❤️",
    descripcion: "Especial para comprender relaciones de pareja, alianzas profundas o lazos con personas significativas.",
    posiciones: [
      { id: 0, nombre: "1. Tu corazón", descripcion: "Tus verdaderos sentimientos, expectativas y estado emocional hacia la otra persona." },
      { id: 1, nombre: "2. El corazón del otro", descripcion: "Lo que esa persona siente, piensa o experimenta interiormente respecto a ti." },
      { id: 2, nombre: "3. El puente o desafío", descripcion: "El punto de encuentro entre ambos o el obstáculo que deben trascender." },
      { id: 3, nombre: "4. Destino de la unión", descripcion: "El porvenir del vínculo si ambos alinean sus voluntades con el amor." }
    ]
  },
  dia: {
    id: "dia",
    nombre: "Arcano y Consejo del Día",
    subtitulo: "Guía diaria para tu jornada (1 carta)",
    cantidadCartas: 1,
    icono: "✨",
    descripcion: "Sintoniza con el arquetipo que regirá tu día para navegar con sabiduría las energías de hoy.",
    posiciones: [
      { id: 0, nombre: "Energía que rige tu jornada", descripcion: "El arquetipo que ilumina tus decisiones, oportunidades y desafíos de hoy." }
    ]
  }
};

/**
 * Motor de interpretación esotérica nativa local
 */
export function generarLecturaLocal(
  lecturas: PosicionLectura[],
  pregunta: string,
  tipo: TipoTirada
): { texto: string; veredicto?: 'SÍ' | 'NO' | 'NEUTRO' } {
  let resultado = "";
  let puntosAfirmativos = 0;
  let puntosNegativos = 0;

  const conteoElementos: Record<Elemento, number> = {
    Fuego: 0,
    Agua: 0,
    Aire: 0,
    Tierra: 0,
  };

  resultado += `🔮 LECTURA DEL ORÁCULO ASTRAL\n`;
  resultado += `────────────────────────────────────────\n\n`;

  if (pregunta) {
    resultado += `❓ Consulta formulada: "${pregunta}"\n`;
  }
  resultado += `📜 Tirada seleccionada: ${ESQUEMAS_TIRADAS[tipo]?.nombre || tipo}\n\n`;

  resultado += `✨ REVELACIÓN DETALLADA DE LAS POSICIONES:\n\n`;

  lecturas.forEach((item) => {
    resultado += `📍 ${item.nombrePosicion.toUpperCase()}\n`;
    if (item.descripcionPosicion) {
      resultado += `   (Enfoque: ${item.descripcionPosicion})\n`;
    }

    item.cartas.forEach((carta) => {
      const estado = carta.invertida ? "Invertida 🔄" : "Al Derecho ✨";
      resultado += `\n   • ${carta.tipo === "Mayor" ? "Arcano Mayor" : "Arcano Menor"}: ${carta.nombre} (${estado})\n`;

      if (carta.tipo === "Mayor") {
        const sig = ARCANOS_MAYORES[carta.nombre];
        if (sig) {
          conteoElementos[sig.elemento]++;
          resultado += `     - Significado: ${carta.invertida ? sig.invertida : sig.derecha}\n`;
          resultado += `     - Arquetipo y Simbolismo: ${sig.simbologia}\n`;
          resultado += `     - Palabras clave: ${sig.palabrasClave.join(", ")}\n`;

          if (!carta.invertida && sig.afirmativo) {
            puntosAfirmativos += 2;
          } else {
            puntosNegativos += 2;
          }
        } else {
          resultado += `     - Fuerza arquetípica manifestándose en tu sendero.\n`;
        }
      } else {
        let palo: Palo = "Bastos";
        if (carta.nombre.includes("Bastos")) palo = "Bastos";
        else if (carta.nombre.includes("Copas")) palo = "Copas";
        else if (carta.nombre.includes("Espadas")) palo = "Espadas";
        else if (carta.nombre.includes("Oros")) palo = "Oros";

        const datosPalo = PALOS_DATA[palo];
        conteoElementos[datosPalo.elemento]++;

        resultado += `     - Dominio del palo (${palo} - Elemento ${datosPalo.elemento}): ${datosPalo.descripcion}\n`;
        resultado += `     - Polaridad: ${
          carta.invertida
            ? "Indica desequilibrio, retraso o energía bloqueada que requiere atención consciente en esta área."
            : "Fluidez constructiva, manifestación armónica y disposición activa para resolver asuntos en este ámbito."
        }\n`;

        if (!carta.invertida) {
          puntosAfirmativos += 1;
        } else {
          puntosNegativos += 1;
        }
      }
    });
    resultado += `\n────────────────────────────────────────\n`;
  });

  // Balance elemental
  const elementoDominante = Object.entries(conteoElementos).sort((a, b) => b[1] - a[1])[0];
  resultado += `\n🌌 BALANCE ELEMENTAL DE LA TIRADA:\n`;
  resultado += `🔥 Fuego: ${conteoElementos.Fuego} | 🌊 Agua: ${conteoElementos.Agua} | 💨 Aire: ${conteoElementos.Aire} | 🌍 Tierra: ${conteoElementos.Tierra}\n`;
  if (elementoDominante && elementoDominante[1] > 0) {
    resultado += `La tirada está notablemente influenciada por la energía de ${elementoDominante[0]}, lo que sugiere que tu mayor clave evolutiva reside en ${
      elementoDominante[0] === 'Fuego' ? 'la pasión, la voluntad creadora y dar el primer paso con valentía.' :
      elementoDominante[0] === 'Agua' ? 'escuchar tus emociones, sanar vínculos y confiar plenamente en tu intuición.' :
      elementoDominante[0] === 'Aire' ? 'la claridad mental, la comunicación asertiva y el desapego reflexivo.' :
      'la paciencia, el orden práctico, el cuidado material y la perseverancia terrenal.'
    }\n\n`;
  }

  resultado += `🌟 SÍNTESIS Y CONSEJO ALQUÍMICO DEL ORÁCULO:\n`;
  resultado += `Las cartas dibujan un mapa vivo de las energías cósmicas en torno a tu pregunta. Recuerda que los arcanos no dictan un destino fatalista, sino que iluminan las corrientes invisibles para que uses tu libre albedrío con sabiduría y poder interior.\n\n`;

  let veredicto: 'SÍ' | 'NO' | 'NEUTRO' | undefined;

  if (tipo === "sino") {
    resultado += `────────────────────────────────────────\n`;
    resultado += `⚖️ VEREDICTO FINAL DEL ORÁCULO (SÍ / NO):\n`;
    resultado += `────────────────────────────────────────\n`;

    const textoPregunta = pregunta ? pregunta.replace(/^[¿?]+|[¿?]+$/g, "").trim() : "tu consulta";

    if (puntosAfirmativos > puntosNegativos) {
      veredicto = 'SÍ';
      resultado += `✅ SÍ, LAS ENERGÍAS SON FAVORABLES.\n`;
      resultado += `Para que se concrete plenamente tu consulta ("${textoPregunta}"), mantén una actitud firme y receptiva. Los arcanos dan su bendición.`;
    } else if (puntosNegativos > puntosAfirmativos) {
      veredicto = 'NO';
      resultado += `❌ NO, EXISTEN BLOQUEOS O RETRASOS TEMPORALES.\n`;
      resultado += `En este momento, para tu consulta ("${textoPregunta}"), se observan resistencias kármicas o advertencias que sugieren replantear tu estrategia antes de forzar el resultado.`;
    } else {
      veredicto = 'NEUTRO';
      resultado += `⏳ EL DESTINO ESTÁ EN TUS MANOS (DEPENDE DE TU VOLUNTAD).\n`;
      resultado += `Las energías se encuentran en una balanza neutra. La respuesta a "${textoPregunta}" no está sellada y dependerá de la claridad y determinación con la que tomes tus próximas decisiones.`;
    }
  }

  return { texto: resultado, veredicto };
}
