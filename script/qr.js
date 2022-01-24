// code = 'c78be457-1e1c-49ec-9271-4dc05b3da335';
// var arrayCode = ['c78be457-1e1c-49ec-9271-4dc05b3da335', 'aa4fddf5-fe6f-4036-ae87-c16f4439d81c', '451c5279-f4ff-4b27-ab6c-d1d13044a67a', 'af1b5fdd-3293-4f4c-bb38-a1890c882512', 'a03917bc-811d-42a4-9796-5ff4eeb8940c', '123456789'];

// let afspraakJson = [];

// const showResult = (queryResponse) => {
//   for (let i = 0; i < queryResponse.length; i++) {
//     afspraakJson[i] += `${queryResponse[i].afspraakId}`;
//   }
//   afspraakJson[queryResponse.length] += '1234587654326453';
//   var randomCode = afspraakJson[Math.floor(Math.random() * afspraakJson.length)];
//   qrcode(randomCode.substring(9));
//   test(randomCode.substring(9));
// };

const get = (url) => fetch(url).then((r) => r.json());

const getAfspraken = async () => {

  // id uit de url halen
  var urlParams = new URLSearchParams(window.location.search);
  let id
  if (urlParams.has('qrcode')) { // true
    id = urlParams.get('qrcode'); // "edit"
  };
    

  // afspraak ophalen met 
  const endPoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/${id}`;
  const response = await get(endPoint);
  
  // control of de id bestaat / juist is
  // correct id: 2cde76d0-1834-4814-922f-936a6bdbf68d
  if (response["afspraakId"] == null) {
    console.log('wrong ID');

    let message = document.querySelector(".js-message")
    message.textContent = "Uw afspraakcode is ongeldig. Gelieve een geldige afspraakcode te gebruiken."


    //errorSvg.textContent = 

    var img = document.createElement('img'); 
    img.src = 'img/png/299045_sign_error_icon.png';
    img.classList.add("c-error")
	  document.getElementById('pagina').appendChild(img);

    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let nextpage = document.querySelector('.js-temp-click');
    nextpage.addEventListener('click', function () {
      window.location.href = 'error.html';
    });
    
    
  } else {
    console.log('Good ID');

    qrcode(id)
    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let nextpage = document.querySelector('.js-temp-click');
    nextpage.addEventListener('click', function () {
      window.location.href = `omkleden.html?afspraakId=${id}`;
    });
  }
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

// const test = (code) => {
//   if (code == '1234587654326453') {
//     console.log('wrong ID');

//     let pagina = document.getElementById('pagina');
//     pagina.classList.add('js-temp-click');

//     let nextpage = document.querySelector('.js-temp-click');
//     nextpage.addEventListener('click', function () {
//       window.location.href = 'error.html';
//     });
//   } else {
//     console.log('Good ID');

//     let pagina = document.getElementById('pagina');
//     pagina.classList.add('js-temp-click');

//     let nextpage = document.querySelector('.js-temp-click');
//     nextpage.addEventListener('click', function () {
//       window.location.href = `omkleden.html?afspraakId=${code}`;
//     });
//   }
// };

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  getAfspraken();
});
