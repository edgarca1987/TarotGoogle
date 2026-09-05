import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Healthcheck endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Tarot AI Interpretation endpoint
app.post("/api/interpretar", async (req, res) => {
  try {
    const { pregunta, tipoTirada, lecturasPosiciones, clientApiKey } = req.body;

    if (!lecturasPosiciones || !Array.isArray(lecturasPosiciones) || lecturasPosiciones.length === 0) {
      return res.status(400).json({
        error: "Debes proporcionar al menos una posición con cartas para interpretar.",
      });
    }

    const effectiveApiKey = clientApiKey || process.env.GEMINI_API_KEY;

    if (!effectiveApiKey) {
      return res.status(200).json({
        useFallback: true,
        message: "No hay clave de API de Gemini configurada. Utilizando oráculo esotérico local.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: effectiveApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const resumenCartas = lecturasPosiciones
      .map((item: any) => {
        const desc = (item.cartas || [])
          .map(
            (c: any) =>
              `${c.tipo === "Mayor" ? "Arcano Mayor" : "Arcano Menor"} "${c.nombre}" (${
                c.invertida ? "Invertida / Invertido" : "Al Derecho / Derecha"
              })`
          )
          .join(" y ");
        return `- Posición [${item.posicion}]: ${desc}`;
      })
      .join("\n");

    let instruccionTirada = "";
    if (tipoTirada === "sino") {
      instruccionTirada = `
Esta es una tirada de Respuesta SÍ / NO.
Debes brindar una evaluación de las energías favorables versus las bloqueadas o en desafío.
FINALIZA OBLIGATORIAMENTE con una sección final destacada:
"VEREDICTO FINAL DEL ORÁCULO: [SÍ / NO / DEPENDE DE TU VOLUNTAD]" explicando brevemente el porqué en una sola frase contundente relacionada con la consulta: "${pregunta || "la consulta"}".`;
    } else if (tipoTirada === "cruz") {
      instruccionTirada = `
Esta es la Cruz Celta Tradicional. Integra la dinámica entre el consultante, los obstáculos (lo que cruza), la raíz profunda (lo que está debajo), el pasado superado, el horizonte cercano y la culminación final.`;
    } else if (tipoTirada === "tres") {
      instruccionTirada = `
Esta es la tirada de Pasado, Presente y Futuro. Describe el arco temporal, la causa inicial, el estado actual de consciencia y el destino más probable si las circunstancias actuales continúan.`;
    }

    const prompt = `Actúa como un sabio maestro de tarot y oráculo místico ancestral, con profundo conocimiento de los arquetipos junguianos, la Cábala, la astrología y el simbolismo sagrado de los Arcanos Mayores y Menores.

${pregunta ? `Pregunta o asunto de la consulta del consultante: "${pregunta}"` : "Consulta general de orientación espiritual y destino."}

Configuración de la tirada:
${resumenCartas}
${instruccionTirada}

Estructura tu respuesta en Markdown pulcro, con un tono solemne, empático, místico pero claro y constructivo:
1. **✨ Clima Astral y Esencia General**: Una síntesis atmosférica del mensaje central de los arcanos.
2. **🎴 Revelación de las Posiciones**: Análisis detallado de cada carta en su posición, explicando qué arquetipo despierta, cómo incide su orientación (al derecho o invertida) y el diálogo entre las cartas contiguas.
3. **🔮 Consejo Alquímico del Oráculo**: Orientación práctica y espiritual para el consultante sobre qué actitudes cultivar y qué trampas evitar.
${tipoTirada === "sino" ? "4. **⚖️ Veredicto Final**" : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    const textoGenerado = response.text || "";

    return res.json({
      success: true,
      interpretation: textoGenerado,
      source: "gemini",
    });
  } catch (error: any) {
    console.error("Error al consultar Gemini:", error?.message || error);
    return res.status(200).json({
      useFallback: true,
      error: error?.message || "Error al conectar con la inteligencia artificial.",
    });
  }
});

// Vite dev middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Oráculo & Tarot Místico server corriendo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
