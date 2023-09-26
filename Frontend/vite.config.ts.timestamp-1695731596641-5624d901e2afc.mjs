// vite.config.ts
import { defineConfig } from "file:///C:/Users/57swj/Desktop/FrontEnd/book-habit/Frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/57swj/Desktop/FrontEnd/book-habit/Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/57swj/Desktop/FrontEnd/book-habit/Frontend/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///C:/Users/57swj/Desktop/FrontEnd/book-habit/Frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\57swj\\Desktop\\FrontEnd\\book-habit\\Frontend";
var vite_config_default = defineConfig({
  base: "/",
  plugins: [react(), svgr(), tsconfigPaths()],
  optimizeDeps: {
    include: ["react", "react-dom"]
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "./scr") }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw1N3N3alxcXFxEZXNrdG9wXFxcXEZyb250RW5kXFxcXGJvb2staGFiaXRcXFxcRnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDU3c3dqXFxcXERlc2t0b3BcXFxcRnJvbnRFbmRcXFxcYm9vay1oYWJpdFxcXFxGcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvNTdzd2ovRGVza3RvcC9Gcm9udEVuZC9ib29rLWhhYml0L0Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTogJy8nLFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3ZncigpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NjcicpIH1dLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlWLFNBQVMsb0JBQW9CO0FBQ3RYLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQzFDLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxTQUFTLFdBQVc7QUFBQSxFQUNoQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWEsS0FBSyxRQUFRLGtDQUFXLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDdEU7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
