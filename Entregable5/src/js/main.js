"use strict";
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("publicar").addEventListener("click", () => {

        document.getElementById("mostrarPublicacion").classList.remove("oculto");

    })
    let btnbusqueda = document.getElementById("busqueda");
    btnbusqueda.addEventListener('keydown', busqueda);

    async function busqueda(Event) {
        if (Event.key === 'Enter') {
            setTimeout( document.getElementById("renderBusqueda").innerHTML ="<div class='svg-loader'><svg class='svg-container' height='100' width='100' viewBox='0 0 100 100'>"+
                "<circle class='loader-svg bg' cx='50' cy='50' r='45'></circle>"+
                "<circle class='loader-svg animate' cx='50' cy='50' r='45'></circle>"+
            "</svg></div>" ,5000);
            
            try {
                window.location.replace("busqueda.html");


            } catch (error) {
                document.getElementById("renderPerfil").innerHTML = "error";
            }
        }else if(Event.key === '7'){
            document.getElementById("renderBusqueda").innerHTML ="<div class='svg-loader'><svg class='svg-container' height='100' width='100' viewBox='0 0 100 100'>"+
            "<circle class='loader-svg bg' cx='50' cy='50' r='45'></circle>"+
            "<circle class='loader-svg animate' cx='50' cy='50' r='45'></circle>"+
         "</svg></div>" 
        }
    }
    /*     document.getElementById("meGusta").addEventListener("click", ()=>{
    
           let cantidadMegusta=  parseInt(document.getElementById("cantidadMeGusta").value);
    
           document.getElementById("cantidadMeGusta").innerHTML=cantidadMegusta+1;
        }) */

    function borrarBarra() {
        btnpublicaciones.className = '';
        btnpublicaciones.classList.add("buttonMenu");
        btnfotos.className = '';
        btnfotos.classList.add("buttonMenu");
        btninformacion.className = '';
        btninformacion.classList.add("buttonMenu");
    }

    let solicitudes = document.getElementsByName("solicitudes");

    solicitudes.forEach(element => {


        element.addEventListener("click", () => {
            document.getElementById("solicitudes-" + element.id).classList.add("sugerenciasAmigoAgregado");
            element.src = "src/css/images/agregado.png";


        });
    });







});