import { SpotifyAPI } from "./api";
import { loadInfo } from "./info";
import { updateProgressBar } from "./progressbar";
import { input } from "./utils";

declare global {
    interface Window {
        electron: {
            getURL: () => Promise<string>;
            loadURL: (url: string) => Promise<void>;
            setSize: (width: number, height: number) => Promise<void>;
            spotifyId: () => Promise<string>;
            setSpotifyId: (id: string) => Promise<void>;
        };
    }
}

async function init() {
    SpotifyAPI.spotify_id = await window.electron.spotifyId();
    SpotifyAPI.authFlow().then(async () => {
        const player = await SpotifyAPI.playerState();

        updateProgressBar(player);
        loadInfo(player);
        window.electron.setSize(400, 150);

        setInterval(async () => {
            const player = await SpotifyAPI.playerState();
            updateProgressBar(player);
            loadInfo(player);
        }, 1000);
    }).catch(() => {
        input("Spotify App ID", "Please enter your Spotify App ID.").then(async id => {
            await window.electron.setSpotifyId(id);
            document.body.classList.remove("no-drag");
            init();
        });
        document.body.classList.add("no-drag");
    });
    // console.log(window.location.href);
}

init();
