"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let btnpublicaciones = document.getElementById("publicaciones");
    
    let btninformacion = document.getElementById("informacion");
    btninformacion.addEventListener("click", async () => {
        document.getElementById("renderPerfil").innerHTML = "<div class='svg-loader'><svg class='svg-container' height='100' width='100' viewBox='0 0 100 100'>"+
        "<circle class='loader-svg bg' cx='50' cy='50' r='45'></circle>"+
        "<circle class='loader-svg animate' cx='50' cy='50' r='45'></circle>"+
    "</svg></div>" ;
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
        document.getElementById("renderPerfil").innerHTML ="<div class='svg-loader'><svg class='svg-container' height='100' width='100' viewBox='0 0 100 100'>"+
        "<circle class='loader-svg bg' cx='50' cy='50' r='45'></circle>"+
        "<circle class='loader-svg animate' cx='50' cy='50' r='45'></circle>"+
    "</svg></div>" ;
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

    let btnbusqueda = document.getElementById("busqueda");
    btnbusqueda.addEventListener('', busqueda (Event));
    async function  busqueda(Event){
        if (Event.key === 'Enter') {
            document.getElementById("renderPerfil").innerHTML = "<div class='svg-loader'><svg class='svg-container' height='100' width='100' viewBox='0 0 100 100'>"+
                "<circle class='loader-svg bg' cx='50' cy='50' r='45'></circle>"+
                "<circle class='loader-svg animate' cx='50' cy='50' r='45'></circle>"+
            "</svg></div>" ;
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
        btnpublicaciones.classList = '';
        btnpublicaciones.classList.add("buttonMenu");
        btnfotos.className = '';
        btnfotos.classList.add("buttonMenu");
        btninformacion.className = '';
        btninformacion.classList.add("buttonMenu");
    }
});