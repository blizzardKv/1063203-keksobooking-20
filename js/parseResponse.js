'use strict';

(function () {
  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };
  var SERVER_PASS_STATUS = 200;
  var TIMEOUT = 10000;
  var errorMessage = 'Произошла ошибка соединения';
  var responseMessage = 'Статус ответа: ';
  var responseFailMessage = 'Запрос не успел выполниться за ';

  function initiateXHR(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_PASS_STATUS) {
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

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  window.parseResponse = {
    urlLoad: URL.LOAD,
    urlSave: URL.SAVE,

    load: function (url, onSuccess, onError) {
      var xhr = initiateXHR(onSuccess, onError);
      xhr.open('GET', window.parseResponse.urlLoad);
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = initiateXHR(onSuccess, onError);
      xhr.open('POST', window.parseResponse.urlLoad);
      xhr.send(data);
    }
  };
})();
