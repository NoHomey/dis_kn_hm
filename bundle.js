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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(2);
const Sequence_1 = __webpack_require__(3);
ReactDOM.render(React.createElement(Sequence_1.default, null), document.getElementById("example"));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
var Limit;
(function (Limit) {
    Limit[Limit["minusInfinity"] = 0] = "minusInfinity";
    Limit[Limit["minus6"] = 1] = "minus6";
    Limit[Limit["minus3"] = 2] = "minus3";
    Limit[Limit["Infinity"] = 3] = "Infinity";
    Limit[Limit["unset"] = 4] = "unset";
})(Limit || (Limit = {}));
;
const containerStyle = {
    width: 1000,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 80
};
const inputStyle = {
    borderWidth: 6,
    borderStyle: "outset",
    borderColor: "#ca0c3d",
    width: 250
};
const epsilon = 0.0000001;
class Sequence extends React.Component {
    maxIndex() {
        return Math.max(Number(this.state.index1), Number(this.state.index2), Number(this.state.index3), Number(this.state.index4), Number(this.state.index5));
    }
    anValue(val) {
        return isFinite(val) ? val : this.limString();
    }
    static isEqual(left, right) {
        return Math.abs(left - right) <= epsilon;
    }
    static isLim(value) {
        return Sequence.isEqual(value, -6) || Sequence.isEqual(value, -3) || isNaN(value);
    }
    roundLim() {
        const length = this.sequence.length;
        const last = this.sequence[length - 1];
        this.sequence[length - 1] = Sequence.isEqual(last, -6) ? -6 : (Sequence.isEqual(last, -3) ? -3 : last);
    }
    an(index) {
        const length = this.sequence.length;
        if (length && typeof index === "number") {
            if (length >= index) {
                return this.anValue(this.sequence[index - 1]);
            }
            let last = this.sequence[length - 1];
            for (let n = length; (n < index) && !Sequence.isLim(last); ++n) {
                last = Sequence.F(last);
                this.sequence.push(last);
            }
            this.roundLim();
            return this.anValue(this.sequence[this.sequence.length - 1]);
        }
        return '';
    }
    static F(x) {
        return (2 * (x * x) + 18) / (x - 9);
    }
    static indexValue(event) {
        const { value } = event.currentTarget;
        const index = Number(value);
        return isNaN(index) ? '' : (index ? index : ' ');
    }
    static isBigger(left, right) {
        return (left - right) >= epsilon;
    }
    static isSmaller(left, right) {
        return (left - right) <= epsilon;
    }
    static liman(a) {
        if ((a === -6) || (a === 3)) {
            return Limit.minus6;
        }
        if (Sequence.isBigger(a, 9)) {
            return Limit.Infinity;
        }
        if (Sequence.isBigger(a, -6) && Sequence.isSmaller(a, 3)) {
            return Limit.minus3;
        }
        return Limit.minusInfinity;
    }
    limString() {
        switch (this.lim) {
            case Limit.Infinity: return "infinity";
            case Limit.minus3: return "-3";
            case Limit.minus6: return "-6";
            case Limit.minusInfinity: return "-infinity";
            default: return '';
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            lambda: '',
            index1: '',
            index2: '',
            index3: '',
            index4: '',
            index5: ''
        };
        this.sequence = [];
        this.onLambdaChange = this.setLambda.bind(this);
        this.onIndex1Change = this.setIndex1.bind(this);
        this.onIndex2Change = this.setIndex2.bind(this);
        this.onIndex3Change = this.setIndex3.bind(this);
        this.onIndex4Change = this.setIndex4.bind(this);
        this.onIndex5Change = this.setIndex5.bind(this);
    }
    setLambda(event) {
        const lambda = Number(event.currentTarget.value);
        if (isNaN(lambda)) {
            this.sequence = [];
            this.lim = Limit.unset;
            this.setState({ lambda: event.currentTarget.value === '-' ? '-' : '' });
            return;
        }
        if (this.state.lambda !== lambda) {
            const m = this.maxIndex();
            this.sequence = [lambda];
            let an = lambda;
            for (let n = 1; (n < m) && !Sequence.isLim(an); ++n) {
                an = Sequence.F(an);
                this.sequence.push(an);
            }
            this.roundLim();
            this.lim = Sequence.liman(lambda);
            this.setState({ lambda: lambda });
        }
    }
    setIndex1(event) {
        this.setState({ index1: Sequence.indexValue(event) });
    }
    setIndex2(event) {
        this.setState({ index2: Sequence.indexValue(event) });
    }
    setIndex3(event) {
        this.setState({ index3: Sequence.indexValue(event) });
    }
    setIndex4(event) {
        this.setState({ index4: Sequence.indexValue(event) });
    }
    setIndex5(event) {
        this.setState({ index5: Sequence.indexValue(event) });
    }
    shouldComponentUpdate(_, nextState) {
        if (this.state.lambda !== nextState.lambda) {
            return true;
        }
        if (this.state.index1 !== nextState.index1) {
            return true;
        }
        if (this.state.index2 !== nextState.index2) {
            return true;
        }
        if (this.state.index3 !== nextState.index3) {
            return true;
        }
        if (this.state.index4 !== nextState.index4) {
            return true;
        }
        if (this.state.index5 !== nextState.index5) {
            return true;
        }
        return false;
    }
    render() {
        return React.createElement("div", { style: containerStyle },
            React.createElement("div", null, "Homework1, Ivo Stratev, Informatics, 2, group 3, \u2116 45342"),
            React.createElement("br", null),
            React.createElement("br", null),
            "lambda = ",
            React.createElement("input", { type: "text", style: inputStyle, value: this.state.lambda, onChange: this.onLambdaChange }),
            " => lim n -> infinity an = ",
            this.limString(),
            React.createElement("br", null),
            React.createElement("br", null),
            "a ",
            React.createElement("input", { type: "text", style: inputStyle, value: this.state.index1, onChange: this.onIndex1Change }),
            " = ",
            this.an(this.state.index1),
            React.createElement("br", null),
            React.createElement("br", null),
            "a ",
            React.createElement("input", { type: "text", style: inputStyle, value: this.state.index2, onChange: this.onIndex2Change }),
            " = ",
            this.an(this.state.index2),
            React.createElement("br", null),
            React.createElement("br", null),
            "a ",
            React.createElement("input", { type: "text", style: inputStyle, value: this.state.index3, onChange: this.onIndex3Change }),
            " = ",
            this.an(this.state.index3),
            React.createElement("br", null),
            React.createElement("br", null),
            "a ",
            React.createElement("input", { type: "text", style: inputStyle, value: this.state.index4, onChange: this.onIndex4Change }),
            " = ",
            this.an(this.state.index4),
            React.createElement("br", null),
            React.createElement("br", null),
            "a ",
            React.createElement("input", { type: "text", style: inputStyle, value: this.state.index5, onChange: this.onIndex5Change }),
            " = ",
            this.an(this.state.index5));
    }
}
;
exports.default = Sequence;


/***/ })
/******/ ]);