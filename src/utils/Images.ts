interface IImages {
    gaugeBackground: HTMLImageElement;
    gaugeFront: HTMLImageElement;
}

const createImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.loaded = false;
    img.onload = () => {
        img.loaded = true;
    }
    return img;
}

const Images: Readonly<IImages> = {
    gaugeBackground: createImage("https://i.imgur.com/xincrX4.png"),
    gaugeFront: createImage("https://i.imgur.com/6AkHQM4.png"),
}

export default Images;