/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// import MyAudio from "./js/audio.js";
	__webpack_require__(1);
	__webpack_require__(3);

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


	fetch("http://localhost:4000/search?query=薛之谦", {
	    mod: "cors"
	}).then(function (res) {
	    return res.json();
	}).then(function (data) {
	    console.log(data.data.songList);
	    var musicList = data.data.songList;
	    window.player = new MyAudio(document.getElementById("player"), musicList);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$q"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _extendableBuiltin(cls) {
	    function ExtendableBuiltin() {
	        var instance = Reflect.construct(cls, Array.from(arguments));
	        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	        return instance;
	    }

	    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
	        constructor: {
	            value: cls,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        }
	    });

	    if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(ExtendableBuiltin, cls);
	    } else {
	        ExtendableBuiltin.__proto__ = cls;
	    }

	    return ExtendableBuiltin;
	}

	var MyQueryDom = function (_extendableBuiltin2) {
	    _inherits(MyQueryDom, _extendableBuiltin2);

	    function MyQueryDom(ele) {
	        _classCallCheck(this, MyQueryDom);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyQueryDom).call(this));

	        console.log(ele);
	        if (ele.length === 1) {
	            _this.context = _this[0] = ele[0];
	        } else {
	            ele.forEach(function (e, i) {
	                _this[i] = e;
	            });
	        }
	        return _this;
	    }

	    _createClass(MyQueryDom, [{
	        key: '_result',
	        value: function _result(result) {
	            if (result.length === 1) {
	                return result[0];
	            }
	            return result;
	        }
	    }, {
	        key: 'attr',
	        value: function attr(string, value) {
	            if (typeof value === 'undefined') {
	                var result = [];
	                this.forEach(function (ele) {
	                    result.push(ele.getAttribute(string));
	                });
	                return this._result(result);
	            } else {
	                this.forEach(function (ele) {
	                    ele.setAttribute(string, value);
	                });
	                return this;
	            }
	        }
	    }, {
	        key: 'removeAttr',
	        value: function removeAttr(string) {
	            this.forEach(function (ele) {
	                ele.removeAttribute(string);
	            });
	            return this;
	        }
	    }, {
	        key: 'data',
	        value: function data(string, val) {
	            if (typeof value === 'undefined') {
	                var result = [];
	                this.forEach(function (ele) {
	                    result.push(ele.dataset[string]);
	                });
	                return this._result(result);
	            } else {
	                this.forEach(function (ele) {
	                    ele.dataset[string] = val;
	                });
	                return this;
	            }
	        }
	    }, {
	        key: 'removeData',
	        value: function removeData(string) {
	            var _this2 = this;

	            this.forEach(function (ele) {
	                _this2.dataset[string] = null;
	            });
	            return this;
	        }
	    }, {
	        key: 'val',
	        value: function val(value) {
	            if (typeof value === 'undefined') {
	                var result = [];
	                this.forEach(function (ele) {
	                    result.push(ele.value);
	                });
	                return this._result(result);
	            } else {
	                this.forEach(function (ele) {
	                    ele.value = value;
	                });
	                return this;
	            }
	        }
	    }, {
	        key: 'text',
	        value: function text(value) {
	            if (typeof value === 'undefined') {
	                var result = [];
	                this.forEach(function (ele) {
	                    result.push(ele.innerText);
	                });
	                return this._result(result);
	            } else {
	                this.forEach(function (ele) {
	                    ele.innerText = value;
	                });
	                return this;
	            }
	        }
	    }, {
	        key: 'after',
	        value: function after(dom) {
	            if (typeof dom === 'string') {
	                this.forEach(function (ele) {
	                    ele.insertAdjacentHTML('afterend', dom);
	                });
	            } else if (dom.nodeType) {
	                this.forEach(function (ele) {
	                    ele.insertAdjacentElement('afterend', dom);
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'before',
	        value: function before(dom) {
	            if (typeof dom === 'string') {
	                this.forEach(function (ele) {
	                    ele.insertAdjacentHTML('beforebegin', dom);
	                });
	            } else if (dom.nodeType) {
	                this.forEach(function (ele) {
	                    ele.insertAdjacentElement('beforebegin', dom);
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(className) {
	            this.forEach(function (ele) {
	                if (ele.classList) {
	                    ele.classList.add(className);
	                } else {
	                    ele.className += ' ' + className;
	                }
	            });
	            return this;
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(className) {
	            this.forEach(function (ele) {
	                if (ele.classList) {
	                    ele.classList.remove(className);
	                } else {
	                    ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	                }
	            });
	            return this;
	        }
	    }, {
	        key: 'toggleClass',
	        value: function toggleClass(className) {
	            this.forEach(function (ele) {
	                if (el.classList) {
	                    ele.classList.toggle(className);
	                } else {
	                    var classes = ele.className.split(' ');
	                    if (classes.includes(className)) {
	                        classes.splice(classes.indexOf(className), 1);
	                    } else {
	                        classes.push(className);
	                    }

	                    ele.className = classes.join(' ');
	                }
	            });
	            return this;
	        }
	    }, {
	        key: 'children',
	        value: function children(str) {
	            var children = [];
	            // 子元素
	            this.forEach(function (ele) {
	                children.push.apply(children, _toConsumableArray(ele.children));
	            });
	            // 该dom下的匹配str的元素
	            if (typeof str !== 'undefined') {
	                var child = [];
	                this.forEach(function (ele) {
	                    child.push.apply(child, _toConsumableArray(ele.querySelectorAll(str)));
	                });
	                var result = [];
	                // 如果子元素在匹配str的元素数组里面则push近result
	                children.forEach(function (ele) {
	                    if (child.includes(ele)) {
	                        result.push(ele);
	                    }
	                });
	                return result;
	            }
	            return children;
	        }
	    }, {
	        key: 'find',
	        value: function find(string) {
	            var result = [];
	            this.forEach(function (ele) {
	                result.push(ele.querySelectorAll(string));
	            });
	            return this._result(result);
	        }
	    }, {
	        key: 'html',
	        value: function html(string) {
	            if (typeof value === 'undefined') {
	                var result = [];
	                this.forEach(function (ele) {
	                    result.push(ele.innerHTML);
	                });
	                return this._result(result);
	            } else {
	                this.forEach(function (ele) {
	                    ele.innerHTML = string;
	                });
	                return this;
	            }
	        }
	    }, {
	        key: 'css',
	        value: function css(prop, val) {
	            if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
	                this.forEach(function (ele) {});
	            } else {
	                this.forEach(function (ele) {
	                    ele.style[prop] = val;
	                });
	            }
	            return this;
	        }
	    }, {
	        key: 'parent',
	        value: function parent(string) {
	            var result = [];
	            this.forEach(function (ele) {
	                result.push(ele.parentNode);
	            });
	            return this._result(result);
	        }
	    }, {
	        key: 'closest',
	        value: function closest(string) {
	            var result = [];
	            this.forEach(function (ele) {
	                result.push.apply(result, _toConsumableArray(ele.closest(string)));
	            });
	            return result;
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            var result = [];
	            this.forEach(function (ele) {
	                result.push(ele.previousElementSibling);
	            });
	            return this._result(result);
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var result = [];
	            this.forEach(function (ele) {
	                result.push(ele.nextElementSibling);
	            });
	            return this._result(result);
	        }
	    }, {
	        key: 'siblings',
	        value: function siblings() {
	            var result = [];
	            this.forEach(function (ele) {
	                var sib = ele.parentNode.children.filter(function (chid) {
	                    return chid !== ele;
	                });
	                result.push.apply(result, _toConsumableArray(sib));
	            });
	            return this._result(result);
	        }
	    }, {
	        key: 'on',
	        value: function on(even, fnc) {
	            this.forEach(function (ele) {
	                ele.addEventListener(even, fnc);
	            });
	            return this;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {}
	    }]);

	    return MyQueryDom;
	}(_extendableBuiltin(Array));

	function MyQuery(ele) {
	    var dom;
	    console.log(ele);
	    if (ele.nodeType) {
	        dom = ele;
	    } else if (typeof ele === 'string') {
	        dom = document.querySelectorAll(ele);
	    } else {
	        return "";
	    }
	    // dom = dom.map(el=>new MyQueryDom(el));
	    return new MyQueryDom(dom);
	}

	module.exports = MyQuery;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["MyAudio"] = __webpack_require__(4);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Music = function () {
	    function Music(obj, dom) {
	        _classCallCheck(this, Music);

	        // {queryId,sondId,songName,artistId,artistName,albumId,albumName,
	        //     songPicSmall,songPicBig,songPicRadio,lrcLink,time,linkCode,
	        //     songLink,showLink,format,rate,size,relateStatus,resourceType} = obj;
	        this.info = obj;
	        this.dom = dom;
	    }

	    _createClass(Music, [{
	        key: "preplay",
	        value: function preplay() {
	            if (this.dom) {
	                this.dom.addClass("active");
	            }
	            return this.info.songLink;
	        }
	    }, {
	        key: "getInfo",
	        value: function getInfo() {
	            return this.info;
	        }
	    }]);

	    return Music;
	}();

	var MyAudio = function () {
	    function MyAudio(ele) {
	        var musicList = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	        var cfg = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	        _classCallCheck(this, MyAudio);

	        this.audio = ele;
	        this.musicList = musicList.map(function (ele) {
	            return new Music(ele);
	        });
	        this.index = 0;
	        var defaultCfg = {
	            ended: function ended() {},
	            play: function play() {},
	            playType: "order"
	        };
	        this.cfg = Object.assign(defaultCfg, cfg);
	        this.audio.addEventListener("ended", this.cfg.ended);
	        this.audio.addEventListener("play", this.cfg.play);
	    }
	    // static search(query){
	    //     const baseUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug?query=";
	    //     var img = new Image();
	    //     img.src = baseUrl+encodeURIComponent(query);
	    //     return img;
	    // }


	    _createClass(MyAudio, [{
	        key: "addMusic",
	        value: function addMusic(music) {
	            if (Array.isArray(music)) {
	                var _musicList;

	                (_musicList = this.musicList).push.apply(_musicList, _toConsumableArray(music.map(function (mus) {
	                    return new Music(mus);
	                })));
	            } else {
	                this.musicList.push(new Music(music));
	            }
	            return this;
	        }
	    }, {
	        key: "removeMusic",
	        value: function removeMusic(music) {
	            if (this.musicList.includes(music)) {
	                this.musicList.splice(this.musicList.indexOf(music), 1);
	            }
	            return this;
	        }
	    }, {
	        key: "getInfo",
	        value: function getInfo() {
	            return {
	                currentSrc: this.audio.currentSrc,
	                volume: this.audio.volume,
	                currentTime: this.audio.currentTime,
	                paused: this.audio.paused,
	                ended: this.audio.ended,
	                startTime: this.audio.startTime,
	                duration: this.audio.duration
	            };
	        }
	    }, {
	        key: "play",
	        value: function play() {
	            this.audio.play();
	            return this;
	        }
	    }, {
	        key: "pause",
	        value: function pause() {
	            this.audio.pause();
	            return this;
	        }
	    }, {
	        key: "increaseVolume",
	        value: function increaseVolume(val) {
	            var volume = this.audio.volume * 100;
	            if (typeof val !== 'undefined') {
	                volume = val;
	            } else {
	                volume = volume + 10;
	            }
	            volume > 100 && (volume = 100);
	            this.audio.volume = volume / 100;
	            return this;
	        }
	    }, {
	        key: "decreaseVolume",
	        value: function decreaseVolume(val) {
	            var volume = this.audio.volume * 100;
	            if (typeof val !== 'undefined') {
	                volume = val;
	            } else {
	                volume = volume - 10;
	            }
	            volume < 0 && (volume = 0);
	            this.audio.volume = volume / 100;
	            return this;
	        }
	    }, {
	        key: "setCurrentTime",
	        value: function setCurrentTime(val) {
	            this.audio.currentTime = val;
	            return this;
	        }
	    }, {
	        key: "load",
	        value: function load(music) {
	            if (!this.musicList.includes(music)) {
	                this.musicList.push(music);
	            }
	            this.audio.src = music.preplay();;
	            this.play();
	            return this;
	        }
	    }, {
	        key: "loop",
	        value: function loop(isLoop) {
	            this.audio.loop = isLoop;
	            return this;
	        }
	    }, {
	        key: "next",
	        value: function next() {
	            if (this.cfg.playType === "order") {
	                this.index++;
	                if (this.index >= this.musicList.length) {
	                    console.log(this.index);
	                    this.index = 0;
	                }
	            } else {
	                this.index = parseInt(Math.random() * this.musicList.length, 10);
	            }
	            this.load(this.musicList[this.index]);
	            console.log(this.index);
	        }
	    }]);

	    return MyAudio;
	}();

	module.exports = MyAudio;

/***/ }
/******/ ]);