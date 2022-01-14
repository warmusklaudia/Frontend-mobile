let btnKleedkamer, btnSportscube;
let json;
let code = 'c78be457-1e1c-49ec-9271-4dc05b3da335';

const listenToButtons = async () => {
  let bezoekersData = await getVisitorData(code);
  console.log(bezoekersData);

  btnKleedkamer.addEventListener('click', () => {
    json = { locatie: 'onderweg naar kleedkamer' };
    console.log(json);
    changeLocationInDB(json);
    // voorlopig een sleep function
    sleep(5000).then(() => {
      json = { locatie: 'kleedkamer' };
      changeLocationInDB(json);
      console.log(json);
    });
  });
  btnSportscube.addEventListener('click', () => {
    json = { locatie: 'onderweg naar sportscube' };
    console.log(json);
    changeLocationInDB(json);
    // voorlopig een sleep function
    sleep(5000).then(() => {
      json = { locatie: 'sportscube' };
      console.log(json);
      changeLocationInDB(json);
    });
  });
};

const showResult = (queryResponse) => {
  for (let i = 0; i < queryResponse.length; i++) {
    afspraakJson += `\n ${queryResponse[i].afspraakId}`;
  }
  console.log(afspraakJson);
};

const changeLocationInDB = (jsonObject) => {
  handleData(url, showLastTimeAte, null, 'PUT');
};

const get = (url) => fetch(url).then((r) => r.json());

const getVisitorData = async (id) => {
  const endpoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/${id}`;
  const response = await get(endpoint);

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
