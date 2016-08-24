class MyQueryDom extends Array{
    constructor(ele,ctx) {
        super();
        // 如果已经是$q实例.则返回
        if (ele instanceof MyQueryDom) {
            return ele;
        }

        // 单独的一个dom,转成$q对象
        if (ele.nodeType === 1) {
            this[0] = ele;
            return this;
        }else if((Array.isArray(ele)||ele.item) && Array.from(ele).every(el=>el.nodeType === 1)){
            // 多个dom.转成query对象
            Array.from(ele).forEach((el,i)=>{
                this[i] = el;
            });
            return this;
        }else if(/\<.*>/.test(ele)){
            // html则使用parseHTML转成dom对象
            this[0]=MyQueryDom.parseHTML(ele);
            return this;
        }
        // 根据选择器选择dom元素
        var ctx = ctx?(ctx.nodeType === 1 ?ctx:document.querySelector(ctx)):window.document;
        var dom = Array.from(ctx.querySelectorAll(ele));
        dom.forEach((el,i)=>{
            this[i] = el;
        });
        return this;
    }
    // call 关键词可以不需要通过new来创建实例
    call constructor(ele) {
        return new MyQueryDom(ele);
    }
    /**
     * 解析html语句并返回构造出来的dom元素
     */
    static parseHTML(html){
        var el = document.createElement('div');
          el.innerHTML = html;
          return el.children[0];
    }
    /**
     * 处理结果,如果结果为单元素数组则返回该元素,否则返回数组
     */
    _result(result) {
        if (result.length === 1) {
            return result[0];
        }
        return result;
    }
    /**
     * 获取/设置属性
     * value为空则获取
     */
    attr(string, value) {
        if (typeof value === 'undefined') {
            var result = [];
            this.forEach(ele => {
                result.push(ele.getAttribute(string))
            });
            return this._result(result);
        } else {
            this.forEach(ele => {
                ele.setAttribute(string, value);
            });
            return this;
        }
    }
    /**
     * 删除元素
     */
    remove(){
        this.forEach(ele => {
            ele.remove();
        });
    }
    /**
     * 删除属性
     */
    removeAttr(string) {
        this.forEach(ele => {
            ele.removeAttribute(string);
        });
        return this;
    }
    /**
     * 设置/获取 data
     */
    data(string, val) {
        if (typeof val === 'undefined') {
            var result = [];
            this.forEach(ele => {
                result.push(ele.dataset[string])
            });
            return this._result(result);
        } else {
            this.forEach(ele => {
                ele.dataset[string] = val
            });
            return this;
        }
    }
    /**
     * 删除data
     */
    removeData(string) {
        this.forEach(ele => {
            this.dataset[string] = null;
        });
        return this;
    }
    /**
     * 设置/获取 value
     */
    val(value) {
        if (typeof value === 'undefined') {
            var result = [];
            this.forEach(ele => {
                result.push(ele.value)
            })
            return this._result(result)
        } else {
            this.forEach(ele => {
                ele.value = value
            });
            return this;
        }
    }
    /**
     * 设置dom元素的text
     */
    text(value) {
        if (typeof value === 'undefined') {
            var result = [];
            this.forEach(ele => {
                result.push(ele.innerText)
            });
            return this._result(result)
        } else {
            this.forEach(ele => {
                ele.innerText = value
            });
            return this;
        }
    }
    /**
     * 将dom插入到当前元素后面,返回this.链式操作
     */
    after(dom) {
        if (typeof dom === 'string') {
            this.forEach(ele => {
                ele.insertAdjacentHTML('afterend', dom);
            });
        }else if(dom.nodeType){
            this.forEach(ele => {
                ele.insertAdjacentElement('afterend', dom);
            });
        }
        return this;
    }
    /**
     * 将dom插入到当前元素前面,返回this.链式操作
     */
    before(dom) {
        if (typeof dom === 'string') {
            this.forEach(ele => {
                ele.insertAdjacentHTML('beforebegin', dom);
            });
        }else if(dom.nodeType){
            this.forEach(ele => {
                ele.insertAdjacentElement('beforebegin', dom);
            });
        }
        return this;
    }
    /**
     *  判断是否存在某个类
     * 当选择器下所有dom都存在返回true,否则返回false
     */
    hasClass(className){
        var result = [];
        this.forEach(ele => {
            if (ele.classList) {
                result.push(ele.classList.contains(className));
            } else {
                var reg = new RegExp('(^| )' + className + '( |$)', 'gi');
                result.push(reg.test(ele.className));
            }
        });
        return this._result(result);;
    }
    /**
     * 增加类
     */
    addClass(className) {
        this.forEach(ele => {
            if (ele.classList) {
                ele.classList.add(className);
            } else {
                ele.className += ' ' + className;
            }
        });
        return this;
    }
    /**
     * 去掉某个类名
     */
    removeClass(className) {
        this.forEach(ele => {
            if (ele.classList) {
                ele.classList.remove(className);
            } else {
                ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        });
        return this;
    }
    /**
     * 判断是否存在某个类
     * 当选择器下所有dom都存在返回true,否则返回false
     */
    /*hasClass(className) {
        var result = true;
        this.every(ele=>{
            var has = ele.classList.conotains(className);
            if (!has) {
                result = false;
            }
            return has;
        });
        return result;
    }*/
    /**
     * 切换类名
     */
    toggleClass(className) {
        this.forEach(ele=>{
            if (el.classList) {
                ele.classList.toggle(className);
            } else {
                var classes = ele.className.split(' ');
                if (classes.includes(className)) {
                    classes.splice(classes.indexOf(className), 1);
                }else {
                    classes.push(className)
                }

                ele.className = classes.join(' ');
            }
        });
        return this;
    }
    /**
     * 获取匹配str的子类
     */
    children(str) {
        var children = [];
        // 子元素
        this.forEach(ele => {
            children.push(...ele.children)
        });
        // 该dom下的匹配str的元素
        if (typeof str !== 'undefined' ) {
            var child = [];
            this.forEach(ele=>{
                child.push(...ele.querySelectorAll(str));
            });
            var result = [];
            // 如果子元素在匹配str的元素数组里面则push近result
            children.forEach(ele=>{
                if (child.includes(ele)) {
                    result.push(ele);
                }
            });
            return new MyQueryDom(result);
        }
        return new MyQueryDom(children);
    }
    /**
     * 寻找该dom元素下的某个匹配元素
     */
    find(string) {
        var result = [];
        this.forEach(ele => {
            result.push(...ele.querySelectorAll(string));
        });
        return new MyQueryDom(this._result(result));
            /*result.push(new MyQueryDom(Array.from(ele.querySelectorAll(string))));
        })
        return this._result(result);*/
    }
    /**
     * 设置dom下的html
     */
    html(string) {
        if (typeof string === 'undefined') {
            var result = [];
            this.forEach(ele => {
                result.push(ele.innerHTML)
            });
            return new MyQueryDom(this._result(result));
        } else {
            this.forEach(ele => {
                ele.innerHTML = string
            });
            return this;
        }
    }
    /**
     * 设置css属性
     */
    css(prop, val) {
        if(typeof val === 'undefined'){
            var result = [];
            this.forEach(ele => {
                result.push(ele.style.prop);
            });
            return this._result(result)
        } else if (typeof prop === 'object') {
            
        } else {
            this.forEach(ele => {
                ele.style[prop] = val;
            });
        }
        return this;
    }
    /**
     * 获取直接父节点
     */
    parent(string) {
        var result = [];
        this.forEach(ele => {
            result.push(ele.parentNode);
        });
        return new MyQueryDom(this._result(result));
    }
    /**
     * 获取最近的父辈节点
     */
    closest(string){
        var result = [];
        this.forEach(ele=>{
            result.push(...ele.closest(string));
        });
        return new MyQueryDom(result);
    }
    /**
     * 上一个节点
     */
    prev() {
        var result = [];
        this.forEach(ele => {
            if (ele.previousElementSibling) {
                result.push(ele.previousElementSibling)
            }
        });
        return new MyQueryDom(this._result(result));
    }
    /**
     * 下一个节点
     */
    next() {
        var result = [];
        this.forEach(ele => {
            if (ele.nextElementSibling) {
                result.push(ele.nextElementSibling)
            }
        });
        return new MyQueryDom(this._result(result));
    }
    /**
     * 兄弟节点
     */
    siblings() {
        var result = [];
        this.forEach(ele => {
            var sib = Array.from(ele.parentNode.children).filter(chid => {
                return chid !== ele;
            });
            result.push(...sib);
        })
        return new MyQueryDom(this._result(result));
    }
    /**
     * 绑定事件
     */
    on(even,fnc){
        this.forEach(ele=>{
            ele.addEventListener(even,fnc)
        });
        return this;
    }
    /**
     * 解绑事件
     */
    unbind(even,fnc){
        this.forEach(ele=>{
            ele.removeEventListener(even,fnc)
        });
        return this;
    }
    /**
     * 插入元素
     */
    appendChild(child){
        this.forEach(ele=>{
            ele.appendChild(child);
        });
        return this;
    }
    toString(){

    }
}
// function MyQuery(ele){
//     var dom ;
//     if (ele.nodeType) {
//         dom = [ele]
//     }else if(typeof ele === 'string'){
//         dom = Array.from(document.querySelectorAll(ele));
//     }else {
//         console.error("没有匹配到");
//         return "";
//     }
//     return new MyQueryDom(dom);
// }
// MyQuery.parseHTML = function(string){
//     var el = document.createElement("div");
//     el.innerHTML = string;
//     return el.children[0];
// }
module.exports = MyQueryDom;
