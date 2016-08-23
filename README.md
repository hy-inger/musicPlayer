

## HTML5 音乐播放器
--------------
1. 安装`node`环境和`npm` (需要node 4.5.0或以上)
    ```
        sudo apt-get install nodejs
        sudo apt-get install npm
    ```

2. node版本过低请安装node版本控制工具`n`
    ```
        npm install -g n
    ```
    安装完后输入```n```查看当前已安装node版本以及正在使用的版本(前面带一个```o```)

    安装最新版本
    ```
        n latest
    ```
    安装稳定版本
    ```
        n stable
    ```
3. 全局安装webpack
    ```
        npm install webpack -g
    ```
4. 在项目根目录下安装项目依赖
    ```
        npm install
    ```
5. 运行所需服务器
    ```
        node server.js
    ```
6. 开发模式下运行项目:
    ```
        npm run server
    ```
    打开浏览器,访问端口:localhost:8081
7. 项目打包
    ```
        npm run build
    ```
    打开index.html

## 8.23-更新插件:
--------------
    若无安装请先安装~
    ```
        npm install html-webpack-plugin
    ```
