class TargetPolygon{
    constructor(args){
        this.gridX = args[0];
        this.gridY = args[1];
        this.fillColor = COLORS[DARK_GRAY];
        
        this.vertices = [
            [0,0],
            [2,0],
            [3,2],
            [5,2],
            [6,4],
            [5,6],
            [6,8],
            [5,10],
            [3,10],
            [2,12],
            [0,12],
            [-1,10],
            [-3,10],
            [-4,8],
            [-3,6],
            [-4,4],
            [-3,2],
            [-1,2],
            [0,0]
        ];
    }
    
    draw(ctx){
        var h = triangleHeight;
        var s = triangleSideLength;
        
        //print("targetspace. vertices: " + this.vertices);
        
        //begin drawing
        ctx.beginPath();
        
        //first vertex
        var vertexX = this.vertices[0][0];
        var vertexY = this.vertices[0][1];
        var p = gridToCanvasPoint(this.gridX + vertexX, this.gridY + vertexY);
        ctx.moveTo(p.x, p.y);
        
        //all other vertices
        for(var i=1; i<this.vertices.length; i++){
            vertexX = this.vertices[i][0];
            vertexY = this.vertices[i][1];
            p = gridToCanvasPoint(this.gridX + vertexX, this.gridY + vertexY);
            ctx.lineTo(p.x, p.y);
        }
        
        //finish drawing
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.closePath();
    }
    
    toString(){
        return "(" + this.gridX + ", " + this.gridY + "), vertices: " + this.vertices;
    }

}