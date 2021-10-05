"use strict";
document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("MyCanvas");
    let ctx = canvas.getContext("2d");

    var img = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var coorY, coorX;
    img.src = "src/css/images/vacio.jpg";
    img.onload = function () {
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y < 7; y++) {
                coorY = y * 100;
                if (x != 0 && y != 0) {
                    ctx.drawImage(img, coorX, coorY);
                }


            }
            coorX = x * 100;
        }
    }
    img2.src = "src/css/images/fichaAmarilla.jpg";
    img3.src = "src/css/images/fichaRoja.jpg";
    img2.onload = function () {
        for (let x = 8; x <= 10; x++) {
            for (let y = 1; y < 7; y++) {
                coorY = y * 80;
                if (x > 8) {
                    ctx.drawImage(img2, coorX, coorY);
                }
            }
            coorX = x * 100;
        }
    }
    
    img3.onload = function () {
        for (let x = 10; x <= 12; x++) {
            for (let y = 1; y < 7; y++) {
                coorY = y * 80;
                if (x > 10) {
                    ctx.drawImage(img3, coorX, coorY);
                }
            }
            coorX = x * 100;
        }
    }

  
        //Boton de jugador 1
        document.getElementById("j1").addEventListener("click", () => {
            j1 = true;
        });
        //Boton de jugador 2
        document.getElementById("j2").addEventListener("click", () => {
            j1 = false;
        });

//////////////7777777777777777777777777777777777777777777777777777777777777777777777777777777
var img3 = new Image()
img3.src = "src/css/images/fichaRoja.jpg";
img3.onload = function () { 
    ctx.drawImage(img3, 50, 0, 50, 50); 
}

var down = false;
ctx.canvas.addEventListener('mousedown', function () { 
    down = true; 
}, false);
ctx.canvas.addEventListener('mouseup', function () { 
    down = false; 
}, false);
ctx.canvas.addEventListener('mousemove', function (event) {
    if (down){
        //Rxt.translate(0, -50);
        clear();
        ctx.drawImage(img3, event.clientX - this.offsetLeft,
        event.clientY - this.offsetTop, 50, 50);
        //Rxt.translate(0, 50);
    }
}, false);

// Funcion limpiar image.
function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
})