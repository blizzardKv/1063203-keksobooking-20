'use strict';

(function () {
  // Вводим переменные
  var addressInput = document.querySelector('#address');
  var checkInField = document.querySelector('#timein');
  var checkOutField = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var formInputElements = form.querySelectorAll('input');
  var formSelectElements = form.querySelectorAll('select');
  var formSubmit = form.querySelector('button[type="submit"]');
  var formTextarea = form.querySelector('textarea');
  var guestsNumber = form.querySelector('#capacity');
  var houseType = document.querySelector('#type');
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll('input');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  var mapPinsArea = document.querySelector('.map__pins');
  var rentPrice = form.querySelector('#price');
  var rentImages = form.querySelector('#images');
  var avatarInput = form.querySelector('#avatar');
  var roomNumberValue = form.querySelector('#room_number');
  var submitButton = form.querySelector('.ad-form__submit');
  var textInput = document.querySelector('#title');
  var resetButton = form.querySelector('.ad-form__reset');
  var filters = document.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('[name=housing-type]');
  var adverts = '';
  var validationMark = '';
  var validationMarkMaxPrice = '';
  var validationMarkTextLength = '';
  var globalValidationMark = '';

  window.domComponents = {
    addressInput: addressInput,
    checkInField: checkInField,
    checkOutField: checkOutField,
    form: form,
    formInputElements: formInputElements,
    formSelectElements: formSelectElements,
    formSubmit: formSubmit,
    formTextarea: formTextarea,
    guestsNumber: guestsNumber,
    houseType: houseType,
    mainPin: mainPin,
    map: map,
    mapFilters: mapFilters,
    mapFiltersInputs: mapFiltersInputs,
    mapFiltersSelects: mapFiltersSelects,
    mapPinsArea: mapPinsArea,
    rentPrice: rentPrice,
    rentImages: rentImages,
    avatarInput: avatarInput,
    roomNumberValue: roomNumberValue,
    submitButton: submitButton,
    textInput: textInput,
    validationMark: validationMark,
    resetButton: resetButton,
    filters: filters,
    housingTypeFilter: housingTypeFilter,
    adverts: adverts,
    validationMarkMaxPrice: validationMarkMaxPrice,
    validationMarkTextLength: validationMarkTextLength,
    globalValidationMark: globalValidationMark
  };
})();
