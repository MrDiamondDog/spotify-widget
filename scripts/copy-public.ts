import fs from "fs";

console.log("> Copying public files...");
console.log(process.argv[2]);

const platform = process.argv[2].replace("--", "");

// check device
if (!fs.existsSync(`./out/spotify-widget-${platform}-x64/public`)) {
    fs.mkdirSync(`./out/spotify-widget-${platform}-x64/public`);
}

fs.copyFileSync("./.webpack/x64/renderer/main_window/index.html", `./out/spotify-widget-${platform}-x64/public/index.html`);
fs.copyFileSync("./.webpack/x64/renderer/main_window/index.js", `./out/spotify-widget-${platform}-x64/public/index.js`);
fs.copyFileSync("./src/index.css", `./out/spotify-widget-${platform}-x64/public/index.css`);

console.log("> Done copying public files.");
