/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/style.css?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createGame: () => (/* binding */ createGame)\n/* harmony export */ });\nfunction createGame(player, computer) {\n    addMsg(\"Welcome to Battleship. Please initate attack on your opponent's waters.\");\n    return {\n        player: player,\n        computer: computer,\n        gameDone: true,\n        initAttackInt: function () {\n            var _this = this;\n            var cgb = computer.gameboard;\n            var cBoard = document.getElementById(\"\".concat(cgb.id));\n            var cBodySq = cBoard.getElementsByClassName('bodySq');\n            var _loop_1 = function (i) {\n                var row = Number(cBodySq[i].getAttribute('row'));\n                var col = Number(cBodySq[i].getAttribute('col'));\n                var coords = [row, col];\n                cBodySq[i].addEventListener('click', function () {\n                    if (!player.moves.includes(coords) && _this.gameDone === false) {\n                        player.moves.push(coords);\n                        if (cgb.receiveAttack(coords)) {\n                            hit(cBodySq[i], coords, 'Player');\n                            _this.checkStatus(computer, coords);\n                        }\n                        else {\n                            miss(cBodySq[i], coords, 'Player');\n                        }\n                        if (_this.gameDone === false)\n                            _this.compPlay();\n                        updateScroll();\n                    }\n                });\n            };\n            //Init computer board to receive attacks\n            for (var i = 0; i < cBodySq.length; i++) {\n                _loop_1(i);\n            }\n        },\n        compPlay: function () {\n            var _this = this;\n            setTimeout(function () {\n                var coords = _this.player.genAttack();\n                var row = coords[0];\n                var col = coords[1];\n                var pgb = _this.player.gameboard;\n                var pBoard = document.getElementById(\"\".concat(pgb.id));\n                var sq = Array.from(pBoard.getElementsByClassName('bodySq')).filter(function (el) {\n                    return Number(el.getAttribute('row')) === row && Number(el.getAttribute('col')) === col;\n                })[0];\n                if (_this.player.gameboard.receiveAttack(coords)) {\n                    hit(sq, coords, 'Computer');\n                    _this.checkStatus(_this.player, coords);\n                }\n                else {\n                    miss(sq, coords, 'Computer');\n                }\n                updateScroll();\n            }, 500);\n        },\n        checkStatus: function (player, coords) {\n            var ships = player.gameboard.ships;\n            var pid, id;\n            for (var i = 0; i < 5; i++) {\n                var allC = ships[i].allCoords();\n                if (player.gameboard.id === 'pBoard')\n                    pid = 'Player';\n                else if (player.gameboard.id === 'cBoard')\n                    pid = 'Computer';\n                for (var j = 0; j < allC.length; j++) {\n                    if (allC[j][0] === coords[0] && allC[j][1] === coords[1]) {\n                        id = ships[i].id;\n                        if (ships[i].isSunk())\n                            addMsg(\"\".concat(pid, \"'s \").concat(id, \" sunk\"));\n                        break;\n                    }\n                }\n                if (id !== undefined)\n                    break;\n            }\n            if (pid === 'Player')\n                renderHit(id);\n            if (player.gameboard.shipStatus()) {\n                this.gameDone = true;\n                var winner = void 0;\n                if (player.gameboard.id === 'pBoard')\n                    winner = 'Computer';\n                else if (player.gameboard.id === 'cBoard')\n                    winner = 'Player';\n                renderResults(winner);\n            }\n        },\n    };\n}\nfunction hit(sq, coord, player) {\n    sq.classList.add('hit');\n    addMsg(\"Hit! \".concat(player, \" attacked [\").concat(coord, \"]\"));\n}\nfunction miss(sq, coord, player) {\n    sq.classList.add('miss');\n    addMsg(\"Miss, \".concat(player, \" attacked [\").concat(coord, \"]\"));\n}\nfunction updateScroll() {\n    var log = document.getElementById(\"battleLog\");\n    log.scrollTop = log.scrollHeight;\n}\nfunction addMsg(message) {\n    var log = document.getElementById('battleLog');\n    var msg = document.createElement('div');\n    msg.classList.add('logMsg');\n    msg.innerHTML = \"\".concat(message);\n    log.appendChild(msg);\n    updateScroll();\n}\nfunction renderHit(id) {\n    var fleet = document.getElementById('pfleet');\n    var hitShip = fleet.querySelector(\"span.\".concat(id));\n    var shipStatSq = hitShip.querySelectorAll('div');\n    for (var i = 0; i < shipStatSq.length; i++) {\n        if (!shipStatSq[i].classList.contains('hit')) {\n            shipStatSq[i].classList.add('hit');\n            break;\n        }\n    }\n}\nfunction renderResults(winner) {\n    var results = document.getElementById('results');\n    results.classList.remove('hidden');\n    results.setAttribute(\"style\", \"display:flex; flex-direction:column\");\n    var resultW = document.getElementById('resultW');\n    resultW.setAttribute(\"style\", \"display:flex; flex-direction:column; align-items:center; padding: 5em\");\n    var msg = document.getElementById('resultMsg');\n    msg.innerHTML = \"All ships sunk. \".concat(winner, \" wins!\");\n    var restart = document.getElementById('restart');\n    restart.addEventListener('click', function (e) {\n        e.preventDefault();\n        window.location.reload();\n    });\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/game.ts?");

/***/ }),

/***/ "./src/gameboard.ts":
/*!**************************!*\
  !*** ./src/gameboard.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.ts\");\n\nfunction GameBoard(size, id) {\n    return {\n        id: id,\n        size: size,\n        board: generateBoard(size, 0),\n        ships: [],\n        placeShip: function (id, shipLength, coords, orientation) {\n            var r = coords[0];\n            var c = coords[1];\n            if (checkPlacement(this.board, coords, shipLength, orientation, this.size)) {\n                //ship placement is valid!\n                if (orientation === 'h') {\n                    if ((c + shipLength) <= this.size) {\n                        var newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.CreateShip)(id, coords, orientation, shipLength);\n                        this.ships.push(newShip);\n                        for (var i = 0; i < shipLength; i++) {\n                            this.board[r][c + i] = 1;\n                        }\n                    }\n                    else\n                        return false;\n                }\n                else if (orientation === 'v') {\n                    if ((r + shipLength) <= this.size) {\n                        var newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.CreateShip)(id, coords, orientation, shipLength);\n                        this.ships.push(newShip);\n                        for (var i = 0; i < shipLength; i++) {\n                            this.board[r + i][c] = 1;\n                        }\n                    }\n                    else\n                        return false;\n                }\n                return true;\n            }\n            return false;\n        },\n        receiveAttack: function (coords) {\n            var r = coords[0];\n            var c = coords[1];\n            if (this.board[r][c] === 1) {\n                this.ships.forEach(function (ship) {\n                    var allCoords = ship.allCoords();\n                    allCoords.forEach(function (coord) {\n                        if (coord[0] === r && coord[1] === c)\n                            ship.hit();\n                    });\n                });\n                this.board[r][c] = 2; //To indicate successful hit\n                return true;\n            }\n            this.board[r][c] = -1; //To indicate missed hit\n            return false;\n        },\n        shipStatus: function () {\n            var allSunk = true;\n            this.ships.forEach(function (item) {\n                if (!item.isSunk())\n                    allSunk = false;\n            });\n            return allSunk;\n        }\n    };\n}\nfunction generateBoard(size, val) {\n    var arr = Array.from({ length: size }).map(function () {\n        return Array.from({ length: size }).fill(val);\n    });\n    return arr;\n}\nfunction checkPlacement(board, coord, length, orient, size) {\n    var r = coord[0];\n    var c = coord[1];\n    var valid = true;\n    if (orient === 'h' && (c + length) <= size) {\n        for (var i = 0; i < length; i++) {\n            if (board[r][c + i] === 1)\n                valid = false;\n        }\n    }\n    else if (orient === 'v' && (r + length) <= size) {\n        for (var i = 0; i < length; i++) {\n            if (board[r + i][c] === 1)\n                valid = false;\n        }\n    }\n    return valid;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/gameboard.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interface */ \"./src/interface.ts\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.ts\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ \"./src/player.ts\");\n\n\n\n\nvar size = 10;\nvar computer = (0,_player__WEBPACK_IMPORTED_MODULE_3__.createPlayer)(size, (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.GameBoard)(size, 'cBoard'));\nvar player = (0,_player__WEBPACK_IMPORTED_MODULE_3__.createPlayer)(size, (0,_gameboard__WEBPACK_IMPORTED_MODULE_2__.GameBoard)(size, 'pBoard'));\ncomputer.populateBoard();\n(0,_interface__WEBPACK_IMPORTED_MODULE_1__.init)(size, player, computer);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/interface.ts":
/*!**************************!*\
  !*** ./src/interface.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawBoard: () => (/* binding */ drawBoard),\n/* harmony export */   init: () => (/* binding */ init),\n/* harmony export */   renderShips: () => (/* binding */ renderShips)\n/* harmony export */ });\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.ts\");\n/* harmony import */ var _playerInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerInput */ \"./src/playerInput.ts\");\n\n\nfunction init(size, player, computer) {\n    initBoard(size);\n    var game = (0,_game__WEBPACK_IMPORTED_MODULE_0__.createGame)(player, computer);\n    game.initAttackInt();\n    var overlay = (0,_playerInput__WEBPACK_IMPORTED_MODULE_1__.createOverlay)(game);\n    overlay.positionShip();\n    overlayInit(overlay, game);\n    renderFleet('fleetSection');\n    styleLog();\n    window.addEventListener('resize', function () {\n        styleFleet();\n        styleLog();\n    });\n}\nfunction renderShips(player, id) {\n    var gameboard = player.gameboard;\n    var ships = gameboard.ships;\n    ships.forEach(function (ship) {\n        var coords = ship.allCoords();\n        coords.forEach(function (coord) { rShipPresent(coord, id); });\n    });\n}\nfunction drawBoard(size, id) {\n    var board = document.createElement('div');\n    board.classList.add('gameboard');\n    var letterSq = document.createElement('div');\n    letterSq.classList.add('letterSq');\n    board.appendChild(letterSq);\n    var code = 65;\n    for (var i = 0; i < size; i++) {\n        var letterSq_1 = document.createElement('div');\n        letterSq_1.classList.add('letterSq');\n        letterSq_1.textContent = String.fromCharCode(code + i);\n        board.appendChild(letterSq_1);\n    }\n    for (var i = 0; i < size; i++) {\n        var numSq = document.createElement('div');\n        numSq.classList.add('numSq');\n        numSq.textContent = String(i);\n        board.appendChild(numSq);\n        for (var j = 0; j < size; j++) {\n            var bodySq = document.createElement('div');\n            bodySq.classList.add('bodySq');\n            bodySq.classList.add(\"\".concat(id));\n            bodySq.setAttribute('row', \"\".concat(i));\n            bodySq.setAttribute('col', \"\".concat(j));\n            board.appendChild(bodySq);\n        }\n    }\n    return board;\n}\nfunction overlayInit(overlay, game) {\n    document.getElementById('placeBoard').appendChild(drawBoard(10, 'placeSq'));\n    var rotate = document.getElementById('rotate');\n    var currShip = document.getElementById('currShip');\n    rotate.addEventListener('click', function (e) {\n        e.preventDefault();\n        if (overlay.orientation === 'h')\n            overlay.orientation = 'v';\n        else if (overlay.orientation === 'v')\n            overlay.orientation = 'h';\n        currShip.toggleAttribute('rotated');\n    });\n    var auto = document.getElementById('auto');\n    auto.addEventListener('click', function (e) {\n        e.preventDefault();\n        game.player.populateBoard();\n        game.gameDone = false;\n        document.getElementById(\"playerInput\").classList.add('hidden');\n        renderShips(game.player, 'psq');\n    });\n}\nfunction initBoard(size) {\n    var cBoard = document.getElementById('cBoard');\n    cBoard.appendChild(drawBoard(size, 'csq'));\n    var pBoard = document.getElementById('pBoard');\n    pBoard.appendChild(drawBoard(size, 'psq'));\n}\nfunction rShipPresent(coord, id) {\n    var numSq = document.getElementsByClassName(id);\n    var index = coord[0] * 10 + coord[1];\n    numSq[index].classList.add('shipPresent');\n}\nfunction renderFleet(fleetID) {\n    var fleetW = document.getElementById(fleetID);\n    var fleet = Object.assign(document.createElement('div'), {\n        class: 'fleetList',\n        id: 'pfleet'\n    });\n    fleet.style.display = \"flex\";\n    for (var i = 0; i < 5; i++) {\n        var ships = [[5, 'aircraft-carrier'], [4, 'battleship'], [3, 'cruiser'],\n            [3, 'submarine'], [2, 'destroyer']];\n        var length_1 = Number(ships[i][0]);\n        var id = String(ships[i][1]);\n        var span = document.createElement('span');\n        span.classList.add(id);\n        span.classList.add('shipRender');\n        var status_1 = document.createElement('span');\n        for (var j = 0; j < length_1; j++) {\n            var square = document.createElement('div');\n            square.classList.add('fleetStatus');\n            status_1.appendChild(square);\n        }\n        span.appendChild(status_1);\n        fleet.appendChild(span);\n    }\n    fleetW.appendChild(fleet);\n    styleFleet();\n}\nfunction styleFleet() {\n    var pb = document.getElementById('pageBody');\n    var fleetSect = document.getElementById('fleetSection');\n    var pfleet = document.getElementById('pfleet');\n    var gbWidth = document.getElementById('gbs').offsetWidth;\n    if (window.innerWidth > 1240) {\n        pb.setAttribute(\"style\", \"flex-direction: row; align-items:stretch\");\n        fleetSect.setAttribute(\"style\", \"margin: 0px 1em; \\n        flex-direction: column; width: \\\"\\\"\");\n        pfleet.style.flexDirection = \"column\";\n    }\n    else {\n        pb.setAttribute(\"style\", \"flex-direction: column; align-items:center\");\n        fleetSect.setAttribute(\"style\", \"margin: 1em 0px; \\n        flex-direction: row; width: calc(\".concat(gbWidth, \"px - 6em)\"));\n        pfleet.style.flexDirection = \"row\";\n    }\n}\nfunction styleLog() {\n    var gbWidth = document.getElementById('gbs').offsetWidth;\n    var fleetWidth = document.getElementById('pfleet').offsetWidth;\n    var bLog = document.getElementById('battleLog');\n    if (window.innerWidth > 1240) {\n        var margin = (window.innerWidth - gbWidth + fleetWidth) / 2;\n        bLog.setAttribute(\"style\", \"margin-right: calc(\".concat(margin, \"px - 13em)\"));\n    }\n    else {\n        var margin = (window.innerWidth - gbWidth) / 2;\n        bLog.setAttribute(\"style\", \"margin-right: calc(\".concat(margin, \"px + 1em)\"));\n    }\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/interface.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createPlayer: () => (/* binding */ createPlayer)\n/* harmony export */ });\nfunction createPlayer(size, gameboard) {\n    return {\n        gameboard: gameboard,\n        moves: [],\n        genAttack: function () {\n            var coords = genCoords(size);\n            while (this.moves.includes(coords)) {\n                coords = genCoords(size);\n            }\n            ;\n            this.moves.push(coords);\n            return coords;\n        },\n        populateBoard: function () {\n            var ships = [[5, 'aircraft-carrier'], [4, 'battleship'], [3, 'cruiser'], [3, 'submarine'], [2, 'destroyer']];\n            var orients = ['h', 'v'];\n            var success = false;\n            for (var i = 0; i < 5; i++) {\n                while (!success) {\n                    var length_1 = Number(ships[i][0]);\n                    var id = String(ships[i][1]);\n                    var coords = genCoords(this.gameboard.size);\n                    var orientation_1 = orients[Math.round(Math.random())];\n                    success = this.gameboard.placeShip(id, length_1, coords, orientation_1);\n                }\n                success = false;\n            }\n            return this.gameboard;\n        }\n    };\n}\nfunction genCoords(boardSize) {\n    var randR = Math.floor(Math.random() * boardSize);\n    var randC = Math.floor(Math.random() * boardSize);\n    return [randR, randC];\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/player.ts?");

/***/ }),

/***/ "./src/playerInput.ts":
/*!****************************!*\
  !*** ./src/playerInput.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createOverlay: () => (/* binding */ createOverlay)\n/* harmony export */ });\n/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface */ \"./src/interface.ts\");\n\nfunction createOverlay(game) {\n    return {\n        game: game,\n        orientation: 'h',\n        ships: [['5', 'aircraft-carrier'], ['4', 'battleship'], ['3', 'cruiser'],\n            ['3', 'submarine'], ['2', 'destroyer']],\n        positionShip: function () {\n            var _this = this;\n            var count = 4;\n            updateMsg(\"Please place \".concat(this.ships[count][1]));\n            updateImg(\"\".concat(this.ships[count][1]));\n            document.addEventListener('click', function (event) {\n                var sq = event.target;\n                if (sq.classList.contains('placeSq')) {\n                    if (count > -1) {\n                        var length_1 = Number(_this.ships[count][0]);\n                        var id = String(_this.ships[count][1]);\n                        var coords = getCoords(event);\n                        if (_this.game.player.gameboard.placeShip(id, length_1, coords, _this.orientation)) {\n                            count--;\n                            if (count === -1) {\n                                _this.game.gameDone = false;\n                                document.getElementById(\"playerInput\").classList.add('hidden');\n                                (0,_interface__WEBPACK_IMPORTED_MODULE_0__.renderShips)(_this.game.player, 'psq');\n                            }\n                            else {\n                                (0,_interface__WEBPACK_IMPORTED_MODULE_0__.renderShips)(_this.game.player, 'placeSq');\n                                updateMsg(\"Please place \".concat(_this.ships[count][1]));\n                                updateImg(_this.ships[count][1]);\n                            }\n                        }\n                        else\n                            updateMsg('Please select a valid position');\n                    }\n                }\n            });\n        }\n    };\n}\nfunction updateMsg(message) {\n    var msg = document.getElementById('placementMsg');\n    msg.innerHTML = message;\n}\nfunction getCoords(e) {\n    var clicked = e.target;\n    var row = Number(clicked.getAttribute('row'));\n    var col = Number(clicked.getAttribute('col'));\n    return [row, col];\n}\nfunction updateImg(ship) {\n    var currShip = document.getElementById('currShip');\n    var classList = currShip.classList;\n    classList.remove(classList.item(0));\n    currShip.classList.add(ship);\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/playerInput.ts?");

/***/ }),

/***/ "./src/ship.ts":
/*!*********************!*\
  !*** ./src/ship.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CreateShip: () => (/* binding */ CreateShip)\n/* harmony export */ });\nfunction CreateShip(id, startCoord, orientation, length) {\n    return {\n        id: id,\n        startCoord: startCoord,\n        orientation: orientation,\n        length: length,\n        hitCount: 0,\n        sunk: false,\n        hit: function () {\n            if (this.sunk === false)\n                this.hitCount++;\n            return this.hitCount;\n        },\n        isSunk: function () {\n            if (this.hitCount === this.length)\n                this.sunk = true;\n            return this.sunk;\n        },\n        allCoords: function () {\n            var r = startCoord[0];\n            var c = startCoord[1];\n            var allC = [];\n            if (this.orientation === 'h') {\n                for (var i = 0; i < length; i++) {\n                    allC[i] = [r, c + i];\n                }\n            }\n            else if (this.orientation === 'v') {\n                for (var i = 0; i < length; i++) {\n                    allC[i] = [r + i, c];\n                }\n            }\n            return allC;\n        }\n    };\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/ship.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;