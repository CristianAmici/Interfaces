"use strict";
document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("publicar").addEventListener("click", ()=>{

        document.getElementById("mostrarPublicacion").classList.remove("oculto");

    })
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

    let solicitudes= document.getElementsByName("solicitudes");
    
    solicitudes.forEach(element => {
        
        
        element.addEventListener("click", () => {
            document.getElementById("solicitudes-"+element.id).classList.add("sugerenciasAmigoAgregado");
            element.src="src/css/images/agregado.png";
            
    
        });
    });







});