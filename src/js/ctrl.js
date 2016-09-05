/**
 * 主要用来对播放器和音乐的控制
 * 通过调用Dispatch(action)来控制播放器进行相应的操作
 * 不允许直接对播放器对象进行操作
 */
var { MyAudio, Music } = require("./audio.js");
require("expose?$q!./query.js");
// 创建一首音乐并且将音乐与其dom关联.

var Store = {
    // 状态,存放播放器和搜索列表
    state: {
        player: new MyAudio(document.getElementById("player")), // 播放器实例
        searchList: [] // 当前的搜索列表
    },
    // 相应的操作事件
    mou: {
        SET_CONFIG(state,cfg){
            Object.assign(state.player.cfg,cfg);
        },
        // 播放
        PLAY(state) {
            state.player.play();
        },
        // 暂停
        PAUSE(state) {
            state.player.pause();
        },
        // 搜索
        SEARCH(state, query, callback) {
            // 向后台拉取搜索到的数据
            fetch("http://localhost:4000/search?query=" + query, {
                mod: "cors"
            }).then(res => res.json()).then(songList => {
                console.log(songList)
                callback(songList);
            });
        },
        // 刷新搜索列表,即将搜索的歌曲重新放入列表当中
        REFRESH_SEARCH_LIST(state, search_list) {
            state.searchList = search_list;
        },
        // 播放/暂停切换
        CHANGE_STATE(state) {
            if (state.player.audio.paused) {
                state.player.play();
            } else {
                state.player.pause();
            }
        },
        /**
         * 播放音乐,并将音乐通过回调传递
         * @param {[Object]}   state    [状态]
         * @param {[Music|String]}   music    音乐对象或者'next'和'prev'字符串,代表上一首或者下一首
         * @param {Function} callback [执行回调,参数musci]
         */
        LOAD_MUSIC(state, music, callback) {
            if (music === 'next') {
                music = state.player.next();
            } else if (music === 'prev') {
                music = state.player.prev();
            } else {
                state.player.load(music);
            }
            callback && callback(music);
        },

        // 添加音乐，提供回调给main进行dom操作
        ADD_MUSIC(state, index, callback) {
            var music = new Music(state.searchList[index]);
            // 根据songId寻找该歌曲是否已经在播放列表
            // 如果在,则跳转至该歌曲播放
            // 如果不在则添加该歌曲
            /**
             * Array.findIndex 返回元素所在的索引,如果不在则返回-1
             * 回调function(element,index,array){}
             * 如果回调中返回true,则Array.findIndex会返回该元素所在的索引
             * 如果回调返回fasle,会继续寻找下一个,
             */
            var player = state.player;
            var index = player.musicList.findIndex((ele, i, arr) => {
                if (ele.info.songId === music.info.songId) {
                    return true;
                } else {
                    return false;
                }
            });
            if (index === -1) {
                player.musicList.push(music);
                player.index = player.musicList.length - 1;
            } else {
                player.index = index;
                music = player.musicList[index];
            }
            // 执行回调
            callback(music);
        },
        // 加大音量,基数为10
        INCREASE_VOLUME(state) {
            state.player.changeVolume('increase');
        },
        // 减少音量,基数为10
        DECREASE_VOLUME(state) {
            state.player.changeVolume('decrease');
        },
        // 改变音量音量
        CHANGE_VOLUME(state, val) {
            state.player.changeVolume(val);
        },
        // 播放进度,0-100整数,代表百分比
        CHANGE_CURRENT_TIME(state,val) {
            state.player.setCurrentTime(val);
        },
        // 播放模式,mod为将要修改的模式
        // order : 顺序播放
        // range : 随机播放
        // loop : 单曲循环
        // list : 列表播放
        CHANGE_PLAY_MOD(state, mod) {
            if (mod === 'loop') {
                state.player.audio.loop = true;
            } else {
                state.player.audio.loop = false;
            }
            state.player.cfg.playMod = mod;
        },
        // 获取当前播放列表
        // 返回 Array.
        GET_MUSIC_LIST(state) {
            return state.player.musicList;
        },
        // 删除某一首音乐
        // 如果music为number,则删除该索引的音乐
        // 如果music为Music实例,则删除该对象
        REMOVE_MUSIC(state, music, fnc) {
            let player = state.player;
            let remove, index;
            if (typeof music === 'number') {
                index = music;
            } else {
                index = player.musicList.indexOf(music);
            }
            if (index === player.index) {
                player.next();
            }
            index <= player.index && player.index--;
            remove = player.musicList.splice(index, 1);
            if (typeof fnc === 'function') {
                fnc(...remove, player.musicList);
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
        GET_MUSIC_LRC(state, music, callback) {
            var songId = music.info.songId;
            fetch("http://localhost:4000/lrc?songId=" + songId, {
                    mod: "cors"
                })
                .then((res) => res.json())
                .then((data) => {
                    // data.lrcContent : 歌词
                    // data.title  : 歌名
                    callback(data);
                });
        }
    }
};
/**
 * 自执行函数,返回一个方法
 * @type {RegExp}
 */
var Dispatch = (function(store) {
    /**
     * 执行action操作,arg为参数
     */
    return function(action, ...arg) {
        console.log("ACTION-------->>>", action);
        // 调用store中mou对应的action
        return store.mou[action](store.state, ...arg);
    };
})(Store);
module.exports = { Store, Dispatch };
