let pagina, afspraakId, btnHulp, afspraakData;

const options = {
  keepalive: 60,
  clean: true,
};

const client = mqtt.connect('ws://40.113.96.140:80', options);

client.on('connect', function () {
  console.log('Connected to mqtt');
  client.subscribe('B2F/arrived');
  client.subscribe('B2F/help');
});

client.on('message', function (topic, message) {
  const msg = JSON.parse(message.toString());

  console.log(`Message: ${message.toString()} on Topic: ${topic}`);

  if (topic == 'B2F/arrived' && msg['status'] == 'arrived') {
    window.location.replace(`gearriveerd.html?afspraakId=${afspraakId}&return=${returnState}`);
  }
  if (topic == 'B2F/help' && msg.status == "opgelost") {
    window.history.go(-2);
  }
});

const get = (url) => fetch(url).then((r) => r.json());

const GetAfspraak = async () => {
  endpoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/${afspraakId}`;
  const response = await get(endpoint);
  return response;
};

const GetLocatie = function (JsonObject) {
  let locatie = JsonObject['locatie'];
  console.log(locatie);
  client.publish('F2B/return', JSON.stringify({ locatie: locatie, GUID: afspraakId }));
};

const listenToButton = () => {
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

const mergePages = async () => {
  afspraakData = await GetAfspraak(afspraakId);

  if (pagina == 'volgen') {
    console.log('works');
    // onderstaande vervangt de text in index.html
    document.querySelector('.js-text').textContent = 'Volg Temi...';

    // onderstaande tijdelijk om te testen
    /* let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let indexpage = document.querySelector('.js-temp-click');
    indexpage.addEventListener('click', function () {
      window.location.replace(`gearriveerd.html?afspraakId=${afspraakId}`);
    }); */
  } else if (pagina == 'onderweg') {
    document.querySelector('.js-text').textContent = 'Temi is onderweg...';
    
  } else if (pagina == 'help_onderweg') {
    document.querySelector('.js-text').textContent = 'Er komt zo dadelijk iemand van het onthaal bij u...';

    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    client.publish('F2B/help',  JSON.stringify({"bezoeker": afspraakData, "status": "in behandeling"}));

    // let indexpage = document.querySelector('.js-temp-click');
    // indexpage.addEventListener('click', function () {
    //   window.location.replace('index.html');
    // });
  } else {
    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let indexpage = document.querySelector('.js-temp-click');
    indexpage.addEventListener('click', function () {
      window.location.replace('qr-code.html');
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('Dom is geloaden');
  const params = new URLSearchParams(window.location.search);
  pagina = params.get('pagina');
  afspraakId = params.get('afspraakId');
  returnState = params.get('return');
  btnHulp = document.querySelector('.js-help');
  console.log(pagina);
  console.log(afspraakId);
  listenToButton();
  mergePages();
});
