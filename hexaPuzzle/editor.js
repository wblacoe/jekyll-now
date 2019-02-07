var editor = true;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//board
var triangleSideLength = 30;
var triangleHeight = Math.round(triangleSideLength * 0.866);
var triangleBox = new Point([triangleSideLength, triangleHeight]);
var boardCanvasOffset = new Point([0, 0]); //new Point([100, 50]);
var gridWidth = 20;
var gridHeight = 16;

var targetSpace = new TargetPolygon([gridWidth / 2 - 1, 0]);
var board = new Board([gridWidth, gridHeight, targetSpace]);




var mouseCanvasX, mouseCanvasY;
var isMouseDown = false;
var isMouseClicked = false;
var isMouseDragging = false;

canvas.onmousedown = function(e){
    isMouseDown = true;
};

canvas.onmouseup = function(e){
    isMouseDown = false;
    if(isMouseDragging){
        //MOUSE WAS DRAGGED
        isMouseDragging = false;
    }else{
        //MOUSE WAS CLICKED
        isMouseClicked = true;
        board.onMouseClick(mouseCanvasX, mouseCanvasY); //
    }
};

canvas.onmousemove = function(e){
    var rect = e.currentTarget.getBoundingClientRect();
    mouseCanvasX = Math.floor(e.clientX - rect.left);
    mouseCanvasY = Math.floor(e.clientY - rect.top);
    //print("onmousedown: (" + mouseCanvasX + ", " + mouseCanvasY + ")"); //DEBUG
    if(isMouseDown){
        isMouseDragging = true;
    }
};

var showPointer = false;



setInterval(
    function(){
        board.draw(ctx, mouseCanvasX, mouseCanvasY, showPointer, isMouseClicked, isMouseDragging);
        isMouseClicked = false;
    }, 10);
