require("expose?$q!./query.js");
require("./request-animate.js");
  
class Lyric{
    constructor(audio,lrc_list,lrc_container,lrc_content){
        this.audio = audio;                                             // 播放器
        this.lrc_container = lrc_container[0];              // 歌词容器
        this.number = (a,b) => a - b                                 // 数组升序
        this.top_num = 5;                                           // 当前歌词与顶部歌词距离多少句歌词
        
        this.init(lrc_list,lrc_content)                              // 初始化数据
        lrc_list.on('click',e=>{                                  // 点击歌词事件，更新audio的currentTime
            let target = $q(e.target);
            if(target.hasClass('lyric')){
                e.stopPropagation();
                let time = target.attr('name');
                this.audio[0].currentTime = parseInt(time);
            }
        });                    
    }

    init(lrc_list,lrc_content){
        cancelAnimationFrame(this.req_timer);
        this.lrc_list = lrc_list.html('');                                       // 歌词列表
        this.lyric_li;                                                      // 歌词集合
        this.lyric_index = {};                                          // 存储歌词下标,以时间为key，下标为值，快速定位到当前li
        this.lyric_height = [];                                         // 记录歌词高度
        this.lyric_time = [];
        this.req_timer = 0;

        this.lrc_container.scrollTop = 0;
        console.log(this.lrc_container.scrollTop);
        this.lrc_list.css('top',0);

        this.parseLrc(lrc_content);
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
        this.lyric_li = this.lrc_list.find('.lyric');
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
        let active_lyric = this.lrc_list.find('.active'),
            active_index = parseInt(active_lyric.attr("data"));
        if(active_index == index){      // 该句歌词已滚动过不再滚动
            return;
        }
        if(index > this.top_num && index < (this.lyric_height.length - 2)){
            let active_height = this.lyric_height[index],
                    lrc_list_top = this.lrc_list[0].offsetTop;
            if((index - active_index) == 1){                        // 顺序播放时，按序滚动
                this.lrc_list.css('top',((lrc_list_top-active_height)/100)+'rem');
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
        let active_lyric = this.lrc_list.find('.active'),
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



module.exports = Lyric;


/* 使用说明 
    1、 构建歌词实例 
            new Lyric(audio,lrc_list,lrc_container,lrc_content)
            参数分别为播放器元素，歌词列表，歌词容器，lrc歌词
    2、歌词滚动
            lyric.scrollTopLrc(currentTime);            // 有滚动条.歌词外层容器需设置overflow-y:auto;overflow-x:hidden
            或 lyric.scrollLrc(currentTime);             // 无滚动条.歌词外层容器需设置overflow:auto
            参数为进度条当前时间
    3、拖动进度条，鼠标松开后更新定位歌词
          lyric.dragToLrc(drag_time)
          参数为拖动后换算出的时间
    4、歌曲切换，重新初始化歌词
            lyric.init(lrc_list,lrc_content);
            参数为歌词列表，lrc歌词 
*/



// 进度条更新事件
// audio.on('timeupdate',function(e){
//     let currentTime = e.target.currentTime;
//     currentTime =  Math.floor(currentTime);
//     lyric.scrollTopLrc(currentTime);
//     //lyric.scrollLrc(currentTime);
//     //console.log(currentTime);

// }) 
// // 拖动进度条简易demo
// let mousedown = false,drag = false,drag_time;
// $q('.progress').on('mousedown',function(e){
//     mousedown = true;
//     drag = false;
// })
// $q('.progress').on('mouseup',function(e){
//     mousedown = false;
//     if(!drag_time){
//         return;
//     }
//     lyric.dragToLrc(drag_time);                
// })
// $q('.progress').on('mousemove',function(e){
//     if(!mousedown){
//         return false;
//     }
//     let _this = $q(this),
//             left = e.clientX - this.offsetLeft -10;
//     let play = $q('.progress .play');
//     play.css('left',(left-10)+'px');
//     let width = _this[0].offsetWidth,
//             per = left/width;
//     drag_time = parseInt(per * lyric.lyric_time[lyric.lyric_time.length-1]);
    
// });
/*$q('body').on('click',function(e){
    console.log(audio[0].src);
    audio[0].src="http://yinyueshiting.baidu.com/data2/music/26e93192096f6521ec14e8a05e0a0bd3/258641584/258641584.mp3?xcode=5d77dfe065ba8bc30fd1a9e14bd081d7";
    lyric.init(lrc_list,lrc_content);

})*/