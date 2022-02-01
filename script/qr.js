let afspraakId, btnHulp;

const options = {
  keepalive: 60,
  clean: true,
};

const client = mqtt.connect('ws://40.113.96.140:80', options);

client.on('connect', function () {
  client.subscribe('B2F/connected', function (err) {
    if (!err) {
      console.log('Connected to mqtt!');
    }
  });
});

client.on('message', function (topic, message) {
  if (topic == 'B2F/connected') {
    id = JSON.parse(message).afspraakId;
    if (id == afspraakId) {
      ('');
      console.log(`Message: ${message.toString()} on Topic: ${topic}`);

      window.location.href = `omkleden.html?afspraakId=${afspraakId}`;
    }
  }
});

const get = (url) => fetch(url).then((r) => r.json());

const getAfspraken = async () => {
  // afspraak ophalen met
  const endPoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/${afspraakId}`;
  const response = await get(endPoint);

  // control of de id bestaat / juist is
  if (response['afspraakId'] == null) {
    let message = document.querySelector('.js-message');
    message.textContent = 'Uw afspraakcode is ongeldig. Gelieve een geldige afspraakcode te gebruiken.';

    var img = document.createElement('img');
    img.src = 'img/png/299045_sign_error_icon.png';
    img.classList.add('c-error');
    document.getElementById('pagina').appendChild(img);
  } else {
    qrcode(afspraakId);
    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');
  }
};

const qrcode = (code) => {
  new QRCode(document.getElementById('qrcode'), {
    text: code,
    width: 150,
    height: 150,
    colorDark: '#282829',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
  });
};

const listenToButtons = () => {
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  btnHulp = document.querySelector('.js-help');

  // id uit de url halen
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('qrcode')) {
    afspraakId = urlParams.get('qrcode'); // "edit"
  }
  getAfspraken();
  listenToButtons();
});
