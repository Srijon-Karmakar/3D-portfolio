import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@splinetool") || id.includes("node_modules/three")) {
            return "spline-3d";
          }
          if (id.includes("node_modules/gsap")) {
            return "gsap";
          }
          if (id.includes("node_modules/lottie-web")) {
            return "lottie";
          }
          if (id.includes("node_modules/lenis")) {
            return "lenis";
          }
          if (id.includes("node_modules/react-router-dom")) {
            return "router";
          }
        },
      },
    },
  },
})
