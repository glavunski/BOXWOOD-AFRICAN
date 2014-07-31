var createEye = function () {
    var eyes = [];
    var eye;
    var lens;


    eye = document.createElement("div");
    eye.classList.add("eye");
    eye.id = "eye1";
    lens = document.createElement("span");
    eye.appendChild(lens);

    document.getElementById('player').appendChild(eye);
    eyes.push({
        iris: eye,
        lens: lens
    });

    return eyes;

};
var createEye2 = function () {
    var eyes2 = [];
    var eye2;
    var lens2;


    eye2 = document.createElement("div");
    eye2.classList.add("eye2");
    eye2.id = "eye12";
    lens2 = document.createElement("span");
    eye2.appendChild(lens2);
    document.getElementById('player').appendChild(eye2);
    eyes2.push({
        iris: eye2,
        lens: lens2
    });

    return eyes2;

};

var eyes = createEye();
var eyes2 = createEye2();


document.addEventListener("mousemove", function (event) {

    var x = event.pageX;
    var y = event.pageY;


    var init = document.getElementById('player').style.transform.indexOf('(');
    var fin = document.getElementById('player').style.transform.indexOf(')');
    var angle=parseFloat(document.getElementById('player').style.transform.substr(init+1,fin-init-1))*Math.PI/180 ;


    eyes.forEach(function (eye) {

        var offsets = eye.lens.getBoundingClientRect();
        var left = (offsets.left - x);
        var top = (offsets.top - y);
        var rad = Math.atan2(top, left);


        eye.iris.style.webkitTransform = "rotate(" + (rad -angle)+ "rad)";
        eye.iris.style.MozTransform = "rotate(" + (rad -angle) + "rad)";
        eye.iris.style.msTransform = "rotate(" + (rad -angle) + "rad)";
    });
    eyes2.forEach(function (eye2) {

        var offsets = eye2.lens.getBoundingClientRect();
        var left = (offsets.left - x);
        var top = (offsets.top - y);
        var rad = Math.atan2(top, left);

        eye2.iris.style.webkitTransform = "rotate(" + (rad -angle) + "rad)";
        eye2.iris.style.MozTransform = "rotate(" + (rad -angle) + "rad)";
        eye2.iris.style.transform = "rotate(" + (rad -angle) + "rad)";

    });

});
