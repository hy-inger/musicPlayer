require("./sass/style.scss");
// require("../index.html");
var { Store, Dispatch } = require("./js/ctrl.js");
window.player = Store.state.player;
Dispatch("SEARCH", "陈奕迅", function(musicList) {
    createSearchList(musicList);
});
$q("button[name='play']").on('click', function(event) {
    event.preventDefault();
    // 分发改变当前播放状态事件
    Dispatch("CHANGE_STATE");
});
$q("button[changebtn]").on('click', function(event) {
    var type = $q(this).attr("action-type");
    if (type === 'next') {
        // 分发下一首音乐事件
        Dispatch("NEXT");
    } else {
        // 分发上一首音乐事件
        Dispatch("PREV");
    }
});
$q("#search-btn").on('click', function(event) {
    var val = $q("#search-input").val();
    // 分发搜索音乐事件
    Dispatch("SEARCH", val, function(musicList) {
        createSearchList(musicList);
    });
});

$q("#player").on("pause", function() {
    $q("button[name='play']").removeClass("pause-btn").addClass("play-btn");
}).on("play", function() {
    $q("button[name='play']").removeClass("play-btn").addClass("pause-btn");
});


$q("#player").on('timeupdate', function() {
    var progress = (this.currentTime / this.duration) * 1000;
    $q(".time-line").val(progress);
    $q(".played-progress").css('width', progress / 10 + '%');
});

$q(".time-line").on('input', function() {
    // Dispatch("CHANGE_CURRENT_TIME", $q(this).val()/10);
    $q("#player")[0].currentTime = $q("#player")[0].duration * $q(this).val() / 1000;
    $q(".played-progress").css('width', $q(this).val() / 10 * 0.99 + '%');
});

// 根据获取的音乐数据构造音乐列表
function createSearchList(musicList) {
    // 刷新当前搜索列表数据
    Dispatch("REFRESH_SEARCH_LIST", musicList);
    // 构造音乐列表,此处应提供回调函数给main.js调用.并且操作相应的dom元素
    var tbody = "";
    musicList.forEach((music, index) => {
        tbody += `<tr data-index="${index}"><td>${index}</td><td>${music.songName}</td><td>${music.artistName}</td><td>${music.albumName}</td><td>${Math.floor(music.time/60)}:${Math.floor(music.time%60)}</td></tr>`;
    });
    $q(".search-list tbody").html(tbody);
    // 搜索音乐列表双击播放事件
    $q(".search-list tbody tr").on('dblclick', function(event) {
        var index = $q(this).data("index");
        // 从搜索列表中添加音乐到播放列表并播放
        Dispatch("LOAD_FROM_SEARCHLIST", index, function(music) {
            $q(".song-list")[0].appendChild(music.dom);
            // 获取歌词
            Dispatch('GET_MUSIC_LRC', music);
        });
    }).on("click", function() {
        $q(".search-list tbody tr").removeClass('active');
        // 从搜索列表单击只能触发选中状态
        $q(this).addClass('active');
    });
}
