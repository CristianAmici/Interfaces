"use strict";
document.addEventListener("DOMContentLoaded", ()=>{
        
        let c = document.getElementById("MyCanvas");
        let ctx = c.getContext("2d");

        //Lienzo en blanco
        ctx.beginPath();
        ctx.rect(0, 0, c.width, c.height);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fill(); 

        let coordenada1;
        let coordenada2;
        let paint = false;
        let lapiz = false; 
        let color;

        document.getElementById("lapiz").addEventListener("click", ()=>{
                lapiz=true;
                letsDraw();
        });
        document.getElementById("goma").addEventListener("click", ()=>{
                lapiz = false;
                color = '#FFFFFF';
                letsDraw();
        });
        //Pintar con lapiz o goma es lo mismo, lo unico que en borrado siempre va a ser blanco con lo
        //que se pinta
        function letsDraw(){
                c.addEventListener("mousedown", function(evt) {
                        coordenada1 = oMousePos(c, evt);
                        paint = true;
                        c.addEventListener("mousemove", function(evt) {
                                draw(c,evt)
                        });
                });
                c.addEventListener("mouseup",()=>{
                        paint = false ;
                });
                
                function draw(c,evt){

                                let cuerpo=document.getElementById('MyCanvas');
                                cuerpo.style.cursor="url('https://www.pngegg.com/es/png-cilri'),auto";
                        
                        let tamaño= document.getElementById("grosor").value
                        if(paint){
                                coordenada2 =  oMousePos(c, evt);
                                ctx.beginPath();
                                if(lapiz){
                                        color = document.getElementById("favcolor").value;
                                }
                                ctx.fillStyle = color; //COLOR
                                ctx.moveTo(coordenada1.x,coordenada1.y);
                                ctx.arc(coordenada2.x,coordenada2.y,tamaño, 0,2* Math.PI);
                                ctx.fill();
                                coordenada1 = coordenada2
                        }
                } 
                //toma las cordeeanadas     
                function oMousePos(c, evt) {
                        return { //objeto
                          x: Math.round(evt.clientX),
                          y: Math.round(evt.clientY) 
                        }
                }
        }


        //FALTA CARGAR LA IMAGEN Y DESCARGARLA

            
             
        ///////////////////// FILTROS
       
        /*
        var imageData = ctx.createImageData(c.height, c.width);
        let imageScaledWidth = c.width;
        let imageScaledHeight = c.height;
        var imagen = new Image();
        imagen.src = "src/images/messirve.jpg";
        imagen.onload = loadImage()*/
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
        let buttonbrillo = document.getElementById("brillo");
        buttonbrillo.addEventListener("click", function aplicarFiltroBrillo(){
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
                                r = (r*100)/70;
                                g = (g*100)/70;
                                b = (b*100)/70;
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
        });
        let buttonNegative = document.getElementById("negativo");
        buttonNegative.addEventListener("click", function aplicarFiltroNegativo(){
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
                let r;
                let b;
                let g;
                var imagenAux = new Image();
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
        let buttonBinarizacion = document.getElementById("binarizacion");
        buttonBinarizacion.addEventListener("click", function aplicarFiltroBinarizacion(){
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
                                if((r+g+b)>320){
                                        r=255;
                                        b=255;
                                        g=255;
                                }else{
                                        r=0;
                                        b=0;
                                        g=0;
                                }
                                imageData.data[index + 0] = r;
                                imageData.data[index + 1] = g;
                                imageData.data[index + 2] = b;
                        }
                }
                ctx.putImageData(imageData, 0, 0);
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