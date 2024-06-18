// @todo: Открытие попапа
export const togglePopup = (popups) => {
	popups.classList.toggle('popup_is-opened');
}

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
    ImagePopup.togglePopup
  }
}