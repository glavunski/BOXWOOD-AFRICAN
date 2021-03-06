var playGround = document.getElementById('gameholder');
var playGroundLeft = parseInt(playGround.offsetLeft);
var playGroundTop = parseInt(playGround.offsetTop);
var playGroundWidth = parseInt(playGround.clientWidth);
var playGroundHeight = parseInt(playGround.clientHeight);


var player = document.getElementById('player');
var playerWidth = player.clientWidth;
var playerHeight = player.clientHeight;
player.style.left = (playGroundLeft - playerWidth / 2 + playGroundWidth / 2) + 'px';
player.style.top = (playGroundTop - playerHeight / 2 + playGroundHeight / 2) + 'px';
var playerX = parseInt(player.style.left);
var playerY = parseInt(player.style.top);

var lives = 999;




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
    var userPosReal = getPlayerPosition();
    for (var i in allEnemies) {
        if (allEnemies[i].nodeName === 'DIV') {
            var enemyRadius = parseInt(allEnemies[i].style.width.toString().substr(0, allEnemies[i].style.width.toString().length - 2)) / 2;
            if (allEnemies[i].style.left == '') {
                allEnemies[i].style.left = parseInt(allEnemies[i].offsetLeft) + 'px';
                allEnemies[i].style.top = parseInt(allEnemies[i].offsetTop) + 'px';
                userPos[0] -= enemyRadius;
                userPos[1] -= enemyRadius;
            }
            var enemyX = parseFloat(allEnemies[i].style.left.toString().substr(0, allEnemies[i].style.left.toString().length - 2));
            var enemyY = parseFloat(allEnemies[i].style.top.toString().substr(0, allEnemies[i].style.top.toString().length - 2));
            var enemyCenterX = enemyX - enemyRadius;
            var enemyCenterY = enemyY - enemyRadius;
            var userPos = [userPosReal[0] - enemyRadius, userPosReal[1] - enemyRadius];
            var deltaX = userPos[0] - enemyX;
            var deltaY = userPos[1] - enemyY;
            var angleInDegrees = Math.atan(deltaY / deltaX);// * 180 / Math.PI;
            if (Math.abs(userPos[0] - (enemyX + Math.cos(angleInDegrees) * movement)) < Math.abs(userPos[0] - (enemyX - Math.cos(angleInDegrees) * movement))) {
                var newEnemyPosX = (enemyX + Math.cos(angleInDegrees) * movement);
            } else {
                var newEnemyPosX = (enemyX - Math.cos(angleInDegrees) * movement);
            }
            if (Math.abs(userPos[1] - (enemyY + Math.sin(angleInDegrees) * movement)) < Math.abs(userPos[1] - (enemyY - Math.sin(angleInDegrees) * movement))) {
                var newEnemyPosY = (enemyY + Math.sin(angleInDegrees) * movement);
            } else {
                var newEnemyPosY = (enemyY - Math.sin(angleInDegrees) * movement);
            }
            allEnemies[i].style.left = newEnemyPosX + 'px';
            allEnemies[i].style.top = newEnemyPosY + 'px';
            //check collision
            var distanceBetweenPlayer = Math.sqrt(Math.pow(newEnemyPosX - userPos[0], 2) + Math.pow(newEnemyPosY - userPos[1], 2));
            if (distanceBetweenPlayer < playerHeight / 2 + enemyRadius) {
                lives--;
                //allEnemies[i].removeEventListener;
                document.body.removeChild(allEnemies[i]);
                document.getElementById('lives').innerText = parseInt(document.getElementById('lives').innerText) - 1;
            }
        }
    }
}
window.onload = function movement() {
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    function loop() {
        tick();

        setTimeout(loop, tickRate);
        moveEnemies(5);

    }

    loop();
};
