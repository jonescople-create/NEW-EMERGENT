import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: [
      "zip-site-clone.cluster-0.preview.emergentcf.cloud",
      "5a351083-6d30-40e0-ab79-b32042aec4a6.preview.emergentagent.com",
      "localhost",
      ".preview.emergentcf.cloud",
      ".preview.emergentagent.com"
    ],
    hmr: {
      clientPort: 3000,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: [
      "zip-site-clone.cluster-0.preview.emergentcf.cloud",
      "5a351083-6d30-40e0-ab79-b32042aec4a6.preview.emergentagent.com",
      "localhost",
      ".preview.emergentcf.cloud",
      ".preview.emergentagent.com"
    ],
  },
});
