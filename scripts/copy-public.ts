import fs from "fs";

console.log("> Copying public files...");
console.log(process.platform);

// check device
if (process.platform === "win32") {
    if (!fs.existsSync("./out/spotify-widget-win32-x64/public")) {
        fs.mkdirSync("./out/spotify-widget-win32-x64/public");
    }

    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.html", "./out/spotify-widget-win32-x64/public/index.html");
    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.js", "./out/spotify-widget-win32-x64/public/index.js");
    fs.copyFileSync("./src/index.css", "./out/spotify-widget-win32-x64/public/index.css");
} else if (process.platform === "linux") {
    if (!fs.existsSync("./out/spotify-widget-linux-x64/public")) {
        fs.mkdirSync("./out/spotify-widget-linux-x64/public");
    }

    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.html", "./out/spotify-widget-linux-x64/public/index.html");
    fs.copyFileSync("./.webpack/x64/renderer/main_window/index.js", "./out/spotify-widget-linux-x64/public/index.js");
    fs.copyFileSync("./src/index.css", "./out/spotify-widget-linux-x64/public/index.css");
} else {
    console.log("unknown platform " + process.platform);
}

console.log("> Done copying public files.");
