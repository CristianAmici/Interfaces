"use strict";
document.addEventListener("DOMContentLoaded", () => {
  var keyLeft = false;
  var keyRight = false;
  var keyUp = false;
  var keyDown = false;
  var cowboy = document.getElementById('cowboy');
  var stand = false;
  var space = false
  var jump = false;

  window.addEventListener("keydown", (e) => {

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
  })

  cowboy.addEventListener('animationend', () => {

      stand = true;
      keyDown = false;
      keyLeft = false;
      keyRight = false;
      keyUp = false;
      space = false;

    }
  );
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
    
        },1200)
    }


  })

  let intervalId = setInterval(function () {
    if (space) {
      cowboy.className = '';
      cowboy.classList.add("cowboyJump");
    } else if (keyDown) {
      cowboy.className = '';
      cowboy.classList.add('cowboyDown');

    } else {
      cowboy.className = '';
      cowboy.classList.add('cowboyStand')
    }
  }, 50)


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