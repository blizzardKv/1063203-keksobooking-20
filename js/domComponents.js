'use strict';

(function () {
  var ESCAPE_BUTTON = 'Escape';
  var ENTER_BUTTON = 'Enter';
  var roomTypes = {
    ROOM: 'flat',
    BUNGALO: 'bungalo',
    HOUSE: 'house',
    PALACE: 'palace'
  };
  var roomTypesTranslate = {
    ROOM: 'Комната',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };
  var addressInput = document.querySelector('#address');
  var checkInField = document.querySelector('#timein');
  var checkOutField = document.querySelector('#timeout');
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
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
  var housingPriceFilter = filters.querySelector('[name=housing-price]');
  var housingRoomsFilter = filters.querySelector('[name=housing-rooms]');
  var housingGuestsFilter = filters.querySelector('[name=housing-guests]');
  var housingFeaturesFilter = filters.querySelectorAll('[name=features]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var adverts = '';
  var validationMark = '';
  var validationMarkMaxPrice = '';
  var validationMarkTextLength = '';
  var globalValidationMark = '';

  window.domComponents = {
    ESCAPE_BUTTON: ESCAPE_BUTTON,
    ENTER_BUTTON: ENTER_BUTTON,
    roomTypes: roomTypes,
    roomTypesTranslate: roomTypesTranslate,
    addressInput: addressInput,
    checkInField: checkInField,
    checkOutField: checkOutField,
    form: form,
    fieldsets: fieldsets,
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
    housingPriceFilter: housingPriceFilter,
    housingRoomsFilter: housingRoomsFilter,
    housingGuestsFilter: housingGuestsFilter,
    housingFeaturesFilter: housingFeaturesFilter,
    previewAvatar: previewAvatar,
    adverts: adverts,
    validationMarkMaxPrice: validationMarkMaxPrice,
    validationMarkTextLength: validationMarkTextLength,
    globalValidationMark: globalValidationMark
  };
})();
