import path from "path"

import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import vuetify from "vite-plugin-vuetify"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "."),
            "@client-types": path.resolve(__dirname, "../../out/client_types.ts"),
        },
    },
    cacheDir: "../../node_modules",
})
