interface IImages {
    gaugeBackground: HTMLImageElement;
    gaugeFront: HTMLImageElement;
    discord: HTMLImageElement;
    github: HTMLImageElement;
    greasyfork: HTMLImageElement;
}

const createImage = (src: string) => {
    const img = new Image();
    img.src = src;
    return img;
}

export const getURL = (type: "skin" | "accessory" | "back", id: number) => {
    return `${location.origin}/img/ui/${type}${id}.png`;
}

const Images: Readonly<IImages> = {
    gaugeBackground: createImage("https://i.imgur.com/xincrX4.png"),
    gaugeFront: createImage("https://i.imgur.com/6AkHQM4.png"),
    discord: createImage("https://i.imgur.com/RcTl09i.png"),
    github: createImage("https://i.imgur.com/q0z20jB.png"),
    greasyfork: createImage("https://i.imgur.com/y6OYX0D.png"),
}

export default Images;