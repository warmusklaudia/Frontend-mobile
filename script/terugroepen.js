let btnTerugroepen, btnHulp, afspraakId, htmlMess;
let locatieTemi = 'Home base';



const listenToButtons = () => {
  btnTerugroepen.addEventListener('click', () => {
    window.location.href = `index.html?pagina=onderweg&afspraakId=${afspraakId}`;
  });
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

const checkLocation = () => {
  if (locatieTemi == 'Home base') {
    btnTerugroepen.disabled = false;
  } else {
    btnTerugroepen.disabled = true;
    htmlMess.innerHTML = `Even geduld. Temi is bezig.`;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');
  btnTerugroepen = document.querySelector('.js-btn-roep');
  btnHulp = document.querySelector('.js-help');
  htmlMess = document.querySelector('.js-message');
  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');
  afspraakId = 'af1b5fdd-3293-4f4c-bb38-a1890c882512';
  checkLocation();
  listenToButtons();
});
