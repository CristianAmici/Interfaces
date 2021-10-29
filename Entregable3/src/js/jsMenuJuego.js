"use strict"
document.addEventListener("DOMContentLoaded", () => {
    var audio = document.getElementById("audio");
    audio.volume = 0.1;
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
})