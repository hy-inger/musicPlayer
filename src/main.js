require("./sass/style.scss");
// require("../index.html");
var Range = require("./js/range.js");
var Lyric = require("./js/lrc.js");
var { Store, Dispatch } = require("./js/ctrl.js");
window.player = Store.state.player;  // 仅提供给控制台查看对象
// 配置播放器

(function(doc, win) {
    var docEl = doc.documentElement;
    var remcalc = function() {
        var currClientWidth = docEl.clientWidth;
        var fontValue;
        var deviceHeight = doc.documentElement.clientHeight;
        if (!currClientWidth) return;
        fontValue = ((10 * currClientWidth) / 192).toFixed(2);
        if (fontValue < 70) fontValue = 70;
        doc.documentElement.style.fontSize = fontValue+'px';
    };

    remcalc();
    
    if (!docEl.addEventListener) return;
    win.addEventListener('resize', remcalc, false);
    doc.addEventListener('DOMContentLoaded', remcalc, false);
})(document, window);


Dispatch('SET_CONFIG',{
    ended:playMusic
});
Dispatch("SEARCH", "东篱", function(musicList) {
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
    $q("#circle").css('animation-play-state', 'paused');
    $q("#tonearm-img").addClass('pause');
}).on("play", function() {
    $q("button[name='play']").removeClass("icon-play2").addClass("icon-pause");
    $q("#circle").css('animation-play-state', 'running');
    $q("#tonearm-img").removeClass('pause');
});


var lrc_content="[00:01.75]牵丝戏\n[00:03.89]作曲：银临\n[00:06.44]编/混：灰原穷\n[00:09.53]填词：Vagary\n[00:12.40]演唱：银临&Aki阿杰\n[00:16.08]海报：苏澈白\n[00:18.77]\n[00:23.65]银临：嘲笑谁恃美扬威 没了心如何相配\n[00:34.50]盘铃声清脆 帷幕间灯火幽微\n[00:40.20]我和你 最天生一对\n[00:44.95]\n[00:46.25]没了你才算原罪 没了心才好相配\n[00:56.84]你褴褛我彩绘 并肩行过山与水\n[01:02.45]你憔悴 我替你明媚\n[01:07.21]\n[01:08.21]是你吻开笔墨 染我眼角珠泪\n[01:13.70]演离合相遇悲喜为谁\n[01:19.00]他们迂回误会 我却只由你支配\n[01:24.72]问世间哪有更完美\n[01:29.37]\n[01:30.18]Aki：兰花指捻红尘似水\n[01:35.68]三尺红台 万事入歌吹\n[01:41.25]唱别久悲不成悲 十分红处竟成灰\n[01:47.21]愿谁记得谁 最好的年岁\n[01:52.80]\n[02:14.72]银临：你一牵我舞如飞 你一引我懂进退\n[02:25.95]苦乐都跟随 举手投足不违背\n[02:31.68]将谦卑 温柔成绝对\n[02:36.63]\n[02:37.42]你错我不肯对 你懵懂我蒙昧\n[02:42.88]心火怎甘心扬汤止沸\n[02:48.14]你枯我不曾萎 你倦我也不敢累\n[02:53.98]用什么暖你一千岁\n[02:58.78]\n[02:59.28]Aki：风雪依稀秋白发尾\n[03:27.21][03:04.96]灯火葳蕤 揉皱你眼眉\n[03:32.64][03:10.47]假如你舍一滴泪 假如老去我能陪\n[03:38.67][03:16.45]烟波里成灰 也去得完美\n[03:21.53]风雪依稀秋白发尾\n[03:45.35]";
var lrc_content_2 = "[ti:反转地球]\n[ar:潘玮柏]\n[al:反转地球]\n\n[00:01.99]反转地球\n[00:04.90]演唱：潘玮柏\n[00:07.93]\n[00:13.46]Bow bow bow\n[00:14.39]让我看到你双手\n[00:16.01]对抗地心引力一起反转地球\n[00:18.68]Bow bow bow\n[00:19.74]现在不适合罗嗦\n[00:21.37]适者生存不然请你离开这节奏\n[00:24.03]Bow bow bow\n[00:25.11]让我看到你点头\n[00:26.68]跟着我的音乐一起跳舞准没错\n[00:29.43]Bow bow bow\n[00:30.58]现在不适合闪躲\n[00:31.97]正面出击看我怎么反转地球\n[00:34.67]睁开双眼看穿地球\n[00:36.27]赤裸的一片天空\n[00:37.62]我摊开双手接受所有最原始的节奏\n[00:40.22]有没有感到心情放松\n[00:41.59]有没有感到细胞跳动\n[00:42.99]节奏的变化,身体的摆动\n[00:44.40]让你全身放松\n[00:45.59]现在起不能罗嗦\n[00:47.19]踏进我的领域之中\n[00:48.53]频率太震撼\n[00:49.15]你的心脏正在此起彼落\n[00:50.79]跟着我走跟着我做跟我点头摆动双手\n[00:53.40]世界的一切的转动连结到我的音乐紧跟着我的脚步在走\n[00:56.23]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[00:58.78]别想压抑我们定意世界的传统\n[01:01.29]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:04.06]没有对或错我只想潜入这节奏\n[01:06.92]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:09.43]音乐没有自由仿佛坠进了黑洞\n[01:11.98]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:14.69]现在跟着我们创造新世纪的秩序\n[01:17.43]Bow bow bow\n[01:18.74]让我看到你双手\n[01:20.33]对抗地心引力一起反转地球\n[01:22.33]Bow bow bow\n[01:23.66]现在不适合罗嗦\n[01:25.37]适者生存不然请你离开这节奏\n[01:28.04]Bow bow bow\n[01:29.16]让我看到你点头\n[01:30.86]跟着我的音乐一起跳舞准没错\n[01:33.27]Bow bow bow\n[01:34.42]现在不适合闪躲\n[01:35.74]正面出击看我怎么反转地球\n[01:37.74]\n[01:41.57]一道音波划破天空\n[01:42.82]在我的领域不停播送\n[01:44.21]激发出的热情不能抵挡你竖起的耳朵的诱惑\n[01:46.91]你停不停你动不动全部在我掌控之中\n[01:49.45]你知不知道地心引力在这永远拉不住我\n[01:52.15]当音乐力量合二为一创造出新的世界秩序\n[01:54.97]不跟随的人闭上你的....SHHH\n[01:57.73]有别的比那更好的吗\n[01:58.87]有别的比那更出色吗\n[02:00.39]有别的比我们向往追求的音乐更独特的吗\n[02:02.39]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:05.47]别想压抑我们定意世界的传统\n[02:07.77]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:10.72]没有对或错我只想潜入这节奏\n[02:13.00]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:16.24]音乐没有自由仿佛坠进了黑洞\n[02:18.48]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:21.13]现在跟着我们创造新世纪的秩序\n[02:24.01]Bow bow bow\n[02:25.19]让我看到你双手\n[02:26.66]对抗地心引力一起反转地球\n[02:29.33]Bow bow bow\n[02:30.42]现在不适合罗嗦\n[02:32.09]适者生存不然请你离开这节奏\n[02:34.67]Bow bow bow\n[02:35.76]让我看到你点头\n[02:37.55]跟着我的音乐一起跳舞准没错\n[02:40.01]Bow bow bow\n[02:41.32]现在不适合闪躲\n[02:42.68]正面出击看我怎么反转地球\n[02:45.40]Bow bow bow\n[02:46.42]让我看到你双手\n[02:48.01]对抗地心引力一起反转地球\n[02:50.71]Bow bow bow\n[02:51.74]现在不适合罗嗦\n[02:53.38]适者生存不然请你离开这节奏\n[02:56.05]Bow bow bow\n[02:57.01]让我看到你点头\n[02:58.77]跟着我的音乐一起跳舞准没错\n[03:01.39]Bow bow bow\n[03:02.50]现在不适合闪躲\n[03:04.11]正面出击看我怎么反转地球\n[03:06.71]"


var audio = $q('#player'),
    lrc_container = $q('.lrc-container'),
    lrc_list = $q('.lrc-list');
var lyric = new Lyric(audio,lrc_list,lrc_container,lrc_content_2);


var songRange = new Range('song-range', 'tool-bar', function(progress){
    $q("#player")[0].currentTime = parseInt($q("#player")[0].duration*progress);
    lyric.dragToLrc($q("#player")[0].currentTime);
});

$q("#player").on('timeupdate', function(){
    $q('#current-time').text(timeFilter(this.currentTime));
    var progress = (this.currentTime/this.duration)*100;
    songRange.toPos(progress);
    lyric.scrollTopLrc(Math.floor(this.currentTime));
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
})




// 根据获取的音乐数据构造音乐列表
function createSearchList(musicList) {
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
    $q('#circle').removeClass().addClass('fly-out');
    $q('#duration').text(timeFilter(music.info.time));
    $q('#song-info .song-name').text(music.info.songName)[0].setAttribute('title', music.info.songName);
    $q('#song-info .singer-name').text(music.info.artistName)[0].setAttribute('title', music.info.artistName);
    $q('.music-icon')[0].src = music.info.songPicRadio;
    $q('.music-icon').on('load', function(){
        $q('#dynamic-bg').css('background', 'url('+music.info.songPicRadio+') 50% 50% / cover no-repeat');
        
    });
    setTimeout(function () {
         $q('#cover-img')[0].src = music.info.songPicRadio;
         setTimeout(function(){
            $q('#circle').removeClass('fly-out').addClass('circle-rotate');
         }, 1450);
    }, 1250);
    
    
    $q('.song-list li').removeClass('active');
    $q(music.dom).addClass('active');
    var songId = music.info.songId;
    fetch("http://localhost:4000/lrc?songId="+songId,{
        mod:"cors"
    })
    .then((res)=>res.json())
    .then((lrc)=>{
        console.log(lrc);
        lyric.init(lrc_list, lrc.lrcContent)
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

