import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/frontend-mentor-galleria-slideshow/",
  plugins: [react()],
});
