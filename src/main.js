require("./sass/style.scss");
// require("../index.html");
var {Store,Dispatch} = require("./js/ctrl.js");
window.player = Store.state.player;
Dispatch("SEARCH","陈奕迅")
$q("button[name='play']").on('click', function(event) {
    event.preventDefault();
    // 分发改变当前播放状态事件
    Dispatch("CHANGE_STATE")
});
$q("button[changebtn]").on('click', function(event) {
    var type = $q(this).attr("action-type");
    if (type === 'next') {
        // 分发下一首音乐事件
        Dispatch("NEXT");
    }else {
        // 分发上一首音乐事件
        Dispatch("PREV");
    }
});
$q("#search-btn").on('click', function(event) {
    var val = $q("#search-input").val();
    // 分发搜索音乐事件
    Dispatch("SEARCH",val)
});

$q("#player").on("pause", function(){
    $q("button[name='play']").removeClass("pause-btn").addClass("play-btn");
}).on("play", function(){
    $q("button[name='play']").removeClass("play-btn").addClass("pause-btn");
});

// $q("#player").on('durationchange', function(){
//     $q("#duration").text(parseInt(this.duration));
//     // console.log(this.duration);
// });

$q("#player").on('timeupdate', function(){
    var progress = (this.currentTime/this.duration)*100;
    $q(".played-progress").css('width',progress+'%');
    // $q("#current-time").text(parseInt(this.currentTime));
});

var clickPos = (function(){
    var length = $q(".progress-container")[0].offsetWidth,
        left = $q(".progress-container")[0].offsetLeft;
    return function(pos){
        return (pos-left)/length;
    }
})();

$q(".progress-container").on('click',function (e) {
    var progress = clickPos(e.clientX);
    $q("#player")[0].currentTime = parseInt($q("#player")[0].duration*progress);
    $q(".played-progress").css('width',progress*100+'%');
});

var isHold = false;

$q(".slider").on('mousedown', function(){
    isHold = true;
    console.log(isHold);
});


$q(".progress-container").on('mouseup', function(){
    isHold = false;
    console.log(isHold);
});

$q(".player-control-bar").on('mousemove', function(e){
    if(!isHold) return;
    var progress = clickPos(e.clientX);
    if(progress >= 1){
        progress = 1;
    }else if(progress<=0){
        progress = 0;
    }
    $q("#player")[0].currentTime = parseInt($q("#player")[0].duration*progress);
    $q(".played-progress").css('width',progress*100+'%');
});