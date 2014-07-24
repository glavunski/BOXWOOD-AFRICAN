var playerX=parseInt(document.getElementById('player').style.left);
var playerY=parseInt(document.getElementById('player').style.top);
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
            playerX = playerX - 5;
        }
    } else if (keyArrowRight) {
        if (playerX < 810) {
            playerX = playerX + 5;
        }
    }
     if(keyArrowUp){
        if (playerY > 25) {
            playerY = playerY -5;
        }
    }else if(keyArrowDown){
        if (playerY < 380) {
            playerY = playerY +5;
        }
    }

    document.getElementById('player').style.left=playerX.toString() + "px";
    document.getElementById('player').style.top=playerY.toString() + "px";

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
