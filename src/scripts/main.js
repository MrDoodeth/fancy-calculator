import ThemeButton from "./components/ThemeButton.js"
import Calculator from "./components/Calculator.js";

new ThemeButton("[data-js-theme-button]")
new Calculator({
    root: "[data-js-calculator]",
    screen: "[data-js-calculator-screen]",
    button: "[data-js-calculator-button]"
})