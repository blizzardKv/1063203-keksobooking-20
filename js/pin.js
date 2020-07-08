'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  var ALT_IMAGE_TEXT = 'Аватарка пользователя';
  var NUMBER_OF_PINS_TO_GENERATE = 5;

  // Задаем координаты для поля адреса. Берем с помощью getBoundingRect значения по x,y, height и width пина.
  // Добавляем значения острия, высоту получаем из getComputedStyle
  window.pin = {
    setPinCoordinates: function () {
      var pinCoordinates = mainPin.getBoundingClientRect();
      var pinEdge = window.getComputedStyle(mainPin, ':after');
      var pinEdgeHeight = parseInt(pinEdge.height, 10);
      return Math.floor(pinCoordinates.x + pinCoordinates.width / 2) + ', ' + Math.floor(pinCoordinates.y + pinCoordinates.height + pinEdgeHeight);
    },

    // Добавляем функцию по настройке пинов. Клонируем имеющийся темплейт, выбираем в новом темплейте аватар по селектору.
    // Присваиваем значения left/top/src/alt, возвращаем новый пин
    setPinOptions: function (data) {
      var newPin = pinTemplate.cloneNode(true);
      var pinAvatar = newPin.querySelector('img');

      newPin.style =
        'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
      pinAvatar.src = data.author.avatar;
      pinAvatar.alt = ALT_IMAGE_TEXT;

      return newPin;
    },


    // Добавляем функцию по созданию пинов. Создаем пустой documentFragment, запускаем цикл по генерации пинов в соответствии
    // с данными из функции setPinOptions, которая обращается к createMocksForData, добавляем их в пустой documentFragment. Вставляем получившийся documentFragment
    // в map__pins.
    generatePins: function (pinsList) {
      window.domComponents.adverts = pinsList;
      // Не зря же писали
      var randomArray = window.utils.shuffleArray(window.domComponents.adverts);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < NUMBER_OF_PINS_TO_GENERATE; i++) {
        fragment.appendChild(window.pin.setPinOptions(randomArray[i]));
      }
      window.domComponents.mapPinsArea.appendChild(fragment);
    },

    rerenderPins: function (pinsData) {
      var randomArray = window.utils.shuffleArray(pinsData);
      randomArray = randomArray.slice(0, NUMBER_OF_PINS_TO_GENERATE);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < randomArray.length; i++) {
        fragment.appendChild(window.pin.setPinOptions(randomArray[i]));
      }
      window.domComponents.mapPinsArea.appendChild(fragment);
    },

    moveMainPin: function () {
      // Зажимаем пин, добавляем слушателя
      mainPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        // Записываем дефолтные координаты
        var startCoordinates = {
          x: evt.clientX,
          y: evt.clientY
        };

        // Добавляем коллбэк на перетаскивание элемента
        var mouseMoveHandler = function (moveEvt) {
          moveEvt.preventDefault();

          // Получаем сдвиг относительно от начальных координат.
          var shift = {
            x: startCoordinates.x - moveEvt.clientX,
            y: startCoordinates.y - moveEvt.clientY
          };

          // Перезаписываем стартовые координаты, иначе наш сдвиг будет бесконечно скакать.
          startCoordinates = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          // Рассчитываем значения координаты x и y согласно ограничений. На входе имеем - math.max - воозвращаем максимальное значение из массива значений -
          // либо x.MIN, либо минимальное из двух значений mainPin.offsetLeft - shift.x и window.data.pinArea.x.MAX. Аналогично по оси Y.
          mainPin.coordsX = Math.floor(Math.max(window.data.pinArea.x.MIN, Math.min(mainPin.offsetLeft - shift.x, window.data.pinArea.x.MAX))) + 'px';
          mainPin.coordsY = Math.floor(Math.max(window.data.pinArea.y.MIN, Math.min(mainPin.offsetTop - shift.y, window.data.pinArea.y.MAX))) + 'px';

          // Задаем значение по осям X, Y - согласно вычислениям.
          mainPin.style.left = mainPin.coordsX;
          mainPin.style.top = mainPin.coordsY;

          // Тут будет отрабатывать при каждом сдвиге относительно координат, если перенести
          // в onMouseUp - то только по отпусканию кнопки мыши.
          window.domComponents.addressInput.value = (parseInt(mainPin.style.left, 10) + ', ' + parseInt(mainPin.style.top, 10));
        };

        // На поднятии клавиши мышки - снимаем слушаетелей.
        var mouseUpHandler = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Выполняем реинит слушателей, иначе пин после первого отпускания кнопки мыши
        // не будет больше перетаскивать
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      });
    }
  };

})();
