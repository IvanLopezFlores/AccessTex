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

// js/voz.js

// 🔁 Idioma actual se asume definido en global (viene de i18n.js)
let vocesDisponibles = [];

function cargarVoces() {
  vocesDisponibles = speechSynthesis.getVoices();
}

// 💡 Forzar carga inicial
if (typeof speechSynthesis !== 'undefined') {
  cargarVoces();
  speechSynthesis.onvoiceschanged = cargarVoces;
}

// 🗣️ Leer un mensaje
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = idioma === 'en' ? 'en-US' : 'es-ES';

    const voz = vocesDisponibles.find(v => v.lang === utterance.lang);
    if (voz) utterance.voice = voz;

    speechSynthesis.speak(utterance);
  }
}

// 🗣️ Leer dos mensajes en secuencia
function speakEncadenado(mensajePrincipal, mensajeSecundario) {
  if ('speechSynthesis' in window) {
    const primera = new SpeechSynthesisUtterance(mensajePrincipal);
    primera.lang = idioma === 'en' ? 'en-US' : 'es-ES';

    const voz = vocesDisponibles.find(v => v.lang === primera.lang);
    if (voz) primera.voice = voz;

    if (mensajeSecundario) {
      primera.onend = () => {
        const segunda = new SpeechSynthesisUtterance(mensajeSecundario);
        segunda.lang = primera.lang;
        if (voz) segunda.voice = voz;
        speechSynthesis.speak(segunda);
      };
    }

    speechSynthesis.speak(primera);
  }
}

