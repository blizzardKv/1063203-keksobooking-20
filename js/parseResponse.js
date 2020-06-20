'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var errorMessage = 'Произошла ошибка соединения';
  var responseMessage = 'Статус ответа: ';
  var responseFailMessage = 'Запрос не успел выполниться за ';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.parseResponse = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(responseMessage + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError(errorMessage);
      });
      xhr.addEventListener('timeout', function () {
        onError(responseFailMessage + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
