# AccessTex

## Language navigation

[English version](#english) | [Versión en español](#espanol)

The Spanish version of this document is available further down this page.  
La versión en español de este documento se encuentra más adelante en esta misma página.

---

<a id="english"></a>

## English

**AccessTex** is an accessible LaTeX editor and compiler designed to support users with visual disabilities, particularly users of screen readers.

The project aims to make LaTeX document creation, navigation, compilation, and error correction more accessible through keyboard navigation, screen-reader-compatible controls, auditory feedback, and accessible interpretation of LaTeX compilation errors.

### Main features

- Accessible LaTeX editor based on Monaco Editor.
- Screen-reader support and ARIA labels.
- Keyboard-centered navigation.
- Document structure navigation through sections, subsections, and chapters.
- Accessible LaTeX compilation.
- Detection and interpretation of common LaTeX compilation errors.
- Identification of the probable error line.
- Keyboard shortcut to move directly to the detected error.
- Auditory feedback using speech synthesis.
- Loading and downloading of `.tex` files.
- PDF generation and download.
- Custom LaTeX preambles/templates.
- Spanish and English interface.

### Keyboard shortcuts

| Shortcut | Function |
|---|---|
| `Ctrl + Enter` | Compile the LaTeX document |
| `Ctrl + Q` | Go to the detected error line |
| `Ctrl + I` | Announce the current line |
| `Ctrl + Shift + I` | Open the document structure navigation menu |
| `Esc` | Leave the editor and move focus to the controls |

### Error feedback

When LaTeX compilation fails, AccessTex analyzes the compiler log and presents:

- a simplified description of the error;
- the probable line where the error occurred;
- contextual information extracted from the LaTeX log;
- an indication when the reported location may not be exact.

The user can press `Ctrl + Q` to move directly to the detected line.

### Technology

AccessTex is built with:

- Electron
- Node.js
- Express
- Monaco Editor
- pdfLaTeX
- Web Speech API

### Requirements

To run the source version of AccessTex, the system requires:

- Node.js
- npm
- a LaTeX distribution providing `pdflatex`

The project has primarily been developed and tested on Windows.

### Installation

A Windows installer is available through the **Releases** section of this repository.

For development:

```bash
npm install
npm start
```

### Accessibility

Accessibility is a central design requirement of AccessTex rather than an additional interface feature.

The current version includes:

- screen-reader-oriented labels and controls;
- keyboard-based interaction;
- focus management;
- document structure navigation;
- auditory feedback;
- accessible presentation of compilation errors;
- direct keyboard navigation to the probable error line.

AccessTex is being developed with particular attention to users who work with screen readers such as NVDA.

### Languages

The interface currently supports:

- Spanish
- English

### License

AccessTex is free software distributed under the **GNU General Public License v3.0 or later (GPL-3.0-or-later)**.

See the `LICENSE` file for the full license text.

### Author

**José Iván López Flores**

Universidad Autónoma de Zacatecas (UAZ), Mexico.

### Project status

AccessTex is currently under active development and evaluation.

The project is being refined through technical testing and accessibility-oriented evaluation. Future versions may include improvements to compilation-error localization, broader validation with LaTeX error cases, and additional accessibility features.

Feedback, accessibility testing, bug reports, and contributions are welcome.

[Go to Spanish version](#espanol)

---

<a id="espanol"></a>

## Español

**AccessTex** es un editor y compilador de LaTeX accesible diseñado para apoyar a personas con discapacidad visual, especialmente a quienes utilizan lectores de pantalla.

El proyecto busca hacer más accesibles la creación, navegación, compilación y corrección de documentos LaTeX mediante navegación por teclado, controles compatibles con lectores de pantalla, retroalimentación auditiva e interpretación accesible de los errores de compilación de LaTeX.

### Características principales

- Editor LaTeX accesible basado en Monaco Editor.
- Compatibilidad con lectores de pantalla y etiquetas ARIA.
- Navegación centrada en el teclado.
- Navegación por la estructura del documento mediante secciones, subsecciones y capítulos.
- Compilación accesible de documentos LaTeX.
- Detección e interpretación de errores comunes de compilación de LaTeX.
- Identificación de la línea probable del error.
- Atajo de teclado para desplazarse directamente a la línea detectada.
- Retroalimentación auditiva mediante síntesis de voz.
- Carga y descarga de archivos `.tex`.
- Generación y descarga de archivos PDF.
- Preámbulos y plantillas LaTeX personalizables.
- Interfaz en español e inglés.

### Atajos de teclado

| Atajo | Función |
|---|---|
| `Ctrl + Enter` | Compilar el documento LaTeX |
| `Ctrl + Q` | Ir a la línea probable del error detectado |
| `Ctrl + I` | Anunciar la línea actual |
| `Ctrl + Shift + I` | Abrir el menú de navegación por la estructura del documento |
| `Esc` | Salir del editor y mover el foco hacia los controles |

### Retroalimentación de errores

Cuando la compilación de LaTeX falla, AccessTex analiza el registro generado por el compilador y presenta:

- una descripción simplificada del error;
- la línea probable en la que ocurrió;
- información de contexto extraída del registro de LaTeX;
- una indicación cuando la ubicación reportada puede no ser exacta.

El usuario puede presionar `Ctrl + Q` para desplazarse directamente a la línea detectada.

### Tecnología

AccessTex está desarrollado con:

- Electron
- Node.js
- Express
- Monaco Editor
- pdfLaTeX
- Web Speech API

### Requisitos

Para ejecutar AccessTex desde el código fuente se requiere:

- Node.js
- npm
- una distribución de LaTeX que proporcione `pdflatex`

El proyecto ha sido desarrollado y probado principalmente en Windows.

### Instalación

El instalador para Windows está disponible en la sección **Releases** de este repositorio.

Para desarrollo:

```bash
npm install
npm start
```

### Accesibilidad

La accesibilidad es un requisito central de diseño de AccessTex y no una característica añadida posteriormente a la interfaz.

La versión actual incluye:

- etiquetas y controles orientados al uso con lectores de pantalla;
- interacción mediante teclado;
- gestión del foco;
- navegación por la estructura del documento;
- retroalimentación auditiva;
- presentación accesible de los errores de compilación;
- navegación directa por teclado hacia la línea probable del error.

AccessTex se desarrolla prestando especial atención a personas usuarias de lectores de pantalla como NVDA.

### Idiomas

La interfaz actualmente admite:

- Español
- Inglés

### Licencia

AccessTex es software libre distribuido bajo la **GNU General Public License versión 3.0 o posterior (GPL-3.0-or-later)**.

Consulta el archivo `LICENSE` para ver el texto completo de la licencia.

### Autor

**José Iván López Flores**

Universidad Autónoma de Zacatecas (UAZ), México.

### Estado del proyecto

AccessTex se encuentra actualmente en desarrollo y evaluación activa.

El proyecto continúa refinándose mediante pruebas técnicas y evaluaciones orientadas a la accesibilidad. Las versiones futuras pueden incluir mejoras en la localización de errores de compilación, una validación más amplia con casos de error de LaTeX y nuevas funciones de accesibilidad.

Se agradecen comentarios, pruebas de accesibilidad, reportes de errores y contribuciones.

[Volver a la versión en inglés](#english)
