document.addEventListener("DOMContentLoaded", function () {
    console.log("Dom is geloaden")
    const params = new URLSearchParams(window.location.search)
    pagina = params.get("pagina")

    console.log(pagina)
    if (pagina == "volgen")
    {
        console.log("works")
        // onderstaande vervangt de text in index.html
        document.querySelector(".js-text").textContent = 'Volg Temi...';

        // onderstaande tijdelijk om te testen
        let pagina = document.getElementById("pagina")
        pagina.classList.add("js-temp-click")

        let indexpage = document.querySelector(".js-temp-click")
        indexpage.addEventListener("click", function() {
            window.location.replace("gearriveerd.html");
        })
    } else if (pagina == "onderweg")
    {
        document.querySelector(".js-text").textContent = 'Temi is onderweg...';

        let pagina = document.getElementById("pagina")
        pagina.classList.add("js-temp-click")

        let indexpage = document.querySelector(".js-temp-click")
        indexpage.addEventListener("click", function() {
            window.location.replace("locaties.html");
        })
    } else if (pagina == "help_onderweg")
    {
        document.querySelector(".js-text").textContent = 'Er komt zo dadelijk iemand van het onthaal bij u...';
        
        let pagina = document.getElementById("pagina")
        pagina.classList.add("js-temp-click")

        let indexpage = document.querySelector(".js-temp-click")
        indexpage.addEventListener("click", function() {
            window.location.replace("index.html");
        })
    } else {
        let pagina = document.getElementById("pagina")
        pagina.classList.add("js-temp-click")

        let indexpage = document.querySelector(".js-temp-click")
        indexpage.addEventListener("click", function() {
            window.location.replace("qr-code.html");
        })  
    }
})