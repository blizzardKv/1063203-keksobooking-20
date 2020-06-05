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
  // Шаффлим дефолтный массив, чтобы значения не повторялись в каждой итерации
  // Возвращаем новый массив, начиная с первого элемента и до элемента с индексом emptyArray
  function getRandomNumberOfElementsFromArray(arr) {
    var emptyArrayWithRandomLenght = Array.of(getRandomNumber(arr.length));
    return shuffleArray(arr).slice(0, emptyArrayWithRandomLenght);
  }

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
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
          'price': '1000',
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
})();
