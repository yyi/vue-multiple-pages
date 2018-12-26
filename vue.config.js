'use strict'
const titles = require('./title.js')
const glob = require('glob')
const fs = require('fs')
const pages = {}
glob.sync('./src/pages/**/app.js').forEach(path => {
  let chunk = path.split('./src/pages/')[1].split('/app.js')[0]

  let templatePath = path.replace(
    /app.js/,
    (chunk.lastIndexOf('/') === -1
      ? chunk
      : chunk.substring(chunk.lastIndexOf('/') + 1)) + '.html'
  )
  let template = fsExistsSync(templatePath) ? templatePath : 'public/index.html'
  let htmlFileName = template.substring(
    template.lastIndexOf('/'),
    template.lastIndexOf('.')
  )
  chunk = chunk !== 'app.js' ? chunk + htmlFileName : 'index'
  console.log(chunk)
  pages[chunk] = {
    entry: path,
    template: template,
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
    modules: false
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
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}
