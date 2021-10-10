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
    var valorDeLinea = 0;
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
            { x: 600, y: 50, card: null },//4 en linea
            { x: 700, y: 50, card: null },//5 en linea
            { x: 800, y: 50, card: null },//6 en inea
            { x: 900, y: 50, card: null } //7 en inea
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
    var intervalo;

    var minutos = 1;
    var segundos = 30;
    //Definimos y ejecutamos los segundos
    function cargarSegundo() {


        let txtSegundos;

        if (segundos < 0) {
            segundos = 59;
        }

        //Mostrar Segundos en pantalla
        if (segundos < 10) {
            txtSegundos = `0${segundos}`;
        } else {
            txtSegundos = segundos;
        }
        //document.getElementById('segundos').innerHTML = txtSegundos;
        segundos--;

        cargarMinutos(segundos,txtSegundos);
    }

    //Definimos y ejecutamos los minutos
    function cargarMinutos(segundos, txtSegundos) {
        let txtMinutos;

        if (segundos == -1 && minutos !== 0) {
            setTimeout(() => {
                minutos--;
            }, 500)
        } else if (segundos == -1 && minutos == 0) {
            setTimeout(() => {
                minutos = 1;
            }, 500)
        }

        //Mostrar Minutos en pantalla
        if (minutos < 10) {
            txtMinutos = `0${minutos}`;
        } else {
            txtMinutos = minutos;
        }
        document.getElementById('minutos').innerHTML = txtMinutos+":" +txtSegundos;
        if (minutos == 0 && segundos == 0) {
            document.getElementById('minutos').innerHTML = "Perdiste tu turno!";
            segundos = 30
        }
    }

    var ctx = context.spaces;
    var ganador = document.getElementById("ganador");
    document.getElementById("nuevoJuego").addEventListener("click", jugar)

    function reiniciar(){
        clearInterval(intervalo)
        context.spaces.clearRect(
            0, 0,
            canvases.spaces.width,
            canvases.spaces.height
        );
        context.drag.clearRect(
            0, 0,
            canvases.drag.width,
            canvases.drag.height
        );
        context.cards.clearRect(
            0, 0,
            canvases.cards.width,
            canvases.cards.height
        );
        matrix.splice(0, matrix.length);
        valoresOriginales.splice(0,valoresOriginales.length)
        state.fichas.splice(0,state.fichas.length)
    }

    function jugar() {
        let juego = document.getElementById("selectJuego").value;
        valorDeLinea = parseInt(juego);
        turno=2;
        coorY = 0, coorX = 0;
       reiniciar();



        //Cargamos las imagenes y los subimos a los objetos
        img.src = "src/css/images/vacio.jpg";
        img.onload = function () {
            
            for (let x = 0; x < 8 + valorDeLinea; x++) {
                let lugares = []
                for (let y = 0; y < 7 + valorDeLinea; y++) {
                    coorY = y * 100;
                    if (y != 0) {
                        context.spaces.drawImage(img, coorX, coorY);
                        lugares.push({
                            coorY,
                            jugador: 0,
                        });
                    }
                }
                matrix[x] = lugares;
                coorX = x * 100;
            }
        }
        rivales = document.getElementById("selectRivales").value;
        if (rivales == "aves") {
            img2.src = "src/css/images/fichaAguila.png";
            img3.src = "src/css/images/fichaCondor.png";
        } else if (rivales == "starWars") {
            img2.src = "src/css/images/fichaRebeldes.png";
            img3.src = "src/css/images/fichaImperio.png";
        } else if (rivales == "alien") {
            img2.src = "src/css/images/fichaAlien.png";
            img3.src = "src/css/images/fichaDepredador.png";
        } else if (rivales == "mortalKombat") {
            img2.src = "src/css/images/fichaSub-zero.png";
            img3.src = "src/css/images/fichaEscorpion.png";
        }
        img2.onload = function () {
            for (let x = 8+valorDeLinea; x < 11+valorDeLinea; x++) {
                for (let y = 0; y < 7 + valorDeLinea; y++) {
                    coorY = y * 50;
                    if (x > 8) {
                        state.fichas.push({
                            img: img2,
                            x: coorX, y: coorY,
                            width: img2.width, height: img2.height,
                            jugador: 1,
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
            for (let x = 11+ valorDeLinea; x < 14+valorDeLinea ; x++) {
                for (let y = 0; y < 7 + valorDeLinea; y++) {
                    coorY = y * 50;
                    if (x > 11) {
                        state.fichas.push({
                            img: img3,
                            x: coorX, y: coorY,
                            width: img3.width, height: img3.height,
                            jugador: 2,
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

        intervalo = setInterval(cargarSegundo, 1000);
    }
    //Dibujamos los espacios para depositar las fichas
    function drawSpace(space) {

        ctx.fillStyle = '#183DB0';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#5B7BDD';
        ctx.fillRect(space.x, space.y, CARD_WIDTH, CARD_HEIGHT);
        ctx.strokeRect(space.x, space.y, CARD_WIDTH, CARD_HEIGHT);
    }

    function drawSpaces() {
        let tope = 0;
        state.spaces.forEach(function (space) {
            if (tope < (7 + valorDeLinea)) {
                drawSpace(space);
                tope++;
            }

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
            if (ficha !== state.holdingCard && ficha != false) {
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

            if ((e.clientX - 200) >= ficha.x && (e.clientX - 200) < ficha.width + ficha.x
                && (e.clientY - 180) >= ficha.y && (e.clientY - 180) < ficha.height + ficha.y) {

                if (turno != state.fichas[index].jugador) {
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
                else {
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
            state.fichas.splice(pos, 1, false);////reemplazo la ficha por un false para que no la dibuje
            drawCards();
            fichaCayendo(fichaPorCaer);

            minutos = 1;
            segundos = 30;

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
            if (rivales == "aves")
                img4.src = "src/css/images/fichaAguilaTablero.png";
            else if (rivales == "starWars") {
                img4.src = "src/css/images/fichaRebeldesTablero.png";
            } else if (rivales == "alien") {
                img4.src = "src/css/images/fichaAlienTablero.png";

            } else if (rivales == "mortalKombat") {
                img4.src = "src/css/images/fichaSub-zeroTablero.png";

            }
            jugador = 1;
        }
        else {
            if (rivales == "aves") {
                img4.src = "src/css/images/fichaCondorTablero.png";
            } else if (rivales == "starWars") {
                img4.src = "src/css/images/fichaImperioTablero.png";
            } else if (rivales == "alien") {
                img4.src = "src/css/images/fichaDepredadorTablero.png";
            } else if (rivales == "mortalKombat") {
                img4.src = "src/css/images/fichaEscorpionTablero.png";
            }
            jugador = 2;
        }


        var cordenadaAnteriorY;
        var espacioenX = fichaPorCaer.x / 100 + 1;   
        var hastaDondeTienequeBajar;
        for (let y = 0; y < 6; y++) {
            if (matrix[espacioenX][y].jugador == 0) {
                hastaDondeTienequeBajar = y;
            }

        }

        //el uno es por que empieza 100 pixeles abajo
        img4.onload = function () {  //if hasta donde tiene que bajar es igual a 0
            for (let y = 1; y <= hastaDondeTienequeBajar + 1; y++) {
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
            matrix[espacioenX][hastaDondeTienequeBajar].jugador = jugador;
            hayGanador(espacioenX, hastaDondeTienequeBajar, jugador)
        }


    }

    function hayGanador(X, Y, j) {

        var linea = 1;
        var linea2 = 0;
        //AGARRAR LOS ALREDEDORES
        // 0 = vertical, cambia y
        // 1 = horizontal, cambia x
        // 2 = diagonal derecha, cambia x e y 
        // 3 = diagonal izquierda, cambia x e y 
        linea = horizontalAdelante(X, Y, j, linea);
        linea2 = horizontalAtras(X, Y, j, linea2);
        if ((linea+linea2) == 4) {
            console.log("gano");
            ganador.innerHTML = "gano el Jugador N° " + j
        } else {
            linea = 1;
            linea2 = 0;
            linea = verticalAbajo(X, Y, j, linea)
            linea2 = verticalArriba(X, Y, j, linea2)
            if ((linea+linea2) == 4) {
                console.log("gano");
                ganador.innerHTML = "gano el Jugador N° " + j
            } else {
                linea = 1;
                linea2 = 0;
                linea = diagonalPuntaArribaDerecha(X, Y, j, linea)
                linea2 = diagonalPuntaAbajoIzquierda(X, Y, j, linea2)
                if ((linea+linea2) == 4) {
                    console.log("gano");
                    ganador.innerHTML = "gano el Jugador N° " + j
                } else {
                    linea = 1;
                    linea2 = 0;
                    linea = diagonalPuntaArribaIzquierda(X, Y, j, linea)
                    linea2 = diagonalPuntaAbajoDerecha(X, Y, j, linea2)
                    if ((linea+linea2) == 4) {
                        console.log("gano");
                        ganador.innerHTML = "gano el Jugador N° " + j
                    }
                }

            }
        }
        if (linea == 4) {
            document.getElementById('minutos').innerHTML = "";
            setTimeout(reiniciar(), 10000);
        }
    }
    function horizontalAdelante(X, Y, j, linea) {
        if ((X + 1) < matrix.length && Y < matrix[X].length) {

            if ((X + 1) < (8 + valorDeLinea) && matrix[X + 1][Y].jugador == j) {      //X+1, Y
                console.log("hay algo X+1, Y" );
                linea = horizontalAdelante(X + 1, Y, j, linea + 1)
            }
            
        } return linea;
           
    }
    function horizontalAtras(X, Y, j, linea2) {
        if ((X - 1) >= 0 && Y < matrix[X].length) {

            if (matrix[X - 1][Y].jugador == j && (X - 1) >= 0) {      //X-1, Y
                console.log("hay algo X-1, Y");
                linea2 = horizontalAtras(X - 1, Y, j, linea2 + 1)
            }
        }
        return linea2;
    }
    function verticalAbajo(X, Y, j, linea) {
        if (X < matrix.length && (Y + 1) < matrix[X].length) {

            if (matrix[X][Y + 1].jugador == j && (Y + 1) <= (7 + valorDeLinea) && matrix[X][Y + 1] != null) {      //X, Y+1
                console.log("hay algo X, Y+1");
                linea = verticalAbajo(X, Y + 1, j, linea + 1)
            }
        }
        return linea;
    }
    function verticalArriba(X, Y, j, linea2) {
        if (X < matrix.length && (Y - 1) >= 0) {

            if (matrix[X][Y - 1].jugador == j && (Y - 1) >= 0) {         //X,Y-1
                console.log("hay algo X, Y-1");
                linea2 = verticalArriba(X, Y - 1, j, linea2 + 1)
            }
        }
        return linea2;
    }
    function diagonalPuntaArribaDerecha(X, Y, j, linea) {
        if ((X + 1 )< matrix.length && (Y + 1) < matrix[X].length) {

            if (matrix[X + 1][Y + 1].jugador == j && (Y - 1) <= (7 + valorDeLinea) && (X + 1) < (8 + valorDeLinea)) {      //X+1, Y-1
                console.log("hay algo X+1, Y+1");
                linea = diagonalPuntaArribaDerecha(X + 1, Y + 1, j, linea + 1)
            } 
        } 
            return linea;
    }
    function diagonalPuntaAbajoIzquierda(X, Y, j, linea2) {
        if ((X - 1) < matrix.length && (Y - 1) >= 0) {

            if (matrix[X - 1][Y - 1].jugador == j && (X - 1) >= 0 && (Y - 1) >= 0) {      //X-1, Y-1
                console.log("hay algo X-1, Y-1");
                linea2 = diagonalPuntaAbajoIzquierda(X - 1, Y - 1, j, linea2 + 1)
            }
        }
            return linea2;
    }
    
    function diagonalPuntaArribaIzquierda(X, Y, j, linea) {
        if ((X - 1) >= 0 && (Y + 1) < matrix[X].length) {

            if (matrix[X - 1][Y + 1].jugador == j && (X - 1) >= 0 && (Y + 1) <= (7 + valorDeLinea)) {      //X-1, Y+1
                console.log("hay algo X-1, Y+1");
                linea = diagonalPuntaArribaIzquierda(X - 1, Y + 1, j, linea + 1)
            } 
        }
            return linea;
    }
    function diagonalPuntaAbajoDerecha(X, Y, j, linea2) {
        if ((X + 1 )< matrix.length && ( Y - 1) >= 0) {
            if (matrix[X + 1][Y - 1].jugador == j && (Y + 1) <= (7 + valorDeLinea) && (X + 1) < (8 + valorDeLinea)) {      //X+1, Y+1
                console.log("hay algo X+1, Y+1");
                linea2 = diagonalPuntaAbajoDerecha(X + 1, Y - 1, j, linea2 + 1)
            }
        }
            return linea2;
    }
   
})








