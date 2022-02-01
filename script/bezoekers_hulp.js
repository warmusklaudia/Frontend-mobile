let btnSolved, locatie, msg;

const options = {
  keepalive: 60,
  clean: true,
};

const client = mqtt.connect('ws://40.113.96.140:80', options);

client.on('connect', function () {
  console.log('Connected to Mqtt!');
});

const ChangeLocation = () => {
  let htmlString = ``;
  htmlString += `<p>Locatie: </br> ${locatie}</p> `;
  console.log(htmlString);
  msg.innerHTML = htmlString;
};

const listenToButtons = () => {
  btnSolved.addEventListener('click', () => {
    client.publish('F2B/help', JSON.stringify({ status: 'opgelost' }));
    window.location.replace(`index_admin.html`);
  });
};

const init = () => {
  const params = new URLSearchParams(window.location.search);
  locatie = params.get('locatie');
  btnSolved = document.querySelector('.js-solved');
  msg = document.querySelector('.js-message');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToButtons();
  ChangeLocation();
});
