// @todo: Открытие попапа
export const openModal = (popup) => {
	popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOnOverlayClick);
  document.addEventListener('keyup', closePopupOnEscape);
}

export const popupTypeProfileEdit = document.querySelector('.popup_type_edit')
export const popupTypeAddNewCard = document.querySelector('.popup_type_new-card')

export const imagePopup = document.querySelector('.popup_type_image')
const openedImage = document.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')
// @todo: Открытие попапа при нажатии на картинку
export const openImagePopup = (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const clickedCard = evt.target.closest('.places__item')
    const clickedCardImageLink = evt.target.src
    const clickedCardImageAlt = evt.target.alt
    const clickedCardImageHeading = clickedCard.querySelector('.card__title').textContent
    openedImage.src = clickedCardImageLink
    openedImage.alt= clickedCardImageAlt
    popupCaption.textContent = clickedCardImageHeading
    openModal(imagePopup)
  }
}

export const closeModal = (popups) => {
	popups.classList.remove('popup_is-opened');
  document.removeEventListener('click', closePopupOnOverlayClick);
  document.removeEventListener('keyup', closePopupOnEscape);
}

export const closePopupOnOverlayClick= (evt) => {
  if (!evt.target.closest('.popup__content') || evt.target.classList.contains('popup__close')) {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}

export const closePopupOnEscape =(evt) => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}