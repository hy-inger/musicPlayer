// import MyAudio from "./js/audio.js";
require("expose?$q!./js/query.js");
require("expose?MyAudio!./js/audio.js");


fetch("http://localhost:4000/search?query=陈奕迅",{
    mod:"cors"
}).then(res=>res.json()).then(data=>{
    console.log(data.data.songList);
    var musicList = data.data.songList;
    window.player = new MyAudio(document.getElementById("player"),musicList);
    player.next()
})
