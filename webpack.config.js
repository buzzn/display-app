const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const DashboardPlugin = require('webpack-dashboard/plugin');

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
  devtool: 'sourcemap',
  entry: [
    'babel-polyfill',
    'bootstrap-loader',
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [["es2015", { "modules": false }], 'stage-0', 'react'],
          plugins: ['react-hot-loader/babel'],
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
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      d3: 'd3',
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new DashboardPlugin(),
  ],
};
