import webpack from "webpack";
// const webpack = require("webpack");
module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: './src/main.js', // 主入口文件
    output: {
        path: __dirname,
        filename: 'bundle.js', // 主入口打包文件路径
        // chunkFilename: "[name].bundle.js" // 非主入口打包文件路径,如分片
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    },
    postcss: [
    require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        // new  webpack.optimize.CommonsChunkPlugin('common.js')  // 提取公用模块
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
}
