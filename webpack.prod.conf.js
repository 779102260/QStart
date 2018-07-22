const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(baseConfig, {
  	mode: 'production',
  	plugins:[
  		new ImageminPlugin({
	    	pngquant: {//图片质量
	        	quality: '95-100'
	    	}
	    })
  	]
});