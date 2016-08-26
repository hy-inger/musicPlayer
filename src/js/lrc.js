require("expose?$q!./query.js");
require("./request-animate.js");
  
class Lyric{
    constructor(audio,lrc_list,lrc_container,lrc_content){
        this.audio = audio;                                             // 播放器
        this.lrc_container = lrc_container[0];              // 歌词容器
        this.lrc_list = lrc_list;                                       // 歌词列表
        this.lyric_li;                                                      // 歌词集合
        this.lyric_index = {};                                          // 存储歌词下标,以时间为key，下标为值，快速定位到当前li
        this.lyric_height = [];                                         // 记录歌词高度
        this.lyric_time = [];
        this.req_timer = 0;
        this.top_num = 5;                                           // 当前歌词与顶部歌词距离多少句歌词
        this.number = (a,b) => a - b                                 // 数组升序

        this.parseLrc(lrc_content);                              

        lrc_list.on('click',e=>{                                  // 点击歌词事件，更新audio的currentTime
            let target = $q(e.target);
            if(target.hasClass('lyric')){
                e.stopPropagation();
                let time = target.attr('name');
                this.audio[0].currentTime = parseInt(time);
            }
        });                    
    }

    parseLrc(lrc_content){                                      // 解析歌词 
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
        this.renderLrc(lyric_obj);
    }

    renderLrc(lyric_obj){               // 将歌词渲染到页面中
        let k = 0,
                lyric_length = Object.keys(lyric_obj);
        for(let lyric in lyric_obj){
            let li = document.createElement('li');
            li.innerHTML = lyric_obj[lyric];
            if(lyric_length<=1){
                li.className = 'nolyric';
            } else {
                li.className = "lyric";
            }
            li.setAttribute('data',k);
            li.setAttribute('name',lyric);

            this.lrc_list.appendChild(li);
            this.lyric_index[lyric] = k ;            // 记录歌词下标
            this.lyric_height[k] = li.offsetHeight;      // 记录歌词高度
            this.lyric_time[k] = parseInt(lyric);                // 记录歌词时间
            k++;
        }
        this.lyric_li = lrc_list.find('.lyric');
    }

    scrollLrc(currentTime){                                         // 滚动条不可见。歌词外层容器需设置overflow:hidden
        if(this.lyric_height.length <=1 ){                                           // 没有歌词不进行滚动。
            return;
        }
        let index = this.lyric_index[currentTime];       // 获取当前时间的歌词下标
        if(index == undefined){                                 // 当前时间没有匹配的歌词
            return;
        }
        if(index <= this.top_num){
            this.lrc_list.css('top','0rem');
        }
        let active_lyric = lrc_list.find('.active'),
            active_index = parseInt(active_lyric.attr("data"));
        if(active_index == index){      // 该句歌词已滚动过不再滚动
            return;
        }
        if(index > this.top_num && index < (this.lyric_height.length - 2)){
            let active_height = this.lyric_height[index],
                    lrc_list_top = this.lrc_list[0].offsetTop;
            if((index - active_index) == 1){                        // 顺序播放时，按序滚动
                lrc_list.css('top',((lrc_list_top-active_height)/100)+'rem');
            } else {                                                            // 拖动到某一位置，计算总top
                let total_height = 0;
                for(let i = 0,ii = index-this.top_num;i<ii;i++){        
                    total_height +=this. lyric_height[i];
                }
                this.lrc_list.css('top',(-total_height/100)+'rem');
            }
        }
        if(active_lyric){
            active_lyric.removeClass('active');
        }
        $q(this.lyric_li[index]).addClass('active');
    }

    requestAnimation(data,end){            // 滚动滚动条而使歌词滚动
        let run = () => {
            this.lrc_container.scrollTop += data;
            if(Math.abs(parseInt(end - this.lrc_container.scrollTop)) > Math.abs(data)){
                this.req_timer = requestAnimationFrame(run);
            } else {
                this.lrc_container.scrollTop += (end - this.lrc_container.scrollTop);
                cancelAnimationFrame(this.req_timer);
            }
        }
        if(data == 0){
            return ;
        }
        run();
    }
    scrollTopLrc(currentTime){              // 滚动条可见。歌词外层容器需设置overflow-y:auto;overflow-x:hidden
        if(this.lyric_height.length <=1 ){                       // 没有歌词不进行滚动。
            return;
        }
        let index = this.lyric_index[currentTime];       // 获取当前时间的歌词下标
        if(index == undefined){         // 当前时间没有匹配的歌词
            return;
        }
        let active_lyric = lrc_list.find('.active'),
            active_index = parseInt(active_lyric.attr("data"));
        if(active_index == index){      // 该句歌词已滚动过不再滚动
            return;
        }
        if(index < (this.lyric_height.length - 2)){
            let active_height = this.lyric_height[index],
                    scroll_top = this.lrc_container.scrollTop;
            // 拖动到某一位置，计算总top                                                    
            let total_height = 0;
            for(let i = 0,ii = index-this.top_num;i<ii;i++){        
                total_height += this.lyric_height[i];
            }
            let scroll_end = total_height,
                 scroll_interval = parseInt((total_height - scroll_top)/20);
            if(index>this.top_num||(total_height - scroll_top)!=0){
                this.requestAnimation((scroll_interval>=0&&scroll_interval<1)?1:scroll_interval,scroll_end);
            }
        }
        if(active_lyric){
            active_lyric.removeClass('active');
        }
        $q(this.lyric_li[index]).addClass('active');
    }

    dragToLrc(drag_time){
        let current_time = 0;
        if(!this.lyric_index[drag_time]){
            this.lyric_time.push(drag_time);
            this.lyric_time.sort(this.number);
            for(let index in this.lyric_time){
                if(this.lyric_time[index] == drag_time){
                    current_time = this.lyric_time[index-1];
                    this.lyric_time.splice(index,1);
                    break;
                }
            }
        } else {
            current_time = drag_time;
        }
        this.audio[0].currentTime = current_time;
    }
}


/* 使用说明 
    1、  构建歌词实例 
            new Lyric(audio,lrc_list,lrc_container,lrc_content)
            参数分别为播放器元素，歌词列表，歌词容器，lrc歌词
    2、拖动进度条，鼠标松开后更新定位歌词
          lyric.dragToLrc(drag_time)
          参数为拖动后换算出的时间
*/
let lrc_content="[00:01.75]牵丝戏\n[00:03.89]作曲：银临\n[00:06.44]编/混：灰原穷\n[00:09.53]填词：Vagary\n[00:12.40]演唱：银临&Aki阿杰\n[00:16.08]海报：苏澈白\n[00:18.77]\n[00:23.65]银临：嘲笑谁恃美扬威 没了心如何相配\n[00:34.50]盘铃声清脆 帷幕间灯火幽微\n[00:40.20]我和你 最天生一对\n[00:44.95]\n[00:46.25]没了你才算原罪 没了心才好相配\n[00:56.84]你褴褛我彩绘 并肩行过山与水\n[01:02.45]你憔悴 我替你明媚\n[01:07.21]\n[01:08.21]是你吻开笔墨 染我眼角珠泪\n[01:13.70]演离合相遇悲喜为谁\n[01:19.00]他们迂回误会 我却只由你支配\n[01:24.72]问世间哪有更完美\n[01:29.37]\n[01:30.18]Aki：兰花指捻红尘似水\n[01:35.68]三尺红台 万事入歌吹\n[01:41.25]唱别久悲不成悲 十分红处竟成灰\n[01:47.21]愿谁记得谁 最好的年岁\n[01:52.80]\n[02:14.72]银临：你一牵我舞如飞 你一引我懂进退\n[02:25.95]苦乐都跟随 举手投足不违背\n[02:31.68]将谦卑 温柔成绝对\n[02:36.63]\n[02:37.42]你错我不肯对 你懵懂我蒙昧\n[02:42.88]心火怎甘心扬汤止沸\n[02:48.14]你枯我不曾萎 你倦我也不敢累\n[02:53.98]用什么暖你一千岁\n[02:58.78]\n[02:59.28]Aki：风雪依稀秋白发尾\n[03:27.21][03:04.96]灯火葳蕤 揉皱你眼眉\n[03:32.64][03:10.47]假如你舍一滴泪 假如老去我能陪\n[03:38.67][03:16.45]烟波里成灰 也去得完美\n[03:21.53]风雪依稀秋白发尾\n[03:45.35]";
//let lrc_content = "[ti:反转地球]\n[ar:潘玮柏]\n[al:反转地球]\n\n[00:01.99]反转地球\n[00:04.90]演唱：潘玮柏\n[00:07.93]\n[00:13.46]Bow bow bow\n[00:14.39]让我看到你双手\n[00:16.01]对抗地心引力一起反转地球\n[00:18.68]Bow bow bow\n[00:19.74]现在不适合罗嗦\n[00:21.37]适者生存不然请你离开这节奏\n[00:24.03]Bow bow bow\n[00:25.11]让我看到你点头\n[00:26.68]跟着我的音乐一起跳舞准没错\n[00:29.43]Bow bow bow\n[00:30.58]现在不适合闪躲\n[00:31.97]正面出击看我怎么反转地球\n[00:34.67]睁开双眼看穿地球\n[00:36.27]赤裸的一片天空\n[00:37.62]我摊开双手接受所有最原始的节奏\n[00:40.22]有没有感到心情放松\n[00:41.59]有没有感到细胞跳动\n[00:42.99]节奏的变化,身体的摆动\n[00:44.40]让你全身放松\n[00:45.59]现在起不能罗嗦\n[00:47.19]踏进我的领域之中\n[00:48.53]频率太震撼\n[00:49.15]你的心脏正在此起彼落\n[00:50.79]跟着我走跟着我做跟我点头摆动双手\n[00:53.40]世界的一切的转动连结到我的音乐紧跟着我的脚步在走\n[00:56.23]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[00:58.78]别想压抑我们定意世界的传统\n[01:01.29]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:04.06]没有对或错我只想潜入这节奏\n[01:06.92]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:09.43]音乐没有自由仿佛坠进了黑洞\n[01:11.98]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[01:14.69]现在跟着我们创造新世纪的秩序\n[01:17.43]Bow bow bow\n[01:18.74]让我看到你双手\n[01:20.33]对抗地心引力一起反转地球\n[01:22.33]Bow bow bow\n[01:23.66]现在不适合罗嗦\n[01:25.37]适者生存不然请你离开这节奏\n[01:28.04]Bow bow bow\n[01:29.16]让我看到你点头\n[01:30.86]跟着我的音乐一起跳舞准没错\n[01:33.27]Bow bow bow\n[01:34.42]现在不适合闪躲\n[01:35.74]正面出击看我怎么反转地球\n[01:37.74]\n[01:41.57]一道音波划破天空\n[01:42.82]在我的领域不停播送\n[01:44.21]激发出的热情不能抵挡你竖起的耳朵的诱惑\n[01:46.91]你停不停你动不动全部在我掌控之中\n[01:49.45]你知不知道地心引力在这永远拉不住我\n[01:52.15]当音乐力量合二为一创造出新的世界秩序\n[01:54.97]不跟随的人闭上你的....SHHH\n[01:57.73]有别的比那更好的吗\n[01:58.87]有别的比那更出色吗\n[02:00.39]有别的比我们向往追求的音乐更独特的吗\n[02:02.39]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:05.47]别想压抑我们定意世界的传统\n[02:07.77]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:10.72]没有对或错我只想潜入这节奏\n[02:13.00]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:16.24]音乐没有自由仿佛坠进了黑洞\n[02:18.48]让世界TURN AROUND DANCE AROUND EVERYBODY HAVE SOME FUN\n[02:21.13]现在跟着我们创造新世纪的秩序\n[02:24.01]Bow bow bow\n[02:25.19]让我看到你双手\n[02:26.66]对抗地心引力一起反转地球\n[02:29.33]Bow bow bow\n[02:30.42]现在不适合罗嗦\n[02:32.09]适者生存不然请你离开这节奏\n[02:34.67]Bow bow bow\n[02:35.76]让我看到你点头\n[02:37.55]跟着我的音乐一起跳舞准没错\n[02:40.01]Bow bow bow\n[02:41.32]现在不适合闪躲\n[02:42.68]正面出击看我怎么反转地球\n[02:45.40]Bow bow bow\n[02:46.42]让我看到你双手\n[02:48.01]对抗地心引力一起反转地球\n[02:50.71]Bow bow bow\n[02:51.74]现在不适合罗嗦\n[02:53.38]适者生存不然请你离开这节奏\n[02:56.05]Bow bow bow\n[02:57.01]让我看到你点头\n[02:58.77]跟着我的音乐一起跳舞准没错\n[03:01.39]Bow bow bow\n[03:02.50]现在不适合闪躲\n[03:04.11]正面出击看我怎么反转地球\n[03:06.71]"

let audio = $q('.audio'),
        lrc_container = $q('.lrc-container'),
        lrc_list = $q('.lrc-list');
let lyric = new Lyric(audio,lrc_list,lrc_container,"[00:00.00]Sorry，该歌曲暂无歌词。");

// 进度条更新事件
audio.on('timeupdate',function(e){
    let currentTime = e.target.currentTime;
    currentTime =  Math.floor(currentTime);
    //lyric.scrollLrc(currentTime);
    lyric.scrollTopLrc(currentTime);
    //console.log(currentTime);

}) 
// 拖动进度条简易demo
let mousedown = false,drag = false,drag_time;
$q('.progress').on('mousedown',function(e){
    mousedown = true;
    drag = false;
})
$q('.progress').on('mouseup',function(e){
    mousedown = false;
    if(!drag_time){
        return;
    }
    lyric.dragToLrc(drag_time);                 
})
$q('.progress').on('mousemove',function(e){
    if(!mousedown){
        return false;
    }
    let _this = $q(this),
            left = e.clientX - this.offsetLeft -10;
    let play = $q('.progress .play');
    play.css('left',(left-10)+'px');
    let width = _this[0].offsetWidth,
            per = left/width;
    drag_time = parseInt(per * lyric.lyric_time[lyric.lyric_time.length-1]);
    
});