function showNav() {
    document.getElementById("dropdown").style.display = "block";
    document.getElementById("arrow").src = "upArrow.png";
}
function hideNav() {
    document.getElementById("dropdown").style.display = "none";
    document.getElementById("arrow").src = "arrow.png";
}
function glow(anId, color) {
    document.getElementById(anId).style["-webkit-filter"] = "drop-shadow(-2px 0px 12px "+color+")";
    document.getElementById(anId).style["filter"] = "drop-shadow(-2px 0px 12px "+color+")";
}
function unglow(anId) {
    document.getElementById(anId).style["-webkit-filter"] = "";
    document.getElementById(anId).style["filter"] = "";
}

$.getJSON("galaxy.json", function(json) {
    gal = json;
});

$.getJSON("solarsystem.json", function(json) {
    sol = json;
});

$.getJSON("universe.json", function(json) {
    uni = json;
});

function ssTipInfo(element) {
    names = ["sun", "mercury", "venus", "earth", "mars", 
    "jupiter", "saturn", "uranus", "neptune", "moon", "asteroid", "comet", "pluto"];

    var theId = element.id.replace("_"," ");
    index = names.findIndex(item => item === theId);

    info = sol;

    if (index == -1) {
        names = ["stars", "kepler51d", "white dwarf", "neutron star", "black hole", "red dwarf"];
        index = names.findIndex(item => item === theId);
        info = gal;
    }

    if (index == -1) {
        names = ["supercluster", "big bang", "dark matter"]
        info = uni;
        index = names.findIndex(item => item === theId);

        edit("textTip", info[index].Blurb);
        edit("mass", "");
        edit("radius","");
        edit("temp","");
    }
    else {
        edit("textTip", info[index].Blurb);
        edit("mass", "Mass: "+info[index].Mass);
        edit("radius", "Radius: "+info[index].Radius);
        edit("temp", "Surface Temp: "+info[index].Temp);
    }

    document.getElementById("tip").setAttribute("src",theId+".jpg");
    edit("planet", capFirst(theId));

}

function showTip(element) {
    var rect = element.getBoundingClientRect();
    if (element.id == "saturn") {
        x = rect.left;
        y = rect.top;
        w = rect.width/1.5;
        h = rect.height;
    }
    else {
        x = rect.left;
        y = rect.top;
        w = rect.width;
        h = rect.height;
    }

    ssTipInfo(element);

    var el = document.getElementById("tool");

    el.style.display = "block";
    el.style.position = "fixed";

    var size = el.getBoundingClientRect();

    //if too right
    if (x + size.width + w >= window.innerWidth) {
        el.style.left = x - size.width + "px";
    }

    //if too left
    else if (x < 0) {
        el.style.left = x + size.width + "px";
    }

    //otherwise
    else {
        el.style.left = x + w + "px";
    }
    //if too low
    if (y + size.height + h >= window.innerHeight) {
        el.style.top = innerHeight - h - size.height + "px";
    }

    //if too high
    else if (y < 0){
        el.style.top = y + size.height + "px";
    }
    
    //otherwise
    else {
        el.style.top = y + "px";
    }

}
function hideTip() {
    document.getElementById("tool").style.display = "none";
}
function goTo(element, page) {
    window.location.assign(page+'.html#'+element.id);
}
function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function edit(theId, text) {
    document.getElementById(theId).innerHTML = text;
}
