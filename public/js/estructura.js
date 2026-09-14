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

// js/estructura.js
// Genera el menú de estructura solo cuando se llama explícitamente

document.getElementById("menuEstructura").addEventListener("change", (event) => {
  const seleccion = event.target.value;
  if (!seleccion) return;

  const posicion = parseInt(seleccion);
  if (!isNaN(posicion)) {
    window.editor.revealLineInCenter(posicion);
    window.editor.setPosition({ lineNumber: posicion, column: 1 });

    setTimeout(() => {
      window.editor.focus();
      const pos = window.editor.getPosition();
      window.editor.setPosition({ lineNumber: pos.lineNumber, column: pos.column });
      speak(t("seccion_seleccionada"));
    }, 20);
  }
});

function generarMenuEstructura() {
  const contenido = window.editor.getValue();
  const lineas = contenido.split("\n");
  const menu = document.getElementById("menuEstructura");
  menu.innerHTML = "";

  const regex = /\\(section|subsection|chapter)\{(.+?)\}/;

  for (let i = 0; i < lineas.length; i++) {
    const match = lineas[i].match(regex);
    if (match) {
      const etiqueta = match[1];
      const nombre = match[2];
      const opcion = document.createElement("option");
      opcion.value = i + 1;
      opcion.textContent = `${etiqueta}: ${nombre}`;
      menu.appendChild(opcion);
    }
  }
}
