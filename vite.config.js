import {defineConfig} from "vite";

export default defineConfig({
    server: {
        host: "0.0.0.0",
        port: 5000
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "/src/styles/utils" as *;'
            }
        }
    },
    preview: {
        port: 9999
    }
})