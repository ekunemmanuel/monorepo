import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { tailwind } from "@monorepo/ui/plugin";

// https://vite.dev/config/
// Configured with shared Tailwind plugin
export default defineConfig({
  plugins: [vue(), tailwind()],
  envDir: "../..",
});
