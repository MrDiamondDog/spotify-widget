import { PlaybackInfo } from "./types";

export const SpotifyAPI = {
    token: "",
    spotify_id: "",

    async req(path: string) {
        const token = localStorage.getItem("spotify_auth_token");
        if (!token) {
            throw new Error("No token");
        }

        const res = await fetch(path, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.status === 401) {
            localStorage.removeItem("spotify_auth_token");
            await SpotifyAPI.authFlow();
        }

        window.electron.setSize(400, 150);
        document.body.classList.remove("spotify-login");

        return await res.json();
    },

    async authFlow() {
        if (!SpotifyAPI.spotify_id) {
            throw new Error("Missing SPOTIFY_ID environment variable");
        }

        if (localStorage.getItem("spotify_auth_token")) {
            this.token = localStorage.getItem("spotify_auth_token") || "";
            return;
        }

        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const state = params.get("state");
            const access_token = params.get("access_token");

            if (state !== localStorage.getItem("spotify_auth_state")) {
                throw new Error("Invalid state");
            }

            localStorage.removeItem("spotify_auth_state");
            localStorage.setItem("spotify_auth_token", access_token);

            window.location.hash = "";
            return;
        }

        let redirect_uri = await window.electron.getURL();
        redirect_uri = redirect_uri.split("#")[0];
        redirect_uri = redirect_uri.split("?")[0];
        console.log(redirect_uri);

        const state = Math.random().toString(36).substring(2);

        localStorage.setItem("spotify_auth_state", state);
        const scopes = "user-read-playback-state user-modify-playback-state user-read-private user-read-currently-playing";
        let url = "https://accounts.spotify.com/authorize";
        url += "?response_type=token";
        url += "&client_id=" + encodeURIComponent(SpotifyAPI.spotify_id);
        url += "&scope=" + encodeURIComponent(scopes);
        url += "&state=" + encodeURIComponent(state);
        url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

        document.body.className = "spotify-login";
        window.electron.setSize(800, 600);
        window.electron.loadURL(url);
    },

    async playerState(): Promise<PlaybackInfo> {
        return SpotifyAPI.req("https://api.spotify.com/v1/me/player").catch(() => ({ error: "nothing is playing" }));
    }
};
