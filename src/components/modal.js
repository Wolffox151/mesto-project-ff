// @todo: Открытие попапа
export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', closePopupOnEscape);
}


export const popupTypeProfileEdit = document.querySelector('.popup_type_edit')

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closePopupOnEscape);
}

export const closePopupOnOverlayClick = (evt) => { 
  console.log(evt.target.classList)
  if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) { 
    closeModal(document.querySelector('.popup_is-opened')); 
  } 
}

export const closePopupOnEscape =(evt) => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
  }
}