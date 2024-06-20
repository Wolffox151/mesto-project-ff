import '../pages/index.css';
import { initialCards } from './cards.js';
import { placesList, createCard, handleDeleteCard, cardForm, addCardFormSubmit } from './card.js'
import { openModal, closeModal, popupTypeProfileEdit, popupTypeAddNewCard } from './modal.js'

// @todo: Вывести карточки на страницу
initialCards.forEach((data) => {
  const newCard = createCard(data, handleDeleteCard);
  placesList.append(newCard)
})

// @todo: Список попапов
const popups = document.querySelectorAll('.popup');

// @todo: Плавная анимация
popups.forEach((popup) => {
  popup.classList.add('popup_is-animated')
})

// @todo: Открытие попапа для редактирования профиля
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    nameInput.value = document.querySelector('.profile__title').textContent
    jobInput.value = document.querySelector('.profile__description').textContent
    openModal(popupTypeProfileEdit);
  }
});

// @todo: Функция изменения профиляn
// Находим форму в DOM
const profileForm = document.querySelector('.popup_type_edit').querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', editProfileForm);

// @todo: Открытие попапа для добавления карточки
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupTypeAddNewCard);
  }
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
cardForm.addEventListener('submit', addCardFormSubmit);
// document.addEventListener('click', openImagePopup);