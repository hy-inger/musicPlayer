import webpack from "webpack";
module.exports = {
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
            loader: 'babel'
        },
        //  { test: require.resolve('./src/js/query.js'), loader: "expose?$q" },
        {
            test: /\.scss$/,
            loaders: ["style", "css", "sass?sourceMap"]
        }]
    },
    plugins: [
        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        // new  webpack.optimize.CommonsChunkPlugin('common.js')  // 提取公用模块
    ]
}
