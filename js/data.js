'use strict';

(function () {
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

  window.data = {
    // Создаем функцию создания шаблона массива с моками данных.
    createMocksForData: function (count) {
      var dataList = [];

      for (var i = 0; i < count; i++) {
        var locationX = window.utils.getRandomNumber(window.domComponents.mapPinsArea.offsetWidth) + 1;

        // Получаем рандомную координату по Y. Для этого берем минимальное значение (чтобы в любом случае было 130)
        // И добавляем интервал в 500 для вычисления координаты по У. Т.е. maxY может быть только 630.
        var locationY = Math.floor(MIN_COORDINATE_Y + (window.utils.getRandomNumber(MAX_COORDINATE_Y - MIN_COORDINATE_Y)));
        var dataForPins = {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': window.utils.getRandomElementFromArray(OFFER_TITLES),
            'address': locationX + ', ' + locationY,
            'price': window.utils.getRandomNumber(PRICE),
            'type': window.utils.getRandomElementFromArray(HOUSE_TYPES),
            'rooms': window.utils.getRandomNumber(MAX_ROOMS),
            'guests': window.utils.getRandomNumber(MAX_GUESTS),
            'checkin': window.utils.getRandomElementFromArray(CHECK_INS),
            'checkout': window.utils.getRandomElementFromArray(CHECK_OUTS),
            'features': window.utils.getRandomNumberOfElementsFromArray(FEATURES),
            'description': window.utils.getRandomElementFromArray(DESCRIPTIONS),
            'photos': window.utils.getRandomElementFromArray(PHOTOS)
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
  };
})();
