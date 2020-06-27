'use strict';
(function () {
  var MAX_RENT_PRICE = 1000000;
  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 100;

  // Задаем дефолтное состояние для карты и сразу же вызываем функцию
  function setMapDefaultState() {
    window.domComponents.textInput.setAttribute('required', 'required');
    window.domComponents.rentPrice.setAttribute('required', 'required');
    window.utils.setCustomAttributeOnCollection(window.domComponents.mapFiltersSelects, 'disabled', 'disabled');
    window.utils.setCustomAttributeOnCollection(window.domComponents.mapFiltersInputs, 'disabled', 'disabled');
    window.domComponents.mapFilters.setAttribute('disabled', 'disabled');
    window.domComponents.formTextarea.setAttribute('disabled', 'disabled');
    window.domComponents.formSubmit.setAttribute('disabled', 'disabled');
    // Чтобы не мозолило глаза, а то дефолтный плейсхолдер не соответствует дефолтному значению
    window.domComponents.rentPrice.setAttribute('placeholder', '1000');
  }

  setMapDefaultState();

  // Коллбэк, убирает класс с карты, рендерим пины, убираем атрибуты disabled, снимаем слушателя с mainPin
  function initMapActiveState() {
    window.parseResponse.load(cardInitClickHandler);
    window.parseResponse.load(cardInitKeydownHandler);

    window.parseResponse.load(window.pin.generatePins);
    window.card.generateCard(window.card.createCardExample());

    window.domComponents.addressInput.setAttribute('readonly', 'readonly');
    window.domComponents.addressInput.value = window.pin.setPinCoordinates();

    window.domComponents.map.classList.remove('map--faded');
    window.domComponents.form.classList.remove('ad-form--disabled');

    window.utils.controlsRemoveAttribute(window.domComponents.formInputElements);
    window.utils.controlsRemoveAttribute(window.domComponents.formSelectElements);

    window.domComponents.mapFilters.removeAttribute('disabled');
    window.domComponents.formTextarea.removeAttribute('disabled');
    window.domComponents.formSubmit.removeAttribute('disabled');

    window.domComponents.mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    window.domComponents.mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  }

  window.pin.moveMainPin();

  // Слушатели родительского модуля
  window.domComponents.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  window.domComponents.mainPin.addEventListener('keydown', mainPinKeydownHandler);

  // Вызываем нужную карточку товаров. Делегируем событие, проверяем пин ли это -
  function cardInitClickHandler(cardInfo) {
    window.domComponents.mapPinsArea.addEventListener('click', function (evt) {
      window.card.createAppropriateCard(evt, cardInfo);
    });
  }

  // Не работает, вероятно из-за closest. Рендер карточки по нажатию Enter на pin.
  function cardInitKeydownHandler(cardInfo) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.createAppropriateCard(evt, cardInfo);
      }
    });
  }

  window.domComponents.submitButton.addEventListener('click', validatorsHandler);

  // Добавляем слушателя для инициализации карты, проверяем клик левой кнопкой

  function mainPinMousedownHandler(evt) {
    if (evt.button === 0) {
      initMapActiveState();
    }
  }

  function mainPinKeydownHandler(evt) {
    if (evt.key === 'Enter') {
      initMapActiveState();
    }
  }

  // Валидация
  function submitButtonClickHandler() {
    window.validators.compareNumberOfRoomsWithNumberOfGuests();
    window.validators.checkMaxRentPrice(MAX_RENT_PRICE);
    window.validators.checkFieldTextLength(window.domComponents.textInput, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);
  }

  window.domComponents.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  window.domComponents.mainPin.addEventListener('keydown', mainPinKeydownHandler);

  // Слушатели на синхронизацию изменений времени выезда/заезда
  window.domComponents.checkInField.addEventListener('change', function () {
    window.domComponents.checkOutField.value = window.domComponents.checkInField.value;
  });

  window.domComponents.checkOutField.addEventListener('change', function () {
    window.domComponents.checkInField.value = window.domComponents.checkOutField.value;
  });

  // Слушатель на изменение типа жилья и выставление соответствующей минимальной цены аренды
  window.domComponents.houseType.addEventListener('change', window.validators.setPropriateValue);

  // Вызов валидаторов с флагом
  function validatorsHandler() {
    window.validators.compareNumberOfRoomsWithNumberOfGuests();
    window.validators.checkMaxRentPrice(MAX_RENT_PRICE);
    window.validators.checkFieldTextLength(window.domComponents.textInput, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);
  }

  function formChangeHandler() {
    window.validators.compareNumberOfRoomsWithNumberOfGuests();
  }

  // Добавляем слушателя на форму для проверки соответствия в валидации
  window.domComponents.form.addEventListener('change', formChangeHandler);

  // Добавляем слушателя на сабмит, если валидация успешна.
  window.domComponents.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.domComponents.validationMark === true) {
      window.domComponents.form.submit();
    }
  });

  window.domComponents.submitButton.addEventListener('click', submitButtonClickHandler);

  // Слушатель на изменение типа жилья и выставление соответствующей минимальной цены аренды
  window.domComponents.houseType.addEventListener('change', function () {
    if (window.domComponents.houseType.value === 'bungalo') {
      window.domComponents.rentPrice.min = 0;
      window.domComponents.rentPrice.placeholder = 0;
    } else if (window.domComponents.houseType.value === 'flat') {
      window.domComponents.rentPrice.min = 1000;
      window.domComponents.rentPrice.placeholder = 1000;
    } else if (window.domComponents.houseType.value === 'house') {
      window.domComponents.rentPrice.min = 5000;
      window.domComponents.rentPrice.placeholder = 5000;
    } else if (window.domComponents.houseType.value === 'palace') {
      window.domComponents.rentPrice.min = 10000;
      window.domComponents.rentPrice.placeholder = 10000;
    }
  });

  // Слушатели на синхронизацию изменений времени выезда/заезда
  window.domComponents.checkInField.addEventListener('change', function () {
    window.domComponents.checkOutField.value = window.domComponents.checkInField.value;
  });

  window.domComponents.checkOutField.addEventListener('change', function () {
    window.domComponents.checkInField.value = window.domComponents.checkOutField.value;
  });
})();
