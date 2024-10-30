/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { ProgressPlugin } = require('webpack');
const WebpackBar = require('webpackbar');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const envFilePath = mode === 'production' ? './.env.production' : './.env.development';

  return {
    entry: './src/index.tsx',
    mode,
    output: {
      filename: 'bundle.[fullhash].js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new Dotenv({
        path: envFilePath
      }),
      new ProgressPlugin(),
      new WebpackBar({
        color: '#85d',
        basic: false,
        profile: false
      })
    ],
    resolve: {
      modules: [__dirname, 'src', 'node_modules'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        pages: path.resolve(__dirname, 'src/pages'),
        shared: path.resolve(__dirname, 'src/shared')
      },
      extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /node_modules/,
          use: ['file-loader']
        }
      ]
    }
  };
};
