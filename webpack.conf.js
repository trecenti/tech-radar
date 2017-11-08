const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: {
    "tech-radar": ['babel-polyfill', './src/index.js'],
    "tech-radar.min": ['babel-polyfill', './src/index.js'],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    libraryTarget: "umd",
    library: 'TechRadar'
  },
  resolve: {
    alias: {
      d3: path.resolve(__dirname, 'node_modules/d3'),
      chance: path.resolve(__dirname, 'node_modules/chance')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', 'stage-0']
          ]
        }
      }]
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      sourceMap: true
    })
  ]
};
