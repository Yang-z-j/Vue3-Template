import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

/**
 * 详情见 vitejs 文档：https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入依赖
    AutoImport({
      resolvers: [ElementPlusResolver()], // 组件解析器
      imports: ['vue', 'vue-router', 'pinia'], // 自动引入vue和vue-router
      dirs: ['./src/axios/**', './src/store/**', './src/utils/**', './src/router/**'], // 自动引入目录文件
      dts: 'src/auto-imports.d.ts' // 生成自动引入文件位置
    }),
    // 自动引入组件
    Components({
      resolvers: [ElementPlusResolver()], // 组件解析器
      dirs: ['./src/components', './src/views'], // 自动引入目录文件
      extensions: ['vue'], // 组件后缀
      deep: true, // 搜索子目录
      dts: 'src/components.d.ts' // 生成自动引入文件位置
    })
  ],
  build: {
    // sourcemap: true, // 输出 source map 文件
    outDir: 'dist', //指定输出路径
    rollupOptions: {
      output: {
        // 分块打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 找到node_modules下大文件模块分块打包
            const arr = id.toString().split('node_modules/')[1].split('/');
            switch (arr[0]) {
              case '@vue':
              case 'element-plus': // UI 库
              case '@element-plus': // 图标
                return '_' + arr[0];
              default:
                return '__vendor';
            }
          }
        },
        // vite打包结构控制
        entryFileNames: 'static/js/[name]-[hash].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return 'static/css/[name]-[hash].css';
          }
          if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp'].some(ext => assetInfo.name.endsWith(ext))) {
            return 'static/img/[name]-[hash][extname]';
          }
          return 'static/assets/[name]-[hash][extname]';
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') // 路径别名
    }
  }
});
