class Triangle{
    constructor(args){
        var isPointingUp;
        var leftmostBoardPoint;
        
        if(args.length === 2){
            isPointingUp = args[0];
            leftmostBoardPoint = args[1];
            
        }else if(args.length === 6){
            isPointingUp = args[0];
            leftmostBoardPoint = args[1];
            this.fillColor = args[2];
            this.borderColor = args[3];
            this.borderWidth = args[4];
            this.hasBorder = args[5];
        }
        
        this.boardPoints = [];
        this.setBoardPosition(isPointingUp, leftmostBoardPoint);
    }
    
    getBoardPosition(){
        return this.leftmostBoardPoint;
    }
    
    setBoardPosition(isPointingUp, leftmostBoardPoint){
        this.isPointingUp = isPointingUp;
        this.leftmostBoardPoint = leftmostBoardPoint;
        
        if(isPointingUp){ //triangle is pointing up
            this.boardPoints[0] = leftmostBoardPoint; //bottom left
            this.boardPoints[1] = new Point([leftmostBoardPoint.x + (triangleSideLength / 2), leftmostBoardPoint.y - triangleHeight]); //top center
            this.boardPoints[2] = new Point([leftmostBoardPoint.x + triangleSideLength, leftmostBoardPoint.y]); //bottom right
        }else{ //triangle is pointing down
            this.boardPoints[0] = leftmostBoardPoint; //top left
            this.boardPoints[1] = new Point([leftmostBoardPoint.x + triangleSideLength, leftmostBoardPoint.y]); //top right
            this.boardPoints[2] = new Point([leftmostBoardPoint.x + (triangleSideLength / 2), leftmostBoardPoint.y + triangleHeight]); //bottom right
        }
    }
    
    containsPoint(boardX, boardY){
        var r = false;
        //print("leftmost board point: " + this.leftmostBoardPoint.toString() + "<br>" + "mouse: (" + boardX + ", " + boardY + ")");
        if(this.isPointingUp){
            r = (this.leftmostBoardPoint.x <= boardX && boardX < this.leftmostBoardPoint.x + triangleSideLength) &&
            (this.leftmostBoardPoint.y - triangleHeight <= boardY && boardY < this.leftmostBoardPoint.y);
        }else{
            r = (this.leftmostBoardPoint.x <= boardX && boardX < this.leftmostBoardPoint.x + triangleSideLength) &&
            (this.leftmostBoardPoint.y <= boardY && boardY < this.leftmostBoardPoint.y + triangleHeight);
        }
        if(!r){
            return false;
        }
        
        var localX = (boardX - this.leftmostBoardPoint.x) / triangleSideLength; // localX € [0,1]
        var localY = (boardY - this.leftmostBoardPoint.y) / triangleHeight; // localY € [0,1]
        //print("local: (" + localX + ", " + localY + ")");
        if(this.isPointingUp){
            localY = 1 + localY;
            r = (localY > Math.abs(localX * 2 - 1));
        }else{
            r = (localY < -Math.abs(localX * 2 - 1) + 1);
        }
        
        return r;
    }
    
    getCommonPointsWith(triangle){
        var commonPoints = [];
        for(var i=0; i<3; i++){
            for(var j=0; j<3; j++){
                if(this.boardPoints[i].equals(triangle.boardPoints[j])){
                    commonPoints.push(this.boardPoints[i]);
                }
            }
        }
        
        return commonPoints;
    }
    
    /*bordersWithTriangle(triangle){
        return this.getCommonPointsWithTriangle(triangle).length === 2;
    }*/
    
    //assumes that for each triangle all 3 points are distinct
    //does not care about the order of points
    equals(triangle){
        //return this.getCommonPointsWith(triangle) === 3;
        return this.isPointingUp === triangle.isPointingUp && this.leftmostBoardPoint.equals(triangle.leftmostBoardPoint);
    }
    
    toPiece(fillColor, borderWidth, borderColor, hasBorder){
        var piece = new Piece([fillColor, borderWidth, borderColor, hasBorder]);
        piece.addBoardPoints(this.boardPoints);
        piece.addGridTriangle(this);
        
        return piece;
    }

    draw(ctx){
        var canvasPoint0 = boardToCanvasPoint(this.boardPoints[0].x, this.boardPoints[0].y);
        var canvasPoint1 = boardToCanvasPoint(this.boardPoints[1].x, this.boardPoints[1].y);
        var canvasPoint2 = boardToCanvasPoint(this.boardPoints[2].x, this.boardPoints[2].y);
        
        ctx.beginPath();
        ctx.moveTo(canvasPoint0.x, canvasPoint0.y);
        ctx.lineTo(canvasPoint1.x, canvasPoint1.y);
        ctx.lineTo(canvasPoint2.x, canvasPoint2.y);
        ctx.lineTo(canvasPoint0.x, canvasPoint0.y);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        if(this.hasBorder){
            ctx.strokeStyle = this.borderColor;
            ctx.lineWidth = this.borderWidth;
            ctx.stroke();
        }
        ctx.closePath();
    }
    
    getCopy(){
        return new Triangle([this.isPointingUp, this.leftmostBoardPoint]);
    }
    
    toString(){
        //return "is pointing up: " + this.isPointingUp + ", leftmost point: " + this.leftmostBoardPoint.toString() + ", boardPoint0: " + this.boardPoints[0].toString() + ", boardPoint1: " + this.boardPoints[1].toString() + ", boardPoint2: " + this.boardPoints[2].toString();
        
        var s = "is pointing ";
        if(this.isPointingUp){
            s += "up";
        }else{
            s += "down";
        }
        
        s += ", leftmost " + this.leftmostBoardPoint.toString();
        
        return s;
    }
    
    toCookieString(){
        return "t" + (this.isPointingUp ? 1 : 0) + "," + this.leftmostBoardPoint.toCookieString();
    }
    
};