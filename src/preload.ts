// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    getURL: () => ipcRenderer.invoke("getURL"),
    loadURL: (url: string) => ipcRenderer.invoke("loadURL", url),
    setSize: (width: number, height: number) => ipcRenderer.invoke("setSize", width, height),
    spotifyId: () => ipcRenderer.invoke("spotifyId"),
    setSpotifyId: (id: string) => ipcRenderer.invoke("setSpotifyId", id),
});
