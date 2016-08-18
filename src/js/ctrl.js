var {MyAudio,Music} = require("./audio.js");
require("expose?$q!./query.js");
function createMusicDom(music){
    var index = $q(".song-list li").length;
    var li = `<li><span>${index}</span><span>${music.songName}</span></li>`;
    var dom = $q.parseHTML(li)
    var mus = new Music(music,dom);
    $q(dom).on('click', function(event) {
        event.preventDefault();
        window.player.load(mus);
    });
    return mus;
}
var Store = {
    state : {
        player:new MyAudio(document.getElementById("player")),
        searchList:[]
    },
    mou : {
        PLAY(state){
            state.player.play();
        },
        PAUSE(state){
            state.player.pause();
        },
        SEARCH(state,query){
            fetch("http://localhost:4000/search?query="+query,{
                mod:"cors"
            }).then(res=>res.json()).then(data=>{
                console.log(data.data.songList);
                var songList = data.data.songList;
                var tbody = "";
                songList.forEach((music,index)=>{
                    tbody += `<tr data-index="${index}"><td>${index}</td><td>${music.songName}</td><td>${music.artistName}</td><td>${music.albumName}</td><td>${Math.floor(music.time/60)}:${Math.floor(music.time%60)}</td></tr>`;
                });
                $q(".search-list tbody").html(tbody);
                $q(".search-list tbody tr").on('click', function(event) {
                    var index = $q(this).data("index");
                    var mus = createMusicDom(songList[index]);
                    $q(".song-list")[0].appendChild(mus.dom)
                    window.player.load(mus);
                });
            });
        },
        CHANGE_STATE(state){
            if (state.player.audio.paused) {
                state.player.play();
            }else{
                state.player.pause();
            }
        },
        NEXT(state){
            state.player.next();
        },
        PREV(state){
            state.player.prev();
        }
    }
}

var Dispatch = (function(store){
    return function(action,...arg){
        console.log("ACTION-------->>>",action);
        return store.mou[action](store.state,arg);
    }
})(Store);
module.exports = {Store,Dispatch};
