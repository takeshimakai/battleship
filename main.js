/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Gameboard.js":
/*!*************************************!*\
  !*** ./src/components/Gameboard.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/components/helpers.js\");\n\n\nconst Gameboard = () => {\n    const board = Array(10).fill(null).map(() => Array(10).fill(null));\n    const getBoard = () => board;\n\n    const placedShips = [];\n\n    const isValidPlacement = (ship, orientation, y, x) => {\n        if (orientation === 'horizontal') {\n            if (x + ship.length > board.length) {\n                return false;\n            }\n\n            for (let i = x; i < x + ship.length; i++) {\n                if (board[y][i] !== null) {\n                    return false;\n                }\n            }\n        } else if (orientation === 'vertical') {\n            if (y + ship.length > board.length) {\n                return false;\n            }\n\n            for (let i = y; i < y + ship.length; i++) {\n                if (board[i][x] !== null) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    };\n\n    const placeShip = (ship, orientation, y, x) => {\n        if (orientation === 'horizontal') {\n            let index = 0;\n            for (let i = x; i < x + ship.length; i++) {\n                board[y][i] = { ship, index, hit: false };\n                index += 1;\n            }\n        } else if (orientation === 'vertical') {\n            let index = 0;\n            for (let i = y; i < y + ship.length; i++) {\n                board[i][x] = { ship, index, hit: false };\n                index += 1;\n            }\n        }\n        placedShips.push(ship);\n    };\n\n    const autoPlaceShip = (ship) => {\n        const [y, x] = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"randomCoords\"])();\n        const orientation = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"randomOrientation\"])();\n\n        const isValid = isValidPlacement(ship, orientation, y, x);\n\n        if (isValid) {\n            placeShip(ship, orientation, y, x);\n        } else {\n            autoPlaceShip(ship);\n        }\n    };\n\n    const receiveAttack = (y, x) => {\n        if (board[y][x] === null) {\n            board[y][x] = { hit: true };\n        }\n\n        if (board[y][x].ship && board[y][x].hit === false) {\n            board[y][x].ship.hit(board[y][x].index);\n            board[y][x].hit = true;\n        }\n    };\n\n    const allShipsSunk = () => placedShips.every((ship) => ship.isSunk());\n\n    return {\n        getBoard,\n        placeShip,\n        autoPlaceShip,\n        receiveAttack,\n        allShipsSunk,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Gameboard);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9HYW1lYm9hcmQuanM/MTU3NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQTREOztBQUU1RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIscUJBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIscUJBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxQkFBcUI7QUFDaEQsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwyQkFBMkIscUJBQXFCO0FBQ2hELCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLDZEQUFZO0FBQ25DLDRCQUE0QixrRUFBaUI7O0FBRTdDOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHdFQUFTLEVBQUMiLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9HYW1lYm9hcmQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByYW5kb21Db29yZHMsIHJhbmRvbU9yaWVudGF0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gQXJyYXkoMTApLmZpbGwobnVsbCkubWFwKCgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcbiAgICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gICAgY29uc3QgcGxhY2VkU2hpcHMgPSBbXTtcblxuICAgIGNvbnN0IGlzVmFsaWRQbGFjZW1lbnQgPSAoc2hpcCwgb3JpZW50YXRpb24sIHksIHgpID0+IHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGlmICh4ICsgc2hpcC5sZW5ndGggPiBib2FyZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbeV1baV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgaWYgKHkgKyBzaGlwLmxlbmd0aCA+IGJvYXJkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVt4XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgb3JpZW50YXRpb24sIHksIHgpID0+IHtcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYm9hcmRbeV1baV0gPSB7IHNoaXAsIGluZGV4LCBoaXQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBib2FyZFtpXVt4XSA9IHsgc2hpcCwgaW5kZXgsIGhpdDogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBsYWNlZFNoaXBzLnB1c2goc2hpcCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGF1dG9QbGFjZVNoaXAgPSAoc2hpcCkgPT4ge1xuICAgICAgICBjb25zdCBbeSwgeF0gPSByYW5kb21Db29yZHMoKTtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSByYW5kb21PcmllbnRhdGlvbigpO1xuXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBpc1ZhbGlkUGxhY2VtZW50KHNoaXAsIG9yaWVudGF0aW9uLCB5LCB4KTtcblxuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgcGxhY2VTaGlwKHNoaXAsIG9yaWVudGF0aW9uLCB5LCB4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF1dG9QbGFjZVNoaXAoc2hpcCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh5LCB4KSA9PiB7XG4gICAgICAgIGlmIChib2FyZFt5XVt4XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgYm9hcmRbeV1beF0gPSB7IGhpdDogdHJ1ZSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvYXJkW3ldW3hdLnNoaXAgJiYgYm9hcmRbeV1beF0uaGl0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgYm9hcmRbeV1beF0uc2hpcC5oaXQoYm9hcmRbeV1beF0uaW5kZXgpO1xuICAgICAgICAgICAgYm9hcmRbeV1beF0uaGl0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiBwbGFjZWRTaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRCb2FyZCxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICBhdXRvUGxhY2VTaGlwLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBhbGxTaGlwc1N1bmssXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Gameboard.js\n");

/***/ }),

/***/ "./src/components/Player.js":
/*!**********************************!*\
  !*** ./src/components/Player.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/components/helpers.js\");\n\n\nconst Player = (type = 'human') => {\n    const attack = (y, x, board) => board.receiveAttack(y, x);\n\n    const autoAttack = (board) => {\n        const [y, x] = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"randomCoords\"])();\n\n        const cell = board.getBoard()[y][x];\n\n        if (cell === null || cell.hit === false) {\n            board.receiveAttack(y, x);\n        } else {\n            autoAttack(board);\n        }\n    };\n\n    return {\n        type,\n        attack,\n        autoAttack,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9QbGF5ZXIuanM/NDk0MyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQXlDOztBQUV6QztBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLDZEQUFZOztBQUVuQzs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUscUVBQU0sRUFBQyIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL1BsYXllci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJhbmRvbUNvb3JkcyB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IFBsYXllciA9ICh0eXBlID0gJ2h1bWFuJykgPT4ge1xuICAgIGNvbnN0IGF0dGFjayA9ICh5LCB4LCBib2FyZCkgPT4gYm9hcmQucmVjZWl2ZUF0dGFjayh5LCB4KTtcblxuICAgIGNvbnN0IGF1dG9BdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICAgICAgY29uc3QgW3ksIHhdID0gcmFuZG9tQ29vcmRzKCk7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IGJvYXJkLmdldEJvYXJkKClbeV1beF07XG5cbiAgICAgICAgaWYgKGNlbGwgPT09IG51bGwgfHwgY2VsbC5oaXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKHksIHgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXV0b0F0dGFjayhib2FyZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgYXR0YWNrLFxuICAgICAgICBhdXRvQXR0YWNrLFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/Player.js\n");

/***/ }),

/***/ "./src/components/Ship.js":
/*!********************************!*\
  !*** ./src/components/Ship.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Ship = (name, length) => {\n    const health = [];\n    const getHealth = () => health;\n\n    for (let i = 0; i < length; i++) {\n        health.push('o');\n    }\n\n    const hit = (index) => {\n        health.splice(index, 1, 'x');\n        return health;\n    };\n\n    const isSunk = () => health.every((item) => item === 'x');\n\n    return {\n        name,\n        length,\n        getHealth,\n        hit,\n        isSunk,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TaGlwLmpzPzllZjciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG1FQUFJLEVBQUMiLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9TaGlwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU2hpcCA9IChuYW1lLCBsZW5ndGgpID0+IHtcbiAgICBjb25zdCBoZWFsdGggPSBbXTtcbiAgICBjb25zdCBnZXRIZWFsdGggPSAoKSA9PiBoZWFsdGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhlYWx0aC5wdXNoKCdvJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaGl0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGhlYWx0aC5zcGxpY2UoaW5kZXgsIDEsICd4Jyk7XG4gICAgICAgIHJldHVybiBoZWFsdGg7XG4gICAgfTtcblxuICAgIGNvbnN0IGlzU3VuayA9ICgpID0+IGhlYWx0aC5ldmVyeSgoaXRlbSkgPT4gaXRlbSA9PT0gJ3gnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgZ2V0SGVhbHRoLFxuICAgICAgICBoaXQsXG4gICAgICAgIGlzU3VuayxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/Ship.js\n");

/***/ }),

/***/ "./src/components/dom.js":
/*!*******************************!*\
  !*** ./src/components/dom.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLogic */ \"./src/components/gameLogic.js\");\n\n\nconst dom = () => {\n    const game = Object(_gameLogic__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n    const createElement = (type, className) => {\n        const element = document.createElement(type);\n        element.setAttribute('class', className);\n        return element;\n    };\n\n    const renderGrid = (board) => {\n        const gridContainer = createElement('div', 'grid-container');\n\n        for (let i = 0; i < board.length; i++) {\n            const gridRow = createElement('div', 'grid-row');\n            for (let j = 0; j < board[i].length; j++) {\n                const square = createElement('div', 'square');\n                gridRow.appendChild(square);\n            }\n            gridContainer.appendChild(gridRow);\n        }\n\n        document.body.appendChild(gridContainer);\n    };\n\n    return {\n        renderGrid,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (dom);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9kb20uanM/ODUxZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQW9DOztBQUVwQztBQUNBLGlCQUFpQiwwREFBUzs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQSwyQkFBMkIscUJBQXFCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxrRUFBRyxFQUFDIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvZG9tLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdhbWVMb2dpYyBmcm9tICcuL2dhbWVMb2dpYyc7XG5cbmNvbnN0IGRvbSA9ICgpID0+IHtcbiAgICBjb25zdCBnYW1lID0gZ2FtZUxvZ2ljKCk7XG5cbiAgICBjb25zdCBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlckdyaWQgPSAoYm9hcmQpID0+IHtcbiAgICAgICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsICdncmlkLWNvbnRhaW5lcicpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyaWRSb3cgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnZ3JpZC1yb3cnKTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCAnc3F1YXJlJyk7XG4gICAgICAgICAgICAgICAgZ3JpZFJvdy5hcHBlbmRDaGlsZChzcXVhcmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkUm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZ3JpZENvbnRhaW5lcik7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlckdyaWQsXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/dom.js\n");

/***/ }),

/***/ "./src/components/gameLogic.js":
/*!*************************************!*\
  !*** ./src/components/gameLogic.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/components/Gameboard.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/components/Player.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ \"./src/components/helpers.js\");\n\n\n\n\nconst gameLogic = () => {\n    const player = Object(_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    const computer = Object(_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])('computer');\n\n    const playerBoard = Object(_Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    const computerBoard = Object(_Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n    const playerShips = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"createShips\"])();\n    const computerShips = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__[\"createShips\"])();\n\n    const whoseTurn = 'player';\n\n    const startGame = () => {\n        playerShips.forEach((ship) => playerBoard.autoPlaceShip(ship));\n        computerShips.forEach((ship) => computerBoard.autoPlaceShip(ship));\n    };\n\n    const changeTurns = () => (whoseTurn === 'player' ? 'computer' : 'player');\n\n    const checkGameOver = () => {\n        let winner;\n        if (playerBoard.allShipsSunk()) {\n            winner = 'computer';\n        } else if (computerBoard.allShipsSunk()) {\n            winner = 'player';\n        }\n        return winner;\n    };\n\n    return {\n        player,\n        computer,\n        playerBoard,\n        computerBoard,\n        startGame,\n        changeTurns,\n        checkGameOver,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (gameLogic);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9nYW1lTG9naWMuanM/YTc3ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUNOO0FBQ1U7O0FBRXhDO0FBQ0EsbUJBQW1CLHVEQUFNO0FBQ3pCLHFCQUFxQix1REFBTTs7QUFFM0Isd0JBQXdCLDBEQUFTO0FBQ2pDLDBCQUEwQiwwREFBUzs7QUFFbkMsd0JBQXdCLDREQUFXO0FBQ25DLDBCQUEwQiw0REFBVzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsd0VBQVMsRUFBQyIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL2dhbWVMb2dpYy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XG5pbXBvcnQgeyBjcmVhdGVTaGlwcyB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IGdhbWVMb2dpYyA9ICgpID0+IHtcbiAgICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgICBjb25zdCBjb21wdXRlciA9IFBsYXllcignY29tcHV0ZXInKTtcblxuICAgIGNvbnN0IHBsYXllckJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgcGxheWVyU2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuICAgIGNvbnN0IGNvbXB1dGVyU2hpcHMgPSBjcmVhdGVTaGlwcygpO1xuXG4gICAgY29uc3Qgd2hvc2VUdXJuID0gJ3BsYXllcic7XG5cbiAgICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgICAgIHBsYXllclNoaXBzLmZvckVhY2goKHNoaXApID0+IHBsYXllckJvYXJkLmF1dG9QbGFjZVNoaXAoc2hpcCkpO1xuICAgICAgICBjb21wdXRlclNoaXBzLmZvckVhY2goKHNoaXApID0+IGNvbXB1dGVyQm9hcmQuYXV0b1BsYWNlU2hpcChzaGlwKSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNoYW5nZVR1cm5zID0gKCkgPT4gKHdob3NlVHVybiA9PT0gJ3BsYXllcicgPyAnY29tcHV0ZXInIDogJ3BsYXllcicpO1xuXG4gICAgY29uc3QgY2hlY2tHYW1lT3ZlciA9ICgpID0+IHtcbiAgICAgICAgbGV0IHdpbm5lcjtcbiAgICAgICAgaWYgKHBsYXllckJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICB3aW5uZXIgPSAnY29tcHV0ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbXB1dGVyQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICAgIHdpbm5lciA9ICdwbGF5ZXInO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3aW5uZXI7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYXllcixcbiAgICAgICAgY29tcHV0ZXIsXG4gICAgICAgIHBsYXllckJvYXJkLFxuICAgICAgICBjb21wdXRlckJvYXJkLFxuICAgICAgICBzdGFydEdhbWUsXG4gICAgICAgIGNoYW5nZVR1cm5zLFxuICAgICAgICBjaGVja0dhbWVPdmVyLFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lTG9naWM7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/gameLogic.js\n");

/***/ }),

/***/ "./src/components/helpers.js":
/*!***********************************!*\
  !*** ./src/components/helpers.js ***!
  \***********************************/
/*! exports provided: randomCoords, randomOrientation, createShips */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomCoords\", function() { return randomCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomOrientation\", function() { return randomOrientation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createShips\", function() { return createShips; });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/components/Ship.js\");\n\n\nconst randomCoords = () => {\n    const y = Math.floor(Math.random() * Math.floor(10));\n    const x = Math.floor(Math.random() * Math.floor(10));\n\n    return [y, x];\n};\n\nconst randomOrientation = () => {\n    const randomNum = Math.floor(Math.random() * Math.floor(2));\n\n    return randomNum === 0 ? 'horizontal' : 'vertical';\n};\n\nconst createShips = () => {\n    const carrier = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('carrier', 5);\n    const battleship = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('battleship', 4);\n    const cruiser = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('cruiser', 3);\n    const destroyer = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('destroyer', 2);\n    const boat = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('boat', 1);\n\n    return [carrier, battleship, cruiser, destroyer, boat];\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJzLmpzP2VhNGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQjs7QUFFMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLHFEQUFJO0FBQ3hCLHVCQUF1QixxREFBSTtBQUMzQixvQkFBb0IscURBQUk7QUFDeEIsc0JBQXNCLHFEQUFJO0FBQzFCLGlCQUFpQixxREFBSTs7QUFFckI7QUFDQTs7QUFNRSIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL2hlbHBlcnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xuXG5jb25zdCByYW5kb21Db29yZHMgPSAoKSA9PiB7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMTApKTtcbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigxMCkpO1xuXG4gICAgcmV0dXJuIFt5LCB4XTtcbn07XG5cbmNvbnN0IHJhbmRvbU9yaWVudGF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1hdGguZmxvb3IoMikpO1xuXG4gICAgcmV0dXJuIHJhbmRvbU51bSA9PT0gMCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG59O1xuXG5jb25zdCBjcmVhdGVTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBjYXJyaWVyID0gU2hpcCgnY2FycmllcicsIDUpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCdiYXR0bGVzaGlwJywgNCk7XG4gICAgY29uc3QgY3J1aXNlciA9IFNoaXAoJ2NydWlzZXInLCAzKTtcbiAgICBjb25zdCBkZXN0cm95ZXIgPSBTaGlwKCdkZXN0cm95ZXInLCAyKTtcbiAgICBjb25zdCBib2F0ID0gU2hpcCgnYm9hdCcsIDEpO1xuXG4gICAgcmV0dXJuIFtjYXJyaWVyLCBiYXR0bGVzaGlwLCBjcnVpc2VyLCBkZXN0cm95ZXIsIGJvYXRdO1xufTtcblxuZXhwb3J0IHtcbiAgICByYW5kb21Db29yZHMsXG4gICAgcmFuZG9tT3JpZW50YXRpb24sXG4gICAgY3JlYXRlU2hpcHMsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/helpers.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/dom */ \"./src/components/dom.js\");\n\n\n_components_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"].renderGrid();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQW1DOztBQUVuQyx1REFBRyIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb20gZnJvbSAnLi9jb21wb25lbnRzL2RvbSc7XG5cbmRvbS5yZW5kZXJHcmlkKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });