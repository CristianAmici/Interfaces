"use strict";
document.addEventListener("DOMContentLoaded", () => {
  var keyLeft = false;
  var keyRight = false;
  var keyUp = false;
  var keyDown = false;
  var cowboy = document.getElementById('cowboy');
  var enemy = document.getElementById('enemy');
  var enemyFlying = document.getElementById('enemyFlying');
  var bebida = document.getElementById('bebida');
  var stars = document.getElementById('stars');
  var ground = document.getElementById('ground');
  var mountains = document.getElementById('mountains');
  var progress = document.getElementById('progress');
  var stand = false;
  var space = false
  var dead = false;

  var vidas = 3;



  /* ENEMYS */







  function checkCondition() {
    //console.log(enemy.offsetLeft , (cowboy.offsetLeft+200)  , enemy.offsetLeft , (cowboy.offsetLeft+195));
    if (enemy.offsetLeft <= (cowboy.offsetLeft+200)  && enemy.offsetLeft >= (cowboy.offsetLeft+190) && cowboy.offsetTop == (enemy.offsetTop - 240)) {
      vidas = vidas-1;
      endGame();
    }  
    if (enemyFlying.offsetLeft <= (cowboy.offsetLeft+100) && enemyFlying.offsetLeft >= (cowboy.offsetLeft+30) && cowboy.classList != "cowboyDown") {
      endGame();
    } 
    
  }
  function checkConditionColecionable() {
    /* console.log(bebida.offsetLeft , (cowboy.offsetLeft)  );
    
    if (bebida.offsetLeft <= (cowboy.offsetLeft+100) && bebida.offsetLeft >= (cowboy.offsetLeft+30)) {
     console.log("ss");
    } 
     */
  }

  function endGame(){
    if(vidas == 2){
      progress.className = '';
      progress.classList.add("lostLife1");
    }
    else if(vidas == 1){
      progress.className = '';
      progress.classList.add("lostLife2");
    }
    else if(vidas == 0){
      progress.className = '';
      progress.classList.add("lostLife3");
      cowboy.className = '';
      cowboy.classList.add("cowboyDead");
      dead= true;
    }
  }

  window.addEventListener("keydown", (e) => {
    if(!dead){
      if (e.key == " ") {
        space = true
        keyDown = false;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
        stand = false;
      } else if (e.key == "ArrowDown") {
        stand = false;
        keyDown = true;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
      }
      else if (stand) {
        cowboy.className = '';
        cowboy.classList.add('cowboyStand')
      }
    }
    
  })

  cowboy.addEventListener('animationend', (e) => {

       
        stand = true;
        keyDown = false;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
        space = false;
      
  });

  window.addEventListener("keyup", (e) => {

    if (space) {
      if (cowboy.classList.name == "cowboyDown")
        cowboy.classList.remove("cowboyDown");
       
    } else if (keyDown) {
     
      if (cowboy.classList.name == "cowboyJump")
        cowboy.classList.remove("cowboyJump");
        
        
        setTimeout(()=>{
          stand = true;
          keyDown = false;
          keyLeft = false;
          keyRight = false;
          keyUp = false;
          space = false;
          empezarFondo();
        },1200)
    }
  })


  function detenerFondo(){
    stars.classList.add('paused')
    mountains.classList.add('paused');
    ground.classList.add('paused'); 
  }
  function empezarFondo(){
    stars.classList.remove('paused');
    mountains.classList.remove('paused');
    ground.classList.remove('paused');
  }

  let intervalId = setInterval(function () {
    checkCondition();
    checkConditionColecionable();
      if (space) {
        cowboy.className = '';
        cowboy.classList.add("cowboyJump");
      } else if (keyDown) {
        cowboy.className = '';
        cowboy.classList.add('cowboyDown');
        
        detenerFondo();
      }else if(dead){
        detenerFondo();
        cowboy.classList.remove('cowboyDead');
        cowboy.classList.add('cowboyStandDie');
        clearInterval(intervalId);
        //resetGame();
      } 
      else {
        cowboy.className = '';
        cowboy.classList.add('cowboyStand')
      }
    
    
  }, 50)



  function resetGame(){
    //deadMenu.classList.add('menudead')
  }

  /* 
  K
  window.addEventListener("keydown", (e) => {
   
    if (e.key == " ") {
     cowboy.classList.add("cowboyJump");
    }
  });
  
  cowboy.addEventListener('animationend', () => {
    cowboy.classList.remove("cowboyJump");
  }); */






  /*   
  C
  let intervalId = setInterval(function () {
      if (keyLeft) {
        robocop.className = '';
        robocop.classList.add('robocopLeft')
      } else if (keyRight) {
        robocop.className = '';
        robocop.classList.add('robocopRight')
      } else if (keyUp) {
        robocop.className = '';
        robocop.classList.add('cowboyJump')
      } else if (keyDown) {
        robocop.className = '';
        robocop.classList.add('robocopDown')
      } else if (stand) {
        robocop.className = '';
        robocop.classList.add('cowboyStand')
      } else if (space) {
        robocop.className = '';
        robocop.classList.add('robocopShooter')
      }
    }, 50)
    window.addEventListener("keydown", (e) => {
      stand = false;
     
      if (e.key == "ArrowLeft") {
        keyLeft = true;
        keyRight = false;
        keyUp = false;
        keyDown = false;
  
      } else if (e.key == "ArrowRight") {
        keyRight = true;
        keyLeft = false;
        keyUp = false;
        keyDown = false;
        robocop.classList.add("move-left");
      } else if (e.key == "ArrowUp") {
        keyUp = true;
        keyLeft = false;
        keyRight = false;
        keyDown = false;
      } else if (e.key == "ArrowDown") {
        keyDown = true;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
      } else if (e.key == " ") {
        space = true
        keyDown = false;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
      }
  
    })
    
    window.addEventListener("keyup", (e) => {
      if (jump) {
        stand = false;
      }
      else {
        stand = true;
        keyDown = false;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
        space = false;
  
      }
    }) */


})