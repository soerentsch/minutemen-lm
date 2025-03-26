import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, "public/index.html"), // Entry for the popup
      },
    },
  },
});