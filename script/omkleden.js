let afspraakId;
let btnKleedkamer, btnSportscube, btnHulp;

const options = {
  keepalive: 60,
  clean: true,
};

const client = mqtt.connect('ws://test.mosquitto.org:8081', options);

function listenToButtons() {
  btnKleedkamer.addEventListener('click', function () {
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
    client.publish('F2B/locatie', JSON.stringify({ locatie: 'onderweg naar kleedkamer' }));
  });
  btnSportscube.addEventListener('click', function () {
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
    client.publish('F2B/locatie', JSON.stringify({ locatie: 'onderweg naar sportscube' }));
  });
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');

  btnKleedkamer = document.querySelector('.js-kleedkamer');
  btnSportscube = document.querySelector('.js-sportscube');
  btnHulp = document.querySelector('.js-help');

  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');

  listenToButtons();
});
