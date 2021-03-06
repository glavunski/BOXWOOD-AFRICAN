
var playerX=parseInt(document.getElementById('player').style.left);
var playerY=parseInt(document.getElementById('player').style.top);

var init = document.getElementById('player').style.webkitTransform.indexOf('(');
var fin = document.getElementById('player').style.webkitTransform.indexOf(')');
var las=false;

var playerR=parseInt(document.getElementById('player').style.webkitTransform.substr(init+1,fin-init-1));
var tickRate = 15,
    keyArrowLeft  = false,
    keyArrowRight = false,
    keyArrowUp = false,
    keyArrowDown = false;



var rad1;
var rad2;
var offsets1;
var offsets2;
function keyDown(event) {


    if (event.keyCode === 39) {
        keyArrowRight = true;
    } else if (event.keyCode === 37) {
        keyArrowLeft = true;
    }
    if (event.keyCode === 38) {
        keyArrowUp = true;
    } else if (event.keyCode === 40) {
        keyArrowDown= true;
    }

}

function keyUp(event){

    if (event.keyCode === 39) {
        keyArrowRight = false;
    } else if (event.keyCode === 37) {
        keyArrowLeft = false;
    }
    if (event.keyCode === 38) {
        keyArrowUp = false;
    } else if (event.keyCode === 40) {
        keyArrowDown = false;
    }

}

function laser(event){
    if(las==false){

      offsets1 = document.getElementById("eye1").getBoundingClientRect();
        offsets2 = document.getElementById("eye12").getBoundingClientRect();


        var lazor = document.createElement("div");
        var lazor2 = document.createElement("div");

        var px = event.pageX;
        var py = event.pageY;



        lazor.id = "lazer";
        lazor.className="lazers";
        lazor2.id = "lazer2";
        lazor2.className="lazers";
        document.body.appendChild(lazor);
        document.body.appendChild(lazor2);

        var left = (offsets1.left - px);
        var top = (offsets1.top - py);
        rad1 = Math.atan2(top, left);

        var left2 = (offsets2.left - px);
        var top2 = (offsets2.top - py);
      rad2 = Math.atan2(top2, left2);

        var ls =     document.getElementsByClassName('lazers');
        for(var i=0; i<ls.length; i++) {
            ls[i].style.position="absolute";
            ls[i].style.height=5 + "px";
            ls[i].style.width =5 + "px";
            ls[i].style.borderRadius=30 + "px";
            ls[i].style.zIndex = "5";
            ls[i].style.boxShadow ="inset 0 10px 1px white, 0 0 7px red";
            ls[i].style.backgroundColor = "red";
            ls[i].style.TransformOrigin = "50% 100%";
            ls[i].style.transform = "rotate(" + rad1 + "rad)";
        }


        ls[0].style.left =offsets1.left+5 + "px";
        ls[0].style.top  =offsets1.top+6 + "px";


        ls[1].style.left =offsets2.left+5 + "px";
        ls[1].style.top  =offsets2.top+6 + "px";
        ls[1].style.transform = "rotate(" + rad2 + "rad)";

        las=true;




    }
}

function checkCollision(){
    var ls =  document.getElementsByClassName('lazers');
    for(var i=0; i<ls.length; i=i+2) {
        var cord =ls[i].getBoundingClientRect();

        if(cord.left<0||cord.top<0||cord.left>810||cord.top>510){
            ls[i].parentNode.removeChild(ls[i]);
            ls[i+1].parentNode.removeChild(ls[i+1]);
        }


    }

}


var tick = function() {

    if(las==true){
        var ls =     document.getElementsByClassName('lazers');
        var len1 = parseInt(ls[0].style.width);
        var top1= parseInt(ls[0].style.top);
        var left1= parseInt(ls[0].style.left);



        var len2 = parseInt(ls[1].style.width);
        var top2= parseInt(ls[1].style.top);
        var left2= parseInt(ls[1].style.left);






        top1+= -Math.sin(rad1)*15;
        left1+= -Math.cos(rad1)*15;


        top2+= -Math.sin(rad2)*15;
        left2+=-Math.cos(rad2)*15;

    if(len1<=30){
        len1+=5;
        len2+=5;
    }





    }


    if (keyArrowLeft) {
                playerR-=10;

    } else if (keyArrowRight) {
                playerR+=10;
        }

     if(keyArrowUp){
       playerX +=Math.cos(playerR*(Math.PI/180))*5;
         playerY +=Math.sin(playerR*(Math.PI/180))*5;


    }else if(keyArrowDown){
         playerX -=Math.cos(playerR*(Math.PI/180))*5;
         playerY -=Math.sin(playerR*(Math.PI/180))*5;
    }




   if(las==true){

        ls[0].style.left =left1.toString() + "px";
        ls[0].style.top =top1.toString() + "px";
        ls[0].style.width=len1.toString() + "px";
       ls[1].style.left =left2.toString() + "px";
       ls[1].style.top =top2.toString() + "px";
       ls[1].style.width=len2.toString() + "px";

   }
    document.getElementById('player').style.left=playerX.toString() + "px";
    document.getElementById('player').style.top=playerY.toString() + "px";
    document.getElementById('player').style.transform = "rotate(" + playerR + "deg)";


};






window.onload =function movement(){
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('mousedown', laser, false);
    function loop() {
        tick();
        setTimeout(loop, tickRate);

    }

    loop();
};
