import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'

// https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      // https://cn.vitejs.dev/config/shared-options.html#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
