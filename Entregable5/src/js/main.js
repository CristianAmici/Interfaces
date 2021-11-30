"use strict";
document.addEventListener("DOMContentLoaded", function () {



    let btperfil = document.getElementById("perfil");
    btperfil.addEventListener("click", async () => {
        document.getElementById("inicioPag").innerHTML = "Cargando...";
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













});