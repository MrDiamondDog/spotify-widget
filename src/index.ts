import { app, BrowserWindow, ipcMain } from "electron";
import { factory } from "electron-json-config";
import fs from "fs";
import { createServer } from "http";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

export let win: BrowserWindow;
export const settings = factory();
const port = settings.get("port", 21431);

const createWindow = (): void => {
    // Create the browser window.
    win = new BrowserWindow({
        height: 150,
        width: 400,
        resizable: false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        frame: false,
        transparent: true,
        autoHideMenuBar: true,
        alwaysOnTop: true,
    });

    createServer((req: any, res: any) => {
        if (req.url === "/") req.url = "/index.html";
        req.url = req.url.replace("/main_window", "");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync((!process.argv.includes("--dev") ? "public" : ".webpack/renderer/main_window/") + req.url));
    }).listen(port, () => {
        console.log("> Ready on http://localhost:" + port);
    });

    win.loadURL("http://localhost:" + port);

    // Open the DevTools.
    // win.webContents.openDevTools();
};

app.on("ready", () => {
    ipcMain.handle("getURL", () => win.webContents.getURL());
    ipcMain.handle("loadURL", (_, url: string) => win.loadURL(url));
    ipcMain.handle("setSize", (_, width: number, height: number) => {
        if (width === -1) width = win.getSize()[0];
        if (height === -1) height = win.getSize()[1];

        win.setResizable(true);
        win.setSize(width, height);
        win.setResizable(false);
    });
    ipcMain.handle("spotifyId", () => settings.get("spotify_app_id"));
    ipcMain.handle("setSpotifyId", (_, id: string) => settings.set("spotify_app_id", id));
    ipcMain.handle("setPort", (_, port: number) => settings.set("port", port));

    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
