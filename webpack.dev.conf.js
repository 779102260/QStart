const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  	mode: 'development',
    devtool: 'inline-source-map',
  	devServer: {
        contentBase: './dist',
        hot: true,
        host: "0.0.0.0"
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        
    ]
});