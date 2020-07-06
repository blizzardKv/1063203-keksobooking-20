
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
        document.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            success.remove();
          }
        });
      }

      document.body.appendChild(success);
    }
  };
})();
