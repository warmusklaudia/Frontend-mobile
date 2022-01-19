let btnJa;
const listenToButtons = () => {
  btnJa.addEventListener('click', () => {
    window.location.href = `index.html?pagina=help_onderweg&afspraakId=${afspraakId}`;
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContent loaded');
  const params = new URLSearchParams(window.location.search);
  afspraakId = params.get('afspraakId');
  btnJa = document.querySelector('.js-button-ja');
  listenToButtons();
});
