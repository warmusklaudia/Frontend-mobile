// code = 'c78be457-1e1c-49ec-9271-4dc05b3da335';
// var arrayCode = ['c78be457-1e1c-49ec-9271-4dc05b3da335', 'aa4fddf5-fe6f-4036-ae87-c16f4439d81c', '451c5279-f4ff-4b27-ab6c-d1d13044a67a', 'af1b5fdd-3293-4f4c-bb38-a1890c882512', 'a03917bc-811d-42a4-9796-5ff4eeb8940c', '123456789'];

let afsprakenIdArray = [];
let jsonObject, randomAfspraak

//var randomCode = afspraakJson[Math.floor(Math.random() * afspraakJson.length)];

const showResult = (queryResponse) => {
  // length van de Array 
  lengthArray = queryResponse.length
  // Een getal selecteren tussen 0 en de lengte van de array
  var randomIndex = Math.floor(Math.random()*(lengthArray-0+1)+0)

  // alle afspraken overlopen en deze toevoegen aan "afsprakenIdArray"
  // daarna wordt gecontroleerd of de "i" de zelfde waarde heeft als "randomIndex"
  // Indien zo wordt deze afspraak in de grobale variable opgeslagen "randomAfspraak"
  for (let i = 0; i < queryResponse.length; i++) {
    afsprakenIdArray.push(queryResponse[i]);
    if (i == randomIndex) {
      console.log("Dit is de geselecteerde ID", queryResponse[i])
      randomAfspraak = queryResponse[i]
    }
  }

  // Een foutieve Id toevoegen aan de Array
  afsprakenIdArray.push('1234587654326453');
  console.log("Dit is een random afspraak " , randomAfspraak)
  qrcode(randomAfspraak["afspraakId"]);
  test(randomAfspraak);
};

const get = (url) => fetch(url).then((r) => r.json());

const getAfspraken = async () => {
  const endPoint = 'https://bezoekersapi.azurewebsites.net/api/afspraken';
  jsonObject = await get(endPoint);
  showResult(jsonObject);
};

const qrcode = (code) => {
  console.log(code);
  new QRCode(document.getElementById('qrcode'), {
    text: code,
    width: 150,
    height: 150,
    colorDark: '#282829',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
    image: 'Logo.png',
  });
};

const test = (code) => {
  if (code == '1234587654326453') {
    console.log('wrong ID');

    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let nextpage = document.querySelector('.js-temp-click');
    nextpage.addEventListener('click', function () {
      window.location.href = 'error.html';
    });
  } else {
    console.log('Good ID');
    // huidige datum and tijd ophalen
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let currentDateTime = `${date} ${time}`
    let afspraakDateTime = `${randomAfspraak["datum"]} ${randomAfspraak["tijdstip"]}`
    
    // controle of dat de bezoeker niet te vroeg is.
    if (currentDateTime > afspraakDateTime) {
      console.log("Uw afspraak is om: ", randomAfspraak["tijdstip"],", Gelieve nog even te wachten.")
      console.log("Dit is zijn de afspraken: ", jsonObject)
      console.log("Dit is de tijdstip", randomAfspraak)
      // hier sturen naar de tablet om de bezoeker te verwittigen dat hij/zij te vroeg is.
     

    } else {
      console.log("Dit is zijn de afspraken: ", jsonObject)
      console.log("Dit is de tijdstip", randomAfspraak)
      
      // class toegevoegd om een click event eraan te koppelen
      let pagina = document.getElementById('pagina');
      pagina.classList.add('js-temp-click');
  
      let nextpage = document.querySelector('.js-temp-click');
      nextpage.addEventListener('click', function () {
        window.location.href = `omkleden.html?afspraakId=${code}`;
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  getAfspraken();
});
