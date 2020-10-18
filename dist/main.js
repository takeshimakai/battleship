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
eval("__webpack_require__.r(__webpack_exports__);\nconst Gameboard = () => {\n    const board = Array(10).fill(null).map(() => Array(10).fill(null));\n    const getBoard = () => board;\n\n    const placedShips = [];\n\n    const isValidPlacement = (ship, orientation, y, x) => {\n        if (orientation === 'horizontal') {\n            if (x + ship.length > board.length) {\n                return false;\n            }\n\n            for (let i = x; i < x + ship.length; i++) {\n                if (board[y][i] !== null) {\n                    return false;\n                }\n            }\n        } else if (orientation === 'vertical') {\n            if (y + ship.length > board.length) {\n                return false;\n            }\n\n            for (let i = y; i < y + ship.length; i++) {\n                if (board[i][x] !== null) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    };\n\n    const placeShip = (ship, orientation, y, x) => {\n        const cellsAreEmpty = isValidPlacement(ship, orientation, y, x);\n\n        if (cellsAreEmpty) {\n            if (orientation === 'horizontal') {\n                let index = 0;\n                for (let i = x; i < x + ship.length; i++) {\n                    board[y][i] = { ship, index, hit: false };\n                    index += 1;\n                }\n            } else if (orientation === 'vertical') {\n                let index = 0;\n                for (let i = y; i < y + ship.length; i++) {\n                    board[i][x] = { ship, index, hit: false };\n                    index += 1;\n                }\n            }\n            placedShips.push(ship);\n        }\n    };\n\n    const receiveAttack = (y, x) => {\n        if (board[y][x] === null) {\n            board[y][x] = { hit: true };\n        }\n\n        if (board[y][x].ship && board[y][x].hit === false) {\n            board[y][x].ship.hit(board[y][x].index);\n            board[y][x].hit = true;\n        }\n    };\n\n    const allShipsSunk = () => placedShips.every((ship) => ship.isSunk());\n\n    return {\n        getBoard,\n        isValidPlacement,\n        placeShip,\n        receiveAttack,\n        allShipsSunk,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Gameboard);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9HYW1lYm9hcmQuanM/MTU3NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IscUJBQXFCO0FBQ3BELG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsK0JBQStCLHFCQUFxQjtBQUNwRCxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLHdFQUFTLEVBQUMiLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9HYW1lYm9hcmQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBBcnJheSgxMCkuZmlsbChudWxsKS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICAgIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgICBjb25zdCBwbGFjZWRTaGlwcyA9IFtdO1xuXG4gICAgY29uc3QgaXNWYWxpZFBsYWNlbWVudCA9IChzaGlwLCBvcmllbnRhdGlvbiwgeSwgeCkgPT4ge1xuICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgaWYgKHggKyBzaGlwLmxlbmd0aCA+IGJvYXJkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChib2FyZFt5XVtpXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICBpZiAoeSArIHNoaXAubGVuZ3RoID4gYm9hcmQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW3hdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwLCBvcmllbnRhdGlvbiwgeSwgeCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsc0FyZUVtcHR5ID0gaXNWYWxpZFBsYWNlbWVudChzaGlwLCBvcmllbnRhdGlvbiwgeSwgeCk7XG5cbiAgICAgICAgaWYgKGNlbGxzQXJlRW1wdHkpIHtcbiAgICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3ldW2ldID0geyBzaGlwLCBpbmRleCwgaGl0OiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRbaV1beF0gPSB7IHNoaXAsIGluZGV4LCBoaXQ6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2VkU2hpcHMucHVzaChzaGlwKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHksIHgpID0+IHtcbiAgICAgICAgaWYgKGJvYXJkW3ldW3hdID09PSBudWxsKSB7XG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9IHsgaGl0OiB0cnVlIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9hcmRbeV1beF0uc2hpcCAmJiBib2FyZFt5XVt4XS5oaXQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBib2FyZFt5XVt4XS5zaGlwLmhpdChib2FyZFt5XVt4XS5pbmRleCk7XG4gICAgICAgICAgICBib2FyZFt5XVt4XS5oaXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHBsYWNlZFNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEJvYXJkLFxuICAgICAgICBpc1ZhbGlkUGxhY2VtZW50LFxuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGFsbFNoaXBzU3VuayxcbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Gameboard.js\n");

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

/***/ "./src/components/gameLogic.js":
/*!*************************************!*\
  !*** ./src/components/gameLogic.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/components/Ship.js\");\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ \"./src/components/Gameboard.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./src/components/Player.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ \"./src/components/helpers.js\");\n\n\n\n\n\nconst gameLogic = () => {\n    const player = Object(_Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const computer = Object(_Player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])('computer');\n\n    const playerBoard = Object(_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    const computerBoard = Object(_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n    const playerShips = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"createShips\"])();\n    const computerShips = Object(_helpers__WEBPACK_IMPORTED_MODULE_3__[\"createShips\"])();\n\n    const startGame = () => {\n        console.log('cheees');\n    };\n\n    return {\n        startGame,\n    };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (gameLogic);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9nYW1lTG9naWMuanM/YTc3ZCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBCO0FBQ1U7QUFDTjtBQUM2Qjs7QUFFM0Q7QUFDQSxtQkFBbUIsdURBQU07QUFDekIscUJBQXFCLHVEQUFNOztBQUUzQix3QkFBd0IsMERBQVM7QUFDakMsMEJBQTBCLDBEQUFTOztBQUVuQyx3QkFBd0IsNERBQVc7QUFDbkMsMEJBQTBCLDREQUFXOztBQUVyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsd0VBQVMsRUFBQyIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL2dhbWVMb2dpYy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xuaW1wb3J0IHsgY3JlYXRlU2hpcHMsIHBsYWNlU2hpcFJhbmRvbWx5IH0gZnJvbSAnLi9oZWxwZXJzJztcblxuY29uc3QgZ2FtZUxvZ2ljID0gKCkgPT4ge1xuICAgIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKCdjb21wdXRlcicpO1xuXG4gICAgY29uc3QgcGxheWVyQm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBwbGF5ZXJTaGlwcyA9IGNyZWF0ZVNoaXBzKCk7XG4gICAgY29uc3QgY29tcHV0ZXJTaGlwcyA9IGNyZWF0ZVNoaXBzKCk7XG5cbiAgICBjb25zdCBzdGFydEdhbWUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVlZXMnKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnRHYW1lLFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lTG9naWM7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/gameLogic.js\n");

/***/ }),

/***/ "./src/components/helpers.js":
/*!***********************************!*\
  !*** ./src/components/helpers.js ***!
  \***********************************/
/*! exports provided: randomCoords, randomOrientation, createShips, placeShipRandomly */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomCoords\", function() { return randomCoords; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomOrientation\", function() { return randomOrientation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createShips\", function() { return createShips; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"placeShipRandomly\", function() { return placeShipRandomly; });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/components/Ship.js\");\n\n\nconst randomCoords = () => {\n    const y = Math.floor(Math.random() * Math.floor(10));\n    const x = Math.floor(Math.random() * Math.floor(10));\n\n    return [y, x];\n};\n\nconst randomOrientation = () => {\n    const randomNum = Math.floor(Math.random() * Math.floor(2));\n\n    return randomNum === 0 ? 'horizontal' : 'vertical';\n};\n\nconst createShips = () => {\n    const carrier = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('carrier', 5);\n    const battleship = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('battleship', 4);\n    const cruiser = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('cruiser', 3);\n    const destroyer = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('destroyer', 2);\n    const boat = Object(_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('boat', 1);\n\n    return [carrier, battleship, cruiser, destroyer, boat];\n};\n\nconst placeShipRandomly = (gameboard, ships) => {\n    ships.forEach((ship) => {\n        const [y, x] = randomCoords();\n        const orientation = randomOrientation();\n\n        gameboard.placeShip(ship, orientation, y, x);\n    });\n\n    return gameboard;\n};\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9oZWxwZXJzLmpzP2VhNGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTBCOztBQUUxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IscURBQUk7QUFDeEIsdUJBQXVCLHFEQUFJO0FBQzNCLG9CQUFvQixxREFBSTtBQUN4QixzQkFBc0IscURBQUk7QUFDMUIsaUJBQWlCLHFEQUFJOztBQUVyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQU9FIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvaGVscGVycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XG5cbmNvbnN0IHJhbmRvbUNvb3JkcyA9ICgpID0+IHtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigxMCkpO1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBNYXRoLmZsb29yKDEwKSk7XG5cbiAgICByZXR1cm4gW3ksIHhdO1xufTtcblxuY29uc3QgcmFuZG9tT3JpZW50YXRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogTWF0aC5mbG9vcigyKSk7XG5cbiAgICByZXR1cm4gcmFuZG9tTnVtID09PSAwID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJztcbn07XG5cbmNvbnN0IGNyZWF0ZVNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhcnJpZXIgPSBTaGlwKCdjYXJyaWVyJywgNSk7XG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoJ2JhdHRsZXNoaXAnLCA0KTtcbiAgICBjb25zdCBjcnVpc2VyID0gU2hpcCgnY3J1aXNlcicsIDMpO1xuICAgIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoJ2Rlc3Ryb3llcicsIDIpO1xuICAgIGNvbnN0IGJvYXQgPSBTaGlwKCdib2F0JywgMSk7XG5cbiAgICByZXR1cm4gW2NhcnJpZXIsIGJhdHRsZXNoaXAsIGNydWlzZXIsIGRlc3Ryb3llciwgYm9hdF07XG59O1xuXG5jb25zdCBwbGFjZVNoaXBSYW5kb21seSA9IChnYW1lYm9hcmQsIHNoaXBzKSA9PiB7XG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBjb25zdCBbeSwgeF0gPSByYW5kb21Db29yZHMoKTtcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSByYW5kb21PcmllbnRhdGlvbigpO1xuXG4gICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgb3JpZW50YXRpb24sIHksIHgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGdhbWVib2FyZDtcbn07XG5cbmV4cG9ydCB7XG4gICAgcmFuZG9tQ29vcmRzLFxuICAgIHJhbmRvbU9yaWVudGF0aW9uLFxuICAgIGNyZWF0ZVNoaXBzLFxuICAgIHBsYWNlU2hpcFJhbmRvbWx5LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/helpers.js\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_gameLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameLogic */ \"./src/components/gameLogic.js\");\n\n\nconst game = Object(_components_gameLogic__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\ngame.startGame();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQStDOztBQUUvQyxhQUFhLHFFQUFTOztBQUV0QiIsImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lTG9naWMgZnJvbSAnLi9jb21wb25lbnRzL2dhbWVMb2dpYyc7XG5cbmNvbnN0IGdhbWUgPSBnYW1lTG9naWMoKTtcblxuZ2FtZS5zdGFydEdhbWUoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ })

/******/ });