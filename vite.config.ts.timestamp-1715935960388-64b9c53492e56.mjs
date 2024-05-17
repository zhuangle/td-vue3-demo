// vite.config.ts
import path from "node:path";
import vue from "file:///D:/code/node/td-demo/td-vue3-demo/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/code/node/td-demo/td-vue3-demo/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { loadEnv } from "file:///D:/code/node/td-demo/td-vue3-demo/node_modules/vite/dist/node/index.js";
import { viteMockServe } from "file:///D:/code/node/td-demo/td-vue3-demo/node_modules/vite-plugin-mock/dist/index.mjs";
import svgLoader from "file:///D:/code/node/td-demo/td-vue3-demo/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_dirname = "D:\\code\\node\\td-demo\\td-vue3-demo";
var CWD = process.cwd();
var vite_config_default = ({ mode }) => {
  const { VITE_BASE_URL, VITE_API_URL_PREFIX } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve("src/style/variables.less")}";`
          },
          math: "strict",
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: "mock",
        enable: false
      }),
      svgLoader()
    ],
    server: {
      port: 3002,
      host: "0.0.0.0",
      proxy: {
        [VITE_API_URL_PREFIX]: "http://127.0.0.1:3000/"
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXG5vZGVcXFxcdGQtZGVtb1xcXFx0ZC12dWUzLWRlbW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGNvZGVcXFxcbm9kZVxcXFx0ZC1kZW1vXFxcXHRkLXZ1ZTMtZGVtb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovY29kZS9ub2RlL3RkLWRlbW8vdGQtdnVlMy1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcblxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcbmltcG9ydCB7IENvbmZpZ0VudiwgbG9hZEVudiwgVXNlckNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snO1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInO1xuXG5jb25zdCBDV0QgPSBwcm9jZXNzLmN3ZCgpO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcbiAgY29uc3QgeyBWSVRFX0JBU0VfVVJMLCBWSVRFX0FQSV9VUkxfUFJFRklYIH0gPSBsb2FkRW52KG1vZGUsIENXRCk7XG4gIHJldHVybiB7XG4gICAgYmFzZTogVklURV9CQVNFX1VSTCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIGxlc3M6IHtcbiAgICAgICAgICBtb2RpZnlWYXJzOiB7XG4gICAgICAgICAgICBoYWNrOiBgdHJ1ZTsgQGltcG9ydCAocmVmZXJlbmNlKSBcIiR7cGF0aC5yZXNvbHZlKCdzcmMvc3R5bGUvdmFyaWFibGVzLmxlc3MnKX1cIjtgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWF0aDogJ3N0cmljdCcsXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXG4gICAgICAgIGVuYWJsZTogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIHN2Z0xvYWRlcigpLFxuICAgIF0sXG5cbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDIsXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBwcm94eToge1xuICAgICAgICBbVklURV9BUElfVVJMX1BSRUZJWF06ICdodHRwOi8vMTI3LjAuMC4xOjMwMDAvJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStSLE9BQU8sVUFBVTtBQUVoVCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQW9CLGVBQTJCO0FBQy9DLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sZUFBZTtBQU50QixJQUFNLG1DQUFtQztBQVF6QyxJQUFNLE1BQU0sUUFBUSxJQUFJO0FBR3hCLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBNkI7QUFDbEQsUUFBTSxFQUFFLGVBQWUsb0JBQW9CLElBQUksUUFBUSxNQUFNLEdBQUc7QUFDaEUsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osWUFBWTtBQUFBLFlBQ1YsTUFBTSw4QkFBOEIsS0FBSyxRQUFRLDBCQUEwQixDQUFDO0FBQUEsVUFDOUU7QUFBQSxVQUNBLE1BQU07QUFBQSxVQUNOLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLGNBQWM7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxNQUNWLENBQUM7QUFBQSxNQUNELFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxDQUFDLG1CQUFtQixHQUFHO0FBQUEsTUFDekI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
