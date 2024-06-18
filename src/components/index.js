import '../pages/index.css';
import { initialCards } from './cards.js';
import { placesList, createCard, handleDeleteCard, likeCard, editProfileForm, addCardFormSubmit, profileForm } from './card.js'
import { openImagePopup } from './modal.js'
// @todo: Темплейт карточки
export const templateCard = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const newCard = createCard(data, handleDeleteCard);
  placesList.append(newCard)
})

// @todo: Список попапов
const popups = document.querySelectorAll('.popup');

//todo @ плавная анимация
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

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