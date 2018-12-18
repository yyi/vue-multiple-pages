'use strict'
const titles = require('./title.js')
const glob = require('glob')
const pages = {}
glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
module.exports = {
  pages,
  // css: {
  //     extract: true,
  //     modules:false,
  //     loaderOptions: {
  //         css: {
  //             modules:false,
  //             rules: [{
  //                 test: /\.(woff|woff2|eot|ttf|svg)$/,
  //                 loader: 'url-loader',
  //                 options: {
  //
  //                     outputPath: '/fonts/',
  //                     name: '[name].[ext]?[hash]',
  //                 }
  //             }]
  //         }
  //     }
  //
  // },
    css: {
        modules: false,
    },
  outputDir: 'dist',
  chainWebpack: config => config.plugins.delete('named-chunks'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
