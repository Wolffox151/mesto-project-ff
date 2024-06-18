import { togglePopup } from './openModal.js'
export const closePopupOnOverlayClick= (evt) => {
  if 
  (!evt.target.classList.contains('popup__content') && 
  (!evt.target.parentNode.classList.contains('popup__content') || evt.target.classList.contains('popup__close')) && 
  !evt.target.parentNode.classList.contains('popup__form'))  {
    togglePopup(evt.currentTarget);
  }
}

export const closePopupOnEscape =(evt) => {
  if (evt.key === 'Escape' && document.querySelector('.popup_is-opened')) {
    togglePopup(document.querySelector('.popup_is-opened'))
  }
}