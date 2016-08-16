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
    constructor(ele,musicList=[],cfg = {}){
        this.audio = ele;  // 元素dom
        this.musicList = musicList.map(ele=>new Music(ele));  // 歌曲列表
        this.index = 0;  // 当前歌曲索引
        const defaultCfg = {
            ended:function(){}, // 结束回调
            play:function(){}, // 播放时候回调
            playType :"order"  // 播放类型,
        };
        // 配置,播放回调,播放结束回调
        this.cfg = Object.assign(defaultCfg,cfg);
        this.audio.addEventListener("ended",this.cfg.ended);
        this.audio.addEventListener("play",this.cfg.play);
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
    // 删除歌曲
    removeMusic(music){
        if (this.musicList.includes(music)) {
            this.musicList.splice(this.musicList.indexOf(music),1);
        }
        return this;
    }
    // 获取当前播放器相关信息
    getInfo(){
        return {
            currentSrc:this.audio.currentSrc,
            volume:this.audio.volume,
            currentTime:this.audio.currentTime,
            paused:this.audio.paused,
            ended:this.audio.ended,
            startTime:this.audio.startTime,
            duration:this.audio.duration
        }
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
    // 增音量
    increaseVolume(val){
        var volume = this.audio.volume*100;
        if (typeof val !== 'undefined') {
            volume = val;
        }else {
            volume = volume + 10;
        }
        volume > 100 && (volume = 100);
        this.audio.volume = volume/100
        return this;
    }
    // 减少音量
    decreaseVolume(val){
        var volume = this.audio.volume*100;
        if (typeof val !== 'undefined') {
            volume = val;
        }else {
            volume = volume - 10;
        }
        volume < 0 && (volume = 0);
        this.audio.volume = volume/100;
        return this;
    }
    // 设置当前播放时间
    setCurrentTime(val){
        this.audio.currentTime = val;
        return this;
    }
    // 加载并博凡引用
    load(music){
        if (!this.musicList.includes(music)) {
            this.musicList.push(music)
        }
        // 通过后台代理并将二进制转成blob播放
        fetch("http://localhost:4000/proxy?url="+music.info.songLink)
        .then((res)=>{
            return res.blob()
        })
        .then((data)=>{
            this.audio.src = window.URL.createObjectURL(data);
            this.play();
        })
        return this;
    }
    // 设置单曲循环
    loop(isLoop){
        this.audio.loop = isLoop;
        return this;
    }
    // 下一手音乐
    next(){
        if (this.cfg.playType === "order") {
            this.index++;
            if (this.index >= this.musicList.length) {
                this.index = 0;
            }
        }else {
            this.index = parseInt(Math.random()*this.musicList.length,10);
        }
        var music = this.musicList[this.index];
        this.load(this.musicList[this.index])
        console.log(music.info.albumName);
        return this;
    }
    // 上一手音乐
    prev(){
        if (this.cfg.playType === "order") {
            this.index--;
            if (this.index < 0) {
                this.index = this.musicList.length -1;
            }
        }else {
            this.index = parseInt(Math.random()*this.musicList.length,10);
        }
        var music = this.musicList[this.index];
        this.load(this.musicList[this.index])
        console.log(music.info.albumName);
        return this;
    }

}


module.exports = MyAudio;
