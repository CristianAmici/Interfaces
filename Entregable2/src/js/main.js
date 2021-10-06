"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var CARD_WIDTH = 100;
    var CARD_HEIGHT = 50;
    var img = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var coorY, coorX;
    var matrix= new Array()
    var state = {
        spaces: [
            { x: 0, y: 250, card: null },
            { x: 100, y: 250, card: null },
            { x: 200, y: 250, card: null },
            { x: 300, y: 250, card: null },
            { x: 400, y: 250, card: null },
            { x: 500, y: 250, card: null },
            { x: 600, y: 250, card: null }
        ],
        fichas: [],
        holdingCard: null,
        isMouseDown: false,
        cursorOffset: null
    };
    var canvases = {
        spaces: document.getElementById('tablero'),
        drag: document.getElementById('movimiento'),
        cards: document.getElementById('fichas')
    };

    
    var context = {
        spaces: canvases.spaces.getContext('2d'),
        drag: canvases.drag.getContext('2d'),
        cards: canvases.cards.getContext('2d'),
    };
    var ctx = context.spaces;

    //Cargamos las imagenes y los subimos a los objetos
    img.src = "src/css/images/vacio.jpg";

    img.onload = function () {
        for (let x = 0; x <= 7; x++) {
            let lugares=[]
            for (let y = 3; y < 9; y++) {
                coorY = y * 100;
                if (x != 0 && y != 0) {
                    context.spaces.drawImage(img, coorX, coorY);
                    lugares.push(coorY)
                }


            }
            matrix[x] = lugares;
            coorX = x * 100;
        }
    }
    console.log(matrix)
    img2.src = "src/css/images/fichaAmarilla.jpg";
    img3.src = "src/css/images/fichaRoja.jpg";
    img2.onload = function () {
        for (let x = 8; x <= 10; x++) {
            for (let y = 4; y< 10; y++) {
                coorY = y * 80;
                if (x > 8) {
                    state.fichas.push({
                        img: img2,
                        x: coorX, y: coorY,
                        width: img2.width, height: img2.height,
                    })
                }
            }
            coorX = x * 100;
        }
    }

    img3.onload = function () {
        for (let x = 10; x <= 12; x++) {
            for (let y = 4; y < 10; y++) {
                coorY = y * 80;
                if (x > 10) {
                    state.fichas.push({
                        img: img3,
                        x: coorX, y: coorY,
                        width: img2.width, height: img2.height,
                    })
                }
            }
            coorX = x * 100;
        }
        drawSpaces();
        drawCards();
    }

    onresize();

    function onresize() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        for (var key in canvases) {
            canvases[key].width = w;
            canvases[key].height = h;
        }
    }
   
    //Dibujamos los espacios para depositar las fichas
    function drawSpace(space) {

        ctx.fillStyle = '#555555';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#999999';
        ctx.fillRect(space.x, space.y, CARD_WIDTH, CARD_HEIGHT);
        ctx.strokeRect(space.x, space.y, CARD_WIDTH, CARD_HEIGHT);
    }

    function drawSpaces() {
        state.spaces.forEach(function (space) {
            drawSpace(space);
        });
    }
    //Dibujamos las fichas
    function dibujarFicha(ficha, ctx) {
        ctx.drawImage(ficha.img, ficha.x, ficha.y);
    }

    function drawCards() {
        context.cards.clearRect(
            0, 0,
            canvases.cards.width,
            canvases.cards.height
        );
        state.fichas.forEach(function (ficha) {
            if (ficha !== state.holdingCard) {
                dibujarFicha(ficha, context.cards);
            }
                
        });
    }
    canvases.drag.addEventListener("mousedown", function (e) {
        var ficha;

        state.isMouseDown = true;

        for (var index = 0; index < state.fichas.length; index++) {
            ficha = state.fichas[index];

            if (e.clientX >= ficha.x && e.clientX < ficha.width + ficha.x
                && e.clientY >= ficha.y && e.clientY < ficha.height + ficha.y) {
                state.holdingCard = ficha;
                state.cursorOffset = {
                    x: e.clientX - ficha.x,
                    y: e.clientY - ficha.y
                };

                drawCards();
                context.drag.clearRect(0, 0,
                    canvases.drag.width,
                    canvases.drag.height,
                );
                dibujarFicha(state.holdingCard, context.drag);
                break;
            }
        }
    });

    canvases.drag.addEventListener("mouseup", function () {
        state.isMouseDown = false;

        var didMatch = false; // para identificar si entra o no la ficha

        if (state.cursorOffset != null) {
            var ficha = state.holdingCard;

            state.cursorOffset = null;

            for (var index = 0; index < state.spaces.length; index++) {
                var s = state.spaces[index];

                if (Math.abs(ficha.x - s.x) < (CARD_WIDTH / 1.75) // si el 40% de la figura esta sobre el espacio se deposita
                    && Math.abs(ficha.y - s.y) < (CARD_HEIGHT / 1.75)
                ) {
                    ficha.x = s.x;
                    ficha.y = s.y;
                    didMatch = true;
                    state.holdingCard = null;
                    break;
                }
            }
        }

        if (didMatch) { //disparar evento de depositar ficha
            context.cards.clearRect(0, 0,   //borra de ficha canvas en movimiento y la deja en el tablero
                canvases.cards.width,
                canvases.cards.height
            );
            context.drag.clearRect(0, 0,
                canvases.cards.width,
                canvases.cards.height
            );
            drawCards();
        }else{
            drawCards(false);
        }
    });

    canvases.drag.addEventListener("mousemove", function (e) {
        if (state.cursorOffset && state.holdingCard != null) {
            var ficha = state.holdingCard;

            ficha.x = e.clientX - state.cursorOffset.x;         //tocar para modificar el margen
            ficha.y = e.clientY - state.cursorOffset.y;

            context.drag.clearRect(0, 0,
                canvases.drag.width,
                canvases.drag.height,
            );

            dibujarFicha(ficha, context.drag);
        }
    });
    //Boton de jugador 1
  /*   document.getElementById("j1").addEventListener("click", () => {
        j1 = true;
    });
    //Boton de jugador 2
    document.getElementById("j2").addEventListener("click", () => {
        j1 = false;
    });
 */

})