'use strict';

(function () {
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var PIN_MOVE_AREA_WIDTH = 1200;
  var PIN_MOVE_START_COORD = 0;
  var PIN_WIDTH = 65;

  window.data = {
    pinArea: {
      x: {
        MIN: PIN_MOVE_START_COORD,
        MAX: PIN_MOVE_AREA_WIDTH - PIN_WIDTH
      },
      y: {
        MIN: MIN_COORDINATE_Y,
        MAX: MAX_COORDINATE_Y
      }
    }
  };
})();
