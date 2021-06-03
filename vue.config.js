const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  css: { extract: false },
  outputDir: 'docs',
  publicPath: isProd ? './' : '/',
  configureWebpack: {
    entry: './example/main.ts',
    output: {
      chunkFilename: '[id].js'
    },
    resolve: {
      // 设置别名
      alias: {
        'el-plus-form': path.resolve(__dirname, './lib')
      }
    },
    externals: {
      // 'element-plus': 'element-plus'
    }
  }
}