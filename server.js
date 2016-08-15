var express = require('express');
var cors = require('cors');
var http = require("http");
var rp = require('request-promise');
var request = require('request');
var app = express();
const BaiduApi = {
    baseUrl:"http://tingapi.ting.baidu.com/v1/restserver/ting",
    search:"?method=baidu.ting.search.catalogSug&query=",
    play:"?method=baidu.ting.song.play&"
}
const Qs = {
    format:"json",
    from:"webapp_music",
    calback:"",
}
function getMusic(musicArr){
    var result = [];
    musicArr.forEach(mus=>{
        result.push(mus.songid);
    })
    musicArr.forEach(mus=>{
        var pro = rp({
            uri:"http://music.baidu.com/data/music/links",
            qs:{
                songIds:mus.songid,
            }
        });
        result.push(pro)
        // .then(function (data) {
        //     result.push(JSON.parse(data))
        //     console.log("--->",result);
        // })
        // .catch(function (err) {
        //     console.log(err);
        //     // Crawling failed...
        // });
    });
    Promise.all(result)
    console.log(result);
    return result;
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
        var musArr = [];
        song.forEach(mus=>{
            musArr.push(mus.songid);
        });
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
app.get('/proxy', function(req, res) {
    var uri = req.query.url;
    console.log(req.query);
    console.log(uri);
    request.get(uri,{encoding:null},function(err,response,body){
        // console.log(response);
        console.log(body);
        res.send(body)
    })
});
app.get('/', function(req, res) {
  res.send('hello world');
});


app.listen(4000,()=>{console.log("server start");})

"http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=10&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=陈奕迅"
