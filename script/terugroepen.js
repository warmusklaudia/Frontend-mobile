let btnTerugroepen, btnHulp, afspraakId;

const listenToButtons = () => {
  btnTerugroepen.addEventListener('click', () => {
    window.location.href = `index.html?pagina=onderweg&afspraakId=${afspraakId}`;
  });
  btnHulp.addEventListener('click', () => {
    window.location.href = `help_bevestigen.html?afspraakId=${afspraakId}`;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');
  btnTerugroepen = document.querySelector('.js-btn-roep');
  btnHulp = document.querySelector('.js-help');

  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');
  listenToButtons();
});
