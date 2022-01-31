let btnKleedkamer, btnSportscube;
let json;
let code = '61d5026a-ac5c-442d-90f3-93835e49c89b';
let response;

const options = {
  keepalive: 60,
  clean: true
}

const client = mqtt.connect('ws://40.113.96.140:80', options);

client.on("connect", function(){
  console.log("Connected to mqtt")
})

const listenToButtons = async () => {
  let bezoekersData = await getVisitorData(code);
  console.log(bezoekersData);

  btnKleedkamer.addEventListener('click', () => {
    json = { locatie: 'onderweg naar kleedkamer' };
    changeLocation(code, json);
    console.log(json);

    // voorlopig een sleep function
    sleep(1500).then(() => {
      json = { locatie: 'kleedkamer' };
      changeLocation(code, json);
      console.log(json);
      window.location.href = 'index.html?pagina=volgen';
    });
  });
  btnSportscube.addEventListener('click', () => {
    json = { locatie: 'onderweg naar sportscube' };
    changeLocation(code, json);
    console.log(json);

    // voorlopig een sleep function
    sleep(1500).then(() => {
      json = { locatie: 'sportscube' };
      changeLocation(code, json);
      console.log(json);
      window.location.href = 'index.html?pagina=volgen';
    });
  });
};

const showResult = (queryResponse) => {
  for (let i = 0; i < queryResponse.length; i++) {
    afspraakJson += `\n ${queryResponse[i].afspraakId}`;
  }
  console.log(afspraakJson);
};

const changeLocation = (id, jsonObject) => {
  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
      'Content-type': 'application/json; charset=UTF-8', // Indicates the content
    },
    body: JSON.stringify(jsonObject), // We send data in JSON format
  };

  // make the HTTP put request using fetch api
  fetch(`https://bezoekersapi.azurewebsites.net/api/afspraken/${id}/locatie`, putMethod)
    .then((response) => response.json())
    .then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    .catch((err) => console.log(err)); // Do something with the error

  client.publish("F2B/locatie", JSON.stringify(json));
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
  btnKleedkamer = document.querySelector('.js-kleedkamer');
  btnSportscube = document.querySelector('.js-sportscube');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToButtons();
});
