"use strict";
document.addEventListener("DOMContentLoaded", ()=>{

        var c = document.getElementById("MyCanvas");
        var ctx = c.getContext("2d");

        var imageData = ctx.createImageData(c.height, c.width);
        let imageScaledWidth = c.width;
        let imageScaledHeight = c.height;
        var imagen = new Image();
        imagen.src = "src/images/messirve.jpg";
        imagen.onload = loadImage()
        let buttonOriginal= document.getElementById("original").addEventListener("click", loadImage);
        function loadImage() {
                ctx.drawImage(imagen, 0, 0);
        }
        let buttongris = document.getElementById("gris");
        buttongris.addEventListener("click", function aplicarFiltroGrises(){
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
        let buttonNegative = document.getElementById("negativo");
        buttonNegative.addEventListener("click", function aplicarFiltroNegativo(){
            loadImage();
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
        let buttonsepia = document.getElementById("sepia");
        buttonsepia.addEventListener("click", function aplicarFiltroSepia(){
            loadImage();
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
        let buttonblur = document.getElementById("blur");
        buttonblur.addEventListener("click", function aplicarFiltroblur(){
            loadImage();
                let r;
                let b;
                let g;
                var imagenAux = new Image();
                imagen.src = "src/images/messirve.jpg";
                let imageData = ctx.getImageData(0, 0, c.width, c.height);
                let imageData2= ctx.getImageData(0, 0, c.width, c.height);
                for (let y = 0; y < imageData.height; y++) {
                        for (let x = 0; x < imageData.width; x++) {
                                let index = (x + y * imageData.width) * 4;
                                r =getRed(imageData, x, y)+getRed(imageData, x+1, y)+getRed(imageData, x-1, y)+getRed(imageData, x+1, y-1)+getRed(imageData, x-1, y+1)+getRed(imageData, x-1, y-1)+getRed(imageData, x+1, y+1)+getRed(imageData, x, y-1)+getRed(imageData, x, y+1);
                                g = getGreen(imageData, x, y)+getGreen(imageData, x+1, y)+getGreen(imageData, x-1, y)+getGreen(imageData, x+1, y-1)+getGreen(imageData, x-1, y+1)+getRed(imageData, x-1, y-1)+getGreen(imageData, x+1, y+1)+getGreen(imageData, x, y-1)+getGreen(imageData, x, y+1);
                                b = getBlue(imageData, x, y)+getBlue(imageData, x+1, y)+getBlue(imageData, x-1, y)+getBlue(imageData, x+1, y-1)+getBlue(imageData, x-1, y+1)+getBlue(imageData, x-1, y-1)+getBlue(imageData, x+1, y+1)+getBlue(imageData, x, y-1)+getBlue(imageData, x, y+1);
                                imageData2.data[index + 0] = r/9;
                                imageData2.data[index + 1] = g/9;
                                imageData2.data[index + 2] = b/9;
                        }
                }
                ctx.putImageData(imageData2, 0, 0);
        });

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
})