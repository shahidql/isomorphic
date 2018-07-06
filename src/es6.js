class Shape{
    constructor(id, x, y) { // constructor syntactic sugar
        this.id = id;
        this.setLocation(x, y);
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