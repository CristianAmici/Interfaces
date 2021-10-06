"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var CARD_WIDTH = 100;
    var CARD_HEIGHT = 50;
    var cards = [];
    var img = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var coorY, coorX;
    var fichas = [];
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

    for (var index = 0; index < 10; index++) {
        cards.push({
            x: window.innerWidth * Math.random(),
            y: window.innerHeight * Math.random(),
        });
    }

    //Cargamos las imagenes y los subimos a los objetos
    img.src = "src/css/images/vacio.jpg";

    img.onload = function () {
        for (let x = 0; x <= 7; x++) {
            for (let y = 3; y < 9; y++) {
                coorY = y * 100;
                if (x != 0 && y != 0) {
                    context.spaces.drawImage(img, coorX, coorY);
                }


            }
            coorX = x * 100;
        }
    }
    img2.src = "src/css/images/fichaAmarilla.jpg";
    img3.src = "src/css/images/fichaRoja.jpg";
    img2.onload = function () {
        for (let x = 8; x <= 10; x++) {
            for (let y = 4; y < 10; y++) {
                coorY = y * 80;
                if (x > 8) {
                    context.cards.drawImage(img2, coorX, coorY);
                    fichas.push({
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
                    context.cards.drawImage(img3, coorX, coorY);
                    fichas.push({
                        img: img3,
                        x: coorX, y: coorY,
                        width: img2.width, height: img2.height,
                    })
                }
            }
            coorX = x * 100;
        }
    }
    state.fichas = fichas;

    onresize();

    function onresize() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        for (var key in canvases) {
            canvases[key].width = w;
            canvases[key].height = h;
        }
    }
    drawSpaces();
    drawCards();

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
    function drawCard(ficha, ctx) {
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
                drawCard(ficha, context.cards);
            }
        });
    }
    canvases.drag.onmousedown = function (e) {
        var card;

        state.isMouseDown = true;

        for (var index = 0; index < state.fichas.length; index++) {
            card = state.fichas[index];

            if (e.clientX >= card.x && e.clientX < CARD_WIDTH + card.x
                && e.clientY >= card.y && e.clientY < CARD_HEIGHT + card.y) {
                state.holdingCard = card;
                state.cursorOffset = {
                    x: e.clientX - card.x,
                    y: e.clientY - card.y
                };

                drawCards();
                context.drag.clearRect(0, 0,
                    canvases.drag.width,
                    canvases.drag.height,
                );
                drawCard(state.holdingCard, context.drag);
                break;
            }
        }
    };

    canvases.drag.onmouseup = function () {
        state.isMouseDown = false;

        var didMatch = false;

        if (state.cursorOffset != null) {
            var card = state.holdingCard;

            state.cursorOffset = null;

            for (var index = 0; index < state.spaces.length; index++) {
                var s = state.spaces[index];

                if (Math.abs(card.x - s.x) < (CARD_WIDTH / 1.5)
                    && Math.abs(card.y - s.y) < (CARD_HEIGHT / 1.5)
                ) {
                    card.x = s.x;
                    card.y = s.y;
                    didMatch = true;
                    state.holdingCard = null;
                    break;
                }
            }
        }

        if (didMatch) {
            context.cards.clearRect(0, 0,
                canvases.cards.width,
                canvases.cards.height
            );
            context.drag.clearRect(0, 0,
                canvases.cards.width,
                canvases.cards.height
            );
            drawCards();
        }
    };

    canvases.drag.onmousemove = function (e) {
        if (state.cursorOffset && state.holdingCard != null) {
            var card = state.holdingCard;

            card.x = e.clientX - state.cursorOffset.x;
            card.y = e.clientY - state.cursorOffset.y;

            context.drag.clearRect(0, 0,
                canvases.drag.width,
                canvases.drag.height,
            );

            drawCard(card, context.drag);
        }
    };
    //Boton de jugador 1
    document.getElementById("j1").addEventListener("click", () => {
        j1 = true;
    });
    //Boton de jugador 2
    document.getElementById("j2").addEventListener("click", () => {
        j1 = false;
    });


})