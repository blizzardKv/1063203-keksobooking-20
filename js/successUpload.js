'use strict';

(function () {
  var template = document.querySelector('#success')
    .content
    .querySelector('div');

  window.successUpload = {
    handler: function () {
      var success = template.cloneNode(true);

      success.addEventListener('click', function () {
        success.remove();
      });

      if (success) {
        document.addEventListener('keydown', successKeydownHandler);
      }

      function successKeydownHandler(evt) {
        if (evt.key === window.domComponents.ESCAPE_BUTTON) {
          success.remove();
          document.removeEventListener('keydown', successKeydownHandler);
        }
      }

      document.body.appendChild(success);
    }
  };
})();
