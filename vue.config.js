const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 引用node核心模块，且不需要polyfill。
  // 因为webpack5之后不再自动pollyfill node核心模块
  configureWebpack: {
    resolve: {
      alias: {
        path: require.resolve('path-browserify')
      }
    }
  },
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      // koa的默认端口为3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
