/*
  AccessTex - Editor LaTeX accesible
  Copyright (C) 2025 José Iván López Flores
  License: GPL-3.0-or-later
*/

const express  = require("express");
const fs       = require("fs");
const { exec } = require("child_process");
const path     = require("path");
const os       = require("os");

const app = express();
app.use(express.json());

// ─── Registro de actividad ────────────────────────────────────
const BASE_DIR = path.join(os.homedir(), "AccessTex");
const COMPILE_DIR = path.join(BASE_DIR, "compilación");
const LOG_PATH = path.join(BASE_DIR, "accesslog_AccessTex.txt");

// Crear directorio base y de compilación si no existen
fs.mkdirSync(COMPILE_DIR, { recursive: true });

// Copiar instrucciones al directorio del usuario
const INSTRUCCIONES_ORIGEN = path.join(__dirname, "INSTRUCCIONES.txt");
const INSTRUCCIONES_DESTINO = path.join(BASE_DIR, "INSTRUCCIONES.txt");

try {
  if (fs.existsSync(INSTRUCCIONES_ORIGEN)) {
    fs.copyFileSync(INSTRUCCIONES_ORIGEN, INSTRUCCIONES_DESTINO);
  }
} catch (e) {
  // Si falla la copia, no se detiene AccessTex
}

// Limpiar el log al iniciar
fs.writeFileSync(LOG_PATH, "", "utf8");

// Función para registrar eventos
function log(msg) {
  fs.appendFileSync(LOG_PATH, `[${new Date().toISOString()}] ${msg}\n`);
}

log(`Directorio de compilación: ${COMPILE_DIR}`);

// Paths de artefactos
const TEX_PATH  = path.join(COMPILE_DIR, "documento.tex");
const PDF_PATH  = path.join(COMPILE_DIR, "documento.pdf");
const LOG_LATEX = path.join(COMPILE_DIR, "documento.log");

// ─── Salud y UI ───────────────────────────────────────────────
app.get("/status", (req, res) => res.send("OK"));

// Archivos de la interfaz de AccessTex
const publicDir = (process.env.NODE_ENV === "development")
  ? path.join(__dirname, "public")
  : path.join(process.resourcesPath, "public");

// Monaco Editor local
const monacoDir = (process.env.NODE_ENV === "development")
  ? path.join(__dirname, "node_modules", "monaco-editor", "min")
  : path.join(process.resourcesPath, "monaco");

// Servir archivos estáticos
app.use(express.static(publicDir));
app.use("/monaco", express.static(monacoDir));

app.get("/", (req, res) => res.sendFile(path.join(publicDir, "index.html")));

// ─── Helpers ──────────────────────────────────────────────────
function limpiarTexto(txt) {
  return txt.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
function limpiarLinea(linea) {
  return linea.replace(/%.*/, "").trim();
}
function calcularScoreCoincidencia(contexto, bloque) {
  const c = limpiarTexto(contexto), b = limpiarTexto(bloque);
  if (!c) return 0;
  if (b.includes(c)) return 1;
  let maxLen = 0;
  for (let i = 0; i < c.length; i++) {
    const sub = c.slice(0, c.length - i);
    if (b.includes(sub)) { maxLen = sub.length; break; }
  }
  return maxLen / c.length;
}

// ─── POST /compilar ───────────────────────────────────────────
app.post("/compilar", (req, res) => {
  const latex = req.body.latex || "";

  // Limpiar previos
  ["documento.tex","documento.pdf","documento.log","documento.aux"].forEach(f => {
    try { fs.unlinkSync(path.join(COMPILE_DIR, f)); } catch {};
  });

  // Guardar TEX
  try {
    fs.writeFileSync(TEX_PATH, latex, "utf8");
    log("TEX guardado");
  } catch (e) {
    log("Error escritura TEX: " + e.message);
    return res.status(500).json({ errores:`Error al escribir TEX: ${e.message}`, linea_num:null, contexto:null, preciso:false });
  }

  // Ejecutar pdflatex
  const cmd = "pdflatex -interaction=nonstopmode -halt-on-error documento.tex";
  log("Ejecutando pdflatex");
  exec(cmd, { cwd: COMPILE_DIR }, (error, stdout, stderr) => {
    // Leer log
    const rawLog = fs.existsSync(LOG_LATEX)
      ? fs.readFileSync(LOG_LATEX, "utf8")
      : stderr || stdout || (error && error.message) || "";
    const logLines   = rawLog.split(/\r?\n/);
    const errorLines = rawLog.match(/^!\s*(.+)$/m) || [];
    const mensajeError = errorLines[0]
      ? errorLines[0].replace(/^!\s*/, "").trim()
      : "Error de LaTeX desconocido";

    if (error || !fs.existsSync(PDF_PATH)) {
      // 1) Extraer snippet l.<n> completo (varias líneas indentadas)
      let contextoCrudo = null;
      let lineaLog      = null;
      for (let i = 0; i < logLines.length; i++) {
        const m = logLines[i].match(/^l\.(\d+)\s+(.*)$/);
        if (m) {
          lineaLog = parseInt(m[1], 10);
          let snippet = m[2].trim();
          let j = i + 1;
          while (j < logLines.length && /^\s+/.test(logLines[j])) {
            snippet += ' ' + logLines[j].trim();
            j++;
          }
          contextoCrudo = snippet;
          break;
        }
      }
      // 2) Override con runaway si existe
      const runawayIdx = logLines.findIndex(l => l.includes("Runaway argument?"));
      if (runawayIdx >= 0 && runawayIdx + 1 < logLines.length) {
        contextoCrudo = logLines[runawayIdx + 1].trim().replace(/\\par\s*/g, "");
      }
      // 3) Si aún no hay contextoCrudo, tomar mensajeError
      if (!contextoCrudo) contextoCrudo = mensajeError;

      // Preparo respuesta
      let linea_num = null;
      let contexto   = contextoCrudo;
      let preciso    = false;

      // 4) Scoring difuso + criterio de posición
      const MIN_LEN = 16, UMBRAL = 0.7;
      if (contextoCrudo.replace(/\s+/g, "").length >= MIN_LEN) {
        const rawLines    = fs.readFileSync(TEX_PATH, "utf8").split(/\r?\n/);
        const contentLines = [], mapIdx = [];
        rawLines.forEach((ln, idx) => {
          const txt = limpiarLinea(ln);
          if (txt) { contentLines.push(txt); mapIdx.push(idx); }
        });
        let mejor = { idx:-1, score:0, pos:Infinity };
        for (let i = 0; i <= contentLines.length - 3; i++) {
          const bloque = contentLines.slice(i, i+3).join(' ');
          const score  = calcularScoreCoincidencia(contextoCrudo, bloque);
          // calcular posición de match
          const bClean = limpiarTexto(bloque), cClean = limpiarTexto(contextoCrudo);
          let pos = bClean.indexOf(cClean);
          if (pos < 0 && score < 1) {
            for (let L = cClean.length-1; L>0; L--) {
              const sub = cClean.slice(0,L);
              pos = bClean.indexOf(sub);
              if (pos>=0) break;
            }
          }
          if (pos < 0) pos = Infinity;
          // desempate: mejor score o mismo score y menor pos
          if (score > mejor.score || (score === mejor.score && pos < mejor.pos)) {
            mejor = { idx:i, score, pos };
          }
        }
        if (mejor.idx !== -1 && mejor.score >= UMBRAL) {
          linea_num = mapIdx[mejor.idx] + 1;
          preciso   = true;
        }
      }

      // 5) Fallback a lineaLog
      if (linea_num === null && typeof lineaLog === 'number') {
        linea_num = lineaLog;
        preciso   = false;
      }

      return res.status(500).json({ errores:mensajeError, linea_num, contexto, preciso });
    }

    // Éxito
    log("pdflatex sin errores");
    res.json({ pdf:true, errores:null, linea_num:null });
  });
});

// ─── Descargas ───────────────────────────────────────────────
app.get("/pdf", (req,res) => res.download(PDF_PATH));
app.get("/documento.tex", (req,res) => res.download(TEX_PATH));

// ─── Guardado automático de documento.tex ─────────────────────
app.post("/guardar", (req, res) => {
  const contenido = req.body.texto;
  fs.writeFile(TEX_PATH, contenido, "utf8", (err) => {
    if (err) {
      log("❌ Error al guardar documento.tex manualmente");
      return res.status(500).send("Error al guardar");
    }
    log("💾 Guardado automático de documento.tex exitoso");
    res.send("Guardado");
  });
});


// ─── Iniciar servidor ────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Servidor en http://localhost:${PORT}`);
  }
  log(`Express escuchando puerto ${PORT}`);
});
