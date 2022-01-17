let btnKleedkamer, btnSportscube;
let json;
let code = 'af1b5fdd-3293-4f4c-bb38-a1890c882512';
let response;

const listenToButtons = async () => {
  let bezoekersData = await getVisitorData(code);
  console.log(bezoekersData);

  btnKleedkamer.addEventListener('click', () => {
    json = { locatie: 'onderweg naar kleedkamer' };
    changeLocation(code, json);
    console.log(json);
    // voorlopig een sleep function
    sleep(5000).then(() => {
      json = { locatie: 'kleedkamer' };
      changeLocation(code, json);
      console.log(json);
    });
  });
  btnSportscube.addEventListener('click', () => {
    json = { locatie: 'onderweg naar sportscube' };
    changeLocation(code, json);
    console.log(json);
    // voorlopig een sleep function
    sleep(5000).then(() => {
      json = { locatie: 'sportscube' };
      changeLocation(code, json);
      console.log(json);
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