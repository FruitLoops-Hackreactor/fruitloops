/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  target: 'web',
  entry: ['webpack/hot/dev-server', path.join(__dirname, 'src/index.jsx')],
  output: {
    path: path.resolve(__dirname, '/dist'),
  },
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    hot: true,
    port: 3000,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      publicPath: '/assets',
    },
    historyApiFallback: {
      verbose: true,
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              // Required for the loader to parse JSX
              parser: {
                jsx: true,
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src/index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
}
