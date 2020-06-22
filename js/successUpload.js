
'use strict';

(function () {
  var template = document.querySelector('#success')
    .content
    .querySelector('div');

  window.successUpload = {
    resetPage: function () {
      window.domComponents.form.classList.add('ad-form--disabled');
    },

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
