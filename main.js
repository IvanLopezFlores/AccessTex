// main.js
/*
  AccessTex - Editor LaTeX accesible
  Copyright (C) 2025 José Iván López Flores
  License: GPL-3.0-or-later
*/

const { app, BrowserWindow } = require("electron");
const path = require("path");

function startServer() {
  try {
    // Arranca tu servidor Express
    require(path.join(__dirname, "server.js"));
    console.log("✅ Servidor Express iniciado");
  } catch (err) {
    console.error("❌ Error al iniciar Express:", err);
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // **Carga la UI desde Express, NUNCA desde file://**
  win.loadURL("http://localhost:3000");

  // ✅ Solo abre DevTools en modo desarrollo
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }

  // 🔒 Bloquea Ctrl+Shift+I y F12 solo en producción
  if (process.env.NODE_ENV === 'production') {
    win.webContents.on('before-input-event', (event, input) => {
      const isDevToolsShortcut =
        (input.control && input.shift && input.key.toLowerCase() === 'i') ||
        input.key === 'F12';

      if (isDevToolsShortcut) {
        event.preventDefault();
      }
    });
  }
}


app.whenReady().then(() => {
  startServer();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

