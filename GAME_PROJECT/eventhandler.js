var playerX=parseInt(document.getElementById('player').style.left);
var tickRate = 30,
    keyArrowLeft  = false,
    keyArrowRight = false;

function movement(){

    document.addEventListener('keydown', function(event) {

        switch(event.keyCode){
            case 37:
                keyArrowLeft = true; break;
            case 39:
                keyArrowRight= true;  break;
        }
    }, false);

    document.addEventListener('keyup', function(event) {

        switch(event.keyCode){
            case 37: keyArrowLeft = false; break;
            case 39:  keyArrowRight= false; break;
        }

    }, false);

    var tick = function() {
        var limit = parseInt(document.getElementById('gameholder').style.marginLeft);
        if (keyArrowLeft) {
            if (playerX > limit) {
                playerX = playerX - 5;
            }
        } else if (keyArrowRight) {
            if (playerX < limit+800) {
                playerX = playerX +5;
            }
        }

        document.getElementById('player').style.left=playerX.toString() + "px";
        setTimeout(tick, tickRate);
    };

    tick();

}
movement();