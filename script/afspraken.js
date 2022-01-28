'use strict';
let currentAfspraakID, messageAfspraak;
let htmlAfspraak, btnAdd, btnHome;

const showAfspraken = function (jsonObject) {
  //Toon menu
  let htmlstring_afspraak = '';
  for (const afspraak of jsonObject) {
    htmlstring_afspraak += `<div class="c-afspraak">
    <div class="c-afspraak__info">
      <p class="c-afspraak__name">${afspraak.naam}</p>
      <p class="c-afsrpaak__firstname">${afspraak.voornaam}</p>
    </div>
    <div class="c-afspraak__date">${afspraak.datum}</div>
    <div class="c-afspraak__hour">${afspraak.tijdstip}</div>
    <div class="c-afspraak__delete">
      <svg class="c-afspraak__delete-symbol js-verwijder-afspraak" data-afspraak-id=${afspraak.afspraakId} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  </div>`;
  }
  htmlAfspraak.innerHTML = htmlstring_afspraak;
  listenToClickRemoveAfspraak();
};

const callbackRemoveAfspraak = function () {
  getAfspraak(currentAfspraakID);
};

const getAfspraken = async () => {
  const endpoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/`;

  const request = await fetch(`${endpoint}`);
  const afspraak = await request.json();
  console.log(afspraak);

  showAfspraken(afspraak);
};

// const getAfspraken = function () {
//   handleData(`https://bezoekersapi.azurewebsites.net/api/afspraken/`, showAfspraken);
// };

const getAfspraak = async (afspraakId) => {
  const endpoint = `http://bezoekersapi.azurewebsites.net/api/afspraken/${afspraakId}`;
  const request = await fetch(`${endpoint}`);
  const data = await request.json();
  console.log(data);

  // showAfspraken(data);
};

// const getAfspraak = function (idAfspraak) {
//   handleData(`http://bezoekersapi.azurewebsites.net/api/afspraken/${idAfspraak}`, showAfspraken);
// };
//#endregion

const listenToClickRemoveAfspraak = function () {
  let text = 'Ben je zeker dat je de afspraak wilt verwijderen?';
  const buttons = document.querySelectorAll('.js-verwijder-afspraak');
  for (const b of buttons) {
    b.addEventListener('click', function () {
      getAfspraken();
      const id = b.getAttribute('data-afspraak-id');
      fetch(`http://bezoekersapi.azurewebsites.net/api/afspraken/${id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => console.log(res));
      getAfspraken();
      messageAfspraak.style.display = 'block';
    });
  }
  // setTimeout(function () {
  //   getAfspraken();
  // }, 1000);
};

const listenToNavigation = () => {
  btnAdd.addEventListener('click', () => {
    window.location.href = `afspraak.html`;
  });

  btnHome.addEventListener('click', () => {
    window.location.href = `index_admin.html`;
  });
};

const init = function () {
  htmlAfspraak = document.querySelector('.js-afspraken');
  messageAfspraak = document.querySelector('.js-mess-verwijderd');
  btnAdd = document.querySelector('.js-button-add');
  btnHome = document.querySelector('.js-button-home');
  getAfspraken();
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM geladen');
  init();
  listenToNavigation();
});
