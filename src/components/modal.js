// @todo: Открытие попапа
export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', closePopupOnEscape);
}

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closePopupOnEscape);
}

export const closePopupOnOverlayClick = (evt) => { 
  if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) { 
    closeModal(document.querySelector('.popup_is-opened')); 
  } 
}

export const closePopupOnEscape =(evt) => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}