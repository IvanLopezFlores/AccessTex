/*
  AccessTex - Editor LaTeX accesible
  Copyright (C) 2025 José Iván López Flores

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

// js/i18n.js

const traducciones = {
    es: {
      // Sistema y feedback
      plantilla_cargada: "Plantilla por defecto cargada.",
      plantillas_no_cargadas: "No se pudo cargar plantillas.txt",
      archivo_cargado: nombre => `Archivo ${nombre} cargado.`,
      compilacion_exitosa: "Compilación exitosa.",
      error_servidor: "Error al comunicarse con el servidor.",
      ir_a_linea_error: "Presiona Control + Q para ir a la línea del error.",
      plantilla_aplicada: nombre => `Plantilla ${nombre} aplicada.`,
      plantilla_no_encontrada: "Plantilla no encontrada.",
      seleccion_idioma: "Idioma cambiado a español.",
      archivo_extension_invalida: "El archivo debe tener extensión .tex",
        archivo_error_lectura: "Error al leer el archivo.",
        contexto: "Contexto",
        no_disponible: "No disponible",
        cursor_linea: num => `Línea ${num}`,
        no_error: "No hay error reciente.",
        posicion_linea: num => `Línea ${num}`,
        en_editor: ".",
        saliste_editor: "Fuera de editor.",
        boton_salida_no_encontrado: "No se encontró el botón de salida.",
        menu_estructura_no_encontrado: "No se encontró el menú de estructura.",
        seccion_seleccionada: "Sección seleccionada.",
        error_en_linea: num => `Error en la línea ${num}`,
        ubicacion_inexacta: "pero puede no ser precisa",
        documento_vacio: "El documento está vacío.",
      // UI visibles
    
      label_compilacion: "Compilación",
      label_preambulos: "Preámbulos",
      label_ir_seccion: "Ir a sección",
      label_cargar: "Cargar archivo",
      label_descargar: "Descargar",
      label_idioma: "Idioma",
      label_errores: "Errores de compilación",
      aria_editor: "Editor LaTeX accesible",
      aria_plantilla: "Seleccionar plantilla",
      aria_seccion: "Ir a una sección",
      aria_idioma: "Seleccionar idioma",

      titulo_app: "AccessTex",
      boton_compilar: "Compilar (Ctrl + Enter)",
      preambulos: "Preámbulos:",
      aplicar_plantilla: "Aplicar plantilla",
      ir_a_seccion: "Ir a sección:",
      cargar_archivo: "📄 Cargar archivo .tex",
      errores_compilacion: "Errores de compilación:",
      descargar_resultados: "Descargar resultados:",
      descargar_pdf: "📥 Descargar PDF",
      descargar_tex: "📄 Descargar .tex",    
      downloading_pdf: "Iniciando descarga del PDF",
      downloading_tex: "Iniciando descarga del TEX"  
    },
  
    en: {
      // System and feedback
      plantilla_cargada: "Default template loaded.",
      plantillas_no_cargadas: "Could not load plantillas.txt",
      archivo_cargado: name => `File ${name} loaded.`,
      compilacion_exitosa: "Compilation successful.",
      error_servidor: "Failed to contact server.",
      ir_a_linea_error: "Press Control + Q to go to the error line.",
      plantilla_aplicada: name => `Template ${name} applied.`,
      plantilla_no_encontrada: "Template not found.",
      seleccion_idioma: "Language switched to English.",
      archivo_extension_invalida: "The file must have a .tex extension",
        archivo_error_lectura: "Error reading the file.",
        contexto: "Context",
        no_disponible: "Not available",
        cursor_linea: num => `Line ${num}`,
       no_error: "No recent error.",
       posicion_linea: num => `Line ${num}`,
       en_editor: ".",
        saliste_editor: "Out of editor.",
        boton_salida_no_encontrado: "Exit button not found.",
       menu_estructura_no_encontrado: "Structure menu not found.",
       seccion_seleccionada: "Selected section.",
       error_en_linea: num => `Error on line ${num}`,
        ubicacion_inexacta: "but may not be accurate",
        documento_vacio: "The document is empty.",
      // UI visibles
      label_compilacion: "Compilation",
      label_preambulos: "Preamble",
      label_ir_seccion: "Go to section",
      label_cargar: "Load file",
      label_descargar: "Download",
      label_idioma: "Language",
      label_errores: "Compilation errors",
      aria_editor: "Accessible LaTeX editor",
      aria_plantilla: "Select template",
      aria_seccion: "Go to a section",
      aria_idioma: "Select language",

      titulo_app: "AccessTex",
      boton_compilar: "Compile (Ctrl + Enter)",
      preambulos: "Preambles:",
      aplicar_plantilla: "Apply template",
      ir_a_seccion: "Go to section:",
      cargar_archivo: "📄 Load .tex file",
      errores_compilacion: "Compilation errors:",
      descargar_resultados: "Download results:",
      descargar_pdf: "📥 Download PDF",
      descargar_tex: "📄 Download .tex",
      downloading_pdf: "Starting PDF download",
      downloading_tex: "Starting TEX download"
    }
  };
  
  let idioma = "es";
  
  function t(clave, ...args) {
    const msg = traducciones[idioma]?.[clave];
    return typeof msg === "function" ? msg(...args) : msg || clave;
  }
  