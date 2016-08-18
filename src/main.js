require("./sass/style.scss");
var {Store,Dispatch} = require("./js/ctrl.js");
window.player = Store.state.player;
$q("button[name='play']").on('click', function(event) {
    event.preventDefault();
    Dispatch("CHANGE_STATE")
});
$q("button[changebtn]").on('click', function(event) {
    var type = $q(this).attr("action-type");
    if (type === 'next') {
        Dispatch("NEXT");
    }else {
        Dispatch("PREV");
    }
});
$q("#search-btn").on('click', function(event) {
    var val = $q("#search-input").val();
    Dispatch("SEARCH",val)
});
