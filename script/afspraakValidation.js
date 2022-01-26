let naam = {},
  voornaam = {},
  email = {},
  voegAfspraakToe,
  afspraakForm,
  messageAfspraak,
  terugButton;

const isValidEmailAddress = function (emailAddress) {
  // Basis manier om e-mailadres te checken.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};

const isValidName = function () {
  if (!isEmpty(naam.input.value)) {
    naam.input.removeEventListener('input', isValidName);
    removeErrors(naam);
  } else {
    naam.errorMessage.innerText = 'This field is required';
    addErrors(naam);
  }
};

const isValidFirstName = function () {
  if (!isEmpty(voornaam.input.value)) {
    voornaam.input.removeEventListener('input', isValidFirstName);
    removeErrors(voornaam);
  } else {
    voornaam.errorMessage.innerText = 'This field is required';
    addErrors(voornaam);
  }
};

const isValidDate = function () {
  if (!isEmpty(datum.input.value)) {
    datum.input.removeEventListener('input', isValidDate);
    removeErrors(datum);
  } else {
    datum.errorMessage.innerText = 'This field is required';
    addErrors(datum);
  }
};

const isValidUur = function () {
  if (!isEmpty(uur.input.value)) {
    uur.input.removeEventListener('input', isValidUur);
    removeErrors(uur);
  } else {
    uur.errorMessage.innerText = 'This field is required';
    addErrors(uur);
  }
};

const isEmpty = function (fieldValue) {
  return !fieldValue || fieldValue.length < 1;
};

const doubleCheckEmailAddress = function () {
  if (isValidEmailAddress(email.input.value)) {
    email.input.removeEventListener('input', doubleCheckEmailAddress);
    removeErrors(email);
  } else {
    if (isEmpty(email.input.value)) {
      email.errorMessage.innerText = 'This field is required';
    } else {
      email.errorMessage.innerText = 'Invalid emailaddress';
    }
  }
};

const addErrors = function (formField) {
  formField.field.classList.add('has-error');
  formField.errorMessage.classList.add('is-visible');
};

const removeErrors = function (formField) {
  formField.field.classList.remove('has-error');
  formField.errorMessage.classList.remove('is-visible');
};

const getDOMElements = function () {
  email.label = document.querySelector('.js-email-label');
  email.errorMessage = email.label.querySelector('.js-email-error-message');
  email.input = document.querySelector('.js-email-input');
  email.field = document.querySelector('.js-email-field');

  naam.label = document.querySelector('.js-naam-label');
  naam.errorMessage = naam.label.querySelector('.js-naam-error-message');
  naam.input = document.querySelector('.js-naam-input');
  naam.field = document.querySelector('.js-naam-field');

  voornaam.label = document.querySelector('.js-voornaam-label');
  voornaam.errorMessage = voornaam.label.querySelector('.js-voornaam-error-message');
  voornaam.input = document.querySelector('.js-voornaam-input');
  voornaam.field = document.querySelector('.js-voornaam-field');

  datum.label = document.querySelector('.js-datum-label');
  datum.errorMessage = datum.label.querySelector('.js-datum-error-message');
  datum.input = document.querySelector('.js-datum-input');
  datum.field = document.querySelector('.js-datum-field');

  uur.label = document.querySelector('.js-uur-label');
  uur.errorMessage = uur.label.querySelector('.js-uur-error-message');
  uur.input = document.querySelector('.js-uur-input');
  uur.field = document.querySelector('.js-uur-field');

  telefoon.input = document.querySelector('.js-telefoon-input');

  voegAfspraakToe = document.querySelector('.js-voeg-afspraak-toe-btn');
  afspraakForm = document.getElementById('afspraak-form');
  terugButton = document.querySelector('.js-terug-btn');
  messageAfspraak = document.querySelector('.js-mess-toegevoegd');
};

const enableListeners = function () {
  email.input.addEventListener('blur', function () {
    if (!isValidEmailAddress(email.input.value)) {
      if (isEmpty(email.input.value)) {
        email.errorMessage.innerText = 'This field is required';
      } else {
        email.errorMessage.innerText = 'Invalid emailaddress';
      }

      addErrors(email);
      email.input.addEventListener('input', doubleCheckEmailAddress);
    }
  });

  voegAfspraakToe.addEventListener('click', function (e) {
    // We gaan de form zelf versturen wanneer nodig.
    e.preventDefault();

    if (isValidEmailAddress(email.input.value) && !isEmpty(naam.input.value) && !isEmpty(voornaam.input.value) && !isEmpty(datum.input.value) && !isEmpty(uur.input.value)) {
      removeErrors(email);
      removeErrors(naam);
      removeErrors(voornaam);
      removeErrors(datum);
      console.info('Form is good to go.');

      // hier values ophalen en submitten
      let jsonObject = { datum: datum.input.value, voornaam: voornaam.input.value, naam: naam.input.value, email: email.input.value, tijdstip: uur.input.value, telefoon: telefoon.input.value };

      if (isEmpty(telefoon.input.value)) {
        jsonObject['telefoon'] = null;
        // otherwise you'll just end up with an empty, but not null field in the table
      }
      messageAfspraak.style.display = 'block';

      console.log('New object created: %O', jsonObject);

      const postMethod = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(jsonObject),
      };

      fetch(`https://bezoekersapi.azurewebsites.net/api/afspraken`, postMethod)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

      alert('Afspraak toegevoegd');

      afspraakForm.reset();
    } else {
      if (!isValidEmailAddress(email.input.value)) {
        addErrors(email);
        email.input.addEventListener('input', doubleCheckEmailAddress);
      }
      if (isEmpty(naam.input.value)) {
        console.log('Name looks empty...');
        addErrors(naam);
        naam.input.addEventListener('input', isValidName);
      }
      if (isEmpty(voornaam.input.value)) {
        console.log('First name looks empty...');
        addErrors(voornaam);
        voornaam.input.addEventListener('input', isValidFirstName);
      }
      if (isEmpty(datum.input.value)) {
        console.log('Date looks empty...');
        addErrors(datum);
        datum.input.addEventListener('input', isValidDate);
      }
      if (isEmpty(uur.input.value)) {
        console.log('Hour looks empty...');
        addErrors(uur);
        uur.input.addEventListener('input', isValidUur);
      }
    }
  });

  terugButton.addEventListener('click', () => {
    window.location.href = 'index_admin.html';
  });
};

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded 🥳!');
  getDOMElements();
  enableListeners();
});
