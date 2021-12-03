"use strict";
document.addEventListener("DOMContentLoaded", function () {

    function borrarBarra() {
        btnpublicaciones.className = '';
        btnpublicaciones.classList.add("buttonMenu");
        btnfotos.className = '';
        btnfotos.classList.add("buttonMenu");
        btninformacion.className = '';
        btninformacion.classList.add("buttonMenu");
    }

    let solicitudes= document.getElementsByName("solicitudes");
    
    solicitudes.forEach(element => {
        
        
        element.addEventListener("click", () => {
            document.getElementById("solicitudes-"+element.id).classList.add("sugerenciasAmigoAgregado");
            element.src="src/css/images/agregado.png";
            
    
        });
    });







});