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
/******/ 	var hotCurrentHash = "d10fa55a2133317eff7e"; // eslint-disable-line no-unused-vars
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
/******/ 			var chunkId = 0;
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

	eval("\"use strict\";\n\n// import MyAudio from \"./js/audio.js\";\n__webpack_require__(1);\n__webpack_require__(3);\n__webpack_require__(5);\n\nfetch(\"http://localhost:4000/search?query=陈奕迅\", {\n    mod: \"cors\"\n}).then(function (res) {\n    return res.json();\n}).then(function (data) {\n    var musicList = data.data.songList;\n    window.player = new MyAudio(document.getElementById(\"player\"), musicList);\n    player.next();\n});\n\n$q(\"button[name='play']\").on('click', function (event) {\n    event.preventDefault();\n    var status = $q(this).data(\"status\");\n    if (status === 'play') {\n        window.player.pause();\n        $q(this).data(\"status\", \"paused\");\n    } else {\n        window.player.play();\n        $q(this).data(\"status\", \"play\");\n    }\n});\n$q(\"button[changebtn]\").on('click', function (event) {\n    var type = $q(this).attr(\"action-type\");\n    if (type === 'next') {\n        window.player.next();\n    } else {\n        window.player.prev();\n    }\n});\n$q(\"#search-btn\").on('click', function (event) {\n    var val = $q(\"#search-input\").val();\n    fetch(\"http://localhost:4000/search?query=\" + val, {\n        mod: \"cors\"\n    }).then(function (res) {\n        return res.json();\n    }).then(function (data) {\n        console.log(data.data.songList);\n    });\n});//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz8zNDc5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxvQkFBUSxDQUFSO0FBQ0Esb0JBQVEsQ0FBUjtBQUNBLG9CQUFRLENBQVI7O0FBRUEsTUFBTSx3Q0FBTixFQUErQztBQUMzQyxTQUFJO0FBRHVDLENBQS9DLEVBRUcsSUFGSCxDQUVRO0FBQUEsV0FBSyxJQUFJLElBQUosRUFBTDtBQUFBLENBRlIsRUFFeUIsSUFGekIsQ0FFOEIsZ0JBQU07QUFDaEMsUUFBSSxZQUFZLEtBQUssSUFBTCxDQUFVLFFBQTFCO0FBQ0EsV0FBTyxNQUFQLEdBQWdCLElBQUksT0FBSixDQUFZLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFaLEVBQThDLFNBQTlDLENBQWhCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsQ0FORDs7QUFRQSxHQUFHLHFCQUFILEVBQTBCLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFVBQVMsS0FBVCxFQUFnQjtBQUNsRCxVQUFNLGNBQU47QUFDQSxRQUFJLFNBQVMsR0FBRyxJQUFILEVBQVMsSUFBVCxDQUFjLFFBQWQsQ0FBYjtBQUNBLFFBQUksV0FBVyxNQUFmLEVBQXVCO0FBQ25CLGVBQU8sTUFBUCxDQUFjLEtBQWQ7QUFDQSxXQUFHLElBQUgsRUFBUyxJQUFULENBQWMsUUFBZCxFQUF1QixRQUF2QjtBQUNILEtBSEQsTUFHTTtBQUNGLGVBQU8sTUFBUCxDQUFjLElBQWQ7QUFDQSxXQUFHLElBQUgsRUFBUyxJQUFULENBQWMsUUFBZCxFQUF1QixNQUF2QjtBQUNIO0FBQ0osQ0FWRDtBQVdBLEdBQUcsbUJBQUgsRUFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBUyxLQUFULEVBQWdCO0FBQ2hELFFBQUksT0FBTyxHQUFHLElBQUgsRUFBUyxJQUFULENBQWMsYUFBZCxDQUFYO0FBQ0EsUUFBSSxTQUFTLE1BQWIsRUFBcUI7QUFDakIsZUFBTyxNQUFQLENBQWMsSUFBZDtBQUNILEtBRkQsTUFFTTtBQUNGLGVBQU8sTUFBUCxDQUFjLElBQWQ7QUFDSDtBQUNKLENBUEQ7QUFRQSxHQUFHLGFBQUgsRUFBa0IsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBUyxLQUFULEVBQWdCO0FBQzFDLFFBQUksTUFBTSxHQUFHLGVBQUgsRUFBb0IsR0FBcEIsRUFBVjtBQUNBLFVBQU0sd0NBQXNDLEdBQTVDLEVBQWdEO0FBQzVDLGFBQUk7QUFEd0MsS0FBaEQsRUFFRyxJQUZILENBRVE7QUFBQSxlQUFLLElBQUksSUFBSixFQUFMO0FBQUEsS0FGUixFQUV5QixJQUZ6QixDQUU4QixnQkFBTTtBQUNoQyxnQkFBUSxHQUFSLENBQVksS0FBSyxJQUFMLENBQVUsUUFBdEI7QUFDSCxLQUpEO0FBS0gsQ0FQRCIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IE15QXVkaW8gZnJvbSBcIi4vanMvYXVkaW8uanNcIjtcbnJlcXVpcmUoXCJleHBvc2U/JHEhLi9qcy9xdWVyeS5qc1wiKTtcbnJlcXVpcmUoXCJleHBvc2U/TXlBdWRpbyEuL2pzL2F1ZGlvLmpzXCIpO1xucmVxdWlyZShcIi4vc2Fzcy9zdHlsZS5zY3NzXCIpO1xuXG5mZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9zZWFyY2g/cXVlcnk96ZmI5aWV6L+FXCIse1xuICAgIG1vZDpcImNvcnNcIlxufSkudGhlbihyZXM9PnJlcy5qc29uKCkpLnRoZW4oZGF0YT0+e1xuICAgIHZhciBtdXNpY0xpc3QgPSBkYXRhLmRhdGEuc29uZ0xpc3Q7XG4gICAgd2luZG93LnBsYXllciA9IG5ldyBNeUF1ZGlvKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyXCIpLG11c2ljTGlzdCk7XG4gICAgcGxheWVyLm5leHQoKTtcbn0pO1xuXG4kcShcImJ1dHRvbltuYW1lPSdwbGF5J11cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBzdGF0dXMgPSAkcSh0aGlzKS5kYXRhKFwic3RhdHVzXCIpO1xuICAgIGlmIChzdGF0dXMgPT09ICdwbGF5Jykge1xuICAgICAgICB3aW5kb3cucGxheWVyLnBhdXNlKCk7XG4gICAgICAgICRxKHRoaXMpLmRhdGEoXCJzdGF0dXNcIixcInBhdXNlZFwiKVxuICAgIH1lbHNlIHtcbiAgICAgICAgd2luZG93LnBsYXllci5wbGF5KCk7XG4gICAgICAgICRxKHRoaXMpLmRhdGEoXCJzdGF0dXNcIixcInBsYXlcIilcbiAgICB9XG59KTtcbiRxKFwiYnV0dG9uW2NoYW5nZWJ0bl1cIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgdHlwZSA9ICRxKHRoaXMpLmF0dHIoXCJhY3Rpb24tdHlwZVwiKTtcbiAgICBpZiAodHlwZSA9PT0gJ25leHQnKSB7XG4gICAgICAgIHdpbmRvdy5wbGF5ZXIubmV4dCgpO1xuICAgIH1lbHNlIHtcbiAgICAgICAgd2luZG93LnBsYXllci5wcmV2KCk7XG4gICAgfVxufSk7XG4kcShcIiNzZWFyY2gtYnRuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIHZhbCA9ICRxKFwiI3NlYXJjaC1pbnB1dFwiKS52YWwoKTtcbiAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9zZWFyY2g/cXVlcnk9XCIrdmFsLHtcbiAgICAgICAgbW9kOlwiY29yc1wiXG4gICAgfSkudGhlbihyZXM9PnJlcy5qc29uKCkpLnRoZW4oZGF0YT0+e1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEuc29uZ0xpc3QpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWluLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global[\"$q\"] = __webpack_require__(2);\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVlcnkuanM/OWFiZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxRyIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCIkcVwiXSA9IHJlcXVpcmUoXCItIS9ob21lL3p3aW5nL2dpdFByb2plY3QvbXVzaWNQbGF5ZXIvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9pbmRleC5qcyEvaG9tZS96d2luZy9naXRQcm9qZWN0L211c2ljUGxheWVyL3NyYy9qcy9xdWVyeS5qc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9leHBvc2UtbG9hZGVyPyRxIS4vc3JjL2pzL3F1ZXJ5LmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _extendableBuiltin(cls) {\n    function ExtendableBuiltin() {\n        var instance = Reflect.construct(cls, Array.from(arguments));\n        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));\n        return instance;\n    }\n\n    ExtendableBuiltin.prototype = Object.create(cls.prototype, {\n        constructor: {\n            value: cls,\n            enumerable: false,\n            writable: true,\n            configurable: true\n        }\n    });\n\n    if (Object.setPrototypeOf) {\n        Object.setPrototypeOf(ExtendableBuiltin, cls);\n    } else {\n        ExtendableBuiltin.__proto__ = cls;\n    }\n\n    return ExtendableBuiltin;\n}\n\nvar MyQueryDom = function (_extendableBuiltin2) {\n    _inherits(MyQueryDom, _extendableBuiltin2);\n\n    function MyQueryDom(ele) {\n        _classCallCheck(this, MyQueryDom);\n\n        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyQueryDom).call(this));\n\n        if (ele.length === 1) {\n            _this[0] = ele[0];\n        } else {\n            ele.forEach(function (e, i) {\n                _this[i] = e;\n            });\n        }\n        return _this;\n    }\n\n    _createClass(MyQueryDom, [{\n        key: '_result',\n        value: function _result(result) {\n            if (result.length === 1) {\n                return result[0];\n            }\n            return result;\n        }\n    }, {\n        key: 'attr',\n        value: function attr(string, value) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.getAttribute(string));\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.setAttribute(string, value);\n                });\n                return this;\n            }\n        }\n    }, {\n        key: 'removeAttr',\n        value: function removeAttr(string) {\n            this.forEach(function (ele) {\n                ele.removeAttribute(string);\n            });\n            return this;\n        }\n    }, {\n        key: 'data',\n        value: function data(string, val) {\n            if (typeof val === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.dataset[string]);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.dataset[string] = val;\n                });\n                return this;\n            }\n        }\n    }, {\n        key: 'removeData',\n        value: function removeData(string) {\n            var _this2 = this;\n\n            this.forEach(function (ele) {\n                _this2.dataset[string] = null;\n            });\n            return this;\n        }\n    }, {\n        key: 'val',\n        value: function val(value) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.value);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.value = value;\n                });\n                return this;\n            }\n        }\n    }, {\n        key: 'text',\n        value: function text(value) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.innerText);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.innerText = value;\n                });\n                return this;\n            }\n        }\n    }, {\n        key: 'after',\n        value: function after(dom) {\n            if (typeof dom === 'string') {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentHTML('afterend', dom);\n                });\n            } else if (dom.nodeType) {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentElement('afterend', dom);\n                });\n            }\n            return this;\n        }\n    }, {\n        key: 'before',\n        value: function before(dom) {\n            if (typeof dom === 'string') {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentHTML('beforebegin', dom);\n                });\n            } else if (dom.nodeType) {\n                this.forEach(function (ele) {\n                    ele.insertAdjacentElement('beforebegin', dom);\n                });\n            }\n            return this;\n        }\n    }, {\n        key: 'addClass',\n        value: function addClass(className) {\n            this.forEach(function (ele) {\n                if (ele.classList) {\n                    ele.classList.add(className);\n                } else {\n                    ele.className += ' ' + className;\n                }\n            });\n            return this;\n        }\n    }, {\n        key: 'removeClass',\n        value: function removeClass(className) {\n            this.forEach(function (ele) {\n                if (ele.classList) {\n                    ele.classList.remove(className);\n                } else {\n                    ele.className = ele.className.replace(new RegExp('(^|\\\\b)' + className.split(' ').join('|') + '(\\\\b|$)', 'gi'), ' ');\n                }\n            });\n            return this;\n        }\n    }, {\n        key: 'toggleClass',\n        value: function toggleClass(className) {\n            this.forEach(function (ele) {\n                if (el.classList) {\n                    ele.classList.toggle(className);\n                } else {\n                    var classes = ele.className.split(' ');\n                    if (classes.includes(className)) {\n                        classes.splice(classes.indexOf(className), 1);\n                    } else {\n                        classes.push(className);\n                    }\n\n                    ele.className = classes.join(' ');\n                }\n            });\n            return this;\n        }\n    }, {\n        key: 'children',\n        value: function children(str) {\n            var children = [];\n            // 子元素\n            this.forEach(function (ele) {\n                children.push.apply(children, _toConsumableArray(ele.children));\n            });\n            // 该dom下的匹配str的元素\n            if (typeof str !== 'undefined') {\n                var child = [];\n                this.forEach(function (ele) {\n                    child.push.apply(child, _toConsumableArray(ele.querySelectorAll(str)));\n                });\n                var result = [];\n                // 如果子元素在匹配str的元素数组里面则push近result\n                children.forEach(function (ele) {\n                    if (child.includes(ele)) {\n                        result.push(ele);\n                    }\n                });\n                return result;\n            }\n            return children;\n        }\n    }, {\n        key: 'find',\n        value: function find(string) {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push(ele.querySelectorAll(string));\n            });\n            return this._result(result);\n        }\n    }, {\n        key: 'html',\n        value: function html(string) {\n            if (typeof value === 'undefined') {\n                var result = [];\n                this.forEach(function (ele) {\n                    result.push(ele.innerHTML);\n                });\n                return this._result(result);\n            } else {\n                this.forEach(function (ele) {\n                    ele.innerHTML = string;\n                });\n                return this;\n            }\n        }\n    }, {\n        key: 'css',\n        value: function css(prop, val) {\n            if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {\n                this.forEach(function (ele) {});\n            } else {\n                this.forEach(function (ele) {\n                    ele.style[prop] = val;\n                });\n            }\n            return this;\n        }\n    }, {\n        key: 'parent',\n        value: function parent(string) {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push(ele.parentNode);\n            });\n            return this._result(result);\n        }\n    }, {\n        key: 'closest',\n        value: function closest(string) {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push.apply(result, _toConsumableArray(ele.closest(string)));\n            });\n            return result;\n        }\n    }, {\n        key: 'prev',\n        value: function prev() {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push(ele.previousElementSibling);\n            });\n            return this._result(result);\n        }\n    }, {\n        key: 'next',\n        value: function next() {\n            var result = [];\n            this.forEach(function (ele) {\n                result.push(ele.nextElementSibling);\n            });\n            return this._result(result);\n        }\n    }, {\n        key: 'siblings',\n        value: function siblings() {\n            var result = [];\n            this.forEach(function (ele) {\n                var sib = ele.parentNode.children.filter(function (chid) {\n                    return chid !== ele;\n                });\n                result.push.apply(result, _toConsumableArray(sib));\n            });\n            return this._result(result);\n        }\n    }, {\n        key: 'on',\n        value: function on(even, fnc) {\n            this.forEach(function (ele) {\n                ele.addEventListener(even, fnc);\n            });\n            return this;\n        }\n    }, {\n        key: 'toString',\n        value: function toString() {}\n    }]);\n\n    return MyQueryDom;\n}(_extendableBuiltin(Array));\n\nfunction MyQuery(ele) {\n    var dom;\n    if (ele.nodeType) {\n        dom = [ele];\n    } else if (typeof ele === 'string') {\n        dom = Array.from(document.querySelectorAll(ele));\n    } else {\n        console.error(\"没有匹配到\");\n        return \"\";\n    }\n    return new MyQueryDom(dom);\n}\n\nmodule.exports = MyQuery;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvcXVlcnkuanM/ZmRmZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTSxVOzs7QUFDRix3QkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBRWIsWUFBSSxJQUFJLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNsQixrQkFBSyxDQUFMLElBQVUsSUFBSSxDQUFKLENBQVY7QUFDSCxTQUZELE1BRU07QUFDRixnQkFBSSxPQUFKLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQ2Ysc0JBQUssQ0FBTCxJQUFVLENBQVY7QUFDSCxhQUZEO0FBR0g7QUFSWTtBQVNoQjs7OztnQ0FDTyxNLEVBQVE7QUFDWixnQkFBSSxPQUFPLE1BQVAsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDckIsdUJBQU8sT0FBTyxDQUFQLENBQVA7QUFDSDtBQUNELG1CQUFPLE1BQVA7QUFDSDs7OzZCQUNJLE0sRUFBUSxLLEVBQU87QUFDaEIsZ0JBQUksT0FBTyxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQzlCLG9CQUFJLFNBQVMsRUFBYjtBQUNBLHFCQUFLLE9BQUwsQ0FBYSxlQUFPO0FBQ2hCLDJCQUFPLElBQVAsQ0FBWSxJQUFJLFlBQUosQ0FBaUIsTUFBakIsQ0FBWjtBQUNILGlCQUZEO0FBR0EsdUJBQU8sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFQO0FBQ0gsYUFORCxNQU1PO0FBQ0gscUJBQUssT0FBTCxDQUFhLGVBQU87QUFDaEIsd0JBQUksWUFBSixDQUFpQixNQUFqQixFQUF5QixLQUF6QjtBQUNILGlCQUZEO0FBR0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0o7OzttQ0FDVSxNLEVBQVE7QUFDZixpQkFBSyxPQUFMLENBQWEsZUFBTztBQUNoQixvQkFBSSxlQUFKLENBQW9CLE1BQXBCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPLElBQVA7QUFDSDs7OzZCQUNJLE0sRUFB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QUZEO0FBR0EsbUJBQU8sSUFBUDtBQUNIOzs7bUNBQ1MsQ0FFVDs7OztxQkF4UG9CLEs7O0FBMFB6QixTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBcUI7QUFDakIsUUFBSSxHQUFKO0FBQ0EsUUFBSSxJQUFJLFFBQVIsRUFBa0I7QUFDZCxjQUFNLENBQUMsR0FBRCxDQUFOO0FBQ0gsS0FGRCxNQUVNLElBQUcsT0FBTyxHQUFQLEtBQWUsUUFBbEIsRUFBMkI7QUFDN0IsY0FBTSxNQUFNLElBQU4sQ0FBVyxTQUFTLGdCQUFULENBQTBCLEdBQTFCLENBQVgsQ0FBTjtBQUNILEtBRkssTUFFQTtBQUNGLGdCQUFRLEtBQVIsQ0FBYyxPQUFkO0FBQ0EsZUFBTyxFQUFQO0FBQ0g7QUFDRCxXQUFPLElBQUksVUFBSixDQUFlLEdBQWYsQ0FBUDtBQUNIOztBQUVELE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTXlRdWVyeURvbSBleHRlbmRzIEFycmF5e1xuICAgIGNvbnN0cnVjdG9yKGVsZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoZWxlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpc1swXSA9IGVsZVswXTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgZWxlLmZvckVhY2goKGUsaSk9PntcbiAgICAgICAgICAgICAgICB0aGlzW2ldID0gZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Jlc3VsdChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgYXR0cihzdHJpbmcsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUuZ2V0QXR0cmlidXRlKHN0cmluZykpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoc3RyaW5nLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZUF0dHIoc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgZWxlLnJlbW92ZUF0dHJpYnV0ZShzdHJpbmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEoc3RyaW5nLCB2YWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUuZGF0YXNldFtzdHJpbmddKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzdWx0KHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuZGF0YXNldFtzdHJpbmddID0gdmFsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZURhdGEoc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5kYXRhc2V0W3N0cmluZ10gPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHZhbCh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLnZhbHVlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGV4dCh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLmlubmVyVGV4dClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdChyZXN1bHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuaW5uZXJUZXh0ID0gdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWZ0ZXIoZG9tKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZG9tID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBkb20pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNlIGlmKGRvbS5ub2RlVHlwZSl7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGRvbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYmVmb3JlKGRvbSkge1xuICAgICAgICBpZiAodHlwZW9mIGRvbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgIGVsZS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgZG9tKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihkb20ubm9kZVR5cGUpe1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBkb20pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIGlmIChlbGUuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZS5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NOYW1lID0gZWxlLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGU9PntcbiAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGVsZS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3Nlcy5pbmNsdWRlcyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMuc3BsaWNlKGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpLCAxKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNoaWxkcmVuKHN0cikge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgLy8g5a2Q5YWD57SgXG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCguLi5lbGUuY2hpbGRyZW4pXG4gICAgICAgIH0pO1xuICAgICAgICAvLyDor6Vkb23kuIvnmoTljLnphY1zdHLnmoTlhYPntKBcbiAgICAgICAgaWYgKHR5cGVvZiBzdHIgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gW107XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICAgICAgY2hpbGQucHVzaCguLi5lbGUucXVlcnlTZWxlY3RvckFsbChzdHIpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgLy8g5aaC5p6c5a2Q5YWD57Sg5Zyo5Yy56YWNc3Ry55qE5YWD57Sg5pWw57uE6YeM6Z2i5YiZcHVzaOi/kXJlc3VsdFxuICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChlbGU9PntcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaW5jbHVkZXMoZWxlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChlbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfVxuICAgIGZpbmQoc3RyaW5nKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlbGUucXVlcnlTZWxlY3RvckFsbChzdHJpbmcpKTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdChyZXN1bHQpO1xuICAgIH1cbiAgICBodG1sKHN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLmlubmVySFRNTClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdChyZXN1bHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgICAgICBlbGUuaW5uZXJIVE1MID0gc3RyaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNzcyhwcm9wLCB2YWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlLnN0eWxlW3Byb3BdID0gdmFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHBhcmVudChzdHJpbmcpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZS5wYXJlbnROb2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KTtcbiAgICB9XG4gICAgY2xvc2VzdChzdHJpbmcpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGU9PntcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLmVsZS5jbG9zZXN0KHN0cmluZykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcHJldigpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3VsdChyZXN1bHQpO1xuICAgIH1cbiAgICBuZXh0KCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goZWxlLm5leHRFbGVtZW50U2libGluZylcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KTtcbiAgICB9XG4gICAgc2libGluZ3MoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICB2YXIgc2liID0gZWxlLnBhcmVudE5vZGUuY2hpbGRyZW4uZmlsdGVyKGNoaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjaGlkICE9PSBlbGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKC4uLnNpYik7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN1bHQocmVzdWx0KTtcbiAgICB9XG4gICAgb24oZXZlbixmbmMpe1xuICAgICAgICB0aGlzLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICBlbGUuYWRkRXZlbnRMaXN0ZW5lcihldmVuLGZuYylcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0b1N0cmluZygpe1xuXG4gICAgfVxufVxuZnVuY3Rpb24gTXlRdWVyeShlbGUpe1xuICAgIHZhciBkb20gO1xuICAgIGlmIChlbGUubm9kZVR5cGUpIHtcbiAgICAgICAgZG9tID0gW2VsZV1cbiAgICB9ZWxzZSBpZih0eXBlb2YgZWxlID09PSAnc3RyaW5nJyl7XG4gICAgICAgIGRvbSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGUpKTtcbiAgICB9ZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmsqHmnInljLnphY3liLBcIik7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE15UXVlcnlEb20oZG9tKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNeVF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvcXVlcnkuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global[\"MyAudio\"] = __webpack_require__(4);\n/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXVkaW8uanM/NmYxZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRyIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxbXCJNeUF1ZGlvXCJdID0gcmVxdWlyZShcIi0hL2hvbWUvendpbmcvZ2l0UHJvamVjdC9tdXNpY1BsYXllci9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2luZGV4LmpzIS9ob21lL3p3aW5nL2dpdFByb2plY3QvbXVzaWNQbGF5ZXIvc3JjL2pzL2F1ZGlvLmpzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V4cG9zZS1sb2FkZXI/TXlBdWRpbyEuL3NyYy9qcy9hdWRpby5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Music = function () {\n    function Music(obj, dom) {\n        _classCallCheck(this, Music);\n\n        // {queryId,sondId,songName,artistId,artistName,albumId,albumName,\n        //     songPicSmall,songPicBig,songPicRadio,lrcLink,time,linkCode,\n        //     songLink,showLink,format,rate,size,relateStatus,resourceType} = obj;\n        this.info = obj;\n        this.dom = dom; // 可放入代表歌曲的dom,\n    }\n\n    _createClass(Music, [{\n        key: \"getInfo\",\n        value: function getInfo() {\n            return this.info;\n        }\n    }]);\n\n    return Music;\n}();\n\nvar MyAudio = function () {\n    function MyAudio(ele) {\n        var musicList = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];\n        var cfg = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];\n\n        _classCallCheck(this, MyAudio);\n\n        this.audio = ele; // 元素dom\n        this.musicList = musicList.map(function (ele) {\n            return new Music(ele);\n        }); // 歌曲列表\n        this.index = 0; // 当前歌曲索引\n        var defaultCfg = {\n            ended: function ended() {}, // 结束回调\n            play: function play() {}, // 播放时候回调\n            playType: \"order\" // 播放类型,\n        };\n        // 配置,播放回调,播放结束回调\n        this.cfg = Object.assign(defaultCfg, cfg);\n        this.audio.addEventListener(\"ended\", this.cfg.ended);\n        this.audio.addEventListener(\"play\", this.cfg.play);\n    }\n    /**\n     * 添加歌曲\n     * @method addMusic\n     * @param  {Music||List} music 歌曲或者歌曲列表\n     */\n\n\n    _createClass(MyAudio, [{\n        key: \"addMusic\",\n        value: function addMusic(music) {\n            if (Array.isArray(music)) {\n                var _musicList;\n\n                (_musicList = this.musicList).push.apply(_musicList, _toConsumableArray(music.map(function (mus) {\n                    return new Music(mus);\n                })));\n            } else {\n                this.musicList.push(new Music(music));\n            }\n            return this;\n        }\n        // 删除歌曲\n\n    }, {\n        key: \"removeMusic\",\n        value: function removeMusic(music) {\n            if (this.musicList.includes(music)) {\n                this.musicList.splice(this.musicList.indexOf(music), 1);\n            }\n            return this;\n        }\n        // 获取当前播放器相关信息\n\n    }, {\n        key: \"getInfo\",\n        value: function getInfo() {\n            return {\n                currentSrc: this.audio.currentSrc,\n                volume: this.audio.volume,\n                currentTime: this.audio.currentTime,\n                paused: this.audio.paused,\n                ended: this.audio.ended,\n                startTime: this.audio.startTime,\n                duration: this.audio.duration\n            };\n        }\n        // 播放\n\n    }, {\n        key: \"play\",\n        value: function play() {\n            this.audio.play();\n            return this;\n        }\n        // 暂停\n\n    }, {\n        key: \"pause\",\n        value: function pause() {\n            this.audio.pause();\n            return this;\n        }\n        // 增音量\n\n    }, {\n        key: \"increaseVolume\",\n        value: function increaseVolume(val) {\n            var volume = this.audio.volume * 100;\n            if (typeof val !== 'undefined') {\n                volume = val;\n            } else {\n                volume = volume + 10;\n            }\n            volume > 100 && (volume = 100);\n            this.audio.volume = volume / 100;\n            return this;\n        }\n        // 减少音量\n\n    }, {\n        key: \"decreaseVolume\",\n        value: function decreaseVolume(val) {\n            var volume = this.audio.volume * 100;\n            if (typeof val !== 'undefined') {\n                volume = val;\n            } else {\n                volume = volume - 10;\n            }\n            volume < 0 && (volume = 0);\n            this.audio.volume = volume / 100;\n            return this;\n        }\n        // 设置当前播放时间\n\n    }, {\n        key: \"setCurrentTime\",\n        value: function setCurrentTime(val) {\n            this.audio.currentTime = val;\n            return this;\n        }\n        // 加载并博凡引用\n\n    }, {\n        key: \"load\",\n        value: function load(music) {\n            var _this = this;\n\n            if (!this.musicList.includes(music)) {\n                this.musicList.push(music);\n            }\n            // 通过后台代理并将二进制转成blob播放\n            fetch(\"http://localhost:4000/proxy?url=\" + music.info.songLink).then(function (res) {\n                return res.blob();\n            }).then(function (data) {\n                _this.audio.src = window.URL.createObjectURL(data);\n                _this.play();\n            });\n            return this;\n        }\n        // 设置单曲循环\n\n    }, {\n        key: \"loop\",\n        value: function loop(isLoop) {\n            this.audio.loop = isLoop;\n            return this;\n        }\n        // 下一手音乐\n\n    }, {\n        key: \"next\",\n        value: function next() {\n            if (this.cfg.playType === \"order\") {\n                this.index++;\n                if (this.index >= this.musicList.length) {\n                    this.index = 0;\n                }\n            } else {\n                this.index = parseInt(Math.random() * this.musicList.length, 10);\n            }\n            var music = this.musicList[this.index];\n            this.load(this.musicList[this.index]);\n            console.log(music.info.albumName);\n            return this;\n        }\n        // 上一手音乐\n\n    }, {\n        key: \"prev\",\n        value: function prev() {\n            if (this.cfg.playType === \"order\") {\n                this.index--;\n                if (this.index < 0) {\n                    this.index = this.musicList.length - 1;\n                }\n            } else {\n                this.index = parseInt(Math.random() * this.musicList.length, 10);\n            }\n            var music = this.musicList[this.index];\n            this.load(this.musicList[this.index]);\n            console.log(music.info.albumName);\n            return this;\n        }\n    }]);\n\n    return MyAudio;\n}();\n\nmodule.exports = MyAudio;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXVkaW8uanM/ZGQwNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQUFNLEs7QUFDRixtQkFBWSxHQUFaLEVBQWdCLEdBQWhCLEVBQW9CO0FBQUE7O0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQUssSUFBTCxHQUFZLEdBQVo7QUFDQSxhQUFLLEdBQUwsR0FBVyxHQUFYLENBTGdCLENBS0E7QUFDbkI7Ozs7a0NBRVE7QUFDTCxtQkFBTyxLQUFLLElBQVo7QUFDSDs7Ozs7O0lBR0MsTztBQUNGLHFCQUFZLEdBQVosRUFBc0M7QUFBQSxZQUF0QixTQUFzQix5REFBWixFQUFZO0FBQUEsWUFBVCxHQUFTLHlEQUFILEVBQUc7O0FBQUE7O0FBQ2xDLGFBQUssS0FBTCxHQUFhLEdBQWIsQ0FEa0MsQ0FDZjtBQUNuQixhQUFLLFNBQUwsR0FBaUIsVUFBVSxHQUFWLENBQWM7QUFBQSxtQkFBSyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQUw7QUFBQSxTQUFkLENBQWpCLENBRmtDLENBRW9CO0FBQ3RELGFBQUssS0FBTCxHQUFhLENBQWIsQ0FIa0MsQ0FHakI7QUFDakIsWUFBTSxhQUFhO0FBQ2YsbUJBQU0saUJBQVUsQ0FBRSxDQURILEVBQ0s7QUFDcEIsa0JBQUssZ0JBQVUsQ0FBRSxDQUZGLEVBRUk7QUFDbkIsc0JBQVUsT0FISyxDQUdJO0FBSEosU0FBbkI7QUFLQTtBQUNBLGFBQUssR0FBTCxHQUFXLE9BQU8sTUFBUCxDQUFjLFVBQWQsRUFBeUIsR0FBekIsQ0FBWDtBQUNBLGFBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVBQW9DLEtBQUssR0FBTCxDQUFTLEtBQTdDO0FBQ0EsYUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsTUFBNUIsRUFBbUMsS0FBSyxHQUFMLENBQVMsSUFBNUM7QUFDSDtBQUNEOzs7Ozs7Ozs7aUNBS1MsSyxFQUFNO0FBQ1gsZ0JBQUksTUFBTSxPQUFOLENBQWMsS0FBZCxDQUFK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TyxJQUFQO0FBQ0g7Ozs7OztBQUtMLE9BQU8sT0FBUCxHQUFpQixPQUFqQiIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTXVzaWN7XG4gICAgY29uc3RydWN0b3Iob2JqLGRvbSl7XG4gICAgICAgIC8vIHtxdWVyeUlkLHNvbmRJZCxzb25nTmFtZSxhcnRpc3RJZCxhcnRpc3ROYW1lLGFsYnVtSWQsYWxidW1OYW1lLFxuICAgICAgICAvLyAgICAgc29uZ1BpY1NtYWxsLHNvbmdQaWNCaWcsc29uZ1BpY1JhZGlvLGxyY0xpbmssdGltZSxsaW5rQ29kZSxcbiAgICAgICAgLy8gICAgIHNvbmdMaW5rLHNob3dMaW5rLGZvcm1hdCxyYXRlLHNpemUscmVsYXRlU3RhdHVzLHJlc291cmNlVHlwZX0gPSBvYmo7XG4gICAgICAgIHRoaXMuaW5mbyA9IG9iajtcbiAgICAgICAgdGhpcy5kb20gPSBkb207IC8vIOWPr+aUvuWFpeS7o+ihqOatjOabsueahGRvbSxcbiAgICB9XG5cbiAgICBnZXRJbmZvKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm87XG4gICAgfVxufVxuXG5jbGFzcyBNeUF1ZGlvIHtcbiAgICBjb25zdHJ1Y3RvcihlbGUsbXVzaWNMaXN0PVtdLGNmZyA9IHt9KXtcbiAgICAgICAgdGhpcy5hdWRpbyA9IGVsZTsgIC8vIOWFg+e0oGRvbVxuICAgICAgICB0aGlzLm11c2ljTGlzdCA9IG11c2ljTGlzdC5tYXAoZWxlPT5uZXcgTXVzaWMoZWxlKSk7ICAvLyDmrYzmm7LliJfooahcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7ICAvLyDlvZPliY3mrYzmm7LntKLlvJVcbiAgICAgICAgY29uc3QgZGVmYXVsdENmZyA9IHtcbiAgICAgICAgICAgIGVuZGVkOmZ1bmN0aW9uKCl7fSwgLy8g57uT5p2f5Zue6LCDXG4gICAgICAgICAgICBwbGF5OmZ1bmN0aW9uKCl7fSwgLy8g5pKt5pS+5pe25YCZ5Zue6LCDXG4gICAgICAgICAgICBwbGF5VHlwZSA6XCJvcmRlclwiICAvLyDmkq3mlL7nsbvlnossXG4gICAgICAgIH07XG4gICAgICAgIC8vIOmFjee9rizmkq3mlL7lm57osIMs5pKt5pS+57uT5p2f5Zue6LCDXG4gICAgICAgIHRoaXMuY2ZnID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0Q2ZnLGNmZyk7XG4gICAgICAgIHRoaXMuYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsdGhpcy5jZmcuZW5kZWQpO1xuICAgICAgICB0aGlzLmF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoXCJwbGF5XCIsdGhpcy5jZmcucGxheSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOa3u+WKoOatjOabslxuICAgICAqIEBtZXRob2QgYWRkTXVzaWNcbiAgICAgKiBAcGFyYW0gIHtNdXNpY3x8TGlzdH0gbXVzaWMg5q2M5puy5oiW6ICF5q2M5puy5YiX6KGoXG4gICAgICovXG4gICAgYWRkTXVzaWMobXVzaWMpe1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtdXNpYykpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNMaXN0LnB1c2goLi4ubXVzaWMubWFwKG11cz0+bmV3IE11c2ljKG11cykpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm11c2ljTGlzdC5wdXNoKG5ldyBNdXNpYyhtdXNpYykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyDliKDpmaTmrYzmm7JcbiAgICByZW1vdmVNdXNpYyhtdXNpYyl7XG4gICAgICAgIGlmICh0aGlzLm11c2ljTGlzdC5pbmNsdWRlcyhtdXNpYykpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNMaXN0LnNwbGljZSh0aGlzLm11c2ljTGlzdC5pbmRleE9mKG11c2ljKSwxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8g6I635Y+W5b2T5YmN5pKt5pS+5Zmo55u45YWz5L+h5oGvXG4gICAgZ2V0SW5mbygpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3VycmVudFNyYzp0aGlzLmF1ZGlvLmN1cnJlbnRTcmMsXG4gICAgICAgICAgICB2b2x1bWU6dGhpcy5hdWRpby52b2x1bWUsXG4gICAgICAgICAgICBjdXJyZW50VGltZTp0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lLFxuICAgICAgICAgICAgcGF1c2VkOnRoaXMuYXVkaW8ucGF1c2VkLFxuICAgICAgICAgICAgZW5kZWQ6dGhpcy5hdWRpby5lbmRlZCxcbiAgICAgICAgICAgIHN0YXJ0VGltZTp0aGlzLmF1ZGlvLnN0YXJ0VGltZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOnRoaXMuYXVkaW8uZHVyYXRpb25cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDmkq3mlL5cbiAgICBwbGF5KCl7XG4gICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8g5pqC5YGcXG4gICAgcGF1c2UoKXtcbiAgICAgICAgdGhpcy5hdWRpby5wYXVzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8g5aKe6Z+z6YePXG4gICAgaW5jcmVhc2VWb2x1bWUodmFsKXtcbiAgICAgICAgdmFyIHZvbHVtZSA9IHRoaXMuYXVkaW8udm9sdW1lKjEwMDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2b2x1bWUgPSB2YWw7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHZvbHVtZSA9IHZvbHVtZSArIDEwO1xuICAgICAgICB9XG4gICAgICAgIHZvbHVtZSA+IDEwMCAmJiAodm9sdW1lID0gMTAwKTtcbiAgICAgICAgdGhpcy5hdWRpby52b2x1bWUgPSB2b2x1bWUvMTAwXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyDlh4/lsJHpn7Pph49cbiAgICBkZWNyZWFzZVZvbHVtZSh2YWwpe1xuICAgICAgICB2YXIgdm9sdW1lID0gdGhpcy5hdWRpby52b2x1bWUqMTAwO1xuICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHZvbHVtZSA9IHZhbDtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdm9sdW1lID0gdm9sdW1lIC0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgdm9sdW1lIDwgMCAmJiAodm9sdW1lID0gMCk7XG4gICAgICAgIHRoaXMuYXVkaW8udm9sdW1lID0gdm9sdW1lLzEwMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8vIOiuvue9ruW9k+WJjeaSreaUvuaXtumXtFxuICAgIHNldEN1cnJlbnRUaW1lKHZhbCl7XG4gICAgICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSB2YWw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyDliqDovb3lubbljZrlh6HlvJXnlKhcbiAgICBsb2FkKG11c2ljKXtcbiAgICAgICAgaWYgKCF0aGlzLm11c2ljTGlzdC5pbmNsdWRlcyhtdXNpYykpIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNMaXN0LnB1c2gobXVzaWMpXG4gICAgICAgIH1cbiAgICAgICAgLy8g6YCa6L+H5ZCO5Y+w5Luj55CG5bm25bCG5LqM6L+b5Yi26L2s5oiQYmxvYuaSreaUvlxuICAgICAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9wcm94eT91cmw9XCIrbXVzaWMuaW5mby5zb25nTGluaylcbiAgICAgICAgLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHJldHVybiByZXMuYmxvYigpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgdGhpcy5hdWRpby5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLy8g6K6+572u5Y2V5puy5b6q546vXG4gICAgbG9vcChpc0xvb3Ape1xuICAgICAgICB0aGlzLmF1ZGlvLmxvb3AgPSBpc0xvb3A7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyDkuIvkuIDmiYvpn7PkuZBcbiAgICBuZXh0KCl7XG4gICAgICAgIGlmICh0aGlzLmNmZy5wbGF5VHlwZSA9PT0gXCJvcmRlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+PSB0aGlzLm11c2ljTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkqdGhpcy5tdXNpY0xpc3QubGVuZ3RoLDEwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbXVzaWMgPSB0aGlzLm11c2ljTGlzdFt0aGlzLmluZGV4XTtcbiAgICAgICAgdGhpcy5sb2FkKHRoaXMubXVzaWNMaXN0W3RoaXMuaW5kZXhdKVxuICAgICAgICBjb25zb2xlLmxvZyhtdXNpYy5pbmZvLmFsYnVtTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvLyDkuIrkuIDmiYvpn7PkuZBcbiAgICBwcmV2KCl7XG4gICAgICAgIGlmICh0aGlzLmNmZy5wbGF5VHlwZSA9PT0gXCJvcmRlclwiKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4LS07XG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5tdXNpY0xpc3QubGVuZ3RoIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSp0aGlzLm11c2ljTGlzdC5sZW5ndGgsMTApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtdXNpYyA9IHRoaXMubXVzaWNMaXN0W3RoaXMuaW5kZXhdO1xuICAgICAgICB0aGlzLmxvYWQodGhpcy5tdXNpY0xpc3RbdGhpcy5pbmRleF0pXG4gICAgICAgIGNvbnNvbGUubG9nKG11c2ljLmluZm8uYWxidW1OYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBNeUF1ZGlvO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvYXVkaW8uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(6);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(8)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(true) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(6, function() {\n\t\t\tvar newContent = __webpack_require__(6);\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9zdHlsZS5zY3NzP2I1YjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBbUY7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc2Fzcy9zdHlsZS5zY3NzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("exports = module.exports = __webpack_require__(7)();\n// imports\n\n\n// module\nexports.push([module.id, \".unstyle {\\n  margin: 0px;\\n  padding: 0px; }\\n  .unstyle p {\\n    font-size: 10px; }\\n\", \"\"]);\n\n// exports\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2Fzcy9zdHlsZS5zY3NzP2ZkOGIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7O0FBR0E7QUFDQSxvQ0FBb0MsZ0JBQWdCLGlCQUFpQixFQUFFLGdCQUFnQixzQkFBc0IsRUFBRTs7QUFFL0ciLCJmaWxlIjoiNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnVuc3R5bGUge1xcbiAgbWFyZ2luOiAwcHg7XFxuICBwYWRkaW5nOiAwcHg7IH1cXG4gIC51bnN0eWxlIHAge1xcbiAgICBmb250LXNpemU6IDEwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vfi9zYXNzLWxvYWRlciEuL3NyYy9zYXNzL3N0eWxlLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push(\"@media \" + item[2] + \"{\" + item[1] + \"}\");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join(\"\");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === \"string\")\r\n\t\t\tmodules = [[null, modules, \"\"]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === \"number\")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0Esd0NBQXdDLGdCQUFnQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName(\"head\")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === \"undefined\") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === \"undefined\") options.insertAt = \"bottom\";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === \"top\") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === \"bottom\") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error(\"Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.\");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement(\"style\");\r\n\tstyleElement.type = \"text/css\";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement(\"link\");\r\n\tlinkElement.rel = \"stylesheet\";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === \"function\" &&\r\n\t\ttypeof URL.createObjectURL === \"function\" &&\r\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\r\n\t\ttypeof Blob === \"function\" &&\r\n\t\ttypeof btoa === \"function\") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join('\\n');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? \"\" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute(\"media\", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: \"text/css\" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNCQUFzQjtBQUN0QztBQUNBO0FBQ0Esa0JBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFFBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxpQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxnQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);