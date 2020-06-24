'use strict';

(function () {
  var template = document.querySelector('#error')
    .content
    .querySelector('div');

  window.failedUpload = {
    handler: function () {
      var error = template.cloneNode(true);

      error.addEventListener('click', function () {
        error.remove();
      });

      error.querySelector('.error__button').addEventListener('click', function () {
        error.remove();
      });

      if (error) {
        document.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            error.remove();
          }
        });
      }

      document.body.appendChild(error);
    }
  };
})();