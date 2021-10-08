"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var CARD_WIDTH = 100;
    var CARD_HEIGHT = 50;
    var img = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var img4 = new Image();
    var coorY, coorX;
    var turno = 2;
    var valorDeLinea=0;
    var rivales = "";
    var matrix = new Array();
    const valoresOriginales = new Array();
    var state = {
        spaces: [
            { x: 0, y: 50, card: null },
            { x: 100, y: 50, card: null },
            { x: 200, y: 50, card: null },
            { x: 300, y: 50, card: null },
            { x: 400, y: 50, card: null },
            { x: 500, y: 50, card: null },
            { x: 600, y: 50, card: null }
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
    var ganador = document.getElementById("ganador");
    document.getElementById("nuevoJuego").addEventListener("click", () => {
        let juego = document.getElementById("selectJuego").value;
        valorDeLinea=parseInt(juego);
        rivales = document.getElementById("selectRivales").value;
        //Cargamos las imagenes y los subimos a los objetos
        img.src = "src/css/images/vacio.jpg";

        img.onload = function () {
            for (let x = 0; x <= 7; x++) {
                let lugares = []
                for (let y = 0; y < 7; y++) {
                    coorY = y * 100;
                    if (x != 0 && y != 0) {
                        context.spaces.drawImage(img, coorX, coorY);
                        lugares.push({
                            coorY,
                            vacio: 0,
                        });
                    }
                }
                matrix[x] = lugares;
                coorX = x * 100;
            }
        }
        if (rivales = "economia") {
            img2.src = "src/css/images/fichaLiberalismo.png";
            img3.src = "src/css/images/fichaComunismo.png";
        } else if (rivales = "comida") {
            img2.src = "src/css/images/fichaAmarilla.jpg";
            img3.src = "src/css/images/fichaRoja.jpg";
        } else if (rivales = "aborto") {
            img2.src = "src/css/images/fichaAmarilla.jpg";
            img3.src = "src/css/images/fichaRoja.jpg";
        } else if (rivales = "futbol") {
            img2.src = "src/css/images/fichaAmarilla.jpg";
            img3.src = "src/css/images/fichaRoja.jpg";
        }
        img2.onload = function () {
            for (let x = 8; x <= 10; x++) {
                for (let y = 0; y < 7; y++) {
                    coorY = y * 80;
                    if (x > 8) {
                        state.fichas.push({
                            img: img2,
                            x: coorX, y: coorY,
                            width: img2.width, height: img2.height,
                            jugador:1,
                        })
                        valoresOriginales.push({
                            x: coorX, y: coorY,
                        })
                    }
                }
                coorX = x * 100;
            }
        }

        img3.onload = function () {
            for (let x = 10; x <= 12; x++) {
                for (let y = 0; y < 7; y++) {
                    coorY = y * 80;
                    if (x > 10) {
                        state.fichas.push({
                            img: img3,
                            x: coorX, y: coorY,
                            width: img3.width, height: img3.height,
                            jugador:2,
                        })
                        valoresOriginales.push({
                            x: coorX, y: coorY,
                        })
                    }
                }
                coorX = x * 100;
            }
            drawSpaces();
            drawCards();
        }
    })
    //Dibujamos los espacios para depositar las fichas
    function drawSpace(space) {

        ctx.fillStyle = '#183DB0';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#5B7BDD';
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
            if (ficha !== state.holdingCard && ficha !=false) {
                dibujarFicha(ficha, context.cards);
            }

        });
    }
    
    canvases.drag.addEventListener("mousedown", function (e) {
        var ficha;
        ganador.innerHTML = ""
        state.isMouseDown = true;
        
        for (var index = 0; index < state.fichas.length; index++) {
            ficha = state.fichas[index];

            if ((e.clientX-200) >= ficha.x && (e.clientX-200) < ficha.width + ficha.x
                && (e.clientY-180) >= ficha.y && (e.clientY-180) < ficha.height + ficha.y) {
                
                if(turno!=state.fichas[index].jugador){
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
                else{
                    ganador.innerHTML = "No es tu turno"
                }
            }
        }
    });

    canvases.drag.addEventListener("mouseup", function () {
        state.isMouseDown = false;
        var fichaPorCaer;
        var didMatch = false; // para identificar si entra o no la ficha
        if (state.cursorOffset != null) {
            var ficha = state.holdingCard;
            fichaPorCaer = ficha;

            state.cursorOffset = null;

            for (var index = 0; index < state.spaces.length; index++) {
                var s = state.spaces[index];

                if (Math.abs(ficha.x - s.x) < (CARD_WIDTH / 1.75) // si el 40% de la figura esta sobre el espacio se deposita
                    && Math.abs(ficha.y - s.y) < (CARD_HEIGHT / 1.75)
                ) {
                    ficha.x = s.x;
                    ficha.y = s.y;
                    didMatch = true;
                    turno = ficha.jugador;
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
            let pos = state.fichas.indexOf(fichaPorCaer); 
            state.fichas.splice(pos,1,false) ;////reemplazo la ficha por un false para que no la dibuje
            drawCards();
            fichaCayendo(fichaPorCaer);
            
        } else {
            context.drag.clearRect(0, 0,
                canvases.drag.width,
                canvases.drag.height,
            );
            state.fichas.forEach(function (fichita) {
                if (fichita == state.holdingCard) {
                    var pos = state.fichas.indexOf(fichita);
                    var valor = valoresOriginales[pos];
                    state.holdingCard = null;
                    state.fichas[pos].x = valor.x;
                    state.fichas[pos].y = valor.y;
                }

            })
            drawCards();
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
    function fichaCayendo(fichaPorCaer) {
        var jugador = 0;
        if (fichaPorCaer.jugador == 1) {
            if(rivales=="economia")
            img4.src = "src/css/images/fichaLiberalismoTablero.png";
            jugador = 1;
        }
        else {
            if(rivales=="economia"){
            img4.src = "src/css/images/fichaComunismoTablero.png";
            jugador = 2;
            }
        }

        var cordenadaAnteriorY;
        var espacioenX = fichaPorCaer.x / 100 + 1;   //HARCODEADO
        var hastaDondeTienequeBajar;
        for (let y = 0; y < 6; y++) {
            if (matrix[espacioenX][y].vacio==0) {
                hastaDondeTienequeBajar = y;
            }

        }
       
        //el uno es por que empieza 100 pixeles abajo
        img4.onload = function () {
            for (let y = 1; y <= hastaDondeTienequeBajar +1; y++) {
                coorX = fichaPorCaer.x;
                coorY = y * 100;
                if (y != 1) {
                    cordenadaAnteriorY = coorY - 100;
                }
                else {
                    cordenadaAnteriorY = coorY;
                }
                context.spaces.drawImage(img, coorX, cordenadaAnteriorY);
                context.spaces.drawImage(img4, coorX, coorY);

            }
            matrix[espacioenX][hastaDondeTienequeBajar].vacio = jugador;
            hayGanador(espacioenX, hastaDondeTienequeBajar, jugador)
        }
        

    }

    function hayGanador(numeroX, numeroY, jugador) {
        let linea = 1;
        let index =1;
        //por linea

        while (matrix[index][numeroY].vacio == jugador&&index<matrix[numeroY].length) {
            linea++
            index++
            if (linea == 3) {// + valorDeLinea
                ganador.innerHTML = "gano el Jugador N° " + jugador
                    //toggle para que se vaya el tablero y fichas
                return
            }
        }
       
        //por columna
        linea = 1;
        while (matrix[numeroX][index].vacio == jugador&&index < matrix[numeroY].length) {
            console.log(matrix[numeroX][index])
            linea++
            index++
            if (linea == 3 ) {//+ valorDeLinea
                ganador.innerHTML = "gano el Jugador N° " + jugador
                return
            }
        }
       /*  
        //Diagonales
        //hacia arriba
        linea = 0;
        for (let index = 1; index < matrix[numeroY].length; index++) {
            if (matrix[1][index].vacio = jugador) {
                linea++
            }
            if (linea == 4 + valorDeLinea) {
                ganador.innerHTML = "gano el Jugador N° " + jugador
            }
        }
        //hacia abajo
        linea = 0;
        for (let index = 1; index < matrix[numeroY].length; index++) {

            if (matrix[1][index].vacio = jugador) {
                linea++
            }
            if (linea == 4 + valorDeLinea) {
                ganador.innerHTML = "gano el Jugador N° " + jugador
            }
        } */
    }



})