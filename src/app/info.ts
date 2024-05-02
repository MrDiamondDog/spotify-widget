import { PlaybackInfo } from "./types";
import { averageColor, isLight } from "./utils";

const albumArt = document.getElementById("album-art") as HTMLImageElement;
const songTitle = document.getElementById("song-name");
const artist = document.getElementById("artist-name");
const album = document.getElementById("album-name");

export function loadInfo(player: PlaybackInfo) {
    if (player.error) return;

    const image = (player.item as SpotifyApi.TrackObjectFull).album.images[0].url;

    songTitle.textContent = player.item.name;
    artist.textContent = (player.item as SpotifyApi.TrackObjectFull).artists.map(artist => artist.name).join(", ");
    album.textContent = (player.item as SpotifyApi.TrackObjectFull).album.name;

    if (albumArt.src === image) return;
    averageColor(image).then(color => {
        document.querySelector(".container")!.setAttribute("style", `background-color: ${color}`);

        if (isLight(color)) {
            document.body.className = "light";
        } else {
            document.body.className = "dark";
        }
    });

    albumArt.src = image;
}
