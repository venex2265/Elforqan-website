// THEME 
let layout = document.getElementById("layout")

let settingsSection = document.getElementById("settings-card")
let popupMenu = document.getElementById("popup")

let autoThemeBtn = popupMenu.querySelector(".theme .auto")
let LightThemeBtn = popupMenu.querySelector(".theme .light")
let DarkThemeBtn = popupMenu.querySelector(".theme .dark")
let themeButtons = [autoThemeBtn, LightThemeBtn, DarkThemeBtn]
let cancelBtn = popupMenu.querySelector(".cancel")

cancelBtn.addEventListener("click", () => {
    popupMenu.classList.remove("show")
})

let allSections = document.querySelectorAll("#sections > li, #settings-card")
settingsSection.addEventListener("click", () => {
    allSections.forEach((section) => {
        section.classList.remove("active-section")
    })
    settingsSection.classList.add("active-section")
    popupMenu.classList.toggle("show")
})

document.addEventListener("click", (event) => {
    if (!popupMenu.classList.contains("show")) return;

    const clickedInsideSettings = event.target.closest("#popup, #settings-card");
    if (!clickedInsideSettings) {
        popupMenu.classList.remove("show");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        popupMenu.classList.remove("show");
    }
});

const lightTheme = "light";
const darkTheme = "dark";

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme;
}

function applyTheme(selectedTheme) {
    const theme = ["auto", lightTheme, darkTheme].includes(selectedTheme)
        ? selectedTheme
        : "auto";

    layout.classList.remove("light", "dark")
    themeButtons.forEach((button) => {
        button.classList.remove("active")
    })

    const activeTheme = theme === "auto" ? getSystemTheme() : theme;
    layout.classList.add(activeTheme)

    const html = document.documentElement;
    html.classList.remove("theme-dark", "theme-light");
    html.classList.add(activeTheme === "dark" ? "theme-dark" : "theme-light");
    html.dataset.theme = activeTheme;
    html.dataset.themeMode = theme;

    let activeButton = popupMenu.querySelector(`.theme .${theme}`)
    activeButton?.classList.add("active")

    localStorage.setItem("theme", theme)
}

autoThemeBtn.addEventListener("click", () => {
    applyTheme("auto")
})
LightThemeBtn.addEventListener("click", () => {
    applyTheme(lightTheme)
})
DarkThemeBtn.addEventListener("click", () => {
    applyTheme(darkTheme)
})

applyTheme(localStorage.getItem("theme") || "auto")

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ((localStorage.getItem("theme") || "auto") === "auto") {
        applyTheme("auto")
    }
})

// Language
