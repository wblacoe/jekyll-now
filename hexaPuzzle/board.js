class Board{
    constructor(args){
        
        //pieces on this board
        this.pieces = [];
        
        //used for dragging pieces
        this.pieceBeforeBeingDragged = null;
        this.pieceBeingDragged = null;
        this.showPointer = false;
        
        if(args.length === 3){
            this.gridWidth = args[0];
            this.gridHeight = args[1];
            this.targetSpace = args[2];
        }
    }
    
    clear(ctx){
        ctx.clearRect(boardCanvasOffset.x, boardCanvasOffset.y, boardCanvasOffset.x + this.gridWidth * triangleSideLength, boardCanvasOffset.y + this.gridHeight * triangleHeight);
        //print("board canvas offset: " + boardCanvasOffset.toString() + ", grid width: " + this.gridWidth + ", grid height: " + this.gridHeight + ", triangle side length: " + triangleSideLength + ", triangle height: " + triangleHeight + "<br>" + "clear(" + boardCanvasOffset.x + ", " + boardCanvasOffset.y + ", " + (boardCanvasOffset.x + this.gridWidth * triangleSideLength) + ", " + (boardCanvasOffset.y + this.gridHeight * triangleHeight) + ")");
    }
    
    getPieceWithMouseOver(boardX, boardY){
        for(var i=0; i<this.pieces.length; i++){
            if(this.pieces[i].containsPoint(boardX, boardY)){
                //append("\nmouse is over " + this.pieces[i].toString());
                return this.pieces[i];
            }
        }
        
        //append("\nmouse is over no piece");
        return null;
    }
    
    drawLine(ctx, board1X, board1Y, board2X, board2Y){
        ctx.moveTo(boardCanvasOffset.x + board1X, boardCanvasOffset.y + board1Y);
        ctx.lineTo(boardCanvasOffset.x + board2X, boardCanvasOffset.y + board2Y);
    }
    
    drawGrid(ctx){
        var a = this.gridWidth;
        var b = this.gridHeight;
        var h = triangleHeight;
        var s = triangleSideLength;
        
        //print("a: " + a + ", b: " + b + ", h: " + h + ", s: " + s);
        
        ctx.beginPath();
        
        //diagonal lines
        for(var i=-b/2; i<a; i++){
            if(i<0){ //left corners
                this.drawLine(ctx, 0, h * -2 * i, s * (i+(b/2)), h * b);
                //this.drawLine(ctx, s * (i+(b/2)), 0, 0, h * (2*i+b));
                this.drawLine(ctx, s * (i+(b/2)), 0, 0, h * 2 * i + h * b);
            }else if(i>=a-(b/2)){ //right corners
                this.drawLine(ctx, s * i, 0, s * a, h * 2*(a-i));
                this.drawLine(ctx, s * a, h * 2 * (i-a+b/2), s * i, h * b);
            }else{ //middle part
                this.drawLine(ctx, s * i, 0, s * (i+(b/2)), h * b);
                this.drawLine(ctx, s * (i+(b/2)), 0, s * i, h * b);
            }
        }
        
        //horizontal lines
        for(var i=0; i<=b; i++){
            this.drawLine(ctx, 0, h * i, s * a, h * i);
        }
        
        //vertical lines
        this.drawLine(ctx, 0, 0, 0, h * b);
        this.drawLine(ctx, s * a, 0, s * a, h * b);
        
        ctx.strokeStyle = gridLinesColor;
        ctx.stroke();
        ctx.closePath();
    }
    
    addPiece(piece){
        this.pieces.push(piece);
    }
    
    drawPieces(ctx){
        for(var i=0; i<this.pieces.length; i++){
            this.pieces[i].draw(ctx);
        }
    }
    
    //returns the leftmost point of the grid triangle containing given point
    getGridTriangle(boardX, boardY){
        var blockX = Math.floor(boardX / triangleSideLength);
        var blockY = Math.floor(boardY / triangleHeight);
        var localX = boardX / triangleSideLength - blockX; // localX € [0,1]
        var localY = boardY / triangleHeight - blockY; // localY € [0,1]
        var gridX, gridY;
        if(blockY % 2 === 0){ //  |\/|
            if(localX <= 0.5 && localX*2 < localY){ //bottom left part
                gridX = blockX - 0.5;
                gridY = blockY + 1;
            }else if(localX > 0.5 && 1-(localX*2-1) < localY){ //bottom right part
                gridX = blockX + 0.5;
                gridY = blockY + 1;
            }else{ //middle triangle pointing down
                gridX = blockX;
                gridY = blockY;
            }
        }else{ //  |/\|
            if(localX <= 0.5 && 1-localX*2 > localY){
                gridX = blockX - 0.5;
                gridY = blockY;
            }else if(localX > 0.5 && localX*2-1 > localY){
                gridX = blockX + 0.5;
                gridY = blockY;
            }else{
                gridX = blockX;
                gridY = blockY + 1;
            }
        }
        var isTrianglePointingUp = ((gridX*2 + blockY) % 2 === 1);
        
        var triangle = new Triangle([
            isTrianglePointingUp,
            gridToBoardPoint(gridX, gridY),
            COLORS[GREEN],
            COLORS[BLACK],
            1,
            true]);
        
        //print(triangle.toString());
        return triangle;
    }
    
    drawPointer(ctx, boardX, boardY){
        //pointer triangle
        var triangle = this.getGridTriangle(boardX, boardY);
        triangle.draw(ctx);

        //pointer circle
        var canvasPoint = boardToCanvasPoint(boardX, boardY);
        var radius = 5;
        ctx.beginPath();
        ctx.arc(canvasPoint.x, canvasPoint.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.closePath();
    }
    
    isMouseOverBoard(boardX, boardY){
        return boardX >= 0 && boardY > 0 && boardX < this.gridWidth * triangleSideLength && boardY < this.gridHeight * triangleHeight;
    }
    
    getBorderingPiece(piece){
        for(var i=0; i<this.pieces.length; i++){
            if(this.pieces[i].bordersWithPiece(piece)){
                return this.pieces[i];
            }
        }
        
        return null;
    }
    
    //join given piece with all existing pieces that border with it
    //in the process remove all such existing pieces and return newly created unified piece (without adding it to this board)
    unifyWithPieces(piece){
        var r = piece;
        var amountOfUnifications = 0;
        while(true){
            var borderingPiece = this.getBorderingPiece(r);
            if(borderingPiece !== null){
                //append("bordering piece found");
                this.pieces.splice(this.pieces.indexOf(borderingPiece), 1); //remove existing piece from this board
                //append("removed bordering piece");
                r = borderingPiece.unifyWithPiece(r);
                amountOfUnifications++;
            }else{
                //append("no bordering piece found");
                break;
            }
        }
        
        //append("amount of unifications = " + amountOfUnifications);
        if(amountOfUnifications === 0){
            return null;
        }else{
            return r;
        }
    }
    
    overlapsWith(piece){
        for(var i=0; i<this.pieces.length; i++){
            if(this.pieces[i] !== piece && this.pieces[i].overlapsWith(piece)){
                return this.pieces[i];
            }
        }
        return null;
    }
    
    onMouseClick(mouseBoardX, mouseBoardY){
        //var mouseBoardPoint = canvasToBoardPoint(mouseCanvasX, mouseCanvasY);
        //var pieceWithMouseOver = this.getPieceWithMouseOver(mouseBoardPoint.x, mouseBoardPoint.y);
        var pieceWithMouseOver = this.getPieceWithMouseOver(mouseBoardX, mouseBoardY);
        
        //if mouse is not over an existing piece
        if(pieceWithMouseOver === null){
            if(editor){
                //var gridTriangle = this.getGridTriangle(mouseBoardPoint.x, mouseBoardPoint.y);
                var gridTriangle = this.getGridTriangle(mouseBoardX, mouseBoardY);
                //this.addGridTriangle(gridTriangle);

                //print("mouse click: (" + mouseCanvasX + ", " + mouseCanvasY + ")");
                //append("added triangle: " + gridTriangle.toString());

                /* check whether grid triangle borders with existing pieces
                for(var i=0; i<this.pieces.length; i++){
                    if(this.pieces[i].bordersWith(gridTriangle)){
                        append("triangle borders with piece #" + i + ": " + this.pieces.toString());
                    }
                }
                */

                var newPiece = gridTriangle.toPiece(COLORS[YELLOW], 1, COLORS[DARK_GRAY], true);
                if(this.pieces.length === 0){
                    //append("\nnew piece was added to board");
                    this.addPiece(newPiece);
                }else{
                    var unifiedPiece = this.unifyWithPieces(newPiece);
                    if(unifiedPiece !== null){
                        //append("\nunified piece was added to board");
                        this.addPiece(unifiedPiece);

                        //print("pieceFillColor = COLORS[YELLOW];");
                        //append("piece = new Piece([pieceFillColor]);");
                        for(var i=0; i<unifiedPiece.boardPoints.length; i++){
                            var bp = unifiedPiece.boardPoints[i];
                            //append("piece.addBoardPoint(" + bp.x + ", " + bp.y + ");");
                        }
                        for(var i=0; i<unifiedPiece.gridTriangles.length; i++){
                            var gt = unifiedPiece.gridTriangles[i];
                            //append("piece.addGridTriangle(new Triangle([" + gt.isPointingUp + ", new Point([" + gt.leftmostBoardPoint.x + ", " + gt.leftmostBoardPoint.y + "])]));");
                        }
                        //append("board.addPiece(piece);");

                    }else{
                        //append("\nnew piece was added to board");
                        this.addPiece(newPiece);
                    }
                }

                /*append("\npieces:");
                for(var i=0; i<this.pieces.length; i++){
                    append("* " + this.pieces[i].toString());
                }*/
            }
            
            
        //if mouse is over an existing piece
        }else{
            pieceWithMouseOver.rotate();
        }
    }
    
    onMouseDrag(mouseBoardX, mouseBoardY){
        var pieceWithMouseOver = null;
        if(!isMouseDragging){
            mouseStartDraggingBoardPoint = new Point([mouseBoardX, mouseBoardY]);
            pieceWithMouseOver = this.getPieceWithMouseOver(mouseBoardX, mouseBoardY);
        }
        isMouseDragging = true;
        isMouseClicked = false;
        
        //append("dragging mouse");
        //append("start at (" + mouseStartDraggingBoardPoint.x + ", " + mouseStartDraggingBoardPoint.y + ")");
        //append("now at (" + mouseBoardX + ", " + mouseBoardY + ")");
        
        var offset = new Point([mouseBoardX - mouseStartDraggingBoardPoint.x, mouseBoardY - mouseStartDraggingBoardPoint.y]);
        offset = snapToGrid(offset);
        //append("offset = " + offset.toString());
        
        if(this.pieceBeingDragged === null){
            if(pieceWithMouseOver !== null){
                this.pieceBeingDragged = pieceWithMouseOver;
                this.pieceBeforeBeingDragged = pieceWithMouseOver.getCopy();
            }
            
        }else if(this.pieceBeforeBeingDragged !== null){
            this.pieceBeingDragged.position(this.pieceBeforeBeingDragged, offset);
        }
        
        /*if(pieceWithMouseOver !== null && pieceWithMouseOver !== undefined){
            append("piece with mouse over: " + pieceWithMouseOver.toString());
        }
        append("piece being dragged: " + this.pieceBeingDragged.toString());
        append("piece before being dragged: " + this.pieceBeforeBeingDragged.toString());*/
    }
    
    onMouseReleased(mouseBoardX, mouseBoardY){
        isMouseDragging = false;
        if(this.pieceBeingDragged !== null){
            //check if dragged piece is overlapping with any other piece
            var overlappedPiece = this.overlapsWith(this.pieceBeingDragged);

            //if overlap then return dragged piece to original position
            if(overlappedPiece !== null){
                this.pieceBeingDragged.position(this.pieceBeforeBeingDragged, new Point([0, 0]));
            }

            //prepare variables for next piece drag
            this.pieceBeingDragged = null;
            this.pieceBeforeBeingDragged = null;
        }
    }
    
    onMouseHoldDown(mouseBoardX, mouseBoardY){
        isMouseClicked = false;
        var pieceWithMouseOver = this.getPieceWithMouseOver(mouseBoardX, mouseBoardY);
        
        if(pieceWithMouseOver !== null){
            pieceWithMouseOver.flip();
        }
    }
    
    draw(ctx, mouseCanvasX, mouseCanvasY/*, showPointer, isMouseClicked, isMouseDragging*/){
        var mouseBoardPoint = canvasToBoardPoint(mouseCanvasX, mouseCanvasY);
        
        this.clear(ctx);
        if(this.targetSpace !== undefined){
            this.targetSpace.draw(ctx);
            //print("target space: " + targetSpace);
        }
        this.drawGrid(ctx);

        //this.pieces[0].setFillColor(COLORS[YELLOW]);
        if(this.isMouseOverBoard(mouseBoardPoint.x, mouseBoardPoint.y)){
            //this.drawGridTriangle(ctx, mouseBoardX, mouseBoardY);
            //this.drawPointer(ctx, mouseBoardX, mouseBoardY);
            //var piece = this.pieceWithMouseOver(mouseBoardPoint.x, mouseBoardPoint.y);
            //if(piece !== null){
                //if(isMouseClicked){ piece.setFillColor(COLORS[GREEN]); }
                //if(isMouseDragging){ piece.setFillColor(COLORS[RED]); }
                //print("mouseX: " + mouseBoardX + ", mouseY: " + mouseBoardY + ", " + piece);
            if(this.showPointer){
                this.drawPointer(ctx, mouseBoardPoint.x, mouseBoardPoint.y);
            }
        }
        
        this.drawPieces(ctx);
        //this.drawGridTriangles(ctx);
    }
    
    toString(){
        var s = "board:";
        for(var i=0; i<this.pieces.length; i++){
            s += "\n\tpiece " + i + ":";
            for(var j=0; j<this.pieces[i].boardPoints.length; j++){
                s += "\n\t\tpoint " + j + ": " + this.pieces[i].boardPoints[j].toString();
            }
            for(var j=0; j<this.pieces[i].gridTriangles.length; j++){
                s += "\n\t\ttriangle " + j + ": " + this.pieces[i].gridTriangles[j].isPointingUp + ", " + this.pieces[i].gridTriangles[j].leftmostBoardPoint.toString();
            }
        }
        
        return s;
    }
 
    toCookieString(){
        var s = "b" + this.gridWidth + "," + this.gridHeight;
        
        for(var i=0; i<this.pieces.length; i++){
            s += "," + this.pieces[i].toCookieString();
        }
        
        return s;
    }
    
    fromCookieString(cookieString){
        
    }
    
}