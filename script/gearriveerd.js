let btnKleedkamer, btnSportscube, afspraakId, btnHulp;

const listenToButton = () => {
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

const options = {
  keepalive: 60,
  clean: true,
  rejectUnauthorized: false,
  checkServerIdentity: false,
};

const client = mqtt.connect('mqtt://13.81.105.139', options);

function sendMessage() {
  client.publish('F2B/locatie', JSON.stringify({ status: 'gearriveerd' }));
}

const setTime = () => {
  setTimeout(function () {
    window.location.href = `terugroepen.html?afspraakId=${afspraakId}`;
  }, 1900);
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');
  btnHulp = document.querySelector('.js-help');
  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');
  listenToButton();
  sendMessage();
  setTime();
});
