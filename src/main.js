require("./sass/style.scss");
// require("../index.html");
console.log("helo");
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


$q("#player").on('timeupdate', function(){
    var progress = (this.currentTime/this.duration)*1000;
    $q(".time-line").val(progress);
    $q(".played-progress").css('width', progress/10+'%')
});

$q(".time-line").on('input',function () {
    Dispatch("CHANGE_CURRENT_TIME", $q("#player")[0].duration*$q(this).val()/1000);
    // $q("#player")[0].currentTime = $q("#player")[0].duration*$q(this).val()/1000;
    $q(".played-progress").css('width', $q(this).val()/10*0.99+'%')
});

