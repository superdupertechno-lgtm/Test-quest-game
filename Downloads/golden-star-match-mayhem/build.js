// Builds the single-file game: node build.js  ->  dist/index.html (+ PWA files)
// src/index.html is the development page (separate CSS/JS files). This inlines them for release.
const fs = require("fs"), path = require("path");
const root = __dirname, src = path.join(root, "src"), dist = path.join(root, "dist");
let html = fs.readFileSync(path.join(src, "index.html"), "utf8");
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">\n?/g,
  (m, h) => "<style>\n" + fs.readFileSync(path.join(src, h), "utf8") + "\n</style>\n");
html = html.replace(/<script src="(js\/[^"]+)"><\/script>\n?/g,
  (m, h) => "<script>\n" + fs.readFileSync(path.join(src, h), "utf8") + "\n</script>\n");
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, "index.html"), html);
for (const f of ["manifest.webmanifest", "sw.js", "og.png"]) fs.copyFileSync(path.join(root, f), path.join(dist, f));
fs.cpSync(path.join(root, "icons"), path.join(dist, "icons"), { recursive: true });
console.log("built dist/index.html (" + Math.round(html.length / 1024) + " KB)");
