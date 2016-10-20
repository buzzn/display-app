const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [
        autoprefixer({ browsers: ['last 3 versions'] }),
        flexbugsFixes,
      ];
    },
  },
};

module.exports = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build/public/assets'),
    publicPath: '/assets/',
    filename: 'bundle-[hash].min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [["es2015", { "modules": false }], 'stage-0', 'react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style',
          'css',
          postcssLoader,
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style',
          'css',
          'sass',
          postcssLoader,
        ],
      },
      {
        test: /\.woff?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]',
      },
      {
        test: /\.(eot|ttf|svg|gif|png)(\?[\s\S]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      d3: 'd3',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: '../index.html',
    }),
    new ExtractTextPlugin('bundle-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
