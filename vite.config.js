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
  },
  build: {
    rollupOptions: {
      output: {
        // vite.config.js
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // 合并所有 vue 相关
          if (/[\\/]node_modules[\\/](@?vue|vue-router|pinia|lodash-unified)[\\/]/.test(id)) {
            return 'vue';
          }
          // element-plus 全家桶
          if (/[\\/]node_modules[\\/](element-plus|@element-plus)[\\/]/.test(id)) {
            return 'element-plus';
          }
          // lodash 相关
          if (/[\\/]node_modules[\\/](lodash|lodash-es)[\\/]/.test(id)) {
            return 'lodash';
          }

          // 其余按顶层包名分组
          const match = id.match(/node_modules[\\/](?:@[^\\/]+[\\/])?[^\\/]+/);
          if (match) return match[0].replace(/node_modules[\\/]/, '').replace(/[\\/]/g, '-');
        }
      },
    },
    chunkSizeWarningLimit: 800, // 也可以适度调高阈值(治标)
  },
})

