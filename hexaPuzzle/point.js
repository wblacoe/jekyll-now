class Point{
    constructor(args){
        if(args.length === 2){
            this.x = args[0];
            this.y = args[1];
            
        }
    }
    
    plus(x, y){
        return new Point([
            this.x + x,
            this.y + y
        ]);
    }
    
    plus(p){
        return new Point([
            this.x + p.x,
            this.y + p.y
        ]);
    }
    
    minus(x, y){
        return new Point([
            this.x - x,
            this.y - y
        ]);
    }
    
    minus(p){
        return new Point([
            this.x - p.x,
            this.y - p.y
        ]);
    }
    
    times(p){
        return new Point([
            this.x * p.x,
            this.y * p.y
        ]);
    }
    
    norm(){
        return this.x * this.x + this.y * this.y;
    }
    
    round(){
        return new Point([
            Math.round(this.x),
            Math.round(this.y)
        ])
    }
    
    equals(point){
        return this.x === point.x && this.y === point.y;
    }
    
    rotateByPiHalf(){
        return new Point([-this.y, this.x]);
    }
    
    toString(){
        return "point(" + this.x + ", " + this.y + ")";
    }
    
    toCookieString(){
        return "v" + this.x + "," + this.y;
    }
    
};