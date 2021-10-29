"use strict"
document.addEventListener("DOMContentLoaded", () => {
    var audio = document.getElementById("audio");
    audio.volume = 0.1;
    var ayuda1 = document.getElementById("ayuda1");
    var ayuda2 = document.getElementById("ayuda2");
    let story = document.getElementById("story");
    story.addEventListener("click", async () => {
        document.getElementById("inicioPag").innerHTML = "Cargando...";

        try {
            let response = await fetch("Story.html");
            console.log(response);
            if (response.ok) {
                let html = await response.text();
                let div = document.getElementById("inicioPag");
                div.innerHTML = html;

            }

        } catch (error) {
            document.getElementById("inicioPag").innerHTML = "error";
        }
    });
    var mensajeAyuda = document.getElementById("mensajeAyuda");
    document.getElementById("cerrar").addEventListener("click", cerrarAyuda);
  
  
    document.getElementById("ayudaJugabilidad").addEventListener("click", ayuda);
  
    function cerrarAyuda() {
  
        mensajeAyuda.classList.remove("ayudaVisible");
        mensajeAyuda.classList.add("mensajeOculto");
  
  
    }
    function ayuda() {
        ayuda1.innerHTML = "- El juego consiste en intentar sobrevivir la mayor cantidad de tiempo posible al infierno del desierto.  " +
        "Para lograr eso, hay que evitar que los animales te toquen, si lo logran perderas un porcentaje de tu vida. " +
        "Los enemigos posibles son los que te mostramos a continuacion"
    ayuda2.innerHTML = '- Podras sobrevivir y sumar mas puntos si juntas las botellas voladordas, sisi voladoras... que Bill desea tomar, claramente son producto de su imaginación. </br>' +
    '- Los controles son:</br> '+
    'BARRA ESPACIADORA para saltar</br>'+
    'FLECHA ABAJO para agacharce (El viejo Bill lo hace despacio) </br>' +
    "¡A no morir!"
        mensajeAyuda.classList.remove("mensajeOculto");
        mensajeAyuda.classList.add("ayudaVisible");
    }
})