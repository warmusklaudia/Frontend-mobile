let afspraakId;
let btnKleedkamer, btnSportscube;

const listenToButton = () => {
  btnJa.addEventListener('click', () => {
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });
  btnNee.addEventListener('click', () => {
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });
};

const options = {
  keepalive: 60,
  clean: true,
  rejectUnauthorized: false,
  checkServerIdentity: false,
};

const client = mqtt.connect('mqtt://13.81.105.139', options);

function listenToButtons() {
  btnKleedkamer.addEventListener('click', function () {
    client.publish('F2B/locatie', JSON.stringify({ locatie: 'onderweg naar kleedkamer' }));
  });
  btnSportscube.addEventListener('click', function () {
    client.publish('F2B/locatie', JSON.stringify({ locatie: 'onderweg naar sportscube' }));
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');

  btnKleedkamer = document.querySelector('.js-kleedkamer');
  btnSportscube = document.querySelector('.js-sportscube');

  init();
  listenToButtons();
  listenToButton();
});
