let afspraakId;

const listenToButtons = () => {
  btnJa.addEventListener('click', () => {
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });
  btnNee.addEventListener('click', () => {
    window.location.href = `index.html?pagina=volgen&afspraakId=${afspraakId}`;
  });
};

const init = () => {
  btnJa = document.querySelector('.js-button-ja');
  btnNee = document.querySelector('.js-button-nee');

  const urlParams = new URLSearchParams(window.location.search);
  afspraakId = urlParams.get('afspraakId');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToButtons();
});
