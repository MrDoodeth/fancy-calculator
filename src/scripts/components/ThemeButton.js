export default class ThemeButton {
    localStorageKey = "theme"

    constructor(selector) {
        this.button = document.querySelector(selector)
        const localStorageTheme = localStorage.getItem(this.localStorageKey)
        if (localStorageTheme) {
            this.theme = localStorageTheme
        } else {
            this.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        this.setTheme(this.theme)
        this.button.addEventListener("click", this.toggleTheme)
    }

    toggleTheme = () => {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
    }

    setTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme)
        this.button.classList.toggle("is-dark", theme === "dark")
        this.theme = theme
        localStorage.setItem(this.localStorageKey, theme)
    }
}
