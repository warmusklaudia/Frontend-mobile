let btnKleedkamer, btnSportscube, btnHulp, btnOnthaal;
let json;
let response, afspraakId;

const options = {
  keepalive: 60,
  clean: true,
};

const client = mqtt.connect('ws://40.113.96.140:80', options);

client.on('connect', function () {
  console.log('Connected to mqtt');
});

const listenToButtons = async () => {
  btnKleedkamer.addEventListener('click', () => {
    json = { locatie: 'onderweg naar kleedkamer' };
    changeLocation(json);
    console.log(json);
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });
  btnSportscube.addEventListener('click', () => {
    json = { locatie: 'onderweg naar sportscube' };
    changeLocation(json);
    console.log(json);
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });
  btnOnthaal.addEventListener('click', () => {
    json = { locatie: 'onderweg naar onthaal' };
    changeLocation(json);
    console.log(json);
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });

  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

const showResult = (queryResponse) => {
  for (let i = 0; i < queryResponse.length; i++) {
    afspraakJson += `\n ${queryResponse[i].afspraakId}`;
  }
  console.log(afspraakJson);
};

const changeLocation = (jsonObject) => {
  client.publish('F2B/locatie', JSON.stringify(json));
};

const get = (url) => fetch(url).then((r) => r.json());

const getVisitorData = async (id) => {
  const endpoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/${id}`;
  response = await get(endpoint);
  return response;
};

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const init = () => {
  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');

  btnKleedkamer = document.querySelector('.js-kleedkamer');
  btnSportscube = document.querySelector('.js-sportscube');
  btnOnthaal = document.querySelector('.js-onthaal');
  btnHulp = document.querySelector('.js-help');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToButtons();
});
