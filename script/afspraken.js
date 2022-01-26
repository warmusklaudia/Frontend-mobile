'use strict';
let currentAfspraakID; // is geen DOM reference maar globale variabele

//#region ***  DOM references                           ***********
let htmlAfspraak;
//#endregion

//#region ***  Callback-Visualisation - show___         ***********
const showAfspraken = function (jsonObject) {
  //Toon menu
  console.log(jsonObject);
  let htmlstring_afspraak = '';
  for (const afspraak of jsonObject) {
    htmlstring_afspraak += `<div class="c-afspraak">
    <div class="c-afspraak__info">
      <p class="c-afspraak__name">${afspraak.naam}</p>
      <p class="c-afsrpaak__firstname">${afspraak.voornaam}</p>
    </div>
    <div class="c-afspraak__date">${afspraak.datum}</div>
    <div class="c-afspraak__hour">${afspraak.tijdstip}</div>
    <div class="c-afpraak__delete">
      <svg class="c-afspraak__delete-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  </div>`;
  }
  htmlAfspraak.innerHTML = htmlstring_afspraak;
};
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***********

//#endregion

//#region ***  Data Access - get___                     ***********
const getAfspraken = async () => {
    const endpoint = `https://bezoekersapi.azurewebsites.net/api/afspraken/`;
  
    const request = await fetch(`${endpoint}`);
    const afspraak = await request.json();
    console.log(afspraak);
  
    showAfspraken(afspraak);
  };
//#endregion

//#region ***  Event Listeners - listenTo___            ***********

//#endregion

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
  // Get some DOM, we created empty earlier.
  htmlAfspraak = document.querySelector('.js-afspraken');

  //deze code wordt gestart vanaf index.html
  getAfspraken();
};

document.addEventListener('DOMContentLoaded', init);
//#endregion