
var pic = document.getElementById("vimg");
var rect = pic.getBoundingClientRect();
var width = rect.width;
var height = rect.height;
var numChildren = pic.childNodes.length -1; //so clear doesn't mess with border lines
var circleid = -1;
var rectid =-1;



//animation
var animateC = function(){
    var radius = 0;
    var dr;
    var id;

    var drawC = function(){
	clearpic();

	if (radius*2 >= width || radius*2 >= height){
	    dr = -.5;
	} else if (radius <= 5){
	    dr = .5;
	}
 
	var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
	c.setAttribute("cx",width/2);
	c.setAttribute("cy",height/2);
	c.setAttribute("r",""+radius);
	c.setAttribute("fill","red");
	c.setAttribute("stroke","black");
    
	radius += dr;
	pic.appendChild(c);

    }
    if (circleid == -1){
	stopEverything();
	circleid = setInterval(drawC,16);
    }
}

var animateR = function(){
    var rwidth = 50;
    var rheight = 30;
    var x = Math.floor(Math.random()*(width-rwidth) + 1);
    var y = Math.floor(Math.random()*(height-rheight) + 1);
    var dx = 1;
    var dy = 1;

    var drawR = function(){
	clearpic();

	if (x == 0 || x+rwidth == width){
	    dx = -dx;
	}
	if (y == 0 || y+rheight == height){
	    dy = -dy;
	}

	var r = document.createElementNS("http://www.w3.org/2000/svg","rect");
	r.setAttribute("x",x);
	r.setAttribute("y",y);
	r.setAttribute("width",rwidth);
	r.setAttribute("height",rheight);
	r.setAttribute("fill","black");

	pic.appendChild(r);
	x += dx;
	y += dy;

    }
    if (rectid == -1){
	stopEverything();
	rectid = setInterval(drawR,16);
    }
}

//button functions

var clearpic = function(){
    if (pic.childNodes.length -1 == numChildren){
	pic.removeChild(pic.childNodes[numChildren]); //so it doesn't mess with border lines
    }
}

var stopEverything = function(e){
    clearInterval(circleid);
    clearInterval(rectid);
    circleid = -1;
    rectid = -1;
}


//buttons
var circle = document.getElementById("startC");
circle.addEventListener("click", animateC);

var bounce = document.getElementById("bounce");
bounce.addEventListener("click",animateR);

var stop = document.getElementById("stop");
stop.addEventListener("click", stopEverything);

var clear = document.getElementById("clear");
clear.addEventListener("click", function(e){
    clearpic();
    stopEverything();
}
);

