import { defineConfig } from "vite";

export default defineConfig({
    base: "/fancy-calculator/",
    server: {
        host: "0.0.0.0",
        port: 5000
    },
    preview: {
        port: 9999
    }
})