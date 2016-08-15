var express = require('express');
var cors = require('cors');
var http = require("http");
var rp = require('request-promise');
var request = require('request');
var app = express();
// 基本接口
const BaiduApi = {
    baseUrl:"http://tingapi.ting.baidu.com/v1/restserver/ting",
    search:"?method=baidu.ting.search.catalogSug&query=",
    play:"?method=baidu.ting.song.play&"
}
// 通用配置
const Qs = {
    format:"json",
    from:"webapp_music",
    calback:"",
}
app.use(cors())
app.get('/search', function(req, res) {
    var qs = {};
    Object.assign(qs,Qs);
    qs.method = "baidu.ting.search.catalogSug";
    qs.query = req.query.query;
    rp({
        uri:BaiduApi.baseUrl,
        qs:qs
    })
    .then(function (data) {
        var song = JSON.parse(data).song;
        return song;
    })
    .then(function(song){
        // 将得到的歌曲id放进一个数组中
        var musArr = [];
        song.forEach(mus=>{
            musArr.push(mus.songid);
        });
        // 获取歌曲详细数据并返回
        rp({
            uri:"http://music.baidu.com/data/music/links",
            qs:{
                songIds:musArr.join(","),
            }
        })
        .then(function (data) {
            res.send(JSON.parse(data))
        })
    })
    .catch(function (err) {
        console.log(err);
        // Crawling failed...
    });
});
// 获取歌曲实际数据后返回给前端
app.get('/proxy', function(req, res) {
    var uri = req.query.url;
    request.get(uri,{encoding:null},function(err,response,body){
        res.send(body)
    })
});
app.get('/', function(req, res) {
  res.send('hello world');
});


app.listen(4000,()=>{console.log("------------server start---------------");})
