import fs from "fs";

if (!fs.existsSync("out/spotify-widget-win32-x64/public")) {
    fs.mkdirSync("out/spotify-widget-win32-x64/public");
}

fs.copyFileSync(".webpack/x64/renderer/main_window/index.html", "out/spotify-widget-win32-x64/public/index.html");
fs.copyFileSync(".webpack/x64/renderer/main_window/index.js", "out/spotify-widget-win32-x64/public/index.js");
fs.copyFileSync("src/index.css", "out/spotify-widget-win32-x64/public/index.css");
