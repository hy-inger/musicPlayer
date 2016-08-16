class MyQueryDom extends Array{
    constructor(ele) {
        super();
        if (ele.length === 1) {
            this[0] = ele[0];
        }else {
            ele.forEach((e,i)=>{
                this[i] = e;
            })
        }
    }
    _result(result) {
        if (result.length === 1) {
            return result[0];
        }
        return result;
    }
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
    removeAttr(string) {
        this.forEach(ele => {
            ele.removeAttribute(string);
        });
        return this;
    }
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
    removeData(string) {
        this.forEach(ele => {
            this.dataset[string] = null;
        });
        return this;
    }
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
            return result;
        }
        return children;
    }
    find(string) {
        var result = [];
        this.forEach(ele => {
            result.push(ele.querySelectorAll(string));
        })
        return this._result(result);
    }
    html(string) {
        if (typeof value === 'undefined') {
            var result = [];
            this.forEach(ele => {
                result.push(ele.innerHTML)
            });
            return this._result(result)
        } else {
            this.forEach(ele => {
                ele.innerHTML = string
            });
            return this;
        }
    }
    css(prop, val) {
        if (typeof prop === 'object') {
            this.forEach(ele => {

            });
        } else {
            this.forEach(ele => {
                ele.style[prop] = val;
            });
        }
        return this;
    }
    parent(string) {
        var result = [];
        this.forEach(ele => {
            result.push(ele.parentNode);
        });
        return this._result(result);
    }
    closest(string){
        var result = [];
        this.forEach(ele=>{
            result.push(...ele.closest(string));
        });
        return result;
    }
    prev() {
        var result = [];
        this.forEach(ele => {
            result.push(ele.previousElementSibling)
        });
        return this._result(result);
    }
    next() {
        var result = [];
        this.forEach(ele => {
            result.push(ele.nextElementSibling)
        });
        return this._result(result);
    }
    siblings() {
        var result = [];
        this.forEach(ele => {
            var sib = ele.parentNode.children.filter(chid => {
                return chid !== ele;
            });
            result.push(...sib);
        })
        return this._result(result);
    }
    on(even,fnc){
        this.forEach(ele=>{
            ele.addEventListener(even,fnc)
        });
        return this;
    }
    toString(){

    }
}
function MyQuery(ele){
    var dom ;
    if (ele.nodeType) {
        dom = [ele]
    }else if(typeof ele === 'string'){
        dom = Array.from(document.querySelectorAll(ele));
    }else {
        console.error("没有匹配到");
        return "";
    }
    return new MyQueryDom(dom);
}

module.exports = MyQuery;
