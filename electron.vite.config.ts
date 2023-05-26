import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@atoms': resolve('src/renderer/src/components/atoms'),
        '@template': resolve('src/renderer/src/components/template'),
        '@store': resolve('src/renderer/src/store'),
        '@util': resolve('src/renderer/src/util')
      }
    },
    plugins: [vue()]
  }
})
