\# AccessTex



\*\*AccessTex\*\* is an accessible LaTeX editor and compiler designed to support users with visual disabilities, particularly users of screen readers.



The project aims to make LaTeX document creation, navigation, compilation, and error correction more accessible through keyboard navigation, screen-reader-compatible controls, auditory feedback, and accessible interpretation of LaTeX compilation errors.



\## Main features



\- Accessible LaTeX editor based on Monaco Editor.

\- Screen-reader support and ARIA labels.

\- Keyboard-centered navigation.

\- Document structure navigation through sections, subsections, and chapters.

\- Accessible LaTeX compilation.

\- Detection and interpretation of common LaTeX compilation errors.

\- Identification of the probable error line.

\- Keyboard shortcut to move directly to the detected error.

\- Auditory feedback using speech synthesis.

\- Loading and downloading of `.tex` files.

\- PDF generation and download.

\- Custom LaTeX preambles/templates.

\- Spanish and English interface.



\## Keyboard shortcuts



| Shortcut | Function |

|---|---|

| `Ctrl + Enter` | Compile the LaTeX document |

| `Ctrl + Q` | Go to the detected error line |

| `Ctrl + I` | Announce the current line |

| `Ctrl + Shift + I` | Open the document structure navigation menu |

| `Esc` | Leave the editor and move focus to the controls |



\## Error feedback



When LaTeX compilation fails, AccessTex analyzes the compiler log and presents:



\- a simplified description of the error;

\- the probable line where the error occurred;

\- contextual information extracted from the LaTeX log;

\- an indication when the reported location may not be exact.



The user can press `Ctrl + Q` to move directly to the detected line.



\## Technology



AccessTex is built with:



\- Electron

\- Node.js

\- Express

\- Monaco Editor

\- pdfLaTeX

\- Web Speech API



\## Requirements



To run the source version of AccessTex, the system requires:



\- Node.js

\- npm

\- a LaTeX distribution providing `pdflatex`



The project has primarily been developed and tested on Windows.



\## Installation



A Windows installer will be available through the \*\*Releases\*\* section of this repository.



For development:



```bash

npm install

npm start

```



\## Accessibility



Accessibility is a central design requirement of AccessTex rather than an additional interface feature.



The current version includes:



\- screen-reader-oriented labels and controls;

\- keyboard-based interaction;

\- focus management;

\- document structure navigation;

\- auditory feedback;

\- accessible presentation of compilation errors;

\- direct keyboard navigation to the probable error line.



AccessTex is being developed with particular attention to users who work with screen readers such as NVDA.



\## Languages



The interface currently supports:



\- Spanish

\- English



\## License



AccessTex is free software distributed under the \*\*GNU General Public License v3.0 or later (GPL-3.0-or-later)\*\*.



See the `LICENSE` file for the full license text.



\## Author



\*\*José Iván López Flores\*\*



Universidad Autónoma de Zacatecas (UAZ), Mexico.



\## Project status



AccessTex is currently under active development and evaluation.



The project is being refined through technical testing and accessibility-oriented evaluation. Future versions may include improvements to compilation-error localization, broader validation with LaTeX error cases, and additional accessibility features.



Feedback, accessibility testing, bug reports, and contributions are welcome.



