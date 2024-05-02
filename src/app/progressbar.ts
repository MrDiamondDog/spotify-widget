import { PlaybackInfo } from "./types";
import { msToTime } from "./utils";

const progressBarFill = document.querySelector(".progress-bar-fill") as HTMLElement;
const progressText = document.querySelector("#current-time") as HTMLElement;
const timeLeftText = document.querySelector("#time-left") as HTMLElement;

export function updateProgressBar(player: PlaybackInfo) {
    if (player.error) {
        return;
    }

    const progress = player.progress_ms / player.item.duration_ms * 100;
    progressBarFill.style.width = `${progress}%`;
    progressText.textContent = msToTime(player.progress_ms);
    timeLeftText.textContent = `-${msToTime(player.item.duration_ms - player.progress_ms)}`;
}
