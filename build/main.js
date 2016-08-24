/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "7d06389f9aacab5ddcfd"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 1;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

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

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\n__webpack_require__(4);\n// require(\"../index.html\");\n\nvar _require = __webpack_require__(5);\n\nvar Store = _require.Store;\nvar Dispatch = _require.Dispatch;\n\nwindow.player = Store.state.player;\nDispatch(\"SEARCH\", \"陈奕迅\");\n$q(\"button[name='play']\").on('click', function (event) {\n    event.preventDefault();\n    // 分发改变当前播放状态事件\n    Dispatch(\"CHANGE_STATE\");\n});\n$q(\"button[changebtn]\").on('click', function (event) {\n    var type = $q(this).attr(\"action-type\");\n    if (type === 'next') {\n        // 分发下一首音乐事件\n        Dispatch(\"NEXT\");\n    } else {\n        // 分发上一首音乐事件\n        Dispatch(\"PREV\");\n    }\n});\n$q(\"#search-btn\").on('click', function (event) {\n    var val = $q(\"#search-input\").val();\n    // 分发搜索音乐事件\n    Dispatch(\"SEARCH\", val);\n});\n$q(\"input[type='range']\").on('input', function (event) {\n    // 分发改变音乐大小事件\n    Dispatch(\"CHANGE_VOLUME\", Number.parseInt(this.value));\n});\n\n$q(\"#player\").on(\"pause\", function () {\n    $q(\"button[name='play']\").removeClass(\"pause-btn\").addClass(\"play-btn\");\n}).on(\"play\", function () {\n    $q(\"button[name='play']\").removeClass(\"play-btn\").addClass(\"pause-btn\");\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz8zNDc5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0JBQVEsQ0FBUjtBQUNBOztlQUN1QixvQkFBUSxDQUFSLEM7O0lBQWxCLEssWUFBQSxLO0lBQU0sUSxZQUFBLFE7O0FBQ1gsT0FBTyxNQUFQLEdBQWdCLE1BQU0sS0FBTixDQUFZLE1BQTVCO0FBQ0EsU0FBUyxRQUFULEVBQWtCLEtBQWxCO0FBQ0EsR0FBRyxxQkFBSCxFQUEwQixFQUExQixDQUE2QixPQUE3QixFQUFzQyxVQUFTLEtBQVQsRUFBZ0I7QUFDbEQsVUFBTSxjQUFOO0FBQ0E7QUFDQSxhQUFTLGNBQVQ7QUFDSCxDQUpEO0FBS0EsR0FBRyxtQkFBSCxFQUF3QixFQUF4QixDQUEyQixPQUEzQixFQUFvQyxVQUFTLEtBQVQsRUFBZ0I7QUFDaEQsUUFBSSxPQUFPLEdBQUcsSUFBSCxFQUFTLElBQVQsQ0FBYyxhQUFkLENBQVg7QUFDQSxRQUFJLFNBQVMsTUFBYixFQUFxQjtBQUNqQjtBQUNBLGlCQUFTLE1BQVQ7QUFDSCxLQUhELE1BR007QUFDRjtBQUNBLGlCQUFTLE1BQVQ7QUFDSDtBQUNKLENBVEQ7QUFVQSxHQUFHLGFBQUgsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUyxLQUFULEVBQWdCO0FBQzFDLFFBQUksTUFBTSxHQUFHLGVBQUgsRUFBb0IsR0FBcEIsRUFBVjtBQUNBO0FBQ0EsYUFBUyxRQUFULEVBQWtCLEdBQWxCO0FBQ0gsQ0FKRDtBQUtBLEdBQUcscUJBQUgsRUFBMEIsRUFBMUIsQ0FBNkIsT0FBN0IsRUFBc0MsVUFBUyxLQUFULEVBQWdCO0FBQ2xEO0FBQ0EsYUFBUyxlQUFULEVBQXlCLE9BQU8sUUFBUCxDQUFnQixLQUFLLEtBQXJCLENBQXpCO0FBQ0gsQ0FIRDs7QUFLQSxHQUFHLFNBQUgsRUFBYyxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFlBQVU7QUFDaEMsT0FBRyxxQkFBSCxFQUEwQixXQUExQixDQUFzQyxXQUF0QyxFQUFtRCxRQUFuRCxDQUE0RCxVQUE1RDtBQUNILENBRkQsRUFFRyxFQUZILENBRU0sTUFGTixFQUVjLFlBQVU7QUFDcEIsT0FBRyxxQkFBSCxFQUEwQixXQUExQixDQUFzQyxVQUF0QyxFQUFrRCxRQUFsRCxDQUEyRCxXQUEzRDtBQUNILENBSkQiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCIuL3Nhc3Mvc3R5bGUuc2Nzc1wiKTtcbi8vIHJlcXVpcmUoXCIuLi9pbmRleC5odG1sXCIpO1xudmFyIHtTdG9yZSxEaXNwYXRjaH0gPSByZXF1aXJlKFwiLi9qcy9jdHJsLmpzXCIpO1xud2luZG93LnBsYXllciA9IFN0b3JlLnN0YXRlLnBsYXllcjtcbkRpc3BhdGNoKFwiU0VBUkNIXCIsXCLpmYjlpZXov4VcIilcbiRxKFwiYnV0dG9uW25hbWU9J3BsYXknXVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8g5YiG5Y+R5pS55Y+Y5b2T5YmN5pKt5pS+54q25oCB5LqL5Lu2XG4gICAgRGlzcGF0Y2goXCJDSEFOR0VfU1RBVEVcIilcbn0pO1xuJHEoXCJidXR0b25bY2hhbmdlYnRuXVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciB0eXBlID0gJHEodGhpcykuYXR0cihcImFjdGlvbi10eXBlXCIpO1xuICAgIGlmICh0eXBlID09PSAnbmV4dCcpIHtcbiAgICAgICAgLy8g5YiG5Y+R5LiL5LiA6aaW6Z+z5LmQ5LqL5Lu2XG4gICAgICAgIERpc3BhdGNoKFwiTkVYVFwiKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIC8vIOWIhuWPkeS4iuS4gOmmlumfs+S5kOS6i+S7tlxuICAgICAgICBEaXNwYXRjaChcIlBSRVZcIik7XG4gICAgfVxufSk7XG4kcShcIiNzZWFyY2gtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHZhbCA9ICRxKFwiI3NlYXJjaC1pbnB1dFwiKS52YWwoKTtcbiAgICAvLyDliIblj5HmkJzntKLpn7PkuZDkuovku7ZcbiAgICBEaXNwYXRjaChcIlNFQVJDSFwiLHZhbClcbn0pO1xuJHEoXCJpbnB1dFt0eXBlPSdyYW5nZSddXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgLy8g5YiG5Y+R5pS55Y+Y6Z+z5LmQ5aSn5bCP5LqL5Lu2XG4gICAgRGlzcGF0Y2goXCJDSEFOR0VfVk9MVU1FXCIsTnVtYmVyLnBhcnNlSW50KHRoaXMudmFsdWUpKTtcbn0pO1xuXG4kcShcIiNwbGF5ZXJcIikub24oXCJwYXVzZVwiLCBmdW5jdGlvbigpe1xuICAgICRxKFwiYnV0dG9uW25hbWU9J3BsYXknXVwiKS5yZW1vdmVDbGFzcyhcInBhdXNlLWJ0blwiKS5hZGRDbGFzcyhcInBsYXktYnRuXCIpO1xufSkub24oXCJwbGF5XCIsIGZ1bmN0aW9uKCl7XG4gICAgJHEoXCJidXR0b25bbmFtZT0ncGxheSddXCIpLnJlbW92ZUNsYXNzKFwicGxheS1idG5cIikuYWRkQ2xhc3MoXCJwYXVzZS1idG5cIik7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21haW4uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global[\"$q\"] = __webpack_require__(2);\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVlcnkuanM/OWFiZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxRyIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCIkcVwiXSA9IHJlcXVpcmUoXCItIS9ob21lL2h1YW5neWluZy9wcm9qZWN0L211c2ljUGxheWVyL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvaW5kZXguanMhL2hvbWUvaHVhbmd5aW5nL3Byb2plY3QvbXVzaWNQbGF5ZXIvc3JjL2pzL3F1ZXJ5LmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4cG9zZS1sb2FkZXI/JHEhLi9zcmMvanMvcXVlcnkuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _extendableBuiltin(cls) {\n    function ExtendableBuiltin() {\n        var instance = Reflect.construct(cls, Array.from(arguments));\n        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));\n        return instance;\n    }\n\n    ExtendableBuiltin.prototype = Object.create(cls.prototype, {\n        constructor: {\n            value: cls,\n            enumerable: false,\n            writable: true,\n            configurable: true\n        }\n    });\n\n    if (Object.setPrototypeOf) {\n        Object.setPrototypeOf(ExtendableBuiltin, cls);\n    } else {\n        ExtendableBuiltin.__proto__ = cls;\n    }\n\n    return ExtendableBuiltin;\n}\n\nvar _MyQueryDom = function (_extendableBuiltin2) {\n    _inherits(MyQueryDom, _extendableBuiltin2);\n\n    function MyQueryDom(ele, ctx) {\n        var _ret5;\n\n        _classCallCheck(this, MyQueryDom);\n\n        // 如果已经是$q实例.则返回\n        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyQueryDom).call(this));\n\n        if (ele instanceof MyQueryDom) {\n            var _ret;\n\n            return _ret = ele, _possibleConstructorReturn(_this, _ret);\n        }\n\n        // 单独的一个dom,转成$q对象\n        if (ele.nodeType === 1) {\n            var _ret2;\n\n            _this[0] = ele;\n            return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);\n        } else if ((Array.isArray(ele) || ele.item) && Array.from(ele).every(function (el) {\n            return el.nodeType === 1;\n        })) {\n            var _ret3;\n\n            // 多个dom.转成query对象\n            Array.from(ele).forEach(function (el, i) {\n                _this[i] = el;\n            });\n            return _ret3 = _this, _possibleConstructorReturn(_this, _ret3);\n        } else if (/\\<.*>/.test(ele)) {\n            var _ret4;\n\n            // html则使用parseHTML转成dom对象\n            _this[0] = MyQueryDom.parseHTML(ele);\n            return _ret4 = _this, _possibleConstructorReturn(_this, _ret4);\n        }\n        // 根据选择器选择dom元素\n        var ctx = ctx ? ctx.nodeType === 1 ? ctx : document.querySelector(ctx) : window.document;\n        var dom = Array.from(ctx.querySelectorAll(ele));\n        dom.forEach(function (el, i) {\n            _this[i] = el;\n        });\n        return _ret5 = _this, _possibleConstructorReturn(_this, _ret5);\n    }\n    // function MyQuery(ele){\n    //     var dom ;\n    //     if (ele.nodeType) {\n    //         dom = [ele]\n    //     }else if(typeof ele === 'string'){\n    //         dom = Array.from(document.querySelectorAll(ele));\n    //     }else {\n    //         console.error(\"没有匹配到\");\n    //         return \"\";\n    //     }\n    //     return new MyQueryDom(dom);\n    // }\n    // MyQuery.parseHTML = function(string){\n    //     var el = document.createElement(\"div\");\n    //     el.innerHTML = string;\n    //     return el.children[0];\n    // }\n\n    // call 关键词可以不需要通过new来创建实例\n\n\n    _createClass(MyQueryDom, [{\n        key: '_result',\n\n        /**\n         * 处理结果,如果结果为单元素数组则返回该元素,否则返回数组\n         */\n        value: function _result(result) {\n            if (result.length === 1) {\n                return result[0];\n            }\n            return result;\n        }\n        /**\n         * 获取/设置属性\n         * value为空则获取\n         */\n\n    }, {\n        key: 'attr',\n        value: function attr(string, value) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.getAttribute(string));\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.setAttribute(string, value);\n                });\n                return this;\n            }\n        }\n        /**\n         * 删除元素\n         */\n\n    }, {\n        key: 'remove',\n        value: function remove() {\n            this.forEach(function (ele) {\n                ele.remove();\n            });\n        }\n        /**\n         * 删除属性\n         */\n\n    }, {\n        key: 'removeAttr',\n        value: function removeAttr(string) {\n            this.forEach(function (ele) {\n                ele.removeAttribute(string);\n            });\n            return this;\n        }\n        /**\n         * 设置/获取 data\n         */\n\n    }, {\n        key: 'data',\n        value: function data(string, val) {\n            if (typeof val === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.dataset[string]);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.dataset[string] = val;\n                });\n                return this;\n            }\n        }\n        /**\n         * 删除data\n         */\n\n    }, {\n        key: 'removeData',\n        value: function removeData(string) {\n            var _this2 = this;\n\n            this.forEach(function (ele) {\n                _this2.dataset[string] = null;\n            });\n            return this;\n        }\n        /**\n         * 设置/获取 value\n         */\n\n    }, {\n        key: 'val',\n        value: function val(value) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.value);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.value = value;\n                });\n                return this;\n            }\n        }\n        /**\n         * 设置dom元素的text\n         */\n\n    }, {\n        key: 'text',\n        value: function text(value) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.innerText);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.innerText = value;\n                });\n                return this;\n            }\n        }\n        /**\n         * 将dom插入到当前元素后面,返回this.链式操作\n         */\n\n    }, {\n        key: 'after',\n        value: function after(dom) {\n            if (typeof dom === 'string') {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentHTML('afterend', dom);\n                });\n            } else if (dom.nodeType) {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentElement('afterend', dom);\n                });\n            }\n            return this;\n        }\n        /**\n         * 将dom插入到当前元素前面,返回this.链式操作\n         */\n\n    }, {\n        key: 'before',\n        value: function before(dom) {\n            if (typeof dom === 'string') {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentHTML('beforebegin', dom);\n                });\n            } else if (dom.nodeType) {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentElement('beforebegin', dom);\n                });\n            }\n            return this;\n        }\n        /**\n         *  判断是否存在某个类\n         * 当选择器下所有dom都存在返回true,否则返回false\n         */\n\n    }, {\n        key: 'hasClass',\n        value: function hasClass(className) {\n            var result = [];\n            this.forEach(function (ele) {\n                if (ele.classList) {\n                    result.push(ele.classList.contains(className));\n                } else {\n                    var reg = new RegExp('(^| )' + className + '( |$)', 'gi');\n                    result.push(reg.test(ele.className));\n                }\n            });\n            return this._result(result);;\n        }\n        /**\n         * 增加类\n         */\n\n    }, {\n        key: 'addClass',\n        value: function addClass(className) {\n            this.forEach(function (ele) {\n                if (ele.classList) {\n                    ele.classList.add(className);\n                } else {\n                    ele.className += ' ' + className;\n                }\n            });\n            return this;\n        }\n        /**\n         * 去掉某个类名\n         */\n\n    }, {\n        key: 'removeClass',\n        value: function removeClass(className) {\n            this.forEach(function (ele) {\n                if (ele.classList) {\n                    ele.classList.remove(className);\n                } else {\n                    ele.className = ele.className.replace(new RegExp('(^|\\\\b)' + className.split(' ').join('|') + '(\\\\b|$)', 'gi'), ' ');\n                }\n            });\n            return this;\n        }\n        /**\n         * 判断是否存在某个类\n         * 当选择器下所有dom都存在返回true,否则返回false\n         */\n        /*hasClass(className) {\n            var result = true;\n            this.every(ele=>{\n                var has = ele.classList.conotains(className);\n                if (!has) {\n                    result = false;\n                }\n                return has;\n            });\n            return result;\n        }*/\n        /**\n         * 切换类名\n         */\n\n    }, {\n        key: 'toggleClass',\n        value: function toggleClass(className) {\n            this.forEach(function (ele) {\n                if (el.classList) {\n                    ele.classList.toggle(className);\n                } else {\n                    var classes = ele.className.split(' ');\n                    if (classes.includes(className)) {\n                        classes.splice(classes.indexOf(className), 1);\n                    } else {\n                        classes.push(className);\n                    }\n\n                    ele.className = classes.join(' ');\n                }\n            });\n            return this;\n        }\n        /**\n         * 获取匹配str的子类\n         */\n\n    }, {\n        key: 'children',\n        value: function children(str) {\n            var children = [];\n            // 子元素\n            this.forEach(function (ele) {\n                children.push.apply(children, _toConsumableArray(ele.children));\n            });\n            // 该dom下的匹配str的元素\n            if (typeof str !== 'undefined') {\n                var child = [];\n                this.forEach(function (ele) {\n                    child.push.apply(child, _toConsumableArray(ele.querySelectorAll(str)));\n                });\n                var result = [];\n                // 如果子元素在匹配str的元素数组里面则push近result\n                children.forEach(function (ele) {\n                    if (child.includes(ele)) {\n                        result.push(ele);\n                    }\n                });\n                return new MyQueryDom(result);\n            }\n            return new MyQueryDom(children);\n        }\n        /**\n         * 寻找该dom元素下的某个匹配元素\n         */\n\n    }, {\n        key: 'find',\n        value: function find(string) {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push.apply(result, _toConsumableArray(ele.querySelectorAll(string)));\n            });\n            return new MyQueryDom(this._result(result));\n            /*result.push(new MyQueryDom(Array.from(ele.querySelectorAll(string))));\n            })\n            return this._result(result);*/\n        }\n        /**\n         * 设置dom下的html\n         */\n\n    }, {\n        key: 'html',\n        value: function html(string) {\n            if (typeof string === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.innerHTML);\n                });\n                return new MyQueryDom(this._result(result));\n            } else {\n                this.forEach(function (ele) {\n                    ele.innerHTML = string;\n                });\n                return this;\n            }\n        }\n        /**\n         * 设置css属性\n         */\n\n    }, {\n        key: 'css',\n        value: function css(prop, val) {\n            if (typeof val === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.style.prop);\n                });\n                return this._result(result);\n            } else if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {} else {\n                this.forEach(function (ele) {\n                    ele.style[prop] = val;\n                });\n            }\n            return this;\n        }\n        /**\n         * 获取直接父节点\n         */\n\n    }, {\n        key: 'parent',\n        value: function parent(string) {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push(ele.parentNode);\n            });\n            return new MyQueryDom(this._result(result));\n        }\n        /**\n         * 获取最近的父辈节点\n         */\n\n    }, {\n        key: 'closest',\n        value: function closest(string) {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push.apply(result, _toConsumableArray(ele.closest(string)));\n            });\n            return new MyQueryDom(result);\n        }\n        /**\n         * 上一个节点\n         */\n\n    }, {\n        key: 'prev',\n        value: function prev() {\n            var result = [];\n            this.forEach(function (ele) {\n                if (ele.previousElementSibling) {\n                    result.push(ele.previousElementSibling);\n                }\n            });\n            return new MyQueryDom(this._result(result));\n        }\n        /**\n         * 下一个节点\n         */\n\n    }, {\n        key: 'next',\n        value: function next() {\n            var result = [];\n            this.forEach(function (ele) {\n                if (ele.nextElementSibling) {\n                    result.push(ele.nextElementSibling);\n                }\n            });\n            return new MyQueryDom(this._result(result));\n        }\n        /**\n         * 兄弟节点\n         */\n\n    }, {\n        key: 'siblings',\n        value: function siblings() {\n            var result = [];\n            this.forEach(function (ele) {\n                var sib = Array.from(ele.parentNode.children).filter(function (chid) {\n                    return chid !== ele;\n                });\n                result.push.apply(result, _toConsumableArray(sib));\n            });\n            return new MyQueryDom(this._result(result));\n        }\n        /**\n         * 绑定事件\n         */\n\n    }, {\n        key: 'on',\n        value: function on(even, fnc) {\n            this.forEach(function (ele) {\n                ele.addEventListener(even, fnc);\n            });\n            return this;\n        }\n        /**\n         * 解绑事件\n         */\n\n    }, {\n        key: 'unbind',\n        value: function unbind(even, fnc) {\n            this.forEach(function (ele) {\n                ele.removeEventListener(even, fnc);\n            });\n            return this;\n        }\n        /**\n         * 插入元素\n         */\n\n    }, {\n        key: 'appendChild',\n        value: function appendChild(child) {\n            this.forEach(function (ele) {\n                ele.appendChild(child);\n            });\n            return this;\n        }\n    }, {\n        key: 'toString',\n        value: function toString() {}\n    }], [{\n        key: 'parseHTML',\n\n        /**\n         * 解析html语句并返回构造出来的dom元素\n         */\n        value: function parseHTML(html) {\n            var el = document.createElement('div');\n            el.innerHTML = html;\n            return el.children[0];\n        }\n    }]);\n\n    return MyQueryDom;\n}(_extendableBuiltin(Array));\n\nvar _MyQueryDomCall = function _MyQueryDomCall(ele) {\n    return new MyQueryDom(ele);\n};\n\nvar MyQueryDom = function MyQueryDom() {\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n    }\n\n    if (this instanceof MyQueryDom) {\n        return Reflect.construct(_MyQueryDom, args);\n    } else {\n        return _MyQueryDomCall.apply(this, args);\n    }\n};\n\nMyQueryDom.__proto__ = _MyQueryDom;\nmodule.exports = MyQueryDom;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVlcnkuanM/ZmRmZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDSSx3QkFBWSxHQUFaLEVBQWdCLEdBQWhCLEVBQXFCO0FBQUE7O0FBQUE7O0FBRWpCO0FBRmlCOztBQUdqQixZQUFJLGVBQWUsVUFBbkIsRUFBK0I7QUFBQTs7QUFDM0IsMEJBQU8sR0FBUDtBQUNIOztBQUVEO0FBQ0EsWUFBSSxJQUFJLFFBQUosS0FBaUIsQ0FBckIsRUFBd0I7QUFBQTs7QUFDcEIsa0JBQUssQ0FBTCxJQUFVLEdBQVY7QUFDQTtBQUNILFNBSEQsTUFHTSxJQUFHLENBQUMsTUFBTSxPQUFOLENBQWMsR0FBZCxLQUFvQixJQUFJLElBQXpCLEtBQWtDLE1BQU0sSUFBTixDQUFXLEdBQVgsRUFBZ0IsS0FBaEIsQ0FBc0I7QUFBQSxtQkFBSSxHQUFHLFFBQUgsS0FBZ0IsQ0FBcEI7QUFBQSxTQUF0QixDQUFyQyxFQUFrRjtBQUFBOztBQUNwRjtBQUNBLGtCQUFNLElBQU4sQ0FBVyxHQUFYLEVBQWdCLE9BQWhCLENBQXdCLFVBQUMsRUFBRCxFQUFJLENBQUosRUFBUTtBQUM1QixzQkFBSyxDQUFMLElBQVUsRUFBVjtBQUNILGFBRkQ7QUFHQTtBQUNILFNBTkssTUFNQSxJQUFHLFFBQVEsSUFBUixDQUFhLEdBQWIsQ0FBSCxFQUFxQjtBQUFBOztBQUN2QjtBQUNBLGtCQUFLLENBQUwsSUFBUSxXQUFXLFNBQVgsQ0FBcUIsR0FBckIsQ0FBUjtBQUNBO0FBQ0g7QUFDRDtBQUNBLFlBQUksTUFBTSxNQUFLLElBQUksUUFBSixLQUFpQixDQUFqQixHQUFvQixHQUFwQixHQUF3QixTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBN0IsR0FBMEQsT0FBTyxRQUEzRTtBQUNBLFlBQUksTUFBTSxNQUFNLElBQU4sQ0FBVyxJQUFJLGdCQUFKLENBQXFCLEdBQXJCLENBQVgsQ0FB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LElBQVA7QUFDSDtBQUNEOzs7Ozs7K0JBR08sSSxFQUFLLEcsRUFBSTtBQUNaLGlCQUFLLE9BQUwsQ0FBYSxlQUFLO0FBQ2Qsb0JBQUksbUJBQUosQ0FBd0IsSUFBeEIsRUFBNkIsR0FBN0I7QUFDSCxhQUZEO0FBR0EsbUJBQU8sSUFBUDtBQUNIO0FBQ0Q7Ozs7OztvQ0FHWSxLLEVBQU07QUFDZCxpQkFBSyxPQUFMLENBQWEsZUFBSztBQUNkLG9CQUFJLFdBQUosQ0FBZ0IsS0FBaEI7QUFDSCxhQUZEO0FBR0EsbUJBQU8sSUFBUDtBQUNIOzs7bUNBQ1MsQ0FFVDs7OztBQTVYRDs7O2tDQUdpQixJLEVBQUs7QUFDbEIsZ0JBQUksS0FBSyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVDtBQUNFLGVBQUcsU0FBSCxHQUFlLElBQWY7QUFDQSxtQkFBTyxHQUFHLFFBQUgsQ0FBWSxDQUFaLENBQVA7QUFDTDs7OztxQkExQ29CLEs7OytDQWdDSixHLEVBQUs7QUFDbEIsV0FBTyxJQUFJLFVBQUosQ0FBZSxHQUFmLENBQVA7QUFDSCxDOztJQWxDQyxVLFlBQUEsVTs7Ozs7d0JBQUEsVTs7Ozs7OztBQUFBLFU7QUFrYk4sT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNeVF1ZXJ5RG9tIGV4dGVuZHMgQXJyYXl7XG4gICAgY29uc3RydWN0b3IoZWxlLGN0eCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvLyDlpoLmnpzlt7Lnu4/mmK8kceWunuS+iy7liJnov5Tlm55cbiAgICAgICAgaWYgKGVsZSBpbnN0YW5jZW9mIE15UXVlcnlEb20pIHtcbiAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDljZXni6znmoTkuIDkuKpkb20s6L2s5oiQJHHlr7nosaFcbiAgICAgICAgaWYgKGVsZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpc1swXSA9IGVsZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9ZWxzZSBpZigoQXJyYXkuaXNBcnJheShlbGUpfHxlbGUuaXRlbSkgJiYgQXJyYXkuZnJvbShlbGUpLmV2ZXJ5KGVsPT5lbC5ub2RlVHlwZSA9PT0gMSkpe1xuICAgICAgICAgICAgLy8g5aSa5LiqZG9tLui9rOaIkHF1ZXJ55a+56LGhXG4gICAgICAgICAgICBBcnJheS5mcm9tKGVsZSkuZm9yRWFjaCgoZWwsaSk9PntcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gZWw7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9ZWxzZSBpZigvXFw8Lio+Ly50ZXN0KGVsZSkpe1xuICAgICAgICAgICAgLy8gaHRtbOWImeS9v+eUqHBhcnNlSFRNTOi9rOaIkGRvbeWvueixoVxuICAgICAgICAgICAgdGhpc1swXT1NeVF1ZXJ5RG9tLnBhcnNlSFRNTChlbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5qC55o2u6YCJ5oup5Zmo6YCJ5oupZG9t5YWD57SgXG4gICAgICAgIHZhciBjdHggPSBjdHg/KGN0eC5ub2RlVHlwZSA9PT0gMSA/Y3R4OmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY3R4KSk6d2luZG93LmRvY3VtZW50O1xuICAgICAgICB2YXIgZG9tID0gQXJyYXkuZnJvbShjdHgucXVlcnlTZWxlY3RvckFsbChlbGUpKTtcbiAgICAgICAgZG9tLmZvckVhY2goKGVsLGkpPT57XG4gICAgICAgICAgICB0aGlzW2ldID0gZWw7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8gY2FsbCDlhbPplK7or43lj6/ku6XkuI3pnIDopoHpgJrov4duZXfmnaXliJvlu7rlrp7kvotcbiAgICBjYWxsIGNvbnN0cnVjdG9yKGVsZSkge1xuICAgICAgICByZXR1cm4gbmV3IE15UXVlcnlEb20oZWxlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6Kej5p6QaHRtbOivreWPpeW5tui/lOWbnuaehOmAoOWHuuadpeeahGRvbeWFg+e0oFxuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUhUTUwoaHRtbCl7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgcmV0dXJuIGVsLmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlpITnkIbnu5Pmnpws5aaC5p6c57uT5p6c5Li65Y2V5YWD57Sg5pWw57uE5YiZ6L+U5Zue6K+l5YWD57SgLOWQpuWImei/lOWbnuaVsOe7hFxuICAgICAqL1xuICAgIF9yZXN1bHQocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0WzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPli/orr7nva7lsZ7mgKdcbiAgICAgKiB2YWx1ZeS4uuepuuWImeiOt+WPllxuICAgICAqL1xuICAgIGF0dHIoc3RyaW5nLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLmdldEF0dHJpYnV0ZShzdHJpbmcpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0KHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuc2V0QXR0cmlidXRlKHN0cmluZywgdmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTlhYPntKBcbiAgICAgKi9cbiAgICByZW1vdmUoKXtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICBlbGUucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaTlsZ7mgKdcbiAgICAgKi9cbiAgICByZW1vdmVBdHRyKHN0cmluZykge1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIGVsZS5yZW1vdmVBdHRyaWJ1dGUoc3RyaW5nKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva4v6I635Y+WIGRhdGFcbiAgICAgKi9cbiAgICBkYXRhKHN0cmluZywgdmFsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLmRhdGFzZXRbc3RyaW5nXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdChyZXN1bHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLmRhdGFzZXRbc3RyaW5nXSA9IHZhbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDliKDpmaRkYXRhXG4gICAgICovXG4gICAgcmVtb3ZlRGF0YShzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGFzZXRbc3RyaW5nXSA9IG51bGw7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572uL+iOt+WPliB2YWx1ZVxuICAgICAqL1xuICAgIHZhbCh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLnZhbHVlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572uZG9t5YWD57Sg55qEdGV4dFxuICAgICAqL1xuICAgIHRleHQodmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZS5pbm5lclRleHQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLmlubmVyVGV4dCA9IHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhmRvbeaPkuWFpeWIsOW9k+WJjeWFg+e0oOWQjumdoizov5Tlm550aGlzLumTvuW8j+aTjeS9nFxuICAgICAqL1xuICAgIGFmdGVyKGRvbSkge1xuICAgICAgICBpZiAodHlwZW9mIGRvbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgIGVsZS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgZG9tKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihkb20ubm9kZVR5cGUpe1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBkb20pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhmRvbeaPkuWFpeWIsOW9k+WJjeWFg+e0oOWJjemdoizov5Tlm550aGlzLumTvuW8j+aTjeS9nFxuICAgICAqL1xuICAgIGJlZm9yZShkb20pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkb20gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGRvbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2UgaWYoZG9tLm5vZGVUeXBlKXtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgIGVsZS5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgZG9tKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAg5Yik5pat5piv5ZCm5a2Y5Zyo5p+Q5Liq57G7XG4gICAgICog5b2T6YCJ5oup5Zmo5LiL5omA5pyJZG9t6YO95a2Y5Zyo6L+U5ZuedHJ1ZSzlkKbliJnov5Tlm55mYWxzZVxuICAgICAqL1xuICAgIGhhc0NsYXNzKGNsYXNzTmFtZSl7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChyZWcudGVzdChlbGUuY2xhc3NOYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0KHJlc3VsdCk7O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlop7liqDnsbtcbiAgICAgKi9cbiAgICBhZGRDbGFzcyhjbGFzc05hbWUpIHtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlLmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZS5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWOu+aOieafkOS4quexu+WQjVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIGlmIChlbGUuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTmFtZSA9IGVsZS5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+WQpuWtmOWcqOafkOS4quexu1xuICAgICAqIOW9k+mAieaLqeWZqOS4i+aJgOaciWRvbemDveWtmOWcqOi/lOWbnnRydWUs5ZCm5YiZ6L+U5ZueZmFsc2VcbiAgICAgKi9cbiAgICAvKmhhc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVyeShlbGU9PntcbiAgICAgICAgICAgIHZhciBoYXMgPSBlbGUuY2xhc3NMaXN0LmNvbm90YWlucyhjbGFzc05hbWUpO1xuICAgICAgICAgICAgaWYgKCFoYXMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBoYXM7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0qL1xuICAgIC8qKlxuICAgICAqIOWIh+aNouexu+WQjVxuICAgICAqL1xuICAgIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGUuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzZXMuaW5jbHVkZXMoY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSwgMSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZS5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bljLnphY1zdHLnmoTlrZDnsbtcbiAgICAgKi9cbiAgICBjaGlsZHJlbihzdHIpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgIC8vIOWtkOWFg+e0oFxuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goLi4uZWxlLmNoaWxkcmVuKVxuICAgICAgICB9KTtcbiAgICAgICAgLy8g6K+lZG9t5LiL55qE5Yy56YWNc3Ry55qE5YWD57SgXG4gICAgICAgIGlmICh0eXBlb2Ygc3RyICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZT0+e1xuICAgICAgICAgICAgICAgIGNoaWxkLnB1c2goLi4uZWxlLnF1ZXJ5U2VsZWN0b3JBbGwoc3RyKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIC8vIOWmguaenOWtkOWFg+e0oOWcqOWMuemFjXN0cueahOWFg+e0oOaVsOe7hOmHjOmdouWImXB1c2jov5FyZXN1bHRcbiAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmluY2x1ZGVzKGVsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbShjaGlsZHJlbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWvu+aJvuivpWRvbeWFg+e0oOS4i+eahOafkOS4quWMuemFjeWFg+e0oFxuICAgICAqL1xuICAgIGZpbmQoc3RyaW5nKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi5lbGUucXVlcnlTZWxlY3RvckFsbChzdHJpbmcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbSh0aGlzLl9yZXN1bHQocmVzdWx0KSk7XG4gICAgICAgICAgICAvKnJlc3VsdC5wdXNoKG5ldyBNeVF1ZXJ5RG9tKEFycmF5LmZyb20oZWxlLnF1ZXJ5U2VsZWN0b3JBbGwoc3RyaW5nKSkpKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdChyZXN1bHQpOyovXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rmRvbeS4i+eahGh0bWxcbiAgICAgKi9cbiAgICBodG1sKHN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZS5pbm5lckhUTUwpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbSh0aGlzLl9yZXN1bHQocmVzdWx0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gc3RyaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rmNzc+WxnuaAp1xuICAgICAqL1xuICAgIGNzcyhwcm9wLCB2YWwpIHtcbiAgICAgICAgaWYodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLnN0eWxlLnByb3ApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0KHJlc3VsdClcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLnN0eWxlW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluebtOaOpeeItuiKgueCuVxuICAgICAqL1xuICAgIHBhcmVudChzdHJpbmcpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZS5wYXJlbnROb2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbSh0aGlzLl9yZXN1bHQocmVzdWx0KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluacgOi/keeahOeItui+iOiKgueCuVxuICAgICAqL1xuICAgIGNsb3Nlc3Qoc3RyaW5nKXtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICByZXN1bHQucHVzaCguLi5lbGUuY2xvc2VzdChzdHJpbmcpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbShyZXN1bHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuIrkuIDkuKroioLngrlcbiAgICAgKi9cbiAgICBwcmV2KCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3IE15UXVlcnlEb20odGhpcy5fcmVzdWx0KHJlc3VsdCkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkuIvkuIDkuKroioLngrlcbiAgICAgKi9cbiAgICBuZXh0KCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZS5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBNeVF1ZXJ5RG9tKHRoaXMuX3Jlc3VsdChyZXN1bHQpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5YWE5byf6IqC54K5XG4gICAgICovXG4gICAgc2libGluZ3MoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICB2YXIgc2liID0gQXJyYXkuZnJvbShlbGUucGFyZW50Tm9kZS5jaGlsZHJlbikuZmlsdGVyKGNoaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjaGlkICE9PSBlbGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLnNpYik7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBuZXcgTXlRdWVyeURvbSh0aGlzLl9yZXN1bHQocmVzdWx0KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOe7keWumuS6i+S7tlxuICAgICAqL1xuICAgIG9uKGV2ZW4sZm5jKXtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZT0+e1xuICAgICAgICAgICAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbixmbmMpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6Kej57uR5LqL5Lu2XG4gICAgICovXG4gICAgdW5iaW5kKGV2ZW4sZm5jKXtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZT0+e1xuICAgICAgICAgICAgZWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbixmbmMpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5o+S5YWl5YWD57SgXG4gICAgICovXG4gICAgYXBwZW5kQ2hpbGQoY2hpbGQpe1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICBlbGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRvU3RyaW5nKCl7XG5cbiAgICB9XG59XG4vLyBmdW5jdGlvbiBNeVF1ZXJ5KGVsZSl7XG4vLyAgICAgdmFyIGRvbSA7XG4vLyAgICAgaWYgKGVsZS5ub2RlVHlwZSkge1xuLy8gICAgICAgICBkb20gPSBbZWxlXVxuLy8gICAgIH1lbHNlIGlmKHR5cGVvZiBlbGUgPT09ICdzdHJpbmcnKXtcbi8vICAgICAgICAgZG9tID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZSkpO1xuLy8gICAgIH1lbHNlIHtcbi8vICAgICAgICAgY29uc29sZS5lcnJvcihcIuayoeacieWMuemFjeWIsFwiKTtcbi8vICAgICAgICAgcmV0dXJuIFwiXCI7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiBuZXcgTXlRdWVyeURvbShkb20pO1xuLy8gfVxuLy8gTXlRdWVyeS5wYXJzZUhUTUwgPSBmdW5jdGlvbihzdHJpbmcpe1xuLy8gICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4vLyAgICAgZWwuaW5uZXJIVE1MID0gc3RyaW5nO1xuLy8gICAgIHJldHVybiBlbC5jaGlsZHJlblswXTtcbi8vIH1cbm1vZHVsZS5leHBvcnRzID0gTXlRdWVyeURvbTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3F1ZXJ5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9zdHlsZS5zY3NzP2ZlYWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zYXNzL3N0eWxlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\n/**\n * 主要用来对播放器和音乐的控制\n * 通过调用Dispatch(action)来控制播放器进行相应的操作\n * 不允许直接对播放器对象进行操作\n */\n\nvar _require = __webpack_require__(6);\n\nvar MyAudio = _require.MyAudio;\nvar Music = _require.Music;\n\n__webpack_require__(1);\n// 创建一首音乐并且将音乐与其dom关联.\nfunction createMusicDom(music) {\n    var index = $q(\".song-list li\").length;\n    var li = \"<li><span>\" + index + \"</span><span>\" + music.songName + \"</span><i class=\\\"rm\\\">x</i></li>\";\n    var dom = $q.parseHTML(li);\n    var mus = new Music(music, dom);\n    $q(dom).on('click', function (event) {\n        event.preventDefault();\n        window.player.load(mus);\n    });\n    $q(dom).find(\".rm\").on('click', function (event) {\n        event.stopPropagation();\n        Dispatch(\"REMOVE_MUSIC\", mus, function (rm, list) {\n            console.log(rm);\n            $q(rm.dom).remove();\n        });\n    });\n    return mus;\n}\nvar Store = {\n    // 状态,存放播放器和搜索列表\n    state: {\n        player: new MyAudio(document.getElementById(\"player\")), // 播放器实例\n        searchList: [] // 当前的搜索列表\n    },\n    // 相应的操作事件\n    mou: {\n        // 播放\n        PLAY: function PLAY(state) {\n            state.player.play();\n        },\n\n        // 暂停\n        PAUSE: function PAUSE(state) {\n            state.player.pause();\n        },\n\n        // 搜索\n        SEARCH: function SEARCH(state, query) {\n            // 向后台拉取搜索到的数据\n            fetch(\"http://localhost:4000/search?query=\" + query, {\n                mod: \"cors\"\n            }).then(function (res) {\n                return res.json();\n            }).then(function (data) {\n                var songList = data.data.songList;\n                console.log(\"songList\", songList);\n                // 刷新当前搜索列表数据\n                Dispatch(\"REFRESH_SEARCH_LIST\", songList);\n                var tbody = \"\";\n                songList.forEach(function (music, index) {\n                    tbody += \"<tr data-index=\\\"\" + index + \"\\\"><td>\" + index + \"</td><td>\" + music.songName + \"</td><td>\" + music.artistName + \"</td><td>\" + music.albumName + \"</td><td>\" + Math.floor(music.time / 60) + \":\" + Math.floor(music.time % 60) + \"</td></tr>\";\n                });\n                $q(\".search-list tbody\").html(tbody);\n                $q(\".search-list tbody tr\").on('click', function (event) {\n                    var index = $q(this).data(\"index\");\n                    // 从搜索列表中添加音乐到播放列表并播放\n                    Dispatch(\"LOAD_FROM_SEARCHLIST\", index);\n                });\n            });\n        },\n\n        // 刷新搜索列表,即将搜索的歌曲重新放入列表当中\n        REFRESH_SEARCH_LIST: function REFRESH_SEARCH_LIST(state, search_list) {\n            state.searchList = search_list;\n        },\n\n        // 播放/暂停切换\n        CHANGE_STATE: function CHANGE_STATE(state) {\n            if (state.player.audio.paused) {\n                state.player.play();\n            } else {\n                state.player.pause();\n            }\n        },\n\n        // 下一首歌曲\n        NEXT: function NEXT(state) {\n            state.player.next();\n        },\n\n        // 上一首歌曲\n        PREV: function PREV(state) {\n            state.player.prev();\n        },\n\n        // 从搜索列表中播放音乐\n        LOAD_FROM_SEARCHLIST: function LOAD_FROM_SEARCHLIST(state, index) {\n            var music = state.searchList[index];\n            music = createMusicDom(music);\n            $q(\".song-list\")[0].appendChild(music.dom);\n            state.player.load(music);\n        },\n\n        // 加大音量,基数为10\n        INCREASE_VOLUME: function INCREASE_VOLUME(state) {\n            state.player.changeVolume('increase');\n        },\n\n        // 减少音量,基数为10\n        DECREASE_VOLUME: function DECREASE_VOLUME(state) {\n            state.player.changeVolume('decrease');\n        },\n\n        // 改变音量音量\n        CHANGE_VOLUME: function CHANGE_VOLUME(state, val) {\n            state.player.changeVolume(val);\n        },\n\n        // 播放进度,0-100整数,代表百分比\n        CHANGE_CURRENT_TIME: function CHANGE_CURRENT_TIME(val) {\n            state.player.setCurrentTime(val);\n        },\n\n        // 播放模式,mod为将要修改的模式\n        // order : 顺序播放\n        // range : 随机播放\n        // loop : 单曲循环\n        CHANGE_PLAY_MOD: function CHANGE_PLAY_MOD(state, mod) {\n            if (mod === 'loop') {\n                state.player.audio.loop = true;\n            } else {\n                state.player.audio.loop = false;\n                state.player.cfg.playMod = mod;\n            }\n        },\n\n        // 获取当前播放列表\n        // 返回 Array.\n        GET_MUSIC_LIST: function GET_MUSIC_LIST(state) {\n            return state.player.musicList;\n        },\n\n        // 删除某一首音乐\n        // 如果music为number,则删除该索引的音乐\n        // 如果music为Music实例,则删除该对象\n        REMOVE_MUSIC: function REMOVE_MUSIC(state, music, fnc) {\n            var player = state.player;\n            var remove = void 0,\n                index = void 0;\n            if (typeof music === 'number') {\n                index = music;\n            } else {\n                index = player.musicList.indexOf(music);\n            }\n            if (index === player.index) {\n                player.next();\n            }\n            index <= player.index && player.index--;\n            remove = player.musicList.splice(index, 1);\n            if (typeof fnc === 'function') {\n                fnc.apply(undefined, _toConsumableArray(remove).concat([player.musicList]));\n            }\n        }\n    }\n};\n/**\n * 自执行函数,返回一个方法\n * @type {RegExp}\n */\nvar Dispatch = function (store) {\n    /**\n     * 执行action操作,arg为参数\n     */\n    return function (action) {\n        var _store$mou;\n\n        console.log(\"ACTION-------->>>\", action);\n        // 调用store中mou对应的action\n\n        for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n            arg[_key - 1] = arguments[_key];\n        }\n\n        return (_store$mou = store.mou)[action].apply(_store$mou, [store.state].concat(arg));\n    };\n}(Store);\nmodule.exports = { Store: Store, Dispatch: Dispatch };//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY3RybC5qcz8xODNlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQTs7Ozs7O2VBTXNCLG9CQUFRLENBQVIsQzs7SUFBakIsTyxZQUFBLE87SUFBUSxLLFlBQUEsSzs7QUFDYixvQkFBUSxDQUFSO0FBQ0E7QUFDQSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsRUFBOEI7QUFDMUIsUUFBSSxRQUFRLEdBQUcsZUFBSCxFQUFvQixNQUFoQztBQUNBLFFBQUksb0JBQWtCLEtBQWxCLHFCQUF1QyxNQUFNLFFBQTdDLHNDQUFKO0FBQ0EsUUFBSSxNQUFNLEdBQUcsU0FBSCxDQUFhLEVBQWIsQ0FBVjtBQUNBLFFBQUksTUFBTSxJQUFJLEtBQUosQ0FBVSxLQUFWLEVBQWdCLEdBQWhCLENBQVY7QUFDQSxPQUFHLEdBQUgsRUFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFTLEtBQVQsRUFBZ0I7QUFDaEMsY0FBTSxjQUFOO0FBQ0EsZUFBTyxNQUFQLENBQWMsSUFBZCxDQUFtQixHQUFuQjtBQUNILEtBSEQ7QUFJQSxPQUFHLEdBQUgsRUFBUSxJQUFSLENBQWEsS0FBYixFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxVQUFTLEtBQVQsRUFBZ0I7QUFDNUMsY0FBTSxlQUFOO0FBQ0EsaUJBQVMsY0FBVCxFQUF3QixHQUF4QixFQUE0QixVQUFDLEVBQUQsRUFBSSxJQUFKLEVBQVc7QUFDbkMsb0JBQVEsR0FBUixDQUFZLEVBQVo7QUFDQSxlQUFHLEdBQUcsR0FBTixFQUFXLE1BQVg7QUFDSCxTQUhEO0FBSUgsS0FORDtBQU9BLFdBQU8sR0FBUDtBQUNIO0FBQ0QsSUFBSSxRQUFRO0FBQ1I7QUFDQSxXQUFRO0FBQ0osZ0JBQU8sSUFBSSxPQUFKLENBQVksU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQVosQ0FESCxFQUNtRDtBQUN2RCxvQkFBVyxFQUZQLENBRVc7QUFGWCxLQUZBO0FBTVI7QUFDQSxTQUFNO0FBQ0Y7QUFD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LENBQVQ7QUFDQSxnQkFBSSxPQUFPLEdBQVAsS0FBZSxVQUFuQixFQUErQjtBQUMzQix3REFBTyxNQUFQLFVBQWMsT0FBTyxTQUFyQjtBQUNIO0FBQ0o7QUE5R0M7QUFQRSxDQUFaO0FBd0hBOzs7O0FBSUEsSUFBSSxXQUFZLFVBQVMsS0FBVCxFQUFlO0FBQzNCOzs7QUFHQSxXQUFPLFVBQVMsTUFBVCxFQUF1QjtBQUFBOztBQUMxQixnQkFBUSxHQUFSLENBQVksbUJBQVosRUFBZ0MsTUFBaEM7QUFDQTs7QUFGMEIsMENBQUosR0FBSTtBQUFKLGVBQUk7QUFBQTs7QUFHMUIsZUFBTyxvQkFBTSxHQUFOLEVBQVUsTUFBVixxQkFBa0IsTUFBTSxLQUF4QixTQUFpQyxHQUFqQyxFQUFQO0FBQ0gsS0FKRDtBQUtILENBVGMsQ0FTWixLQVRZLENBQWY7QUFVQSxPQUFPLE9BQVAsR0FBaUIsRUFBQyxZQUFELEVBQU8sa0JBQVAsRUFBakIiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiDkuLvopoHnlKjmnaXlr7nmkq3mlL7lmajlkozpn7PkuZDnmoTmjqfliLZcbiAqIOmAmui/h+iwg+eUqERpc3BhdGNoKGFjdGlvbinmnaXmjqfliLbmkq3mlL7lmajov5vooYznm7jlupTnmoTmk43kvZxcbiAqIOS4jeWFgeiuuOebtOaOpeWvueaSreaUvuWZqOWvueixoei/m+ihjOaTjeS9nFxuICovXG5cbnZhciB7TXlBdWRpbyxNdXNpY30gPSByZXF1aXJlKFwiLi9hdWRpby5qc1wiKTtcbnJlcXVpcmUoXCJleHBvc2U/JHEhLi9xdWVyeS5qc1wiKTtcbi8vIOWIm+W7uuS4gOmmlumfs+S5kOW5tuS4lOWwhumfs+S5kOS4juWFtmRvbeWFs+iBlC5cbmZ1bmN0aW9uIGNyZWF0ZU11c2ljRG9tKG11c2ljKXtcbiAgICB2YXIgaW5kZXggPSAkcShcIi5zb25nLWxpc3QgbGlcIikubGVuZ3RoO1xuICAgIHZhciBsaSA9IGA8bGk+PHNwYW4+JHtpbmRleH08L3NwYW4+PHNwYW4+JHttdXNpYy5zb25nTmFtZX08L3NwYW4+PGkgY2xhc3M9XCJybVwiPng8L2k+PC9saT5gO1xuICAgIHZhciBkb20gPSAkcS5wYXJzZUhUTUwobGkpXG4gICAgdmFyIG11cyA9IG5ldyBNdXNpYyhtdXNpYyxkb20pO1xuICAgICRxKGRvbSkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgd2luZG93LnBsYXllci5sb2FkKG11cyk7XG4gICAgfSk7XG4gICAgJHEoZG9tKS5maW5kKFwiLnJtXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBEaXNwYXRjaChcIlJFTU9WRV9NVVNJQ1wiLG11cywocm0sbGlzdCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJtKTtcbiAgICAgICAgICAgICRxKHJtLmRvbSkucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBtdXM7XG59XG52YXIgU3RvcmUgPSB7XG4gICAgLy8g54q25oCBLOWtmOaUvuaSreaUvuWZqOWSjOaQnOe0ouWIl+ihqFxuICAgIHN0YXRlIDoge1xuICAgICAgICBwbGF5ZXI6bmV3IE15QXVkaW8oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJcIikpLCAvLyDmkq3mlL7lmajlrp7kvotcbiAgICAgICAgc2VhcmNoTGlzdDpbXSAgLy8g5b2T5YmN55qE5pCc57Si5YiX6KGoXG4gICAgfSxcbiAgICAvLyDnm7jlupTnmoTmk43kvZzkuovku7ZcbiAgICBtb3UgOiB7XG4gICAgICAgIC8vIOaSreaUvlxuICAgICAgICBQTEFZKHN0YXRlKXtcbiAgICAgICAgICAgIHN0YXRlLnBsYXllci5wbGF5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIOaaguWBnFxuICAgICAgICBQQVVTRShzdGF0ZSl7XG4gICAgICAgICAgICBzdGF0ZS5wbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pCc57SiXG4gICAgICAgIFNFQVJDSChzdGF0ZSxxdWVyeSl7XG4gICAgICAgICAgICAvLyDlkJHlkI7lj7Dmi4nlj5bmkJzntKLliLDnmoTmlbDmja5cbiAgICAgICAgICAgIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3NlYXJjaD9xdWVyeT1cIitxdWVyeSx7XG4gICAgICAgICAgICAgICAgbW9kOlwiY29yc1wiXG4gICAgICAgICAgICB9KS50aGVuKHJlcz0+cmVzLmpzb24oKSkudGhlbihkYXRhPT57XG4gICAgICAgICAgICAgICAgdmFyIHNvbmdMaXN0ID0gZGF0YS5kYXRhLnNvbmdMaXN0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic29uZ0xpc3RcIixzb25nTGlzdCk7XG4gICAgICAgICAgICAgICAgLy8g5Yi35paw5b2T5YmN5pCc57Si5YiX6KGo5pWw5o2uXG4gICAgICAgICAgICAgICAgRGlzcGF0Y2goXCJSRUZSRVNIX1NFQVJDSF9MSVNUXCIsc29uZ0xpc3QpO1xuICAgICAgICAgICAgICAgIHZhciB0Ym9keSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc29uZ0xpc3QuZm9yRWFjaCgobXVzaWMsaW5kZXgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRib2R5ICs9IGA8dHIgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCI+PHRkPiR7aW5kZXh9PC90ZD48dGQ+JHttdXNpYy5zb25nTmFtZX08L3RkPjx0ZD4ke211c2ljLmFydGlzdE5hbWV9PC90ZD48dGQ+JHttdXNpYy5hbGJ1bU5hbWV9PC90ZD48dGQ+JHtNYXRoLmZsb29yKG11c2ljLnRpbWUvNjApfToke01hdGguZmxvb3IobXVzaWMudGltZSU2MCl9PC90ZD48L3RyPmA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJHEoXCIuc2VhcmNoLWxpc3QgdGJvZHlcIikuaHRtbCh0Ym9keSk7XG4gICAgICAgICAgICAgICAgJHEoXCIuc2VhcmNoLWxpc3QgdGJvZHkgdHJcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gJHEodGhpcykuZGF0YShcImluZGV4XCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyDku47mkJzntKLliJfooajkuK3mt7vliqDpn7PkuZDliLDmkq3mlL7liJfooajlubbmkq3mlL5cbiAgICAgICAgICAgICAgICAgICAgRGlzcGF0Y2goXCJMT0FEX0ZST01fU0VBUkNITElTVFwiLGluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvLyDliLfmlrDmkJzntKLliJfooags5Y2z5bCG5pCc57Si55qE5q2M5puy6YeN5paw5pS+5YWl5YiX6KGo5b2T5LitXG4gICAgICAgIFJFRlJFU0hfU0VBUkNIX0xJU1Qoc3RhdGUsc2VhcmNoX2xpc3Qpe1xuICAgICAgICAgICAgc3RhdGUuc2VhcmNoTGlzdCA9IHNlYXJjaF9saXN0O1xuICAgICAgICB9LFxuICAgICAgICAvLyDmkq3mlL4v5pqC5YGc5YiH5o2iXG4gICAgICAgIENIQU5HRV9TVEFURShzdGF0ZSl7XG4gICAgICAgICAgICBpZiAoc3RhdGUucGxheWVyLmF1ZGlvLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHN0YXRlLnBsYXllci5wbGF5KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzdGF0ZS5wbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8g5LiL5LiA6aaW5q2M5puyXG4gICAgICAgIE5FWFQoc3RhdGUpe1xuICAgICAgICAgICAgc3RhdGUucGxheWVyLm5leHQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5LiK5LiA6aaW5q2M5puyXG4gICAgICAgIFBSRVYoc3RhdGUpe1xuICAgICAgICAgICAgc3RhdGUucGxheWVyLnByZXYoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5LuO5pCc57Si5YiX6KGo5Lit5pKt5pS+6Z+z5LmQXG4gICAgICAgIExPQURfRlJPTV9TRUFSQ0hMSVNUKHN0YXRlLGluZGV4KXtcbiAgICAgICAgICAgIHZhciBtdXNpYyA9IHN0YXRlLnNlYXJjaExpc3RbaW5kZXhdO1xuICAgICAgICAgICAgbXVzaWMgPSBjcmVhdGVNdXNpY0RvbShtdXNpYyk7XG4gICAgICAgICAgICAkcShcIi5zb25nLWxpc3RcIilbMF0uYXBwZW5kQ2hpbGQobXVzaWMuZG9tKVxuICAgICAgICAgICAgc3RhdGUucGxheWVyLmxvYWQobXVzaWMpO1xuICAgICAgICB9LFxuICAgICAgICAvLyDliqDlpKfpn7Pph48s5Z+65pWw5Li6MTBcbiAgICAgICAgSU5DUkVBU0VfVk9MVU1FKHN0YXRlKXtcbiAgICAgICAgICAgIHN0YXRlLnBsYXllci5jaGFuZ2VWb2x1bWUoJ2luY3JlYXNlJyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIOWHj+Wwkemfs+mHjyzln7rmlbDkuLoxMFxuICAgICAgICBERUNSRUFTRV9WT0xVTUUoc3RhdGUpe1xuICAgICAgICAgICAgc3RhdGUucGxheWVyLmNoYW5nZVZvbHVtZSgnZGVjcmVhc2UnKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pS55Y+Y6Z+z6YeP6Z+z6YePXG4gICAgICAgIENIQU5HRV9WT0xVTUUoc3RhdGUsdmFsKXtcbiAgICAgICAgICAgIHN0YXRlLnBsYXllci5jaGFuZ2VWb2x1bWUodmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pKt5pS+6L+b5bqmLDAtMTAw5pW05pWwLOS7o+ihqOeZvuWIhuavlFxuICAgICAgICBDSEFOR0VfQ1VSUkVOVF9USU1FKHZhbCl7XG4gICAgICAgICAgICBzdGF0ZS5wbGF5ZXIuc2V0Q3VycmVudFRpbWUodmFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5pKt5pS+5qih5byPLG1vZOS4uuWwhuimgeS/ruaUueeahOaooeW8j1xuICAgICAgICAvLyBvcmRlciA6IOmhuuW6j+aSreaUvlxuICAgICAgICAvLyByYW5nZSA6IOmaj+acuuaSreaUvlxuICAgICAgICAvLyBsb29wIDog5Y2V5puy5b6q546vXG4gICAgICAgIENIQU5HRV9QTEFZX01PRChzdGF0ZSxtb2Qpe1xuICAgICAgICAgICAgaWYgKG1vZCA9PT0gJ2xvb3AnKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUucGxheWVyLmF1ZGlvLmxvb3AgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3RhdGUucGxheWVyLmF1ZGlvLmxvb3AgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5wbGF5ZXIuY2ZnLnBsYXlNb2QgPSBtb2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIOiOt+WPluW9k+WJjeaSreaUvuWIl+ihqFxuICAgICAgICAvLyDov5Tlm54gQXJyYXkuXG4gICAgICAgIEdFVF9NVVNJQ19MSVNUKHN0YXRlKXtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5wbGF5ZXIubXVzaWNMaXN0O1xuICAgICAgICB9LFxuICAgICAgICAvLyDliKDpmaTmn5DkuIDpppbpn7PkuZBcbiAgICAgICAgLy8g5aaC5p6cbXVzaWPkuLpudW1iZXIs5YiZ5Yig6Zmk6K+l57Si5byV55qE6Z+z5LmQXG4gICAgICAgIC8vIOWmguaenG11c2lj5Li6TXVzaWPlrp7kvoss5YiZ5Yig6Zmk6K+l5a+56LGhXG4gICAgICAgIFJFTU9WRV9NVVNJQyhzdGF0ZSxtdXNpYyxmbmMpe1xuICAgICAgICAgICAgbGV0IHBsYXllciA9IHN0YXRlLnBsYXllcjtcbiAgICAgICAgICAgIGxldCByZW1vdmUgLGluZGV4O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBtdXNpYyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IG11c2ljO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gcGxheWVyLm11c2ljTGlzdC5pbmRleE9mKG11c2ljKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gcGxheWVyLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4IDw9IHBsYXllci5pbmRleCYmcGxheWVyLmluZGV4LS07XG4gICAgICAgICAgICByZW1vdmUgPSBwbGF5ZXIubXVzaWNMaXN0LnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZm5jKC4uLnJlbW92ZSxwbGF5ZXIubXVzaWNMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICog6Ieq5omn6KGM5Ye95pWwLOi/lOWbnuS4gOS4quaWueazlVxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIERpc3BhdGNoID0gKGZ1bmN0aW9uKHN0b3JlKXtcbiAgICAvKipcbiAgICAgKiDmiafooYxhY3Rpb27mk43kvZwsYXJn5Li65Y+C5pWwXG4gICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFjdGlvbiwuLi5hcmcpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFDVElPTi0tLS0tLS0tPj4+XCIsYWN0aW9uKTtcbiAgICAgICAgLy8g6LCD55Soc3RvcmXkuK1tb3Xlr7nlupTnmoRhY3Rpb25cbiAgICAgICAgcmV0dXJuIHN0b3JlLm1vdVthY3Rpb25dKHN0b3JlLnN0YXRlLC4uLmFyZyk7XG4gICAgfVxufSkoU3RvcmUpO1xubW9kdWxlLmV4cG9ydHMgPSB7U3RvcmUsRGlzcGF0Y2h9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY3RybC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Music = function () {\n    function Music(obj, dom) {\n        _classCallCheck(this, Music);\n\n        // {queryId,sondId,songName,artistId,artistName,albumId,albumName,\n        //     songPicSmall,songPicBig,songPicRadio,lrcLink,time,linkCode,\n        //     songLink,showLink,format,rate,size,relateStatus,resourceType} = obj;\n        this.info = obj;\n        this.dom = dom; // 可放入代表歌曲的dom,\n    }\n\n    _createClass(Music, [{\n        key: \"getInfo\",\n        value: function getInfo() {\n            return this.info;\n        }\n    }]);\n\n    return Music;\n}();\n\nvar MyAudio = function () {\n    /**\n     * 构造器\n     * @param {element} audio的dom元素\n     * @param {array}  播放列表,可空\n     * @param {obj}  配置项\n     * @type {Array}\n     */\n    function MyAudio(ele) {\n        var _this = this;\n\n        var musicList = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];\n        var cfg = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];\n\n        _classCallCheck(this, MyAudio);\n\n        this.audio = ele; // 元素dom\n        this.musicList = musicList.map(function (ele) {\n            return new Music(ele);\n        }); // 歌曲列表\n        this.index = 0; // 当前歌曲索引\n        var defaultCfg = {\n            ended: function ended() {}, // 结束回调\n            play: function play() {}, // 播放时候回调\n            progress: function progress() {}, // 缓冲时事件\n            playMod: \"order\" // 播放类型,\n        };\n        // 配置,播放回调,播放结束回调\n        this.cfg = Object.assign(defaultCfg, cfg);\n        this.audio.addEventListener(\"ended\", function () {\n            if (!_this.audio.loop) {\n                // 只要不是单曲循环,都会执行下一首操作.\n                _this.next();\n            }\n            _this.cfg.ended();\n        });\n        this.audio.addEventListener(\"play\", this.cfg.play);\n        // this.audio.addEventListener(\"loadstart\",(e)=>{\n        //     console.log(\"loadstart ---->\",e.target.buffered);\n        // });\n        // this.audio.addEventListener(\"durationchange\",(e)=>{\n        //     console.log(\"durationchange ---->\",e.target.buffered.end(e.target.buffered.length -1));\n        // });\n        // this.audio.addEventListener(\"loadedmetadata\",(e)=>{\n        //     console.log(\"loadedmetadata ---->\",e.target.buffered.end(e.target.buffered.length -1));\n        // });\n        // this.audio.addEventListener(\"loadeddata\",(e)=>{\n        //     console.log(\"loadeddata ---->\",e.target.buffered.end(e.target.buffered.length -1));\n        // });\n        // 监听音乐源数据加载过程\n        this.audio.addEventListener(\"progress\", function (e) {\n            _this.cfg.progress(e);\n        });\n        // 音乐可以播放事件\n        // this.audio.addEventListener(\"canplay\",(e)=>{\n        //     console.log(\"canplay ---->\",e.target.buffered.end(e.target.buffered.length -1));\n        // });\n    }\n    /**\n     * 添加歌曲\n     * @method addMusic\n     * @param  {Music||List} music 歌曲或者歌曲列表\n     */\n\n\n    _createClass(MyAudio, [{\n        key: \"addMusic\",\n        value: function addMusic(music) {\n            if (Array.isArray(music)) {\n                var _musicList;\n\n                (_musicList = this.musicList).push.apply(_musicList, _toConsumableArray(music.map(function (mus) {\n                    return new Music(mus);\n                })));\n            } else {\n                this.musicList.push(new Music(music));\n            }\n            return this;\n        }\n        /**\n         * removeMusic\n         * @method addMusic\n         * @param  {Music} 需要删除的歌曲\n         */\n\n    }, {\n        key: \"removeMusic\",\n        value: function removeMusic(music) {\n            if (this.musicList.includes(music)) {\n                this.musicList.splice(this.musicList.indexOf(music), 1);\n            }\n            return this;\n        }\n        /**\n         * 获取当前播放器信息\n         */\n\n    }, {\n        key: \"getInfo\",\n        value: function getInfo() {\n            return {\n                music: this.musicList[this.index].info,\n                currentSrc: this.audio.currentSrc,\n                volume: this.audio.volume,\n                currentTime: this.audio.currentTime,\n                paused: this.audio.paused,\n                ended: this.audio.ended,\n                loop: this.audio.loop,\n                startTime: this.audio.startTime,\n                duration: this.audio.duration\n            };\n        }\n        // 播放\n\n    }, {\n        key: \"play\",\n        value: function play() {\n            this.audio.play();\n            return this;\n        }\n        // 暂停\n\n    }, {\n        key: \"pause\",\n        value: function pause() {\n            this.audio.pause();\n            return this;\n        }\n        // 改变音量,val为数值则设置为该数值,若为 increase代表音量增加10,否则减少10\n\n    }, {\n        key: \"changeVolume\",\n        value: function changeVolume(val) {\n            var volume = this.audio.volume * 100;\n            if (typeof val === 'number') {\n                volume = val;\n            } else if (val === 'increase') {\n                volume = volume + 10;\n            } else {\n                volume = volume - 10;\n            }\n            volume > 100 && (volume = 100);\n            volume < 0 && (volume = 0);\n            this.audio.volume = volume / 100;\n            return this;\n        }\n        // 设置当前播放时间,0-100,代表百分比\n\n    }, {\n        key: \"setCurrentTime\",\n        value: function setCurrentTime(val) {\n            this.audio.currentTime = this.audio.duration * val / 100;\n            return this;\n        }\n        /**\n         * 加载并播放音乐\n         */\n\n    }, {\n        key: \"load\",\n        value: function load(music) {\n            if (typeof music === 'undefined') {\n                return this;\n            }\n            if (!this.musicList.includes(music)) {\n                this.musicList.push(music);\n                this.index = this.musicList.length - 1;\n            } else {\n                this.index = this.musicList.indexOf(music);\n            }\n            this.musicList.forEach(function (mus) {\n                $q(mus.dom).removeClass(\"active\");\n            });\n            $q(music.dom).addClass(\"active\");\n            // 通过后台代理并将二进制转成blob播放\n            // fetch(\"http://localhost:4000/proxy?url=\"+music.info.songLink)\n            // .then((res)=>{\n            //     var result = res.blob()\n            //     console.log(result);\n            //     return result\n            // })\n            // .then((data)=>{\n            //     this.audio.src = window.URL.createObjectURL(data);\n            //     this.play();\n            // })\n            this.audio.src = music.info.songLink;\n            console.log(music.info.songName);\n            this.play();\n            return this;\n        }\n        // 下一首音乐,返回this,可进行链式调用\n\n    }, {\n        key: \"next\",\n        value: function next() {\n            if (this.cfg.playMod === \"order\") {\n                // 顺序播放\n                this.index++;\n                if (this.index >= this.musicList.length) {\n                    this.index = 0;\n                }\n            } else {\n                // 随机播放\n                this.index = parseInt(Math.random() * this.musicList.length, 10);\n            }\n            var music = this.musicList[this.index];\n            this.load(this.musicList[this.index]);\n            return this;\n        }\n        // 上一首音乐,返回this,可进行链式调用\n\n    }, {\n        key: \"prev\",\n        value: function prev() {\n            if (this.cfg.playMod === \"order\") {\n                // 顺序播放\n                this.index--;\n                if (this.index < 0) {\n                    this.index = this.musicList.length - 1;\n                }\n            } else {\n                // 随机播放\n                this.index = parseInt(Math.random() * this.musicList.length, 10);\n            }\n            var music = this.musicList[this.index];\n            this.load(this.musicList[this.index]);\n            return this;\n        }\n    }]);\n\n    return MyAudio;\n}();\n\nmodule.exports = { MyAudio: MyAudio, Music: Music };//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXVkaW8uanM/ZGQwNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFNLEs7QUFDRixtQkFBWSxHQUFaLEVBQWdCLEdBQWhCLEVBQW9CO0FBQUE7O0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQUssSUFBTCxHQUFZLEdBQVo7QUFDQSxhQUFLLEdBQUwsR0FBVyxHQUFYLENBTGdCLENBS0E7QUFDbkI7Ozs7a0NBRVE7QUFDTCxtQkFBTyxLQUFLLElBQVo7QUFDSDs7Ozs7O0lBR0MsTztBQUNGOzs7Ozs7O0FBT0EscUJBQVksR0FBWixFQUFzQztBQUFBOztBQUFBLFlBQXRCLFNBQXNCLHlEQUFaLEVBQVk7QUFBQSxZQUFULEdBQVMseURBQUgsRUFBRzs7QUFBQTs7QUFDbEMsYUFBSyxLQUFMLEdBQWEsR0FBYixDQURrQyxDQUNmO0FBQ25CLGFBQUssU0FBTCxHQUFpQixVQUFVLEdBQVYsQ0FBYztBQUFBLG1CQUFLLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBTDtBQUFBLFNBQWQsQ0FBakIsQ0FGa0MsQ0FFb0I7QUFDdEQsYUFBSyxLQUFMLEdBQWEsQ0FBYixDQUhrQyxDQUdqQjtBQUNqQixZQUFNLGFBQWE7QUFDZixtQkFBTSxpQkFBVSxDQUFFLENBREgsRUFDSztBQUNwQixrQkFBSyxnQkFBVSxDQUFFLENBRkYsRUFFSTtBQUNuQixzQkFBUyxvQkFBVSxDQUFFLENBSE4sRUFHUTtBQUN2QixxQkFBUyxPQUpNLENBSUc7QUFKSCxTQUFuQjtBQU1BO0FBQ0EsYUFBSyxHQUFMLEdBQVcsT0FBTyxNQUFQLENBQWMsVUFBZCxFQUF5QixHQUF6QixDQUFYO0FBQ0EsYUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBb0MsWUFBSTtBQUNwQyxnQkFBSSxDQUFDLE1BQUssS0FBTCxDQUFXLElBQWhCLEVBQXNCO0FBQ2xCO0FBQ0Esc0JBQUssSUFBTDtBQUNIO0FBQ0Qsa0JBQUssR0FBTCxDQUFTLEtBQVQ7QUFDSCxTQU5EO0FBT0EsYUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsTUFBNUIsRUFBbUMsS0FBSyxHQUFMLENBQVMsSUFBNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLFVBQTVCLEVBQXVDLFVBQUMsQ0FBRCxFQUFLO0FBQ3hDLGtCQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLENBQWxCO0FBQ0gsU0FGRDtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDs7Ozs7Ozs7O2lDQUtTLEssRUFBTTtBQUNYLGdCQUFJLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FBSixFQUEwQjtBQUFBOztBQUN0QixtQ0FBSyxTQUFMLEVBQWUsSUFBZixzQ0FBdUIsTUFBTSxHQUFOLENBQVU7QUFBQSwyQkFBSyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQUw7QUFBQSxpQkFBVixDQUF2QjtBQUNILGFBRkQsTUFFSztBQUNELHFCQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBcEI7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDtBQUNEOzs7Ozs7OztvQ0FLWSxLLEVBQU07QUFDZCxnQkFBSSxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXdCLEtBQXhCLENBQUosRUFBb0M7QUFDaEMscUJBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixLQUF2QixDQUF0QixFQUFvRCxDQUFwRDtBQUNIO0FBQ0QsbUJBQU8sSUFBUDtBQUNIO0FBQ0Q7Ozs7OztrQ0FHUztBQUNMLG1CQUFPO0FBQ0gsdUJBQU0sS0FBSyxTQUFMLENBQWUsS0FBSyxLQUFwQixFQUEyQixJQUQ5QjtBQUVILDRCQUFXLEtBQUssS0FBTCxDQUFXLFVBRm5CO0FBR0gsd0JBQU8sS0FBSyxLQUFMLENBQVcsTUFIZjtBQUlILDZCQUFZLEtBQUssS0FBTCxDQUFXLFdBSnBCO0FBS0gsd0JBQU8sS0FBSyxLQUFMLENBQVcsTUFMZjtBQU1ILHVCQUFNLEtBQUssS0FBTCxDQUFXLEtBTmQ7QUFPSCxzQkFBSyxLQUFLLEtBQUwsQ0FBVyxJQVBiO0FBUUgsMkJBQVUsS0FBSyxLQUFMLENBQVcsU0FSbEI7QUFTSCwwQkFBUyxLQUFLLEtBQUwsQ0FBVztBQVRqQixhQUFQO0FBV0g7QUFDRDs7OzsrQkFDTTtBQUNGLGlCQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ0EsbUJBQU8sSUFBUDtBQUNIO0FBQ0Q7Ozs7Z0NBQ087QUFDSCxpQkFBSyxLQUFMLENBQVcsS0FBWDtBQUNBLG1CQUFPLElBQVA7QUFDSDtBQUNEOzs7O3FDQUNhLEcsRUFBSTtBQUNiLGdCQUFJLFNBQVMsS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFrQixHQUEvQjtBQUNBLGdCQUFJLE9BQU8sR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQ3pCLHlCQUFTLEdBQVQ7QUFDSCxhQUZELE1BRU0sSUFBRyxRQUFRLFVBQVgsRUFBc0I7QUFDeEIseUJBQVMsU0FBUyxFQUFsQjtBQUNILGFBRkssTUFFQTtBQUNGLHlCQUFTLFNBQVMsRUFBbEI7QUFDSDtBQUNELHFCQUFTLEdBQVQsS0FBaUIsU0FBUyxHQUExQjtBQUNBLHFCQUFTLENBQVQsS0FBZSxTQUFTLENBQXhCO0FBQ0EsaUJBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBTyxHQUEzQjtBQUNBLG1CQUFPLElBQVA7QUFDSDtBQUNEOzs7O3VDQUNlLEcsRUFBSTtBQUNmLGlCQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXlCLEtBQUssS0FBTCxDQUFXLFFBQVgsR0FBb0IsR0FBcEIsR0FBd0IsR0FBakQ7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7QUFDRDs7Ozs7OzZCQUdLLEssRUFBTTtBQUNQLGdCQUFJLE9BQU8sS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUM5Qix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBSSxDQUFDLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsS0FBeEIsQ0FBTCxFQUFxQztBQUNqQyxxQkFBSyxTQUFMLENBQWUsSUFBZixDQUFvQixLQUFwQjtBQUNBLHFCQUFLLEtBQUwsR0FBYSxLQUFLLFNBQUwsQ0FBZSxNQUFmLEdBQXdCLENBQXJDO0FBQ0gsYUFIRCxNQUdNO0FBQ0YscUJBQUssS0FBTCxHQUFhLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNIO0FBQ0QsaUJBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsVUFBQyxHQUFELEVBQU87QUFDMUIsbUJBQUcsSUFBSSxHQUFQLEVBQVksV0FBWixDQUF3QixRQUF4QjtBQUNILGFBRkQ7QUFHQSxlQUFHLE1BQU0sR0FBVCxFQUFjLFFBQWQsQ0FBdUIsUUFBdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQUssS0FBTCxDQUFXLEdBQVgsR0FBaUIsTUFBTSxJQUFOLENBQVcsUUFBNUI7QUFDQSxvQkFBUSxHQUFSLENBQVksTUFBTSxJQUFOLENBQVcsUUFBdkI7QUFDQSxpQkFBSyxJQUFMO0FBQ0EsbUJBQU8sSUFBUDtBQUNIO0FBQ0Q7Ozs7K0JBQ007QUFDRixnQkFBSSxLQUFLLEdBQUwsQ0FBUyxPQUFULEtBQXFCLE9BQXpCLEVBQWtDO0FBQzlCO0FBQ0EscUJBQUssS0FBTDtBQUNBLG9CQUFJLEtBQUssS0FBTCxJQUFjLEtBQUssU0FBTCxDQUFlLE1BQWpDLEVBQXlDO0FBQ3JDLHlCQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0g7QUFDSixhQU5ELE1BTU07QUFDRjtBQUNBLHFCQUFLLEtBQUwsR0FBYSxTQUFTLEtBQUssTUFBTCxLQUFjLEtBQUssU0FBTCxDQUFlLE1BQXRDLEVBQTZDLEVBQTdDLENBQWI7QUFDSDtBQUNELGdCQUFJLFFBQVEsS0FBSyxTQUFMLENBQWUsS0FBSyxLQUFwQixDQUFaO0FBQ0EsaUJBQUssSUFBTCxDQUFVLEtBQUssU0FBTCxDQUFlLEtBQUssS0FBcEIsQ0FBVjtBQUNBLG1CQUFPLElBQVA7QUFDSDtBQUNEOzs7OytCQUNNO0FBQ0YsZ0JBQUksS0FBSyxHQUFMLENBQVMsT0FBVCxLQUFxQixPQUF6QixFQUFrQztBQUM5QjtBQUNBLHFCQUFLLEtBQUw7QUFDQSxvQkFBSSxLQUFLLEtBQUwsR0FBYSxDQUFqQixFQUFvQjtBQUNoQix5QkFBSyxLQUFMLEdBQWEsS0FBSyxTQUFMLENBQWUsTUFBZixHQUF1QixDQUFwQztBQUNIO0FBQ0osYUFORCxNQU1NO0FBQ0Y7QUFDQSxxQkFBSyxLQUFMLEdBQWEsU0FBUyxLQUFLLE1BQUwsS0FBYyxLQUFLLFNBQUwsQ0FBZSxNQUF0QyxFQUE2QyxFQUE3QyxDQUFiO0FBQ0g7QUFDRCxnQkFBSSxRQUFRLEtBQUssU0FBTCxDQUFlLEtBQUssS0FBcEIsQ0FBWjtBQUNBLGlCQUFLLElBQUwsQ0FBVSxLQUFLLFNBQUwsQ0FBZSxLQUFLLEtBQXBCLENBQVY7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7Ozs7OztBQUtMLE9BQU8sT0FBUCxHQUFpQixFQUFDLFNBQVEsT0FBVCxFQUFpQixPQUFNLEtBQXZCLEVBQWpCIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNdXNpY3tcbiAgICBjb25zdHJ1Y3RvcihvYmosZG9tKXtcbiAgICAgICAgLy8ge3F1ZXJ5SWQsc29uZElkLHNvbmdOYW1lLGFydGlzdElkLGFydGlzdE5hbWUsYWxidW1JZCxhbGJ1bU5hbWUsXG4gICAgICAgIC8vICAgICBzb25nUGljU21hbGwsc29uZ1BpY0JpZyxzb25nUGljUmFkaW8sbHJjTGluayx0aW1lLGxpbmtDb2RlLFxuICAgICAgICAvLyAgICAgc29uZ0xpbmssc2hvd0xpbmssZm9ybWF0LHJhdGUsc2l6ZSxyZWxhdGVTdGF0dXMscmVzb3VyY2VUeXBlfSA9IG9iajtcbiAgICAgICAgdGhpcy5pbmZvID0gb2JqO1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTsgLy8g5Y+v5pS+5YWl5Luj6KGo5q2M5puy55qEZG9tLFxuICAgIH1cblxuICAgIGdldEluZm8oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mbztcbiAgICB9XG59XG5cbmNsYXNzIE15QXVkaW8ge1xuICAgIC8qKlxuICAgICAqIOaehOmAoOWZqFxuICAgICAqIEBwYXJhbSB7ZWxlbWVudH0gYXVkaW/nmoRkb23lhYPntKBcbiAgICAgKiBAcGFyYW0ge2FycmF5fSAg5pKt5pS+5YiX6KGoLOWPr+epulxuICAgICAqIEBwYXJhbSB7b2JqfSAg6YWN572u6aG5XG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVsZSxtdXNpY0xpc3Q9W10sY2ZnID0ge30pe1xuICAgICAgICB0aGlzLmF1ZGlvID0gZWxlOyAgLy8g5YWD57SgZG9tXG4gICAgICAgIHRoaXMubXVzaWNMaXN0ID0gbXVzaWNMaXN0Lm1hcChlbGU9Pm5ldyBNdXNpYyhlbGUpKTsgIC8vIOatjOabsuWIl+ihqFxuICAgICAgICB0aGlzLmluZGV4ID0gMDsgIC8vIOW9k+WJjeatjOabsue0ouW8lVxuICAgICAgICBjb25zdCBkZWZhdWx0Q2ZnID0ge1xuICAgICAgICAgICAgZW5kZWQ6ZnVuY3Rpb24oKXt9LCAvLyDnu5PmnZ/lm57osINcbiAgICAgICAgICAgIHBsYXk6ZnVuY3Rpb24oKXt9LCAvLyDmkq3mlL7ml7blgJnlm57osINcbiAgICAgICAgICAgIHByb2dyZXNzOmZ1bmN0aW9uKCl7fSwgLy8g57yT5Yay5pe25LqL5Lu2XG4gICAgICAgICAgICBwbGF5TW9kIDpcIm9yZGVyXCIgIC8vIOaSreaUvuexu+WeiyxcbiAgICAgICAgfTtcbiAgICAgICAgLy8g6YWN572uLOaSreaUvuWbnuiwgyzmkq3mlL7nu5PmnZ/lm57osINcbiAgICAgICAgdGhpcy5jZmcgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRDZmcsY2ZnKTtcbiAgICAgICAgdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwoKT0+e1xuICAgICAgICAgICAgaWYgKCF0aGlzLmF1ZGlvLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAvLyDlj6ropoHkuI3mmK/ljZXmm7Llvqrnjq8s6YO95Lya5omn6KGM5LiL5LiA6aaW5pON5L2cLlxuICAgICAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jZmcuZW5kZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcInBsYXlcIix0aGlzLmNmZy5wbGF5KTtcbiAgICAgICAgLy8gdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0YXJ0XCIsKGUpPT57XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImxvYWRzdGFydCAtLS0tPlwiLGUudGFyZ2V0LmJ1ZmZlcmVkKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHRoaXMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImR1cmF0aW9uY2hhbmdlXCIsKGUpPT57XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImR1cmF0aW9uY2hhbmdlIC0tLS0+XCIsZS50YXJnZXQuYnVmZmVyZWQuZW5kKGUudGFyZ2V0LmJ1ZmZlcmVkLmxlbmd0aCAtMSkpO1xuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwoZSk9PntcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwibG9hZGVkbWV0YWRhdGEgLS0tLT5cIixlLnRhcmdldC5idWZmZXJlZC5lbmQoZS50YXJnZXQuYnVmZmVyZWQubGVuZ3RoIC0xKSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsKGUpPT57XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImxvYWRlZGRhdGEgLS0tLT5cIixlLnRhcmdldC5idWZmZXJlZC5lbmQoZS50YXJnZXQuYnVmZmVyZWQubGVuZ3RoIC0xKSk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICAvLyDnm5HlkKzpn7PkuZDmupDmlbDmja7liqDovb3ov4fnqItcbiAgICAgICAgdGhpcy5hdWRpby5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwoZSk9PntcbiAgICAgICAgICAgIHRoaXMuY2ZnLnByb2dyZXNzKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g6Z+z5LmQ5Y+v5Lul5pKt5pS+5LqL5Lu2XG4gICAgICAgIC8vIHRoaXMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXlcIiwoZSk9PntcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiY2FucGxheSAtLS0tPlwiLGUudGFyZ2V0LmJ1ZmZlcmVkLmVuZChlLnRhcmdldC5idWZmZXJlZC5sZW5ndGggLTEpKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOa3u+WKoOatjOabslxuICAgICAqIEBtZXRob2QgYWRkTXVzaWNcbiAgICAgKiBAcGFyYW0gIHtNdXNpY3x8TGlzdH0gbXVzaWMg5q2M5puy5oiW6ICF5q2M5puy5YiX6KGoXG4gICAgICovXG4gICAgYWRkTXVzaWMobXVzaWMpe1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtdXNpYykpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNMaXN0LnB1c2goLi4ubXVzaWMubWFwKG11cz0+bmV3IE11c2ljKG11cykpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm11c2ljTGlzdC5wdXNoKG5ldyBNdXNpYyhtdXNpYykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiByZW1vdmVNdXNpY1xuICAgICAqIEBtZXRob2QgYWRkTXVzaWNcbiAgICAgKiBAcGFyYW0gIHtNdXNpY30g6ZyA6KaB5Yig6Zmk55qE5q2M5puyXG4gICAgICovXG4gICAgcmVtb3ZlTXVzaWMobXVzaWMpe1xuICAgICAgICBpZiAodGhpcy5tdXNpY0xpc3QuaW5jbHVkZXMobXVzaWMpKSB7XG4gICAgICAgICAgICB0aGlzLm11c2ljTGlzdC5zcGxpY2UodGhpcy5tdXNpY0xpc3QuaW5kZXhPZihtdXNpYyksMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeaSreaUvuWZqOS/oeaBr1xuICAgICAqL1xuICAgIGdldEluZm8oKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11c2ljOnRoaXMubXVzaWNMaXN0W3RoaXMuaW5kZXhdLmluZm8sXG4gICAgICAgICAgICBjdXJyZW50U3JjOnRoaXMuYXVkaW8uY3VycmVudFNyYyxcbiAgICAgICAgICAgIHZvbHVtZTp0aGlzLmF1ZGlvLnZvbHVtZSxcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lOnRoaXMuYXVkaW8uY3VycmVudFRpbWUsXG4gICAgICAgICAgICBwYXVzZWQ6dGhpcy5hdWRpby5wYXVzZWQsXG4gICAgICAgICAgICBlbmRlZDp0aGlzLmF1ZGlvLmVuZGVkLFxuICAgICAgICAgICAgbG9vcDp0aGlzLmF1ZGlvLmxvb3AsXG4gICAgICAgICAgICBzdGFydFRpbWU6dGhpcy5hdWRpby5zdGFydFRpbWUsXG4gICAgICAgICAgICBkdXJhdGlvbjp0aGlzLmF1ZGlvLmR1cmF0aW9uXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g5pKt5pS+XG4gICAgcGxheSgpe1xuICAgICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIOaaguWBnFxuICAgIHBhdXNlKCl7XG4gICAgICAgIHRoaXMuYXVkaW8ucGF1c2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIOaUueWPmOmfs+mHjyx2YWzkuLrmlbDlgLzliJnorr7nva7kuLror6XmlbDlgLws6Iul5Li6IGluY3JlYXNl5Luj6KGo6Z+z6YeP5aKe5YqgMTAs5ZCm5YiZ5YeP5bCRMTBcbiAgICBjaGFuZ2VWb2x1bWUodmFsKXtcbiAgICAgICAgdmFyIHZvbHVtZSA9IHRoaXMuYXVkaW8udm9sdW1lKjEwMDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB2b2x1bWUgPSB2YWw7XG4gICAgICAgIH1lbHNlIGlmKHZhbCA9PT0gJ2luY3JlYXNlJyl7XG4gICAgICAgICAgICB2b2x1bWUgPSB2b2x1bWUgKyAxMDtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdm9sdW1lID0gdm9sdW1lIC0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgdm9sdW1lID4gMTAwICYmICh2b2x1bWUgPSAxMDApO1xuICAgICAgICB2b2x1bWUgPCAwICYmICh2b2x1bWUgPSAwKTtcbiAgICAgICAgdGhpcy5hdWRpby52b2x1bWUgPSB2b2x1bWUvMTAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8g6K6+572u5b2T5YmN5pKt5pS+5pe26Ze0LDAtMTAwLOS7o+ihqOeZvuWIhuavlFxuICAgIHNldEN1cnJlbnRUaW1lKHZhbCl7XG4gICAgICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSB0aGlzLmF1ZGlvLmR1cmF0aW9uKnZhbC8xMDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliqDovb3lubbmkq3mlL7pn7PkuZBcbiAgICAgKi9cbiAgICBsb2FkKG11c2ljKXtcbiAgICAgICAgaWYgKHR5cGVvZiBtdXNpYyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5tdXNpY0xpc3QuaW5jbHVkZXMobXVzaWMpKSB7XG4gICAgICAgICAgICB0aGlzLm11c2ljTGlzdC5wdXNoKG11c2ljKVxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMubXVzaWNMaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLm11c2ljTGlzdC5pbmRleE9mKG11c2ljKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubXVzaWNMaXN0LmZvckVhY2goKG11cyk9PntcbiAgICAgICAgICAgICRxKG11cy5kb20pLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICB9KVxuICAgICAgICAkcShtdXNpYy5kb20pLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAvLyDpgJrov4flkI7lj7Dku6PnkIblubblsIbkuozov5vliLbovazmiJBibG9i5pKt5pS+XG4gICAgICAgIC8vIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL3Byb3h5P3VybD1cIittdXNpYy5pbmZvLnNvbmdMaW5rKVxuICAgICAgICAvLyAudGhlbigocmVzKT0+e1xuICAgICAgICAvLyAgICAgdmFyIHJlc3VsdCA9IHJlcy5ibG9iKClcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgIC8vICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC50aGVuKChkYXRhKT0+e1xuICAgICAgICAvLyAgICAgdGhpcy5hdWRpby5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcbiAgICAgICAgLy8gICAgIHRoaXMucGxheSgpO1xuICAgICAgICAvLyB9KVxuICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IG11c2ljLmluZm8uc29uZ0xpbms7XG4gICAgICAgIGNvbnNvbGUubG9nKG11c2ljLmluZm8uc29uZ05hbWUpO1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIOS4i+S4gOmmlumfs+S5kCzov5Tlm550aGlzLOWPr+i/m+ihjOmTvuW8j+iwg+eUqFxuICAgIG5leHQoKXtcbiAgICAgICAgaWYgKHRoaXMuY2ZnLnBsYXlNb2QgPT09IFwib3JkZXJcIikge1xuICAgICAgICAgICAgLy8g6aG65bqP5pKt5pS+XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+PSB0aGlzLm11c2ljTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgLy8g6ZqP5py65pKt5pS+XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSp0aGlzLm11c2ljTGlzdC5sZW5ndGgsMTApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtdXNpYyA9IHRoaXMubXVzaWNMaXN0W3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLmxvYWQodGhpcy5tdXNpY0xpc3RbdGhpcy5pbmRleF0pXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyDkuIrkuIDpppbpn7PkuZAs6L+U5ZuedGhpcyzlj6/ov5vooYzpk77lvI/osIPnlKhcbiAgICBwcmV2KCl7XG4gICAgICAgIGlmICh0aGlzLmNmZy5wbGF5TW9kID09PSBcIm9yZGVyXCIpIHtcbiAgICAgICAgICAgIC8vIOmhuuW6j+aSreaUvlxuICAgICAgICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMubXVzaWNMaXN0Lmxlbmd0aCAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgLy8g6ZqP5py65pKt5pS+XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSp0aGlzLm11c2ljTGlzdC5sZW5ndGgsMTApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtdXNpYyA9IHRoaXMubXVzaWNMaXN0W3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLmxvYWQodGhpcy5tdXNpY0xpc3RbdGhpcy5pbmRleF0pXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge015QXVkaW86TXlBdWRpbyxNdXNpYzpNdXNpY307XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9hdWRpby5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);