var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var radius = 5;
var dr;

var growCircle = function(){
    if (radius*2 >= c.width || radius*2 >= c.height){
	dr = -.5;
    } else if (radius <= 5){
	dr = .5;
    } 
    //clear screen
    ctx.clearRect(0,0,c.width,c.height);
    //draw circle
    ctx.beginPath();
    ctx.arc(c.width/2,c.height/2,radius,0, Math.PI*2);
    ctx.fill();
    //reset radius
    radius = radius + dr;
}

setInterval(growCircle,10);

