var statenames = ["Iowa","New Hampshire","Nevada","South Carolina","Alabama","Alaska","Arkansas",'Colorado','Georgia','Massachusetts','Minnesota','Oklahoma','Tennessee','Texas','Vermont','Virginia','American Samoa','Kansas','Kentucky','Louisiana','Maine','Nebraska','Puerto Rico','Hawaii','Idaho','Michigan','Mississippi','DC','Wyoming','Florida','Illinois','Missouri','North Carolina','Ohio','Arizona','Utah','Washington','Wisconsin','New York','Connecticut','Delaware','Maryland','Pennsylvania','Rhode Island','Indiana','West Virginia','Oregon','California','Montana','New Jersey','New Mexico','North Dakota','South Dakota'];
var republicans = [23,20,28,50,50,28,39,0,72,42,38,40,58,155,16,46,0,0,40,46,41,23,23,19,32,59,37,19,11,99,65,0,71,66,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,30,0,0,58,40,44,42,95,28,16,38,71,19,57,34,44,28,172,27,51,24,28,29];
var democrats = [44,24,35,53,53,0,32,66,102,91,77,38,67,222,16,95,6,0,33,0,51,25,25,0,0,0,127,34,0,0,198,135,0,104,141,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,67,0,34,0,0,0,45,34,27,0,0,18,18,0,0,64,0,0,85,37,118,96,291,70,31,118,210,33,92,37,61,74,546,27,142,43,23,25];

//used for scaling
var sdems = democrats;
var sreps = republicans;

//organizes data
var processDels = function(data){
    var tmp = [];
    for(i = 0; i < data.length/2; i++){
        tmp[i] = {};
        tmp[i]["norm"] = data[i];
        tmp[i]["spec"] = data[Math.floor(i + data.length/2)];
    }
    return tmp;
}

var makePartyData = function(data,b){
    var states = b;
    var tmp = [];
    for(i = 0; i < states.length && i < data.length; i++){
        tmp[i] = {};
        tmp[i]["name"] = states[i];
        tmp[i]["dels"] = data[i];
    }
    return tmp;
}

//creates scale function based on window size 
//and whether dem or republican 
var makeScale = function(isDem){
    if (isDem){
	var rightBound = d3.max(sdems);
    } else {
	var rightBound = d3.max(sreps);
    }
    
    var scale = d3.scale.linear()
	.domain([0,rightBound])
	.range([0, window.innerWidth * .35]);

    return scale;
}

//event listeners
var repB = document.getElementById("repb");
var demB = document.getElementById("demb");

repB.addEventListener("click",function(e){
    e.preventDefault();
    clearTable();
    makeTable(false, makeScale(false));
});

demB.addEventListener("click",function(e){
    e.preventDefault();
    clearTable();
    makeTable(true, makeScale(true));
});

//stores delegates for each state
democrats = makePartyData(processDels(democrats),statenames);
republicans = makePartyData(processDels(republicans),statenames);


var tmp = [];
for(i = 0; i < republicans.length && i < democrats.length; i++){
	tmp[i] = {};
	tmp[i]["dem"] = democrats[i];
	tmp[i]["rep"] = republicans[i];
};

//removes all children of table
var clearTable = function(){
    d3.select("#maintable").selectAll("*").remove();
};


//Creates table header and bars
//takes boolean for whether dem or republican and
//scaling function for bar width
var makeTable = function(isDemocrat, scale){
    table = d3.select("#maintable");
    //head

    if(isDemocrat){
	var headerData = ["Democrats (4,050/4,763)"];
    } else {
	var headerData = ["Republicans (1,719/2,472)"];
    }

    table.append("thead").append('tr')
	.selectAll("th")
	.data(headerData)
	.enter().append('th')
	.text( function(d) {
	    return d;
	});



    //body
    var tr = table.append("tbody").selectAll("tr").data(tmp).enter().append('tr')
    
    //state names
    tr.append('td')
	.append("div")
	.text(function(d){return d["dem"]["name"];});
    
    //bars
    var party;
    if (isDemocrat){
	party = "dem";
    } else {
	party = "rep";
    }
    
    tr.append('td')
	.append("div")
	.attr("class", function(d){		    
	    if (d[party]["dels"]["norm"] < d[party]["dels"]["spec"]){
	    	return "bar unsepent";
	    } else {
	    	return "bar " + party;
	    }
	}).html(function(d) {	    	    
	    var txt = "<span class='right'>" +(d[party]["dels"]["norm"] + d[party]["dels"]["spec"]) + 
		"</span>" + "<span class='left'>"  +
		"</span>"; //the lazy way
		return txt;
	}).transition().style({width: function(d){
	    dels = d[party]["dels"]["norm"] + d[party]["dels"]["spec"] //these should be diffrentiated
	    return scale(dels) + "px" //should figure out better scale
	}})
    
};

//intial setup
makeTable(true, makeScale(true));
