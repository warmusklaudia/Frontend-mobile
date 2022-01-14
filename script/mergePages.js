document.addEventListener("DOMContentLoaded", function () {
    console.log("Dom is geloaden")

    // 1. classe toevoegen aan index pagina 
    // 2. classe opvragen
    // 3. evenlistener eraan koppellen
    // 4. 
    // als in de js-index-page bestaat dan voer de volgende code uit

    const params = new URLSearchParams(window.location.search)
    pagina = params.get("pagina")

    console.log(pagina)
    if (pagina == "volgen")
    {
        console.log("works")
        // onderstaande vervangt de text in index.html
        document.querySelector(".js-text").textContent = 'Volg Temi...';

        // onderstaande tijdelijk om te testen
        function volgendePagina() {
            window.location.replace("gearriveerd.html");
        }
        setTimeout(volgendePagina, 2000);
    } else if (pagina == "onderweg")
    {
        document.querySelector(".js-text").textContent = 'Roep Temi!';

        function volgendePagina() {
            window.location.replace("locaties.html");
        }
        setTimeout(volgendePagina, 2000);
    } else if (pagina == "help_onderweg")
    {
        console.log("test 2520")
        document.querySelector(".js-text").textContent = 'Er komt zo dadelijk iemand van het onthaal bij u...';

        // function volgendePagina() {
        //     window.location.replace("index.html/pagina=help_onderweg");
        //     console.log("testing which page this displays on")
        // }
        // setTimeout(volgendePagina, 2000);
    }
})