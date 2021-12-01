"use strict";
document.addEventListener("DOMContentLoaded", function () {

    let btinicio = document.getElementById("inicio");
    btinicio.addEventListener("click", async () => {
        document.getElementById("inicioPag").innerHTML = "Cargando...";
        borrarBarra();
        btinicio.classList.add("inPage");
        /* setTimeout(function () ) */
        try {
            let response = await fetch("perfil.html");
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("inicioPag");
                div.innerHTML = html;


            }

        } catch (error) {
            document.getElementById("inicioPag").innerHTML = "error";
        }
    });
   
   
    let btnotificaciones = document.getElementById("notificaciones");
    btnotificaciones.addEventListener("click", async () => {
        document.getElementById("inicioPag").innerHTML = "Cargando...";
        borrarBarra();
        btnotificaciones.classList.add("inPage");
        /* setTimeout(function () ) */
        try {
            let response = await fetch("perfil.html");
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("inicioPag");
                div.innerHTML = html;


            }

        } catch (error) {
            document.getElementById("inicioPag").innerHTML = "error";
        }
    });

    let btperfil = document.getElementById("perfil");
    btperfil.addEventListener("click", async () => {
        document.getElementById("inicioPag").innerHTML = "Cargando...";
        borrarBarra();
        btperfil.classList.add("inPage");
        /* setTimeout(function () ) */
        try {
            let response = await fetch("perfil.html");
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("inicioPag");
                div.innerHTML = html;


            }

        } catch (error) {
            document.getElementById("inicioPag").innerHTML = "error";
        }
    });

    let btmensajes = document.getElementById("mensajes");
    btmensajes.addEventListener("click", async () => {
        document.getElementById("inicioPag").innerHTML = "Cargando...";
        borrarBarra();
        btmensajes.classList.add("inPage");
        /* setTimeout(function () ) */
        try {
            let response = await fetch("mensajes.html");
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("inicioPag");
                div.innerHTML = html;


            }

        } catch (error) {
            document.getElementById("inicioPag").innerHTML = "error";
        }
    });


    function borrarBarra(){
        btinicio.className = '';
        btinicio.classList.add("buttonMenu");
        btperfil.className = '';
        btperfil.classList.add("buttonMenu");
        btmensajes.className = '';
        btmensajes.classList.add("buttonMenu");
        btnotificaciones.className = '';
        btnotificaciones.classList.add("buttonMenu");
    }










});