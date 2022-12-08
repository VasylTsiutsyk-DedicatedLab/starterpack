const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const environment = require('./env/dev.env');
const StylelintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackConfig = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  plugins: [
    new StylelintPlugin({
      files: ['src/**/*.{vue,scss}'],
      fix: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
      favicon: path.resolve(__dirname, '../public', 'favicon.ico'),
    }),
    new webpack.EnvironmentPlugin(environment),
    new webpack.HotModuleReplacementPlugin(),
    // new BrowserSyncPlugin(
    //   {
    //     host: 'localhost',
    //     port: 3000,
    //     proxy: 'http://localhost:8080/',
    //   },
    //   {
    //     reload: false,
    //   },
    // ),
  ],
  devServer: {
    historyApiFallback: true,
    port: 8088,
  },
});

module.exports = webpackConfig;
