
var playerX=parseInt(document.getElementById('player').style.left);
var playerY=parseInt(document.getElementById('player').style.top);
var init = document.getElementById('player').style.webkitTransform.indexOf('(');
var fin = document.getElementById('player').style.webkitTransform.indexOf(')');

var playerR=parseInt(document.getElementById('player').style.webkitTransform.substr(init+1,fin-init-1));
var tickRate = 15,
    keyArrowLeft  = false,
    keyArrowRight = false,
    keyArrowUp = false,
    keyArrowDown = false;




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

var tick = function() {

    if (keyArrowLeft) {
        if (playerX > 150) {
            if(playerR>=-90){
                playerR-=7;
            }

            playerX = playerX - 5;
        }
    } else if (keyArrowRight) {
        if (playerX < 810) {
            playerX = playerX + 5;
            if(playerR<=90){
                playerR+=7;
            }
        }
    }
     if(keyArrowUp){
        if (playerY > 25) {
            if(playerR<=0){
                playerR+=7;
            }
            if(playerR>=5){
                playerR-=7;
            }
            playerY = playerY -5;
        }
    }else if(keyArrowDown){
        if (playerY < 380) {
            if(playerR<=180){
                playerR+=7;
            }

            playerY = playerY +5;
        }
    }





    document.getElementById('player').style.left=playerX.toString() + "px";
    document.getElementById('player').style.top=playerY.toString() + "px";
    document.getElementById('player').style.transform = "rotate(" + playerR.toString() + "deg)";


};






window.onload =function movement(){
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    function loop() {
        tick();
        setTimeout(loop, tickRate);

    }

    loop();
};
