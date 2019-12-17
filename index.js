const webpack = require('webpack');
let arr = []
function CommonsChunkPlugin(
    List=[
    'iview',
    'element-ui',
    'axios',
    'vue-router',
    'core-js',
    'async-validator',
    'qs',
    'vue-i18n',
    'vue-style-loader',
    ]
){
  let vendor = new webpack.optimize.CommonsChunkPlugin({
      name: `vendor`,
      minChunks: function (module) {
          // a module is extracted into the vendor chunk if...
          return (
              // it's inside node_modules
              /node_modules/.test(module.context) &&
              // and not a CSS file (due to extract-text-webpack-plugin limitation)
              !/\.css$/.test(module.request)
          )
      }
  });
  arr.push(vendor)
  List.forEach((element) => {
        let obj = new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor-' + element,
            chunks: ['vendor'],
            minChunks: function (module, count) {
                return (
                    module.request.includes(element)
                )
            }
        })
        arr.push(obj)
    })
    return arr;
}
module.exports = CommonsChunkPlugin