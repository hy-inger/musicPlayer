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
};
// 通用配置
const Qs = {
    format:"json",
    from:"webapp_music",
    calback:"",
};

// 设置允许跨域
app.use(cors());
// 搜索接口,用于搜索歌词,调用百度音乐api
app.get('/search', function(req, res) {
    var qs = {};
    Object.assign(qs,Qs);
    qs.format = Qs.format;
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
    // 将得到的歌曲列表进行歌曲详情查询,并放入数组,返回最终歌曲信息
    .then(function(song){
        // 将得到的歌曲id放进一个数组中
        var musArr = [];
        song.forEach(function(mus){
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
            console.log("----------get music ---------");
            res.send(JSON.parse(data));
        });
    })
    .catch(function (err) {
        console.log(err);
        // Crawling failed...
    });
});

// 根据歌曲ID获取歌词
app.get("/lrc",function(req,res){
    let songId = req.query.songId;
    let qs = {};
    Object.assign(qs,Qs);
    qs.format = Qs.format;
    qs.method = "baidu.ting.song.lry";
    qs.songid=songId;
    rp({
        uri:BaiduApi.baseUrl,
        qs:qs
    }).then(function(data){
        res.send(data);
    });
});

// 获取歌曲实际数据后返回给前端
app.get('/proxy', function(req, res) {
    var uri = req.query.url;
    req.pipe(request(uri)).pipe(res);
});
app.get('/', function(req, res) {
  res.send('hello world');
});


app.listen(4000,function(){console.log("------------server start---------------");});
