require("expose?$q!./query.js");

let lrc_content="[00:01.75]牵丝戏\n[00:03.89]作曲：银临\n[00:06.44]编/混：灰原穷\n[00:09.53]填词：Vagary\n[00:12.40]演唱：银临&Aki阿杰\n[00:16.08]海报：苏澈白\n[00:18.77]\n[00:23.65]银临：嘲笑谁恃美扬威 没了心如何相配\n[00:34.50]盘铃声清脆 帷幕间灯火幽微\n[00:40.20]我和你 最天生一对\n[00:44.95]\n[00:46.25]没了你才算原罪 没了心才好相配\n[00:56.84]你褴褛我彩绘 并肩行过山与水\n[01:02.45]你憔悴 我替你明媚\n[01:07.21]\n[01:08.21]是你吻开笔墨 染我眼角珠泪\n[01:13.70]演离合相遇悲喜为谁\n[01:19.00]他们迂回误会 我却只由你支配\n[01:24.72]问世间哪有更完美\n[01:29.37]\n[01:30.18]Aki：兰花指捻红尘似水\n[01:35.68]三尺红台 万事入歌吹\n[01:41.25]唱别久悲不成悲 十分红处竟成灰\n[01:47.21]愿谁记得谁 最好的年岁\n[01:52.80]\n[02:14.72]银临：你一牵我舞如飞 你一引我懂进退\n[02:25.95]苦乐都跟随 举手投足不违背\n[02:31.68]将谦卑 温柔成绝对\n[02:36.63]\n[02:37.42]你错我不肯对 你懵懂我蒙昧\n[02:42.88]心火怎甘心扬汤止沸\n[02:48.14]你枯我不曾萎 你倦我也不敢累\n[02:53.98]用什么暖你一千岁\n[02:58.78]\n[02:59.28]Aki：风雪依稀秋白发尾\n[03:27.21][03:04.96]灯火葳蕤 揉皱你眼眉\n[03:32.64][03:10.47]假如你舍一滴泪 假如老去我能陪\n[03:38.67][03:16.45]烟波里成灰 也去得完美\n[03:21.53]风雪依稀秋白发尾\n[03:45.35]";
const browser_anim_end = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            browser_anim_start = 'webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart';
/*setTimeout(function(){
    let next_lyric = $q('.lrc-list .active').next('.lyric');
    console.log(next_lyric);
},2000);*/

// 解析歌词
parseLrc(lrc_content);
function parseLrc(lrc_content){
    let lyric_list = lrc_content.split('\n');
    let lyric_obj = {}
    for(let lyric of lyric_list){
        let reg = /\[\d*\:\d*(\.|\:)\d*\]/gy,
                time_arr = lyric.match(reg),
                content = lyric.replace(reg,'');
        for(let time_arr of time_arr){
            lyric_obj[time_arr] = content;
        }
    }
    console.log(lyric_obj);
}
// 歌词滚动
scrollLrc();
function scrollLrc(){
    var timer  = setTimeout(function(){
        $q('.lrc-list').css('animation-name','scrollUp');
        scrollLrc();
        clearTimeout(timer);
    },2000);
}

let lrc_list = $q('.lrc-list');

function lrcScrollStart(e){
    let active_lyric = $q('.lrc-list .active'),
        next_lyric = $q(active_lyric.next('.lyric'));
        active_lyric.removeClass('active');
        next_lyric.addClass('active');
    //lrc_list.unbind('webkitAnimationStart',lrcScrollStart);
}
function lrcScrollEnd(e){

}
lrc_list.on('webkitAnimationStart',lrcScrollStart)
lrc_list.on('webkitAnimationEnd',function(e){
    let active_lyric = $q('.lrc-list .active'),
            index = parseInt(active_lyric.attr('data'));
    //lrc_list.css('animation-name','').css('top',-(index-2)*0.35+'rem');
    //e.target.style.top = -(index-2)*0.35+'rem';

})