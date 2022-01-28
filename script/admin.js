let btnAfspraken, btnHomebase;

const listenToButtons = () => {
  btnAfspraken.addEventListener('click', () => {
    window.location.href = `afspraken.html`;
  });
};

const init = () => {
  btnAfspraken = document.querySelector('.js-afspraken');
  btnHomebase = document.querySelector('.js-homebase');
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToButtons();
});
