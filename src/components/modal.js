// @todo: Открытие попапа
export const openModal = (popups) => {
	popups.classList.add('popup_is-opened');
    document.addEventListener('click', closePopupOnOverlayClick);
    document.addEventListener('keyup', closePopupOnEscape);
}

// todo: Слушатель нажатий на кнопки
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(document.querySelector('.popup_type_edit'));
  } else if (evt.target.classList.contains('profile__add-button')) {
    openModal(document.querySelector('.popup_type_new-card'));
  } else if (evt.target.classList.contains('card__image')) {
    openModal(document.querySelector('.popup_type_image')); 
  }
});

// @todo: Открытие попапа при нажатии на картинку
export const openImagePopup = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const ImagePopup = document.querySelector('.popup_type_image')
    const clickedCard = evt.target.parentNode
    const clickedCardImageLink = clickedCard.querySelector('.card__image').src
    const clickedCardImageAlt = clickedCard.querySelector('.card__image').alt
    const clickedCardImageHeading = clickedCard.querySelector('.card__title').textContent
    const OpenedImage = document.querySelector('.popup__image')
    OpenedImage.src = clickedCardImageLink
    OpenedImage.alt= clickedCardImageAlt
    ImagePopup.querySelector('.popup__caption').textContent = clickedCardImageHeading
    ImagePopup.openModal
  }
}

export const closeModal = (popups) => {
	popups.classList.remove('popup_is-opened');
    document.removeEventListener('click', closePopupOnOverlayClick);
    document.removeEventListener('keyup', closePopupOnEscape);
}

export const closePopupOnOverlayClick= (evt) => {
  if 
  (!evt.target.classList.contains('popup__content') && 
  (!evt.target.parentNode.classList.contains('popup__content') || evt.target.classList.contains('popup__close')) && 
  !evt.target.parentNode.classList.contains('popup__form'))  {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

export const closePopupOnEscape =(evt) => {
  if (evt.key === 'Escape' && document.querySelector('.popup_is-opened')) {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}