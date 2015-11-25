var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var entryTs = path.resolve('./src/client/index.ts');
var entryOut = path.resolve('./build/client');
var indexHtml = path.resolve('./src/client/index.html');

module.exports = {
  entry: entryTs,
  output: {
    path: entryOut,
    filename: 'bundle-[hash:6].js',
    sourceMapFilename: 'bundle-[hash:6].js.map'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=templates/[name]-[hash:6].html'
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
    }, {
      test: /\.ts$/,
      exclude: /(node_modules)/,
      loader: "ng-annotate?add=false!babel!ts-loader"
    }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=100000&mimetype=image/png'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: indexHtml,
      inject: 'body'
    })
  ],
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.webpack.js', '.ts', '.js']
  }
};