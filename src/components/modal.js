// @todo: Открытие попапа
export const openModal = (popup) => {
	popup.classList.add('popup_is-opened');
  document.addEventListener('click', closePopupOnOverlayClick);
  document.addEventListener('keyup', closePopupOnEscape);
}

export const popupTypeProfileEdit = document.querySelector('.popup_type_edit')
export const popupTypeAddNewCard = document.querySelector('.popup_type_new-card')

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