const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
      {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]",
      },
      {
        test: /\.woff2$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]",
      },
      {
        test: /\.(eot|ttf|svg|gif|png)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      d3: 'd3',
    }),
  ],
  postcss() {
    return [
      autoprefixer({ browsers: ['last 3 versions'] }),
      require('postcss-flexbugs-fixes'),
    ];
  },
};
