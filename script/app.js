let btnKleedkamer, btnSportscube, btnHulp, btnOnthaal;
let json;
// let code = 'af1b5fdd-3293-4f4c-bb38-a1890c882512';
let response, afspraakId;

const options = {
  keepalive: 60,
  clean: true,
  rejectUnauthorized: false,
  checkServerIdentity: false,
};

const client = mqtt.connect('mqtt://13.81.105.139', options);

client.on('connect', function () {
  console.log('Connected to mqtt');
});

const listenToButtons = async () => {
  // let bezoekersData = await getVisitorData(code);
  // console.log(bezoekersData);

  btnKleedkamer.addEventListener('click', () => {
    json = { locatie: 'onderweg naar kleedkamer' };
    changeLocation(json);
    console.log(json);
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;

    // voorlopig een sleep function
    // sleep(5000).then(() => {
    //   json = { locatie: 'kleedkamer' };
    //   changeLocation(code, json);
    //   console.log(json);
    // });
  });
  btnSportscube.addEventListener('click', () => {
    json = { locatie: 'onderweg naar sportscube' };
    changeLocation(json);
    console.log(json);
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;

    // voorlopig een sleep function
    // sleep(5000).then(() => {
    //   json = { locatie: 'sportscube' };
    //   changeLocation(code, json);
    //   console.log(json);
    // });
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
  // const putMethod = {
  //   method: 'PUT', // Method itself
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8', // Indicates the content
  //   },
  //   body: JSON.stringify(jsonObject), // We send data in JSON format
  // };

  // // make the HTTP put request using fetch api
  // fetch(`https://bezoekersapi.azurewebsites.net/api/afspraken/${id}/locatie`, putMethod)
  //   .then((response) => response.json())
  //   .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
  //   .catch((err) => console.log(err)); // Do something with the error

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
