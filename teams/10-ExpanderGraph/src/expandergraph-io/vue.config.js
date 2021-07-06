const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const productionPath = '/yourProjectPath';
module.exports = {
    publicPath: IS_PROD ? productionPath : '/',
    assetsDir: 'static',
    // 如果格式不统一编译不过
    // lintOnSave: false
    // devServer: {
    //     proxy:{ // 配置跨域
    //         '/token':{
    //             target:'http://124.70.162.70:5000',
    //             ws:true,
    //             changeOrigin:true,// 允许跨域

    //       },
    //        '/address':{
    //             target:'http://124.70.162.70:5000',
    //             ws:true,
    //             changeOrigin:true,// 允许跨域

    //         }
    //     }
    // }

};
