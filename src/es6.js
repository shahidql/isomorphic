'use strict';

class Shape{
    constructor(id, x, y) { // constructor syntactic sugar
        this.id = id;
        this.setLocation(x, y);
        //const key = Symbol('alsd');
        this.ars = {
             name : 'hello test',
        //     [key] : 'shahid iqbal'
        }
        var a = ['a', 'b', 'c'];
        var b = [...this.ars];
        //this.setSymbol(10);
    }
    
    /**
     * Set shape location.
     * 
     * @param {Number} - The x coordinate.
     * @param {Number} - The y coordinate.
     */
    setLocation(x, y) { // prototype function
        this.x = x;
        this.y = y;
    }
    
    setSymbol(ars){
        console.log('es6 Symbol:',this.ars, '===');
    }
    /**
     * Get shape location.
     * 
     * @return {Object}
     */
    getLocation() {
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
    toString(){
        return `Shape('${this.id}')`;
    }
}
console.log('==+==', new Shape('shahid').toString());
//new Shape('symbol');

//closure function-
function createCounter() {
    let counter = 0;
    let a = [1,2,3,4,5,6,7,8,9,10];
    let b = {...a};
    const myFunction = function() {
        counter = counter + 1
        return counter
    }
    return myFunction
}
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()
console.log('example increment', c1, c2, c3)