import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true,
  },
  logLevel: "info",
  clearScreen: false,
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
