'use strict';

(function () {
  window.utils = {
    // Выводим рандомное число
    // Добавляем +1 т.к. Math.floor округляет вниз, а Math.random(max) = 0,9 в периоде.
    getRandomNumber: function (maxNumber) {
      return Math.floor(Math.random() * maxNumber + 1);
    },

    // Выводим рандомный элемент в массиве. Для этого возвращаем элемент с i = 0 до i = array.length - 1;
    // Т.к. Единица не входит в рандом, а Math.random(max) = 0,9 в периоде.
    getRandomElementFromArray: function (array) {
      return array[window.utils.getRandomNumber(array.length) - 1];
    },

    // Получаем массив рандомной длины через Array.Of
    // Шаффлим дефолтный массив, чтобы значения перемешивались в каждой итерации
    // Возвращаем новый массив, начиная с первого элемента и до элемента с индексом emptyArray
    getRandomNumberOfElementsFromArray: function (arr) {
      var emptyArrayWithRandomLength = window.utils.getRandomNumber(arr.length);
      return window.utils.shuffleArray(arr).slice(0, emptyArrayWithRandomLength);
    },

    shuffleArray: function (arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    },

    // Добавляем/убираем атрибут disabled и required у контролов
    controlsSetAttribute: function (controls) {
      window.domComponents.textInput.setAttribute('required', 'required');
      window.domComponents.rentPrice.setAttribute('required', 'required');
      controls.forEach(function (control) {
        control.setAttribute('disabled', 'disabled');
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
    }
  };
})();
