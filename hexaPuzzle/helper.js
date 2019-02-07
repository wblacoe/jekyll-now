//colors
var RED = 0;
var GREEN = 1;
var BLUE = 2;
var YELLOW = 3;
var WHITE = 4;
var LIGHT_GRAY = 5;
var DARK_GRAY = 6;
var BLACK = 7;
COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ffffff", "#dddddd", "#aaaaaa", "#000000"];




function print(message){
    document.getElementById('box').innerHTML = message + "\n";
}

function append(message){
    document.getElementById('box').innerHTML += message + "\n";
}


function gridToCanvasPoint(gridX, gridY){
    return new Point([boardCanvasOffset.x + gridX * triangleSideLength, boardCanvasOffset.y + gridY * triangleHeight]);
}

function gridToBoardPoint(gridX, gridY){
    return new Point([gridX * triangleSideLength, gridY * triangleHeight]);
}

function canvasToBoardPoint(canvasX, canvasY){
    return new Point([canvasX - boardCanvasOffset.x, canvasY - boardCanvasOffset.y]);
}

function boardToCanvasPoint(boardX, boardY){
    return new Point([boardCanvasOffset.x + boardX, boardCanvasOffset.y + boardY]);
}


function indexOf(list, needle) {
    for(var i=0; i<list.length; i++){
        if(list[i] === needle){
            return i;
        }
    }
    
    return null;
};

function contains(list, needle){
    return indexOf(list, needle) !== null;
}

function getIndexOf(list, needle) {
    for(var i=0; i<list.length; i++){
        if(list[i].equals(needle)){
            return i;
        }
    }
    
    return -1;
};

//returns first (list) index of any element in [elements] found in [list]
function getFirstIndexOf(list, elements){
    for(var i=0; i<list.length; i++){
        for(var j=0; j<elements.length; j++){
            if(list[i].equals(elements[j])){
                return i;
            }
        }
    }
    
    return -1;
}

function spliceList(insertIntoThisList, start, removeAmount, insertThisList){
    var a = [start, removeAmount].concat(insertThisList);
    Array.prototype.splice.apply(insertIntoThisList, a);
}

function concatLists(list1, list2){
    var r = [];
    
    for(var i=0; i<list1.length; i++){
        r.push(list1[i]);
    }
    
    for(var i=0; i<list2.length; i++){
        r.push(list2[i]);
    }
    
    return r;
}

//given mouse event
/*function getMouseCanvasPoint(e){
    var rect = e.currentTarget.getBoundingClientRect();
    mouseCanvasX = Math.floor(e.clientX - rect.left);
    mouseCanvasY = Math.floor(e.clientY - rect.top);
    
    return new Point([mouseCanvasX, mouseCanvasY]);
}*/

//given mouse event
function getMouseBoardPoint(e){
    var rect = e.currentTarget.getBoundingClientRect();
    
    //print("current target = " + e.currentTarget.toString() + "\nrect = " + rect.toString() + "\ntype = " + e.type + "\ntouches = " + e.touches + "\nchanged touches = " + e.changedTouches + "\noriginal event = " + e.originalEvent);
    //print("hello");
    
    var mousePageX, mousePageY;
    switch(e.type.substring(0, 5)){
        case "mouse":
            mousePageX = e.pageX;
            mousePageY = e.pageY;
            break;
        case "touch":
            var touch = e.touches[0] || e.changedTouches[0];
            mousePageX = touch.pageX;
            mousePageY = touch.pageY;
            break;
    }
    
    mouseCanvasX = mousePageX - rect.left - window.pageXOffset;
    mouseCanvasY = mousePageY - rect.top - window.pageYOffset;
    
    var canvasStyle = window.getComputedStyle(canvas);
    var canvasStyleWidth = parseInt(canvasStyle.getPropertyValue("width"));
    var canvasStyleHeight = parseInt(canvasStyle.getPropertyValue("height"));
    mouseCanvasX = Math.round(mouseCanvasX * canvas.width / canvasStyleWidth);
    mouseCanvasY = Math.round(mouseCanvasY * canvas.height / canvasStyleHeight);
    var mouseBP = canvasToBoardPoint(mouseCanvasX, mouseCanvasY);
    
    /*print("rect = (" + rect.left + ", " + rect.top + ")\nmouse on page = (" + mousePageX + ", " + mousePageY + ")\nwindow page offset = (" + window.pageXOffset + ", " + window.pageYOffset + ")");
    append("canvas = " + canvas.width + " x " + canvas.height);
    append("canvas css = " + canvasStyle.getPropertyValue("width") + " x " + canvasStyle.getPropertyValue("height"));
    append("canvas css parsed = " + canvasStyleWidth + " x " + canvasStyleHeight);
    append("mouse on board = (" + mouseBP.x + ", " + mouseBP.y + ")");*/
    
    return mouseBP;
}

function snapToGrid(boardPoint){
    var row = Math.round(boardPoint.y / triangleHeight);
    var ry = row * triangleHeight;
    var rx;
    if(row % 2 === 0){
        rx = Math.round(boardPoint.x / triangleSideLength) * triangleSideLength;
    }else{
        rx = (Math.floor(boardPoint.x / triangleSideLength) + 0.5) * triangleSideLength;
    }
  
    //append("snapped to grid: (" + rx + ", " + ry + ")");
    return new Point([rx, ry]);
}

function dictionaryToString(dictionary){
    var s = "{\n";
    for(var attribute in dictionary){
        s += attribute + ": " + dictionary[attribute] + "\n";
    }
    return s + "\n}";
}

function canvasHasFocus(e){
    var amountOfTouches = 0;
    if(e.touches !== null && e.touches !== undefined){
        amountOfTouches += e.touches.length;
    }
    
    print("touches = " + amountOfTouches);
    
    return amountOfTouches < 2;
}