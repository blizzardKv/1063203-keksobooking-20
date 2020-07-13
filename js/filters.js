'use strict';

(function () {
  var ADVERT_OPTION_ANY = 'any';
  var FILTER_FORM_PRICE_VALUES = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: Number.MAX_SAFE_INTEGER
    }
  };

  function isAnyChosen(value) {
    return value === ADVERT_OPTION_ANY;
  }

  window.filters = {
    checkTypeOfHouse: function (advert) {
      var selectedType = window.domComponents.housingTypeFilter.value;

      if (isAnyChosen(selectedType)) {
        return true;
      }

      return advert.offer.type === selectedType;
    },

    checkPriceValue: function (advert) {
      var selectedPrice = window.domComponents.housingPriceFilter.value;

      if (isAnyChosen(selectedPrice)) {
        return true;
      }

      var priceRange = FILTER_FORM_PRICE_VALUES[selectedPrice];
      return advert.offer.price > priceRange.min && advert.offer.price <= priceRange.max;
    },

    checkNumberOfRooms: function (advert) {
      var selectedRooms = window.domComponents.housingRoomsFilter.value;

      if (isAnyChosen(selectedRooms)) {
        return true;
      }

      return advert.offer.rooms === +selectedRooms;
    },

    checkAdvertGuests: function (advert) {
      var selectedGuests = window.domComponents.housingGuestsFilter.value;
      if (isAnyChosen(selectedGuests)) {
        return true;
      }

      return advert.offer.guests === +selectedGuests;
    },

    checkAdvertFeatures: function (advert) {
      var selectedOptions = [];
      window.domComponents.housingFeaturesFilter.forEach(function (feature) {
        if (feature.checked) {
          selectedOptions.push(feature.value);
        }
      });

      var featureList = selectedOptions.filter(function (el) {
        return advert.offer.features.indexOf(el) !== -1;
      });

      return selectedOptions.length === featureList.length;
    },

    filterAdverts: function () {
      var card = window.domComponents.map.querySelector('.map__card');
      card.style.display = 'none';
      var activePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      window.utils.removeElements(activePins);
      var sameAdverts = window.domComponents.adverts.filter(function (advert) {
        return window.filters.checkTypeOfHouse(advert) && window.filters.checkPriceValue(advert)
          && window.filters.checkNumberOfRooms(advert) && window.filters.checkAdvertGuests(advert)
          && window.filters.checkAdvertFeatures(advert);
      });

      window.pin.rerenderPins(sameAdverts);
    }
  };
})();
