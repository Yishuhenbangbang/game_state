import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
  base: './', // 将 publicPath 配置为 base
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

