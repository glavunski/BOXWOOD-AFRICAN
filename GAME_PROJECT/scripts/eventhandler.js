var playGround = document.getElementById('gameholder');
var playGroundLeft = parseInt(playGround.offsetLeft);
var playGroundTop = parseInt(playGround.offsetTop);
var playGroundWidth = parseInt(playGround.clientWidth);
var playGroundHeight = parseInt(playGround.clientHeight);

var player = document.getElementById('player');
var playerX = parseInt(player.style.left);
var playerY = parseInt(player.style.top);
var playerWidth = player.clientWidth;
var playerHeight = player.clientHeight;

var tickRate = 10,
    keyArrowLeft = false,
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
        keyArrowDown = true;
    }

}

function keyUp(event) {

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

var tick = function () {

    if (keyArrowLeft) {
        if (playerX > playGroundLeft) {//if (playerX > 150)
            playerX = playerX - 5;
        }
    } else if (keyArrowRight) {
        if (playerX < playGroundLeft + playGroundWidth - playerWidth) {//if (playerX < 810)
            playerX = playerX + 5;
        }
    }
    if (keyArrowUp) {
        if (playerY > playGroundTop) {//if (playerY > 25)
            playerY = playerY - 5;
        }
    } else if (keyArrowDown) {
        if (playerY < playGroundTop + playGroundHeight - playerHeight) {//if (playerY < 380)
            playerY = playerY + 5;
        }
    }

    document.getElementById('player').style.left = playerX.toString() + "px";
    document.getElementById('player').style.top = playerY.toString() + "px";

};
function getPlayerPosition() {
    var player = document.getElementById('player');
    var playerWidth = player.clientWidth;
    var playerHeight = player.clientHeight;
    var playerCornerX = parseInt(player.style.left.substr(0, player.style.left.length - 2));
    var playerCornerY = parseInt(player.style.top.substr(0, player.style.top.length - 2));
    //console.log(player);
    var playerX = playerCornerX + playerWidth / 2;
    var playerY = playerCornerY + playerHeight / 2;
    var playerPos = [];
    playerPos[0] = playerX;
    playerPos[1] = playerY;
    return playerPos;
    //console.log('playerX:' + playerX + ' playerY:' + playerY);
}
function moveEnemies(movement) {
    var allEnemies = document.getElementsByClassName('enemy');
    for (var i in allEnemies) {
        if (allEnemies[i].nodeName === 'DIV') {
            var userPos = getPlayerPosition();
            if (allEnemies[i].style.left == '') {
                allEnemies[i].style.left = parseInt(allEnemies[i].offsetLeft) + 'px';
                allEnemies[i].style.top = parseInt(allEnemies[i].offsetTop) + 'px';
            }
            var enemyX = parseInt(allEnemies[i].style.left.toString().substr(0, allEnemies[i].style.left.toString().length - 2))
            var enemyY = parseInt(allEnemies[i].style.top.toString().substr(0, allEnemies[i].style.top.toString().length - 2))
            var deltaX = userPos[0] - enemyX;
            var deltaY = userPos[1] - enemyY;
            var angleInDegrees = Math.atan(deltaY / deltaX) * 180 / Math.PI;
            var newEnemyPosX = (enemyX + Math.cos(angleInDegrees) * movement);
            var newEnemyPosY = (enemyY + Math.sin(angleInDegrees) * movement);
            allEnemies[i].style.left = newEnemyPosX + 'px';
            allEnemies[i].style.top = newEnemyPosY + 'px';
            //check collision
            if (true) {

            }
        }
    }
}
window.onload = function movement() {
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    function loop() {
        tick();
        moveEnemies(5);
        setTimeout(loop, tickRate);


    }

    loop();
};
