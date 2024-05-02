import fs from "fs";

if (!fs.existsSync("./out/spotify-widget-win32-x64/public")) {
    fs.mkdirSync("./out/spotify-widget-win32-x64/public");
}

// check device
if (process.platform === "win32") {
    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.html", "./out/spotify-widget-win32-x64/public/index.html");
    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.js", "./out/spotify-widget-win32-x64/public/index.js");
    fs.copyFileSync("./src/index.css", "./out/spotify-widget-win32-x64/public/index.css");
} else if (process.platform === "linux") {
    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.html", "./out/spotify-widget-linux-x64/public/index.html");
    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.js", "./out/spotify-widget-linux-x64/public/index.js");
    fs.copyFileSync("./src/index.css", "./out/spotify-widget-linux-x64/public/index.css");
} else {
    console.log("unknown platform " + process.platform);
}
