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

// js/editor.js

let ultimaLineaError = null;
const plantillas = {};

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  window.editor = monaco.editor.create(document.getElementById('monaco-container'), {
    value: '',
    language: 'latex',
    lineNumbers: 'on',
    automaticLayout: true,
    accessibilitySupport: 'on',
    accessibilityHelpUrl: "about:blank",
    theme: 'vs',
    tabSize: 2,
    insertSpaces: true,
    tabFocusMode: true
  });



  // 🔁 Foco inicial para NVDA
  setTimeout(() => {
    document.getElementById('monaco-container').focus();
  }, 100);


// 🧹 Suprimir mensaje automático de accesibilidad de Monaco
setTimeout(() => {
  const liveRegions = document.querySelectorAll('[aria-live]');
  liveRegions.forEach(region => {
    const text = region.textContent.toLowerCase();

    // Detecta mensajes tipo "editor content... accessibility..."
    if (text.startsWith("editor") && text.includes("accessibility")) {
      region.textContent = "Editor listo";
    }
  });
}, 1000); // Esperamos a que Monaco lo genere

// Ctrl + Q global para ir a la línea del error
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "q") {
    e.preventDefault();

    if (ultimaLineaError !== null) {
      window.editor.revealLineInCenter(ultimaLineaError);
      window.editor.setPosition({ lineNumber: ultimaLineaError, column: 1 });
      window.editor.focus();
      speak(t("cursor_linea", ultimaLineaError));
    } else {
      speak(t("no_error"));
    }
  }
});

// Ctrl + Enter global para compilar, solo fuera de Monaco
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    const dentroDeMonaco = document.activeElement.closest(".monaco-editor");

    if (!dentroDeMonaco) {
      e.preventDefault();
      compilarLatex();
    }
  }
});

  // Ctrl + Enter para compilar
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, compilarLatex);

  // Ctrl + Q para saltar a la línea del error
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyQ, () => {
    if (ultimaLineaError !== null) {
      editor.revealLineInCenter(ultimaLineaError);
      editor.setPosition({ lineNumber: ultimaLineaError, column: 1 });
      speak(t("cursor_linea", ultimaLineaError));
    } else {
      speak(t("no_error"));
    }
  });

  // Ctrl + I para decir en qué línea estás
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI, () => {
    const posicion = editor.getPosition();
    speak(t("posicion_linea", posicion.lineNumber));
  });

  // Ctrl + Shift + I para ir al menú de estructura
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyI, () => {
    generarMenuEstructura();
    const menu = document.getElementById("menuEstructura");
    if (menu) {
      menu.focus();
    } else {
      speak(t("menu_estructura_no_encontrado"));
    }
  });

  // Escape para salir del editor
  editor.addCommand(monaco.KeyCode.Escape, () => {
    const siguiente = document.getElementById("compilar");
    if (typeof generarMenuEstructura === "function") {
      generarMenuEstructura();
    }
    if (siguiente) {
      siguiente.focus();
      speak(t("saliste_editor"));
    } else {
      speak(t("boton_salida_no_encontrado"));
    }
  });

  // Mensaje al entrar al editor
  editor.onDidFocusEditorText(() => {
    speak(t("en_editor"));
  });

  // Cargar plantillas al iniciar
  cargarPlantillas();
});

//------ Autoguardado cada 30 segundos
setInterval(() => {
  if (window.editor) {
    const texto = window.editor.getValue();
    fetch("/guardar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto })
    });
  }
}, 30000);
