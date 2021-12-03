"use strict";
document.addEventListener("DOMContentLoaded", function () {
    
    let btnbusqueda = document.getElementById("busqueda");
    btnbusqueda.addEventListener('', busqueda (Event));
    async function  busqueda(Event){
        if (Event.key === 'Enter') {
            document.getElementById("renderPerfil").innerHTML = "Cargando...";
            try {
                let response = await fetch("busqueda.html");
                if (response.ok) {
                    let html = await response.text();
                    let div = document.getElementById("renderPerfil");
                    div.innerHTML = html;
    
    
                }
    
            } catch (error) {
                document.getElementById("renderPerfil").innerHTML = "error";
            }
        }
    }
    
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