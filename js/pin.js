'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');

  // Задаем координаты для поля адреса. Берем с помощью getBoundingRect значения по x,y, height и width пина.
  // Добавляем значения острия, высотпу получаем из getComputedStyle
  window.pin = {
    setPinCoordinates: function () {
      var pinCoordinates = mainPin.getBoundingClientRect();
      var pinEdge = window.getComputedStyle(mainPin, ':after');
      var pinEdgeHeight = parseInt(pinEdge.height, 10);
      return 'x: ' + Math.floor(pinCoordinates.x + pinCoordinates.width / 2) + '; y: ' + Math.floor(pinCoordinates.y + pinCoordinates.height + pinEdgeHeight);
    },

    // Добавляем функцию по настройке пинов. Клонируем имеющийся темплейт, выбираем в новом темплейте аватар по селектору.
    // Присваиваем значения left/top/src/alt, возвращаем новый пин
    setPinOptions: function (data) {
      var newPin = pinTemplate.cloneNode(true);
      var pinAvatar = newPin.querySelector('img');

      newPin.style =
        'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
      pinAvatar.src = data.author.avatar;
      pinAvatar.alt = data.author.title;

      return newPin;
    },


    // Добавляем функцию по созданию пинов. Создаем пустой documentFragment, запускаем цикл по генерации пинов в соответствии
    // с данными из функции setPinOptions, которая обращается к createMocksForData, добавляем их в пустой documentFragment. Вставляем получившийся documentFragment
    // в map__pins.
    generatePins: function (pinsList) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pinsList.length; i++) {
        fragment.appendChild(window.pin.setPinOptions(pinsList[i]));
      }
      window.domComponents.mapPinsArea.appendChild(fragment);
    }
  };

})();
