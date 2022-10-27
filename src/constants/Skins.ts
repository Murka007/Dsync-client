export type TSkins = "skin" | "accessory" | "back";

type TSkin = [string, number, number];
interface ISkins {
    readonly skin: readonly TSkin[];
    readonly accessory: readonly TSkin[];
    readonly back: readonly TSkin[];
}

const skins: ISkins = {
    skin: [
        ["Sploop Classic", 0, 0],
        ["Yellow Classic", 1, 0],
        ["Brown Classic", 2, 0],
        ["Pink Classic", 3, 0],
        ["Blue Classic", 4, 0],
        ["Green Classic", 5, 0],
        ["White Cat", 6, 100],
        ["Ginger Cat", 7, 100],
        ["Pit Bull", 8, 150],
        ["Pig", 9, 100],
        ["Crocodile", 10, 200],
        ["Fox", 11, 200],
        ["Panda", 12, 300],
        ["Bear", 13, 300],
        ["Penguin", 14, 300],
        ["Cactus", 15, 400],
        ["Strawberry", 16, 800],
        ["Wolf", 17, 400],
        ["Mammoth", 18, 2000],
        ["Golden Cow", 19, 3000],
        ["Shark", 20, 1000],
        ["Apple", 21, 200],
        ["Stone", 22, 500],
        ["Cave Stone", 23, 600],
        ["Ice", 24, 700],
        ["Gold", 25, 800],
        ["Cow", 26, 350],
        ["Dragon", 27, 5000],
        ["Black Ice", 28, 1000],
        ["Magma", 29, 1500],
        ["Kawak", 30, 2500],
        ["Snowman", 31, 400],
        ["Elf", 32, 1000],
        ["Green Bauble", 33, 300],
        ["Red Bauble", 34, 300],
        ["Golden Bauble", 35, 800],
        ["Duck", 36, 300],
        ["Tornado", 37, 3000],
        ["Golden Beetle", 38, 1500]
    ],
    accessory: [
        ["None", 0, 0],
        ["Mustache", 1, 100],
        ["Sun Glasses", 2, 500],
        ["Yellow Cap", 3, 0],
        ["Blue Cap", 4, 0],
        ["Purple Cap", 5, 0],
        ["Green Cap", 6, 0],
        ["Pink Bow", 7, 0],
        ["3D Glasses", 8, 300],
        ["Scar", 9, 150],
        ["Turban", 10, 250],
        ["Bandage", 11, 250],
        ["Crazy Glasses", 12, 150],
        ["Cow's Snout", 13, 300],
        ["Carrot", 14, 150],
        ["Horn", 15, 1000],
        ["Tusk", 16, 800],
        ["Mammoth Hair", 17, 600],
        ["Mammoth Ears", 18, 500],
        ["Leaf", 19, 150],
        ["Black Mustache", 20, 500],
        ["Snowman Hat", 21, 1000],
        ["Blue Beanie", 22, 200],
        ["Green Beanie", 23, 200],
        ["Purple Beanie", 24, 200],
        ["Orange Beanie", 25, 200],
        ["Yellow Scarf", 26, 250],
        ["Red Scarf", 27, 350],
        ["Green Scarf", 28, 300],
        ["Red Nose", 29, 400],
        ["Mask", 30, 1000],
        ["Garlands", 31, 500]
    ],
    back: [
        ["None", 0, 0],
        ["Mammoth Tail", 1, 500],
        ["Dragon Wings", 2, 5000],
        ["Swords", 3, 2000],
        ["Blue Cape", 4, 400],
        ["Christmas Cape", 5, 400],
        ["Speedy Cape", 6, 400],
        ["Garland", 7, 300],
        ["Baby Elf", 8, 1500],
        ["Gift", 9, 1000],
        ["Yellow Bag", 10, 300]
    ]
};

export default skins;