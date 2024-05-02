export function msToTime(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function averageColor(imgUrl: string) {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imgUrl;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const { data } = imageData;
            let r = 0, g = 0, b = 0;
            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }
            r = Math.floor(r / (data.length / 4));
            g = Math.floor(g / (data.length / 4));
            b = Math.floor(b / (data.length / 4));
            resolve(`rgb(${r}, ${g}, ${b})`);
        };
        img.onerror = reject;
    });
}

export function isLight(color: string) {
    const rgb = color.match(/\d+/g)!.map(Number);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 155;
}

export function error(title: string, body: string) {
    const error = document.querySelector("#error") as HTMLDivElement;
    error.style.display = "flex";

    const errorTitle = error.querySelector("#error-title") as HTMLHeadingElement;
    errorTitle.innerHTML = title;

    const errorBody = error.querySelector("#error-message") as HTMLParagraphElement;
    errorBody.innerHTML = body;
}

export function input(title: string, body: string) {
    return new Promise<string>((resolve, reject) => {
        const input = document.querySelector("#input") as HTMLDivElement;
        input.style.display = "flex";

        const inputTitle = input.querySelector("#input-title") as HTMLHeadingElement;
        inputTitle.innerHTML = title;

        const inputBody = input.querySelector("#input-message") as HTMLParagraphElement;
        inputBody.innerHTML = body;

        const inputField = input.querySelector("#input-text") as HTMLInputElement;
        inputField.focus();

        const inputButton = input.querySelector("#input-button") as HTMLButtonElement;
        inputButton.onclick = () => {
            if (!inputField.value) return;
            input.style.display = "none";
            resolve(inputField.value);
        };
    });
}
