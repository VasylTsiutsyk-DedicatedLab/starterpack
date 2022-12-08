const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const helpers = require('./helpers');
const PrerenderSpaPlugin = require('prerender-spa-wp5-plugin');
// const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

const isDev = process.env.NODE_ENV === 'development';

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: './src/main.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      '@': helpers.root('src'),
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer()],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // 4. Inject styles into DOM
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          {
            // 3. Turns css to commonjs
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            // 2. PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer()],
              },
            },
          },
          {
            // 1. Turns scss to css
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: isDev ? 'static/img' : 'content/static/img',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: isDev ? 'static/pdf' : 'content/static/pdf',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      formatter: require('eslint-friendly-formatter'),
      fix: true,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['content/*', 'dist/*'],
    }),
    // new PrerenderSpaPlugin({
      // staticDir: path.join(__dirname, 'dist'),
      // routes: ['/'],
      // renderer: new Renderer({
      //   headless: true,
      //   renderAfterDocumentEvent: 'render-event',
      // }),
    // }),
    new VueLoaderPlugin(),
  ],
};

module.exports = webpackConfig;
