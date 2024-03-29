'use strict';

let path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './static/js/script.js',
    output: {
        filename: 'bundle.js',
        path:  __dirname + '/static/js'
    },
    watch: true,

    devtool: "source-map",

    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', {
                      debug: true,
                      corejs: 3,
                      useBuiltIns: "usage"
                  }]]
                }
              }
            },
            {
              test: /\.(jpeg|jpg|png|gif)$/i, 
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            }
            
          ]
    },

    plugins: [
      new NodePolyfillPlugin(),
    ]
};