class Piece{
    constructor(args){
        this.boardPoints = []; //ordered in circle clockwise
        this.gridTriangles = []; //in no particular order
        
        if(args.length === 1){
            this.fillColor = args[0];
            //this.borderWidth = args[1];
            //this.borderColor = args[2];
            //this.hasBorder = args[3];
        }
        
    }
    
    addBoardPoint(boardX, boardY){
        this.boardPoints.push(new Point([boardX, boardY]));
    }
    
    addBoardPoints(boardPoints){
        for(var i=0; i<boardPoints.length; i++){
            this.boardPoints.push(boardPoints[i]);
        }
    }
    
    addGridTriangle(triangle){
        this.gridTriangles.push(triangle);
    }
    
    addGridTriangles(triangles){
        for(var i=0; i<triangles.length; i++){
            this.gridTriangles.push(triangles[i]);
        }
    }
    
    setFillColor(fillColor){
        this.fillColor = fillColor;
    }
    
    getFillColor(){
        return this.fillColor;
    }
    
    draw(ctx){
        ctx.beginPath();
        var p = boardToCanvasPoint(this.boardPoints[0].x, this.boardPoints[0].y);
        ctx.moveTo(p.x, p.y);
        for(var i=1; i<this.boardPoints.length; i++){
            p = boardToCanvasPoint(this.boardPoints[i].x, this.boardPoints[i].y);
            ctx.lineTo(p.x, p.y);
        }
        p = boardToCanvasPoint(this.boardPoints[0].x, this.boardPoints[0].y);
        ctx.lineTo(p.x, p.y);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        //if(piecesHaveBorder){
            ctx.lineWidth = piecesBorderWidth;
            ctx.strokeStyle = piecesBorderColor;
            ctx.stroke();
        //}
        ctx.closePath();
        
        //central circle
        /*var central = this.getCentralPoint();
        var canvasPoint = boardToCanvasPoint(central.x, central.y);
        var radius = 5;
        ctx.beginPath();
        ctx.arc(canvasPoint.x, canvasPoint.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.closePath();
       
        //grid triangles
        for(var i=0; i<this.gridTriangles.length; i++){
            this.gridTriangles[i].draw(ctx);
        }*/
    }
    
    containsPoint(boardX, boardY){
        for(var i=0; i<this.gridTriangles.length; i++){
            if(this.gridTriangles[i].containsPoint(boardX, boardY)){
                return true;
            }
        }
        return false;
    }
    
    //assumes that this piece and given triangle overlap at most in one edge
    /*getCommonPointsWithTriangle(triangle){
        var gt, cp;
        for(var i=0; i<this.gridTriangles.length; i++){
            gt = this.gridTriangles[i];
            cp = gt.getCommonPointsWithTriangle(triangle);
            if(cp.length !== 0){
                return cp;
            }
        }
        
        return [];
    }*/
    
    /*bordersWithTriangle(triangle){
        var commonPointsWithTriangle = this.getCommonPointsWithTriangle(triangle);
        append("\n(bordersWithTriangle) commonPointsWithTriangle.length = " + commonPointsWithTriangle.length);
        return commonPointsWithTriangle.length === 2;
    }*/
    
    //assumes that this piece and given piece overlap at most in one edge
    getCommonPointsWithPiece(piece){
        /*var gt1, gt2, cp;
        for(var i=0; i<this.gridTriangles.length; i++){
            gt1 = this.gridTriangles[i];
            for(var j=0; j<piece.gridTriangles.length; j++){
                gt2 = piece.gridTriangles[j];
                cp = gt1.getCommonPointsWithTriangle(gt2);
                if(cp.length !== 0){
                    return cp;
                }
            }
        }*/
        
        var commonPoints = [];
        for(var i=0; i<this.boardPoints.length; i++){
            var bp1 = this.boardPoints[i];
            for(var j=0; j<piece.boardPoints.length; j++){
                var bp2 = piece.boardPoints[j];
                if(bp1.equals(bp2)){
                    commonPoints.push(bp1);
                }
            }
        }

        
        return commonPoints;
    }
    
    bordersWithPiece(piece){
        var cp = this.getCommonPointsWithPiece(piece);
        //append("\n(bordersWithPiece) common points with piece = " + cp.length);
        return cp.length === 2;
    }
    
    //assumes that this piece borders with given piece
    unifyWithPiece(piece){
        var cp = this.getCommonPointsWithPiece(piece);
        
        //if this piece has exactly two points (one edge) in common with given piece
        if(cp.length === 2){

            //DEBUG
            //append("\nthis board points: " + this.boardPoints);
            //append("given board points: " + piece.boardPoints);
            //append("common points: " + cp);

            //unify board points
            var i1 = 0;
            var i2;
            var newBoardPoints = [];
            var p;
            
            while(true){
                p = this.boardPoints[i1];
                if(!contains(cp, p)){
                    break;
                }
                i1++;
            }
                
            while(true){
                p = this.boardPoints[i1];
                i2 = getIndexOf(piece.boardPoints, p);
                newBoardPoints.push(p);
                if(i2 > -1){
                    i2 = (i2 + 1) % piece.boardPoints.length;
                    break;
                }
                i1 = (i1 + 1) % this.boardPoints.length;
            }
            
            while(true){
                p = piece.boardPoints[i2];
                i1 = getIndexOf(this.boardPoints, p);
                if(i1 > -1){
                    break;
                }
                newBoardPoints.push(p);
                i2 = (i2 + 1) % piece.boardPoints.length;
            }
            
            while(true){
                p = this.boardPoints[i1];
                if(contains(newBoardPoints, p)){
                    break;
                }
                newBoardPoints.push(p);
                i1 = (i1 + 1) % this.boardPoints.length;
            }
            
            
            //unify grid triangles
            //this.gridTriangles = this.gridTriangles.concat(piece.gridTriangles);

            //append("new board points: " + newBoardPoints);
            var newPiece = new Piece([COLORS[YELLOW]]);
            newPiece.addBoardPoints(newBoardPoints);
            newPiece.addGridTriangles(concatLists(this.gridTriangles, piece.gridTriangles));
            
            //append("new piece:");
            //append(newPiece.toString());
            
            return newPiece;
            
        //if this piece does not border with given piece
        }else{
            //append("no overlap");
            return null;
        }
    }
    
    overlapsWith(piece){
        for(var i=0; i<this.gridTriangles.length; i++){
            var gt1 = this.gridTriangles[i];
            for(var j=0; j<piece.gridTriangles.length; j++){
                var gt2 = piece.gridTriangles[j];
                if(gt1.equals(gt2)){
                    return true;
                }
            }
        }
        return false;
    }
    
    getCopy(){
        //append("copying piece");
        var copy = new Piece([this.fillColor]);
        for(var i=0; i<this.boardPoints.length; i++){
            var bp = this.boardPoints[i];
            copy.addBoardPoint(bp.x, bp.y);
        }
        for(var i=0; i<this.gridTriangles.length; i++){
            var gt = this.gridTriangles[i];
            copy.addGridTriangle(gt.getCopy());
        }
        
        //append("copy: " + copy.toString());
        return copy;
    }
    
    position(anchorPiece, offset){
        //snap offset to grid
        //offset = snapToGrid(anchorPiece.boardPoints[0].plus(offset)).minus(anchorPiece.boardPoints[0]);
        
        for(var i=0; i<this.boardPoints.length; i++){
            this.boardPoints[i] = anchorPiece.boardPoints[i].plus(offset).round();
        }
        for(var i=0; i<this.gridTriangles.length; i++){
            this.gridTriangles[i].setBoardPosition(anchorPiece.gridTriangles[i].isPointingUp, anchorPiece.gridTriangles[i].leftmostBoardPoint.plus(offset).round());
        }
    }
    
    translate(delta){
        this.position(this, delta);
    }
    
    snapToGrid(){
        var orig, snappedToGrid, delta;
        var minDelta = null;
        for(var i=0; i<this.boardPoints.length; i++){
            orig = this.boardPoints[i];
            snappedToGrid = snapToGrid(this.boardPoints[i]);
            delta = snappedToGrid.minus(orig);
            if(minDelta === null || delta.norm() < minDelta.norm()){
                minDelta = delta;
            }
        }
        this.translate(minDelta);
    }
    
    getCentralPoint(){
        var x = 0;
        var y = 0;
        
        for(var i=0; i<this.boardPoints.length; i++){
            var bp = this.boardPoints[i];
            x += bp.x;
            y += bp.y;
        }
        
        x /= this.boardPoints.length;
        y /= this.boardPoints.length;
        
        //return snapToGrid(new Point([x, y]));
        return new Point([x, y]);
    }
    
    rotatePoint(boardPoint){
        var x = 0.5 * boardPoint.x - 0.866 * boardPoint.y;
        var y = 0.866 * boardPoint.x + 0.5 * boardPoint.y;
        
        //return snapToGrid(new Point([x, y]));
        return new Point([x, y]);
    }
    
    rotate(){
        var central = this.getCentralPoint();
        var relativeToCentral;
        var rotatedRelativeToCentral;
        
        for(var i=0; i<this.boardPoints.length; i++){
            relativeToCentral = this.boardPoints[i].minus(central);
            rotatedRelativeToCentral = this.rotatePoint(relativeToCentral);
            this.boardPoints[i] = /*snapToGrid(*/central.plus(rotatedRelativeToCentral/*)*/);
        }
        
        for(var i=0; i<this.gridTriangles.length; i++){
            var leftmost = null;
            for(var j=0; j<3; j++){
                relativeToCentral = this.gridTriangles[i].boardPoints[j].minus(central);
                rotatedRelativeToCentral = this.rotatePoint(relativeToCentral);
                var rotated = /*snapToGrid(*/central.plus(rotatedRelativeToCentral/*)*/);
                if(leftmost === null || rotated.x < leftmost.x){
                    leftmost = rotated;
                }
            }
            this.gridTriangles[i].setBoardPosition(!this.gridTriangles[i].isPointingUp, leftmost);
        }
        
        this.snapToGrid();
    }
    
    flip(){
        var central = this.getCentralPoint();
        var relativeToCentral;
        var flippedRelativeToCentral;
        
        for(var i=0; i<this.boardPoints.length; i++){
            relativeToCentral = this.boardPoints[i].minus(central);
            flippedRelativeToCentral = new Point([-relativeToCentral.x, relativeToCentral.y]);
            this.boardPoints[i] = /*snapToGrid(*/central.plus(flippedRelativeToCentral/*)*/);
        }
        
        for(var i=0; i<this.gridTriangles.length; i++){
            var leftmost = null;
            for(var j=0; j<3; j++){
                relativeToCentral = this.gridTriangles[i].boardPoints[j].minus(central);
                flippedRelativeToCentral = new Point([-relativeToCentral.x, relativeToCentral.y]);
                var flipped = /*snapToGrid(*/central.plus(flippedRelativeToCentral/*)*/);
                if(leftmost === null || flipped.x < leftmost.x){
                    leftmost = flipped;
                }
            }
            this.gridTriangles[i].setBoardPosition(this.gridTriangles[i].isPointingUp, leftmost);
        }
        
        this.snapToGrid();
    }
    
    toString(){
        var s = "fill color: " + this.fillColor;
        s += "\npoints: " + this.boardPoints;
        s += "\ntriangles: " + this.gridTriangles;

        return s;
    }
    
    toCookieString(){
        var s = "p" + indexOf(COLORS, this.fillColor);
        
        for(var i=0; i<this.boardPoints.length; i++){
            s += "," + this.boardPoints[i].toCookieString();
        }
        
        for(var i=0; i<this.gridTriangles.length; i++){
            s += "," + this.gridTriangles[i].toCookieString();
        }
        
        return s;
    }
}