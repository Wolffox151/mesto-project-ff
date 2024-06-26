import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, toggleLikeButton } from './card.js'
import { openModal, closeModal, popupTypeProfileEdit, closePopupOnOverlayClick } from './modal.js'


const placesList = document.querySelector('.places__list');

// @todo: Открытие попапа картинки
const imagePopup = document.querySelector('.popup_type_image')
const openedImage = document.querySelector('.popup__image')
const popupCaption = imagePopup.querySelector('.popup__caption')

const openImagePopup = (data) => {
  openedImage.src = data.link
  openedImage.alt= data.name
  popupCaption.textContent = data.name
  openModal(imagePopup)
}

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const newCard = createCard(data, handleDeleteCard, openImagePopup, toggleLikeButton);
  placesList.append(newCard)
})


// @todo: Список попапов
const popups = document.querySelectorAll('.popup');

// @todo: Плавная анимация
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
  popup.addEventListener('click', closePopupOnOverlayClick)
})

const editProfileButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
// @todo: Открытие попапа для редактирования профиля
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
  openModal(popupTypeProfileEdit);
});


// @todo: Функция изменения профиляn
// Находим форму в DOM
const profileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')

const editProfileForm = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value 
  // Выберите элементы, куда должны быть вставлены значения полей
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  // Вставьте новые значения с помощью textContent
  closeModal(document.querySelector('.popup_type_edit'))
}

const popupTypeAddNewCard = document.querySelector('.popup_type_new-card')
const cardForm = popupTypeAddNewCard.querySelector('.popup__form')

// @todo: Обработа формы добавления карточки
const inputCardTitle = document.querySelector('.popup__input_type_card-name')
const inputCardImgLink = document.querySelector('.popup__input_type_url')
const addCardFormSubmit = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value 
  // Выберите элементы, куда должны быть вставлены значения полей
  const inputCardForm = {name: inputCardTitle.value, link: inputCardImgLink.value }
  // Вставьте новые значения с помощью textContent{
  const newCard = createCard(inputCardForm, handleDeleteCard, openImagePopup, toggleLikeButton);
  placesList.prepend(newCard)
  cardForm.reset()
  closeModal(popupTypeAddNewCard)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', editProfileForm);

const addCardButton = document.querySelector('.profile__add-button')
// @todo: Открытие попапа для добавления карточки
addCardButton.addEventListener('click', () => {
  openModal(popupTypeAddNewCard);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardForm.addEventListener('submit', addCardFormSubmit);