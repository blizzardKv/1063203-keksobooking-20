'use strict';
(function () {
  var OFFERS_NUMBER = 8;
  var OFFER_TITLES = ['Шикарная квартира', 'Уютная комната', 'Огромный дворец', 'Просторное бунгало'];
  var HOUSE_TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var MAX_ROOMS = 10;
  var MAX_GUESTS = 15;
  var CHECK_INS = ['12:00', '13:00', '14:00'];
  var CHECK_OUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Шикарная квартира', 'Уютная комната', 'Огромный дворец', 'Просторное бунгало'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var PRICE = 10000;
  var MAX_RENT_PRICE = 1000000;
  var MIN_TEXT_LENGTH = 30;
  var MAX_TEXT_LENGTH = 100;

  // Вводим переменные
  var map = document.querySelector('.map');
  var mapPinsArea = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var form = document.querySelector('.ad-form');
  var formInputElements = form.querySelectorAll('input');
  var formSelectElements = form.querySelectorAll('select');
  var formSubmit = form.querySelector('button[type="submit"]');
  var formTextarea = form.querySelector('textarea');
  var mapFilters = map.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var roomNumberValue = form.querySelector('#room_number');
  var rentPrice = form.querySelector('#price');
  var guestsNumber = form.querySelector('#capacity');
  var validationMark = '';
  var submitButton = form.querySelector('.ad-form__submit');
  var textInput = form.querySelector('#title');
  var houseType = form.querySelector('#type');
  var addressInput = form.querySelector('#address');
  var checkInField = form.querySelector('#timein');
  var checkOutField = form.querySelector('#timeout');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapFiltersInputs = mapFilters.querySelectorAll('input');

  function controlsRemoveAttribute(controls) {
    controls.forEach(function (control) {
      control.removeAttribute('disabled');
    });
  }

  setMapDefaultState();

  function setCustomAttributeOnCollection(elements, attribute, property) {
    elements.forEach(function (elem) {
      elem.setAttribute(attribute, property);
    });
  }

  // Задаем дефолтное состояние для карты и сразу же вызываем функцию
  function setMapDefaultState() {
    textInput.setAttribute('required', 'required');
    rentPrice.setAttribute('required', 'required');
    setCustomAttributeOnCollection(mapFiltersSelects, 'disabled', 'disabled');
    setCustomAttributeOnCollection(mapFiltersInputs, 'disabled', 'disabled');
    mapFilters.setAttribute('disabled', 'disabled');
    formTextarea.setAttribute('disabled', 'disabled');
    formSubmit.setAttribute('disabled', 'disabled');
    // Чтобы не мозолило глаза, а то дефолтный плейсхолдер не соответствует дефолтному значению
    rentPrice.setAttribute('placeholder', '1000');
  }

  // Добавляем слушателя для инициализации карты, проверяем клик левой кнопкой

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
  mainPin.addEventListener('keydown', mainPinKeydownHandler);

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

  // Задаем координаты для поля адреса. Берем с помощью getBoundingRect значения по x,y, height и width пина.
  // Добавляем значения острия, высотпу получаем из getComputedStyle
  function setPinCoordinates() {
    var pinCoordinates = mainPin.getBoundingClientRect();
    var pinEdge = window.getComputedStyle(mainPin, ':after');
    var pinEdgeHeight = parseInt(pinEdge.height, 10);
    return 'x: ' + Math.floor(pinCoordinates.x + pinCoordinates.width / 2) + '; y: ' + Math.floor(pinCoordinates.y + pinCoordinates.height + pinEdgeHeight);
  }

  // Коллбэк, убирает класс с карты, рендерим пины, убираем атрибуты disabled, снимаем слушателя с mainPin
  function initMapActiveState() {
    var pinsData = createMocksForData(OFFERS_NUMBER);
    cardInitClickHandler(pinsData);
    cardInitKeydownHandler(pinsData);
    addressInput.setAttribute('readonly', 'readonly');
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    controlsRemoveAttribute(formInputElements);
    controlsRemoveAttribute(formSelectElements);
    mapFilters.removeAttribute('disabled');
    formTextarea.removeAttribute('disabled');
    formSubmit.removeAttribute('disabled');
    mainPin.removeEventListener('mousedown', mainPinMousedownHandler);
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
    generateCard(createCardExample());
    generatePins(pinsData);
    addressInput.value = setPinCoordinates();
  }

  // Создаем функцию валидации соответствия количеству комнат количества гостей
  function compareNumberOfRoomsWithNumberOfGuests() {
    if (roomNumberValue.value === '1' && guestsNumber.value === '1') {
      validationMark = true;
      roomNumberValue.setCustomValidity('');
    } else {
      roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены для одного гостя, выберите другой вариант');
    }
    if (roomNumberValue.value === '2') {
      if (guestsNumber.value === '1' || guestsNumber.value === '2') {
        validationMark = true;
        roomNumberValue.setCustomValidity('');
      } else {
        roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены для одного или двух гостей, выберите другой вариант');
      }
    }
    if (roomNumberValue.value === '3') {
      if (guestsNumber.value === '1' || guestsNumber.value === '2' || guestsNumber.value === '3') {
        validationMark = true;
        roomNumberValue.setCustomValidity('');
      } else {
        validationMark = false;
        roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены только для гостей, выберите другой вариант');
      }
    }
    if (roomNumberValue.value === '100') {
      if (guestsNumber.value === '0') {
        validationMark = true;
        roomNumberValue.setCustomValidity('');
      } else {
        roomNumberValue.setCustomValidity('Извините, данные апартаменты не предназначены для гостей, выберите другой вариант');
      }
    }
  }

  // Добавляем слушателя на сабмит, если валидация успешна.
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (validationMark === true) {
      form.submit();
    }
  });

  submitButton.addEventListener('click', submitButtonClickHandler);

  function submitButtonClickHandler() {
    compareNumberOfRoomsWithNumberOfGuests();
    checkMaxRentPrice(MAX_RENT_PRICE);
    checkFieldTextLength(textInput, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH);
  }

  // Добавляем слушателя на форму для проверки соответствия в валидации
  form.addEventListener('change', formChangeHandler);

  function formChangeHandler() {
    compareNumberOfRoomsWithNumberOfGuests();
  }

  // Выводим рандомное число
  // Добавляем +1 т.к. Math.floor округляет вниз, а Math.random(max) = 0,9 в периоде.
  function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber + 1);
  }

  // Выводим рандомный элемент в массиве. Для этого возвращаем элемент с i = 0 до i = array.length - 1;
  // Т.к. Единица не входит в рандом, а Math.random(max) = 0,9 в периоде.
  function getRandomElementFromArray(array) {
    return array[getRandomNumber(array.length) - 1];
  }

  // Получаем массив рандомной длины через Array.Of
  // Шаффлим дефолтный массив, чтобы значения перемешивались в каждой итерации
  // Возвращаем новый массив, начиная с первого элемента и до элемента с индексом emptyArray
  function getRandomNumberOfElementsFromArray(arr) {
    var emptyArrayWithRandomLength = Array.of(getRandomNumber(arr.length));
    return shuffleArray(arr).slice(0, emptyArrayWithRandomLength);
  }

  function shuffleArray(arr) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    });
  }

  // Создаем функцию создания шаблона массива с моками данных.
  function createMocksForData(count) {
    var dataList = [];

    for (var i = 0; i < count; i++) {
      var locationX = getRandomNumber(mapPinsArea.offsetWidth) + 1;

      // Получаем рандомную координату по Y. Для этого берем минимальное значение (чтобы в любом случае было 130)
      // И добавляем интервал в 500 для вычисления координаты по У. Т.е. maxY может быть только 630.
      var locationY = Math.floor(MIN_COORDINATE_Y + (getRandomNumber(MAX_COORDINATE_Y - MIN_COORDINATE_Y)));
      var dataForPins = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': getRandomElementFromArray(OFFER_TITLES),
          'address': locationX + ', ' + locationY,
          'price': getRandomNumber(PRICE),
          'type': getRandomElementFromArray(HOUSE_TYPES),
          'rooms': getRandomNumber(MAX_ROOMS),
          'guests': getRandomNumber(MAX_GUESTS),
          'checkin': getRandomElementFromArray(CHECK_INS),
          'checkout': getRandomElementFromArray(CHECK_OUTS),
          'features': getRandomNumberOfElementsFromArray(FEATURES),
          'description': getRandomElementFromArray(DESCRIPTIONS),
          'photos': getRandomElementFromArray(PHOTOS)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };

      dataList.push(dataForPins);
    }
    return dataList;
  }

  // Добавляем функцию по настройке пинов. Клонируем имеющийся темплейт, выбираем в новом темплейте аватар по селектору.
  // Присваиваем значения left/top/src/alt, возвращаем новый пин
  function setPinOptions(data) {
    var newPin = pinTemplate.cloneNode(true);
    var pinAvatar = newPin.querySelector('img');

    newPin.style =
      'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinAvatar.src = data.author.avatar;
    pinAvatar.alt = data.author.title;

    return newPin;
  }

  // Добавляем функцию по созданию пинов. Создаем пустой documentFragment, запускаем цикл по генерации пинов в соответствии
  // с данными из функции setPinOptions, которая обращается к createMocksForData, добавляем их в пустой documentFragment. Вставляем получившийся documentFragment
  // в map__pins.
  function generatePins(pinsList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pinsList.length; i++) {
      fragment.appendChild(setPinOptions(pinsList[i]));
    }

    mapPinsArea.appendChild(fragment);
  }

  // Запускаем цепочку функций по генерации пинов.

  // Функция по генерации информации для карточки объявления.
  // Клонируем имеющийся шаблон, выбираем в новом шаблоне элементы, добавляем информацию.
  function createCardExample() {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    cardTemplate.style.display = 'none';
    return cardTemplate.cloneNode(true);
  }

  function fillCardWithInformation(cardInfo) {
    var cardTemplate = document.querySelector('.map__card');

    // Сделаем объект с шаблонами для конкатенации строк.
    var wordsTemplate = {
      nightCost: ' ₽/ночь.',
      pretext: ' для ',
      space: ' ',
      checkIn: 'Заезд после ',
      checkOut: 'выезд до ',
      comma: ', '
    };

    // Выбираем каждый элемент в переменную
    var offerTitle = cardTemplate.querySelector('.popup__title');
    var offerAddress = cardTemplate.querySelector('.popup__text--address');
    var offerPrice = cardTemplate.querySelector('.popup__text--price');
    var offerType = cardTemplate.querySelector('.popup__type');
    var offerGuestsInfo = cardTemplate.querySelector('.popup__text--capacity');
    var offerGuestsTime = cardTemplate.querySelector('.popup__text--time');
    var offerDescription = cardTemplate.querySelector('.popup__description');
    var offerFeatures = cardTemplate.querySelector('.popup__features');
    var offerPhoto = cardTemplate.querySelector('.popup__photos img');
    var offerAvatar = cardTemplate.querySelector('.popup__avatar');

    // Проверяем элемент на наличие данных, если она есть, рендерим)
    offerTitle.textContent = checkIsDataExists(cardInfo.offer.title, offerTitle);
    offerAddress.textContent = checkIsDataExists(cardInfo.offer.address, offerAddress);
    offerPrice.textContent = checkIsDataExists(cardInfo.offer.price + wordsTemplate.nightCost, offerPrice);
    offerType.textContent = checkIsDataExists(translateNamesOfHouses(cardInfo), offerType);
    offerGuestsInfo.textContent = checkIsDataExists(cardInfo.offer.rooms + wordsTemplate.space + getRoomsCases(cardInfo) + wordsTemplate.pretext + cardInfo.offer.guests + wordsTemplate.space + getGuestsCases(cardInfo), offerGuestsInfo);
    offerGuestsTime.textContent = checkIsDataExists(wordsTemplate.checkIn + cardInfo.offer.checkin + wordsTemplate.comma + wordsTemplate.checkOut + cardInfo.offer.checkout, offerGuestsTime);
    offerDescription.textContent = checkIsDataExists(cardInfo.offer.description, offerDescription);
    checkIsDataExists(createFeatureWithIcon(offerFeatures, cardInfo.offer.features), offerFeatures);
    offerPhoto.src = checkIsDataExists(cardInfo.offer.photos, offerPhoto);
    offerAvatar.src = checkIsDataExists(cardInfo.author.avatar, offerAvatar);

    cardTemplate.style.display = 'block';
  }

  // Добавляем рендер каждой фичи в зависимости от получаемой даты.
  // Создаем пустой фрагмент, проходим по коллекции фич методом forEach.
  // "Стираем" данные в elem - с помощью textContent, иначе сохраняются дефолтные картинки фич.
  // За каждый имеющийся элемент коллекции - создаем li с заданными классами в соответствии с шаблоном
  // Вставляем полученную лишку в пустой докФрагмент. Далее добавляем получившийся докФрагмент в элемент шаблона.
  function createFeatureWithIcon(elem, features) {
    var fragment = document.createDocumentFragment();
    elem.textContent = '';

    features.forEach(function (feature) {
      var elemContainer = document.createElement('li');
      var featureClass = 'popup__feature--' + feature;
      elemContainer.classList.add('popup__feature', featureClass);
      fragment.appendChild(elemContainer);
    });

    return elem.appendChild(fragment);
  }

  // Проверяем наличие даты для рендера.
  // Если её нет или она undefined, то скрываем элемент, куда должна была отправиться дата.
  function checkIsDataExists(data, el) {
    if (data.length === 0 || data.length === 'undefined') {
      el.style.display = 'none';
    }

    return data;
  }

  // Проходим конструкцией switch по имеющимся данным по типу домов. Выводим согласно совпадающей строке.
  function translateNamesOfHouses(house) {
    var translate = '';
    switch (house.offer.type) {
      case 'flat':
        translate = 'Комната';
        break;

      case 'bungalo':
        translate = 'Бунгало';
        break;

      case 'house':
        translate = 'Дом';
        break;

      case 'palace':
        translate = 'Дворец';
        break;
    }

    return translate;
  }

  // Проходим конструкцией switch по имеющимся данным по количеству комнат. Изменяем падежи существительных.
  function getRoomsCases(noun) {
    var switchedNoun = '';
    switch (noun.offer.rooms) {
      case 1:
        switchedNoun = 'комната';
        break;
      case 2:
      case 3:
      case 4:
        switchedNoun = 'комнаты';
        break;
      default:
        switchedNoun = 'комнат';
        break;
    }

    return switchedNoun;
  }

  // Проверяем падеж у слова "гость"
  function getGuestsCases(noun) {
    return noun.offer.guests === 1 ? 'гостя' : 'гостей';
  }

  // Создаем карточку для первого объявления. Создаем пустой фрагмент, заполняем информацией из функции выше, вставляем его.
  function generateCard(cardInfo) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardInfo);

    mapPinsArea.after(fragment);
  }

  // Вызываем нужную карточку товаров. Делегируем событие, проверяем пин ли это -
  // используем closest (т.к. eventTarget у нас - будет либо svg, либо остриё пина). Получаем у тыкаемого пина src аватарки,
  // проходим циклом по массиву с датой, выводим только нужную карточку с совпадающей аватаркой.
  // сейчас проверка по аватарке, а так по хорошему использовался бы какой-то элемент типа id
  function cardInitClickHandler(cardInfo) {
    mapPinsArea.addEventListener('click', function (evt) {
      createAppropriateCard(evt, cardInfo);
    });
  }

  // Не работает, вероятно из-за closest.
  function cardInitKeydownHandler(cardInfo) {
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        createAppropriateCard(evt, cardInfo);
      }
    });
  }

  function createAppropriateCard(evt, cardInfo) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      var pinAvatarSrc = evt.target.getAttribute('src');
      for (var i = 0; i < cardInfo.length; i++) {
        if (pinAvatarSrc === cardInfo[i].author.avatar) {
          fillCardWithInformation(cardInfo[i]);
          modalCloseByClickHandler();
          modalCloseByEscHandler();
        }
      }
    }
  }

  // Функция скрытия карточки. Выбираем карточку саму, и баттон на закрытие.
  // К обсуждению - клик по острию пина
  // Клик по острию пина - не срабатывает, т.к. псевдоэлемент. Можно наверно использовать фичу с pointer-events.
  function modalCloseByClickHandler() {
    var closeButton = document.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', hideModalClickHandler);
    }
  }

  function hideModalClickHandler() {
    var mapCard = document.querySelector('.map__card');
    mapCard.style.display = 'none';
    document.removeEventListener('click', hideModalClickHandler);
  }

  // Переписать на вменяемый коллбэк, когда пойму как правильно переписать.
  function modalCloseByEscHandler() {
    var closeButton = document.querySelector('.popup__close');
    if (closeButton) {
      document.addEventListener('keydown', hideModalClickHandler);
    }
  }

  function hideModalKeydownHandler(el) {
    if (e.key === 'Escape') {
      var mapCard = document.querySelector('.map__card');
      mapCard.style.display = 'none';
    }
    document.removeEventListener('click', hideModalKeydownHandler);
  }

  // Валидации из второй части задания.
  // Проверка длины поля
  function checkFieldTextLength(textField, minLength, maxLength) {
    if (textField.value.length > minLength && textField.value.length < maxLength) {
      textField.setCustomValidity('');
    } else {
      textField.setCustomValidity('Минимальная длина поля - 30 символов, максимальная - 100 символов');
      validationMark = true;
    }
  }

  // Проверка максимальной стоимости аренды
  function checkMaxRentPrice(maxPrice) {
    if (rentPrice.value > maxPrice) {
      validationMark = false;
      rentPrice.setCustomValidity('Максимальная стоимость аренды - 1000000');
    } else {
      validationMark = true;
    }
  }

  // Слушатель на изменение типа жилья и выставление соответствующей минимальной цены аренды
  houseType.addEventListener('change', function () {
    if (houseType.value === 'bungalo') {
      rentPrice.min = 0;
      rentPrice.placeholder = 0;
    } else if (houseType.value === 'flat') {
      rentPrice.min = 1000;
      rentPrice.placeholder = 1000;
    } else if (houseType.value === 'house') {
      rentPrice.min = 5000;
      rentPrice.placeholder = 5000;
    } else if (houseType.value === 'palace') {
      rentPrice.min = 10000;
      rentPrice.placeholder = 10000;
    }
  });

  // Слушатели на синхронизацию изменений времени выезда/заезда
  checkInField.addEventListener('change', function () {
    checkOutField.value = checkInField.value;
  });

  checkOutField.addEventListener('change', function () {
    checkInField.value = checkOutField.value;
  });
})();
