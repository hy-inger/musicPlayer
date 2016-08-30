require("expose?$q!./query.js");



let _resizeCallback = function(range){   //为Range动态生成_calculate函数,当屏幕变化，dom的位置和大小也会有变化
    range._calculate = null;
    range._calculate = (function(){        //为避免反复访问dom的属性，使用闭包缓存该属性
        let length = range.container[0].offsetWidth;
        let left = range.container[0].offsetLeft;
        return function(pos){   
            return (pos-left)/length;
        } 
    })();       
} 
  
class Range{
    constructor(containerId, workRnageId, callBack, pos){  
        this.container = typeof containerId == 'string' ? $q("#" + containerId) : null; //进度条容器
        if(!this.container) return false;
        this.workRange = $q("#" + workRnageId) ? $q("#" + workRnageId) : $("body");  //鼠标滑动生效范围

        this.timeLine = null;     //进度条dom引用
        this.palyedProgress = null ;    //已走进度dom引用
        this.slider = null;      //滑动光标dom引用
        this.isHold = false;
        this._calculate = null;       //该函数计算出每次操作得出的0到100之间的数值
        this.callBack = callBack;   //数值改变后的回调函数
        this.init(containerId, pos);  
        _resizeCallback.bind(this);                                                    
    }

    init(containerId, pos){    //初始化dom元素引用以及各项设置
        this.container.addClass('progress-container').html(' <div class="time-line"></div><div class="played-progress"><div class="slider"></div></div>');
        this.timeLine = this.container.find(".time-line");
        this.palyedProgress = this.container.find( ".played-progress ") ;
        this.slider = this.container.find(".slider");
        pos && this.toPos(pos);
        _resizeCallback(this);
        window.addEventListener('resize', event =>{
            _resizeCallback(this);
        },false);
        this.bindEvent();                                          
    }

    toPos(percent){     //数值变化后的已走进度长度和光标位置的设置
        this.palyedProgress.css('width', percent+'%');
    }

    bindEvent(){
        this.slider.on('mousedown', event =>{      //启动拖动
            this.isHold = true;
        });

        $q("body").on('mouseup', event =>{     //释放拖动
            this.isHold = false;
        });

        this.workRange.on('mousemove', event =>{    //监听拖动光标
            if(!this.isHold) return;
            let progress = this._calculate(event.clientX);
            if(progress >= 1){
                progress = 1;
            }else if(progress<=0){
                progress = 0;
            }
            this.toPos(progress*100);
            this.callBack(progress);
        });

        this.container.on('click', event => {   //监听点击进度条
            let progress = this._calculate(event.clientX);
            this.toPos(progress*100);
            this.callBack(progress);
        });
        
    }

}  

module.exports = Range;
      

