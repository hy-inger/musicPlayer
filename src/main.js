// import MyAudio from "./js/audio.js";
require("expose?$q!./js/query.js");
require("expose?MyAudio!./js/audio.js");

// fetch("./src//music.json").then(res=>{
//     if (res.ok) {
//         return res.json();
//     }
// }).then(data=>{
//     data = data.map(el=>el.data.songList[0])
//     player.addMusic(data)
//     console.log(data);
// },error=>{
//     console.log(error);
// });


fetch("http://localhost:4000/search?query=陈奕迅",{
    mod:"cors"
}).then(res=>res.json()).then(data=>{
    console.log(data.data.songList);
    var musicList = data.data.songList;
    window.player = new MyAudio(document.getElementById("player"),musicList);
})
