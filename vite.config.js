import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";
import ImageminPlugin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"],
    }),
    ImageminPlugin({
      gifsicle: { optimizationLevel: 9, interlaced: true },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 70, progressive: true },
      pngquant: { quality: [0.5, 0.7], speed: 1 },
      svgo: {
        plugins: [{ removeViewBox: false }, { removeDimensions: true }],
      },
      exclude: [/\.svg$/],
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
