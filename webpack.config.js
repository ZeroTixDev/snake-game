'use strict';
const path = require('path');
/* const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const plugins = [
   new HtmlWebpackPlugin({
      hash: true,
      title: 'lol',
      template: './src/template.html',
      filename: './index.html',
      minify: {
         removeComments: true,
         collapseWhitespace: true,
      },
   }),
   new CleanWebpackPlugin(),
   /* new BundleAnalyzerPlugin(), */
];
module.exports = {
   entry: './src/index.js',
   mode: 'production',
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jp(e*)g|svg)$/,
            use: [
               {
                  loader: 'url-loader',
                  options: {
                     limit: 8000, // Convert images < 8kb to base64 strings
                     name: 'images/[hash]-[name].[ext]',
                  },
               },
            ],
         },
      ],
   },
   plugins,
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
   },
};
