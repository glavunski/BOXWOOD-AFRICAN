
var playGround = document.getElementById('gameholder');
var playGroundWidth = playGround.clientWidth;
var playGroundHeight = playGround.clientHeight;
var playGroundCornerX = playGround.offsetLeft;
var playGroundCornerY = playGround.offsetTop;

var  randomX;
var  randomY;
setInterval(addEnemy, 250);

function addEnemy() {
	//select random enemy type
	var rndEnemyType = Math.floor(Math.random() * 3) + 0;
	    
	var newEnemy = document.createElement('div');
	var enemyWidht = 35;
	var enemyHeight = 35;
	switch (rndEnemyType){
		case 0: {
		    //enemy image Size:
			enemyWidht = 50;
			enemyHeight = 50;
			newEnemy.setAttribute('class', 'enemy');
			break;
		}
		case 1: {
		    //enemy image Size:
			enemyWidht = 35;
			enemyHeight = 35;
			newEnemy.setAttribute('class', 'enemy2');
			break;
		}
        case 2: {
            //enemy image Size:
            enemyWidht = 40;
            enemyHeight = 40;
            newEnemy.setAttribute('class', 'enemy3');
            break;
        }
	}


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
            randomX = Math.floor(Math.random() * (playGroundCornerX + 1)) - enemyWidht;
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
    //var newEnemy = document.createElement('div');
	//newEnemy.setAttribute('class', 'enemy');
    newEnemy.style.width = enemyWidht + 'px';
    newEnemy.style.height = enemyHeight + 'px';
    newEnemy.style.left = (randomX) + 'px';
    newEnemy.style.top = (randomY) + 'px';
    newEnemy.style.borderRadius = enemyWidht / 2 + 'px';
    document.body.appendChild(newEnemy);
    document.getElementById('enemiesCount').innerText = parseInt(document.getElementById('enemiesCount').innerText) + 1;
}
