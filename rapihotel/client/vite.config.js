import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Abre automáticamente el reporte al finalizar el build
      filename: "stats.html", // Nombre del archivo de análisis
    }),
    compression({
      algorithm: "brotliCompress",
      threshold: 10240, // Comprime archivos > 10 KB
    }),
  ],
  server: {
    host: "0.0.0.0", // Permite conexiones externas
    port: 3000       // Asegúrate de que este puerto coincida con el mapeo en docker-compose si es necesario
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Grupo 1: Librerías de Heroui
          heroui: ["@heroui/react", "@heroui/theme"],
          // Grupo 2: Dependencias clave de React
          vendor: ["react", "react-dom", "react-router-dom"],
          // Grupo 3: Otras librerías pesadas (ajusta según tu proyecto)
          utils: ["axios"],
        },
      },
    },
  },
});
