/**
 * Webpack Plugins
 */
const helpers = require('./config/helpers');
const webpack = require('webpack');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  entry: helpers.root('index.ts'),

  output: {
    path: helpers.root('bundles'),
    publicPath: '/',
    filename: 'asm-plugin.umd.js',
    library: 'asm-plugin',
    libraryTarget: 'umd'
  },

  // require those dependencies but don't bundle them
  externals: [/^\@angular\//, /^reflect-metadata/, /^rxjs/],

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [helpers.root('node_modules')]
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      options: {
        declaration: false
      },
      exclude: [/\.spec\.ts$/]
    }]
  },

  plugins: [
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src')
    ),

    new LoaderOptionsPlugin({
      options: {
        tslintLoader: {
          emitErrors: false,
          failOnHint: false
        }
      }
    }),

    new CleanWebpackPlugin(['bundles'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    })
  ]
};
