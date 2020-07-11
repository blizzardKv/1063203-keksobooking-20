'use strict';

(function () {
  var ADVERT_OPTION_ANY = 'any';

  window.filters = {
    checkTypeOfHouse: function (advert) {
      var selectedType = window.domComponents.housingTypeFilter.value;

      if (window.domComponents.housingTypeFilter.value === ADVERT_OPTION_ANY) {
        return true;
      }

      return advert.offer.type === selectedType;
    },

    filterAdverts: function () {
      var card = window.domComponents.map.querySelector('.map__card');
      card.style.display = 'none';
      var activePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      window.utils.removeElements(activePins);
      var sameAdverts = window.domComponents.adverts.filter(function (advert) {
        return window.filters.checkTypeOfHouse(advert);
      });

      window.pin.rerenderPins(sameAdverts);
    }
  };
})();
