import Header from "../../public/Header.html";
import Navbar from "../../public/Navbar.html";
import Keybinds from "../../public/menu-pages/Keybinds.html";
import Combat from "../../public/menu-pages/Combat.html";
import Visuals from "../../public/menu-pages/Visuals.html";
import Misc from "../../public/menu-pages/Misc.html";
import Credits from "../../public/menu-pages/Credits.html";
import CSS from "../styles/index.scss";
import { capitalize, contains, download, formatCode, removeClass } from "../utils/Common";
import settings, { defaultSettings, storage } from "./Settings";
import { Dsync, log } from "..";
import { handleKeydown, handleKeyup } from "./Controller";
import { selectData } from "../types";

const createMenu = () => {

    const IFRAME_CONTENT = `
        <style>${CSS}</style>
        <div id="menu-container" class="open">
            <div id="menu-wrapper">
                ${Header}

                <main>
                    ${Navbar}

                    <div id="menu-page-container">
                        ${Keybinds}
                        ${Combat}
                        ${Visuals}
                        ${Misc}
                        ${Credits}
                    </div>
                </main>
            </div>
        </div>
    `;

    const IFRAME_STYLE = `
        #iframe-page-container {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            z-index: 99;
            border: none;
            outline: none;
            overflow: scroll;
            display: none;
        }

        .iframe-opened {
            display: block!important;
        }
    `;

    const IFRAME = document.createElement("iframe");
    const blob = new Blob([IFRAME_CONTENT], { type: "text/html; charset=utf-8" });
    IFRAME.src = URL.createObjectURL(blob);
    IFRAME.id = "iframe-page-container";
    document.body.appendChild(IFRAME);

    const style = document.createElement("style");
    style.innerHTML = IFRAME_STYLE;
    document.head.appendChild(style);

    IFRAME.onload = () => {
        const iframeWindow = IFRAME.contentWindow;
        const iframeDocument = iframeWindow.document;
        URL.revokeObjectURL(IFRAME.src);

        const menuContainer = iframeDocument.getElementById("menu-container") as HTMLDivElement;
        const openMenu = iframeDocument.querySelectorAll(".open-menu") as NodeListOf<HTMLButtonElement>;
        const menuPage = iframeDocument.querySelectorAll(".menu-page") as NodeListOf<HTMLDivElement>;
        const sections = iframeDocument.querySelectorAll(".section") as NodeListOf<HTMLDivElement>;
        const hotkeyInputs = iframeDocument.querySelectorAll(".section-option-hotkeyInput[id]") as NodeListOf<HTMLButtonElement>;
        const closeMenu = iframeDocument.querySelector("#close-menu") as SVGElement;
        const checkboxs = iframeDocument.querySelectorAll("input[type='checkbox'][id]") as NodeListOf<HTMLInputElement>;
        const sliders = iframeDocument.querySelectorAll("input[type='range'][id]") as NodeListOf<HTMLInputElement>;
        const headerVersion = iframeDocument.querySelector("#version > span") as HTMLSpanElement;
        const autochatInputs = iframeDocument.querySelectorAll(".input.autochat") as NodeListOf<HTMLInputElement>;
        const killMessage = iframeDocument.querySelector("#killMessage") as HTMLInputElement;
        const resetSettings = iframeDocument.querySelector("#reset-settings") as HTMLButtonElement;
        const downloadSettings = iframeDocument.querySelector("#download-settings") as HTMLButtonElement;
        const uploadSettings = iframeDocument.querySelector("#upload-settings") as HTMLInputElement;
        const menuTransparency = iframeDocument.querySelector("#menuTransparency") as HTMLInputElement;
        const colorPickers = iframeDocument.querySelectorAll("input[type='color'][id]") as NodeListOf<HTMLInputElement>;
        const selects = iframeDocument.querySelectorAll("select[id]") as NodeListOf<HTMLSelectElement>;

        const update = () => {

            for (const select of selects) {
                const data = selectData[select.id as keyof typeof selectData];
                for (const key in data) {
                    if (!isNaN(Number(key))) continue;

                    const option = document.createElement("option");
                    option.value = data[key];
                    option.textContent = capitalize(key);
                    if (data[key] === settings[select.id]) {
                        option.selected = true;
                        option.defaultSelected = true;
                    }
                    select.appendChild(option);
                }

                select.onchange = () => {
                    settings[select.id] = Number(select.value);
                    storage.set("Dsync-settings", settings);
                }
            }

            for (const picker of colorPickers) {
                
                const resetColor = picker.previousElementSibling as HTMLButtonElement;
                if (resetColor) {
                    const defaultColor: string = defaultSettings[picker.id];
                    resetColor.style.backgroundColor = defaultColor;
                    resetColor.onclick = () => {
                        picker.value = defaultColor;
                        settings[picker.id] = defaultColor;
                        storage.set("Dsync-settings", settings);
                    }
                }

                picker.value = settings[picker.id];
                picker.onchange = () => {
                    settings[picker.id] = picker.value;
                    storage.set("Dsync-settings", settings);
                    picker.blur();
                }
            }

            menuContainer.classList[settings.menuTransparency ? "add" : "remove"]("transparent");

            // Handle killmessage
            killMessage.value = settings.killMessage;
            killMessage.onchange = () => {
                settings.killMessage = killMessage.value;
                storage.set("Dsync-settings", settings);
                killMessage.blur();
            }

            // Handle autochat inputs
            for (let i=0;i<autochatInputs.length;i++) {
                const input = autochatInputs[i];
                input.value = settings.autochatMessages[i] || "";
                input.onchange = () => {
                    settings.autochatMessages[i] = input.value;
                    storage.set("Dsync-settings", settings);
                    input.blur();
                }
            }

            headerVersion.textContent = "v" + Dsync.version;

            // Handle Sliders and their value
            for (const slider of sliders) {
                const sliderValue = slider.nextElementSibling;
                slider.value = settings[slider.id];

                if (sliderValue) {
                    sliderValue.textContent = slider.value;
                }
                slider.oninput = () => {
                    const value = Number(slider.value) % 5;
                    (slider.value as any) -= value;
                    if (sliderValue) {
                        sliderValue.textContent = slider.value;
                    }
                    settings[slider.id] = Number(slider.value);
                    storage.set("Dsync-settings", settings);
                }
            }

            // Handle checkboxs
            for (const checkbox of checkboxs) {
                checkbox.checked = settings[checkbox.id];
                checkbox.onchange = () => {
                    settings[checkbox.id] = checkbox.checked;
                    storage.set("Dsync-settings", settings);
                    checkbox.blur();
                }
            }

            // Make Menu toggleable
            Dsync.toggleMenu = () => {
                menuContainer.classList.toggle("close");
                menuContainer.classList.toggle("open");
                setTimeout(() => {
                    IFRAME.classList.toggle("iframe-opened");
                }, 100);
            }

            closeMenu.onclick = Dsync.toggleMenu;

            // Switch between menu pages, handle navbar button clicks
            for (let i=0;i<openMenu.length;i++) {
                openMenu[i].onclick = () => {
                    removeClass(openMenu, "active");
                    openMenu[i].classList.add("active");

                    removeClass(menuPage, "opened");
                    menuPage[i].classList.add("opened");
                }
            }

            // Handle open/close sections
            for (const section of sections) {
                const title = section.children[0] as HTMLDivElement;
                const content = section.children[1] as HTMLDivElement;
                if (!title || !content) continue;

                if (contains(section, "opened")) {
                    content.classList.add("opened");
                    continue;
                }

                content.style.display = "none";

                title.onclick = () => {

                    if (!content.classList.contains("opened")) {
                        content.style.display = "grid";
                    } else {
                        setTimeout(() => {
                            content.style.display = "none";
                        }, 100)
                    }
                    setTimeout(() => {
                        content.classList.toggle("opened");
                        title.children[1].classList.toggle("rotate");
                    }, 0)
                }
            }

            // Set default hotkey inputs
            for (const hotkeyInput of hotkeyInputs) {
                try {
                    hotkeyInput.textContent = formatCode(settings[hotkeyInput.id as keyof typeof settings]);
                } catch(err) {
                    throw new Error(hotkeyInput.id + " doesn't exist in settings");
                }
            }

            checkForRepeats();

        }

        menuTransparency.addEventListener("change", () => {
            menuContainer.classList[menuTransparency.checked ? "add" : "remove"]("transparent");
        })

        resetSettings.onclick = () => {
            Object.assign(settings, defaultSettings);
            storage.set("Dsync-settings", settings);
            update();
        }

        downloadSettings.onclick = () => {
            download(settings, "DsyncSettings" + Dsync.version);
        }

        uploadSettings.onchange = async (event) => {
            const target = event.target as HTMLInputElement;
            const parent = uploadSettings.parentElement as HTMLDivElement;
            const spanText = parent.children[1] as HTMLSpanElement;
            parent.classList.remove("red");
            parent.classList.remove("green");
            try {
                const text = await target.files[0].text();
                const sets = JSON.parse(text);
                if (Object.keys(sets).every(key => defaultSettings.hasOwnProperty(key))) {
                    Object.assign(settings, sets);
                    storage.set("Dsync-settings", settings);
                    update();

                    parent.classList.add("green");
                    spanText.innerHTML = `SETTINGS LOADED SUCCESSFULLY`;
                } else {
                    throw new Error("Invalid settings");
                }
            } catch(err) {
                parent.classList.add("red");
                spanText.innerHTML = "SETTINGS ARE NOT VALID, TRY ANOTHER";
            }
        }

        const checkForRepeats = () => {
            const list = new Map<string | number, [number, HTMLButtonElement[]]>();
            for (const hotkeyInput of hotkeyInputs) {
                const value = settings[hotkeyInput.id] as string | number;
                const [count, inputs] = list.get(value) || [0, []];
                list.set(value, [(count || 0) + 1, [ ...inputs, hotkeyInput]]);
                hotkeyInput.classList.remove("red");
            }

            for (const data of list) {
                const [number, hotkeyInputs] = data[1];
                if (number === 1) continue;

                for (const hotkeyInput of hotkeyInputs) {
                    hotkeyInput.classList.add("red");
                }
            }
        }

        Dsync.active = null;
        const applyCode = (code: string | number) => {
            if (!Dsync.active) return;

            const key = code === "Backspace" ? "..." : formatCode(code);
            settings[Dsync.active.id as keyof typeof settings] = code === "Backspace" ? "..." : code;
            Dsync.active.textContent = key;

            storage.set("Dsync-settings", settings);
            Dsync.active = null;
            checkForRepeats();
        }

        menuContainer.addEventListener("keyup", event => {
            if (event.keyCode < 5 || !Dsync.active) return
            applyCode(event.code);
        })

        menuContainer.addEventListener("mouseup", event => {
            const target = event.target as Element;

            if (Dsync.active) return applyCode(event.button);
            if (!contains(target, "section-option-hotkeyInput") || !target.id) return;
            target.textContent = "Wait...";
            Dsync.active = target as HTMLButtonElement;
        })

        iframeWindow.addEventListener("keydown", event => handleKeydown(event, event.code));
        iframeWindow.addEventListener("keyup", event => handleKeyup(event, event.code));

        const resize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const scale = Math.min(1, Math.min(width / 1024, height / 700));
            menuContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        resize();
        window.addEventListener("resize", resize);
        setTimeout(() => IFRAME.classList.add("iframe-opened"), 0);

        iframeWindow.addEventListener("contextmenu", (event) => event.preventDefault());

        // Prevent from using XButtons to leave the page
        iframeWindow.addEventListener("mousedown", event => 1 === event.button && event.preventDefault());
        iframeWindow.addEventListener("mouseup", event => [3, 4].includes(event.button) && event.preventDefault());
        window.addEventListener("mouseup", event => [3, 4].includes(event.button) && event.preventDefault());
        update();

    }
}

export default createMenu;