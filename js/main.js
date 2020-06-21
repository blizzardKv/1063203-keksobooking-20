'use strict';
(function () {
  var OFFERS_NUMBER = 8;
  var MAX_RENT_PRICE = 1000000;
  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 100;

  setMapDefaultState();

  // Задаем дефолтное состояние для карты и сразу же вызываем функцию
  function setMapDefaultState() {
    window.utils.controlsSetAttribute(window.domComponents.formInputElements);
    window.utils.controlsSetAttribute(window.domComponents.formSelectElements);
    window.domComponents.mapFilters.setAttribute('disabled', 'disabled');
    window.domComponents.formTextarea.setAttribute('disabled', 'disabled');
    window.domComponents.formSubmit.setAttribute('disabled', 'disabled');
    // Чтобы не мозолило глаза, а то дефолтный плейсхолдер не соответствует дефолтному значению
    window.domComponents.rentPrice.setAttribute('placeholder', '1000');
  }

  // Добавляем слушателя для инициализации карты, проверяем клик левой кнопкой
  window.domComponents.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  window.domComponents.mainPin.addEventListener('keydown', mainPinKeydownHandler);

  function mainPinMousedownHandler(evt) {
    if (evt.button === 0) {
      initMapActiveState();
    }
  }

  function mainPinKeydownHandler(e) {
    if (e.key === 'Enter') {
      initMapActiveState();
    }
  }

  // Коллбэк, убирает класс с карты, рендерим пины, убираем атрибуты disabled, снимаем слушателя с mainPin
  function initMapActiveState() {
    window.domComponents.addressInput.setAttribute('readonly', 'readonly');
    window.domComponents.map.classList.remove('map--faded');
    window.domComponents.form.classList.remove('ad-form--disabled');
    window.utils.controlsRemoveAttribute(window.domComponents.formInputElements);
    window.utils.controlsRemoveAttribute(window.domComponents.formSelectElements);
    window.domComponents.mapFilters.removeAttribute('disabled');
    window.domComponents.formTextarea.removeAttribute('disabled');
    window.domComponents.formSubmit.removeAttribute('disabled');
    window.domComponents.mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    window.domComponents.mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    window.card.generateCard(window.card.createCardExample());
    window.pin.generatePins(pinsData);
    window.domComponents.addressInput.value = window.pin.setPinCoordinates();
  }

  // Добавляем слушателя на сабмит, если валидация успешна.
  window.domComponents.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (window.domComponents.validationMark === true) {
      window.domComponents.form.submit();
    }
  });

  // Добавляем слушателя на форму для проверки соответствия в валидации
  window.domComponents.form.addEventListener('change', validatorsHandler);

  window.domComponents.submitButton.addEventListener('click', validatorsHandler);

  var pinsData = window.data.createMocksForData(OFFERS_NUMBER);

  // Вызываем нужную карточку товаров. Делегируем событие, проверяем пин ли это -
  // используем closest (т.к. eventTarget у нас - будет либо svg, либо остриё пина). Получаем у тыкаемого пина src аватарки,
  // проходим циклом по массиву с датой, выводим только нужную карточку с совпадающей аватаркой.
  // сейчас проверка по аватарке, а так по хорошему использовался бы какой-то элемент типа id
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

  cardInitClickHandler(pinsData);
  cardInitKeydownHandler(pinsData);

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

  window.pin.moveMainPin();
})();
