//配置文件
const path = require("path");
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //CSS文件单独提取出来
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
	entry:{
		//不打包：第三方插件 和 公共代码 
		index:[
			'./src/index.js'
		],
		// common:[
		// 	'./src/js/base.js',
		// 	'./src/js/core.js',
		// 	'./src/js/common.js'
		// ]
		
		// grid:'./src/plugins/grid/index.js'//按需加载
	},
	output:{
		//webserve 时是否不再起作用
		path:path.resolve(__dirname,'./dist'),
		filename:'[name].js'
	},
	resolve:{
		alias:{
			src:path.resolve(__dirname, 'src/'),
			components:path.resolve(__dirname, 'src/components/'),	
			images:path.resolve(__dirname, 'src/images/'),	
			css:path.resolve(__dirname, 'src/css/'),	
			actions:path.resolve(__dirname, 'src/redux/actions.js'),
		}
	},
	optimization: {
		//打包 第三方库
		//打包 公共文件
		splitChunks: {
			cacheGroups: {
				vendor:{//node_modules内的依赖库
					chunks:"all",
					test: /[\\/]node_modules[\\/]/,
					name:"vendor",
					minChunks: 1, //被不同entry引用次数(import)
					maxInitialRequests: 5,
					minSize: 0,
					priority:100,
					// enforce: true?
				},
				common:{
					chunks:"all",
					test:/[\\/]src[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
					name: "common", //生成文件名，依据output规则
					minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0,
					priority:2
				},
				// common: { //不引用的打包后并不会执行
				// 	chunks:"all",
				// 	test:/[\\/]src[\\/]js[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
				// 	name: "common", //生成文件名，依据output规则
				// 	minChunks: 1,
				// 	maxInitialRequests: 5,
				// 	minSize: 0,
				// 	priority:1
				// }
			}
		},
		runtimeChunk: {
  			name: 'manifest'
  		}
	},
    module:{
    	rules:[
    	{
    		test: /\.css$/,
	        use: [{ 
	            loader:MiniCssExtractPlugin.loader, //"style-loader" ,// 
	        },{ 
	            loader: "css-loader" 
	        },{
	        	loader: "postcss-loader"
	        }],
	        // include: path.join(__dirname, 'src'), //限制范围，提高打包速度
     	    exclude: /node_modules/
    	},
    	{
		    test: /\.(png|jpg|gif|woff|svg|eot|ttf)\??.*$/,
		    use: [{ 
		        loader: "url-loader",
		        options:{
		            limit: 8192, //单位byte，小于8KB的图片都会被编码(base64)放打包在js中
		            name: '/images/[name].[ext]' //图片复制到指定位置
		        }
		    }]
		},{
		    test: /\.js$/,
		    exclude: /(node_modules)/,//只是节约打包时间，这些文件夹内的js不会babal处理
		    use: {
		        loader: 'babel-loader',
		        options: {
		        	presets: ['env','react'],
		        	plugins:['syntax-dynamic-import','babel-plugin-transform-object-rest-spread'] //syntax-dynamic-import动态语法支持
		        }
		    }
		}]
    },
    plugins:[
	    new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
	    	title: '国际医疗器械设计大会',
	    	template: 'index.html' //模板文件
	    }),
        //CopyWebpackPlugin

        //删除无用代码
        //PurifyCSSPlugin //用于css的tree-shaking

        //似乎并没有什么用，发布时包含在js里有问题吗??--太大
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional（随意）
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),

		//这些变量不必再import了
        new webpack.ProvidePlugin({
            $:'jquery',
            React:'react',
            Component:['react','Component'],
            PureComponent:['react','PureComponent'],
            ReactDOM:'react-dom'
        }),

  	]

}