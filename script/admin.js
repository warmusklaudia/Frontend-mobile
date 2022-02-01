let btnSolved, btnHomebase, messagePage, msg;

const options = {
  keepalive: 60,
  clean: true,
};

const client = mqtt.connect('ws://40.113.96.140:80', options);

client.on('connect', function () {
  client.subscribe('B2F/help', function (err) {
    if (!err) {
      console.log("Connected to Mqtt!")
    }
  });
});

client.on('message', function (topic, message) {
  msg = JSON.parse(message.toString());

  console.log(`Message: %O on Topic: ${topic}`, msg);

  if (topic == 'B2F/help' && msg.status == "in behandeling" && msg.bezoeker.locatie == null) {
    messagePage.innerHTML = `<p>${msg.bezoeker.voornaam} heeft hulp nodig (onthaal)</p>`;
  }
  else if (topic == 'B2F/help' && msg.status == "in behandeling") {
    messagePage.innerHTML = `<p>${msg.bezoeker.voornaam} heeft hulp nodig (${msg.bezoeker.locatie})</p>`;
  }
});

const listenToButtons = () => {
  btnSolved.addEventListener('click', () => {
    msg.status = "opgelost"
    client.publish('F2B/help',  JSON.stringify(msg));
    messagePage.innerHTML = `<p>Op dit moment heeft niemand hulp nodig</p>`;
  });
};

const init = () => {
  btnSolved = document.querySelector('.js-solved');
  btnHomebase = document.querySelector('.js-homebase');
  messagePage = document.querySelector('.js-message');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToButtons();
});
