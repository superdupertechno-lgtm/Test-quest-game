// Copies the built game (dist/) into ./www for Capacitor (Android) and Electron (desktop).
const fs = require("fs"), path = require("path"), cp = require("child_process");
const root = path.join(__dirname, "..");
cp.execSync("node build.js", { cwd: root, stdio: "inherit" });
const out = path.join(root, "www");
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(root, "dist"), out, { recursive: true });
console.log("web build synced to www/");
