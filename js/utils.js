'use strict';

(function () {
  window.utils = {
    shuffleArray: function (arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    },

    controlsRemoveAttribute: function (controls) {
      controls.forEach(function (control) {
        control.removeAttribute('disabled');
      });
    },

    // Проверяем наличие даты для рендера.
    // Если её нет или она undefined, то скрываем элемент, куда должна была отправиться дата.
    checkIsDataExists: function (data, el) {
      if (data.length === 0 || data.length === 'undefined') {
        el.style.display = 'none';
      } else {
        el.style.display = 'block';
      }

      return data;
    },

    // Проходим конструкцией switch по имеющимся данным по типу домов. Выводим согласно совпадающей строке.
    translateNamesOfHouses: function (house) {
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
    },

    // Проходим конструкцией switch по имеющимся данным по количеству комнат. Изменяем падежи существительных.
    getRoomsCases: function (noun) {
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
    },

    // Проверяем падеж у слова "гость"
    getGuestsCases: function (noun) {
      return noun.offer.guests === 1 ? 'гостя' : 'гостей';
    },

    setCustomAttributeOnCollection: function (elements, attribute, property) {
      elements.forEach(function (el) {
        el.setAttribute(attribute, property);
      });
    },

    // Добавляем n-фотографий в объявление.
    // Если много - то создаем для каждой отдельную "ячейку"
    addExtraPhotos: function (template, photos) {
      var photosTemplate = template.querySelector('.popup__photo');
      var clonedTemplate = photosTemplate.cloneNode();
      if (photos.length !== 0) {
        template.innerHTML = '';
        template.style.removeProperty('display');
      } else {
        template.style.display = 'none';
      }
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos.length; i++) {
        var item = clonedTemplate.cloneNode();
        item.src = photos[i];
        fragment.appendChild(item);
      }
      return fragment;
    },

    checkIfNodeHasClass: function (node, className) {
      if (node.classList.contains(className)) {
        node.classList.remove(className);
      }
    },

    mapPinsHandler: function () {
      var mapCard = document.querySelector('.map__card');
      mapCard.style.display = 'none';
      var activePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      activePins.forEach(function (pin) {
        if (pin.classList.contains('map__pin--active')) {
          pin.classList.remove('map__pin--active');
        }
      });
    },

    removeElements: function (els) {
      if (els) {
        els.forEach(function (element) {
          element.remove();
        });
      }
    },
  };
})();
