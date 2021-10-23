"use strict";
document.addEventListener("DOMContentLoaded", () => {
    var FICHA_WIDTH = 100;
    var FICHA_HEIGHT = 100;
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
    var imgJ1 = document.getElementById('j1');
    var imgJ2 = document.getElementById('j2');
    var imgGanador = document.getElementById("jGanador");
    var imgAyuda1= document.getElementById("imgAyuda1");
    var imgAyuda2= document.getElementById("imgAyuda2");

    var ganador = document.getElementById("ganador");
    var mensaje = document.getElementById("mensajeGanador");
    var comentario = document.getElementById("comentario");
    var mensajeAyuda= document.getElementById("mensajeAyuda");
    var opciones = document.getElementById("opciones");
    var showjugador1 = document.getElementById("Jugador1");
    var showjugador2 = document.getElementById("Jugador2");
    var jugando = document.getElementById("jugando");
    document.getElementById("cerrar").addEventListener("click", cerrarAyuda);

    
    document.getElementById("ayudaJugabilidad").addEventListener("click", ayuda);

    document.getElementById("ayudaNuevoJuego").addEventListener("click", ayuda);
    function cerrarAyuda(){
        
        mensajeAyuda.classList.remove("ayudaVisible");
        mensajeAyuda.classList.add("mensajeOculto");
        
        
    }
    function ayuda(){
        ayuda1.innerHTML = "- El juego consiste en hacer una linea de la cantidad de fichas que se solicita en el tipo de juego "+
        "en cualquiera de los sentidos (horizontal,vertical y ambas diagonales). Cada jugador tiene un turno de 1:30 minutos, "+
        "pasado ese tiempo el turno se le otorga al rival."
        ayuda2.innerHTML = "- Cada jugador debe arrastrar sus fichas hacia el hueco marcado a continuacion para depositar su ficha en esa linea.                   "+
        "Que se diviertan!"
        mensajeAyuda.classList.remove("mensajeOculto");
        mensajeAyuda.classList.add("ayudaVisible");
    }

    var juego = {
        spaces: [
            { x: 300, y: 0, card: null },
            { x: 400, y: 0, card: null },
            { x: 500, y: 0, card: null },
            { x: 600, y: 0, card: null },
            { x: 700, y: 0, card: null },
            { x: 800, y: 0, card: null },
            { x: 900, y: 0, card: null },//4 en linea
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
        if (minutos == 0 && segundos == 0) {
            minutos = 1;

            if (turno == 2) {
                turno = 1;
            } else {
                turno = 2;
            }
            showTurno(turno);
            segundos = 30;
        }
        cargarMinutos(segundos, txtSegundos);
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
        document.getElementById('minutos').innerHTML = txtMinutos + ":" + txtSegundos;

    }

    var ctx = context.spaces;

    document.getElementById("nuevoJuego").addEventListener("click", jugar)
    document.getElementById("reiniciarHeader").addEventListener("click", reiniciarHeader)

    function reiniciarHeader() {
        opciones.classList.remove("oculto");
        jugando.classList.remove("visible");
        showjugador1.classList.remove("visible");
        opciones.classList.add("visible");
        jugando.classList.add("oculto");
        showjugador1.classList.add("oculto");
        if (turno == 2) {
            showjugador1.classList.remove("visible");
            showjugador1.classList.add("oculto");
        }
        else {
            showjugador2.classList.remove("visible");
            showjugador2.classList.add("oculto");
        }
        reiniciar();
    }

    //permite reiniciar el canvas, el cronometro y el juego
    function reiniciar() {
        cerrarAyuda()
        clearInterval(intervalo)
        comentario.innerHTML = " ";
        minutos = 1;
        segundos = 30;
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
        img2.src = "";
        imgJ1.src = "";
        img3.src = "";
        imgJ2.src = "";
        matrix.splice(0, matrix.length);
        valoresOriginales.splice(0, valoresOriginales.length);
        juego.fichas.splice(0, juego.fichas.length);
        juego.spaces.splice(7, juego.spaces.length);
    }

    function tableroModoJuego() {

        opciones.classList.remove("visible");
        jugando.classList.remove("oculto");
        showjugador1.classList.remove("oculto");

        opciones.classList.add("oculto");
        jugando.classList.add("visible");
        showjugador1.classList.add("visible");
    }

    function showTurno(turno) {
        if (turno == 2) {
            showjugador2.classList.remove("visible");
            showjugador1.classList.remove("oculto");
            showjugador2.classList.add("oculto");
            showjugador1.classList.add("visible");
        }
        else {
            showjugador1.classList.remove("visible");
            showjugador2.classList.remove("oculto");
            showjugador1.classList.add("oculto");
            showjugador2.classList.add("visible");
        }

    }

    //Se encarga de cargar el tablero y las fichas con las imagenes que seleccione el usuario, ademas del timer
    function jugar() {
        tableroModoJuego();
        let tipoJuego = document.getElementById("selectJuego").value;
        valorDeLinea = parseInt(tipoJuego);

        reiniciar();

        let cantFichas = 0;
        
        if (valorDeLinea == 1) {
            juego.spaces.push({ x: 1000, y: 0, card: null })//5 en linea
            cantFichas = 7*8;
        } else if (valorDeLinea == 2) {
            juego.spaces.push({ x: 1000, y: 0, card: null })//5 en linea
            juego.spaces.push({ x: 1100, y: 0, card: null })//6 en inea
            cantFichas = 8*9;
        } else if (valorDeLinea == 3) {
            juego.spaces.push({ x: 1000, y: 0, card: null })//5 en linea
            juego.spaces.push({ x: 1100, y: 0, card: null })//6 en inea
            juego.spaces.push({ x: 1200, y: 0, card: null }) //7 en inea
            cantFichas = 9*10;
        }
        else{
            cantFichas = 6*7;
        }
        cantFichas /= 4;
        turno = 2;

        //determinamos cuales van a ser las fichas que se van a jugar y tambien las mostramos en la pagina
        rivales = document.getElementById("selectRivales").value;
        if (rivales == "aves") {
            img2.src = "src/css/images/fichaAguila.png";
            imgJ1.src = img2.src;
            img3.src = "src/css/images/fichaCondor.png";
            imgJ2.src = img3.src;
        } else if (rivales == "starWars") {
            img2.src = "src/css/images/fichaRebeldes.png";
            imgJ1.src = img2.src;
            img3.src = "src/css/images/fichaImperio.png";
            imgJ2.src = img3.src;
        } else if (rivales == "alien") {
            img2.src = "src/css/images/fichaAlien.png";
            imgJ1.src = img2.src;
            img3.src = "src/css/images/fichaDepredador.png";
            imgJ2.src = img3.src;
        } else if (rivales == "mortalKombat") {
            img2.src = "src/css/images/fichaSub-zero.png";
            imgJ1.src = img2.src;
            img3.src = "src/css/images/fichaEscorpion.png";
            imgJ2.src = img3.src;
        }

        //Cargamos las imagenes y los subimos a los objetos
        img.src = "src/css/images/vacio.jpg";

        
        //cargamos las fichas del jugador 1
        img2.onload = function () {
            coorY = 0, coorX = 100;
            for (let x = 1; x < 4 ; x++) {
                for (let y = 0; y < cantFichas; y++) {
                    coorY = y * 30;
                    if (x > 0) {
                        juego.fichas.push({
                            img: img2,
                            x: coorX, y: coorY,
                            width: img2.width, height: img2.height,
                            jugador: 1,
                        })
                        valoresOriginales.push({
                            x: coorX, y: coorY,
                        })
                    }
                    console.log( coorX, coorY);
                }
                coorX = x * 100;
            }
        }

        img.onload = function () {
            coorY = 0, coorX = 300;

            for (let x = 3; x < (11 + valorDeLinea); x++) {
                let lugares = []
                for (let y = 0; y < (7 + valorDeLinea); y++) {
                    coorY = y * 100;
                    if (y != 0) {
                        context.spaces.drawImage(img, coorX, coorY);
                        lugares.push({
                            coorY,
                            jugador: 0,
                        });
                    }
                    console.log( coorX, coorY);
                }
                matrix[x] = lugares;
                coorX = x * 100;
            }

        } 



        //cargamos las fichas del jugador 2
        img3.onload = function () {
            coorX = (1026+ valorDeLinea*100);
            for (let x = (11 + valorDeLinea); x < (13 + valorDeLinea); x++) {
                for (let y = 0; y < cantFichas; y++) {
                    coorY = y * 30;
                    if (x > 10) {
                        juego.fichas.push({
                            img: img3,
                            x: coorX, y: coorY,
                            width: img3.width, height: img3.height,
                            jugador: 2,
                        })
                        valoresOriginales.push({
                            x: coorX, y: coorY,
                        })
                        console.log( coorX, coorY);
                    }
                }
                coorX =( x * 100)+26;
            }
            drawSpaces();
            drawCards();
        }

        intervalo = setInterval(cargarSegundo, 1000);
    }
    //Dibujamos los espacios para deposit-ar las fichas
    function drawSpace(space) {
        ctx.fillStyle = '#183DB0';
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#5B7BDD'; 
        ctx.fillRect(space.x, space.y, FICHA_WIDTH, FICHA_HEIGHT);
        ctx.strokeRect(space.x, space.y, FICHA_WIDTH, FICHA_HEIGHT);
        ctx.beginPath();  
        ctx.arc(space.x+50, space.y+50,40,0*Math.PI,2*Math.PI);
        ctx.arc(space.x+50, space.y+50,30,0*Math.PI,2*Math.PI);
        ctx.font = "15px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.strokeText("Inserte", space.x+50, space.y+50);
        ctx.strokeText(" Aqui", space.x+50, space.y+60);
        ctx.stroke();

    }
    //Por cada espacio en juego.spaces se dibuja donde se deposita las fichas
    function drawSpaces() {
        let tope = 0;
        juego.spaces.forEach(function (space) {
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
    //Limpiamos el canvas donde se dibujan las fichas, y volvemos a dibujar las fichas, salvo la que el usuario
    //esta soteniedno y aquelas que estan en el tablero   
    function drawCards() {
        context.cards.clearRect(
            0, 0,
            canvases.cards.width,
            canvases.cards.height
        );
        juego.fichas.forEach(function (ficha) {
            if (ficha !== juego.holdingCard && ficha != false) {
                dibujarFicha(ficha, context.cards);
            }

        });
    }
    function oMousePosScale(canvas, evt) {
        var ClientRect = canvas.getBoundingClientRect();
        let scaleX = canvas.width / ClientRect.width;
        let scaleY = canvas.height / ClientRect.height;
        return {
            x: (evt.clientX - ClientRect.left) * scaleX,
            y: (evt.clientY - ClientRect.top) * scaleY
        }
    }
    //Mediante el evento mousedown chequeamos que el lugar donde se genero el mousedown sea el mismo lugar
    //donde se encuentre alguna de las fichas.  Si esto tambien se cumple la ficha se borra de el canvas donde estan las demas fichas
    //(cards) y la dibuja en el canvas drag.
    canvases.drag.addEventListener("mousedown", function (e) {
        var ficha;
        comentario.innerHTML = " ";
        let jugadorTurno = 1;
        juego.isMouseDown = true;
        let dimensiones = oMousePosScale(canvases.cards, e)
        for (var index = 0; index < juego.fichas.length; index++) {
            ficha = juego.fichas[index];
            if (dimensiones.x >= ficha.x && dimensiones.x < ficha.width + ficha.x
                && dimensiones.y >= ficha.y && dimensiones.y < ficha.height + ficha.y) {

                if (turno != juego.fichas[index].jugador) {
                    juego.holdingCard = ficha;
                    juego.cursorOffset = {
                        x: dimensiones.x - ficha.x,
                        y: dimensiones.y - ficha.y
                    };

                    drawCards();
                    context.drag.clearRect(0, 0,
                        canvases.drag.width,
                        canvases.drag.height,
                    );
                    dibujarFicha(juego.holdingCard, context.drag);




                    break;
                }
                else {
                    if (turno == 1) {
                        jugadorTurno = 2;
                        imgGanador.src = img3.src;
                    }
                    else {
                        jugadorTurno = 1;
                        imgGanador.src = img2.src;
                    }

                    ganador.innerHTML = "Es turno del jugador " + jugadorTurno
                    mensaje.classList.remove("mensajeOculto");
                    mensaje.classList.add("noEsTuTurno")
                    setTimeout(hiddenMensaje, 1500);
                }
            }
        }
    });
    function hiddenMensaje() {
        mensaje.classList.remove("noEsTuTurno");
        mensaje.classList.add("mensajeOculto");
    }
    //Mediante el evento up, que es cuando el usuario levanta el click, chequea que el lugar donde soltas la ficha sea
    //el mismo lugar donde se deposita la ficha para que caiga. De ser asi y que la columna no este llena la ficha se cae.
    //De no ser asi, la ficha vuelve a su lugar.
    canvases.drag.addEventListener("mouseup", function () {
        juego.isMouseDown = false;
        var fichaPorCaer;
        var didMatch = false; // para identificar si entra o no la ficha
        if (juego.cursorOffset != null) {
            var ficha = juego.holdingCard;
            fichaPorCaer = ficha;

            juego.cursorOffset = null;



            for (var index = 0; index < juego.spaces.length; index++) {
                var s = juego.spaces[index];

                if (Math.abs(ficha.x - s.x) < (FICHA_WIDTH / 1.75) // si el 40% de la figura esta sobre el espacio se deposita
                    && Math.abs(ficha.y - s.y) < (FICHA_HEIGHT / 1.75)
                ) {
                    ficha.x = s.x;
                    ficha.y = s.y;
                    matrix[s.x / 100 + 1].forEach(element => { //si la linea esta llena no se deposita la ficha
                        if (element.jugador == 0) {

                            didMatch = true;
                            turno = ficha.jugador;
                            juego.holdingCard = null;
                        }
                    });
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
            let pos = juego.fichas.indexOf(fichaPorCaer);
            juego.fichas.splice(pos, 1, false);////reemplazo la ficha por un false para que no la dibuje
            drawCards();
            fichaCayendo(fichaPorCaer);

            minutos = 1;
            segundos = 30;

        } else {
            context.drag.clearRect(0, 0,
                canvases.drag.width,
                canvases.drag.height,
            );
            juego.fichas.forEach(function (fichita) {
                if (fichita == juego.holdingCard) {
                    var pos = juego.fichas.indexOf(fichita);
                    var valor = valoresOriginales[pos];
                    juego.holdingCard = null;
                    juego.fichas[pos].x = valor.x;
                    juego.fichas[pos].y = valor.y;
                }

            })
            drawCards();
        }

    });
    //dibujamos la ficha si es seleccionada sobre el canvas drag y lo quitamos del canvas de fichas
    canvases.drag.addEventListener("mousemove", function (e) {
        if (juego.cursorOffset && juego.holdingCard != null) {
            var ficha = juego.holdingCard;
            let dimensiones = oMousePosScale(canvases.cards, e)
            ficha.x = dimensiones.x - juego.cursorOffset.x;         //tocar para modificar el margen
            ficha.y = dimensiones.y - juego.cursorOffset.y;

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
        for (let y = 0; y < (6 + valorDeLinea); y++) {
            if (matrix[espacioenX][y].jugador == 0) {
                hastaDondeTienequeBajar = y;
            }

        }

        //el uno es por que empieza 100 pixeles abajo
        img4.onload = function () {  //if hasta donde tiene que bajar es igual a 0
            for (let y = 1; y <= (hastaDondeTienequeBajar + 1); y++) {
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
        showTurno(turno);

    }
    //mediante funciones recursivas vamos controlando cada vez que se deposita una ficha dentro del espacio establecido
    //que haya 4, 5,6 o 7 en linea segun el tipo de juego seleccionado por el usuario que se ve reflejado por la variable valorDeLinea
    function hayGanador(X, Y, j) {
        if (j == 1)
            imgGanador.src = img2.src;
        else
            imgGanador.src = img3.src;
        ganador.innerHTML = "¡Felicitaciones jugador " + j + " has ganado!"
        var linea = 1;
        var linea2 = 0;
        linea = horizontalAdelante(X, Y, j, linea);
        linea2 = horizontalAtras(X, Y, j, linea2);
        linea += linea2;
        if (linea < (4 + valorDeLinea)) {
            linea = 1;
            linea2 = 0;
            linea = verticalAbajo(X, Y, j, linea)
            linea2 = verticalArriba(X, Y, j, linea2)
            linea += linea2;
            if (linea < (4 + valorDeLinea)) {
                linea = 1;
                linea2 = 0;
                linea = diagonalPuntaArribaDerecha(X, Y, j, linea)
                linea2 = diagonalPuntaAbajoIzquierda(X, Y, j, linea2)
                linea += linea2;
                if (linea < (4 + valorDeLinea)) {
                    linea = 1;
                    linea2 = 0;
                    linea = diagonalPuntaArribaIzquierda(X, Y, j, linea)
                    linea2 = diagonalPuntaAbajoDerecha(X, Y, j, linea2)
                    linea += linea2;
                }

            }
        }
        if (linea == (4 + valorDeLinea)) {
            if (turno == 2) {
                showjugador1.classList.remove("visible");
                showjugador1.classList.add("oculto");
            }
            else {
                showjugador2.classList.remove("visible");
                showjugador2.classList.add("oculto");
            }

            document.getElementById("html").classList.add("fondoGanador");
            mensaje.classList.toggle("mensajeVisible");
            document.getElementById('minutos').innerHTML = "";
            setTimeout(mensajeGanador, 10000);

            reiniciarHeader();
        }
    }
    // mostramos en un div superpuesto al tablero al ganador
    function mensajeGanador() {
        document.getElementById("html").classList.remove("fondoGanador");
        mensaje.classList.remove("mensajeVisible");
        mensaje.classList.add("mensajeOculto");

    }

    // el resto de funciones son las que permiten controlar las lineas horizontales, verticales y diagonales 
    //hacia arriba, abajo, atras y adelante desde el lugar donde fue depositada la ultima ficha
    function horizontalAdelante(X, Y, j, linea) {
        if ((X + 1) < matrix.length && Y < matrix[X].length) {

            if ((X + 1) < (8 + valorDeLinea) && matrix[X + 1][Y].jugador == j) {      //X+1, Y
                linea = horizontalAdelante(X + 1, Y, j, linea + 1)
            }

        } return linea;

    }
    function horizontalAtras(X, Y, j, linea2) {
        if ((X - 1) >= 0 && Y < matrix[X].length) {

            if (matrix[X - 1][Y].jugador == j && (X - 1) >= 0) {      //X-1, Y

                linea2 = horizontalAtras(X - 1, Y, j, linea2 + 1)
            }
        }
        return linea2;
    }
    function verticalAbajo(X, Y, j, linea) {
        if (X < matrix.length && (Y + 1) < matrix[X].length) {

            if (matrix[X][Y + 1].jugador == j && (Y + 1) <= (7 + valorDeLinea) && matrix[X][Y + 1] != null) {      //X, Y+1

                linea = verticalAbajo(X, Y + 1, j, linea + 1)
            }
        }
        return linea;
    }
    function verticalArriba(X, Y, j, linea2) {
        if (X < matrix.length && (Y - 1) >= 0) {

            if (matrix[X][Y - 1].jugador == j && (Y - 1) >= 0) {         //X,Y-1

                linea2 = verticalArriba(X, Y - 1, j, linea2 + 1)
            }
        }
        return linea2;
    }
    function diagonalPuntaArribaDerecha(X, Y, j, linea) {
        if ((X + 1) < matrix.length && (Y + 1) < matrix[X].length) {

            if (matrix[X + 1][Y + 1].jugador == j && (Y - 1) <= (7 + valorDeLinea) && (X + 1) < (8 + valorDeLinea)) {      //X+1, Y-1

                linea = diagonalPuntaArribaDerecha(X + 1, Y + 1, j, linea + 1)
            }
        }
        return linea;
    }
    function diagonalPuntaAbajoIzquierda(X, Y, j, linea2) {
        if ((X - 1) < matrix.length && (Y - 1) >= 0) {

            if (matrix[X - 1][Y - 1].jugador == j && (X - 1) >= 0 && (Y - 1) >= 0) {      //X-1, Y-1

                linea2 = diagonalPuntaAbajoIzquierda(X - 1, Y - 1, j, linea2 + 1)
            }
        }
        return linea2;
    }

    function diagonalPuntaArribaIzquierda(X, Y, j, linea) {
        if ((X - 1) >= 0 && (Y + 1) < matrix[X].length) {

            if (matrix[X - 1][Y + 1].jugador == j && (X - 1) >= 0 && (Y + 1) <= (7 + valorDeLinea)) {      //X-1, Y+1

                linea = diagonalPuntaArribaIzquierda(X - 1, Y + 1, j, linea + 1)
            }
        }
        return linea;
    }
    function diagonalPuntaAbajoDerecha(X, Y, j, linea2) {
        if ((X + 1) < matrix.length && (Y - 1) >= 0) {
            if (matrix[X + 1][Y - 1].jugador == j && (Y + 1) <= (7 + valorDeLinea) && (X + 1) < (8 + valorDeLinea)) {      //X+1, Y+1

                linea2 = diagonalPuntaAbajoDerecha(X + 1, Y - 1, j, linea2 + 1)
            }
        }
        return linea2;
    }

})








