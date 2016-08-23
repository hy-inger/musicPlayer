require("expose?$q!./query.js");
require("./request-animate.js");

//let lrc_content="[00:01.75]牵丝戏\n[00:03.89]作曲：银临\n[00:06.44]编/混：灰原穷\n[00:09.53]填词：Vagary\n[00:12.40]演唱：银临&Aki阿杰\n[00:16.08]海报：苏澈白\n[00:18.77]\n[00:23.65]银临：嘲笑谁恃美扬威 没了心如何相配\n[00:34.50]盘铃声清脆 帷幕间灯火幽微\n[00:40.20]我和你 最天生一对\n[00:44.95]\n[00:46.25]没了你才算原罪 没了心才好相配\n[00:56.84]你褴褛我彩绘 并肩行过山与水\n[01:02.45]你憔悴 我替你明媚\n[01:07.21]\n[01:08.21]是你吻开笔墨 染我眼角珠泪\n[01:13.70]演离合相遇悲喜为谁\n[01:19.00]他们迂回误会 我却只由你支配\n[01:24.72]问世间哪有更完美\n[01:29.37]\n[01:30.18]Aki：兰花指捻红尘似水\n[01:35.68]三尺红台 万事入歌吹\n[01:41.25]唱别久悲不成悲 十分红处竟成灰\n[01:47.21]愿谁记得谁 最好的年岁\n[01:52.80]\n[02:14.72]银临：你一牵我舞如飞 你一引我懂进退\n[02:25.95]苦乐都跟随 举手投足不违背\n[02:31.68]将谦卑 温柔成绝对\n[02:36.63]\n[02:37.42]你错我不肯对 你懵懂我蒙昧\n[02:42.88]心火怎甘心扬汤止沸\n[02:48.14]你枯我不曾萎 你倦我也不敢累\n[02:53.98]用什么暖你一千岁\n[02:58.78]\n[02:59.28]Aki：风雪依稀秋白发尾\n[03:27.21][03:04.96]灯火葳蕤 揉皱你眼眉\n[03:32.64][03:10.47]假如你舍一滴泪 假如老去我能陪\n[03:38.67][03:16.45]烟波里成灰 也去得完美\n[03:21.53]风雪依稀秋白发尾\n[03:45.35]";
let lrc_content = "[ti:反转地球]\n[ar:潘玮柏]\n[al:反转地球]\n\n[00:01.99]反转地球\n[00:04.90]演唱：潘玮柏\n[00:07.93]\n[00:13.46]Bow bow bow\n[00:14.39]让我看到你双手\n[00:16.01]对抗地心引力一起反转地球\n[00:18.68]Bow bow bow\n[00:19.74]现在不适合罗嗦\n[00:21.37]适者生存不然请你离开这节奏\n[00:24.03]Bow bow bow\n[00:25.11]让我看到你点头\n[00:26.68]跟着我的音乐一起跳舞准没错\n[00:29.43]Bow bow bow\n[00:30.58]现在不适合闪躲\n[00:31.97]正面出击看我怎么反转地球\n[00:34.67]睁开双眼看穿地球\n[00:36.27]赤裸的一片天空\n[00:37.62]我摊开双手接受所有最原始的节奏\n[00:40.22]有没有感到心情放松\n[00:41.59]有没有感到细胞跳动\n[00:42.99]节奏的变化,身体的摆动\n[00:44.40]让你全身放松\n[00:45.59]现在起不能罗嗦\n[00:47.19]踏进我的领域之中\n[00:48.53]频率太震撼\n[00:49.15]你的心脏正在此起彼落\n[00:50.79]跟着我走跟着我做跟我点头摆动双手\n[00:53.40]世界的一切的转动连结到我的音乐紧跟着我的脚步在走\n[00:56.23]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[00:58.78]别想压抑我们定意世界的传统\n[01:01.29]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:04.06]没有对或错我只想潜入这节奏\n[01:06.92]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:09.43]音乐没有自由仿佛坠进了黑洞\n[01:11.98]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:14.69]现在跟着我们创造新世纪的秩序\n[01:17.43]Bow bow bow\n[01:18.74]让我看到你双手\n[01:20.33]对抗地心引力一起反转地球\n[01:22.33]Bow bow bow\n[01:23.66]现在不适合罗嗦\n[01:25.37]适者生存不然请你离开这节奏\n[01:28.04]Bow bow bow\n[01:29.16]让我看到你点头\n[01:30.86]跟着我的音乐一起跳舞准没错\n[01:33.27]Bow bow bow\n[01:34.42]现在不适合闪躲\n[01:35.74]正面出击看我怎么反转地球\n[01:37.74]\n[01:41.57]一道音波划破天空\n[01:42.82]在我的领域不停播送\n[01:44.21]激发出的热情不能抵挡你竖起的耳朵的诱惑\n[01:46.91]你停不停你动不动全部在我掌控之中\n[01:49.45]你知不知道地心引力在这永远拉不住我\n[01:52.15]当音乐力量合二为一创造出新的世界秩序\n[01:54.97]不跟随的人闭上你的....SHHH\n[01:57.73]有别的比那更好的吗\n[01:58.87]有别的比那更出色吗\n[02:00.39]有别的比我们向往追求的音乐更独特的吗\n[02:02.39]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:05.47]别想压抑我们定意世界的传统\n[02:07.77]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:10.72]没有对或错我只想潜入这节奏\n[02:13.00]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:16.24]音乐没有自由仿佛坠进了黑洞\n[02:18.48]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:21.13]现在跟着我们创造新世纪的秩序\n[02:24.01]Bow bow bow\n[02:25.19]让我看到你双手\n[02:26.66]对抗地心引力一起反转地球\n[02:29.33]Bow bow bow\n[02:30.42]现在不适合罗嗦\n[02:32.09]适者生存不然请你离开这节奏\n[02:34.67]Bow bow bow\n[02:35.76]让我看到你点头\n[02:37.55]跟着我的音乐一起跳舞准没错\n[02:40.01]Bow bow bow\n[02:41.32]现在不适合闪躲\n[02:42.68]正面出击看我怎么反转地球\n[02:45.40]Bow bow bow\n[02:46.42]让我看到你双手\n[02:48.01]对抗地心引力一起反转地球\n[02:50.71]Bow bow bow\n[02:51.74]现在不适合罗嗦\n[02:53.38]适者生存不然请你离开这节奏\n[02:56.05]Bow bow bow\n[02:57.01]让我看到你点头\n[02:58.77]跟着我的音乐一起跳舞准没错\n[03:01.39]Bow bow bow\n[03:02.50]现在不适合闪躲\n[03:04.11]正面出击看我怎么反转地球\n[03:06.71]"
const browser_anim_end = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            browser_anim_start = 'webkitAnimationStart mozAnimationStart MSAnimationStart oanimationstart animationstart';

let audio = $q('.audio'),
        lrc_container = $q('.lrc-container')[0],
        lrc_list = $q('.lrc-list'), 
        lyric_li,
        lyric_index = {},       // 存储歌词下标,以时间为key，下标为值，快速定位到当前li
        lyric_height = [];      // 记录歌词高度
audio.on('timeupdate',function(e){
    let currentTime = e.target.currentTime;
    currentTime =  Math.floor(currentTime);
    //scrollLrc(currentTime);
    scrollTopLrc(currentTime);
    //console.log(currentTime);

}) 
/* 解析歌词 */ 
parseLrc(lrc_content);
function parseLrc(lrc_content){
    let lyric_list = lrc_content.split('\n');
    let lyric_obj = {};             // 存储歌词内容对象
    for(let index in lyric_list){
        let  lyric = lyric_list[index],
            reg = /\[\d*\:\d*(\.|\:)\d*\]/gy,
            time_arr = lyric.match(reg),
            content = lyric.replace(reg,'');
        if(!time_arr){
            continue;
        }

        for(let time_arr of time_arr){
            //时间格式为[00:06.44],将时间转为秒。
            time_arr = time_arr.substring(1,time_arr.length-1);
            let time_split_col = time_arr.split(':'),
                [minute,second] = time_split_col;
            let time = (parseInt(minute)*60 + parseInt(second));
            lyric_obj[time] = content;          // 记录歌词,以时间为key索引
        }
    }
    renderLrc(lyric_obj);
}
/*将歌词渲染到页面中 */
function renderLrc(lyric_obj){
    let k = 0;
    for(let lyric in lyric_obj){
        let li = document.createElement('li');
        li.innerHTML = lyric_obj[lyric];
        li.className = "lyric";
        li.setAttribute('data',k);
        li.setAttribute('name',lyric);
        lrc_list.appendChild(li);
        lyric_index[lyric] = k ;            // 记录歌词下标
        lyric_height[k] = li.offsetHeight;      // 记录歌词高度
        k++;
    }
    lyric_li = $q('.lrc-list .lyric');
}
/* 歌词滚动 */
function scrollLrc(currentTime){
    let index = lyric_index[currentTime];       // 获取当前时间的歌词下标
    if(index == undefined){         // 当前时间没有匹配的歌词
        return;
    }
    if(index <= 5){
        lrc_list.css('top','0rem');
    }
    let active_lyric = $q('.lrc-list .active'),
        active_index = parseInt(active_lyric.attr("data"));
    if(active_index == index){      // 该句歌词已滚动过不再滚动
        return;
    }
    if(index > 5 && index < (lyric_height.length - 2)){
        //$q('.lrc-list').css('animation-name','scrollUp');
        let active_height = lyric_height[index],
                lrc_list_top = lrc_list[0].offsetTop;
        if((index - active_index) == 1){                        // 顺序播放时，按序滚动
            lrc_list.css('top',((lrc_list_top-active_height)/100)+'rem');
        } else {                                                            // 拖动到某一位置，计算总top
            let total_height = 0;
            for(let i = 0,ii = index-5;i<ii;i++){        
                total_height += lyric_height[i];
            }
            lrc_list.css('top',(-total_height/100)+'rem');
        }
        //lrc_container[0].scrollTop += active_height;
    }
    if(active_lyric){
        active_lyric.removeClass('active');
    }
    $q(lyric_li[index]).addClass('active');
}


/* 滚动滚动条而使歌词滚动 */
let req_timer;
function requestAnimation(data,end){
    let run = function(){
        lrc_container.scrollTop += data;
        //console.log(end,lrc_container.scrollTop,data);
        if(Math.abs(parseInt(end - lrc_container.scrollTop)) > Math.abs(data)){
            req_timer = requestAnimationFrame(run);
            //console.log("add:"+req_timer);
        } else {
            //console.log("cancel:"+req_timer);
            cancelAnimationFrame(req_timer);
        }
    }
    if(data == 0){
        return ;
    }
    run();
}
function scrollTopLrc(currentTime){
    let index = lyric_index[currentTime];       // 获取当前时间的歌词下标
    if(index == undefined){         // 当前时间没有匹配的歌词
        return;
    }
    if(index <= 5){
        requestAnimation(-1,0);
    }
    let active_lyric = $q('.lrc-list .active'),
        active_index = parseInt(active_lyric.attr("data"));
    if(active_index == index){      // 该句歌词已滚动过不再滚动
        return;
    }

    if(index > 5 && index < (lyric_height.length - 2)){
        //$q('.lrc-list').css('animation-name','scrollUp');
        let active_height = lyric_height[index],
                lrc_list_top = lrc_list[0].offsetTop,
                scroll_top = lrc_container.scrollTop;
        /*if((index - active_index) == 1){                        // 顺序播放时，按序滚动
            let scroll_end = scroll_top + active_height;
            requestAnimation(1,scroll_end);
        } else { */                                                           // 拖动到某一位置，计算总top
            let total_height = 0;
            for(let i = 0,ii = index-5;i<ii;i++){        
                total_height += lyric_height[i];
            }
            let scroll_end = total_height,
                 scroll_interval = parseInt((total_height - scroll_top)/30);
            //console.log(total_height,scroll_top,scroll_interval);
            requestAnimation((scroll_interval>=0&&scroll_interval<1)?1:scroll_interval,scroll_end);
        /*}*/
    }
    if(active_lyric){
        active_lyric.removeClass('active');
    }
    $q(lyric_li[index]).addClass('active');
}