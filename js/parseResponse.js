'use strict';

(function () {
  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };
  var SERVER_PASS_STATUS = 200;
  var TIMEOUT = 10000;
  var ERROR_MESSAGE = 'Произошла ошибка соединения';
  var RESPONSE_MESSAGE = 'Статус ответа: ';
  var RESPONSE_FAIL_MESSAGE = 'Запрос не успел выполниться за ';

  function initiateXHR(successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_PASS_STATUS) {
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

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  window.parseResponse = {
    urlLoad: URL.LOAD,
    urlSave: URL.SAVE,

    load: function (url, successHandler, errorHandler) {
      var xhr = initiateXHR(successHandler, errorHandler);
      xhr.open('GET', window.parseResponse.urlLoad);
      xhr.send();
    },

    save: function (data, successHandler, errorHandler) {
      var xhr = initiateXHR(successHandler, errorHandler);
      xhr.open('POST', window.parseResponse.urlLoad);
      xhr.send(data);
    }
  };
})();
