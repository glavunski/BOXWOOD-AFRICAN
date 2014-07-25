﻿
var playGround = document.getElementById('gameholder');
var playGroundWidth = playGround.clientWidth;
var playGroundHeight = playGround.clientHeight;
var playGroundCornerX = playGround.offsetLeft;
var playGroundCornerY = playGround.offsetTop;
//var playGroundCornerX = parseInt(playGround.style.left.substr(0, playGround.style.left.length - 2));
//var playGroundCornerY = parseInt(playGround.style.top.substr(0, playGround.style.top.length - 2));

setInterval(getPlayerPosition, 250);

function getPlayerPosition() {
    var player = document.getElementById('player');
    var playerWidth = player.clientWidth;
    var playerHeight = player.clientHeight;
    var playerCornerX = parseInt(player.style.left.substr(0, player.style.left.length - 2));
    var playerCornerY = parseInt(player.style.top.substr(0, player.style.top.length - 2));
    //console.log(player);
    var playerX = playerCornerX + playerWidth / 2;
    var playerY = playerCornerY + playerHeight / 2;
    console.log('playerX:' + playerX + ' playerY:' + playerY);

    //enemy image Size:
    var enemyWidht = 50;
    var enemyHeight = 50;

    var randomQuadrant = Math.floor(Math.random() * 8) + 0;
    switch (randomQuadrant) {
        case 0: {
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1)) - enemyWidht;
            randomY = Math.floor(Math.random() * (playGroundCornerY + 1)) - enemyHeight;
            break;
        }
        case 1: {
            randomX = Math.floor(Math.random() * (playGroundWidth + 1)) + playGroundCornerX - enemyWidht;
            randomY = Math.floor(Math.random() * (playGroundCornerY + 1)) - enemyHeight;
            break;
        }
        case 2: {
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1)) + playGroundWidth + playGroundCornerX - enemyWidht;
            randomY = Math.floor(Math.random() * (playGroundCornerY + 1)) - enemyHeight;
            break;
        }
        case 3: {
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1)) - enemyWidht;;
            randomY = Math.floor(Math.random() * (playGroundHeight + 1)) + playGroundCornerY - enemyHeight;;
            break;
        }
        case 4: {
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1)) + playGroundWidth + playGroundCornerX;
            randomY = Math.floor(Math.random() * (playGroundHeight + 1)) + playGroundCornerY - enemyHeight;
            break;
        }
        case 5: {
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1 )) - enemyWidht;
            randomY = Math.floor(Math.random() * (playGroundCornerY + 1 + enemyHeight)) + playGroundCornerY + playGroundHeight - enemyHeight;
            break;
        }
        case 6: {
            randomX = Math.floor(Math.random() * (playGroundWidth + 1 + enemyWidht)) + playGroundCornerX - enemyWidht;
            randomY = Math.floor(Math.random() * (playGroundCornerY + 1)) + playGroundCornerY + playGroundHeight;
            break;
        }
        case 7: {
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1)) + playGroundWidth + playGroundCornerX;
            randomY = Math.floor(Math.random() * (playGroundCornerY + 1 + enemyHeight)) + playGroundCornerY + playGroundHeight - enemyHeight;
            break;
        }
        default: { randomX = 0; randomY = 0; }
    }
    var newEnemy = document.createElement('div');
    newEnemy.style.backgroundImage = 'url("images/enemy1.png")';
    newEnemy.style.width = enemyWidht + 'px';
    newEnemy.style.height = enemyHeight + 'px';
    newEnemy.style.display = 'inline-block';
    newEnemy.style.position = 'absolute';
    newEnemy.style.left = (randomX) + 'px';
    newEnemy.style.top = (randomY) + 'px';
    document.body.appendChild(newEnemy);
    console.log(randomQuadrant);
}