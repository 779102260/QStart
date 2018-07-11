const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  	mode: 'development',
    devtool: 'inline-source-map',
  	devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        
        //这些变量不必再import了
        new webpack.ProvidePlugin({
            React:'react',
            Component:['react','Component'],
            PureComponent:['react','PureComponent'],
            ReactDOM:'react-dom',
            connect:['react-redux','connect'],
        })
    ]
});