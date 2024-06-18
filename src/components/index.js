import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, likeCard, editProfileForm, addCardFormSubmit } from './card.js'
import { togglePopup, openImagePopup } from './openModal.js'
import { closePopupOnOverlayClick, closePopupOnEscape } from './closeModal.js'
// @todo: Темплейт карточки
export const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const newCard = createCard(data, handleDeleteCard);
  placesList.append(newCard)
})

// @todo: Список попапов
const popups = document.querySelectorAll('.popup');

// todo: Слушатель нажатий на кнопки
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    togglePopup(document.querySelector('.popup_type_edit'));
  } else if (evt.target.classList.contains('profile__add-button')) {
    togglePopup(document.querySelector('.popup_type_new-card'));
  } else if (evt.target.classList.contains('card__image')) {
    togglePopup(document.querySelector('.popup_type_image')); 
  }
});

//todo @Слушатель для открытия и закрытия попапа, плавная анимация
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
  popup.addEventListener('click', closePopupOnOverlayClick);
  document.addEventListener('keyup', closePopupOnEscape);
})


// Находим форму в DOM
const profileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')
nameInput.value = document.querySelector('.profile__title').textContent
jobInput.value = document.querySelector('.profile__description').textContent 


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', editProfileForm);

// Находим форму в DOM
const cardForm = document.querySelector('.popup_type_new-card').querySelector('.popup__form')

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardForm.addEventListener('submit', addCardFormSubmit);
document.addEventListener('click', likeCard);
document.addEventListener('click', openImagePopup);