const removeConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push('transform-remove-console')
}
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        polyfills: [
          'es6.promise',
          'es6.symbol',
          'es6.array.iterator',
          'es7.promise.finally'
        ]
      }
    ]
  ],
  plugins: [...removeConsolePlugin,"@babel/plugin-proposal-optional-chaining"]
}
