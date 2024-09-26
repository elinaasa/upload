import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "upload",
      filename: "remoteEntry.js",
      exposes: {
        "./MediaForm": "./src/components/MediaForm",
      },
      remotes: {
        mediastore: "http://localhost:3001/assets/remoteEntry.js",
        front_and_sidebar: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 3010,
  },
  preview: {
    port: 3010,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext",
  },
});
