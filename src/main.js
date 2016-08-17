// import MyAudio from "./js/audio.js";
require("expose?$q!./js/query.js");
require("expose?MyAudio!./js/audio.js");
require("./sass/style.scss");

fetch("http://localhost:4000/search?query=陈奕迅",{
    mod:"cors"
}).then(res=>res.json()).then(data=>{
    var musicList = data.data.songList;
    window.player = new MyAudio(document.getElementById("player"),musicList);
    player.next();
});

$q("button[name='play']").on('click', function(event) {
    event.preventDefault();
    var status = $q(this).data("status");
    if (status === 'play') {
        window.player.pause();
        $q(this).data("status","paused")
    }else {
        window.player.play();
        $q(this).data("status","play")
    }
});
$q("button[changebtn]").on('click', function(event) {
    var type = $q(this).attr("action-type");
    if (type === 'next') {
        window.player.next();
    }else {
        window.player.prev();
    }
});
$q("#search-btn").on('click', function(event) {
    var val = $q("#search-input").val();
    fetch("http://localhost:4000/search?query="+val,{
        mod:"cors"
    }).then(res=>res.json()).then(data=>{
        console.log(data.data.songList);
    });
});
