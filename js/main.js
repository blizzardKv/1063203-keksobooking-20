'use strict';
(function () {
  var MAX_RENT_PRICE = 1000000;
  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 100;
  var LEFT_CLICK_ID = 0;

  // Задаем дефолтное состояние для карты и сразу же вызываем функцию
  function setMapDefaultState() {
    window.domComponents.textInput.setAttribute('required', 'required');
    window.domComponents.rentPrice.setAttribute('required', 'required');
    window.domComponents.addressInput.setAttribute('readonly', 'readonly');
    window.domComponents.addressInput.setAttribute('placeholder', '570, 375');
    window.utils.setCustomAttributeOnCollection(window.domComponents.fieldsets, 'disabled', 'disabled');
    window.utils.setCustomAttributeOnCollection(window.domComponents.mapFiltersSelects, 'disabled', 'disabled');
    window.utils.setCustomAttributeOnCollection(window.domComponents.mapFiltersInputs, 'disabled', 'disabled');
    window.domComponents.rentPrice.setAttribute('placeholder', '1000');
    window.domComponents.mapFilters.reset();
    var houseImage = document.querySelector('.house-photo');
    if (houseImage && window.domComponents.previewAvatar) {
      window.domComponents.previewAvatar.src = 'img/muffin-grey.svg';
      // Поставлю заглушку с маффином
      houseImage.src = 'img/muffin-grey.svg';
    }

    if (!window.domComponents.map.classList.contains('map--faded')) {
      window.domComponents.map.classList.add('map--faded');
    }

    var activePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (activePins) {
      activePins.forEach(function (element) {
        element.remove();
      });
    }
    window.utils.removeElements(activePins);
    window.domComponents.form.classList.add('ad-form--disabled');

    // Для второго и последующего запуска. Т.к. по дефолту висит слушатель, насильно убираем его и перевызываем.
    window.domComponents.mainPin.removeEventListener('click', initMapActiveState);
    window.domComponents.mainPin.removeEventListener('keydown', initMapActiveState);
    window.domComponents.mainPin.addEventListener('keydown', initMapActiveState);
    window.domComponents.mainPin.addEventListener('click', initMapActiveState);
    window.domComponents.resetButton.removeEventListener('click', setMapDefaultState);
    window.domComponents.resetButton.removeEventListener('keydown', setMapDefaultState);

    window.domComponents.mainPin.style.left = '570px';
    window.domComponents.mainPin.style.top = '375px';
  }

  setMapDefaultState();

  // Коллбэк, убирает класс с карты, рендерим пины, убираем атрибуты disabled, снимаем слушателя с mainPin
  function initMapActiveState() {
    window.domComponents.form.removeAttribute('readonly');
    window.parseResponse.load(window.parseResponse.urlLoad, window.pin.generatePins);
    window.card.generateCard(window.card.createCardExample());

    window.domComponents.addressInput.setAttribute('readonly', 'readonly');
    window.domComponents.addressInput.value = window.pin.setPinCoordinates();

    window.domComponents.map.classList.remove('map--faded');
    window.domComponents.form.classList.remove('ad-form--disabled');

    window.utils.controlsRemoveAttribute(window.domComponents.formInputElements);
    window.utils.controlsRemoveAttribute(window.domComponents.formSelectElements);

    window.utils.controlsRemoveAttribute(window.domComponents.mapFiltersInputs);
    window.utils.controlsRemoveAttribute(window.domComponents.mapFiltersSelects);

    window.utils.controlsRemoveAttribute(window.domComponents.fieldsets);

    window.domComponents.mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    window.domComponents.mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    window.domComponents.mainPin.removeEventListener('keydown', initMapActiveState);
    window.domComponents.mainPin.removeEventListener('click', initMapActiveState);

    window.domComponents.resetButton.addEventListener('click', setMapDefaultState);
    window.domComponents.resetButton.addEventListener('keydown', setMapDefaultState);

    window.domComponents.mapPinsArea.addEventListener('click', cardInitClickHandler);
    window.domComponents.mapPinsArea.addEventListener('keydown', cardInitKeydownHandler);
    window.domComponents.filters.addEventListener('change', window.debounce.debounceHandler(window.filters.filterAdverts));
  }

  window.pin.moveMainPin();

  window.domComponents.mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  window.domComponents.mainPin.addEventListener('keydown', mainPinKeydownHandler);

  // Вызываем нужную карточку товаров. Делегируем событие, проверяем пин ли это -
  function cardInitClickHandler(evt) {
    window.utils.mapPinsHandler();
    window.card.createAppropriateCard(evt, window.domComponents.adverts);
    if (evt.target.closest('.map__pin')) {
      evt.target.closest('.map__pin').classList.add('map__pin--active');
    }
  }

  // Рендер карточки по нажатию Enter на pin.
  function cardInitKeydownHandler(evt) {
    if (evt.key === window.domComponents.ENTER_BUTTON) {
      window.utils.mapPinsHandler();
      window.card.createAppropriateCard(evt, window.domComponents.adverts);
    }
  }

  // Добавляем слушателя для инициализации карты, проверяем клик левой кнопкой
  function mainPinMousedownHandler(evt) {
    if (evt.button === LEFT_CLICK_ID) {
      initMapActiveState();
    }
  }

  function mainPinKeydownHandler(evt) {
    if (evt.key === window.domComponents.ENTER_BUTTON) {
      initMapActiveState();
    }
  }

  // Валидация и отправка формы
  function submitButtonClickHandler(evt) {
    validatorsHandler();
    if (window.domComponents.globalValidationMark === true) {
      evt.preventDefault();
      window.parseResponse.save(new FormData(window.domComponents.form), function () {
        if (window.domComponents.validationMark === true) {
          window.successUpload.handler();
          window.domComponents.form.reset();
          setMapDefaultState();
          window.domComponents.globalValidationMark = false;
        }
      }, function () {
        window.failedUpload.handler();
      });
    }
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
    window.validators.setPropriateValue();
    window.validators.checkFieldTextLength(window.domComponents.textInput, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);
    if (window.domComponents.validationMark === true &&
      window.domComponents.validationMarkTextLength === true &&
      window.domComponents.validationMarkMaxPrice === true) {
      window.domComponents.globalValidationMark = true;
    }
  }

  function formChangeHandler() {
    window.validators.compareNumberOfRoomsWithNumberOfGuests();
  }

  // Добавляем слушателя на форму для проверки соответствия в валидации
  window.domComponents.form.addEventListener('change', formChangeHandler);

  window.domComponents.submitButton.addEventListener('click', submitButtonClickHandler);

  // Слушатель на изменение типа жилья и выставление соответствующей минимальной цены аренды
  window.domComponents.houseType.addEventListener('change', function () {
    switch (window.domComponents.rentPrice.min && window.domComponents.rentPrice.placeholder) {
      case window.domComponents.houseType.value === window.domComponents.roomTypes.BUNGALO:
        window.domComponents.rentPrice.min = 0;
        window.domComponents.rentPrice.placeholder = 0;
        break;
      case window.domComponents.houseType.value === window.domComponents.roomTypes.ROOM:
        window.domComponents.rentPrice.min = 1000;
        window.domComponents.rentPrice.placeholder = 1000;
        break;
      case window.domComponents.houseType.value === window.domComponents.roomTypes.HOUSE:
        window.domComponents.rentPrice.min = 5000;
        window.domComponents.rentPrice.placeholder = 5000;
        break;
      case window.domComponents.houseType.value === window.domComponents.roomTypes.PALACE:
        window.domComponents.rentPrice.min = 10000;
        window.domComponents.rentPrice.placeholder = 10000;
        break;
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
