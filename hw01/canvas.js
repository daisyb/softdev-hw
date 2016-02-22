

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var button = document.getElementById("clear");
var toggle = document.getElementById("toggle");
var button2 = document.getElementById("reset");
var mousedown = false;
var drawmode = true;
/*
ctx.beginPath();
ctx.moveTo(250,250);
ctx.quadraticCurveTo(250,250,400,250);
ctx.quadraticCurveTo(250,250,200,300);
//ctx.closePath();
ctx.stroke();
ctx.fill();
*/

var clear = function(e){
    e.preventDefault();
    ctx.clearRect(0,0,500,500);
    resetPath(e);
};

var x,y;
var dot = function(e){
    e.preventDefault();
    ctx.beginPath()
    ctx.arc(e.offsetX,e.offsetY,5,0, Math.PI*2);
    ctx.fill();
    ctx.moveTo(x,y);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    x=e.offsetX;
    y=e.offsetY;
}

var resetPath = function(e){
    x = undefined;
    y = undefined;
}

var draw = function(e){
    e.preventDefault();
    if (mousedown){
	ctx.beginPath();
	ctx.arc(e.offsetX,e.offsetY,2,0,Math.PI*2);
	ctx.fill();
    }
}

var mouseupdown = function(e){
    mousedown = !mousedown;
}

var changeMode = function(e){
    drawmode = !drawmode;
    if (drawmode){
	toggle.innerHTML = "Dot Lines";
	document.getElementById("mode").innerHTML = "Draw Mode";
	c.removeEventListener("click",dot);
	c.addEventListener("mousedown", mouseupdown);
	c.addEventListener("mouseup", mouseupdown);
	c.addEventListener("mousemove", draw);
    } else {
	toggle.innerHTML = "Draw";
	document.getElementById("mode").innerHTML = "Dot Line Mode";
	c.removeEventListener("mousedown",mouseupdown);
	c.removeEventListener("mouseup",mouseupdown);
	c.removeEventListener("mousemove",draw);
	c.addEventListener("click", dot);	
    }
}

changeMode();

button.addEventListener("click", clear);
button2.addEventListener("click",resetPath);
toggle.addEventListener("click",changeMode);
