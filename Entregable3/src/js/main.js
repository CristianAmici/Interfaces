"use strict";
document.addEventListener("DOMContentLoaded", () => {
  var keyLeft = false;
  var keyRight = false;
  var keyUp = false;
  var keyDown = false;
  var cowboy = document.getElementById('cowboy');
  var enemy = document.getElementById('enemy');
  var enemy2 = document.getElementById('enemy2');
  var enemyFlying = document.getElementById('enemyFlying');
  var animal = document.getElementById('enemyWlaking');
  var animal2 = document.getElementById('enemyWlaking2');
  var animal3 = document.getElementById('enemyWlaking3');
  var coleccionable = document.getElementById('coleccionable');
  var bebida = document.getElementById('bebida');
  var stars = document.getElementById('stars');
  var ground = document.getElementById('ground');
  var mountains = document.getElementById('mountains');
  var mensaje = document.getElementById('mensajeGameOver');
  var progress = document.getElementById('progress');
  var porcentajeVida= document.getElementById('porcentajeVida');
  var stand = false;
  var space = false
  var dead = false;
  var audio = document.getElementById("audio");
  audio.volume = 0.1;

  var vidas = 4;

  var selcEnemys = ['enemyWlaking', 'enemyWlaking2', 'enemyWlaking3'];
  var selectColeccions = ["bebidaVino", "bebidaPetaca"]
  function checkObject() {
    shuffle(selcEnemys);
    shuffle(selectColeccions);
    console.log(animal.style.left);
    if (enemy.offsetLeft <= 7) {
      animal.className = '';
      animal.classList.add(selcEnemys[0])
    }
    if (enemy2.offsetLeft <= 7) {
      animal2.className = '';
      animal2.classList.add(selcEnemys[1])
    }
    if (enemyFlying.offsetLeft <= 7) {
      animal3.className = '';
      animal3.classList.add(selcEnemys[2])
    } if (coleccionable.offsetLeft <= 7) {
      bebida.className = '';
      bebida.classList.add(selectColeccions[0])
      coleccionable.style.visibility = "visible";
    }

  }

  function checkCondition() {
    //console.log("1:  "+enemyFlying.offsetLeft <= (cowboy.offsetLeft + 100) && enemyFlying.offsetLeft >= (cowboy.offsetLeft + 30) )  ;
    if (enemy.offsetLeft <= (cowboy.offsetLeft + 200) && enemy.offsetLeft >= (cowboy.offsetLeft + 190) && cowboy.offsetTop == (enemy.offsetTop - 240) //Enemigo de tierra
    ) {

      endGame();

    }
    if (enemy2.offsetLeft <= (cowboy.offsetLeft + 200) && enemy2.offsetLeft >= (cowboy.offsetLeft + 190) && cowboy.offsetTop == (enemy2.offsetTop - 240) //Enemigo de tierra
    ) {
      endGame();

    }
    if (enemyFlying.offsetLeft <= (cowboy.offsetLeft + 100) && enemyFlying.offsetLeft >= (cowboy.offsetLeft + 30) && cowboy.classList != "cowboyDown"//Enemigo de tierra
    ) {
      endGame();
    }

  }
  function checkConditionColecionable() {
    //console.log(coleccionable.offsetLeft <= (cowboy.offsetLeft+200) , coleccionable.offsetLeft >= (cowboy.offsetLeft+30) )
    if (coleccionable.offsetLeft <= (cowboy.offsetLeft + 200) && coleccionable.offsetLeft >= (cowboy.offsetLeft + 30) &&
      259 <= coleccionable.offsetTop - cowboy.offsetTop && coleccionable.offsetTop - cowboy.offsetTop <= 291
    ) {
      coleccionable.style.visibility = "hidden";
      vidas+=1;
      if(vidas>=3)
      porcentajeVida.innerHTML="100%";
      if (vidas == 2) {
        porcentajeVida.innerHTML="66%";
        progress.className = '';
        progress.classList.add("lostLife1");
      }
      else if (vidas == 1) {
        porcentajeVida.innerHTML="33%";
        progress.className = '';
        progress.classList.add("lostLife2");
  
      }
    }
  }

  function endGame() {
    vidas = vidas - 1;
    if (vidas == 2) {
      porcentajeVida.innerHTML="66%%";
      progress.className = '';
      progress.classList.add("lostLife1");
    }
    else if (vidas == 1) {

      porcentajeVida.innerHTML="33%";
      progress.className = '';
      progress.classList.add("lostLife2");

    }
    else if (vidas == 0) {
      porcentajeVida.innerHTML="0%";
      progress.className = '';
      progress.classList.add("lostLife3");
      cowboy.className = '';
      cowboy.classList.add("cowboyDead");
      dead = true;
    }

  }

  window.addEventListener("keydown", (e) => {
    if (!dead) {
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


      setTimeout(() => {
        stand = true;
        keyDown = false;
        keyLeft = false;
        keyRight = false;
        keyUp = false;
        space = false;
        empezarFondo();
      }, 1200)
    }
  })


  function detenerFondo() {
    stars.classList.add('paused')
    mountains.classList.add('paused');
    ground.classList.add('paused');
  }
  function empezarFondo() {
    stars.classList.remove('paused');
    mountains.classList.remove('paused');
    ground.classList.remove('paused');
  }

  let intervalId = setInterval(function () {
    checkCondition();
    checkObject();
    checkConditionColecionable();
    if (space) {
      cowboy.className = '';
      cowboy.classList.add("cowboyJump");
    } else if (keyDown) {
      cowboy.className = '';
      cowboy.classList.add('cowboyDown');

      detenerFondo();
    } else if (dead) {
      detenerFondo();
      cowboy.classList.remove('cowboyDead');
      cowboy.classList.add('cowboyStandDie');
      mensaje.classList.remove("mensajeOculto");
      mensaje.classList.add("mensajeVisible");
     setTimeout(() => { window.location.href = "index.html"; }, 5000)
      clearInterval(intervalId);
      //ResetGame();
    }
    else {
      cowboy.className = '';
      cowboy.classList.add('cowboyStand')
    }


  }, 50)

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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