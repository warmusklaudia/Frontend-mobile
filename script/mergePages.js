let pagina, afspraakId, btnHulp;

const listenToButton = () => {
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

const mergePages = () => {
  if (pagina == 'volgen') {
    console.log('works');
    // onderstaande vervangt de text in index.html
    document.querySelector('.js-text').textContent = 'Volg Temi...';

    // onderstaande tijdelijk om te testen
    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let indexpage = document.querySelector('.js-temp-click');
    indexpage.addEventListener('click', function () {
      window.location.replace(`gearriveerd.html?afspraakId=${afspraakId}`);
    });
  } else if (pagina == 'onderweg') {
    document.querySelector('.js-text').textContent = 'Temi is onderweg...';

    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let indexpage = document.querySelector('.js-temp-click');
    indexpage.addEventListener('click', function () {
      window.location.replace(`locaties.html?afspraakId=${afspraakId}`);
    });
  } else if (pagina == 'help_onderweg') {
    document.querySelector('.js-text').textContent = 'Er komt zo dadelijk iemand van het onthaal bij u...';

    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let indexpage = document.querySelector('.js-temp-click');
    indexpage.addEventListener('click', function () {
      window.location.replace('index.html');
    });
  } else {
    let pagina = document.getElementById('pagina');
    pagina.classList.add('js-temp-click');

    let indexpage = document.querySelector('.js-temp-click');
    indexpage.addEventListener('click', function () {
      window.location.replace('qr-code.html');
    });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('Dom is geloaden');
  const params = new URLSearchParams(window.location.search);
  pagina = params.get('pagina');
  afspraakId = params.get('afspraakId');
  btnHulp = document.querySelector('.js-help');
  console.log(pagina);
  console.log(afspraakId);
  listenToButton();
  mergePages();
});
