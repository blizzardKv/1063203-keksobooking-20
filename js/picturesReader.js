'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserHousePhoto = document.querySelector('#images');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewPhotoWrapper = document.querySelector('.ad-form__photo');

  function createImageTemplate() {
    var image = document.createElement('img');
    image.setAttribute('src', ' ');
    image.classList.add('house-photo');
    image.style.cssText = 'width: 70px; height: 70px;';
    previewPhotoWrapper.appendChild(image);
  }

  createImageTemplate();

  var houseImage = document.querySelector('.house-photo');

  function imageLoadHandler(imageInput, previewWindow) {
    imageInput.addEventListener('change', function () {
      var file = imageInput.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewWindow.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  }

  imageLoadHandler(fileChooserAvatar, previewAvatar);
  imageLoadHandler(fileChooserHousePhoto, houseImage);
})();
