'use strict';
(function () {
  var OFFERS_NUMBER = 8;
  var OFFER_TITLES = ['Шикарная квартира', 'Уютная комната', 'Огромный дворец', 'Просторное бунгало'];
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

  // Скрываем лэйаут карты
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var mapPinsArea = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
    var emptyArrayWithRandomLenght = Array.of(getRandomNumber(arr.length));
    return shuffleArray(arr).slice(0, emptyArrayWithRandomLenght);
  }
  function shuffleArray(arr) {
    return arr.sort(function() {
      return Math.random() - 0.5;
    })
  }

  // Создаем функцию создания шаблона массива с моками данных.
  function createMocksForData(count) {
    var dataList = [];

    for (var i = 0; i < count; i++) {
      var locationX = getRandomNumber(mapPinsArea.offsetWidth) + 1;

      // Получаем рандомную координату по Y. Для этого берем минимальное значение (чтобы в любом случае было 130)
      // И добавляем интервал в 500 для вычисления координаты по У. Т.е. maxY может быть только 630.
      var locationY = Math.floor(MIN_COORDINATE_Y + (Math.random() * (MAX_COORDINATE_Y - MIN_COORDINATE_Y) + 1));
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
  generatePins(createMocksForData(OFFERS_NUMBER));

  // Функция по генерации информации для карточки объявления.
  // Клонируем имеющийся шаблон, выбираем в новом шаблоне элементы, добавляем информацию.
  function fillCardWithInformation(cardInfo) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var newCard = cardTemplate.cloneNode(true);

    // Сделаем массив с шаблонами для конкатенации строк.
    var wordsTemplate = {
      nightCost: ' ₽/ночь.',
      pretext: ' для ',
      space: ' ',
      checkIn: 'Заезд после ',
      checkOut: 'выезд до ',
      comma: ', '
    };

    // Выбираем каждый элемент в переменную
    var offerTitle = newCard.querySelector('.popup__title');
    var offerAddress = newCard.querySelector('.popup__text--address');
    var offerPrice = newCard.querySelector('.popup__text--price');
    var offerType = newCard.querySelector('.popup__type');
    var offerGuestsInfo = newCard.querySelector('.popup__text--capacity');
    var offerGuestsTime = newCard.querySelector('.popup__text--time');
    var offerDescription = newCard.querySelector('.popup__description');
    var offerFeatures = newCard.querySelector('.popup__features');
    var offerPhoto = newCard.querySelector('.popup__photos img');
    var offerAvatar = newCard.querySelector('.popup__avatar');

    // Проверяем элемент на наличие даты, если она есть, рендерим)
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

    return newCard;
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
  function translateNamesOfHouses (house) {
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
        break
    }

    return switchedNoun;
  }

  // Проверяем падеж у слова "гость"
  function getGuestsCases(noun) {
    return noun.offer.guests === 1 ? 'гостя' : 'гостей';
  }

  function getFeaturesImages(feature) {
    var opt = '';
    var wifi = document.querySelector('.popup__feature--wifi');
    var dishwasher = document.querySelector('.popup__feature--dishwasher');
    var parking = document.querySelector('.popup__feature--parking');
    var washer = document.querySelector('.popup__feature--washer');
    var elevator = document.querySelector('.popup__feature--elevator');
    var conditioner = document.querySelector('.popup__feature--conditioner');
  }

  // Создаем карточку для первого объявления. Создаем пустой фрагмент, заполняем информацией из функции выше, вставляем его.
  function createCard(cardInfo) {
    var fragment = document.createDocumentFragment();
    var cardContainer = document.querySelector('.map__filters-container');

    fragment.appendChild(fillCardWithInformation(cardInfo));
    cardContainer.appendChild(fragment)
  }

  createCard(createMocksForData(OFFERS_NUMBER)[0]);
})();
