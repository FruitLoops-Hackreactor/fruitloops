import path from 'path'
import DotenvWebpackPlugin from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

/** @type {import('webpack').Configuration} */
export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  entry: path.join(process.cwd(), 'src/index.jsx'),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
  },
  cache: { type: 'filesystem' },
  devtool: 'source-map',
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
    // Custom alias to allow easy reference to the /src directory for imports
    alias: {
      '@': path.join(process.cwd(), 'src'),
    },
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
              transform: {
                react: { runtime: 'automatic' },
              },
              // Required for the loader to parse JSX
              parser: { jsx: true },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin({ systemvars: true }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(process.cwd(), 'src/index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin(),
  ],
}
