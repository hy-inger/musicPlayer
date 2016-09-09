class Music{
    constructor(obj,dom){
        // {queryId,sondId,songName,artistId,artistName,albumId,albumName,
        //     songPicSmall,songPicBig,songPicRadio,lrcLink,time,linkCode,
        //     songLink,showLink,format,rate,size,relateStatus,resourceType} = obj;
        this.info = obj;
        this.dom = dom; // 可放入代表歌曲的dom,
    }

    getInfo(){
        return this.info;
    }
}

class MyAudio {
    /**
     * 构造器
     * @param {element} audio的dom元素
     * @param {array}  播放列表,可空
     * @param {obj}  配置项
     * @type {Array}
     */
    constructor(ele,musicList=[],cfg = {}){
        this.audio = ele;  // 元素dom
        this.musicList = musicList.map(ele=>new Music(ele));  // 歌曲列表
        this.index = 0;  // 当前歌曲索引
        const defaultCfg = {
            ended:function(){}, // 结束回调
            play:function(){}, // 播放时候回调
            progress:function(){}, // 缓冲时事件
            next:function(){}, // 自动切换下一首时回调
            playMod :"order"  // 播放类型,
        };
        // 配置,播放回调,播放结束回调
        this.cfg = Object.assign(defaultCfg,cfg);
        this.audio.addEventListener("ended",()=>{
            if (!this.audio.loop) {
                if(!(this.cfg.playMod === 'list' && this.index === this.musicList.length - 1)){
                    // 只要不是单曲循环或者顺序播放最后一首,都会执行下一首操作.
                    this.next();
                    this.cfg.ended(this.musicList[this.index]);
                }
            }
        });
        this.audio.addEventListener("play",this.cfg.play);
        // this.audio.addEventListener("loadstart",(e)=>{
        //     console.log("loadstart ---->",e.target.buffered);
        // });
        // this.audio.addEventListener("durationchange",(e)=>{
        //     console.log("durationchange ---->",e.target.buffered.end(e.target.buffered.length -1));
        // });
        // this.audio.addEventListener("loadedmetadata",(e)=>{
        //     console.log("loadedmetadata ---->",e.target.buffered.end(e.target.buffered.length -1));
        // });
        // this.audio.addEventListener("loadeddata",(e)=>{
        //     console.log("loadeddata ---->",e.target.buffered.end(e.target.buffered.length -1));
        // });
        // 监听音乐源数据加载过程
        this.audio.addEventListener("progress",(e)=>{
            this.cfg.progress(e);
        });
        // 音乐可以播放事件
        // this.audio.addEventListener("canplay",(e)=>{
        //     console.log("canplay ---->",e.target.buffered.end(e.target.buffered.length -1));
        // });
    }
    /**
     * 添加歌曲
     * @method addMusic
     * @param  {Music||List} music 歌曲或者歌曲列表
     */
    addMusic(music){
        if (Array.isArray(music)) {
            this.musicList.push(...music.map(mus=>new Music(mus)));
        }else{
            this.musicList.push(new Music(music));
        }
        return this;
    }
    /**
     * removeMusic
     * @method addMusic
     * @param  {Music} 需要删除的歌曲
     */
    removeMusic(music){
        if (this.musicList.includes(music)) {
            this.musicList.splice(this.musicList.indexOf(music),1);
        }
        return this;
    }
    /**
     * 获取当前播放器信息
     */
    getInfo(){
        return {
            music:this.musicList[this.index].info,
            currentSrc:this.audio.currentSrc,
            volume:this.audio.volume,
            currentTime:this.audio.currentTime,
            paused:this.audio.paused,
            ended:this.audio.ended,
            loop:this.audio.loop,
            startTime:this.audio.startTime,
            duration:this.audio.duration
        };
    }
    // 播放
    play(){
        this.audio.play();
        return this;
    }
    // 暂停
    pause(){
        this.audio.pause();
        return this;
    }
    // 改变音量,val为数值则设置为该数值,若为 increase代表音量增加10,否则减少10
    changeVolume(val){
        var volume = this.audio.volume*100;
        if (typeof val === 'number') {
            volume = val;
        }else if(val === 'increase'){
            volume = volume + 10;
        }else {
            volume = volume - 10;
        }
        volume > 100 && (volume = 100);
        volume < 0 && (volume = 0);
        this.audio.volume = volume/100;
        return this;
    }
    // 设置当前播放时间,0-100,代表百分比
    setCurrentTime(val){
        try {
            this.audio.currentTime = this.audio.duration*val/100;
        }catch(e){
            console.log("切换")
        }
        return this;
    }
    /**
     * 加载并播放音乐
     */
    load(music){
        if (typeof music === 'undefined') {
            return this;
        }
        this.audio.src = music.info.songLink;
        this.index = this.musicList.indexOf(music);
        this.play();
        return this;
    }
    // 下一首音乐,暴露回调接口进行下一步操作,返回this,可进行链式调用
    next(){
        var playMod = this.cfg.playMod;
        if (playMod !=="range") {
            // 顺序播放
            this.index++;
            if (this.index >= this.musicList.length) {
                this.index = 0;
            }
        }else {
            // 随机播放
            this.index = parseInt(Math.random()*this.musicList.length,10);
        }
        var music = this.musicList[this.index];
        this.load(music);
        return music;
    }
    // 上一首音乐,暴露回调接口进行下一步操作,返回this,可进行链式调用
    prev(){
         var playMod = this.cfg.playMod;
        if (playMod !=="range") {
            // 顺序播放
            this.index--;
            if (this.index < 0) {
                this.index = this.musicList.length -1;
            }
        }else {
            // 随机播放
            this.index = parseInt(Math.random()*this.musicList.length,10);
        }
        var music = this.musicList[this.index];
        this.load(music);
        return music;
    }

}


module.exports = {MyAudio:MyAudio,Music:Music};
