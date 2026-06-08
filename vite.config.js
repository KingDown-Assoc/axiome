import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at the domain root (https://maths.kingdown.fr/)
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: { port: 5173 },
  build: { outDir: "dist", sourcemap: false },
});
