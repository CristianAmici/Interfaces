"use strict";
document.addEventListener("DOMContentLoaded", () => {

        let c = document.getElementById("MyCanvas");
        let ctx = c.getContext("2d");
        lienzoBlanco();
        document.getElementById("nuevoLienzo").addEventListener("click", lienzoBlanco);

        //Lienzo en blanco      
        function lienzoBlanco() {

                ctx.beginPath();
                ctx.rect(0, 0, c.width, c.height);
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fill();
        }
        let coordenada1;
        let coordenada2;
        let paint = false;
        let lapiz = false;
        let color;
        var imagen = new Image();
        //Boton de lapiz
        document.getElementById("lapiz").addEventListener("click", () => {
                lapiz = true;
                letsDraw();
        });
        //Boton de la goma
        document.getElementById("goma").addEventListener("click", () => {
                lapiz = false;
                color = '#FFFFFF';
                letsDraw();
        });
        //Pintar con lapiz o goma es lo mismo, lo unico que en borrado siempre va a ser blanco con lo
        //que se pinta
        function letsDraw() {
                c.addEventListener("mousedown", function (evt) {
                        coordenada1 = oMousePos(c, evt);
                        paint = true;
                        c.addEventListener("mousemove", function (evt) {
                                draw(c, evt)
                        });
                });
                c.addEventListener("mouseup", () => {
                        paint = false;
                });

                function draw(c, evt) {


                        c.style.cursor = "url('https://miracomosehace.com/wp-content/uploads/2020/06/flecha-colores-sin-fondo.jpg')";

                        let tamaño = document.getElementById("grosor").value
                        if (paint) {
                                coordenada2 = oMousePos(c, evt);
                                ctx.beginPath();
                                ctx.lineCap = "round";
                                if (lapiz) {
                                        c.style.cursor = "url(src/images/pincel.cur), auto";
                                        color = document.getElementById("favcolor").value;
                                }
                                else {
                                        c.style.cursor = "auto";
                                }
                                ctx.lineWidth = tamaño;
                                ctx.strokeStyle = color; //COLOR                            
                                ctx.moveTo(coordenada1.x, coordenada1.y);
                                ctx.lineTo(coordenada2.x, coordenada2.y)
                                ctx.stroke();
                                coordenada1 = coordenada2
                        }
                }
                //toma las cordeeanadas     
                function oMousePos(c, evt) {
                        var posicion = c.getBoundingClientRect();
                        let canvasX = posicion.left;
                        let canvasY = posicion.top;
                        console.log("x", canvasX, "y", canvasY)
                        return { //objeto
                                x: Math.round(evt.clientX - canvasX),
                                y: Math.round(evt.clientY - canvasY)
                        }
                }
        }


        //DESCARGA DE LA IMAGEN
        document.getElementById("descargar").addEventListener("click", function saveImage() {
                var link = window.document.createElement('a'),
                        url = c.toDataURL(),
                        filename = 'screenshot.jpg';

                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                window.document.body.appendChild(link);
                link.click();
                window.document.body.removeChild(link);
        });
        //SELECCION DE ARCHIVO
        document.getElementById("file").addEventListener("change", () => {

                var archivo = document.getElementById("file").files[0];
                var reader = new FileReader();
                if (archivo) {
                        reader.readAsDataURL(archivo);
                        reader.onloadend = function () {
                                imagen.src = reader.result;

                        }
                }
        });
        //CARGA DE LA IMAGEN
        document.getElementById("cargarFoto").addEventListener("click", cargarFoto);

        function cargarFoto() {
                let relacionAspecto;
                let anchoEscala;
                let altoEscala;

                if (imagen.width > imagen.height) {
                        relacionAspecto = imagen.height / imagen.width;
                        anchoEscala = c.width;
                        altoEscala = c.width * relacionAspecto;
                        c.height = altoEscala;
                } else {
                        relacionAspecto = imagen.width / imagen.height;
                        anchoEscala = c.height;
                        altoEscala = c.height * relacionAspecto;
                        c.width = anchoEscala;
                }
                ctx.drawImage(imagen, 0, 0, anchoEscala, altoEscala);

        }
        ///////////////////// FILTROS ////////////////////////////////////////

        //Filtro de grises
        let buttongris = document.getElementById("gris");
        buttongris.addEventListener("click", function aplicarFiltroGrises() {
                let r;
                let b;
                let g;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                r = getRed(imageData, x, y);
                                g = getGreen(imageData, x, y);
                                b = getBlue(imageData, x, y);
                                let grey = (r + g + b) / 3;
                                imageData.data[index + 0] = grey;
                                imageData.data[index + 1] = grey;
                                imageData.data[index + 2] = grey;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });
        ///FILTRO DE BRILLO
        let buttonbrillo = document.getElementById("brillo");
        buttonbrillo.addEventListener("click", function aplicarFiltroBrillo() {
                let r;
                let b;
                let g;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                let brillo = 100 - parseInt(document.getElementById("porcentajeBrillo").value);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                r = getRed(imageData, x, y);
                                g = getGreen(imageData, x, y);
                                b = getBlue(imageData, x, y);
                                r = (r * 100) / brillo;
                                g = (g * 100) / brillo;
                                b = (b * 100) / brillo;
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });

        //FILTRO DE SOBEL
        let buttonSobel = document.getElementById("sobel");
        buttonSobel.addEventListener("click", function aplicarFiltroSobel() {
                let Gx = [[-1, 0, +1],
                [-2, 0, +2],
                [-1, 0, +1]];

                let Gy = [[-1, -2, -1],
                [0, 0, 0],
                [+1, +2, +1]];
                let r;
                let b;
                let g;


                var imagenAux = new Image();
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                let imageData2 = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;


                                r = (getRed(imageData, x, y) * Gy[1][1])
                                if (x < imageData.width - 1)
                                        r += (getRed(imageData, x + 1, y) * Gy[1][2]);
                                if (x != 0) {
                                        r += (getRed(imageData, x - 1, y) * Gy[1][0]);
                                        if (y != 0)
                                                r += (getRed(imageData, x - 1, y - 1) * Gy[2][0]);
                                        if (y < imageData.height - 1)
                                                r += (getRed(imageData, x - 1, y + 1) * Gy[0][0]);
                                }
                                if (y != 0) {
                                        r += (getRed(imageData, x, y - 1) * Gy[2][1]);
                                        if (x < imageData.width - 1)
                                                r += (getRed(imageData, x + 1, y - 1) * Gy[2][2]);
                                }
                                if (y < imageData.height - 1) {
                                        r += (getRed(imageData, x, y + 1) * Gy[0][1]);
                                        if (x < imageData.width - 1)
                                                r += (getRed(imageData, x + 1, y + 1) * Gy[0][2]);
                                }

                                g = (getRed(imageData, x, y) * Gy[1][1])
                                if (x < imageData.width - 1)
                                        g += (getRed(imageData, x + 1, y) * Gy[1][2]);
                                if (x != 0) {
                                        g += (getRed(imageData, x - 1, y) * Gy[1][0]);
                                        if (y != 0)
                                                g += (getRed(imageData, x - 1, y - 1) * Gy[2][0]);
                                        if (y < imageData.height - 1)
                                                g += (getRed(imageData, x - 1, y + 1) * Gy[0][0]);
                                }
                                if (y != 0) {
                                        g += (getRed(imageData, x, y - 1) * Gy[2][1]);
                                        if (x < imageData.width - 1)
                                                g += (getRed(imageData, x + 1, y - 1) * Gy[2][2]);
                                }
                                if (y < imageData.height - 1) {
                                        g += (getRed(imageData, x, y + 1) * Gy[0][1]);
                                        if (x < imageData.width - 1)
                                                g += (getRed(imageData, x + 1, y + 1) * Gy[0][2]);
                                }
                                b = (getRed(imageData, x, y) * Gy[1][1])
                                if (x < imageData.width - 1)
                                        b += (getRed(imageData, x + 1, y) * Gy[1][2]);
                                if (x != 0) {
                                        b += (getRed(imageData, x - 1, y) * Gy[1][0]);
                                        if (y != 0)
                                                b += (getRed(imageData, x - 1, y - 1) * Gy[2][0]);
                                        if (y < imageData.height - 1)
                                                b += (getRed(imageData, x - 1, y + 1) * Gy[0][0]);
                                }
                                if (y != 0) {
                                        b += (getRed(imageData, x, y - 1) * Gy[2][1]);
                                        if (x < imageData.width - 1)
                                                b += (getRed(imageData, x + 1, y - 1) * Gy[2][2]);
                                }
                                if (y < imageData.height - 1) {
                                        b += (getRed(imageData, x, y + 1) * Gy[0][1]);
                                        if (x < imageData.width - 1)
                                                b += (getRed(imageData, x + 1, y + 1) * Gy[0][2]);
                                }
                                imageData2.data[index + 0] = r;
                                imageData2.data[index + 1] = g;
                                imageData2.data[index + 2] = b;
                        }
                }
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;

                                r = (getRed(imageData, x, y) * Gx[1][1]);
                                if (x < imageData.width - 1)
                                        r += (getRed(imageData, x + 1, y) * Gx[1][2]);
                                if (x != 0) {
                                        r += (getRed(imageData, x - 1, y) * Gx[1][0]);
                                        if (y < imageData.height - 1)
                                                r += (getRed(imageData, x - 1, y + 1) * Gx[0][0]);

                                        if (y != 0) {
                                                r += (getRed(imageData, x - 1, y - 1) * Gx[2][0])//-1
                                        }
                                }
                                if (y != 0) {
                                        r += (getRed(imageData, x, y - 1) * Gx[2][1]);

                                        if (x < imageData.width - 1) {

                                                r += (getRed(imageData, x + 1, y - 1) * Gx[2][2]);

                                        }

                                }
                                if (y < imageData.height - 1) {
                                        r += (getRed(imageData, x, y + 1) * Gx[0][1]);
                                        if (x < imageData.width - 1) {
                                                r += (getRed(imageData, x + 1, y + 1) * Gx[0][2]);

                                        }
                                }

                                g = (getRed(imageData, x, y) * Gx[1][1]);
                                if (x < imageData.width - 1)
                                        g += (getRed(imageData, x + 1, y) * Gx[1][2]);
                                if (x != 0) {
                                        g += (getRed(imageData, x - 1, y) * Gx[1][0]);
                                        if (y < imageData.width - 1)
                                                g += (getRed(imageData, x - 1, y + 1) * Gx[0][0]);

                                        if (y != 0) {
                                                g += (getRed(imageData, x - 1, y - 1) * Gx[2][0])//-1
                                        }
                                }
                                if (y != 0) {
                                        g += (getRed(imageData, x, y - 1) * Gx[2][1]);

                                        if (x < imageData.width - 1) {

                                                g += (getRed(imageData, x + 1, y - 1) * Gx[2][2]);

                                        }

                                }
                                if (y < imageData.height - 1) {
                                        g += (getRed(imageData, x, y + 1) * Gx[0][1]);
                                        if (x < imageData.width - 1) {
                                                g += (getRed(imageData, x + 1, y + 1) * Gx[0][2]);

                                        }
                                }
                                b = (getRed(imageData, x, y) * Gx[1][1]);
                                if (x < imageData.width - 1)
                                        b += (getRed(imageData, x + 1, y) * Gx[1][2]);
                                if (x != 0) {
                                        b += (getRed(imageData, x - 1, y) * Gx[1][0]);
                                        if (y < imageData.width - 1)
                                                b += (getRed(imageData, x - 1, y + 1) * Gx[0][0]);

                                        if (y != 0) {
                                                b += (getRed(imageData, x - 1, y - 1) * Gx[2][0])//-1
                                        }
                                }
                                if (y != 0) {
                                        b += (getRed(imageData, x, y - 1) * Gx[2][1]);

                                        if (x < imageData.width - 1) {

                                                b += (getRed(imageData, x + 1, y - 1) * Gx[2][2]);

                                        }

                                }
                                if (y < imageData.height - 1) {
                                        b += (getRed(imageData, x, y + 1) * Gx[0][1]);
                                        if (x < imageData.width - 1) {
                                                b += (getRed(imageData, x + 1, y + 1) * Gx[0][2]);

                                        }
                                }

                                imageData2.data[index + 0] = r;
                                imageData2.data[index + 1] = g;
                                imageData2.data[index + 2] = b;

                        }
                }






                ctx.putImageData(imageData2, 0, 0);
        });
        //FILTRO DE CONTRASTE
        let buttonContraste = document.getElementById("contraste");
        buttonContraste.addEventListener("click", function aplicarFiltroContraste() {
                let r;
                let b;
                let g;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                let contraste = document.getElementById("porcentajeContraste").value;
                console.log(contraste);
                let FACTOR = (259 * (contraste + 255)) / (255 * (259 - contraste));
                console.log(FACTOR);
                for (let x = 0; x < c.width; x++) {
                        for (let y = 0; y < c.height; y++) {
                                let index = (x + y * imageData.width) * 4;
                                r = getRed(imageData, x, y);
                                g = getGreen(imageData, x, y);
                                b = getBlue(imageData, x, y);
                                imageData.data[index + 0] = FACTOR * (r - 128) + 128;
                                imageData.data[index + 1] = FACTOR * (g - 128) + 128;
                                imageData.data[index + 2] = FACTOR * (b - 128) + 128;
                        }
                }



                ctx.putImageData(imageData, 0, 0);
        });
        //FILTRO NEGATIVO
        let buttonNegative = document.getElementById("negativo");
        buttonNegative.addEventListener("click", function aplicarFiltroNegativo() {
                let r;
                let b;
                let g;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                r = getRed(imageData, x, y);
                                g = getGreen(imageData, x, y);
                                b = getBlue(imageData, x, y);
                                imageData.data[index + 0] = 255 - r;
                                imageData.data[index + 1] = 255 - g;
                                imageData.data[index + 2] = 255 - b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });
        //FILTRO SEPIA
        let buttonsepia = document.getElementById("sepia");
        buttonsepia.addEventListener("click", function aplicarFiltroSepia() {
                let r;
                let b;
                let g;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                r = getRed(imageData, x, y);
                                g = getGreen(imageData, x, y);
                                b = getBlue(imageData, x, y);
                                imageData.data[index + 0] = Math.trunc(0.4 * r + 0.8 * g + 0.2 * b);
                                imageData.data[index + 1] = Math.trunc(0.35 * r + 0.7 * g + 0.175 * b);
                                imageData.data[index + 2] = Math.trunc(0.25 * r + 0.5 * g + 0.125 * b);
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });
        //FILTRO BLUR
        let buttonblur = document.getElementById("blur");
        buttonblur.addEventListener("click", function aplicarFiltroblur() {
                let r;
                let b;
                let g;
                var imagenAux = new Image();
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                let imageData2 = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;

                                r = getRed(imageData, x, y) + getRed(imageData, x + 1, y) + getRed(imageData, x - 1, y) + getRed(imageData, x + 1, y - 1) + getRed(imageData, x - 1, y + 1) + getRed(imageData, x - 1, y - 1) + getRed(imageData, x + 1, y + 1) + getRed(imageData, x, y - 1) + getRed(imageData, x, y + 1);
                                g = getGreen(imageData, x, y) + getGreen(imageData, x + 1, y) + getGreen(imageData, x - 1, y) + getGreen(imageData, x + 1, y - 1) + getGreen(imageData, x - 1, y + 1) + getRed(imageData, x - 1, y - 1) + getGreen(imageData, x + 1, y + 1) + getGreen(imageData, x, y - 1) + getGreen(imageData, x, y + 1);
                                b = getBlue(imageData, x, y) + getBlue(imageData, x + 1, y) + getBlue(imageData, x - 1, y) + getBlue(imageData, x + 1, y - 1) + getBlue(imageData, x - 1, y + 1) + getBlue(imageData, x - 1, y - 1) + getBlue(imageData, x + 1, y + 1) + getBlue(imageData, x, y - 1) + getBlue(imageData, x, y + 1);
                                if (x != 0 && x < imageData.width - 1 && y != 0 && y < imageData.height - 1) {
                                        imageData2.data[index + 0] = r / 9;
                                        imageData2.data[index + 1] = g / 9;
                                        imageData2.data[index + 2] = b / 9;
                                }
                        }
                }
                ctx.putImageData(imageData2, 0, 0);
        });
        //FILTRO BINARIZACION
        let buttonBinarizacion = document.getElementById("binarizacion");
        buttonBinarizacion.addEventListener("click", function aplicarFiltroBinarizacion() {
                let r;
                let b;
                let g;
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                r = getRed(imageData, x, y);
                                g = getGreen(imageData, x, y);
                                b = getBlue(imageData, x, y);
                                if ((r + g + b) > 320) {
                                        r = 255;
                                        b = 255;
                                        g = 255;
                                } else {
                                        r = 0;
                                        b = 0;
                                        g = 0;
                                }
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });
        //Saturacion
        /*
        document.getElementById("saturacion").addEventListener("click", function aplicarFiltroSaturacion(){
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                let hsl = rgbToHsl(imageData, x, y);
                                hsl[1] = hsl[1] + 1;
                                let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
                                imageData.data[index + 0] = rgb[0];
                                imageData.data[index + 1] = rgb[1];
                                imageData.data[index + 2] = rgb[2];
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        }); */
        
        //Obtiene la cantidad de rojo del pixel
        function getRed(imageData, x, y) {
                let index = (x + y * imageData.width) * 4;
                return imageData.data[index + 0];
        }

        //Obtiene la cantidad de verde del pixel
        function getGreen(imageData, x, y) {
                let index = (x + y * imageData.width) * 4;
                return imageData.data[index + 1];
        }

        //Obtiene la cantidad de azul del pixel
        function getBlue(imageData, x, y) {
                let index = (x + y * imageData.width) * 4;
                return imageData.data[index + 2];
        }
        //Obtiene los valores HSL de un pixel que esta en RGB
        function rgbToHsl(r, g, b) {
                r /= 255, g /= 255, b /= 255;

                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s, l = (max + min) / 2;

                if (max == min) {
                        h = s = 0; 
                } else {
                        var d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

                        switch (max) {
                                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                                case g: h = (b - r) / d + 2; break;
                                case b: h = (r - g) / d + 4; break;
                        }

                        h /= 6;
                }

                return [h, s, l];
        }
        //Obtiene los valores RGB de un pixel que estan en HSL
        function hslToRgb(h, s, l) {
                var r, g, b;

                if (s == 0) {
                        r = g = b = l;
                } else {
                        function hue2rgb(p, q, t) {
                                if (t < 0) t += 1;
                                if (t > 1) t -= 1;
                                if (t < 1 / 6) return p + (q - p) * 6 * t;
                                if (t < 1 / 2) return q;
                                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                                return p;
                        }

                        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        var p = 2 * l - q;

                        r = hue2rgb(p, q, h + 1 / 3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1 / 3);
                }

                return [r * 255, g * 255, b * 255];
        }
})