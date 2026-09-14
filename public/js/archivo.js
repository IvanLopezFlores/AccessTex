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

document.getElementById("botonCargarArchivo").addEventListener("click", () => {
  document.getElementById("cargarArchivo").click();
});

document.getElementById("cargarArchivo").addEventListener("change", (event) => {
  const archivo = event.target.files[0];
  if (!archivo) return;

  if (!archivo.name.endsWith(".tex")) {
    speak(t("archivo_extension_invalida"));
    return;
  }

  const lector = new FileReader();
  lector.onload = function (e) {
    window.editor.setValue(e.target.result);

    // 🔁 Ocultar enlaces de descarga
    document.getElementById("descargarPDF").style.display = "none";
    document.getElementById("descargarTEX").style.display = "none";

    // 🔄 Generar estructura del documento
    generarMenuEstructura();

    // 👇 Enviar foco al editor y anunciar
    setTimeout(() => {
      window.editor.focus();
      speak(t("archivo_cargado", archivo.name));
    }, 50);
  };

  lector.onerror = () => speak(t("archivo_error_lectura"));
  lector.readAsText(archivo, "utf-8");
});
