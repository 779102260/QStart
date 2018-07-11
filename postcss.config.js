module.exports = {
    plugins: {
        // 'autoprefixer': {
        //     browsers: 'last 5 version' // 代表意思为每个主流浏览器的最后5个版本
        // },
        'postcss-cssnext':{
            
        },
        'postcss-pxtorem':{
		    rootValue: 14, //你在html节点设的font-size大小
		    unitPrecision: 5, //转rem精确到小数点多少位
		    propList: ['*'],//指定转换成rem的属性，支持 * ！
		    selectorBlackList: [],// str/reg 指定不转换的选择器，str时包含字段即匹配
		    replace: true,
		    mediaQuery: false, //媒体查询内的px是否转换
		    minPixelValue: 0 //小于指定数值的px不转换
        }
    }
}