// code = 'c78be457-1e1c-49ec-9271-4dc05b3da335';
// var arrayCode = ['c78be457-1e1c-49ec-9271-4dc05b3da335', 'aa4fddf5-fe6f-4036-ae87-c16f4439d81c', '451c5279-f4ff-4b27-ab6c-d1d13044a67a', 'af1b5fdd-3293-4f4c-bb38-a1890c882512', 'a03917bc-811d-42a4-9796-5ff4eeb8940c', '123456789'];

let afspraakJson = [];

var randomCode = afspraakJson[Math.floor(Math.random() * afspraakJson.length)];

const showResult = (queryResponse) => {
  for (let i = 0; i < queryResponse.length; i++) {
    afspraakJson[i] += `${queryResponse[i].afspraakId}`;
    console.log(afspraakJson[i].substring(9));
  }
  afspraakJson[queryResponse.length] += '1234587654326453';
  console.log(afspraakJson);
  var randomCode = afspraakJson[Math.floor(Math.random() * afspraakJson.length)];
  qrcode(randomCode.substring(9));
  test(randomCode.substring(9));
};

//const get = (url) => fetch(url).then((r) => r.json());

const getAfspraken = async () => {
  const endPoint = `https://bezoekersapi.azurewebsites.net/api/afspraken`;
  const response = await get(endPoint);
  console.log({ response });
  showResult(response);

  // ***********Indien men de id uit de URL halen gebruik onderstaande code.*************
  // console.log("init works")
  // const params = new URLSearchParams(window.location.search)
  // let code = params.get('qrcode')
  // console.log(code)
  // qrcode(code)
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

    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let nextpage = document.querySelector('.js-temp-click');
    nextpage.addEventListener('click', function () {
      window.location.href = `omkleden.html?afspraakId=${code}`;
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  getAfspraken();
});
