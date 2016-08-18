import webpack from "webpack";
import path from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";//将css分离到独立的文件插件
//var ignore = new webpack.IgnorePlugin(new RegExp("/(node_modules|ckeditor)/"));
// const webpack = require("webpack");
module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: './src/main.js', // 主入口文件
    output: {
        path: './build',
        filename: '[name].js?[hash]', // 主入口打包文件路径
        // chunkFilename: "[name].bundle.js" // 非主入口打包文件路径,如分片
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test:/\.scss$/,
            loader:ExtractTextPlugin.extract("css!sass?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib!postcss")),
        }
        /*{
            test: /\.scss$/,
            //webpack编译compass须安装compass-mixins模块,再指定路径.
            loader: "style!css!sass?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib"),
        }*/]
    },
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    plugins: [
        //允许错误不打断程序
        //ignore,
        new webpack.NoErrorsPlugin(),
        // new  webpack.optimize.CommonsChunkPlugin('common.js')  // 提取公用模块
        //new webpack.HotModuleReplacementPlugin(),//热加载插件
        new ExtractTextPlugin("[name].css"),//生成独立的css文件名
    ]
}
