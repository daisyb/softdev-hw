
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var clear = document.getElementById("clear");
var start = document.getElementById("start");
var stop = document.getElementById("stop");
ctx.fillStyle="blue";

var aniID;
var outer = function(){
    var x = 0;
    var y = 0;
    var dx = 1;
    var dy = 1;
    var rectW = 200;
    var rectH = 100;
    var bounce = function(){

	if(x == 0){
	    dx = 1;
	}
	if (x+rectW == c.width){
	    dx = -1;
	}
	if (y == 0){
	    dy = 1;
	}
	if (y+rectH == c.height){
	    dy = -1;
	}
	ctx.clearRect(0,0,c.width,c.height);
	ctx.beginPath();
	ctx.rect(x,y,rectW,rectH);
	ctx.stroke();
	x += dx;
	y += dy;

	aniID = window.requestAnimationFrame(bounce);
    }
    
    bounce();
}
clear.addEventListener("click",function(){
    ctx.clearRect(0,0,c.width,c.height);
});
start.addEventListener("click", outer);
stop.addEventListener("click",function(){
    window.cancelAnimationFrame(aniID);
});

