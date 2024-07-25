import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, toggleLikeButton } from './card.js'
import { openModal, closeModal, closePopupOnOverlayClick } from './modal.js'


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

const popupTypeProfileEdit = document.querySelector('.popup_type_edit')
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
const profileForm = popupTypeProfileEdit.querySelector('.popup__form')
// Находим поля формы в DOM
const nameInput = profileForm.querySelector('.popup__input_type_name')
const jobInput = profileForm.querySelector('.popup__input_type_description')

const editProfileForm = (evt) => {
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  // Вставьте новые значения с помощью textContent
  closeModal(popupTypeProfileEdit)
}

const popupTypeAddNewCard = document.querySelector('.popup_type_new-card')
const cardForm = popupTypeAddNewCard.querySelector('.popup__form')

// @todo: Обработа формы добавления карточки
const inputCardTitle = document.querySelector('.popup__input_type_card-name')
const inputCardImgLink = document.querySelector('.popup__input_type_url')
const addCardFormSubmit = (evt) => {
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

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`)
  inputElement.classList.add(`${inputErrorClass}`)
  errorElement.textContent = errorMessage
  errorElement.classList.add(`${errorClass}`)
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`)
  inputElement.classList.remove(`${inputErrorClass}`)
  errorElement.classList.remove(`${errorClass}`)
  errorElement.textContent = ''
}

const checkInputVadility = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)  
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    formElement.querySelector(`${submitButtonSelector}`).classList.add(inactiveButtonClass)
  }
  else {
    formElement.querySelector(`${submitButtonSelector}`).classList.remove(inactiveButtonClass)
  }
}

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`))
  inputList.forEach((inputElement) => {
    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
    inputElement.addEventListener('input', () => {
      checkInputVadility(formElement, inputElement, inputErrorClass, errorClass)
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
    })
  })
}

const enableValidation = (validateParams) => {
  const formSelector = Object.values(validateParams)[0]
  const inputSelector = Object.values(validateParams)[1]
  const submitButtonSelector = Object.values(validateParams)[2]
  const inactiveButtonClass = Object.values(validateParams)[3]
  const inputErrorClass = Object.values(validateParams)[4]
  const errorClass = Object.values(validateParams)[5]

  const formList = Array.from(document.querySelectorAll(`${formSelector}`))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
  setEventListeners(formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});