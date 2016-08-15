class Music{
    constructor(obj,dom){
        // {queryId,sondId,songName,artistId,artistName,albumId,albumName,
        //     songPicSmall,songPicBig,songPicRadio,lrcLink,time,linkCode,
        //     songLink,showLink,format,rate,size,relateStatus,resourceType} = obj;
        this.info = obj;
        this.dom = dom;
    }
    // preplay(){
    //     if (this.dom) {
    //         this.dom.addClass("active");
    //     }
    //     return this.info.songLink;
    // }
    getInfo(){
        return this.info;
    }
}

class MyAudio {
    constructor(ele,musicList=[],cfg = {}){
        this.audio = ele;
        this.musicList = musicList.map(ele=>new Music(ele));
        this.index = 0;
        const defaultCfg = {
            ended:function(){},
            play:function(){},
            playType :"order"
        };
        this.cfg = Object.assign(defaultCfg,cfg);
        this.audio.addEventListener("ended",this.cfg.ended);
        this.audio.addEventListener("play",this.cfg.play);
    }
    // static search(query){
    //     const baseUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug?query=";
    //     var img = new Image();
    //     img.src = baseUrl+encodeURIComponent(query);
    //     return img;
    // }
    addMusic(music){
        if (Array.isArray(music)) {
            this.musicList.push(...music.map(mus=>new Music(mus)));
        }else{
            this.musicList.push(new Music(music));
        }
        return this;
    }
    removeMusic(music){
        if (this.musicList.includes(music)) {
            this.musicList.splice(this.musicList.indexOf(music),1);
        }
        return this;
    }
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
    play(){
        this.audio.play();
        return this;
    }
    pause(){
        this.audio.pause();
        return this;
    }
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
    setCurrentTime(val){
        this.audio.currentTime = val;
        return this;
    }
    load(music){
        if (!this.musicList.includes(music)) {
            this.musicList.push(music)
        }
        // this.audio.src = music.preplay();;
        // this.audio.src = music.preplay();;
        fetch("http://localhost:4000/proxy?url="+music.info.showLink)
        .then((res)=>{
            console.log(res);
            return res.blob()
        })
        .then((data)=>{
            console.log(data);
            console.log(typeof data);
            this.audio.src = window.URL.createObjectURL(data);
            this.play();
        })
        return this;
    }
    loop(isLoop){
        this.audio.loop = isLoop;
        return this;
    }
    next(){
        if (this.cfg.playType === "order") {
            this.index++;
            if (this.index >= this.musicList.length) {
                console.log(this.index);
                this.index = 0;
            }
        }else {
            this.index = parseInt(Math.random()*this.musicList.length,10);
        }
        this.load(this.musicList[this.index])
    }

}


module.exports = MyAudio;
