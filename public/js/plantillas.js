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

// js/plantillas.js

function cargarPlantillas() {
  fetch("plantillas.txt")
    .then(res => res.text())
    .then(texto => {
      const regex = /^\[([^\]]+)\]\s*\{([\s\S]*?)^\}/gm;
      const select = document.getElementById("plantillaSelect");
      select.innerHTML = "";
      let match;

      while ((match = regex.exec(texto)) !== null) {
        const nombre = match[1].trim();
        const contenido = match[2].trim();
        plantillas[nombre] = contenido;

        const opcion = document.createElement("option");
        opcion.value = nombre;
        opcion.textContent = nombre;
        select.appendChild(opcion);
      }

      // Intentar cargar documento.tex automáticamente si existe
      fetch("documento.tex")
        .then(res => {
          if (!res.ok) throw new Error("No disponible");
          return res.text();
        })
        .then(tex => {
          if (tex.trim() !== "") {
            window.editor.setValue(tex);
            speak(t("archivo_cargado", "documento.tex"));
          } else {
            throw new Error("Vacío");
          }
        })
        .catch(() => {
          const primera = Object.keys(plantillas)[0];
          const doc = `${plantillas[primera]}\n\n\\begin{document}\n\nAquí empieza el contenido.\n\n\\end{document}`;
          window.editor.setValue(doc);
          speak(t("plantilla_cargada"));
        });

      document.getElementById("descargarPDF").style.display = "none";
      document.getElementById("descargarTEX").style.display = "none";
    })
    .catch(err => {
      console.error(err);
      speak(t("plantillas_no_cargadas"));
    });
}

// Cambiar plantilla manualmente
document.getElementById("cambiarPlantilla").addEventListener("click", () => {
  const sel = document.getElementById("plantillaSelect").value;
  const preambulo = plantillas[sel];
  if (!preambulo) {
    speak(t("plantilla_no_encontrada"));
    return;
  }

  const actual = window.editor.getValue();
  const match = actual.match(/\\begin\{document\}([\s\S]*?)\\end\{document\}/);
  const contenido = match ? match[1].trim() : "Aquí empieza el contenido.";
  const nuevo = `${preambulo}\n\n\\begin{document}\n\n${contenido}\n\n\\end{document}`;

  window.editor.setValue(nuevo);
  speak(t("plantilla_aplicada", sel));
});
