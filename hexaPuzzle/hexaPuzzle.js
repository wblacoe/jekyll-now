var editor = false;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//board
var triangleSideLength = 30;
var triangleHeight = Math.round(triangleSideLength * 0.866);
var triangleBox = new Point([triangleSideLength, triangleHeight]);
var boardCanvasOffset = new Point([0, 0]); //new Point([100, 50]);
var board = null;

//drawing triangular grid and board pieces
var gridLinesColor = COLORS[WHITE];
var piecesBorderWidth = 1;
var piecesBorderColor = COLORS[BLACK];
var piecesHaveBorder = true;


var mouseCanvasX, mouseCanvasY;
var isMouseDown = false;
var isMouseClicked = false;
var isMouseDragging = false;
var isMouseHeldDown = false; //has the event mouse-hold-down already been triggered (only once)?
var mouseStartDraggingBoardPoint = null;
var mouseBoardPoint = new Point([0, 0]);
var timeSinceMouseDownAndLastMoved = 0;
var holdDownLength = 700;


function preventDefaultIfMouseOverPiece(e){
    mouseBoardPoint = getMouseBoardPoint(e);
    var pieceWithMouseOver = board.getPieceWithMouseOver(mouseBoardPoint.x, mouseBoardPoint.y);
    if(pieceWithMouseOver !== null){
        e.preventDefault();
    }
}

function canvasOnMouseDown(e){
    preventDefaultIfMouseOverPiece(e);
    isMouseDown = true;
    isMouseClicked = true;
    
};

function canvasOnMouseUp(e){
    preventDefaultIfMouseOverPiece(e);
    isMouseDown = false;

    if(isMouseHeldDown){
        timeSinceMouseDownAndLastMoved = 0;
        isMouseHeldDown = false;

    }else if(isMouseDragging){ //MOUSE WAS DRAGGED
        mouseBoardPoint = getMouseBoardPoint(e);
        if(board !== null){
            board.onMouseReleased(mouseBoardPoint.x, mouseBoardPoint.y);
        }

    }else if(isMouseClicked){ //MOUSE WAS CLICKED
        mouseBoardPoint = getMouseBoardPoint(e);
        if(board !== null){
            board.onMouseClick(mouseBoardPoint.x, mouseBoardPoint.y);
        }
    }

    isMouseDragging = false;
    isMouseClicked = false;
    if(board !== null){
        var s = board.toCookieString() + ",";
        setCookie("level0", s);
        //alert(s);
    }
};

function canvasOnMouseMove(e){
    preventDefaultIfMouseOverPiece(e);
    mouseBoardPoint = getMouseBoardPoint(e);
    if(isMouseDown && !isMouseHeldDown){
        if(board !== null){
            board.onMouseDrag(mouseBoardPoint.x, mouseBoardPoint.y);
        }
    }
}

canvas.addEventListener("mousedown", canvasOnMouseDown, false);
canvas.addEventListener("touchstart", canvasOnMouseDown, false);

canvas.addEventListener("mouseup", canvasOnMouseUp, false);
canvas.addEventListener("touchend", canvasOnMouseUp, false);

canvas.addEventListener("mousemove", canvasOnMouseMove, false);
canvas.addEventListener("touchmove", canvasOnMouseMove, false);



var showMouse = false;


var interval = 30;
setInterval(
    function(){
        if(board !== null){
            board.draw(ctx, mouseCanvasX, mouseCanvasY);
        }
        if(!isMouseHeldDown && isMouseDown && !isMouseDragging){
            timeSinceMouseDownAndLastMoved += interval;
            if(timeSinceMouseDownAndLastMoved >= holdDownLength && board !== null){
                board.onMouseHoldDown(mouseBoardPoint.x, mouseBoardPoint.y);
                isMouseHeldDown = true;
            }
        }
        //print("mouse = " + mouseBoardPoint.toString() + "\nisMouseDown = " + isMouseDown + "\nisMouseClicked = " + isMouseClicked + "\nisMouseDragging = " + isMouseDragging + "\nisMouseHeldDown = " + isMouseHeldDown);
    }, interval);



/*var previousOrientation = window.orientation;
var checkOrientation = function(){
    if(window.orientation !== previousOrientation){
        previousOrientation = window.orientation;
        // orientation changed, do your magic here
    }
};

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);*/