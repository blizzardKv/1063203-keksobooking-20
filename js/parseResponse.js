'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var ERROR_MESSAGE = 'Произошла ошибка соединения';
  var RESPONSE_MESSAGE = 'Статус ответа: ';
  var RESPONSE_FAIL_MESSAGE = 'Запрос не успел выполниться за ';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.parseResponse = {
    load: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          successHandler(xhr.response);
        } else {
          errorHandler(RESPONSE_MESSAGE + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        errorHandler(ERROR_MESSAGE);
      });
      xhr.addEventListener('timeout', function () {
        errorHandler(RESPONSE_FAIL_MESSAGE + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
