'use strict';

(function () {
  window.validators = {
    // Создаем функцию валидации соответствия количеству комнат количества гостей
    compareNumberOfRoomsWithNumberOfGuests: function () {
      if (window.domComponents.roomNumberValue.value === '1' && window.domComponents.guestsNumber.value === '1') {
        window.domComponents.validationMark = true;
        window.domComponents.roomNumberValue.setCustomValidity('');
      } else {
        window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены для одного гостя, выберите другой вариант');
      }
      if (window.domComponents.roomNumberValue.value === '2') {
        if (window.domComponents.guestsNumber.value === '1' || window.domComponents.guestsNumber.value === '2') {
          window.domComponents.validationMark = true;
          window.domComponents.roomNumberValue.setCustomValidity('');
        } else {
          window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты предназначены для одного или двух гостей, выберите другой вариант');
        }
      }
      if (window.domComponents.roomNumberValue.value === '3') {
        if (window.domComponents.guestsNumber.value === '1' || window.domComponents.guestsNumber.value === '2' || window.domComponents.guestsNumber.value === '3') {
          window.domComponents.validationMark = true;
          window.domComponents.roomNumberValue.setCustomValidity('');
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
          window.domComponents.roomNumberValue.setCustomValidity('Извините, данные апартаменты не предназначены для гостей, выберите другой вариант');
        }
      }
    },
    // Валидации из второй части задания.
    // Проверка длины поля
    checkFieldTextLength: function (textField, minLength, maxLength) {
      if (textField.value.length > minLength && textField.value.length < maxLength) {
        textField.setCustomValidity('');
      } else {
        textField.setCustomValidity('Минимальная длина поля - 30 символов, максимальная - 100 символов');
        window.domComponents.validationMark = true;
      }
    },

    // Проверка максимальной стоимости аренды
    checkMaxRentPrice: function (maxPrice) {
      if (window.domComponents.rentPrice.value > maxPrice) {
        window.domComponents.validationMark = false;
        window.domComponents.rentPrice.setCustomValidity('Максимальная стоимость аренды - 1000000');
      } else {
        window.domComponents.validationMark = true;
      }
    },

    setPropriateValue: function () {
      if (window.domComponents.houseType.value === 'bungalo') {
        window.domComponents.rentPrice.min = 0;
        window.domComponents.rentPrice.placeholder = 0;
      } else if (window.domComponents.houseType.value === 'flat') {
        window.domComponents.rentPrice.min = 1000;
        window.domComponents.rentPrice.placeholder = 1000;
      } else if (window.domComponents.houseType.value === 'house') {
        window.domComponents.rentPrice.min = 5000;
        window.domComponents.rentPrice.placeholder = 5000;
      } else if (window.domComponents.houseType.value === 'palace') {
        window.domComponents.rentPrice.min = 10000;
        window.domComponents.rentPrice.placeholder = 10000;
      }
    }
  };
})();
