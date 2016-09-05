require("./sass/style.scss");
// require("../index.html");
var Range = require("./js/range.js");
var { Store, Dispatch } = require("./js/ctrl.js");
window.player = Store.state.player;  // 仅提供给控制台查看对象
// 配置播放器
Dispatch('SET_CONFIG',{
    ended:playMusic
});
Dispatch("SEARCH", "陈奕迅", function(musicList) {
    // 创建搜索列表
    createSearchList(musicList);
});
$q("button[name='play']").on('click', function(event) {
    event.preventDefault();
    // 分发改变当前播放状态事件
    Dispatch("CHANGE_STATE");
});
$q("button[changebtn]").on('click', function(event) {
    var type = $q(this).attr("action-type");
    if (type === 'next') {
        // 分发下一首音乐事件,并使用回调改变播放列表中的active状态
        Dispatch("LOAD_MUSIC","next",playMusic);
    } else {
        // 分发上一首音乐事件,并使用回调改变播放列表中的active状态
        Dispatch("LOAD_MUSIC","prev",playMusic);
    }
});
$q("#search-btn").on('click', function(event) {
    var val = $q("#search-input").val();
    // 分发搜索音乐事件
    Dispatch("SEARCH", val, function(musicList) {
        createSearchList(musicList);
    });
});

$q("#player").on("pause", function() {
    $q("button[name='play']").removeClass("icon-pause").addClass("icon-play2");
}).on("play", function() {
    $q("button[name='play']").removeClass("icon-play2").addClass("icon-pause");
});


var songRange = new Range('song-range', 'tool-bar', function(progress){
    $q("#player")[0].currentTime = parseInt($q("#player")[0].duration*progress);
});

$q("#player").on('timeupdate', function(){
    $q('#current-time').text(timeFilter(this.currentTime));
    var progress = (this.currentTime/this.duration)*100;
    songRange.toPos(progress);
});

var volRange = new Range('vol-range', 'tool-bar', function(progress){
    Dispatch("CHANGE_VOLUME", parseInt(progress*100));
    if(progress == 0){
        $q('#vol-icon').removeClass().addClass('icon-volume-mute');
    }else if (progress > 0 && progress <= 0.3) {
        $q('#vol-icon').removeClass().addClass('icon-volume-low');
    }else if (progress > 0.3 && progress <= 0.7) {
        $q('#vol-icon').removeClass().addClass('icon-volume-medium');
    }else if (progress > 0.7 ) {
        $q('#vol-icon').removeClass().addClass('icon-volume-high');
    }
}, 100);

$q("#loop-ctrl").on('click', function(){
    var loopNum = $q(this).data('loop');
    if(++loopNum > 4) loopNum = 1;
    $q(this).removeClass().addClass('icon-loop'+loopNum);
    $q(this).data('loop', loopNum);
    switch(loopNum) {
        case 1:
          Dispatch("CHANGE_PLAY_MOD", "order");
          $q("#loop-mod").text('列表循环');
          break;
        case 2:
          Dispatch("CHANGE_PLAY_MOD", "loop");
          $q("#loop-mod").text('单曲循环');
          break;
        case 3:
          Dispatch("CHANGE_PLAY_MOD", "list");
          $q("#loop-mod").text('顺序播放');
          break;
        case 4:
          Dispatch("CHANGE_PLAY_MOD", "range");
          $q("#loop-mod").text('随机播放');
          break;
    }


});

$q(".list-show").on('click', function(){
    $q(this).css('display', 'none');
    $q("#song-list").css('display', 'inline-block');
    $q(".list-hide").css('display', 'inline-block');
});
$q(".list-hide").on('click', function(){
    $q(this).css('display', 'none');
    $q("#song-list").css('display', 'none');
    $q(".list-show").css('display', 'inline-block');
});




// 根据获取的音乐数据构造音乐列表
function createSearchList(musicList) {
    if (typeof musicList !== 'undefined' && musicList.length >0 ) {
        // 刷新当前搜索列表数据
        Dispatch("REFRESH_SEARCH_LIST", musicList);
        // 构造音乐列表,此处应提供回调函数给main.js调用.并且操作相应的dom元素
        var tbody = "";
        musicList.forEach((music, index) => {
            tbody += `<tr data-index="${index}"><td>${index}</td><td>${music.songName}</td><td>${music.artistName}</td><td>${music.albumName}</td><td>${Math.floor(music.time/60)}:${Math.floor(music.time%60)}</td></tr>`;
        });
        $q(".search-list tbody").html(tbody);
        // 搜索音乐列表双击播放事件
        $q(".search-list tbody tr").on('dblclick', function(event) {
            var index = $q(this).data("index");
            // 从搜索列表中添加音乐到播放列表并播放
            Dispatch("ADD_MUSIC", index, function(music) {
                // 判断音乐是否已存在dom，存在dom说明是已经存在于播放列表当中，不存在dom则为新增歌曲
                if(!music.dom){
                    // 添加并绑定dom
                    createMusicDom(music);
                }
                // 改变当前播放列表的active状态
                Dispatch('LOAD_MUSIC',music,playMusic);
            });
        }).on("click", function() {
            $q(".search-list tbody tr").removeClass('active');
            // 从搜索列表单击只能触发选中状态
            $q(this).addClass('active');
        });
    }else {
        alert("暂无相关关键词信息")
    }
}


// 为新加入到播放列表的音乐创建和绑定dom
function createMusicDom(music){
    var index = $q(".song-list li").length+1;
    var time = timeFilter(music.info.time);
    var li = `<li><span class="index">${index}</span><span class="song-name">${music.info.songName}</span><span class="singer-name">${music.info.artistName}</span><span class="time">${time}</span><i class="rm "></i></li>`;
    var dom = $q.parseHTML(li);
    music.dom = dom;
    $q(dom).on('click', function(event) {
        event.preventDefault();
        Dispatch("LOAD_MUSIC",music,playMusic);
    });
    $q(dom).find(".rm").on('click', function(event) {
        event.stopPropagation();
        Dispatch("REMOVE_MUSIC",music,(rm,list)=>{
            $q(rm.dom).remove();
        });
    });
     $q(".song-list")[0].appendChild(dom);
}



/**
 * 切换当前播放音乐时候播放列表中进行的dom操作
 * 包括添加删除active状态,获取并处理lrc歌词
 * @param  {[type]} music [歌曲对象]
 * @return {[type]}       [description]
 */
function playMusic(music){
    $q('#duration').text(timeFilter(music.info.time));
    $q('#song-info .song-name').text(music.info.songName)[0].setAttribute('title', music.info.songName);
    $q('#song-info .singer-name').text(music.info.artistName)[0].setAttribute('title', music.info.artistName);
    $q('.music-icon')[0].src = music.info.songPicSmall;
    $q('.music-icon').on('load', function(){
        $q('#dynamic-bg').css('background', 'url('+music.info.songPicSmall+') 50% 50% / cover no-repeat');
    });
    // dynamicBg.changeBg(music.info.songPicRadio);
    
    $q('.song-list li').removeClass('active');
    $q(music.dom).addClass('active');
    var songId = music.info.songId;
    fetch("http://localhost:4000/lrc?songId="+songId,{
        mod:"cors"
    })
    .then((res)=>res.json())
    .then((lrc)=>{
        console.log(lrc);
    });
}

function timeFilter(time) {
    var t = Number(time);
    var mins = parseInt(t/60),
        secs = parseInt(t%60);
    mins = mins>=10 ? mins : '0' + mins;
    secs = secs>=10 ? secs : '0' + secs;
    return   mins + ':' + secs; 
}

