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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = fabric;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fabric = __webpack_require__(0);
var DrawingBoard = (function () {
    /**
     * Creates a new DrawingBoard element from an HTMLCanvasElement
     *
     * @param c {HTMLCanvasElement} the canvas to be used by fabric
     */
    function DrawingBoard(c, tools) {
        this._clicked = false;
        if (tools) {
            this._availableTools = tools;
        }
        //we assign the new fabric.Canvas to our local _canvas variable
        this._canvas = new fabric.Canvas(c);
        //we set the isDrawingMode property of the fabric.Canvas element to true so it will be able
        //to be used as a free drawing canvas from its creation.
        //this._canvas.isDrawingMode = true;
        this.bindEvents();
    }
    //With this method we bind the fabric.Canvas events to our tool handlers
    DrawingBoard.prototype.bindEvents = function () {
        var _this = this;
        //we bind the onmousedown event handler of our tool with the mouse:down event of the fabric.Canvas
        this._canvas.on("mouse:down", function (e) {
            _this._clicked = true;
            _this._target = e.e.target;
            var result = _this._tool.onmousedown(e.e, _this._canvas);
            if (result) {
                _this._elements.push(result);
            }
        });
        //we bind the onmousemove and onmousedrag event handlers of our tool with the mose:move event of the 
        //fabric.Canvas. If the mouse is clicked it is onmousedrag, else it is onmousemove.
        this._canvas.on("mouse:move", function (e) {
            if (_this._clicked) {
                if (_this._target == e.e.target) {
                    var result = _this._tool.onmousedrag(e.e, _this._canvas);
                    if (result) {
                        _this._elements.push(result);
                    }
                }
            }
            else {
                var result = _this._tool.onmousemove(e.e, _this._canvas);
                if (result) {
                    _this._elements.push(result);
                }
            }
        });
        //we bind the onmouseup event handler of our tool with the mouse:up event of the fabric.Canvas
        this._canvas.on("mouse:up", function (e) {
            _this._clicked = false;
            var result = _this._tool.onmouseup(e.e, _this._canvas);
            if (result) {
                _this._elements.push(result);
            }
        });
    };
    Object.defineProperty(DrawingBoard.prototype, "lineWidth", {
        get: function () {
            return this._lineWidth;
        },
        set: function (w) {
            if (w > 0) {
                this._lineWidth = w;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingBoard.prototype, "lineColor", {
        get: function () {
            return this._lineColor.toRgba();
        },
        set: function (c) {
            this._lineColor = fabric.Color.fromRgba(c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingBoard.prototype, "fillColor", {
        get: function () {
            return this._fillColor.toRgba();
        },
        set: function (c) {
            this._fillColor = fabric.Color.fromRgba(c);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DrawingBoard.prototype, "tool", {
        get: function () {
            return this._tool;
        },
        set: function (t) {
            this._tool = t;
        },
        enumerable: true,
        configurable: true
    });
    return DrawingBoard;
}());
exports.DrawingBoard = DrawingBoard;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fabric = __webpack_require__(0);
var tool_1 = __webpack_require__(4);
var Pencil = (function (_super) {
    __extends(Pencil, _super);
    function Pencil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pencil.prototype.onmousedown = function (e, c) {
        this._path = new fabric.IPath();
        console.log(e.offsetX, e.offsetY);
    };
    Pencil.prototype.onmousemove = function (e, c) {
        //console.log(e);
    };
    Pencil.prototype.onmousedrag = function (e, c) {
        console.log(e.offsetX, e.offsetY);
    };
    Pencil.prototype.onmouseup = function (e, c) {
        //console.log(e);
    };
    return Pencil;
}(tool_1.Tool));
exports.Pencil = Pencil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var drawing_board_1 = __webpack_require__(1);
var pencil_1 = __webpack_require__(2);
var board = new drawing_board_1.DrawingBoard("board");
board.tool = new pencil_1.Pencil(5, "rgba(0, 0, 0, 1)");


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fabric = __webpack_require__(0);
var Tool = (function () {
    /**@constructor */
    function Tool(lineWidth, lineColor) {
        this._lineWidth = lineWidth;
        if (lineColor instanceof fabric.Color) {
            this._lineColor = lineColor;
        }
        else {
            this._lineColor = fabric.Color.fromRgba(lineColor);
        }
    }
    Object.defineProperty(Tool.prototype, "lineColor", {
        get: function () {
            return this._lineColor;
        },
        set: function (color) {
            if (color instanceof fabric.Color) {
                this._lineColor = color;
            }
            else {
                this._lineColor = fabric.Color.fromRgba(color);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Tool;
}());
exports.Tool = Tool;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGE3YjEyOTBhM2ViODkyNzdiNDQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZmFicmljXCIiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3R5cGVzY3JpcHRzL2RyYXdpbmdfYm9hcmQudHMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL3R5cGVzY3JpcHRzL3Rvb2xzL3BlbmNpbC50cyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdHlwZXNjcmlwdHMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvdHlwZXNjcmlwdHMvdG9vbHMvdG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUEsd0I7Ozs7Ozs7OztBQ0NBLG9DQUFnQztBQU9oQztJQVdJOzs7O09BSUc7SUFDSCxzQkFBWSxDQUFTLEVBQUUsS0FBc0M7UUFSckQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQVM5QixFQUFFLEVBQUMsS0FBSyxDQUFDLEVBQUM7WUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDO1FBQ0QsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFB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VGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwYTdiMTI5MGEzZWI4OTI3N2I0NCIsIm1vZHVsZS5leHBvcnRzID0gZmFicmljO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZmFicmljXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtUb29sfSBmcm9tIFwiLi90b29scy90b29sXCJcbmltcG9ydCAqIGFzIGZhYnJpYyBmcm9tIFwiZmFicmljXCJcblxuaW50ZXJmYWNlIERpY3Rpb25hcnlJdGVtPGssIHY+e1xuICAgIDA6IGssXG4gICAgMTogdlxufVxuXG5leHBvcnQgY2xhc3MgRHJhd2luZ0JvYXJke1xuICAgIHByaXZhdGUgX2NhbnZhczogZmFicmljLkNhbnZhcztcbiAgICBwcml2YXRlIF90b29sOiBUb29sO1xuICAgIHByaXZhdGUgX2F2YWlsYWJsZVRvb2xzOiBEaWN0aW9uYXJ5SXRlbTxzdHJpbmcsIFRvb2w+W107XG4gICAgcHJpdmF0ZSBfbGluZVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbGluZUNvbG9yOiBmYWJyaWMuQ29sb3I7XG4gICAgcHJpdmF0ZSBfZmlsbENvbG9yOiBmYWJyaWMuQ29sb3I7XG4gICAgcHJpdmF0ZSBfZWxlbWVudHM6IEFycmF5PGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3Q+O1xuICAgIHByaXZhdGUgX2NsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF90YXJnZXQ6IEV2ZW50VGFyZ2V0O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBEcmF3aW5nQm9hcmQgZWxlbWVudCBmcm9tIGFuIEhUTUxDYW52YXNFbGVtZW50XG4gICAgICogXG4gICAgICogQHBhcmFtIGMge0hUTUxDYW52YXNFbGVtZW50fSB0aGUgY2FudmFzIHRvIGJlIHVzZWQgYnkgZmFicmljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoYzogc3RyaW5nLCB0b29scz86IERpY3Rpb25hcnlJdGVtPHN0cmluZywgVG9vbD5bXSl7XG4gICAgICAgIGlmKHRvb2xzKXtcbiAgICAgICAgICAgIHRoaXMuX2F2YWlsYWJsZVRvb2xzID0gdG9vbHM7XG4gICAgICAgIH1cbiAgICAgICAgLy93ZSBhc3NpZ24gdGhlIG5ldyBmYWJyaWMuQ2FudmFzIHRvIG91ciBsb2NhbCBfY2FudmFzIHZhcmlhYmxlXG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IG5ldyBmYWJyaWMuQ2FudmFzKGMpO1xuICAgICAgICAvL3dlIHNldCB0aGUgaXNEcmF3aW5nTW9kZSBwcm9wZXJ0eSBvZiB0aGUgZmFicmljLkNhbnZhcyBlbGVtZW50IHRvIHRydWUgc28gaXQgd2lsbCBiZSBhYmxlXG4gICAgICAgIC8vdG8gYmUgdXNlZCBhcyBhIGZyZWUgZHJhd2luZyBjYW52YXMgZnJvbSBpdHMgY3JlYXRpb24uXG4gICAgICAgIC8vdGhpcy5fY2FudmFzLmlzRHJhd2luZ01vZGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvL1dpdGggdGhpcyBtZXRob2Qgd2UgYmluZCB0aGUgZmFicmljLkNhbnZhcyBldmVudHMgdG8gb3VyIHRvb2wgaGFuZGxlcnNcbiAgICBwcml2YXRlIGJpbmRFdmVudHMoKXtcbiAgICAgICAgLy93ZSBiaW5kIHRoZSBvbm1vdXNlZG93biBldmVudCBoYW5kbGVyIG9mIG91ciB0b29sIHdpdGggdGhlIG1vdXNlOmRvd24gZXZlbnQgb2YgdGhlIGZhYnJpYy5DYW52YXNcbiAgICAgICAgdGhpcy5fY2FudmFzLm9uKFwibW91c2U6ZG93blwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSAoPE1vdXNlRXZlbnQ+ZS5lKS50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fdG9vbC5vbm1vdXNlZG93bihlLmUgYXMgTW91c2VFdmVudCwgdGhpcy5fY2FudmFzKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvL3dlIGJpbmQgdGhlIG9ubW91c2Vtb3ZlIGFuZCBvbm1vdXNlZHJhZyBldmVudCBoYW5kbGVycyBvZiBvdXIgdG9vbCB3aXRoIHRoZSBtb3NlOm1vdmUgZXZlbnQgb2YgdGhlIFxuICAgICAgICAvL2ZhYnJpYy5DYW52YXMuIElmIHRoZSBtb3VzZSBpcyBjbGlja2VkIGl0IGlzIG9ubW91c2VkcmFnLCBlbHNlIGl0IGlzIG9ubW91c2Vtb3ZlLlxuICAgICAgICB0aGlzLl9jYW52YXMub24oXCJtb3VzZTptb3ZlXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLl9jbGlja2VkKXtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl90YXJnZXQgPT0gKDxNb3VzZUV2ZW50PiBlLmUpLnRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl90b29sLm9ubW91c2VkcmFnKGUuZSBhcyBNb3VzZUV2ZW50LCB0aGlzLl9jYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX3Rvb2wub25tb3VzZW1vdmUoZS5lIGFzIE1vdXNlRXZlbnQsIHRoaXMuX2NhbnZhcyk7XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZWxlbWVudHMucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy93ZSBiaW5kIHRoZSBvbm1vdXNldXAgZXZlbnQgaGFuZGxlciBvZiBvdXIgdG9vbCB3aXRoIHRoZSBtb3VzZTp1cCBldmVudCBvZiB0aGUgZmFicmljLkNhbnZhc1xuICAgICAgICB0aGlzLl9jYW52YXMub24oXCJtb3VzZTp1cFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX3Rvb2wub25tb3VzZXVwKGUuZSBhcyBNb3VzZUV2ZW50LCB0aGlzLl9jYW52YXMpO1xuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbGVtZW50cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBsaW5lV2lkdGgoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVXaWR0aDtcbiAgICB9XG5cbiAgICBzZXQgbGluZVdpZHRoKHc6IG51bWJlcil7XG4gICAgICAgIGlmKHcgPiAwKXtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVXaWR0aCA9IHc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbGluZUNvbG9yKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lQ29sb3IudG9SZ2JhKCk7XG4gICAgfVxuXG4gICAgc2V0IGxpbmVDb2xvcihjOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLl9saW5lQ29sb3IgPSBmYWJyaWMuQ29sb3IuZnJvbVJnYmEoYyk7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGxDb2xvcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsbENvbG9yLnRvUmdiYSgpO1xuICAgIH1cbiAgICBzZXQgZmlsbENvbG9yKGM6IHN0cmluZyl7XG4gICAgICAgIHRoaXMuX2ZpbGxDb2xvciA9IGZhYnJpYy5Db2xvci5mcm9tUmdiYShjKTtcbiAgICB9XG5cbiAgICBnZXQgdG9vbCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbDtcbiAgICB9XG5cbiAgICBzZXQgdG9vbCh0OiBUb29sKXtcbiAgICAgICAgdGhpcy5fdG9vbCA9IHQ7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy90eXBlc2NyaXB0cy9kcmF3aW5nX2JvYXJkLnRzIiwiaW1wb3J0ICogYXMgZmFicmljIGZyb20gXCJmYWJyaWNcIlxuaW1wb3J0IHtUb29sfSBmcm9tIFwiLi90b29sXCI7XG5cbmV4cG9ydCBjbGFzcyBQZW5jaWwgZXh0ZW5kcyBUb29se1xuXG4gICAgcHJpdmF0ZSBfcGF0aDogZmFicmljLklQYXRoO1xuXG4gICAgIG9ubW91c2Vkb3duKGU6IE1vdXNlRXZlbnQsIGM6IGZhYnJpYy5DYW52YXMpOiBmYWJyaWMuT2JqZWN0W10gfCBmYWJyaWMuT2JqZWN0IHwgdm9pZCB7XG4gICAgICAgIHRoaXMuX3BhdGggPSBuZXcgZmFicmljLklQYXRoKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGUub2Zmc2V0WCwgZS5vZmZzZXRZKTtcbiAgICB9XG5cbiAgICAgb25tb3VzZW1vdmUoZTogTW91c2VFdmVudCwgYzogZmFicmljLkNhbnZhcyk6IGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3QgfCB2b2lkIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlKTtcbiAgICB9XG5cbiAgICAgb25tb3VzZWRyYWcoZTogTW91c2VFdmVudCwgYzogZmFicmljLkNhbnZhcyk6IGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3QgfCB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coZS5vZmZzZXRYLCBlLm9mZnNldFkpO1xuICAgIH1cblxuICAgICBvbm1vdXNldXAoZTogTW91c2VFdmVudCwgYzogZmFicmljLkNhbnZhcyk6IGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3QgfCB2b2lkIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL3R5cGVzY3JpcHRzL3Rvb2xzL3BlbmNpbC50cyIsImltcG9ydCAqIGFzIGZhYnJpYyBmcm9tIFwiZmFicmljXCI7XG5pbXBvcnQge0RyYXdpbmdCb2FyZH0gZnJvbSBcIi4vZHJhd2luZ19ib2FyZFwiO1xuaW1wb3J0IHtQZW5jaWx9IGZyb20gXCIuL3Rvb2xzL3BlbmNpbFwiO1xuXG5sZXQgYm9hcmQgPSBuZXcgRHJhd2luZ0JvYXJkKFwiYm9hcmRcIik7XG5cbmJvYXJkLnRvb2wgPSBuZXcgUGVuY2lsKDUsIFwicmdiYSgwLCAwLCAwLCAxKVwiKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvdHlwZXNjcmlwdHMvbWFpbi50cyIsImltcG9ydCAqIGFzIGZhYnJpYyBmcm9tIFwiZmFicmljXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUb29se1xuXG4gICAgcHJvdGVjdGVkIF9saW5lV2lkdGg6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX2xpbmVDb2xvcjogZmFicmljLkNvbG9yO1xuXG4gICAgLyoqQGNvbnN0cnVjdG9yICovXG4gICAgY29uc3RydWN0b3IobGluZVdpZHRoOiBudW1iZXIsIGxpbmVDb2xvcjogc3RyaW5nIHwgZmFicmljLkNvbG9yKXtcbiAgICAgICAgdGhpcy5fbGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgICAgICBpZihsaW5lQ29sb3IgaW5zdGFuY2VvZiBmYWJyaWMuQ29sb3Ipe1xuICAgICAgICAgICAgdGhpcy5fbGluZUNvbG9yID0gbGluZUNvbG9yIGFzIGZhYnJpYy5Db2xvcjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLl9saW5lQ29sb3IgPSBmYWJyaWMuQ29sb3IuZnJvbVJnYmEoPHN0cmluZz5saW5lQ29sb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWJzdHJhY3Qgb25tb3VzZWRvd24oZTogTW91c2VFdmVudCwgYzogZmFicmljLkNhbnZhcyk6IGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3QgfCB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgb25tb3VzZW1vdmUoZTogTW91c2VFdmVudCwgYzogZmFicmljLkNhbnZhcyk6IGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3QgfCB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgb25tb3VzZWRyYWcoZTogTW91c2VFdmVudCwgYzogZmFicmljLkNhbnZhcyk6IGZhYnJpYy5PYmplY3RbXSB8IGZhYnJpYy5PYmplY3QgfCB2b2lkO1xuXG4gICAgYWJzdHJhY3Qgb25tb3VzZXVwKGU6IE1vdXNlRXZlbnQsIGM6IGZhYnJpYy5DYW52YXMpOiBmYWJyaWMuT2JqZWN0W10gfCBmYWJyaWMuT2JqZWN0IHwgdm9pZDtcblxuICAgIGdldCBsaW5lQ29sb3IoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpbmVDb2xvcjtcbiAgICB9XG5cbiAgICBzZXQgbGluZUNvbG9yKGNvbG9yOiBmYWJyaWMuQ29sb3IgfCBzdHJpbmcpe1xuICAgICAgICBpZihjb2xvciBpbnN0YW5jZW9mIGZhYnJpYy5Db2xvcil7XG4gICAgICAgICAgICB0aGlzLl9saW5lQ29sb3IgPSBjb2xvciBhcyBmYWJyaWMuQ29sb3I7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5fbGluZUNvbG9yID0gZmFicmljLkNvbG9yLmZyb21SZ2JhKDxzdHJpbmc+Y29sb3IpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy90eXBlc2NyaXB0cy90b29scy90b29sLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==