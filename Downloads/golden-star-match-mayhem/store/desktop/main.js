// Desktop shell (Windows / Linux / macOS) for Steam and Epic builds.
const { app, BrowserWindow, globalShortcut, Menu } = require("electron");
const path = require("path");
function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 640, minHeight: 360,
    backgroundColor: "#05070a", title: "Golden Star: Match Mayhem",
    autoHideMenuBar: true, fullscreenable: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, autoplayPolicy: "no-user-gesture-required" }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "..", "..", "www", "index.html"));
  globalShortcut.register("F11", () => win.setFullScreen(!win.isFullScreen()));
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => { globalShortcut.unregisterAll(); app.quit(); });
