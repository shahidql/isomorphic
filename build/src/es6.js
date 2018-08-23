'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function () {
    function Shape(id, x, y) {
        _classCallCheck(this, Shape);

        // constructor syntactic sugar
        this.id = id;
        this.setLocation(x, y);
        //const key = Symbol('alsd');
        this.ars = {
            name: 'hello test'
            //     [key] : 'shahid iqbal'
        };
        var a = ['a', 'b', 'c'];
        var b = [].concat(_toConsumableArray(this.ars));
        //this.setSymbol(10);
    }

    /**
     * Set shape location.
     * 
     * @param {Number} - The x coordinate.
     * @param {Number} - The y coordinate.
     */


    _createClass(Shape, [{
        key: 'setLocation',
        value: function setLocation(x, y) {
            // prototype function
            this.x = x;
            this.y = y;
        }
    }, {
        key: 'setSymbol',
        value: function setSymbol(ars) {
            console.log('es6 Symbol:', this.ars, '===');
        }
        /**
         * Get shape location.
         * 
         * @return {Object}
         */

    }, {
        key: 'getLocation',
        value: function getLocation() {
            return {
                x: this.x,
                y: this.y
            };
        }

        /**
         * Get shape description.
         * 
         * @return {String}
         */

    }, {
        key: 'toString',
        value: function toString() {
            return 'Shape(\'' + this.id + '\')';
        }
    }]);

    return Shape;
}();

console.log('==+==', new Shape('shahid').toString());
//new Shape('symbol');

//closure function-
function createCounter() {
    var counter = 0;
    var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var b = _extends({}, a);
    var myFunction = function myFunction() {
        counter = counter + 1;
        return counter;
    };
    return myFunction;
}
var increment = createCounter();
var c1 = increment();
var c2 = increment();
var c3 = increment();
console.log('example increment', c1, c2, c3);
//# sourceMappingURL=es6.js.map