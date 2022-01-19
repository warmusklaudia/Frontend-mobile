let btnTerugroepen, afspraakId;

const listenToButtons = () => {
  btnTerugroepen.addEventListener('click', () => {
    window.location.href = `index.html?pagina=onderweg&afspraakId=${afspraakId}`;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');
  btnTerugroepen = document.querySelector('.js-btn-roep');

  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');
  listenToButtons();
});
