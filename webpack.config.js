var webpack = require('webpack')
var plugins = []
console.log(process.env['CLOUDBOOST_HOSTED'])

var config = {
   entry: './public/app/main.js',
	
   output: {
      path:'./public',
      filename: 'index.min.js',
   },
   devtool: 'source-map',
   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              cacheDirectory: true,
              plugins: ['transform-decorators-legacy',"transform-class-properties"],
              presets: ['es2015', 'react']
            }
         }
      ]
   },
   plugins: (process.env['CLOUDBOOST_HOSTED'] == "true" || process.env['CLOUDBOOST_HOSTED'] == true) ?
                [ new webpack.optimize.UglifyJsPlugin({
                      compress: {
                          warnings: false,
                      },
                      output: {
                          comments: false,
                      },
                  }),
                  new webpack.optimize.DedupePlugin(),
                  new webpack.DefinePlugin({
                      'process.env': {
                          'NODE_ENV': JSON.stringify('production')
                      }
                  })] : []
}

module.exports = config;