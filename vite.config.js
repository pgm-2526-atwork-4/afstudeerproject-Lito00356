import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@design": resolve(__dirname, "./src/app/components/design"),
      "@functional": resolve(__dirname, "./src/app/components/functional"),
      "@pages": resolve(__dirname, "./src/app/pages"),
      "@style": resolve(__dirname, "./src/style"),
      "@core": resolve(__dirname, "./src/core"),
    },
  },
});
