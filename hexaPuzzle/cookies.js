function setCookie(attribute, value){
    document.cookie = attribute + "=" + value + ";";
}

function removeCookie(attribute){
    document.cookie = attribute + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function getCookie(attribute){
    var pairs = decodeURIComponent(document.cookie).split(";");
    
    for(var i=0; i<pairs.length; i++){
        var pair = pairs[i];
        
        //remove initial spaces
        while(pair.charAt(0) === " ") {
            pair = pair.substring(1);
        }
        
        //check if current pair has given attribute
        if(pair.indexOf(attribute) === 0){
            return pair.substring(attribute.length + 1);
        }
    }
    
    return null;
}

function hasCookie(attribute){
    return (getCookie(attribute) !== null);
}

function getAllCookies(){
    var pairs = decodeURIComponent(document.cookie).split(";");
    
    var allCookies = {};
    for(var i=0; i<pairs.length; i++){
        var pairString = pairs[i];
        var pair = pairString.split("=");
        if(pair[0] && pair[1]){
            allCookies[pair[0].trim()] = pair[1].trim();
        }
    }
    
    return allCookies;
}

function removeAllCookies(){
    var allCookies = getAllCookies();
    for(var attribute in allCookies){
        removeCookie(attribute);
    }
}

function getCookieString(){
    return document.cookie;
}

function getStringBefore(fullString, stopChar){
    for(var i=0; i<fullString.length; i++){
        if(fullString.charAt(i) === stopChar){
            return fullString.substring(0, i);
        }
    }
}

function removeFirstChar(string){
    return string.substring(1);
}

function removeFirstChars(string, n){
    return string.substring(n);
}

function createObjectFromCookieString(string){
    switch(string.charAt(0)){
        
        case "v": //point
            string = removeFirstChar(string); //skip "v"
            var x = getStringBefore(string, ",");
            string = removeFirstChars(string, x.length + 1); //remove x value and ","
            var y = getStringBefore(string, ",");
            string = removeFirstChars(string, y.length + 1);  //remove y value and ","
            return new Point([parseInt(x), parseInt(y)]);
            
        case "t": //triangle
            string = removeFirstChar(string); //skip "t"
            var isPointingUp = getStringBefore(string, ",");
            string = removeFirstChars(string, 2); //remove isPointingUp value and ","
            var leftmostBoardPoint = createObjectFromCookieString(string);
            return new Triangle([isPointingUp === "1", leftmostBoardPoint]);
            
        case "p": //piece
            string = removeFirstChar(string); //skip "p"
            var fillColor = getStringBefore(string, ",");
            string = removeFirstChars(string, fillColor.length + 1); //remove fillColor value and ","
            var piece = new Piece([COLORS[fillColor]]);
            
            var loop = true;
            while(loop){
                switch(string.substring(0, 1)){
                    case "v":
                        var point = createObjectFromCookieString(string);
                        string = removeFirstChars(string, point.toCookieString().length + 1);
                        piece.addBoardPoint(point.x, point.y);
                        break;
                    case "t":
                        var triangle = createObjectFromCookieString(string);
                        string = removeFirstChars(string, triangle.toCookieString().length + 1);
                        piece.addGridTriangle(triangle);
                        break;
                    default:
                        loop = false;
                }
            }
            return piece;
            
        case "b": //board
            string = removeFirstChar(string); //skip "b"
            var gridWidth = getStringBefore(string, ",");
            string = removeFirstChars(string, gridWidth.length + 1); //remove gridWidth value and ","
            var gridHeight = getStringBefore(string, ",");
            string = removeFirstChars(string, gridHeight.length + 1); //remove Height value and ","
            var targetSpace = new TargetPolygon([gridWidth / 2 - 1, (gridHeight - 12) / 2]);
            var board = new Board([gridWidth, gridHeight, targetSpace]);
            
            var i=0;
            while(string.length > 0){
                var piece = createObjectFromCookieString(string);
                string = removeFirstChars(string, piece.toCookieString().length + 1);
                i++;
                board.addPiece(piece);
            }
            return board;
    }
}