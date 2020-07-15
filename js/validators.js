'use strict';

(function () {
  window.validators = {
    // Создаем функцию валидации соответствия количеству комнат количества гостей
    compareNumberOfRoomsWithNumberOfGuests: function () {
      if (window.domComponents.roomNumberValue.value === '1' && window.domComponents.guestsNumber.value === '1') {
        window.domComponents.validationMark = true;
        window.domComponents.roomNumberValue.setCustomValidity('');
        return;
      } else {
        window.domComponents.validationMark = false;
        window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены для одного гостя, выберите другой вариант');
      }
      if (window.domComponents.roomNumberValue.value === '2') {
        if (window.domComponents.guestsNumber.value === '1' || window.domComponents.guestsNumber.value === '2') {
          window.domComponents.validationMark = true;
          window.domComponents.roomNumberValue.setCustomValidity('');
          return;
        } else {
          window.domComponents.validationMark = false;
          window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены для одного или двух гостей, выберите другой вариант');
        }
      }
      if (window.domComponents.roomNumberValue.value === '3') {
        if (window.domComponents.guestsNumber.value === '1' || window.domComponents.guestsNumber.value === '2' || window.domComponents.guestsNumber.value === '3') {
          window.domComponents.validationMark = true;
          window.domComponents.roomNumberValue.setCustomValidity('');
          return;
        } else {
          window.domComponents.validationMark = false;
          window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены только для гостей, выберите другой вариант');
        }
      }
      if (window.domComponents.roomNumberValue.value === '100') {
        if (window.domComponents.guestsNumber.value === '0') {
          window.domComponents.validationMark = true;
          window.domComponents.roomNumberValue.setCustomValidity('');
        } else {
          window.domComponents.validationMark = false;
          window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты не предназначены для гостей, выберите другой вариант');
        }
      }
    },
    // Валидации из второй части задания.
    // Проверка длины поля
    checkFieldTextLength: function (textField, minLength, maxLength) {
      if (textField.value.length > minLength && textField.value.length < maxLength) {
        textField.setCustomValidity('');
        window.domComponents.validationMarkTextLength = true;
        window.utils.checkIfNodeHasClass(window.domComponents.textInput, 'validation-error');
      } else {
        window.domComponents.textInput.classList.add('validation-error');
        textField.setCustomValidity('Минимальная длина поля - 30 символов, максимальная - 100 символов');
        window.domComponents.validationMarkTextLength = false;
      }
    },

    // Проверка максимальной стоимости аренды
    checkMaxRentPrice: function (maxPrice) {
      if (window.domComponents.rentPrice.value > maxPrice) {
        window.domComponents.rentPrice.classList.add('validation-error');
        window.domComponents.validationMarkMaxPrice = false;
        window.domComponents.rentPrice.setCustomValidity('Максимальная стоимость аренды - 1000000');
      } else {
        window.utils.checkIfNodeHasClass(window.domComponents.rentPrice, 'validation-error');
        window.domComponents.validationMarkMaxPrice = true;
      }
    },

    setPropriateValue: function () {
      if (window.domComponents.houseType.value === window.domComponents.roomTypes.BUNGALO) {
        window.domComponents.rentPrice.min = 0;
        window.domComponents.rentPrice.placeholder = 0;
      } else if (window.domComponents.houseType.value === window.domComponents.roomTypes.ROOM) {
        window.domComponents.rentPrice.min = 1000;
        window.domComponents.rentPrice.placeholder = 1000;
      } else if (window.domComponents.houseType.value === window.domComponents.roomTypes.HOUSE) {
        window.domComponents.rentPrice.min = 5000;
        window.domComponents.rentPrice.placeholder = 5000;
      } else if (window.domComponents.houseType.value === window.domComponents.roomTypes.PALACE) {
        window.domComponents.rentPrice.min = 10000;
        window.domComponents.rentPrice.placeholder = 10000;
      }
    }
  };
})();
