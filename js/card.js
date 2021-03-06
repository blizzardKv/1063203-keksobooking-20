'use strict';

(function () {
  // Добавляем рендер каждой фичи в зависимости от получаемой даты.
  // Создаем пустой фрагмент, проходим по коллекции фич методом forEach.
  // "Стираем" данные в elem - с помощью textContent, иначе сохраняются дефолтные картинки фич.
  // За каждый имеющийся элемент коллекции - создаем li с заданными классами в соответствии с шаблоном
  // Вставляем полученную лишку в пустой докФрагмент. Далее добавляем получившийся докФрагмент в элемент шаблона.
  function createFeatureWithIcon(elem, features) {
    var fragment = document.createDocumentFragment();
    elem.textContent = '';

    features.forEach(function (feature) {
      var elemContainer = document.createElement('li');
      var featureClass = 'popup__feature--' + feature;
      elemContainer.classList.add('popup__feature', featureClass);
      fragment.appendChild(elemContainer);
    });

    return elem.appendChild(fragment);
  }

  // Хэндлеры карточек
  function modalCloseHandler() {
    var closeButton = document.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', closeButtonClickHandler);
      document.addEventListener('keydown', documentKeydownHandler);
    }
  }

  function closeButtonClickHandler(evt) {
    var closeButton = document.querySelector('.popup__close');
    if (evt.button === 0) {
      window.utils.mapPinsHandler();
      closeButton.removeEventListener('click', closeButtonClickHandler);
    }
  }

  function documentKeydownHandler(evt) {
    if (evt.key === window.domComponents.ESCAPE_BUTTON) {
      window.utils.mapPinsHandler();
      document.removeEventListener('keydown', documentKeydownHandler);
    }
  }

  window.card = {
    // Запускаем цепочку функций по генерации пинов.
    // Функция по генерации информации для карточки объявления.
    // Клонируем имеющийся шаблон, выбираем в новом шаблоне элементы, добавляем информацию.
    createCardExample: function () {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      cardTemplate.style.display = 'none';
      return cardTemplate.cloneNode(true);
    },

    fillCardWithInformation: function (cardInfo) {
      var cardTemplate = document.querySelector('.map__card');
      var photosWrapper = cardTemplate.querySelector('.popup__photos');

      // Сделаем объект с шаблонами для конкатенации строк.
      var wordsTemplate = {
        nightCost: ' ₽/ночь.',
        pretext: ' для ',
        space: ' ',
        checkIn: 'Заезд после ',
        checkOut: 'выезд до ',
        comma: ', '
      };

      // Выбираем каждый элемент в переменную
      var offerTitle = cardTemplate.querySelector('.popup__title');
      var offerAddress = cardTemplate.querySelector('.popup__text--address');
      var offerPrice = cardTemplate.querySelector('.popup__text--price');
      var offerType = cardTemplate.querySelector('.popup__type');
      var offerGuestsInfo = cardTemplate.querySelector('.popup__text--capacity');
      var offerGuestsTime = cardTemplate.querySelector('.popup__text--time');
      var offerDescription = cardTemplate.querySelector('.popup__description');
      var offerFeatures = cardTemplate.querySelector('.popup__features');
      var offerPhoto = cardTemplate.querySelector('.popup__photos img');
      var offerAvatar = cardTemplate.querySelector('.popup__avatar');

      // Проверяем элемент на наличие данных, если она есть, рендерим)
      offerTitle.textContent = window.utils.checkIsDataExists(cardInfo.offer.title, offerTitle);
      offerAddress.textContent = window.utils.checkIsDataExists(cardInfo.offer.address, offerAddress);
      offerPrice.textContent = window.utils.checkIsDataExists(cardInfo.offer.price + wordsTemplate.nightCost, offerPrice);
      offerType.textContent = window.utils.checkIsDataExists(window.utils.translateNamesOfHouses(cardInfo), offerType);
      offerGuestsInfo.textContent = window.utils.checkIsDataExists(cardInfo.offer.rooms + wordsTemplate.space
        + window.utils.getRoomsCases(cardInfo) + wordsTemplate.pretext + cardInfo.offer.guests + wordsTemplate.space
        + window.utils.getGuestsCases(cardInfo), offerGuestsInfo);
      offerGuestsTime.textContent = window.utils.checkIsDataExists(wordsTemplate.checkIn + cardInfo.offer.checkin +
        wordsTemplate.comma + wordsTemplate.checkOut + cardInfo.offer.checkout, offerGuestsTime);
      offerDescription.textContent = window.utils.checkIsDataExists(cardInfo.offer.description, offerDescription);
      window.utils.checkIsDataExists(createFeatureWithIcon(offerFeatures, cardInfo.offer.features), offerFeatures);
      photosWrapper.appendChild(window.utils.addExtraPhotos(photosWrapper, cardInfo.offer.photos, offerPhoto));
      offerAvatar.src = window.utils.checkIsDataExists(cardInfo.author.avatar, offerAvatar);

      cardTemplate.style.display = 'block';
    },
    // Создаем карточку для первого объявления. Создаем пустой фрагмент, заполняем информацией из функции выше, вставляем его.
    generateCard: function (cardInfo) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(cardInfo);

      window.domComponents.mapPinsArea.after(fragment);
    },

    createAppropriateCard: function (evt, cardInfo) {
      if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
        var pinAvatarSrc = evt.target.dataset.src || evt.target.closest('.map__pin').dataset.src;
        for (var i = 0; i < cardInfo.length; i++) {
          if (pinAvatarSrc === cardInfo[i].author.avatar) {
            window.card.fillCardWithInformation(cardInfo[i]);
            modalCloseHandler();
          }
        }
      }
    }
  };
})();
