"use strict";
document.addEventListener("DOMContentLoaded", function () {
    
    let btnpublicaciones = document.getElementById("publicaciones");
    
    let btninformacion = document.getElementById("informacion");
    btninformacion.addEventListener("click", async () => {
        document.getElementById("renderPerfil").innerHTML = "Cargando...";
        borrarBarra();
        btninformacion.classList.add("inPage");
        try {
            let response = await fetch("info.html");
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("renderPerfil");
                div.innerHTML = html;
            }

        } catch (error) {
            document.getElementById("renderPerfil").innerHTML = "error";
        }
    });

    let btnfotos = document.getElementById("fotos");
    btnfotos.addEventListener("click", async () => {
        document.getElementById("renderPerfil").innerHTML = "Cargando...";
        borrarBarra();
        btnfotos.classList.add("inPage");
        try {
            let response = await fetch("fotos.html");
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("renderPerfil");
                div.innerHTML = html;


            }

        } catch (error) {
            document.getElementById("renderPerfil").innerHTML = "error";
        }
    });


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