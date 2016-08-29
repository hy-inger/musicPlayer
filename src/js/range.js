require("expose?$q!./query.js");
  
class Range{
    constructor(containerId, workRnageId, callBack){
        this.container = typeof containerId == 'string' ? $q("#" + containerId) : null;
        if(!this.container) return false;
        this.workRange = $q("#" + workRnageId) ? $("body");

        this.timeLine = null;
        this.palyedProgress = null ;
        this.slider = null; 
        let _isHold = false;  
        let _calculate = null;
        let _resizeCallback = function(){
            _calculate = null;
            _calculate = (function(){
                let length = this.container[0].offsetWidth;
                let left = this.container[0].offsetLeft;
                return function(pos){
                    return (pos-left)/length;
                } 
            })();       
        }       
        
        this.init();                            
                            
    }

    init(){
        this.container.addClass('progress-container').html(' <div  class="time-line"></div><div class="played-progress"><div class="slider"></div></div>');
        this.timeLine = $q("#containerId .time-line");
        this.palyedProgress = $("#containerId .played-progress ") ;
        this.slider = $('#containerId .slider'); 
        _resizeCallback(); 
        $q(window).on('resize', _resizeCallback);
        this.bindEvent();                                          
    }

    toPos(percent){
        this.palyedProgress.css('width', percent+'%');
    }

    bindEvent(){
        this.slider.on('mousedown', function(){
            console.log(_isHold);
            _isHold = true;
        });

        $("body").on('mouseup', function(){
            console.log(_isHold);
            _ishold = false;
        });

        this.workRange.on('mousemove', function(e){
            if(!_isHold) return;
            let progress = calculate(e.clientX);
            if(progress >= 1){
                progress = 1;
            }else if(progress<=0){
                progress = 0;
            }
            this.toPos(progress*100);
            this.callBack(progress);
        });

        this.container.on('click',function (e) {
            let progress = calculate(e.clientX);
            this.toPos(progress*100);
            this.callBack(progress);
        });
        
    }



}


