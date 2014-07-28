
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


        var lazor = document.createElement("div");
        var lazor2 = document.createElement("div");
        lazor.id = "lazer";
        lazor.className="lazers";
        lazor2.id = "lazer2";
        lazor2.className="lazers";
        document.getElementById('eye1').getElementsByTagName('span')[0].appendChild(lazor);
        document.getElementById('eye12').getElementsByTagName('span')[0].appendChild(lazor2);

        var ls =     document.getElementsByClassName('lazers');
        for(var i=0; i<ls.length; i++) {
            ls[i].style.position="absolute";
            ls[i].style.height=5 + "px";
            ls[i].style.width =30 + "px";
            ls[i].style.left =30 + "px";
            ls[i].style.top =0 + "px";
            ls[i].style.borderRadius=30 + "px";
            ls[i].style.zIndex = "5";
            ls[i].style.boxShadow ="inset 0 0 30px #FFFFFF, 0 0 10px #E23130";
            ls[i].style.backgroundColor = "red";


        }
        las=true;




    }
}

var tick = function() {

    if(las==true){
        var ls =     document.getElementsByClassName('lazers');
        var len = parseInt(ls[0].style.width);
        var dis= parseInt(ls[0].style.left);

if(len>0&&len<=100){
    len+=30;
}
else if(len>30){
    len-=30;
    dis+=30;
}

  if(dis>=400){
          document.getElementById('lazer').parentNode.removeChild( document.getElementById('lazer'));
          document.getElementById('lazer2').parentNode.removeChild( document.getElementById('lazer2'));
          las=false;
      }

    }


    if (keyArrowLeft) {
        if (playerX > 150) {
            playerX = playerX - 5;
            if(playerR>=0&&playerR<=90){
                playerR-=10;
            }
            if(playerR<=180&&playerR>=90){
                playerR+=10;
            }
            if(playerR<=0&&playerR>=-90){
                playerR-=10;
            }
            if(playerR>=-270&&playerR<=-110){
                playerR+=10;
            }
           if(playerR==190||playerR==-280){
               playerR=-170;
           }

        }
    } else if (keyArrowRight) {
        if (playerX < 810) {
            playerX = playerX + 5;
            if(playerR>=0&&playerR<=90){
                playerR+=10;
            }
           if(playerR<=190&&playerR>=90){
                playerR-=10;
            }
            if(playerR<=0&&playerR>=-90){
                playerR+=10;
            }
            if(playerR>=-270&&playerR<=-90){
                playerR-=10;
            }
            if(playerR==-280||playerR==-190){
                playerR=80;
            }
        }
    }
     if(keyArrowUp){
        if (playerY > 25) {
            if(playerR<=0){
                playerR+=10;
            }
            if(playerR>=5){
                playerR-=10;
            }
            playerY = playerY -5;
        }
    }else if(keyArrowDown){
        if (playerY < 380) {
            if(playerR>=0&&playerR<=180){
                playerR+=10;
               }
             if(playerR<=0&&playerR>=-180){
                 playerR-=10;
             }
            playerY = playerY +5;
        }
    }




   if(las==true){
    for(var i=0; i<ls.length; i++) {
        ls[i].style.left =dis.toString() + "px";
        ls[i].style.width=len.toString() + "px";
    }
   }
    document.getElementById('player').style.left=playerX.toString() + "px";
    document.getElementById('player').style.top=playerY.toString() + "px";
    document.getElementById('player').style.transform = "rotate(" + playerR.toString() + "deg)";


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
