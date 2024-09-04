const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();
// Remove the 'fs' import if not used elsewhere
// const fs = require('fs');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    host: process.env.HOST || 'localhost', // Use environment variable or default to localhost
    // Remove or comment out the 'server' property to disable HTTPS
    // server: {
    //   type: 'https',
    //   options: {
    //     key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    //     cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
    //   },
    // },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
};
