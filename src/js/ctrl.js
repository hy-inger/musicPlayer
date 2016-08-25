
/**
 * 主要用来对播放器和音乐的控制
 * 通过调用Dispatch(action)来控制播放器进行相应的操作
 * 不允许直接对播放器对象进行操作
 */
var {MyAudio,Music} = require("./audio.js");
require("expose?$q!./query.js");
// 创建一首音乐并且将音乐与其dom关联.
function createMusicDom(music){
    var index = $q(".song-list li").length;
    var li = `<li><span>${index}</span><span>${music.songName}</span><i class="rm">x</i></li>`;
    var dom = $q.parseHTML(li);
    var mus = new Music(music,dom);
    $q(dom).on('click', function(event) {
        event.preventDefault();
        window.player.load(mus);
    });
    $q(dom).find(".rm").on('click', function(event) {
        event.stopPropagation();
        Dispatch("REMOVE_MUSIC",mus,(rm,list)=>{
            $q(rm.dom).remove();
        });
    });
    return mus;
}
var Store = {
    // 状态,存放播放器和搜索列表
    state : {
        player:new MyAudio(document.getElementById("player")), // 播放器实例
        searchList:[]  // 当前的搜索列表
    },
    // 相应的操作事件
    mou : {
        // 播放
        PLAY(state){
            state.player.play();
        },
        // 暂停
        PAUSE(state){
            state.player.pause();
        },
        // 搜索
        SEARCH(state,query,callback){
            // 向后台拉取搜索到的数据
            fetch("http://localhost:4000/search?query="+query,{
                mod:"cors"
            }).then(res=>res.json()).then(data=>{
                callback(data.data.songList);
            });
        },
        // 刷新搜索列表,即将搜索的歌曲重新放入列表当中
        REFRESH_SEARCH_LIST(state,search_list){
            state.searchList = search_list;
        },
        // 播放/暂停切换
        CHANGE_STATE(state){
            if (state.player.audio.paused) {
                state.player.play();
            }else{
                state.player.pause();
            }
        },
        // 下一首歌曲
        NEXT(state){
            state.player.next();
        },
        // 上一首歌曲
        PREV(state){
            state.player.prev();
        },
        // 从搜索列表中播放音乐
        LOAD_FROM_SEARCHLIST(state,index,callback){
            var music = state.searchList[index];
            music = createMusicDom(music);
            state.player.load(music);
            callback(music);
        },
        // 加大音量,基数为10
        INCREASE_VOLUME(state){
            state.player.changeVolume('increase');
        },
        // 减少音量,基数为10
        DECREASE_VOLUME(state){
            state.player.changeVolume('decrease');
        },
        // 改变音量音量
        CHANGE_VOLUME(state,val){
            state.player.changeVolume(val);
        },
        // 播放进度,0-100整数,代表百分比
        CHANGE_CURRENT_TIME(val){
            state.player.setCurrentTime(val);
        },
        // 播放模式,mod为将要修改的模式
        // order : 顺序播放
        // range : 随机播放
        // loop : 单曲循环
        CHANGE_PLAY_MOD(state,mod){
            if (mod === 'loop') {
                state.player.audio.loop = true;
            }else{
                state.player.audio.loop = false;
                state.player.cfg.playMod = mod;
            }
        },
        // 获取当前播放列表
        // 返回 Array.
        GET_MUSIC_LIST(state){
            return state.player.musicList;
        },
        // 删除某一首音乐
        // 如果music为number,则删除该索引的音乐
        // 如果music为Music实例,则删除该对象
        REMOVE_MUSIC(state,music,fnc){
            let player = state.player;
            let remove ,index;
            if (typeof music === 'number') {
                index = music;
            }else {
                index = player.musicList.indexOf(music);
            }
            if (index === player.index) {
                player.next();
            }
            index <= player.index&&player.index--;
            remove = player.musicList.splice(index,1);
            if (typeof fnc === 'function') {
                fnc(...remove,player.musicList);
            }
        },
       /**
        * 获取歌曲歌词接口
        * @param {state} state 管理的状态,自动注入
        * @param {Music} music music对象,会根据对象的songId获取相应的歌词
        * @return {Objec} 异步获取的data.
        *         data.lrcContent : 歌词
        *         data.title : 歌名
        */
        GET_MUSIC_LRC(state,music){
            var songId = music.info.songId;
            fetch("http://localhost:4000/lrc?songId="+songId,{
                mod:"cors"
            })
            .then((res)=>res.json())
            .then((data)=>{
                // data.lrcContent : 歌词
                // data.title  : 歌名
                console.log(data);
            });
        }
    }
};
/**
 * 自执行函数,返回一个方法
 * @type {RegExp}
 */
var Dispatch = (function(store){
    /**
     * 执行action操作,arg为参数
     */
    return function(action,...arg){
        console.log("ACTION-------->>>",action);
        // 调用store中mou对应的action
        return store.mou[action](store.state,...arg);
    };
})(Store);
module.exports = {Store,Dispatch};
