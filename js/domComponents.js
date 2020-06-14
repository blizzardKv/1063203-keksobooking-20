'use strict';

(function () {
// Вводим переменные
  var map = document.querySelector('.map');
  var mapPinsArea = document.querySelector('.map__pins');
  var form = document.querySelector('.ad-form');
  var formInputElements = form.querySelectorAll('input');
  var formSelectElements = form.querySelectorAll('select');
  var formSubmit = form.querySelector('button[type="submit"]');
  var formTextarea = form.querySelector('textarea');
  var mapFilters = document.querySelector('.map__filters');
  var mainPin = document.querySelector('.map__pin--main');
  var roomNumberValue = form.querySelector('#room_number');
  var rentPrice = form.querySelector('#price');
  var guestsNumber = form.querySelector('#capacity');
  var validationMark = '';
  var submitButton = form.querySelector('.ad-form__submit');
  var textInput = document.querySelector('#title');
  var houseType = document.querySelector('#type');
  var addressInput = document.querySelector('#address');
  var checkInField = document.querySelector('#timein');
  var checkOutField = document.querySelector('#timeout');

  window.domComponents = {
    map: map,
    mapPinsArea: mapPinsArea,
    form: form,
    formInputElements: formInputElements,
    formSelectElements: formSelectElements,
    formSubmit: formSubmit,
    formTextarea: formTextarea,
    mapFilters: mapFilters,
    mainPin: mainPin,
    roomNumberValue: roomNumberValue,
    rentPrice: rentPrice,
    guestsNumber: guestsNumber,
    validationMark: validationMark,
    submitButton: submitButton,
    textInput: textInput,
    houseType: houseType,
    addressInput: addressInput,
    checkInField: checkInField,
    checkOutField: checkOutField
  };
})();
