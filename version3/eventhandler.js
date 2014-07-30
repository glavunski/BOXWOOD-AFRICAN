
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

var las=false;


var init = document.getElementById('player').style.transform.indexOf('(');
var fin = document.getElementById('player').style.transform.indexOf(')');

var playerR=parseInt(document.getElementById('player').style.transform.substr(init+1,fin-init-1));
var tickRate = 15,
    keyArrowLeft  = false,
    keyArrowRight = false,
    keyArrowUp = false,
    keyArrowDown = false;

var offsets1;
var offsets2;
var newEnemyPosX;
var newEnemyPosY;




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

function createLasers(event){


     offsets1 = document.getElementById("eye1").getBoundingClientRect();
        offsets2 = document.getElementById("eye12").getBoundingClientRect();


        var lazor = document.createElement("div");
        var lazor2 = document.createElement("div");

        var px = event.pageX;
        var py = event.pageY;


        lazor.className="lazers";
        lazor2.className="lazers";


        document.body.appendChild(lazor);
        document.body.appendChild(lazor2);

        var left = (offsets1.left - px);
        var top = (offsets1.top - py);
        var rad1 = Math.atan2(top, left);

        var left2 = (offsets2.left - px);
        var top2 = (offsets2.top - py);
     var rad2 = Math.atan2(top2, left2);



    lazor.style.position="absolute";
    lazor.style.height=5 + "px";
    lazor.style.width =5 + "px";
    lazor.style.borderRadius=30 + "px";
    lazor.style.zIndex = "5";
    lazor.style.boxShadow ="inset 0 10px 1px white, 0 0 7px red";
    lazor.style.backgroundColor = "red";
    lazor.style.TransformOrigin = "50% 100%";
    lazor.style.transform = "rotate(" + rad1 + "rad)";


    lazor2.style.position="absolute";
    lazor2.style.height=5 + "px";
    lazor2.style.width =5 + "px";
    lazor2.style.borderRadius=30 + "px";
    lazor2.style.zIndex = "5";
    lazor2.style.boxShadow ="inset 0 10px 1px white, 0 0 7px red";
    lazor2.style.backgroundColor = "red";
    lazor2.style.TransformOrigin = "50% 100%";
    lazor2.style.transform = "rotate(" + rad2 + "rad)";

    lazor.style.left =offsets1.left+5 + "px";
    lazor.style.top  =offsets1.top+6 + "px";



    lazor2.style.left =offsets2.left+5 + "px";
    lazor2.style.top  =offsets2.top+6 + "px";
    lazor2.style.transform = "rotate(" + rad2 + "rad)";

        las=true;


}

function checkLazerCollision(laser){

	var allEnemies1 = document.getElementsByClassName('enemy');
	var allEnemies2 = document.getElementsByClassName('enemy2');
    var allEnemies3 = document.getElementsByClassName('enemy3');
	//merge two node lists
    var firsten = mergeNodes( allEnemies1, allEnemies2 );
	var en =  mergeNodes( firsten, allEnemies3 );
    //var en =  document.getElementsByClassName('enemy');


        var cord =laser.getBoundingClientRect();


        if((cord.left>playGroundWidth+playGroundLeft)||
            (cord.left<playGroundLeft)||
            (cord.top>playGroundHeight+playGroundTop)||
            (cord.top<playGroundTop)){
            laser.parentNode.removeChild(laser);
        }

        for(var a=0;a<en.length;a++){
            var cordEn =en[a].getBoundingClientRect();
            var radleft = cordEn.left + 25;
            var radtop = cordEn.top + 25;
            var init = laser.style.transform.indexOf('(');
            var fin =   laser.style.transform.indexOf(')');
            var angle= parseFloat(laser.style.transform.substr(init+1,fin-init-1));





          var dist = Math.sqrt(Math.pow(radleft - cord.left,2) + Math.pow(radtop - cord.top,2));
  if(dist<=25){
      try{
      laser.parentNode.removeChild(laser);
      en[a].parentNode.removeChild(en[a]);
      }catch (err){
          console.log("error");
      }
  }


        }





}


var tick = function() {




    if (keyArrowLeft) { playerR-=10;}
else if (keyArrowRight) {  playerR+=10;}

     if(keyArrowUp){
	     var nextPosX = playerX + Math.cos(playerR*(Math.PI/180))*5;
		 var nextPosY = playerY + Math.sin(playerR*(Math.PI/180))*5;
		if ( (nextPosX > playGroundLeft && nextPosX < playGroundLeft + playGroundWidth - playerWidth  && nextPosY > playGroundTop && nextPosY < playGroundTop + playGroundHeight - playerHeight)) {//if (playerX > 150)
            playerX = nextPosX;
			playerY = nextPosY;
        }


    }else if(keyArrowDown){
		var nextPosX = playerX - Math.cos(playerR*(Math.PI/180))*5;
		var nextPosY = playerY - Math.sin(playerR*(Math.PI/180))*5;
		if ( true) {//if (playerX > 150)
			playerX = nextPosX;
			playerY = nextPosY;
        }
    }

	





if(las==true){
    var ls =     document.getElementsByClassName('lazers');

       for(var a=0;a<ls.length;a++) {
           var init = ls[a].style.transform.indexOf('(');
           var fin =  ls[a].style.transform.indexOf(')');
           var rad1= parseFloat(ls[a].style.transform.substr(init+1,fin-init-1));
           var len1 = parseInt(ls[a].style.width);
           var top1= parseInt(ls[a].style.top);
           var left1= parseInt(ls[a].style.left);



           top1+= -Math.sin(rad1)*15;
           left1+= -Math.cos(rad1)*15;


           if(len1<=30){
               len1+=5;
           }

           ls[a].style.left = left1.toString() + "px";
           ls[a].style.top = top1.toString() + "px";
           ls[a].style.width = len1.toString() + "px";
           checkLazerCollision(ls[a]);
       }

   }
    document.getElementById('player').style.left=playerX.toString() + "px";
    document.getElementById('player').style.top=playerY.toString() + "px";
    document.getElementById('player').style.transform = "rotate(" + playerR + "deg)";


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

var mergeNodes = function(a, b) {
	return [].slice.call(a).concat([].slice.call(b));
};

function moveEnemies(movement) {

    var allEnemies1 = document.getElementsByClassName('enemy');
	var allEnemies2 = document.getElementsByClassName('enemy2');
    var allEnemies3 = document.getElementsByClassName('enemy3');
	//merge two node lists
	var allEnemies4 = mergeNodes( allEnemies1, allEnemies2 );
    var allEnemies= mergeNodes( allEnemies3, allEnemies4 );
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
               newEnemyPosX = (enemyX + Math.cos(angleInDegrees) * movement);
            } else {
                newEnemyPosX = (enemyX - Math.cos(angleInDegrees) * movement);
            }
            if (Math.abs(userPos[1] - (enemyY + Math.sin(angleInDegrees) * movement)) < Math.abs(userPos[1] - (enemyY - Math.sin(angleInDegrees) * movement))) {
               newEnemyPosY = (enemyY + Math.sin(angleInDegrees) * movement);
            } else {
                newEnemyPosY = (enemyY - Math.sin(angleInDegrees) * movement);
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
                document.getElementById('enemiesCount').innerText = parseInt(document.getElementById('enemiesCount').innerText) - 1;
            }
        }
    }
}



window.onload =function movement(){

    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('mousedown', createLasers, false);
    function loop() {
        tick();

        setTimeout(loop, tickRate);
        moveEnemies(1);

    }

    loop();
};
