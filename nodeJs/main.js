/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nconst { emit, disconnect } = __webpack_require__(/*! process */ \"process\");\r\nconst fetch = (...args) => Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node-fetch */ \"node-fetch\", 23)).then(({default: fetch}) => fetch(...args));\r\nconst { stringify } = __webpack_require__(/*! querystring */ \"querystring\");\r\nvar app = express();\r\napp.use(express.static(__dirname + '/public'));\r\n\r\nvar http = (__webpack_require__(/*! http */ \"http\").createServer)(app);\r\n// var io = require('socket.io')(http, {allowEIO3: true, allowEIO4: true, serveClient: true});\r\n\r\nvar io = __webpack_require__(/*! socket.io */ \"socket.io\")(http, {\r\n  allowEIO3: true,\r\n  allowEIO4: true,\r\n  serveClient: true,\r\n  cors: { origin: '*'},\r\n  path: \"/socket.io\",\r\n});\r\n\r\nconst meetingRooms = \"meetingRooms\"\r\nio.on(\"connection\", (socket) => {\r\n    socket.on(\"join\", ({room, seat, nickname}) => {\r\n        if(!room) return;\r\n        if(!Object.keys(socket).includes(meetingRooms)) socket[meetingRooms] = new Object();\r\n        socket.meetingRooms[room] = socket.meetingRooms[room] ? ++socket.meetingRooms[room]: 1;\r\n        socket.join(room); \r\n        if(seat) socket.to(room).emit(\"join\", {room, seat, nickname});\r\n        // console.log(\"입장 \", nickname, \" \", room, \" \", seat);\r\n    });\r\n    socket.on(\"exist\", ({room, seat, nickname}) => { socket.to(room).emit(\"exist\", {room, seat, nickname}); }); // nickname은 new joiner꺼\r\n    socket.on(\"leave\", ({room, nickname, seat}) => {\r\n        if(!room) return;\r\n        if(seat) socket.to(room).emit(\"leave\", {seat});\r\n        if(socket.meetingRooms[room] && --socket.meetingRooms[room] <= 0)\r\n        {\r\n            delete socket.meetingRooms.room;\r\n            socket.leave(room);\r\n        }\r\n        // console.log(\"퇴장 \", nickname, \" \", room, \" \", seat);\r\n    });\r\n    socket.on(\"stream\", ({room, byteData}) => { socket.to(room).emit(\"stream\", {room, byteData}); });\r\n    socket.on(\"finishStream\", ({room, state}) => { socket.to(room).emit(\"finishStream\", {room, state}); });\r\n    socket.on(\"cam\", ({room, seat, byteData}) => { socket.to(room).emit(\"cam\", {seat, byteData}); });\r\n    socket.on(\"finishCam\", ({room, seat}) => { socket.to(room).emit(\"finishCam\", {room, seat}); });\r\n    socket.on(\"mic\", ({room, seat, byteData}) => { socket.to(room).emit(\"mic\", {seat, byteData}); });\r\n    socket.on(\"msg\", ({msg, room, nickname}) => { socket.to(room).emit(\"msg\", {msg, nickname}); });\r\n\r\n    socket.on(\"quit\", ({stringData, nickname}) => { // stringData = {url, token, vector}\r\n        socket.broadcast.emit(\"quit\", {nickname});\r\n        fetch(stringData[0], {\r\n            method: \"PUT\",\r\n            headers: {\r\n                \"Content-Type\": \"application/json\",\r\n                \"Access-Control-Allow-Origin\": \"*\",\r\n                \"Authorization\": \"Bearer \"+ stringData[1],\r\n            },\r\n            body: JSON.stringify({ location : stringData[2] }),\r\n        });//.then((res) =>console.log(res));\r\n    });\r\n});\r\n\r\nhttp.listen(8000, function(){ console.log('listening on *:8000');});\n\n//# sourceURL=webpack://nodeJs/./src/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node-fetch");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.js");
/******/ 	
/******/ })()
;