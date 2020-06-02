'use strict';
(function () {
  var OFFER_NUMBER = 8;
  var OFFER_TITLES = ['Шикарная квартира', 'Уютная комната', 'Огромный дворец', 'Просторное бунгало'];
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MAX_ROOMS = 10;
  var MAX_GUESTS = 15;
  var CHECK_IN = ['12:00', '13:00', '14:00'];
  var CHECK_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['Шикарная квартира', 'Уютная комната', 'Огромный дворец', 'Просторное бунгало'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  // Скрываем лэйаут карты
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  var mapPinsArea = document.querySelector('.map__pins');
  var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

  // Выводим рандомный элемент в массиве. Для этого возвращаем элемент с i = 0 до i = array.length - 1;
  // Т.к. Math.floor округляет вниз, а Math.random(max) = 0,9 в периоде.
  function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Выводим рандомное число
  // Добавляем +1 т.к. Math.floor округляет вниз, а Math.random(max) = 0,9 в периоде.
  function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber + 1);
  }

  // Выводим рандомное количество элементов в features. Проверяем циклом, чтобы минимум 1 элемент всегда выводился в перечень преимуществ.
  // Далее получаем рандомное свойство, проверяем есть ли оно в массиве, если нет - то пушим в конец массива. Возвращаем массив.
  function getRandomNumberOfElementsFromArray(array) {
    var elements = [];

    for (var i = 0; i < Math.round(Math.random() * array.length + 1); i++) {
      var option = getRandomElementFromArray(array);
      if (elements.indexOf(option) === -1) {
        elements.push(option);
      }
    }
    return elements;
  }

  // Создаем функцию создания шаблона массива с моками данных.
  function createMocksForData(count) {
    var dataList = [];

    for (var i = 0; i < count; i++) {
      var locationX = Math.floor(Math.random() * mapPinsArea.offsetWidth + 1);

      // Получаем рандомную координату по Y. Для этого берем минимальное значение (чтобы в любом случае было 130)
      // И добавляем интервал в 500 для вычисления координаты по У. Т.е. maxY может быть только 630.
      var locationY = Math.floor(MIN_COORDINATE_Y + (Math.random() * (MAX_COORDINATE_Y - MIN_COORDINATE_Y)));
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
          'checkin': getRandomElementFromArray(CHECK_IN),
          'checkout': getRandomElementFromArray(CHECK_OUT),
          'features': getRandomNumberOfElementsFromArray(FEATURES),
          'description': getRandomElementFromArray(DESCRIPTION),
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
  generatePins(createMocksForData(OFFER_NUMBER));
})();
