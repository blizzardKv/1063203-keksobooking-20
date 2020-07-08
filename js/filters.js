'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingTypeFilter = filters.querySelector('[name=housing-type]');
  var housingPriceFilter = filters.querySelector('[name=housing-price]');
  var roomsNumberFilter = filters.querySelector('[name=housing-rooms]');
  var guestsNumberFilter = filters.querySelector('[name=housing-guests]');
  var featuresFilter = filters.querySelectorAll('[name=features]');
  var ADVERT_OPTION_ANY = 'any';
  var NUMBER_OF_PINS_TO_GENERATE = 5;

  window.filters = {
    checkTypeOfHouse: function (advert) {
      var selectedType = housingTypeFilter.value;

      if (housingTypeFilter.value === ADVERT_OPTION_ANY) {
        return true;
      }

      return advert.offer.type === selectedType;
    },

    filterAdverts: function () {
      var activePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      window.utils.removeElements(activePins);
      var sameAdverts = window.domComponents.adverts.filter(function (advert) {
        return window.filters.checkTypeOfHouse(advert);
      });

      sameAdverts = sameAdverts.slice(0, NUMBER_OF_PINS_TO_GENERATE);
      window.pin.generatePins(sameAdverts);
    }
  };
})();
